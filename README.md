# Fraen a Mammen Schëtter — Website

Static website for **Fraen a Mammen Schëtter (FMS)**, a women's handicraft association
in Schuttrange, Luxembourg, founded in 1984 under the ACFL umbrella.

Live: **https://beal1031.github.io/fams/**

---

## What the site does

- Introduces the association (founding story, stats)
- Pulls the latest posts and photos directly from the FMS Facebook page
- Shows when and where the Monday evening meetings take place
- Provides a contact email

The Facebook page remains the live event feed; the website links to it.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 via CDN (no build step) |
| JSX | Babel standalone (transpiles in the browser) |
| CSS | Plain CSS custom properties (`colors_and_type.css`, `responsive.css`) |
| Translations | `i18n.js` — all strings for LB / DE / FR / EN |
| Facebook data | `fb-data.json` fetched daily by GitHub Actions |
| Hosting | GitHub Pages — auto-deploys on push to `main` |

**No npm, no bundler.** Open `index.html` in any browser.

---

## File overview

```
index.html              Entry point — loads scripts, mounts <App />
site.jsx                All React components (SiteHeader → SiteFooter)
i18n.js                 All user-facing strings (lb / de / fr / en)
fb-feed.js              fetchFacebook() helper — reads fb-data.json
fb-data.json            Generated daily by GitHub Actions
colors_and_type.css     Design tokens, typography, base component styles
responsive.css          Mobile / tablet breakpoints (≤960 px, ≤560 px)
components/
  Logo.jsx              SVG logo component
assets/
  logo-fms-icon.png     Favicon / logo source
uploads/                Own FMS photos (add here, reference in site.jsx)
.github/workflows/
  fetch-fb.yml          Daily Facebook data fetch (06:00 UTC)
.env                    Local dev only — FB_PAGE_ACCESS_TOKEN (gitignored)
```

---

## Local development

No build step needed. Open `index.html` directly in a browser, or serve it with
any static file server (e.g. VS Code Live Server, Python's `http.server`).

Facebook data is read from the committed `fb-data.json`, so the News and Gallery
sections work offline without an API token.

---

## Updating content

### Text and translations
Edit `i18n.js`. All four languages are in one object; keys mirror the section names
(`hero`, `about`, `news`, `gallery`, `monday`, `footer`).

### Own photos
Drop files into `uploads/` and replace the Unsplash URLs in `site.jsx`:

| Location in `site.jsx` | Recommended size |
|------------------------|------------------|
| `Hero` — strip of 3 images | 1100 × 700 px |
| `Monday` — 1 side image | 900 × 600 px |

Max ~300 KB per image.

### Colors and fonts
Edit CSS custom properties in `colors_and_type.css` under `:root`.

### Facebook data (manual refresh)
The workflow runs automatically every day at 06:00 UTC.
To trigger it manually: **GitHub → Actions → "Fetch Facebook data" → Run workflow.**

---

## Facebook data pipeline

```
GitHub Secret: FB_PAGE_ACCESS_TOKEN
        ↓
.github/workflows/fetch-fb.yml  (daily, 06:00 UTC)
        ↓
Graph API  /{page-id}/posts + /{page-id}/photos
        ↓
fb-data.json  (committed to repo, served statically)
        ↓
fb-feed.js  fetchFacebook()
        ↓
News + Gallery sections
```

The access token **never appears in client-side code** — it lives only in GitHub Secrets.

#### Rotating the token
1. Open [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Generate a Page access token with `pages_read_engagement` permission
3. GitHub → **Settings → Secrets and variables → Actions → `FB_PAGE_ACCESS_TOKEN`**

---

## Deployment

Push to `main` — GitHub Pages deploys automatically within ~1 minute.
No build command needed.

---

## Page sections (top → bottom)

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Tagline, lead text, 3-photo strip, two CTAs |
| 2 | About | Founding story + 4 stats |
| 3 | News | Latest Facebook posts |
| 4 | Gallery | Facebook album photos |
| 5 | Monday | When / where / contact CTA |
| 6 | Footer | Email, address, legal line |

---

## Language support

The site defaults to Luxembourgish (`lb`). The nav switcher cycles through
**lb → de → fr → en**. All strings live in `i18n.js`; nothing is hardcoded in
`site.jsx` or other components.
