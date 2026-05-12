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

⚠️ **WICHTIG: Wenn die Domain sich ändert**, müssen diese Stellen in `index.html` angepasst werden:
- `og:url` (Zeile ~10)
- `og:image` (Zeile ~13) — die vollständige URL zum Logo muss aktualisiert werden

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

Completed & In Progress:

1. **Facebook Integration** ✓ DONE
   - Workflow runs every hour (fetches 10 posts, 12 photos)
   - `fb-data.json` auto-updated via GitHub Actions
   - News + Gallery sections pull live Facebook data

2. **Check & Fix Text Content** ✓ DONE
   - Reviewed all `i18n.js` strings in all 4 languages (lb/de/fr/en)
   - Refined Luxembourg text for natural flow (removed gallery.lead, news.lead)
   - Verified About, Monday, Footer match club info

3. **SEO + Favicon** ✓ DONE
   - Added `<meta description>` and Open Graph tags to `index.html`
   - Favicon properly linked (`assets/logo-fms-icon.png`)
   - og:image points to logo, og:locale set to lb_LU

4. **Code Cleanup** ✓ DONE (Phase 1)
   - Deleted unused `components/Button.jsx` + `components/Field.jsx`
   - Removed from global declarations in site.jsx
   - Replaced with comprehensive **Code Review Findings** (18 issues documented)

### Pending

5. **Code Review Findings — Priority Fixes**
   - See "Code Review Findings" section below (4 CRITICAL, 3 HIGH, 4 MEDIUM, 7 LOW)
   - Work through systematically from CRITICAL → LOW

6. **Replace Stock Photos** (waiting on real FMS photos)
   - Hero strip: 3 Unsplash URLs → real FMS photos (1100×700 px)
   - Monday panel: 1 Unsplash URL → real FMS photo (900×600 px)
   - When photos available: create `uploads/` folder and reference in `site.jsx`

---

## Languages

The site defaults to Luxembourgish (`lb`). The language switcher in the nav
cycles through lb → de → fr → en. All strings live in `i18n.js`; no string
should be hardcoded in `site.jsx` or other components.

---

## Code Review Findings (2026-05-12)

### CRITICAL (Sofort beheben)

- [ ] **1. XSS-Risk via dangerouslySetInnerHTML** — site.jsx (Zeilen 811, 839)
  - ACFL-Link in Footer verwendet HTML-String statt React-Komponente
  - Risiko wenn i18n-Daten kompromittiert werden
  - Fix: `<a href="..." target="_blank" rel="noopener noreferrer">ACFL</a>` statt HTML-String

- [ ] **2. Fehlende API-Fehlerbehandlung** — fb-feed.js (Zeile 234), site.jsx (Zeile 323-330)
  - `catch (_)` ignoriert Fehler silently
  - Kein Timeout bei fetch
  - Error-State in News nicht angezeigt
  - Fix: Error-Logging, Timeout (8-10s), Error UI rendern

- [ ] **3. Bildladefehlbehandlung** — site.jsx (Zeilen 261, 444, 587, 666, 779)
  - `<img>`-Tags haben keine `onError`-Handler
  - Broken images zeigen nur Whitespace
  - Fix: `onError={fallbackImage}` + Fallback-Placeholder

- [ ] **4. Event-Listener Memory Leaks** — site.jsx (Zeilen 520-527)
  - Gallery-Lightbox Keyboard-Listener wird nicht beim Unmount entfernt
  - Abhängigkeit `[lightboxIndex, photos]` kann endlose Listener erzeugen
  - Fix: Listener in useEffect cleanup entfernen

### HIGH (Wichtig)

- [ ] **5. Performance: Inline Styles statt CSS** — site.jsx (durchgehend)
  - Hunderte inline styles + Hover-Handler statt CSS `:hover`
  - Jeder Hover trigert Re-render + DOM-Mutation
  - Fix: CSS-Klassen nutzen + className statt onMouseEnter/Leave

- [ ] **6. Error State UI fehlt** — site.jsx (Zeilen 362-411)
  - News hat `.error` State aber keine Error-UI
  - Fehler werden nicht dem User angezeigt
  - Fix: `if (state.status === "error")` UI mit Retry-Button rendern

- [ ] **7. Speicher: Unbegrenzte Datenmenge** — site.jsx (Gallery Zeilen 631-721)
  - Alle Galerie-Bilder müssen im RAM sein
  - Kein virtuelles Scrollen für große Galerien
  - Fix: Nur current + next/prev Bilder laden in Lightbox

### MEDIUM (Wichtig für UX)

- [ ] **8a. Accessibility: Fehlende ARIA-Labels** — site.jsx (multiple)
  - Gallery-Bilder (Zeile 578): kein `aria-label`
  - Lightbox Close-Button (Zeile 641): nur Symbol "×"
  - Language-Buttons (Zeile 197): kein `aria-label="Switch language"`
  - Emoji-Icons (Zeile 486): ♥ 💬 ↗ ohne `aria-label`
  - Fix: Alle `role="button"` müssen `aria-label` haben

- [ ] **8b. Accessibility: Kaputte Keyboard-Navigation** — site.jsx (Gallery)
  - Gallery-Thumbnails: `tabIndex={0}` + `role="button"` aber Space/Enter funktionieren nicht
  - Arrow-Keys nicht implementiert
  - Fix: Keydown-Handler für Enter/Space/Arrow-Keys

- [ ] **9. Memory Leak: document.body.style** — site.jsx (Zeile 42)
  - `document.body.style.overflow = "hidden"` bei Mobile-Menu
  - Global-Mutation kann mit anderen Komponenten konfliktieren
  - Fix: CSS-Klasse `.menu-open { overflow: hidden }` statt inline

- [ ] **10. Race Condition: Sprach-Wechsel lädt Daten neu** — site.jsx (Zeile 325, 509)
  - `[lang]` in useEffect dependency
  - News/Gallery sind sprachunabhängig, sollten nicht neu laden
  - Fix: Abhängigkeit entfernen oder separater Effect

### LOW (Technische Schulden)

- [ ] **11. Inconsistent Loading UI** — site.jsx
  - News (Zeile 362): Loading-Skeleton
  - Gallery (Zeile 542): nur leere Divs
  - Fix: Skeleton Loader auch für Gallery

- [ ] **12. Hardcodierte Strings** — site.jsx (Zeile 662, 700-706)
  - "Lädt..." (Deutsch) hardcoded statt aus i18n
  - "Prev"/"Next" (Englisch) nur für Lightbox
  - Fix: Alle Strings zu i18n.js verschieben

- [ ] **13. Duplizierter Code: Sprach-Selection** — site.jsx (Zeile 95-106, 193-202)
  - Language-Button-Code in Header und Mobile-Drawer dupliziert
  - Fix: In separate Komponente auslagern

- [ ] **14. Fehlende Content Security Policy** — index.html
  - Keine CSP-Header für externe Ressourcen (React, Babel, Unsplash)
  - XSS könnte injiziert werden
  - Fix: CSP-Meta-Tag hinzufügen mit whitelist

- [ ] **15. Responsive Images fehlen** — site.jsx (Hero, PostCard, Gallery, Monday)
  - Große Bilder (1200px) auch auf Mobile
  - Kein `srcset` oder WebP-Varianten
  - Fix: `srcSet` + `sizes` Attribute hinzufügen

- [ ] **16. Fehlende Error Boundary** — Gesamt-App
  - Wenn eine Komponente crasht → ganze App bricht
  - Keine Fehlertoleranz
  - Fix: Error Boundary Komponente um App wrappen

- [ ] **17. FbGlyph ARIA Inconsistency** — site.jsx (Zeile 6)
  - SVG hat `aria-hidden="true"` aber wird überall verwendet
  - Manchmal dekorativ, manchmal semantisch
  - Fix: Konsistent Dekorativität definieren

- [ ] **18. Hardcodierter Fallback-Delay** — fb-feed.js (Zeile 244)
  - 380ms Delay ist willkürlich, nur für Dev-Simulation
  - Fix: Fallback nur in Dev-Mode, nicht in Produktion

## Status: Alle Punkte dokumentiert, bereit zum Beheben
