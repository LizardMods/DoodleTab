# 🎨 DoodleTab

**Personalize your new tab experience with custom doodle, backgrounds, quotes, and quick links!**

![DoodleTab Banner](https://lh3.googleusercontent.com/3Y355MYVyYBReEbUo-7SX9LzoarSt0sn_9rPWKvncA3lQQlzN4r0MBUngHYMGfsGLglZPGFCwY0zj0vq9IVFUgXcMvs=s550-w550-h350)

## ✨ Features

- **Custom Background Images**: Set your favorite image as the background via URL
- **Doodle Image Support**: Add and scale a secondary doodle image of your choice
- **Daily Quotes**: Enjoy a different quote each day of the month (31 customizable quotes)
- **Quote Customization**: Change quote colors and use any font installed on your computer
- **Quick Links**: Add customizable quick links that open in the current tab
- **Complete Personalization**: Toggle features on/off and customize to your preference

## 🚀 Installation

Available in the Chrome Web Store

1. Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/doodletab/ipnibnjimgnkmgfinpeloigogdihohdh)
2. Click "Add to Chrome"
3. Click the Extensions puzzle icon.
4. Click DoodleTab's three-dot menu.
5. Click Options.
6. Customize to your heart's content, then save at the bottom of the options page.
7. Open a new tab and enjoy your personalized browsing experience!

## 💡 Why DoodleTab?

Chrome's default new tab is functional but boring. DoodleTab lets you express yourself with:

- **Personalized Aesthetics**: Choose backgrounds that inspire you
- **Daily Motivation**: Start each day with a different quote
- **Easy Access**: Quick links to your favorite sites
- **90s Tech Culture**: Pre-loaded with nostalgic tech and pop culture quotes from the 80s and 90s

Unlike other new tab extensions that are bloated with features you don't need, DoodleTab is lightweight and focuses on customization that matters to you.

## 🎥 Watch on 
[YouTube](https://youtu.be/f7RjRWObZc8)

![](https://img.youtube.com/vi/f7RjRWObZc8/hqdefault.jpg)

## 🛠️ How It Works

- **Day-Based Quotes**: The extension checks the current day of the month (1-31) and displays the corresponding quote from your list
- **Local Font Integration**: Uses fonts already installed on your computer instead of loading Google Fonts
- **Image Cache**: Remote doodle and background images are stored on this device in Cache Storage (`doodletab-images-v1`) and reused across new tabs. Save options and allow access to the image sites to pre-cache them. Only the sites used by your image URLs are requested; access to all sites is not granted automatically. Cache downloads omit credentials.
- **Refresh Images**: Use **Clear Image Cache** in Options, then open a new tab to fetch updated images. Already-open tabs keep displaying their current images. Browser storage cleanup can also remove cached images.
- **Image Fallback**: If permission is denied, a download fails, or caching is unavailable, the original image URL is used directly. Leave image fields blank and save to restore `images/my-doodle.gif` and `images/background.jpg`.
- **User Preferences**: All settings are saved to your browser's local storage

## ❓ Frequently Asked Questions

# What is an image link?
An image link is a URL that points directly to an image file on the internet. It typically ends with an image file extension like .jpg, .png, .gif, etc.
To find an image link, you can right-click on an image you like online and select "Copy image address" or "Copy image link." This is the URL you'll paste into DoodleTab's image fields.

# Can I set a movie as a background?
No, you cannot set a movie or video as a background. However, you can use an animated GIF by entering its direct link in the background image URL field.
Animated GIFs work well for simple animations but keep in mind that large GIFs may affect performance.

# When I remove a quick link and add it back, it's already prefilled. How do I change this?
When quick links are prefilled, simply edit them directly in the input fields and save your changes. The extension remembers your previous entries,
but you can overwrite them by typing new URLs and labels directly into the existing fields.

# I removed all the quotes but left the input boxes empty. How do I get the default quotes back?
To restore the default quotes:
- Click the remove button (on the right side) for all empty quote boxes
- Click the "Add Quote" button for each quote you want to restore
- Each new input box will be regenerated with its original default quote
- If you've removed all quotes, simply adding them back one by one will restore them in their original order.  

## 🖥️ Setup for Local Development

```bash
# Clone the repository
git clone https://github.com/LizardMods/DoodleTab.git

# Navigate to the project directory
cd DoodleTab

# Load the unpacked extension in Chrome:
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the DoodleTab folder
```

### Checking changes

Run `node --test tests/*.test.cjs` for cache reuse, offline reads, permission denial, cache clearing, and fallback checks.

In Chrome, reload the unpacked extension, save remote image URLs and allow the requested site access, then open several new tabs. Check that the images are reused without new downloads. Clear the image cache and open another tab to check that they download again. Also verify same-tab Quick Links, saving after removing a link, and restoring packaged images by saving blank image fields.

### Building the 1.2 release

Run the tests above with Node.js 18 or newer, then use PowerShell 5.1 or newer:

```powershell
./scripts/package-release.ps1
```

This creates `dist/DoodleTab-1.2.zip`, using the version in `manifest.json` for the filename. The ZIP contains the extension's runtime files and LICENSE, with `manifest.json` at its root. The script uses an explicit file allowlist; update it when adding runtime assets.

Tests remain in `tests/` in GitHub but are excluded from the release ZIP, along with development scripts, repository documentation, `.git/`, and Chromium-generated `_metadata/`. Generated ZIPs in `dist/` are ignored by Git.

Build from this source checkout, never from an installed browser extension directory or GitHub's source ZIP. Do not copy or regenerate `_metadata` for a release. Extract the generated ZIP to a fresh folder and load it unpacked in Chrome or Brave for the manual checks above before uploading it to the Chrome Web Store.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

Check the [issues](https://github.com/LizardMods/DoodleTab/issues) page to see what needs help.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📱 Contact

Created by [LizardMods](https://www.linkz.gg/LizardMods) - feel free to reach out with questions or feedback on my [Linkz.gg Bio](https://www.linkz.gg/lizardmods)!

---
