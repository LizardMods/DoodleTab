// Shared by the options page and new tabs; image bytes stay on this device.
window.DoodleImages = (() => {
  const cacheName = 'doodletab-images-v1';
  const objectURLs = new Set();

  function remoteURL(source) {
    try {
      const url = new URL(source);
      if (!['http:', 'https:'].includes(url.protocol)) return null;
      url.hash = '';
      return url;
    } catch {
      return null;
    }
  }

  function origins(sources) {
    return [...new Set(sources.map(remoteURL).filter(Boolean)
      .map(url => `${url.protocol}//${url.hostname}/*`))];
  }

  async function cachedResponse(source) {
    const url = remoteURL(source);
    if (!url) return null;
    const cache = await caches.open(cacheName);
    const cached = await cache.match(url.href);
    if (cached) return cached;
    const allowed = await chrome.permissions.contains({ origins: origins([source]) });
    if (!allowed) return null;
    const response = await fetch(url.href, {
      credentials: 'omit',
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok || response.type === 'opaque') return null;
    await cache.put(url.href, response.clone());
    return response;
  }

  async function warm(source) {
    if (!remoteURL(source)) return true;
    try {
      return Boolean(await cachedResponse(source));
    } catch {
      return false;
    }
  }

  async function resolve(source) {
    if (!remoteURL(source)) return source;
    try {
      const response = await cachedResponse(source);
      if (response) {
        const objectURL = URL.createObjectURL(await response.blob());
        objectURLs.add(objectURL);
        return objectURL;
      }
    } catch {
      // Permission, network, or storage failures retain direct image loading.
    }
    return source;
  }

  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    objectURLs.forEach(url => URL.revokeObjectURL(url));
    objectURLs.clear();
  });

  return { origins, warm, resolve, clear: () => caches.delete(cacheName) };
})();
