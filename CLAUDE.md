# CLAUDE.md — Fraen a Mammen Schëtter

## README maintenance

`README.md` is the public-facing documentation for this project. **Keep it in sync
with any changes you make.** Specifically:
- If you add, remove, or rename a file → update the file overview table.
- If you add or remove a page section → update the sections table.
- If you change the tech stack, deployment process, or Facebook pipeline → update the relevant section.
- If you change photo slot counts or recommended sizes → update the photos table.

## What this is

Static website for **Fraen a Mammen Schëtter (FMS)**, a women's handicraft association
in Schuttrange, Luxembourg, founded 1984 under the ACFL umbrella. About 10 ladies meet
every Monday evening to knit, crochet, and craft — pieces are sold at 3–4 events per year
and all proceeds go to charity.

The site is a **quiet business card**, not an event management system. The Facebook page
is the live event feed; the website links to it.

Live URL: https://beal1031.github.io/fams/

---

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 18 (CDN) | No build step needed |
| JSX | Babel standalone (CDN) | Transpiles in the browser |
| CSS | Plain CSS custom properties | Two files: `colors_and_type.css`, `responsive.css` |
| i18n | `window.I18N` object | All strings in one file (`i18n.js`) |
| Facebook data | Static `fb-data.json` | Fetched daily by GitHub Actions; token never hits the client |
| Hosting | GitHub Pages | Auto-deploys on push to `main` |

**No npm, no bundler, no build step.** Open `index.html` in a browser or push to GitHub.

---

## File map

```
index.html              Entry point — loads scripts, mounts <App />
site.jsx                All React components (SiteHeader → SiteFooter)
i18n.js                 All user-facing strings (LB / DE / FR / EN)
fb-feed.js              fetchFacebook() — reads ./fb-data.json
fb-data.json            Generated hourly by GitHub Actions (commit to repo)
colors_and_type.css     Design tokens, typography, component base styles
responsive.css          Mobile/tablet breakpoints (≤960px, ≤560px)
components/
  Logo.jsx              SVG logo component
assets/
  logo-fms-icon.png     Favicon / logo
uploads/                Own FMS photos go here (not yet populated)
.github/workflows/
  fetch-fb.yml          Hourly FB data fetch workflow (runs at :00 every hour)
.env                    Local dev only — FB_PAGE_ACCESS_TOKEN (gitignored)
```

---

## Changing content

### Text / translations
Edit `i18n.js`. All four languages (lb/de/fr/en) are in one object.
Structure mirrors the section names in `site.jsx` (`hero`, `about`, `work`, `news`, `gallery`, `monday`, `footer`).

### Photos
Replace the Unsplash URLs in `site.jsx` with paths like `uploads/myphoto.jpg`.
Recommended sizes: Hero strip 1100×700 px, Work/Monday panels 900×600 px, max ~300 KB each.
Three locations to update:
- `Hero` component — strip of 3 images
- `Work` component — grid of 6 images
- `Monday` component — 1 side image

### Facebook data
Runs automatically via GitHub Actions every hour at :00. To force a refresh: go to
GitHub Actions → "Fetch Facebook data" → "Run workflow" button.

### Colors / fonts
`colors_and_type.css` — change CSS custom properties under `:root`.

---

## Sections (page order)

1. **Hero** — tagline + two CTAs (→ News, → Monday)
2. **About** — founding story + 4 stats
3. **News** — latest FB posts
4. **Gallery** — FB album photos
5. **Monday** — when/where/CTA
6. **Footer** — contact + legal

The **Events** and **Work** sections were intentionally removed (too much maintenance,
stock photos, no real backend). Facebook naturally surfaces events and craft photos
via the News and Gallery sections.

---

## Facebook data pipeline

```
GitHub Secret: FB_PAGE_ACCESS_TOKEN
        ↓
.github/workflows/fetch-fb.yml  (runs every hour at :00)
        ↓
Graph API: /{page-id}/posts + /{page-id}/photos
        ↓
fb-data.json  (committed to repo)
        ↓
fb-feed.js fetchFacebook()  (client reads static file)
        ↓
News + Gallery sections
```

The access token **never appears in client-side code**. It lives only in GitHub Secrets.

### Adding / rotating the token
1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Generate a Page access token with `pages_read_engagement` permission
3. In GitHub: Settings → Secrets and variables → Actions → `FB_PAGE_ACCESS_TOKEN`

---

## Deployment

Push to `main` — GitHub Pages picks it up automatically within ~1 minute.
No build command, no CI needed beyond the FB fetch workflow.

---

## Roadmap

Priority tasks in progress (see `.claude/plans/` for full details):

1. **Facebook Integration** ✓ DONE
   - Workflow now runs every hour (was daily)
   - `.env.example` template added for local dev
   - Once token is verified, real FB data will populate News/Gallery sections

2. **Check & Fix Text Content** (next)
   - Review all `i18n.js` strings in all 4 languages (lb/de/fr/en)
   - Verify About, Monday, and Footer sections match real club info

3. **SEO + Favicon** (quick wins)
   - Add `<meta description>` and Open Graph tags to `index.html`
   - Verify favicon is properly linked

4. **Replace Stock Photos**
   - Hero strip: 3 Unsplash URLs → real FMS photos (1100×700 px)
   - Monday panel: 1 Unsplash URL → real FMS photo (900×600 px)
   - Create `uploads/` folder for photos

5. **Code Cleanup** (pending decision)
   - Delete unused `components/Button.jsx` + `Field.jsx` (unless building contact form)

---

## Languages

The site defaults to Luxembourgish (`lb`). The language switcher in the nav
cycles through lb → de → fr → en. All strings live in `i18n.js`; no string
should be hardcoded in `site.jsx` or other components.
