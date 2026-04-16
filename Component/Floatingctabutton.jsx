"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * FloatingCTAButton
 * ─────────────────
 * UI element type : Floating CTA Button
 * Also known as   : Sticky CTA Button / Fixed Position Button
 * Position        : Bottom-right fixed button (position: fixed, bottom-right corner)
 *
 * Stays visible across the entire website while the user scrolls.
 * Appears with a smooth entrance animation after mount.
 * Scales up + brightens on hover for a premium tactile feel.
 *
 * Props:
 *   href      – destination URL or hash (default: "/contact#distributor")
 *   text      – button label           (default: "Become Distributor")
 *   className – extra Tailwind classes for overrides
 */
export default function FloatingCTAButton({
  href = "/contact#distributor",
  text = "Become Distributor",
  className = "",
}) {
  const [mounted, setMounted] = useState(false);

  // Trigger entrance animation after first paint
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href={href}
      aria-label={text}
      className={[
        // ── Position & stacking ──────────────────────────────────────────
        "fixed bottom-6 right-6 z-[9999]",

        // ── Shape ────────────────────────────────────────────────────────
        "flex items-center gap-2.5 rounded-full",
        "px-5 py-3.5 sm:px-6 sm:py-4",

        // ── Typography ───────────────────────────────────────────────────
        "font-semibold text-sm sm:text-base tracking-wide text-white",
        "whitespace-nowrap",

        // ── Color — rich forest-green gradient, premium food brand feel ──
        "bg-gradient-to-br from-[#3a7d2c] via-[#4a9e38] to-[#2d6122]",

        // ── Shadow — layered for depth ────────────────────────────────────
        "shadow-[0_8px_32px_rgba(42,100,34,0.45),0_2px_8px_rgba(0,0,0,0.18)]",

        // ── Hover ─────────────────────────────────────────────────────────
        "hover:from-[#449134] hover:via-[#56b542] hover:to-[#366e28]",
        "hover:shadow-[0_12px_40px_rgba(42,100,34,0.58),0_4px_12px_rgba(0,0,0,0.22)]",
        "hover:scale-105",

        // ── Active ────────────────────────────────────────────────────────
        "active:scale-[1.02]",

        // ── Transition ────────────────────────────────────────────────────
        "transition-all duration-300 ease-out",

        // ── Entrance animation ────────────────────────────────────────────
        // Slides up from below + fades in; driven by the `mounted` flag
        "will-change-transform",
        mounted
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0",

        // ── Accessibility focus ring ──────────────────────────────────────
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-400/60",

        className,
      ].join(" ")}
    >
      {/* Label */}
      <span className="leading-none">{text}</span>

      {/* Arrow icon — pure SVG, no external dependency */}
      <span
        className="
          flex items-center justify-center
          w-6 h-6 rounded-full
          bg-white/20
          transition-transform duration-300
          group-hover:translate-x-0.5
        "
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          className="w-3.5 h-3.5"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Subtle inner highlight to simulate glass / premium surface */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-full
          bg-gradient-to-b from-white/14 to-transparent
        "
        aria-hidden="true"
      />
    </Link>
  );
}