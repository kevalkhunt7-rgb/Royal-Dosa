"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes gal-titleWord {
    from { opacity:0; transform:translateY(26px) skewY(3deg); }
    to   { opacity:1; transform:translateY(0)    skewY(0deg); }
  }
  @keyframes gal-underline {
    from { transform:scaleX(0); opacity:0; }
    to   { transform:scaleX(1); opacity:1; }
  }
  @keyframes gal-subtitleFade {
    from { opacity:0; letter-spacing:.18em; }
    to   { opacity:1; letter-spacing:.02em; }
  }
  @keyframes gal-imgIn {
    from { opacity:0; transform:scale(.88) translateY(24px); }
    to   { opacity:1; transform:scale(1)   translateY(0); }
  }
  @keyframes gal-shimmer {
    0%   { background-position:-220% center; }
    100% { background-position: 220% center; }
  }
  @keyframes gal-overlayIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes gal-zoomBadge {
    from { opacity:0; transform:scale(.6) rotate(-10deg); }
    60%  { transform:scale(1.1) rotate(3deg); }
    to   { opacity:1; transform:scale(1) rotate(0deg); }
  }
  @keyframes gal-floatDot {
    0%,100% { transform:translateY(0)    scale(1);   opacity:.4; }
    50%      { transform:translateY(-12px) scale(1.25); opacity:.75; }
  }

  .gal-hf { font-family:'Playfair Display',serif; }
  .gal-bf { font-family:'DM Sans',sans-serif; }

  /* heading */
  .gal-word { display:inline-block; opacity:0; animation:gal-titleWord .65s cubic-bezier(.22,1,.36,1) forwards; }
  .gal-sub  { opacity:0; animation:gal-subtitleFade .7s ease forwards; }
  .gal-line { transform-origin:left; transform:scaleX(0); animation:gal-underline .65s cubic-bezier(.22,1,.36,1) forwards; }

  /* image tile */
  .gal-tile {
    position:relative; overflow:hidden;
    border-radius:16px;
    opacity:0;
    cursor:pointer;
    background:#e8ede4;
  }
  .gal-tile.in {
    animation:gal-imgIn .7s cubic-bezier(.22,1,.36,1) forwards;
  }
  .gal-tile img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition:transform .55s cubic-bezier(.22,1,.36,1);
  }
  .gal-tile:hover img { transform:scale(1.1); }

  /* shimmer sweep on hover */
  .gal-tile::before {
    content:'';
    position:absolute; inset:0; z-index:2;
    background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.5) 50%,transparent 65%);
    background-size:220% 100%;
    opacity:0; pointer-events:none;
    transition:opacity .15s;
  }
  .gal-tile:hover::before {
    opacity:1;
    animation:gal-shimmer .55s ease forwards;
  }

  /* dark overlay + label */
  .gal-overlay {
    position:absolute; inset:0; z-index:3;
    background:linear-gradient(to top, rgba(0,0,0,.62) 0%, transparent 55%);
    opacity:0;
    transition:opacity .3s ease;
    display:flex; align-items:flex-end;
    padding:14px 16px;
  }
  .gal-tile:hover .gal-overlay { opacity:1; }

  .gal-label {
    color:white;
    font-family:'DM Sans',sans-serif;
    font-size:.78rem;
    font-weight:600;
    letter-spacing:.04em;
    transform:translateY(8px);
    transition:transform .3s ease;
  }
  .gal-tile:hover .gal-label { transform:translateY(0); }

  /* green corner badge */
  .gal-badge {
    position:absolute; top:12px; right:12px; z-index:4;
    width:32px; height:32px; border-radius:50%;
    background:#1a7a4a;
    display:flex; align-items:center; justify-content:center;
    opacity:0;
    transition:opacity .2s;
  }
  .gal-tile:hover .gal-badge {
    opacity:1;
    animation:gal-zoomBadge .4s cubic-bezier(.22,1,.36,1) forwards;
  }

  /* floating bg dots */
  .gal-dot {
    position:absolute; border-radius:50%;
    background:rgba(26,122,74,.14);
    pointer-events:none;
    animation:gal-floatDot ease-in-out infinite;
  }

  /* lightbox */
  .gal-lb {
    position:fixed; inset:0; z-index:1000;
    background:rgba(0,0,0,.82);
    display:flex; align-items:center; justify-content:center;
    animation:gal-overlayIn .25s ease forwards;
    cursor:zoom-out;
    backdrop-filter:blur(6px);
  }
  .gal-lb img {
    max-width:90vw; max-height:88vh;
    border-radius:18px;
    box-shadow:0 32px 80px rgba(0,0,0,.5);
    animation:gal-imgIn .35s cubic-bezier(.22,1,.36,1) forwards;
    cursor:default;
  }
  .gal-lb-close {
    position:absolute; top:20px; right:24px;
    width:40px; height:40px; border-radius:50%;
    background:rgba(255,255,255,.15);
    border:none; cursor:pointer; color:white;
    font-size:1.2rem; display:flex; align-items:center; justify-content:center;
    transition:background .2s, transform .2s;
  }
  .gal-lb-close:hover { background:rgba(255,255,255,.28); transform:scale(1.1); }
  .gal-lb-nav {
    position:absolute;
    width:44px; height:44px; border-radius:50%;
    background:rgba(255,255,255,.15);
    border:none; cursor:pointer; color:white;
    font-size:1.3rem; display:flex; align-items:center; justify-content:center;
    transition:background .2s, transform .2s;
    top:50%; transform:translateY(-50%);
  }
  .gal-lb-nav:hover { background:rgba(255,255,255,.28); }
  .gal-lb-prev { left:20px; }
  .gal-lb-next { right:20px; }
`;

const images = [
  {
    src: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
    label: "Crispy Dosa",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    label: "Premium Packaging",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
    label: "Retail Display",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1621188988909-fbef0a28f527?w=600&q=80",
    label: "Store Shelves",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    label: "South Indian Snack",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
    label: "Product Range",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1630851840628-f5ee748f9ea6?w=600&q=80",
    label: "Snack Variety",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    label: "Authentic Taste",
    span: "",
  },
];

const bgDots = [
  { w:10, h:10, top:"8%",  left:"4%",  delay:"0s",   dur:"3.8s" },
  { w: 7, h: 7, top:"75%", left:"2%",  delay:"1.4s", dur:"4.5s" },
  { w:12, h:12, top:"20%", right:"3%", delay:"0.7s", dur:"3.4s" },
  { w: 6, h: 6, top:"82%", right:"6%", delay:"2s",   dur:"5.1s" },
  { w: 8, h: 8, top:"48%", left:"50%", delay:"1.8s", dur:"4s"   },
];

export default function OurGallery() {
  const [vis, setVis]         = useState(false);
  const [lightbox, setLightbox] = useState(null); // index or null
  const sectionRef            = useRef(null);
  const tileRefs              = useRef([]);

  /* section observer */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* staggered tile reveals */
  useEffect(() => {
    if (!vis) return;
    tileRefs.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add("in"), 120 + i * 90);
    });
  }, [vis]);

  /* keyboard nav for lightbox */
  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") setLightbox(l => (l + 1) % images.length);
      if (e.key === "ArrowLeft")  setLightbox(l => (l - 1 + images.length) % images.length);
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <style>{styles}</style>

      <section id="product"
        ref={sectionRef}
        className="gal-bf"
        style={{
          position: "relative", overflow: "hidden",
          background: "#f5f8f0",
          padding: "76px 24px 88px",
        }}
      >
        {/* bg dots */}
        {bgDots.map((d, i) => (
          <div key={i} className="gal-dot" style={{
            width: d.w, height: d.h,
            top: d.top, left: d.left, right: d.right,
            animationDelay: d.delay, animationDuration: d.dur,
          }} />
        ))}

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Heading ── */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="gal-hf" style={{
              fontSize: "clamp(1.9rem,4vw,2.7rem)",
              fontWeight: 900, color: "#111",
              lineHeight: 1.15, marginBottom: 10,
            }}>
              {vis && (
                <>
                  <span className="gal-word" style={{ animationDelay: ".05s", marginRight: ".2em" }}>Our</span>
                  <span className="gal-word" style={{ animationDelay: ".18s", color: "#1a7a4a" }}>Gallery</span>
                </>
              )}
            </h2>

            {vis && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <div className="gal-line" style={{
                  height: 3, width: 64, borderRadius: 99,
                  background: "linear-gradient(90deg,#1a7a4a,#4ade80)",
                  animationDelay: ".3s",
                }} />
              </div>
            )}

            {vis && (
              <p className="gal-bf gal-sub" style={{
                color: "#888", fontSize: ".93rem",
                fontWeight: 400, animationDelay: ".42s",
              }}>
                See our products in action
              </p>
            )}
          </div>

          {/* ── Grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "auto auto",
            gap: 14,
          }}>
            {images.map((img, i) => (
              <div
                key={i}
                ref={el => tileRefs.current[i] = el}
                className="gal-tile"
                style={{ aspectRatio: "1 / 1" }}
                onClick={() => setLightbox(i)}
              >
                <img src={img.src} alt={img.label} loading="lazy" />

                {/* shimmer handled by ::before */}

                {/* overlay */}
                <div className="gal-overlay">
                  <span className="gal-label">{img.label}</span>
                </div>

                {/* expand icon badge */}
                <div className="gal-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Lightbox ── */}
        {lightbox !== null && (
          <div className="gal-lb" onClick={() => setLightbox(null)}>
            <button className="gal-lb-close" onClick={() => setLightbox(null)}>✕</button>

            <button
              className="gal-lb-nav gal-lb-prev"
              onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + images.length) % images.length); }}
            >‹</button>

            <img
              src={images[lightbox].src.replace("w=600", "w=1200")}
              alt={images[lightbox].label}
              onClick={e => e.stopPropagation()}
            />

            <button
              className="gal-lb-next gal-lb-nav"
              onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % images.length); }}
            >›</button>
          </div>
        )}
      </section>
    </>
  );
}