"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

// ─── Global Styles ───────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes annaEnter {
    from { opacity: 0; transform: translateY(40px) scale(0.94); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes annaFloat {
    0%,100% { transform: translateY(0px) rotate(-0.5deg); }
    50%      { transform: translateY(-16px) rotate(0.5deg); }
  }
  @keyframes productEnter {
    from { opacity: 0; transform: translateX(50px) rotate(8deg) scale(0.88); }
    to   { opacity: 1; transform: translateX(0) rotate(-4deg) scale(1); }
  }
  @keyframes productFloat {
    0%,100% { transform: rotate(-4deg) translateY(0px); }
    50%      { transform: rotate(2deg) translateY(-12px); }
  }
  @keyframes productGlow {
    0%,100% { filter: drop-shadow(0 12px 32px rgba(245,197,24,0.45)); }
    50%      { filter: drop-shadow(0 20px 56px rgba(245,197,24,0.80)); }
  }
  @keyframes bubblePop {
    0%   { opacity: 0; transform: scale(0.5) translateY(10px); }
    75%  { transform: scale(1.05) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes orbDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(15px,-12px) scale(1.05); }
    66%      { transform: translate(-10px,10px) scale(0.96); }
  }
  @keyframes shimmerText {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes checkIn {
    0%   { opacity: 0; transform: scale(0.4) rotate(-15deg); }
    70%  { transform: scale(1.15) rotate(5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }
  @keyframes leafSway {
    0%,100% { transform: rotate(-14deg) translateY(0); }
    50%      { transform: rotate(10deg) translateY(-6px); }
  }
  @keyframes particleRise {
    0%   { opacity: 0; transform: translateY(0) scale(0.8); }
    20%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(-80px) scale(1.3); }
  }
  @keyframes bgPulse {
    0%,100% { opacity: 0.45; }
    50%      { opacity: 0.70; }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(26,122,74,0); }
    50%      { box-shadow: 0 0 0 12px rgba(26,122,74,0.15); }
  }
  @keyframes ringExpand {
    0%   { transform: translate(-50%,-50%) scale(0.85); opacity: 0.7; }
    100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
  }
  @keyframes badgeSlide {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pillBounce {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-4px); }
  }
  @keyframes tickerScroll {
    from { transform: translateX(0%); }
    to   { transform: translateX(-50%); }
  }
  @keyframes crispBadge {
    0%   { opacity:0; transform: rotate(-18deg) scale(0.5); }
    70%  { transform: rotate(4deg) scale(1.08); }
    100% { opacity:1; transform: rotate(-8deg) scale(1); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .font-hero { font-family: 'Playfair Display', Georgia, serif; }
  .font-body { font-family: 'DM Sans', sans-serif; }

  .anim-fadeUp     { animation: fadeUp 0.75s cubic-bezier(.22,1,.36,1) both; }
  .anim-fadeIn     { animation: fadeIn 0.6s ease both; }
  .anim-slideRight { animation: slideRight 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-annaEnter  { animation: annaEnter 1s cubic-bezier(.22,1,.36,1) both; }
  .anim-annaFloat  { animation: annaFloat 4.5s ease-in-out infinite; }
  .anim-productEnter { animation: productEnter 1.1s cubic-bezier(.22,1,.36,1) both; }
  .anim-productFloat { animation: productFloat 3.8s ease-in-out infinite; }
  .anim-productGlow  { animation: productGlow 2.8s ease-in-out infinite; }
  .anim-bubblePop  { animation: bubblePop 0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-checkIn    { animation: checkIn 0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-leafSway   { animation: leafSway 2.8s ease-in-out infinite alternate; }
  .anim-spinSlow   { animation: spinSlow 22s linear infinite; }
  .anim-crispBadge { animation: crispBadge 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-badgeSlide { animation: badgeSlide 0.6s cubic-bezier(.22,1,.36,1) both; }

  .d-50  { animation-delay: 0.05s; }
  .d-100 { animation-delay: 0.10s; }
  .d-200 { animation-delay: 0.20s; }
  .d-300 { animation-delay: 0.30s; }
  .d-400 { animation-delay: 0.40s; }
  .d-500 { animation-delay: 0.50s; }
  .d-600 { animation-delay: 0.60s; }
  .d-700 { animation-delay: 0.70s; }
  .d-800 { animation-delay: 0.80s; }
  .d-900 { animation-delay: 0.90s; }
  .d-1000{ animation-delay: 1.00s; }
  .d-1100{ animation-delay: 1.10s; }
  .d-1200{ animation-delay: 1.20s; }
  .d-1400{ animation-delay: 1.40s; }

  .green-shimmer {
    background: linear-gradient(90deg, #1a7a4a 0%, #22c55e 35%, #4ade80 50%, #22c55e 65%, #1a7a4a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3.5s linear infinite;
  }
  .gold-shimmer {
    background: linear-gradient(90deg, #a06000 0%, #f5c518 40%, #fde68a 55%, #f5c518 70%, #a06000 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 4s linear infinite;
  }

  /* Hero grid */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    gap: 0 2rem;
  }
  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      align-items: center;
    }
    .hero-left  { order: 2; text-align: center; }
    .hero-center{ order: 1; }
    .hero-right { order: 3; }
  }

  /* Buttons */
  .btn-primary {
    position: relative; overflow: hidden;
    transition: transform 0.22s, box-shadow 0.22s;
  }
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(26,122,74,0.38);
  }
  .btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
  }

  .btn-outline {
    transition: transform 0.22s, background 0.22s, box-shadow 0.22s;
  }
  .btn-outline:hover {
    transform: translateY(-3px);
    background: rgba(26,122,74,0.07);
    box-shadow: 0 8px 22px rgba(26,122,74,0.14);
  }

  /* Anna hover */
  .anna-wrap {
    cursor: pointer;
    transition: filter 0.35s, transform 0.35s;
  }
  .anna-wrap:hover {
    filter: drop-shadow(0 18px 38px rgba(26,122,74,0.35)) brightness(1.05);
    transform: scale(1.025) translateY(-4px);
  }

  /* Product hover */
  .product-wrap {
    cursor: pointer;
    transition: filter 0.35s, transform 0.35s;
  }
  .product-wrap:hover {
    filter: drop-shadow(0 22px 44px rgba(245,197,24,0.7)) brightness(1.08);
   rotate(-2deg) translateY(-6px);
  }

  /* Speech bubble */
  .bubble {
    position: absolute;
    background: white;
    border: 1.5px solid rgba(26,122,74,0.20);
    border-radius: 16px 16px 16px 4px;
    padding: 10px 15px;
    font-size: 12.5px;
    line-height: 1.5;
    color: #222;
    box-shadow: 0 6px 24px rgba(0,0,0,0.10);
    white-space: nowrap;
    max-width: 220px;
    white-space: normal;
    z-index: 40;
  }
  .bubble::after {
    content: '';
    position: absolute;
    bottom: 10px; right: -10px;
    border: 5.5px solid transparent;
    border-left: 10px solid white;
  }
  .bubble::before {
    content: '';
    position: absolute;
    bottom: 9px; right: -13px;
    border: 6.5px solid transparent;
    border-left: 11px solid rgba(26,122,74,0.18);
  }

  /* Ticker */
  .ticker-inner {
    display: flex;
    gap: 2.5rem;
    animation: tickerScroll 18s linear infinite;
    width: max-content;
  }
  .ticker-inner:hover { animation-play-state: paused; }

  /* Stat card hover */
  .stat-card {
    transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  }
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 32px rgba(26,122,74,0.13);
    border-color: rgba(26,122,74,0.3);
  }

  /* Crispy badge spin on hover */
  .crispy-badge:hover .badge-inner {
    animation: spinSlow 2s linear infinite;
  }
`;

const TRUST_BADGES = [
  { icon: "✓", label: "100% Hygienic" },
  { icon: "✓", label: "Premium Ingredients" },
  { icon: "✓", label: "Fresh Daily" },
];

const TICKER_ITEMS = [
  "🌶️ Yellow Jalapeño Paper",
  "🫙 Masala Dosa Chips",
  "🥥 Coconut Crunch",
  "🌿 Green Chilli Twist",
  "⭐ Award Winning Taste",
  "📦 Pan-Gujarat Delivery",
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [productBubble, setProductBubble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);
  const [hovered, setHovered] = useState(false);
  const handleAnnaClick = () => {
    const msgs = [
      "Try Yellow Jalapeño Paper! 🌶️",
      "Crispiest dosa in Gujarat! 😋",
      "Made with love & tradition ❤️",
      "Fresh every day, guaranteed! ✓",
      "Vanakkam! Taste South India! 🙏",
    ];

  };

  const handleProductClick = () => {
    setProductBubble(true);
    setTimeout(() => setProductBubble(false), 2200);
  };

  return (
    <>
      <style suppressHydrationWarning>{GLOBAL_STYLES}</style>

      <section id="home"
        className="font-body mt-[-100] relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(148deg, #f6faf0 0%, #eef7e4 35%, #faf7ec 70%, #fdf9f0 100%)",
          minHeight: "100vh",
        }}
      >
        {/* ── Animated background orbs ── */}
        {[
          { w: 520, h: 420, top: -120, right: -100, color: "#c4e8a8", delay: "0s" },
          { w: 340, h: 340, bottom: -100, left: "20%", color: "#d4efc0", delay: "2.8s" },
          { w: 200, h: 200, top: "40%", left: "8%", color: "#fde8a8", delay: "1.4s" },
        ].map((orb, i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              width: orb.w, height: orb.h,
              top: orb.top, bottom: orb.bottom,
              left: orb.left, right: orb.right,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 72%)`,
              opacity: 0.42,
              animation: `orbDrift ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}

        {/* ── Subtle diagonal grid pattern ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #1a7a4a 0, #1a7a4a 1px, transparent 0, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── Floating particles ── */}
        {mounted && [
          { x: "15%", delay: "0.5s", dur: "5s", size: 6 },
          { x: "42%", delay: "1.2s", dur: "6.5s", size: 4 },
          { x: "68%", delay: "0.2s", dur: "4.8s", size: 5 },
          { x: "80%", delay: "2s", dur: "7s", size: 3 },
          { x: "28%", delay: "1.8s", dur: "5.5s", size: 4 },
        ].map((p, i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: p.x, bottom: "12%",
              width: p.size, height: p.size,
              background: "#22c55e",
              opacity: 0,
              animation: `particleRise ${p.dur} ease-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* ── Spinning decorative ring (top-right corner) ── */}
        <div
          className="anim-spinSlow mt-[-100px] pointer-events-none absolute"
          style={{
            top: 40, right: 60,
            width: 90, height: 90,
            border: "1.5px dashed rgba(26,122,74,0.18)",
            borderRadius: "50%",
          }}
        />
        <div
          className="pointer-events-none absolute "
          style={{
            top: 52, right: 72,
            width: 66, height: 66,
            border: "1px solid rgba(245,197,24,0.22)",
            borderRadius: "50%",
          }}
        />

        {/* ── Watermark text ── */}
        <div
          className="font-hero pointer-events-none absolute select-none"
          style={{
            right: 18, top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontSize: 9.5, letterSpacing: "0.38em",
            color: "rgba(26,122,74,0.09)", fontWeight: 800,
          }}
        >
          AUTHENTIC · PREMIUM · SINCE 2020
        </div>

        {/* ══════════════════════════════════════════════
            HERO GRID  — Left | Center (Anna) | Right (product)
        ══════════════════════════════════════════════ */}
        <div
          className="hero-grid relative max-w-7xl mx-auto px-6 lg:px-12"
          style={{ paddingTop: "clamp(60px, 10vh, 120px)", paddingBottom: 0, minHeight: "88vh" }}
        >

          {/* ════════ LEFT — copy ════════ */}
          <div className="hero-left flex flex-col gap-5 pb-16 z-10" style={{ maxWidth: 420 }}>

            {/* Pill tag */}
            {mounted && (
              <div className="anim-slideRight d-100">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(245,197,24,0.16)",
                    border: "1.5px solid rgba(245,197,24,0.42)",
                    color: "#8a5a00",
                    fontFamily: "'DM Sans', sans-serif",
                    animation: "pillBounce 2.5s ease-in-out infinite",
                    animationDelay: "1.5s",
                  }}
                >
                  <span>✦</span> Authentic South Indian Taste
                </span>
              </div>
            )}

            {/* Headline */}
            {mounted && (
              <h1
                className="font-hero anim-fadeUp d-200"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                  lineHeight: 1.14,
                  color: "#111",
                  letterSpacing: "-0.01em",
                }}
              >
                India's Premium
                <br />
                <span className="green-shimmer">Ready-to-Eat</span>
                <br />
                Crispy Dosa Snack
              </h1>
            )}

            {/* Sub copy */}
            {mounted && (
              <p
                className="anim-fadeUp d-400"
                style={{
                  color: "#556", fontSize: "0.93rem",
                  lineHeight: 1.72, maxWidth: 340,
                }}
              >
                Authentic South Indian taste crafted with premium ingredients —
                delivered fresh across Gujarat with uncompromising quality.
              </p>
            )}

            {/* CTA buttons */}
            {mounted && (
              <div className="anim-fadeUp d-500 flex flex-wrap gap-3 mt-1">
                <button
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, #1a7a4a 0%, #16a34a 100%)" }}
                >
                  Become Distributor
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="btn-outline flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                  style={{ border: "1.5px solid #1a7a4a", color: "#1a7a4a", background: "white" }}
                >
                  Contact Us
                </button>
              </div>
            )}

            {/* Trust checkmarks */}
            {mounted && (
              <div className="anim-fadeUp d-700 flex flex-wrap gap-x-5 gap-y-2 mt-1">
                {TRUST_BADGES.map((b, i) => (
                  <div
                    key={b.label}
                    className="anim-checkIn flex items-center gap-1.5"
                    style={{ animationDelay: `${0.85 + i * 0.13}s` }}
                  >
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0"
                      style={{ background: "rgba(26,122,74,0.12)", color: "#1a7a4a" }}
                    >
                      {b.icon}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#4a4a4a", fontWeight: 500 }}>
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            )}





          </div>

          {/* ════════ CENTER — Anna mascot ════════ */}
          {mounted && (
            <div
              className="hero-center flex flex-col items-center justify-end z-20 relative"
              style={{ width: "clamp(200px, 28vw, 340px)", alignSelf: "end" }}
            >
              {/* Speech bubble */}




            </div>
          )}

          {/* ════════ RIGHT — product image ════════ */}
          {mounted && (
            <div
              className="hero-right flex flex-col items-center justify-end z-10 pb-16 relative"
              style={{ alignSelf: "end" }}
            >
              {/* "Crispy!" spinning badge */}
              <div
                className="crispy-badge anim-crispBadge d-1000 absolute z-30"
                style={{ top: "14%", right: "8%", cursor: "default" }}
              >
                <div
                  style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #f5c518 0%, #fde68a 100%)",
                    border: "2.5px solid rgba(180,130,0,0.3)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    boxShadow: "0 6px 20px rgba(245,197,24,0.5)",
                    transform: "rotate(12deg)",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#5a3a00", lineHeight: 1.2 }}>
                    SO
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#2a1800" }}>
                    CRISPY
                  </span>
                  <span style={{ fontSize: 9, color: "#7a5000" }}>!!</span>
                </div>
              </div>

              {/* Product bubble on click */}
              {productBubble && (
                <div
                  className="anim-bubblePop absolute z-40"
                  style={{
                    top: "28%", left: "-10%",
                    background: "white",
                    border: "1.5px solid rgba(245,197,24,0.4)",
                    borderRadius: "14px",
                    padding: "8px 13px",
                    fontSize: 12,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
                    whiteSpace: "nowrap",
                    color: "#333",
                  }}
                >
                  🌶️ Yellow Jalapeño Paper!
                </div>
              )}

              {/* Product image */}
              <div
                className="product-wrap anim-productEnter mt-20 anim-productFloat anim-productGlow flex items-center justify-center"
                onClick={handleProductClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ position: "relative", height: "600px" }} // ✅ FIX
              >
                {/* Glow backdrop */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 70% 90% at 50% 60%, rgba(245,197,24,0.22) 0%, transparent 70%)",
                    borderRadius: "50%",
                    transform: "scale(1.3)",
                  }}
                />

                {/* Default Image */}
                {mounted && (
                  <div
                    className="hero-right flex flex-col items-center justify-end z-10 pb-16 relative"
                    style={{ alignSelf: "end" }}
                  >
                    <div
                      className="product-wrap anim-productEnter d-600 anim-productFloat anim-productGlow"
                      onClick={handleProductClick}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      style={{
                        position: "relative",
                        width: "400px",
                        height: "600px",
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 70% 90% at 50% 60%, rgba(245,197,24,0.22) 0%, transparent 70%)",
                          borderRadius: "50%",
                          transform: "scale(1.3)",
                        }}
                      />

                      <Image
                        src="/anna-image2.png"
                        alt="Default Product"
                        fill
                        priority
                        sizes="400px"
                        className={`object-contain transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"
                          }`}
                      />

                      <Image
                        src="/product-hero.png"
                        alt="Hover Product"
                        fill
                        priority
                        sizes="600px"
                        className={`object-contain transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </div>
                  </div>
                )}
              </div>              {/* Floating leaf decor */}
              <span
                className="anim-leafSway absolute text-2xl pointer-events-none"
                style={{ top: "22%", left: -20, opacity: 0.7, animationDelay: "0s" }}
              >🌿</span>
              <span
                className="anim-leafSway absolute text-sm pointer-events-none"
                style={{ top: "38%", right: -16, opacity: 0.5, animationDelay: "1.3s" }}
              >🌿</span>

              {/* Glow ring under Anna */}
              <div
                className=" ml-20 mb-70 absolute pointer-events-none"
                style={{
                  bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: 180, height: 28,
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(26,122,74,0.20) 0%, transparent 70%)",
                }}
              />
              {/* Expanding ring animation */}
              <div
                className=" ml-20 mb-[260px] absolute pointer-events-none"
                style={{
                  bottom: 8, left: "50%",
                  width: 130, height: 20,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(26,122,74,0.25)",
                  animation: "ringExpand 2.5s ease-out infinite",
                }}
              />


              {/* Side badges */}
              {/* <div className="flex  flex-col gap-2 mt-6">
                {[
                  { color: "#f0fdf4", border: "#bbf7d0", text: "#166534", label: "Pan-Gujarat Delivery" },
                  { color: "#fffbeb", border: "#fde68a", text: "#92400e", label: "Premium Packaging" },
                ].map((b, i) => (
                  <div
                    key={b.label}
                    className="anim-badgeSlide mt-[-100px] flex  items-center  px-4 py-2 rounded-full"
                    style={{
                      background: b.color,
                      border: `1.5px solid ${b.border}`,
                      animationDelay: `${1.0 + i * 0.15}s`,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{i === 0 ? "🚚" : "📦"}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: b.text }}>{b.label}</span>
                  </div>
                ))}
              </div>*/}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM TICKER STRIP
        ══════════════════════════════════════════════ */}
        {mounted && (
          <div
            className="anim-fadeIn d-1400 relative w-full overflow-hidden"
            style={{
              background: "#1a7a4a",
              borderTop: "2px solid rgba(245,197,24,0.4)",
              padding: "12px 0",
              marginTop: "auto",
            }}
          >
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{ background: "linear-gradient(to right, #1a7a4a, transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{ background: "linear-gradient(to left, #1a7a4a, transparent)" }}
            />
            <div className="ticker-inner">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="font-body flex items-center gap-3 whitespace-nowrap"
                  style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.90)" }}
                >
                  {item}
                  <span style={{ color: "rgba(245,197,24,0.55)", fontSize: 10 }}>◆</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}