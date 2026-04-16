"use client";

import { useEffect, useRef, useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes cardReveal {
    from { opacity:0; transform:translateY(32px) scale(0.96); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes slideRight {
    from { opacity:0; transform:translateX(-20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes checkPop {
    0%   { opacity:0; transform:scale(0.3) rotate(-20deg); }
    70%  { transform:scale(1.2) rotate(4deg); }
    100% { opacity:1; transform:scale(1) rotate(0); }
  }
  @keyframes lineGrow {
    from { width:0; opacity:0; }
    to   { width:100%; opacity:1; }
  }
  @keyframes shimmerGold {
    0%   { background-position:-200% center; }
    100% { background-position:200% center; }
  }
  @keyframes iconFloat {
    0%,100% { transform:translateY(0) rotate(-2deg); }
    50%      { transform:translateY(-6px) rotate(2deg); }
  }
  @keyframes orbPulse {
    0%,100% { opacity:0.18; transform:scale(1); }
    50%      { opacity:0.30; transform:scale(1.06); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes borderGlow {
    0%,100% { box-shadow:0 0 0 0 rgba(245,197,24,0); }
    50%      { box-shadow:0 0 0 6px rgba(245,197,24,0.18); }
  }
  @keyframes btnShine {
    from { transform:translateX(-100%) skewX(-20deg); }
    to   { transform:translateX(220%) skewX(-20deg); }
  }
  @keyframes rowSlide {
    from { opacity:0; transform:translateX(-16px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes dotBlink {
    0%,100% { opacity:1; }
    50%      { opacity:0.3; }
  }
  @keyframes spinSlow {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  @keyframes leafSway {
    0%,100% { transform:rotate(-10deg); }
    50%      { transform:rotate(8deg); }
  }

  .do-hero { font-family:'Playfair Display',Georgia,serif; }
  .do-body { font-family:'DM Sans',sans-serif; }

  .anim-fadeUp     { animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fadeIn     { animation:fadeIn 0.6s ease both; }
  .anim-cardReveal { animation:cardReveal 0.75s cubic-bezier(.22,1,.36,1) both; }
  .anim-slideRight { animation:slideRight 0.65s cubic-bezier(.22,1,.36,1) both; }
  .anim-checkPop   { animation:checkPop 0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-lineGrow   { animation:lineGrow 0.65s cubic-bezier(.22,1,.36,1) both; }
  .anim-rowSlide   { animation:rowSlide 0.6s cubic-bezier(.22,1,.36,1) both; }
  .anim-spinSlow   { animation:spinSlow 20s linear infinite; }

  .d-0  { animation-delay:0.00s; }
  .d-1  { animation-delay:0.08s; }
  .d-2  { animation-delay:0.16s; }
  .d-3  { animation-delay:0.24s; }
  .d-4  { animation-delay:0.32s; }
  .d-5  { animation-delay:0.40s; }
  .d-6  { animation-delay:0.50s; }
  .d-7  { animation-delay:0.60s; }
  .d-8  { animation-delay:0.70s; }
  .d-9  { animation-delay:0.80s; }
  .d-10 { animation-delay:0.90s; }
  .d-11 { animation-delay:1.00s; }
  .d-12 { animation-delay:1.10s; }
  .d-13 { animation-delay:1.20s; }

  .gold-shimmer {
    background:linear-gradient(90deg,#f5c518 0%,#fde68a 38%,#fff8c0 52%,#fde68a 68%,#f5c518 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmerGold 3.2s linear infinite;
  }

  /* Feature cards */
  .feat-card {
    transition: transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s, border-color 0.32s, background 0.32s;
    cursor: default;
  }
  .feat-card:hover {
    transform: translateY(-8px) scale(1.025);
    box-shadow: 0 24px 52px rgba(0,0,0,0.28);
    border-color: rgba(245,197,24,0.45) !important;
    background: rgba(255,255,255,0.12) !important;
  }
  .feat-card:hover .feat-icon {
    animation: iconFloat 1.8s ease-in-out infinite;
  }

  /* Investment rows */
  .inv-row {
    transition: background 0.22s, padding-left 0.22s;
    border-radius: 10px;
  }
  .inv-row:hover {
    background: rgba(255,255,255,0.07);
    padding-left: 8px;
  }

  /* Apply button */
  .apply-btn {
    position: relative;
    overflow: hidden;
    transition: transform 0.22s, box-shadow 0.22s;
  }
  .apply-btn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 14px 36px rgba(245,197,24,0.50);
  }
  .apply-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -60%;
    width: 45%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    transform: skewX(-20deg);
    opacity: 0;
    transition: opacity 0s;
  }
  .apply-btn:hover::after {
    opacity: 1;
    animation: btnShine 0.6s ease forwards;
  }

  /* Benefits check rows */
  .ben-row {
    transition: transform 0.2s, opacity 0.2s;
  }
  .ben-row:hover {
    transform: translateX(5px);
  }

  /* Bottom card */
  .bottom-card {
    transition: box-shadow 0.35s;
  }
  .bottom-card:hover {
    box-shadow: 0 28px 64px rgba(0,0,0,0.32);
  }
`;

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20 L10 14 L16 18 L24 6" stroke="#f5c518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 6 L24 6 L24 11" stroke="#f5c518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "High Demand Product",
    desc: "Ready-to-eat snacks are India's fastest-growing category with consistent demand",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="6" stroke="#f5c518" strokeWidth="2.2" fill="none"/>
        <path d="M9 24 Q14 16 19 24" stroke="#f5c518" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <circle cx="14" cy="10" r="2.5" fill="#f5c518" opacity="0.7"/>
        <path d="M12 22 L14 19 L16 22" stroke="#f5c518" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Good Profit Margin",
    desc: "Attractive margins with premium positioning and strong brand value",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 10 L14 5 L22 10 L22 18 Q14 24 6 18 Z" stroke="#f5c518" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
        <path d="M10 14 L13 17 L18 11" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Fast Moving Item",
    desc: "Quick inventory turnover with 90-day shelf life and high repeat purchase",
  },
];

const BENEFITS = [
  "Exclusive territory rights",
  "Marketing & promotional support",
  "Training & onboarding assistance",
  "Attractive credit terms",
  "Dedicated relationship manager",
];

const INV_ROWS = [
  { label: "Minimum Investment", value: "₹2–5 Lakhs" },
  { label: "Area Required",      value: "200–500 sq ft" },
  { label: "Expected ROI",       value: "25–35% annually" },
];

function useInView(threshold = 0.12) {
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

export default function DistributorOpportunity() {
  const [sectionRef, visible] = useInView(0.08);

  return (
    <>
      <style suppressHydrationWarning>{STYLES}</style>

      <section id="distribution"
        ref={sectionRef}
        className="do-body relative w-full overflow-hidden py-20 px-4"
        style={{ background: "linear-gradient(160deg,#1a6640 0%,#1a7a4a 40%,#166638 100%)" }}
      >
        {/* ── Background texture dots ── */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"24px 24px" }} />

        {/* ── Ambient orbs ── */}
        {[
          { w:380,h:380,top:-100,left:-80,delay:"0s" },
          { w:260,h:260,bottom:-60,right:-60,delay:"3s" },
          { w:180,h:180,top:"40%",right:"15%",delay:"1.5s" },
        ].map((o,i) => (
          <div key={i} className="pointer-events-none absolute rounded-full"
            style={{ width:o.w,height:o.h,top:o.top,bottom:o.bottom,left:o.left,right:o.right,
              background:"radial-gradient(circle,rgba(255,255,255,0.14) 0%,transparent 70%)",
              animation:`orbPulse ${7+i*2}s ease-in-out infinite`,animationDelay:o.delay }} />
        ))}

        {/* ── Spinning ring ── */}
        <div className="anim-spinSlow pointer-events-none absolute"
          style={{ top:28,right:52,width:72,height:72,
            border:"1.5px dashed rgba(245,197,24,0.22)",borderRadius:"50%" }} />
        <div className="pointer-events-none absolute"
          style={{ top:40,right:64,width:48,height:48,
            border:"1px solid rgba(255,255,255,0.10)",borderRadius:"50%" }} />

        {/* ── Diagonal accent line ── */}
        <div className="pointer-events-none absolute"
          style={{ top:0,left:"30%",width:"1px",height:"100%",
            background:"linear-gradient(to bottom,transparent,rgba(245,197,24,0.10),transparent)",
            transform:"rotate(8deg)",transformOrigin:"top center" }} />

        <div className="relative max-w-5xl mx-auto">

          {/* ── Heading ── */}
          <div className="text-center mb-12">
            {visible && (
              <>
                <p className="anim-fadeUp d-0 do-body text-xs font-semibold tracking-[0.22em] uppercase mb-3"
                  style={{ color:"rgba(245,197,24,0.80)" }}>
                  <span style={{ display:"inline-block",width:6,height:6,borderRadius:"50%",
                    background:"#f5c518",marginRight:8,verticalAlign:"middle",
                    animation:"dotBlink 1.8s ease-in-out infinite" }} />
                  Partner With Us
                </p>
                <h2 className="anim-fadeUp d-1 do-hero font-bold"
                  style={{ fontSize:"clamp(1.8rem,4vw,2.9rem)",color:"white",lineHeight:1.15 }}>
                  Distributor{" "}
                  <span className="gold-shimmer">Opportunity</span>
                </h2>
                <p className="anim-fadeUp d-3 do-body mt-3 text-sm"
                  style={{ color:"rgba(255,255,255,0.65)",maxWidth:340,margin:"12px auto 0",lineHeight:1.7 }}>
                  Join India's fastest-growing premium snack brand
                </p>
                {/* divider */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <div className="anim-lineGrow d-4 h-px"
                    style={{ width:56,background:"linear-gradient(to right,transparent,rgba(245,197,24,0.55))" }} />
                  <div style={{ width:8,height:8,borderRadius:"50%",background:"#f5c518",opacity:0.8 }} />
                  <div className="anim-lineGrow d-4 h-px"
                    style={{ width:56,background:"linear-gradient(to left,transparent,rgba(245,197,24,0.55))" }} />
                </div>
              </>
            )}
          </div>

          {/* ── Feature cards ── */}
          {visible && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`feat-card anim-cardReveal d-${3 + i} flex flex-col gap-3 p-6 rounded-2xl`}
                  style={{
                    background:"rgba(255,255,255,0.08)",
                    border:"1.5px solid rgba(255,255,255,0.14)",
                    backdropFilter:"blur(10px)",
                  }}
                >
                  <div className="feat-icon w-10 h-10 flex items-center justify-center rounded-xl"
                    style={{ background:"rgba(245,197,24,0.14)",border:"1px solid rgba(245,197,24,0.25)" }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="do-hero font-bold text-base" style={{ color:"white",lineHeight:1.25 }}>
                      {f.title}
                    </h3>
                    <p className="do-body text-xs mt-1.5 leading-relaxed" style={{ color:"rgba(255,255,255,0.60)" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Bottom card: Investment + Benefits ── */}
          {visible && (
            <div
              className="bottom-card anim-cardReveal d-6 rounded-3xl overflow-hidden"
              style={{
                background:"rgba(255,255,255,0.09)",
                border:"1.5px solid rgba(255,255,255,0.15)",
                backdropFilter:"blur(14px)",
                boxShadow:"0 20px 56px rgba(0,0,0,0.22)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                {/* Investment Details */}
                <div className="p-8 md:p-10"
                  style={{ borderRight:"1px solid rgba(255,255,255,0.10)" }}>
                  <h4 className="do-hero font-bold text-lg mb-6" style={{ color:"white" }}>
                    Investment Details
                  </h4>
                  <div className="flex flex-col gap-1">
                    {INV_ROWS.map((row, i) => (
                      <div key={row.label}>
                        <div
                          className={`inv-row anim-rowSlide d-${7+i} flex items-center justify-between py-3 px-2`}
                        >
                          <span className="do-body text-sm" style={{ color:"rgba(255,255,255,0.60)" }}>
                            {row.label}
                          </span>
                          <span className="do-hero font-bold text-sm" style={{ color:"white" }}>
                            {row.value}
                          </span>
                        </div>
                        {i < INV_ROWS.length - 1 && (
                          <div style={{ height:1,background:"rgba(255,255,255,0.08)",margin:"0 8px" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What You Get */}
                <div className="p-8 md:p-10 flex flex-col gap-6">
                  <h4 className="do-hero font-bold text-lg" style={{ color:"white" }}>
                    What You Get
                  </h4>
                  <div className="flex flex-col gap-3">
                    {BENEFITS.map((b, i) => (
                      <div
                        key={b}
                        className={`ben-row anim-rowSlide d-${7+i} flex items-center gap-3`}
                      >
                        <span
                          className="anim-checkPop flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full"
                          style={{ background:"rgba(245,197,24,0.20)",border:"1.5px solid rgba(245,197,24,0.45)",
                            animationDelay:`${0.75 + i*0.10}s` }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5.5l2 2 4-4" stroke="#f5c518" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span className="do-body text-sm" style={{ color:"rgba(255,255,255,0.80)" }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-2">
                    <button className="apply-btn do-body inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm"
                      style={{ background:"linear-gradient(135deg,#f5c518 0%,#e8a828 100%)",
                        color:"#1a1a00",
                        boxShadow:"0 8px 24px rgba(245,197,24,0.35)" }}>
                      Apply Now
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="#1a1a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}