"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity:0; transform:translateX(30px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes imageReveal {
    from { opacity:0; transform:scale(0.94) translateY(18px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes checkPop {
    0%   { opacity:0; transform:scale(0.3) rotate(-20deg); }
    70%  { transform:scale(1.2) rotate(5deg); }
    100% { opacity:1; transform:scale(1) rotate(0); }
  }
  @keyframes shimmerGreen {
    0%   { background-position:-200% center; }
    100% { background-position:200% center; }
  }
  @keyframes lineGrow {
    from { width:0; opacity:0; }
    to   { width:100%; opacity:1; }
  }
  @keyframes featureSlide {
    from { opacity:0; transform:translateX(22px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes statFade {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes imageFloat {
    0%,100% { transform:translateY(0px) rotate(-0.3deg); }
    50%      { transform:translateY(-8px) rotate(0.3deg); }
  }
  @keyframes orbPulse {
    0%,100% { transform:scale(1); opacity:0.35; }
    50%      { transform:scale(1.08); opacity:0.55; }
  }
  @keyframes badgeSlide {
    from { opacity:0; transform:translateX(-18px) rotate(-6deg); }
    to   { opacity:1; transform:translateX(0) rotate(-6deg); }
  }
  @keyframes ringExpand {
    0%   { transform:translate(-50%,-50%) scale(0.88); opacity:0.6; }
    100% { transform:translate(-50%,-50%) scale(1.6); opacity:0; }
  }
  @keyframes dotPulse {
    0%,100% { transform:scale(1); opacity:1; }
    50%      { transform:scale(1.6); opacity:0.5; }
  }
  @keyframes spinSlow {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  @keyframes gradientShift {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }

  .pp-hero  { font-family:'Playfair Display',Georgia,serif; }
  .pp-body  { font-family:'DM Sans' }

  .anim-fadeUp     { animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fadeLeft   { animation:fadeLeft 0.75s cubic-bezier(.22,1,.36,1) both; }
  .anim-imgReveal  { animation:imageReveal 0.95s cubic-bezier(.22,1,.36,1) both; }
  .anim-imgFloat   { animation:imageFloat 4.5s ease-in-out infinite; }
  .anim-checkPop   { animation:checkPop 0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-featureSlide{ animation:featureSlide 0.6s cubic-bezier(.22,1,.36,1) both; }
  .anim-statFade   { animation:statFade 0.6s cubic-bezier(.22,1,.36,1) both; }
  .anim-badgeSlide { animation:badgeSlide 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-spinSlow   { animation:spinSlow 18s linear infinite; }

  .d-0  { animation-delay:0.00s; }
  .d-1  { animation-delay:0.10s; }
  .d-2  { animation-delay:0.20s; }
  .d-3  { animation-delay:0.30s; }
  .d-4  { animation-delay:0.40s; }
  .d-5  { animation-delay:0.50s; }
  .d-6  { animation-delay:0.60s; }
  .d-7  { animation-delay:0.70s; }
  .d-8  { animation-delay:0.80s; }
  .d-9  { animation-delay:0.90s; }
  .d-10 { animation-delay:1.00s; }
  .d-11 { animation-delay:1.10s; }
  .d-12 { animation-delay:1.20s; }

  .green-shimmer {
    background:linear-gradient(90deg,#1a7a4a 0%,#22c55e 38%,#4ade80 52%,#22c55e 68%,#1a7a4a 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmerGreen 3.2s linear infinite;
  }

  .card-hover {
    transition:transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s;
  }
  .card-hover:hover {
    transform:translateY(-6px);
    box-shadow:0 28px 60px rgba(26,122,74,0.14);
  }

  .feature-row {
    transition:background 0.22s, transform 0.22s;
    border-radius:14px;
    padding:10px 12px;
    margin:-4px -12px;
    cursor:default;
  }
  .feature-row:hover {
    background:rgba(26,122,74,0.06);
    transform:translateX(4px);
  }

  .stat-box {
    transition:transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  }
  .stat-box:hover {
    transform:translateY(-4px);
    box-shadow:0 10px 28px rgba(26,122,74,0.12);
    border-color:rgba(26,122,74,0.28);
  }

  .img-wrap {
    transition:filter 0.35s, transform 0.35s;
  }
  .img-wrap:hover {
    filter:brightness(1.04) contrast(1.03);
  }

  .line-grow {
    animation:lineGrow 0.7s cubic-bezier(.22,1,.36,1) both;
  }

  .dot-pulse {
    animation:dotPulse 1.8s ease-in-out infinite;
  }
`;

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#1a7a4a" strokeWidth="1.6" />
        <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="#1a7a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Extra Crispy",
    sub: "Perfect crunch in every bite",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#1a7a4a" strokeWidth="1.6" />
        <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="#1a7a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "100% Hygienic",
    sub: "Manufactured in certified facilities",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#1a7a4a" strokeWidth="1.6" />
        <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="#1a7a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Premium Quality",
    sub: "Best ingredients, no compromise",
  },
];

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function PremiumProduct() {
  const [sectionRef, visible] = useInView(0.12);

  return (
    <>
      <style suppressHydrationWarning>{STYLES}</style>

      <section
        ref={sectionRef}
        className="pp-body relative w-full overflow-hidden py-20 px-4"
        style={{ background: "linear-gradient(160deg,#f6faf0 0%,#eef7e4 45%,#faf8f0 100%)" }}
      >
        {/* ── Background orbs ── */}
        <div className="pointer-events-none absolute rounded-full"
          style={{ width:380,height:380,top:-80,left:-100,
            background:"radial-gradient(circle,#c8e8a8 0%,transparent 70%)",
            opacity:0.35, animation:"orbPulse 7s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute rounded-full"
          style={{ width:260,height:260,bottom:-60,right:-60,
            background:"radial-gradient(circle,#d4efc0 0%,transparent 70%)",
            opacity:0.30, animation:"orbPulse 9s ease-in-out infinite",animationDelay:"3s" }} />

        {/* ── Subtle dot grid ── */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"radial-gradient(circle,#1a7a4a 1px,transparent 1px)",
            backgroundSize:"26px 26px" }} />

        {/* ── Spinning ring (decorative) ── */}
        <div className="anim-spinSlow pointer-events-none absolute"
          style={{ top:32,right:48,width:80,height:80,
            border:"1.5px dashed rgba(26,122,74,0.18)",borderRadius:"50%" }} />

        <div className="relative max-w-5xl mx-auto">

          {/* ── Section heading ── */}
          <div className="text-center mb-12">
            {visible && (
              <>
                <p className={`anim-fadeUp d-0 pp-body text-xs font-semibold tracking-[0.22em] uppercase mb-3`}
                  style={{ color:"#1a7a4a" }}>
                  <span className="dot-pulse inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-2 align-middle" />
                  Crafted with Tradition
                </p>
                <h2 className={`anim-fadeUp d-1 pp-hero font-bold`}
                  style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)",color:"#111",lineHeight:1.15 }}>
                  Our <span className="green-shimmer">Premium Product</span>
                </h2>
                <p className={`anim-fadeUp d-3 pp-body mt-3 text-sm`}
                  style={{ color:"#666",maxWidth:360,margin:"12px auto 0",lineHeight:1.7 }}>
                  Experience the perfect blend of tradition and quality
                </p>
                {/* Animated divider */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <div className={`line-grow d-4 h-px`}
                    style={{ width:56,background:"linear-gradient(to right,transparent,#c8b97a)" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background:"#e8a838" }} />
                  <div className={`line-grow d-4 h-px`}
                    style={{ width:56,background:"linear-gradient(to left,transparent,#c8b97a)" }} />
                </div>
              </>
            )}
          </div>

          {/* ── Main card ── */}
          {visible && (
            <div
              className="card-hover anim-fadeUp d-3 grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              style={{
                borderRadius:28,
                background:"rgba(255,255,255,0.82)",
                backdropFilter:"blur(16px)",
                border:"1.5px solid rgba(26,122,74,0.12)",
                boxShadow:"0 20px 60px rgba(0,0,0,0.09)",
              }}
            >
              {/* ── Left: food image ── */}
              <div
                className="relative overflow-hidden"
                style={{ minHeight:340, background:"#f0f4ea" }}
              >
                {/* Image fill with gradient overlay */}
                <div className="absolute inset-0">
                  <div
                    className="img-wrap anim-imgReveal d-4 anim-imgFloat w-full h-full"
                    style={{ position:"relative" }}
                  >
                    <Image
                      src="/product-hero.png"
                      alt="Ready-to-Eat Dosa Paper"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Gradient fade to right */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background:"linear-gradient(to right,transparent 55%,rgba(255,255,255,0.9) 100%)" }} />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background:"linear-gradient(to top,rgba(240,244,234,0.6) 0%,transparent 40%)" }} />
                </div>

                {/* "New" badge */}
                <div
                  className="anim-badgeSlide d-8 absolute z-10"
                  style={{ top:20,left:18 }}
                >
                  <span className="pp-body inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background:"#1a7a4a",color:"white",
                      boxShadow:"0 4px 14px rgba(26,122,74,0.4)" }}>
                    ✦ New Pack
                  </span>
                </div>

                {/* Rating badge */}
                <div
                  className="anim-badgeSlide d-9 absolute z-10 flex items-center gap-1.5 px-3 py-2 rounded-2xl"
                  style={{ bottom:20,left:18,
                    background:"rgba(255,255,255,0.92)",
                    border:"1.5px solid rgba(26,122,74,0.14)",
                    boxShadow:"0 4px 16px rgba(0,0,0,0.08)",
                    backdropFilter:"blur(8px)" }}
                >
                  <span style={{ fontSize:14 }}>⭐</span>
                  <span className="pp-body font-bold text-xs" style={{ color:"#1a1a1a" }}>4.9</span>
                  <span className="pp-body text-xs" style={{ color:"#888" }}>/ 5.0</span>
                </div>
              </div>

              {/* ── Right: product info ── */}
              <div className="flex flex-col gap-5 p-8 md:p-10">

                {/* Product title */}
                <div>
                  <h3
                    className="anim-fadeLeft d-4 pp-hero font-bold"
                    style={{ fontSize:"clamp(1.3rem,2.5vw,1.7rem)",color:"#111",lineHeight:1.2 }}
                  >
                    Ready-to-Eat Dosa Paper
                  </h3>
                  <p
                    className="anim-fadeLeft d-5 pp-body mt-1 text-sm"
                    style={{ color:"#777",letterSpacing:"0.01em" }}
                  >
                    Crispy, authentic South Indian snack
                  </p>
                  {/* Animated underline */}
                  <div
                    className="line-grow d-6 mt-3 h-0.5 rounded-full"
                    style={{ background:"linear-gradient(to right,#1a7a4a,#4ade80,transparent)",
                      width:"70%",maxWidth:200 }}
                  />
                </div>

                {/* Features */}
                <div className="flex flex-col gap-1">
                  {FEATURES.map((f, i) => (
                    <div
                      key={f.title}
                      className={`feature-row anim-featureSlide d-${6 + i} flex items-start gap-3`}
                    >
                      <span className="anim-checkPop flex-shrink-0 mt-0.5"
                        style={{ animationDelay:`${0.65 + i * 0.13}s` }}>
                        {f.icon}
                      </span>
                      <div>
                        <p className="pp-body font-semibold text-sm" style={{ color:"#1a1a1a",lineHeight:1.3 }}>
                          {f.title}
                        </p>
                        <p className="pp-body text-xs mt-0.5" style={{ color:"#888" }}>
                          {f.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="line-grow d-10 h-px rounded-full"
                  style={{ background:"linear-gradient(to right,rgba(26,122,74,0.15),transparent)" }}
                />

                {/* Stats row */}
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label:"Pack Size", value:"100g, 200g, 500g" },
                    { label:"Shelf Life", value:"90 Days" },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className={`stat-box anim-statFade d-${10 + i} flex-1 min-w-[110px] rounded-2xl px-4 py-3`}
                      style={{
                        background:"rgba(26,122,74,0.05)",
                        border:"1.5px solid rgba(26,122,74,0.12)",
                      }}
                    >
                      <p className="pp-body text-xs font-medium" style={{ color:"#888" }}>{s.label}</p>
                      <p className="pp-hero font-bold text-sm mt-0.5" style={{ color:"#1a2a1a" }}>{s.value}</p>
                    </div>
                  ))}
                </div>

               
               
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}