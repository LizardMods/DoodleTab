const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync(require('node:path').join(__dirname, '../image-cache.js'), 'utf8');

function environment() {
  const entries = new Map();
  const state = { downloads: 0, allowed: true, offline: false, storageBroken: false };
  const cache = {
    match: async key => entries.get(key)?.clone(),
    put: async (key, response) => { entries.set(key, response); }
  };
  function page() {
    const context = {
      URL, AbortSignal,
      window: { addEventListener() {} },
      chrome: { permissions: { contains: async () => state.allowed } },
      caches: {
        open: async () => {
          if (state.storageBroken) throw new Error('Storage unavailable');
          return cache;
        },
        delete: async name => {
          assert.equal(name, 'doodletab-images-v1');
          entries.clear();
          return true;
        }
      },
      fetch: async (url, options) => {
        state.downloads++;
        assert.equal(options.credentials, 'omit');
        if (state.offline) throw new Error('Offline');
        return new Response('image bytes', { headers: { 'Content-Type': 'image/gif' } });
      }
    };
    vm.runInNewContext(source, context);
    return context.window.DoodleImages;
  }
  return { state, page };
}

test('pre-cache once; another page can reuse the image offline; clearing refetches', async () => {
  const { state, page } = environment();
  const url = 'https://example.com/doodle.gif';
  assert.equal(await page().warm(url), true);
  state.offline = true;
  const resolved = await page().resolve(url);
  assert.match(resolved, /^blob:/);
  URL.revokeObjectURL(resolved);
  assert.equal(state.downloads, 1);
  await page().clear();
  state.offline = false;
  assert.equal(await page().warm(url), true);
  assert.equal(state.downloads, 2);
});

test('denied permission uses the original URL without a cache download', async () => {
  const { state, page } = environment();
  state.allowed = false;
  const url = 'https://example.com/image.png';
  assert.equal(await page().warm(url), false);
  assert.equal(await page().resolve(url), url);
  assert.equal(state.downloads, 0);
});

test('network and storage failures fall back to the original URL', async () => {
  const { state, page } = environment();
  const url = 'https://example.com/image.png';
  state.offline = true;
  assert.equal(await page().resolve(url), url);
  state.storageBroken = true;
  assert.equal(await page().resolve(url), url);
});

test('packaged images bypass cache; permissions contain only distinct HTTP(S) sites', async () => {
  const { state, page } = environment();
  const images = page();
  assert.equal(await images.resolve('images/my-doodle.gif'), 'images/my-doodle.gif');
  assert.equal(await images.warm('images/background.jpg'), true);
  assert.equal(state.downloads, 0);
  assert.deepEqual(Array.from(images.origins([
    'https://example.com/a.gif', 'https://example.com/b.jpg',
    'http://other.example:8080/a.png', 'images/background.jpg', 'data:image/png;base64,AA'
  ])), ['https://example.com/*', 'http://other.example/*']);
});
