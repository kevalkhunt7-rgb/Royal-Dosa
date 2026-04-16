"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

  @keyframes rb-fadeUp {
    from { opacity:0; transform:translateY(40px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes rb-titleWord {
    from { opacity:0; transform:translateY(28px) skewY(4deg); }
    to   { opacity:1; transform:translateY(0)    skewY(0deg); }
  }
  @keyframes rb-cardIn {
    from { opacity:0; transform:translateY(52px) scale(.93) rotateX(8deg); }
    to   { opacity:1; transform:translateY(0)    scale(1)   rotateX(0deg); }
  }
  @keyframes rb-iconBounce {
    0%   { opacity:0; transform:scale(.35) rotate(-20deg); }
    55%  { transform:scale(1.2)  rotate(7deg); }
    78%  { transform:scale(.92)  rotate(-3deg); }
    100% { opacity:1; transform:scale(1)   rotate(0deg); }
  }
  @keyframes rb-shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes rb-lineGrow {
    from { transform:scaleX(0); opacity:0; }
    to   { transform:scaleX(1); opacity:1; }
  }
  @keyframes rb-floatDot {
    0%,100% { transform:translateY(0)    scale(1);   opacity:.45; }
    50%      { transform:translateY(-14px) scale(1.3); opacity:.9;  }
  }
  @keyframes rb-pulse {
    0%,100% { box-shadow:0 0 0 0   rgba(26,122,74,.4); }
    50%      { box-shadow:0 0 0 12px rgba(26,122,74,0);  }
  }
  @keyframes rb-scanLine {
    from { top:-4px; }
    to   { top:100%; }
  }
  @keyframes rb-subtitleFade {
    from { opacity:0; letter-spacing:.22em; }
    to   { opacity:1; letter-spacing:.02em; }
  }
  @keyframes rb-textIn {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes rb-barGrow {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }

  .rb-hf { font-family:'Playfair Display',serif; }
  .rb-bf { font-family:'DM Sans',sans-serif; }

  .rb-word     { display:inline-block; opacity:0; animation:rb-titleWord .65s cubic-bezier(.22,1,.36,1) forwards; }
  .rb-subtitle { opacity:0; animation:rb-subtitleFade .75s ease forwards; }
  .rb-underline{ transform-origin:left; transform:scaleX(0); animation:rb-lineGrow .7s cubic-bezier(.22,1,.36,1) forwards; }

  .rb-card {
    position:relative;
    background:#fff;
    border:1.5px solid #e4f0e6;
    border-radius:20px;
    padding:30px 24px 28px;
    display:flex; flex-direction:column; gap:14px;
    overflow:hidden;
    opacity:0;
    perspective:600px;
    transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s;
  }
  .rb-card.in { animation:rb-cardIn .72s cubic-bezier(.22,1,.36,1) forwards; }
  .rb-card:hover {
    transform:translateY(-9px) scale(1.02);
    box-shadow:0 28px 60px rgba(26,122,74,.13);
    border-color:#9fcfb2;
  }
  .rb-card::before {
    content:'';
    position:absolute; inset:0;
    background:linear-gradient(110deg,transparent 38%,rgba(255,255,255,.6) 50%,transparent 62%);
    background-size:220% 100%;
    opacity:0; pointer-events:none;
    transition:opacity .15s;
  }
  .rb-card:hover::before { opacity:1; animation:rb-shimmer .55s ease forwards; }
  .rb-card::after {
    content:'';
    position:absolute; left:0; right:0; height:2px; top:-4px;
    background:linear-gradient(90deg,transparent,rgba(26,122,74,.35),transparent);
    opacity:0; pointer-events:none; transition:opacity .15s;
  }
  .rb-card:hover::after { opacity:1; animation:rb-scanLine .5s ease forwards; }

  .rb-icon {
    width:54px; height:54px; border-radius:15px;
    background:#1a7a4a;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; opacity:0;
    transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
  }
  .rb-icon.in { animation:rb-iconBounce .68s cubic-bezier(.22,1,.36,1) forwards; }
  .rb-card:hover .rb-icon {
    transform:rotate(-9deg) scale(1.12);
    animation:rb-pulse 1.5s ease infinite !important;
  }

  .rb-text { opacity:0; }
  .rb-text.in { animation:rb-textIn .55s cubic-bezier(.22,1,.36,1) forwards; }

  .rb-bar {
    height:3px; border-radius:99px;
    background:linear-gradient(90deg,#1a7a4a,#4ade80);
    transform-origin:left; transform:scaleX(0);
    transition:transform .45s cubic-bezier(.22,1,.36,1);
    margin-top:2px; flex-shrink:0;
  }
  .rb-card:hover .rb-bar { transform:scaleX(1); }

  .rb-dot {
    position:absolute; border-radius:50%;
    background:rgba(26,122,74,.16);
    pointer-events:none;
    animation:rb-floatDot ease-in-out infinite;
  }
`;

const benefits = [
  {
    title: "High Profit Margin",
    desc: "Premium positioning ensures better margins compared to regular snacks",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="3 17 9 11 13 15 21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 7 21 7 21 14"       stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Attractive Packaging",
    desc: "Eye-catching design that stands out on shelves and drives impulse purchases",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "High Customer Demand",
    desc: "Growing preference for ready-to-eat premium snacks across all demographics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8"/>
        <circle cx="17" cy="9" r="3" stroke="white" strokeWidth="1.8"/>
        <path d="M1 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M17 15a3 3 0 0 1 3 3v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Fast Inventory Turnover",
    desc: "Quick stock rotation with consistent repeat purchases from satisfied customers",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="1.8"/>
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const bgDots = [
  { w:10, h:10, top:"10%",  left:"5%",   delay:"0s",   dur:"3.8s" },
  { w: 7, h: 7, top:"72%",  left:"2%",   delay:"1.3s", dur:"4.6s" },
  { w:13, h:13, top:"28%",  right:"3%",  delay:"0.6s", dur:"3.3s" },
  { w: 6, h: 6, top:"78%",  right:"7%",  delay:"2.1s", dur:"5.2s" },
  { w: 9, h: 9, top:"50%",  left:"47%",  delay:"1.7s", dur:"4.2s" },
  { w: 5, h: 5, top:"18%",  left:"30%",  delay:"0.9s", dur:"3.6s" },
];

export default function RetailerBenefits() {
  const [vis, setVis] = useState(false);
  const sectionRef    = useRef(null);
  const cardRefs      = useRef([]);

  /* section visibility */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* staggered card + inner element reveals */
  useEffect(() => {
    if (!vis) return;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardDelay  = 150 + i * 130;
      const iconDelay  = cardDelay + 130;
      const title1Delay = iconDelay + 100;
      const descDelay  = title1Delay + 80;

      setTimeout(() => card.classList.add("in"), cardDelay);
      setTimeout(() => {
        const icon = card.querySelector(".rb-icon");
        if (icon) icon.classList.add("in");
      }, iconDelay);
      setTimeout(() => {
        const title = card.querySelector(".rb-title");
        if (title) title.classList.add("in");
      }, title1Delay);
      setTimeout(() => {
        const desc = card.querySelector(".rb-desc");
        if (desc) desc.classList.add("in");
      }, descDelay);
    });
  }, [vis]);

  return (
    <>
      <style>{styles}</style>

      <section
        ref={sectionRef}
        className="rb-bf"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#f6faf4",
          padding: "80px 24px 90px",
        }}
      >
        {/* floating bg dots */}
        {bgDots.map((d, i) => (
          <div
            key={i}
            className="rb-dot"
            style={{
              width: d.w, height: d.h,
              top: d.top, left: d.left, right: d.right,
              animationDelay: d.delay,
              animationDuration: d.dur,
            }}
          />
        ))}

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Heading ── */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              className="rb-hf"
              style={{
                fontSize: "clamp(2rem,4.5vw,2.8rem)",
                fontWeight: 900, color: "#111",
                lineHeight: 1.15, marginBottom: 10,
              }}
            >
              {vis && (
                <>
                  <span className="rb-word" style={{ animationDelay: ".05s", marginRight: ".22em" }}>Retailer</span>
                  <span className="rb-word" style={{ animationDelay: ".2s",  color: "#1a7a4a" }}>Benefits</span>
                </>
              )}
            </h2>

            {/* animated green underline */}
            {vis && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                <div
                  className="rb-underline"
                  style={{
                    height: 3, width: 70, borderRadius: 99,
                    background: "linear-gradient(90deg,#1a7a4a,#4ade80)",
                    animationDelay: ".34s",
                  }}
                />
              </div>
            )}

            {vis && (
              <p
                className="rb-bf rb-subtitle"
                style={{ color: "#777", fontSize: ".97rem", fontWeight: 400, animationDelay: ".46s" }}
              >
                Why stock The Royal Dosa Paper in your store
              </p>
            )}
          </div>

          {/* ── Cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 22,
            }}
          >
            {benefits.map((b, i) => (
              <div
                key={b.title}
                ref={el => cardRefs.current[i] = el}
                className="rb-card"
              >
                {/* icon */}
                <div className="rb-icon">{b.icon}</div>

                {/* title */}
                <h3
                  className="rb-bf rb-text rb-title"
                  style={{ fontSize: "1rem", fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 }}
                >
                  {b.title}
                </h3>

                {/* hover accent bar */}
                <div className="rb-bar" />

                {/* desc */}
                <p
                  className="rb-bf rb-text rb-desc"
                  style={{ fontSize: ".85rem", color: "#666", lineHeight: 1.68, margin: 0 }}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}