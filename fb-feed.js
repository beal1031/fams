/* global */
/* =============================================================
   Facebook data layer
   -------------------------------------------------------------
   fetchFacebook() reads ./fb-data.json, which is committed to
   the repo and refreshed daily by GitHub Actions. The token
   never touches client code.

   fb-data.json shape: { posts: [...], photos: [...], updated_at: "..." }
   Each item matches the Graph API v19.0 field set.

   Falls back to inline mock data when fb-data.json is absent
   (local development before the workflow has run).
   ============================================================= */

const FB_PAGE_ID    = "1126617727201165";
const FB_PAGE_URL   = "https://www.facebook.com/profile.php?id=" + FB_PAGE_ID;
const FB_GRAPH_BASE = "https://graph.facebook.com/v19.0";

const FB_POSTS_RESPONSE = {
  data: [
    {
      id: "10215_872341",
      message:
        "Adventsmaart 2025 — Merci un all déi laanscht komm sinn dëse Weekend! 🌿 Mir hu praktesch all eis Häkel-Stären a Kränz verkaaft. Den Erléis geet dëst Joer un d'Stëftung Hëllef fir Kanner an Trauer. Bis d'nächst Joer!",
      created_time: "2025-12-01T19:42:11+0100",
      full_picture:
        "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1200&q=70",
      permalink_url: FB_PAGE_URL + "/posts/872341",
      attachments: {
        data: [{
          media_type: "photo",
          media: { image: { src: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1200&q=70", width: 1200, height: 800 } },
          type: "photo",
          url: FB_PAGE_URL + "/posts/872341",
        }],
      },
      reactions: { summary: { total_count: 142 } },
      comments:  { summary: { total_count: 18 } },
      shares:    { count: 9 },
    },
    {
      id: "10215_869102",
      message:
        "Méindes Owes am Veräinslokal — d'Adventskränz fänken un Form ze huelen. Mir sinn dëst Joer mat 11 Damen ronderëm den Dësch a sichen ëmmer nei Hänn. Wann der gär laanscht kommt: 19h30, Schoulvakanzen no.",
      created_time: "2025-11-17T22:08:53+0100",
      full_picture:
        "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=70",
      permalink_url: FB_PAGE_URL + "/posts/869102",
      attachments: {
        data: [{
          media_type: "album",
          subattachments: {
            data: [
              { media: { image: { src: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=70" } } },
              { media: { image: { src: "https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&w=900&q=70" } } },
              { media: { image: { src: "https://images.unsplash.com/photo-1606166187734-a4cb74079037?auto=format&fit=crop&w=900&q=70" } } },
            ],
          },
        }],
      },
      reactions: { summary: { total_count: 87 } },
      comments:  { summary: { total_count: 6 } },
      shares:    { count: 2 },
    },
    {
      id: "10215_864522",
      message:
        "Märchentour 2025 — d'Plaze sinn alleguer fort. Merci fir déi vill Umellungen! Wann der op der Waardelëscht sidd, schreiwe mir iech d'nächst Woch eng E-Mail. ✨",
      created_time: "2025-10-29T11:14:02+0100",
      full_picture:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70",
      permalink_url: FB_PAGE_URL + "/posts/864522",
      attachments: {
        data: [{
          media_type: "photo",
          media: { image: { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70", width: 1200, height: 800 } },
          type: "photo",
        }],
      },
      reactions: { summary: { total_count: 64 } },
      comments:  { summary: { total_count: 12 } },
      shares:    { count: 1 },
    },
    {
      id: "10215_859901",
      message:
        "Eis Häkel-Bommele fir den Adventsmaart — all eenzel mat der Hand gemaach. Wee säi Liiblings-Faarw schonn entdeckt huet, soll dat an de Kommentaren soen! 🧶",
      created_time: "2025-10-12T15:22:40+0100",
      full_picture:
        "https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&w=1200&q=70",
      permalink_url: FB_PAGE_URL + "/posts/859901",
      attachments: {
        data: [{
          media_type: "photo",
          media: { image: { src: "https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&w=1200&q=70", width: 1200, height: 800 } },
          type: "photo",
        }],
      },
      reactions: { summary: { total_count: 53 } },
      comments:  { summary: { total_count: 4 } },
      shares:    { count: 0 },
    },
    {
      id: "10215_854310",
      message:
        "Bus-Trip un d'Musel — eng schéin Visite an der Vinothéik mat 32 Damen. Mir hunn esouguer Zäit fonnt fir an d'Buttek ze goen 😄. Merci un den Marc fir d'Organisatioun!",
      created_time: "2025-09-21T20:01:18+0200",
      full_picture:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=70",
      permalink_url: FB_PAGE_URL + "/posts/854310",
      reactions: { summary: { total_count: 98 } },
      comments:  { summary: { total_count: 21 } },
      shares:    { count: 3 },
    },
    {
      id: "10215_851188",
      message:
        "Rentrée Méindes — mir si rëm do! Nei Wollen, nei Patronen, an e neit Joer Handaarbecht. Wéi all Joer beim leschten Méindeg vum August ass d'Dier op fir Neigereiwoll.",
      created_time: "2025-09-01T19:35:00+0200",
      permalink_url: FB_PAGE_URL + "/posts/851188",
      full_picture:
        "https://images.unsplash.com/photo-1545959570-a94084071b5d?auto=format&fit=crop&w=1200&q=70",
      reactions: { summary: { total_count: 41 } },
      comments:  { summary: { total_count: 3 } },
      shares:    { count: 0 },
    },
  ],
  paging: {
    cursors: { before: "QVFIUk1...", after: "QVFIUm9..." },
    next: FB_GRAPH_BASE + "/" + FB_PAGE_ID + "/posts?after=QVFIUm9...",
  },
};

const FB_PHOTOS_RESPONSE = {
  data: [
    {
      id: "ph_99441",
      name: "Adventsmaart — eise Stand, Sonndes mëttes",
      created_time: "2025-12-01T16:11:00+0100",
      link: FB_PAGE_URL + "/photos/99441",
      album: { id: "alb_12", name: "Adventsmaart 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 933 },
        { source: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=800&q=70",  width: 800,  height: 533 },
      ],
    },
    {
      id: "ph_99440",
      name: "Adventskränz — fäerdeg!",
      created_time: "2025-11-29T18:42:00+0100",
      link: FB_PAGE_URL + "/photos/99440",
      album: { id: "alb_12", name: "Adventsmaart 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1545959570-a94084071b5d?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 1750 },
      ],
    },
    {
      id: "ph_99372",
      name: "Méindes Owes · ronderëm den Dësch",
      created_time: "2025-11-17T22:01:00+0100",
      link: FB_PAGE_URL + "/photos/99372",
      album: { id: "alb_11", name: "Méindes Owes 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 933 },
      ],
    },
    {
      id: "ph_99281",
      name: "Häkel-Bommele",
      created_time: "2025-10-12T15:18:00+0100",
      link: FB_PAGE_URL + "/photos/99281",
      album: { id: "alb_11", name: "Méindes Owes 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 933 },
      ],
    },
    {
      id: "ph_99102",
      name: "Bus-Trip · Musel",
      created_time: "2025-09-21T19:55:00+0200",
      link: FB_PAGE_URL + "/photos/99102",
      album: { id: "alb_10", name: "Bus-Trip 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 933 },
      ],
    },
    {
      id: "ph_98994",
      name: "Wollen — neie Liwwerung",
      created_time: "2025-09-01T19:30:00+0200",
      link: FB_PAGE_URL + "/photos/98994",
      album: { id: "alb_11", name: "Méindes Owes 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1674802401450-56c5ccbfed7f?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 1050 },
      ],
    },
    {
      id: "ph_98801",
      name: "Ouschtermaart · Tombola",
      created_time: "2025-04-06T14:22:00+0200",
      link: FB_PAGE_URL + "/photos/98801",
      album: { id: "alb_09", name: "Ouschtermaart 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 933 },
      ],
    },
    {
      id: "ph_98712",
      name: "Bitz-Owend",
      created_time: "2025-03-10T20:11:00+0100",
      link: FB_PAGE_URL + "/photos/98712",
      album: { id: "alb_11", name: "Méindes Owes 2025" },
      images: [
        { source: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=75", width: 1400, height: 933 },
      ],
    },
  ],
  paging: {
    cursors: { before: "MAZDZD", after: "OAZDZD" },
    next: FB_GRAPH_BASE + "/" + FB_PAGE_ID + "/photos?after=OAZDZD",
  },
};

let _fbDataCache = null;

async function fetchFacebook(path) {
  if (!_fbDataCache) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      try {
        const r = await fetch("./fb-data.json", { signal: controller.signal });
        clearTimeout(timeoutId);
        if (r.ok) {
          _fbDataCache = await r.json();
        } else if (r.status === 404) {
          console.warn("[FB] fb-data.json not found, using mock fallback");
        } else {
          console.error(`[FB] fb-data.json fetch failed: ${r.status} ${r.statusText}`);
          throw new Error(`HTTP ${r.status}`);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === "AbortError") {
          console.error("[FB] fb-data.json fetch timed out (10s)");
          throw new Error("Facebook data fetch timed out");
        }
        throw err;
      }
    } catch (err) {
      console.error("[FB] Failed to load fb-data.json:", err.message);
      throw err;
    }
  }

  if (_fbDataCache) {
    if (path.includes("/posts"))  return { data: _fbDataCache.posts  || [] };
    if (path.includes("/photos")) return { data: _fbDataCache.photos || [] };
    return { data: [] };
  }

  // Local dev fallback — mock data
  await new Promise((r) => setTimeout(r, 380));
  if (path.includes("/posts"))  return structuredClone(FB_POSTS_RESPONSE);
  if (path.includes("/photos")) return structuredClone(FB_PHOTOS_RESPONSE);
  return { data: [], paging: {} };
}

function fbRelativeTime(iso, lang) {
  const d  = new Date(iso);
  const ms = Date.now() - d.getTime();
  const min = Math.round(ms / 60000);
  const hr  = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const wk  = Math.round(day / 7);
  const mo  = Math.round(day / 30);

  const L = {
    lb: { now: "elo", min: "min", hr: "St.", day: "Dag", days: "Deeg", wk: "Woch", wks: "Wochen", mo: "Mount", mos: "Méint", on: "den" },
    de: { now: "jetzt", min: "Min.", hr: "Std.", day: "Tag", days: "Tagen", wk: "Woche", wks: "Wochen", mo: "Monat", mos: "Monaten", on: "am" },
    fr: { now: "à l'instant", min: "min", hr: "h", day: "jour", days: "jours", wk: "sem.", wks: "sem.", mo: "mois", mos: "mois", on: "le" },
    en: { now: "now", min: "min", hr: "h", day: "day", days: "days", wk: "wk", wks: "wks", mo: "mo", mos: "mo", on: "on" },
  }[lang || "lb"];

  if (min < 1)  return L.now;
  if (min < 60) return min + " " + L.min;
  if (hr  < 24) return hr  + " " + L.hr;
  if (day < 7)  return day + " " + (day === 1 ? L.day : L.days);
  if (day < 30) return wk  + " " + (wk  === 1 ? L.wk  : L.wks);
  if (day < 365) {
    return d.toLocaleDateString(lang === "lb" ? "de-LU" : lang, { day: "numeric", month: "short" });
  }
  return d.toLocaleDateString(lang === "lb" ? "de-LU" : lang, { day: "numeric", month: "short", year: "numeric" });
}

function fbExcerpt(msg, max) {
  if (!msg) return "";
  if (msg.length <= max) return msg;
  const cut = msg.slice(0, max);
  const sp  = cut.lastIndexOf(" ");
  return cut.slice(0, sp > 0 ? sp : max).trim() + "…";
}

function fbPostImage(post) {
  if (post.full_picture) return post.full_picture;
  const a = post.attachments && post.attachments.data && post.attachments.data[0];
  if (!a) return null;
  if (a.media && a.media.image && a.media.image.src) return a.media.image.src;
  const sub = a.subattachments && a.subattachments.data && a.subattachments.data[0];
  if (sub && sub.media && sub.media.image && sub.media.image.src) return sub.media.image.src;
  return null;
}

function fbPostAlbum(post) {
  const a = post.attachments && post.attachments.data && post.attachments.data[0];
  if (!a || a.media_type !== "album") return null;
  const sub = a.subattachments && a.subattachments.data;
  if (!sub) return null;
  return sub.map((s) => s.media && s.media.image && s.media.image.src).filter(Boolean);
}

window.FB = {
  fetchFacebook,
  fbRelativeTime,
  fbExcerpt,
  fbPostImage,
  fbPostAlbum,
  PAGE_URL: FB_PAGE_URL,
  PAGE_ID:  FB_PAGE_ID,
};
