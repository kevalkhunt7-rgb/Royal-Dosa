"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Product", href: "#product" },
  { label: "Distributor", href: "#distribution" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setActive("Home")}>
            <div className="w-10 h-10 rounded-full bg-[#1a7a4a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm tracking-wide select-none">RD</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[#1a7a4a] font-bold text-base tracking-tight">
                The Royal Dosa Paper
              </span>
              <span className="text-gray-400 text-xs font-normal tracking-wide">
                Premium Snacks
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150
                    ${
                      active === link.label
                        ? "text-[#1a7a4a]"
                        : "text-gray-600 hover:text-[#1a7a4a]"
                    }
                    group
                  `}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute left-4 right-4 bottom-1 h-0.5 rounded-full bg-[#1a7a4a] transition-all duration-200
                      ${active === link.label ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"}
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-4 gap-1 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMenuOpen(false);
                }}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-150
                  ${
                    active === link.label
                      ? "text-[#1a7a4a] bg-green-50"
                      : "text-gray-600 hover:text-[#1a7a4a] hover:bg-green-50"
                  }
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}