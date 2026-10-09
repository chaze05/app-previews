# App Previews

Live web previews of my mobile apps, built with Expo web exports and served via GitHub Pages.

- **Ambag** → https://chaze05.github.io/app-previews/ambag/
- **Tipon** → https://chaze05.github.io/app-previews/tipon/

On desktop the app renders inside a phone frame; on small screens it is full-bleed.

## Rebuilding a preview

1. In the app repo, export the web build (its `app.json` sets `experiments.baseUrl` to `/app-previews/<app>`):
   ```bash
   npx expo export --platform web
   ```
2. Copy `dist/*` over `<app>/` in this repo.
3. Re-wrap the exported shell with the phone frame:
   ```bash
   node scripts/wrap-previews.cjs
   ```
4. Commit and push. Pages redeploys automatically.

The wrap script injects the `#preview-frame` styles and header bar into `<app>/index.html`. It is idempotent — after a fresh export, just run it again.
