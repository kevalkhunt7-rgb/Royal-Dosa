"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const VisionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="10" r="6" stroke="#5a7a4a" strokeWidth="2" fill="none" />
    <path d="M10 28 Q16 18 22 28" stroke="#5a7a4a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="10" r="2" fill="#5a7a4a" />
    <path d="M13 26 L16 22 L19 26" stroke="#e8a838" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MissionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 22 L14 14 L20 20 L28 8" stroke="#5a7a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M22 8 L28 8 L28 14" stroke="#e8a838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const fadeInUp = (el, delay = 0) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
      el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    };

    fadeInUp(headingRef.current, 0);
    fadeInUp(imageRef.current, 0.15);
    fadeInUp(card1Ref.current, 0.3);
    fadeInUp(card2Ref.current, 0.45);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="about"
      ref={sectionRef}
      className="relative w-full bg-[#fdfaf4] py-20 px-4 overflow-hidden"
    >
      {/* Subtle background texture dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c8b97a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative leaf blobs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#d9ead3] opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-[#f5e6c0] opacity-50 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1e2d1a] leading-tight tracking-tight">
            About{" "}
            <span className="text-[#5a7a4a] italic">The Royal Dosa Paper</span>
          </h2>
          <p className="mt-4 text-[#6b6b4f] text-base md:text-lg max-w-md mx-auto leading-relaxed font-light">
            Surat-based premium snack brand delivering authentic South Indian
            crispy dosa across Gujarat with uncompromising quality standards
          </p>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-[#c8b97a]" />
            <div className="w-2 h-2 rounded-full bg-[#e8a838]" />
            <div className="h-px w-16 bg-[#c8b97a]" />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden shadow-xl group"
            style={{ aspectRatio: "4/3" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e2d1a]/30 to-transparent z-10 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80"
              alt="The Royal Dosa Paper store"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Brand tag */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md">
              <p className="font-serif text-[#5a7a4a] font-bold text-sm leading-tight">
                The Royal Dosa Paper
              </p>
              <p className="text-[#6b6b4f] text-xs">Taste of South India</p>
            </div>
          </div>

          {/* Cards column */}
          <div className="flex flex-col gap-5">
            {/* Vision Card */}
            <div
              ref={card1Ref}
              className="group bg-[#f2f7ee] border border-[#c8dab8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-[#d9ead3] group-hover:border-[#5a7a4a] transition-colors duration-300">
                  <VisionIcon />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1e2d1a] mb-2 tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-[#4a5940] text-sm leading-relaxed">
                    To become India's most trusted premium ready-to-eat snack
                    brand, bringing authentic South Indian flavors to every
                    household with guaranteed quality and hygiene.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div
              ref={card2Ref}
              className="group bg-[#fdf6e3] border border-[#e8d8a0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-[#f0dfa0] group-hover:border-[#e8a838] transition-colors duration-300">
                  <MissionIcon />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1e2d1a] mb-2 tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-[#5a4a20] text-sm leading-relaxed">
                    Delivering crispy, hygienic, and delicious dosa snacks made
                    from premium ingredients, while building strong partnerships
                    with distributors and retailers across India.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 mt-1">
              {[
                { value: "100%", label: "Pure Quality" },
                { value: "Gujarat", label: "Wide Reach" },
                { value: "Fresh", label: "Daily Made" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-[#e0d8c0] rounded-xl py-3 px-2 text-center shadow-sm"
                >
                  <p className="font-serif text-[#5a7a4a] font-bold text-base">
                    {stat.value}
                  </p>
                  <p className="text-[#9a8a60] text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}