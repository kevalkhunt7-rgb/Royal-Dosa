"use client";

import { useState, useEffect } from "react";

/**
 * WhatsAppCTAButton
 * ─────────────────────────────────────────────────────────────
 * UI element type : Floating / Sticky CTA Button
 * Position        : Fixed bottom-right corner (position: fixed)
 * Purpose         : Opens a WhatsApp chat with a pre-filled message
 *
 * Props:
 *   phoneNumber   – WhatsApp number with country code, no symbols
 *                   e.g. "919876543210"  (91 = India code)
 *   message       – Pre-filled message (URL-encoded automatically)
 *   tooltipText   – Bubble text shown above the button
 *   showTooltip   – Whether to show the chat bubble (default: true)
 *   className     – Extra Tailwind classes for positioning overrides
 */
export default function WhatsAppCTAButton({
  phoneNumber = "919876543210",
  message = "Hi! I'd like to know more about your products.",
  tooltipText = "Hi! How can we help you? 👋",
  showTooltip = true,
  className = "",
}) {
  const [mounted, setMounted]               = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  // Entrance: slide up after mount
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 150);
    // Auto-show tooltip after 1.8 s; auto-hide after 6 s
    const t2 = setTimeout(() => setTooltipVisible(true), 1800);
    const t3 = setTimeout(() => setTooltipVisible(false), 6000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTooltipVisible(false);
    setTooltipDismissed(true);
  };

  return (
    <div
      className={[
        // ── Fixed position — bottom-right corner ──────────────────
        "fixed bottom-6 right-6 z-[9999]",
        "flex flex-col items-end gap-3",
        // Entrance slide-up transition
        "transition-all duration-500 ease-out",
        mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className,
      ].join(" ")}
    >
      {/* ── Tooltip / Chat bubble ─────────────────────────────────── */}
      {showTooltip && !tooltipDismissed && (
        <div
          className={[
            "relative flex items-start gap-2",
            "bg-white text-gray-800 text-sm font-medium",
            "px-4 py-2.5 rounded-2xl rounded-br-sm",
            "shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
            "transition-all duration-400 ease-out",
            tooltipVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95 pointer-events-none",
            "max-w-[220px]",
          ].join(" ")}
        >
          <span className="whitespace-nowrap leading-snug">{tooltipText}</span>

          {/* Dismiss × */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="
              ml-1 mt-px flex-shrink-0
              text-gray-400 hover:text-gray-600
              transition-colors duration-150
              leading-none text-base
            "
          >
            ×
          </button>

          {/* Tail pointing down-right */}
          <span
            className="
              absolute -bottom-[6px] right-3
              w-3 h-3 bg-white
              [clip-path:polygon(0_0,100%_0,100%_100%)]
            "
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── Main WhatsApp Button ──────────────────────────────────── */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => !tooltipDismissed && setTooltipVisible(true)}
        onMouseLeave={() => !tooltipDismissed && setTooltipVisible(false)}
        className="
          group
          relative flex items-center gap-2.5
          rounded-full overflow-hidden
          px-5 py-3.5 sm:px-6 sm:py-4
          bg-[#25d366]
          text-white font-semibold text-sm sm:text-base tracking-wide
          whitespace-nowrap
          shadow-[0_8px_28px_rgba(37,211,102,0.42),0_2px_8px_rgba(0,0,0,0.14)]
          hover:bg-[#20c05a]
          hover:shadow-[0_14px_40px_rgba(37,211,102,0.55),0_4px_14px_rgba(0,0,0,0.18)]
          hover:scale-105 hover:-translate-y-0.5
          active:scale-[1.02]
          transition-all duration-300 ease-out
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25d366]/50
        "
      >
        {/* Inner glass highlight */}
        <span
          className="
            pointer-events-none absolute inset-0 rounded-full
            bg-gradient-to-b from-white/[0.16] to-transparent
          "
          aria-hidden="true"
        />

        {/* WhatsApp icon with pulse rings */}
        <span className="relative flex-shrink-0 w-[26px] h-[26px] flex items-center justify-center">
          {/* Pulse ring 1 */}
          <span
            className="
              absolute inset-[-5px] rounded-full
              border-2 border-white/50
              animate-[pingCustom_2s_ease-out_infinite]
            "
            aria-hidden="true"
          />
          {/* Pulse ring 2 — delayed */}
          <span
            className="
              absolute inset-[-10px] rounded-full
              border border-white/25
              animate-[pingCustom_2s_ease-out_0.6s_infinite]
            "
            aria-hidden="true"
          />

          {/* Official WhatsApp SVG icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16 2C8.268 2 2 8.268 2 16c0 2.52.674 4.88 1.853 6.916L2 30l7.294-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
              fill="rgba(255,255,255,0.18)"
            />
            <path
              d="M21.54 18.92c-.31-.155-1.834-.904-2.118-.007-.284.898-.87 1.005-1.923.483-1.054-.521-2.21-1.54-3.114-2.91-.903-1.37-.44-2.183.13-2.717.57-.535.903-1.005.697-1.54-.207-.535-1.02-2.523-1.382-3.005-.362-.482-.828-.482-1.087-.482H12.2c-.31 0-.8.116-1.22.581-.41.466-1.553 1.52-1.553 3.695 0 2.176 1.605 4.287 1.822 4.573.216.287 3.14 4.833 7.681 6.665 1.08.414 1.93.65 2.58.837.61.193 1.27.158 1.75-.096.478-.255 1.545-.632 1.764-1.24.217-.608.217-1.13.152-1.238-.065-.108-.258-.172-.569-.327z"
              fill="white"
            />
          </svg>
        </span>

        {/* Label */}
        <span className="leading-none">Chat on WhatsApp</span>

        {/* Arrow */}
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
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}