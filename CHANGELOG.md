# Release notes

## 1.2 - 2026-09-23

- Removed Chromium-generated `_metadata` integrity files from the source and ignored future copies.
- Added an explicit release packaging script that includes runtime files and LICENSE, while excluding tests, metadata, development scripts, and repository documentation.
- Retained the image-cache tests in the repository.
- Removed development console logging and the temporary new-tab quote placeholder.
- Includes the image caching, Quick Links, and save-feedback changes listed under 1.1.

## 1.1 — 2026-09-22

- Remote doodle and background images are now cached on your device and reused across new tabs, reducing repeat downloads and allowing cached images to display offline.
- Added **Clear Image Cache** in Options to refresh saved images.
- Image caching asks for access to the image sites you choose when saving. If access is declined or caching fails, images can still load directly from their URLs.
- Quick Links now open in the current tab.
- Fixed saving Quick Links after removing an entry.
- Leaving image URL fields blank and saving now restores the bundled default images correctly.
- Restored the **Options saved!** popup after every successful save, with additional feedback beside the Save button.
- Fixed an invalid manifest entry that prevented unpacked installation.
