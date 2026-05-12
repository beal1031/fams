/* global React, I18N, FMS_EVENTS, Logo, Button, Field, FB */
const { useState, useEffect, useRef } = React;

function FbGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
      <path fill={color} d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.25-1.5 1.55-1.5H17V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2v2.1H7.7v3.1h2.6V21h3.2z"/>
    </svg>
  );
}

// ============================================================
// Header
// ============================================================
function SiteHeader({ lang, setLang }) {
  const t = I18N[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen]);

  const items = [
    { id: "about", label: t.about },
    { id: "news", label: t.news },
    { id: "gallery", label: t.gallery },
    { id: "monday", label: t.monday },
    { id: "contact", label: t.contact },
  ];

  const goto = (id) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      background: scrolled || menuOpen ? "rgba(248, 241, 227, 0.94)" : "transparent",
      backdropFilter: scrolled && !menuOpen ? "saturate(140%) blur(10px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-1)" : "1px solid transparent",
      transition: "background 240ms var(--ease-soft), border-color 240ms var(--ease-soft)",
    }}>
      <div className="fms-header-row" style={{
        maxWidth: 1120, margin: "0 auto",
        padding: "14px 32px",
        display: "flex", alignItems: "center", gap: 18,
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
           style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Logo size="sm" />
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 17, color: "var(--fms-sage-800)", lineHeight: 1.05 }}>
              Fraen a Mammen
            </div>
            <div className="fms-header-sub" style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fms-sage-600)", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginTop: 3 }}>
              Schëtter · 1984
            </div>
          </div>
        </a>

        <nav className="fms-nav-desktop" style={{ marginLeft: 28, display: "flex", gap: 2 }}>
          {items.map((n) => (
            <button key={n.id} onClick={() => goto(n.id)} style={{
              background: "transparent", color: "var(--fms-ink-700)", border: 0,
              padding: "9px 14px", borderRadius: 999,
              fontFamily: "var(--font-serif)", fontSize: 15, cursor: "pointer",
              transition: "color 140ms var(--ease-soft), background 140ms var(--ease-soft)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fms-sage-800)"; e.currentTarget.style.background = "rgba(90,106,77,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fms-ink-700)"; e.currentTarget.style.background = "transparent"; }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="fms-lang" style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center" }}>
          {["lb", "de", "fr", "en"].map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? "var(--fms-sage-700)" : "transparent",
              color: lang === l ? "var(--fms-cream-100)" : "var(--fms-sage-700)",
              border: lang === l ? "1px solid var(--fms-sage-700)" : "1px solid var(--border-2)",
              padding: "5px 11px", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
              transition: "all 140ms var(--ease-soft)",
            }}>{l}</button>
          ))}
        </div>

        {/* Burger button — visible on mobile only via responsive.css */}
        <button
          className="fms-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid var(--border-2)",
            width: 42, height: 42, borderRadius: 999,
            cursor: "pointer",
            alignItems: "center", justifyContent: "center",
            padding: 0,
            marginLeft: "auto",
          }}
        >
          <span style={{ position: "relative", width: 18, height: 14, display: "inline-block" }}>
            <span style={{
              position: "absolute", left: 0, right: 0, height: 2, borderRadius: 2,
              background: "var(--fms-sage-800)",
              top: menuOpen ? 6 : 0,
              transform: menuOpen ? "rotate(45deg)" : "none",
              transition: "transform 220ms var(--ease-soft), top 220ms var(--ease-soft), opacity 160ms var(--ease-soft)",
            }} />
            <span style={{
              position: "absolute", left: 0, right: 0, height: 2, borderRadius: 2,
              background: "var(--fms-sage-800)", top: 6,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 160ms var(--ease-soft)",
            }} />
            <span style={{
              position: "absolute", left: 0, right: 0, height: 2, borderRadius: 2,
              background: "var(--fms-sage-800)",
              top: menuOpen ? 6 : 12,
              transform: menuOpen ? "rotate(-45deg)" : "none",
              transition: "transform 220ms var(--ease-soft), top 220ms var(--ease-soft)",
            }} />
          </span>
        </button>
      </div>
    </header>

      {/* Mobile drawer — sibling of header so it isn't trapped by header's backdrop-filter containing block */}
      <div className="fms-drawer" style={{
        display: "none",
        position: "fixed", left: 0, right: 0,
        top: 70, bottom: 0,
        background: "var(--fms-cream-200)",
        zIndex: 19,
        transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 220ms var(--ease-soft), transform 220ms var(--ease-soft)",
        padding: "28px 24px 40px",
        overflowY: "auto",
      }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((n, i) => (
            <button key={n.id} onClick={() => goto(n.id)} style={{
              background: "transparent",
              border: 0,
              borderBottom: "1px solid var(--border-1)",
              padding: "18px 4px",
              textAlign: "left",
              fontFamily: "var(--font-serif)",
              fontSize: 22, fontWeight: 500,
              color: "var(--fms-sage-800)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span>{n.label}</span>
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                color: "var(--fms-sage-500)", letterSpacing: "0.14em",
              }}>0{i + 1}</span>
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 28 }}>
          <div className="fms-eyebrow" style={{ color: "var(--fms-sage-600)", marginBottom: 10 }}>
            { {lb:"Sprooch", de:"Sprache", fr:"Langue", en:"Language"}[lang] }
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["lb", "de", "fr", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? "var(--fms-sage-700)" : "transparent",
                color: lang === l ? "var(--fms-cream-100)" : "var(--fms-sage-700)",
                border: "1px solid " + (lang === l ? "var(--fms-sage-700)" : "var(--border-2)"),
                padding: "10px 18px", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// Hero
// ============================================================
function Hero({ lang }) {
  const t = I18N[lang].hero;
  const goto = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" style={{ padding: "48px 32px 32px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ maxWidth: 880 }}>
          <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-700)" }}>{t.eyebrow}</div>
          <h1 style={{
            fontFamily: "var(--font-serif)", fontWeight: 600,
            fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.04,
            letterSpacing: "-0.02em", margin: "16px 0 22px",
            color: "var(--fms-sage-800)",
          }}>
            {t.title[0]}<br/>{t.title[1]}
          </h1>
          <p style={{
            fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.55,
            color: "var(--fg-2)", maxWidth: "56ch", margin: 0,
          }}>{t.lead}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button onClick={() => goto("news")} style={{
              background: "var(--fms-sage-700)", color: "var(--fms-cream-100)",
              border: 0, padding: "13px 24px", borderRadius: 999,
              fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, cursor: "pointer",
              boxShadow: "var(--shadow-1)",
            }}>{t.cta1} →</button>
            <button onClick={() => goto("monday")} style={{
              background: "transparent", color: "var(--fms-sage-800)",
              border: "1px solid var(--border-2)", padding: "13px 24px", borderRadius: 999,
              fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 500, cursor: "pointer",
            }}>{t.cta2}</button>
          </div>
        </div>

        {/* Three-photo strip below the lead */}
        <div style={{
          marginTop: 56,
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14,
          gridAutoRows: 360,
        }}>
          {[
            { src: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1100&q=70", alt: "Hands knitting wool" },
            { src: "https://images.unsplash.com/photo-1576562331281-d09e46af9854?auto=format&fit=crop&w=900&q=70",  alt: "Crocheted yarn detail" },
            { src: "https://images.unsplash.com/photo-1674802401450-56c5ccbfed7f?auto=format&fit=crop&w=900&q=70",  alt: "Coloured yarn balls" },
          ].map((p, i) => (
            <div key={i} style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-3)" }}>
              <img src={p.src} alt={p.alt}
                   style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// About
// ============================================================
function About({ lang }) {
  const t = I18N[lang].about;
  return (
    <section id="about" style={{ padding: "64px 32px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }}>
          <div>
            <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-700)" }}>{t.eyebrow}</div>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontWeight: 600,
              fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.015em",
              color: "var(--fms-sage-800)", margin: "12px 0 0",
            }}>{t.title}</h2>
          </div>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg-1)", margin: "0 0 16px", maxWidth: "60ch" }}>{t.p1}</p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg-1)", margin: "0 0 16px", maxWidth: "60ch" }}>{t.p2}</p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg-2)", margin: 0, maxWidth: "60ch", fontStyle: "italic" }}>{t.p3}</p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          marginTop: 56, paddingTop: 32,
          borderTop: "1px solid var(--border-1)",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        }}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-serif)", fontSize: 44, fontWeight: 600,
                color: "var(--fms-terracotta-700)", lineHeight: 1, letterSpacing: "-0.015em",
              }}>{s.n}</div>
              <div className="fms-eyebrow" style={{ marginTop: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// News — Facebook page posts
// ============================================================
function News({ lang }) {
  const t = I18N[lang].news;
  const [state, setState] = useState({ status: "loading", posts: [], error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", posts: [], error: null });
    FB.fetchFacebook("/" + FB.PAGE_ID + "/posts?fields=id,message,created_time,full_picture,permalink_url,attachments,reactions.summary(true),comments.summary(true),shares")
      .then((res) => { if (!cancelled) setState({ status: "ok", posts: res.data || [], error: null }); })
      .catch((err) => { if (!cancelled) setState({ status: "error", posts: [], error: String(err) }); });
    return () => { cancelled = true; };
  }, [lang]);

  const [featured, ...rest] = state.posts;

  return (
    <section id="news" style={{ padding: "32px 32px 64px", background: "var(--fms-cream-300)", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-700)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <FbGlyph size={13} color="var(--fms-terracotta-700)" />
              {t.eyebrow}
            </div>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontWeight: 600,
              fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.015em",
              color: "var(--fms-sage-800)", margin: "12px 0 12px", maxWidth: "20ch",
            }}>{t.title}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--fg-2)", maxWidth: "56ch", margin: 0 }}>{t.lead}</p>
          </div>
          <a href={FB.PAGE_URL} target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--fms-paper)", color: "var(--fms-sage-800)",
            padding: "10px 16px", borderRadius: 999,
            border: "1px solid var(--border-2)",
            fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600,
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            <FbGlyph size={14} color="var(--fms-sage-700)" />
            {t.followUs} →
          </a>
        </div>

        {state.status === "loading" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 18, marginTop: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                background: "var(--fms-paper)", borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-1)", height: i === 0 ? 420 : 320,
                overflow: "hidden",
              }}>
                <div style={{ height: i === 0 ? 260 : 180, background: "var(--bg-3)" }} />
                <div style={{ padding: 18 }}>
                  <div style={{ height: 10, width: "30%", background: "var(--bg-3)", borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ height: 12, width: "92%", background: "var(--bg-3)", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 12, width: "78%", background: "var(--bg-3)", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {state.status === "ok" && state.posts.length === 0 && (
          <p style={{ color: "var(--fg-3)", fontStyle: "italic" }}>{t.empty}</p>
        )}

        {state.status === "ok" && state.posts.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridAutoRows: "auto", gap: 18 }}>
            <PostCard post={featured} lang={lang} t={t} featured />
            <div style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {rest.slice(0, 4).map((p) => (
                <PostCard key={p.id} post={p} lang={lang} t={t} />
              ))}
            </div>
          </div>
        )}

        {state.status === "ok" && state.posts.length > 5 && (
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
            <a href={FB.PAGE_URL} target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "var(--fms-sage-800)", textDecoration: "none",
              fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 500,
              borderBottom: "1px solid var(--fms-sage-300)",
              paddingBottom: 4,
            }}>
              {t.followUs} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function PostCard({ post, lang, t, featured }) {
  if (!post) return null;
  const img = FB.fbPostImage(post);
  const album = FB.fbPostAlbum(post);
  const when = FB.fbRelativeTime(post.created_time, lang);
  const likes = post.reactions?.summary?.total_count ?? 0;
  const comments = post.comments?.summary?.total_count ?? 0;
  const shares = post.shares?.count ?? 0;
  const excerptLen = featured ? 280 : 140;

  return (
    <a href={post.permalink_url} target="_blank" rel="noopener" style={{
      background: "var(--fms-paper)", borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-1)",
      overflow: "hidden",
      textDecoration: "none", color: "inherit",
      display: "flex", flexDirection: "column",
      transition: "transform 240ms var(--ease-soft), box-shadow 240ms var(--ease-soft)",
      boxShadow: "var(--shadow-1)",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-2)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-1)"; }}
    >
      {img && (
        <div style={{
          position: "relative",
          aspectRatio: featured ? "4/3" : "16/10",
          background: "var(--bg-3)", overflow: "hidden",
          borderBottom: "1px solid var(--border-1)",
        }}>
          <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {album && album.length > 1 && (
            <div style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(42,38,32,0.78)", color: "var(--fms-cream-100)",
              padding: "5px 10px", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.06em",
              backdropFilter: "blur(4px)",
            }}>+{album.length} {t.photos}</div>
          )}
        </div>
      )}

      <div style={{ padding: featured ? "22px 24px 20px" : "18px 18px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.06em", textTransform: "uppercase",
          color: "var(--fms-sage-600)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <FbGlyph size={12} color="var(--fms-sage-600)" />
          <span>{when}</span>
        </div>

        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: featured ? 18 : 15.5,
          lineHeight: 1.55,
          color: "var(--fg-1)",
          margin: "10px 0 14px",
          maxWidth: "none",
          flex: 1,
        }}>{FB.fbExcerpt(post.message, excerptLen)}</p>

        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          paddingTop: 12,
          borderTop: "1px solid var(--border-1)",
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600,
          color: "var(--fg-3)",
        }}>
          <span title={t.likes}>♥ {likes}</span>
          <span title={t.comments}>💬 {comments}</span>
          {shares > 0 && <span title={t.shares}>↗ {shares}</span>}
          <span style={{ marginLeft: "auto", color: "var(--fms-terracotta-700)" }}>
            {t.readMore} →
          </span>
        </div>
      </div>
    </a>
  );
}

// ============================================================
// Gallery — Facebook /{page-id}/photos
// ============================================================
function Gallery({ lang }) {
  const t = I18N[lang].gallery;
  const [photos, setPhotos] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;
    FB.fetchFacebook("/" + FB.PAGE_ID + "/photos?type=uploaded&fields=id,name,created_time,images,link,album")
      .then((res) => { if (!cancelled) setPhotos(res.data || []); });
    return () => { cancelled = true; };
  }, [lang]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, photos]);

  return (
    <section id="gallery" style={{ padding: "64px 32px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-700)", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <FbGlyph size={13} color="var(--fms-terracotta-700)" />
          {t.eyebrow}
        </div>
        <h2 style={{
          fontFamily: "var(--font-serif)", fontWeight: 600,
          fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.015em",
          color: "var(--fms-sage-800)", margin: "12px 0 12px", maxWidth: "20ch",
        }}>{t.title}</h2>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--fg-2)", maxWidth: "56ch", margin: "0 0 32px" }}>{t.lead}</p>

        {photos === null ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px", gap: 12, gridTemplateColumns: "repeat(4, 1fr)",
          }}>
            {[0,1,2,3,4,5,6,7].map((i) => (
              <div key={i} style={{ background: "var(--bg-3)", borderRadius: "var(--radius-md)" }} />
            ))}
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px",
            gap: 12,
          }}>
            {photos.map((p, i) => {
              const src = (p.images && p.images[0] && p.images[0].source) || "";
              return (
                <div key={p.id} onClick={() => setLightboxIndex(i)} style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  background: "var(--bg-3)",
                  display: "block",
                  position: "relative",
                  cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    const ov = e.currentTarget.querySelector("[data-ov]");
                    if (ov) ov.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const ov = e.currentTarget.querySelector("[data-ov]");
                    if (ov) ov.style.opacity = "0";
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(i);
                    }
                  }}
                >
                  <img src={src} alt={p.name}
                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div data-ov style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 30%, rgba(42,38,32,0.78) 100%)",
                    opacity: 0,
                    transition: "opacity 240ms var(--ease-soft)",
                    padding: 14,
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    color: "var(--fms-cream-100)",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      opacity: 0.85, marginBottom: 4,
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <FbGlyph size={11} color="var(--fms-cream-100)" />
                      {p.album?.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.3, fontWeight: 500 }}>
                      {p.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <a href="https://www.facebook.com/profile.php?id=61589322673081&sk=photos" target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "var(--fms-sage-800)",
            fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 500,
            textDecoration: "none",
            borderBottom: "1px solid var(--fms-sage-300)",
            paddingBottom: 4,
          }}>
            <FbGlyph size={13} color="var(--fms-sage-700)" />
            {t.viewAll} →
          </a>
        </div>

        {lightboxIndex !== null && photos && (
          <div onClick={() => setLightboxIndex(null)} style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}>
              <img
                src={photos[lightboxIndex].images?.[0]?.source || ""}
                alt={photos[lightboxIndex].name}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
              />
              <button onClick={() => setLightboxIndex(null)} style={{
                position: "absolute", top: 16, right: 16,
                background: "rgba(0,0,0,0.6)", color: "white",
                border: "none", fontSize: 28, width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", borderRadius: 4, padding: 0,
              }}>×</button>

              <button onClick={() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)} style={{
                position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.6)", color: "white",
                border: "none", fontSize: 24, width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", borderRadius: 4, padding: 0,
              }}>←</button>

              <button onClick={() => setLightboxIndex((i) => (i + 1) % photos.length)} style={{
                position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.6)", color: "white",
                border: "none", fontSize: 24, width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", borderRadius: 4, padding: 0,
              }}>→</button>

              <div style={{
                position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
              }}>
                <a href="https://www.facebook.com/profile.php?id=61589322673081&sk=photos" target="_blank" rel="noopener" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 4,
                  background: "var(--fms-sage-700)", color: "white",
                  fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
                  textDecoration: "none",
                }}>
                  <FbGlyph size={13} color="white" />
                  {t.toGallery}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// Monday — invitation panel
// ============================================================
function Monday({ lang }) {
  const t = I18N[lang].monday;
  return (
    <section id="monday" style={{ padding: "32px 32px 64px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{
          background: "var(--fms-sage-700)", color: "var(--fms-cream-200)",
          borderRadius: "var(--radius-xl)",
          padding: "56px 56px",
          display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center",
          boxShadow: "var(--shadow-2)",
          overflow: "hidden",
          position: "relative",
        }}>
          <div>
            <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-300)" }}>{t.eyebrow}</div>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontWeight: 600,
              fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.02em",
              color: "var(--fms-cream-100)", margin: "12px 0 18px",
            }}>{t.title}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--fms-cream-200)", maxWidth: "48ch", margin: "0 0 28px", opacity: 0.92 }}>{t.lead}</p>

            <div style={{ display: "flex", gap: 32, marginBottom: 28, flexWrap: "wrap" }}>
              <div>
                <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-300)" }}>{ {lb:"Wéini",de:"Wann",fr:"Quand",en:"When"}[lang] }</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "var(--fms-cream-100)", marginTop: 6 }}>{t.when}</div>
              </div>
              <div>
                <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-300)" }}>{ {lb:"Wou",de:"Wo",fr:"Où",en:"Where"}[lang] }</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "var(--fms-cream-100)", marginTop: 6 }}>{t.where}</div>
              </div>
            </div>

            <a href="mailto:Fraenamammenschetter@gmail.com" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--fms-terracotta-500)", color: "var(--fms-cream-100)",
              padding: "13px 22px", borderRadius: 999,
              fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600,
              textDecoration: "none",
              boxShadow: "var(--shadow-1)",
            }}>{t.cta} →</a>
          </div>

          <div style={{
            borderRadius: "var(--radius-lg)", overflow: "hidden",
            aspectRatio: "4/5",
            background: "var(--fms-cream-300)",
          }}>
            <img src="https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=70"
                 alt="Hands working with yarn at a wooden table"
                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Footer
// ============================================================
function SiteFooter({ lang }) {
  const t = I18N[lang].footer;
  return (
    <footer id="contact" style={{
      background: "var(--fms-sage-800)", color: "var(--fms-cream-200)",
      padding: "56px 32px 32px",
      scrollMarginTop: 80,
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ background: "var(--fms-cream-300)", padding: 8, borderRadius: 12, lineHeight: 0 }}>
                <Logo size="sm" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "var(--fms-cream-100)" }}>
                  Fraen a Mammen — Schëtter
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fms-cream-300)", marginTop: 4, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7 }}>
                  {t.under}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-300)" }}>{t.contact}</div>
            <a href="mailto:Fraenamammenschetter@gmail.com" style={{
              color: "var(--fms-cream-100)", textDecoration: "underline", textUnderlineOffset: 4,
              fontFamily: "var(--font-serif)", fontSize: 16, marginTop: 12, display: "inline-block",
              wordBreak: "break-all",
            }}>
              Fraenamammenschetter@gmail.com
            </a>
          </div>
          <div>
            <div className="fms-eyebrow" style={{ color: "var(--fms-terracotta-300)" }}>{t.visit}</div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--fms-cream-200)", lineHeight: 1.55, marginTop: 12 }}>{t.visitText}</p>
          </div>
        </div>

        <div style={{
          marginTop: 48, paddingTop: 20,
          borderTop: "1px solid rgba(244, 234, 216, 0.2)",
          fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fms-cream-300)",
          opacity: 0.7,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>{t.legal}</div>
          <div>ënnert dem Daachverband ACFL</div>
        </div>
      </div>
    </footer>
  );
}

// expose
Object.assign(window, { SiteHeader, Hero, About, News, Gallery, Monday, SiteFooter });
