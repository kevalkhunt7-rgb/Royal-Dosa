"use client";
import { useState } from "react";

const OUTER_TAGS = [
    { label: "PURE", dur: 9, delay: 0 },
    { label: "ROYAL", dur: 9, delay: -1.5 },
    { label: "CRISP", dur: 9, delay: -3 },
    { label: "FRESH", dur: 9, delay: -4.5 },
    { label: "TASTY", dur: 9, delay: -6 },
    { label: "100%", dur: 9, delay: -7.5 },
];

const INNER_TAGS = [
    { label: "NATURAL", dur: 6, delay: 0 },
    { label: "ORGANIC", dur: 6, delay: -2 },
    { label: "PREMIUM", dur: 6, delay: -4 },
];

export default function QualityBall() {
    const [hovered, setHovered] = useState(false);

    return (
        <div style={{ background: "linear-gradient(160deg,#f6faf0 0%,#eef7e4 45%,#faf8f0 100%)" }} className="min-h-[50vh] flex flex-col items-center justify-center px-5 py-10 ">

            {/* 🔥 Keyframes inside component */}
            <style>{`
        @keyframes orbitCW {
          from { transform: rotate(0deg) translateX(var(--r)) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
        }

        @keyframes orbitCCW {
          from { transform: rotate(0deg) translateX(var(--r)) rotate(0deg); }
          to   { transform: rotate(-360deg) translateX(var(--r)) rotate(360deg); }
        }

        @keyframes shimmerFast {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
 .anim-fadeUp     { animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        @keyframes hintPulse {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* 🔥 Flip animation */
        .flip-container {
          perspective: 1200px;
        }
.pp-hero  { font-family:'Playfair Display',Georgia,serif; }
.d-1  { animation-delay:0.10s; }
        .flip-inner {
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
        }

        .flip-active {
          transform: rotateY(180deg);
        }
 .green-shimmer {
    background:linear-gradient(90deg,#1a7a4a 0%,#22c55e 38%,#4ade80 52%,#22c55e 68%,#1a7a4a 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmerGreen 3.2s linear infinite;
  }
        .flip-face {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
        }

        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>

            <h2 className={`anim-fadeUp mb-10 d-1 pp-hero font-bold`}
                style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#111", lineHeight: 1.15 }}>
                Experience the <span className="green-shimmer">Quality</span>
            </h2>

            <div
                className="relative w-[420px] h-[420px] max-w-[92vw] max-h-[92vw] flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >

                {/* OUTER TAGS */}
                {OUTER_TAGS.map((tag, i) => (
                    <div
                        key={tag.label}
                        className="absolute left-1/2 top-1/2"
                        style={{
                            "--r": "185px",
                            animation: `orbitCW ${tag.dur}s linear infinite`,
                            animationDelay: `${tag.delay}s`,
                        }}
                    >
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute">
                            <div className={`px-3 py-1 text-[10px] font-black text-white rounded-lg tracking-wider
                ${i % 2 === 0 ? "bg-green-500" : "bg-green-700"}
                ${hovered ? "scale-110 shadow-xl" : ""}
              `}>
                                {tag.label}
                            </div>
                        </div>
                    </div>
                ))}

                {/* 🔥 FLIP BALL */}
                <div className="flip-container relative w-[260px] h-[260px]">

                    <div className={`flip-inner w-full h-full ${hovered ? "flip-active" : ""}`}>

                        {/* FRONT */}
                        <div className="flip-face flex items-center justify-center bg-[radial-gradient(circle_at_33%_28%,#f7d060,#e8950a,#8a4205)] shadow-2xl">

                            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.07),transparent)] animate-[shimmerFast_4s_linear_infinite]" />

                            <span className="text-xl font-black tracking-widest text-white/70">
                                PREMIUM
                            </span>
                        </div>

                        {/* BACK */}
                        <div className="flip-face flip-back flex flex-col items-center justify-center text-center px-5 bg-[radial-gradient(circle,#a8e04a,#2d7808)] shadow-2xl">

                            <h3 className="text-4xl font-black text-white">100%</h3>
                            <p className="text-sm text-white/90 mb-2">Natural</p>

                            <div className="text-xs text-white/70 space-y-1">
                                <p>No Preservatives</p>
                                <p>Premium Quality</p>
                                <p>Hygienic</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* INNER TAGS */}
                {INNER_TAGS.map((tag) => (
                    <div
                        key={tag.label}
                        className="absolute left-1/2 top-1/2"
                        style={{
                            "--r": "138px",
                            animation: `orbitCCW ${tag.dur}s linear infinite`,
                            animationDelay: `${tag.delay}s`,
                        }}
                    >
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute">
                            <div className="px-2 py-1 text-[9px] bg-green-600 text-white rounded-md font-bold">
                                {tag.label}
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <p className="mt-10 text-xs text-[#5a7a3a] animate-[hintPulse_2s_infinite]">
                {hovered ? "Showing quality..." : "Hover to reveal"}
            </p>
        </div>
    );
}