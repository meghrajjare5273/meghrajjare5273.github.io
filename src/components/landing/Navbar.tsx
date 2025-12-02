// Navbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle";
import { initTheme } from "@/lib/theme";
import { Skiper58 } from "@/components/ui/menu";
import { VerticalThemeWipeToggle } from "@/components/ui/theme-toggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for GSAP
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    initTheme();
  }, []);

  // GSAP Animation Logic
  useGSAP(
    () => {
      // 1. Set initial state: hidden and visibility:hidden (autoAlpha handles both)
      gsap.set(menuContainerRef.current, {
        autoAlpha: 0,
      });

      // 2. Create the timeline (paused by default)
      const tl = gsap.timeline({ paused: true });

      tl.to(menuContainerRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.inOut",
      }).fromTo(
        ".menu-content",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.1" // Stagger the start slightly
      );

      timeline.current = tl;
    },
    { scope: menuContainerRef }
  ); // Scope allows us to use selector strings like ".menu-content"

  // Control Timeline based on state
  useEffect(() => {
    if (timeline.current) {
      if (isMenuOpen) {
        timeline.current.play();
      } else {
        timeline.current.reverse();
      }
    }
  }, [isMenuOpen]);

  // Scroll lock implementation
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = originalOverflow;
        document.body.style.overflow = originalBodyOverflow;
      };
    }
  }, [isMenuOpen]);

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-24 w-full">
        <nav className="relative flex items-center justify-between max-w-screen-2xl mx-auto min-h-12">
          {/* 1. Left: Logo Section */}
          <div className="flex-1 flex justify-start z-10">
            <a href="#" aria-label="Home" className="hidden md:block">
              <div className="text-2xl font-bold tracking-tighter text-foreground">
                LOGO
              </div>
            </a>
          </div>

          {/* 2. Center: Name */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <div className="text-2xl md:text-4xl text-foreground font-handwriting whitespace-nowrap">
              Meghraj Jare
            </div>
          </div>

          {/* 3. Right: Menu Toggle */}
          <div className="flex-1 flex justify-end z-10 relative">
            <button
              type="button"
              className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuToggleIcon
                open={isMenuOpen}
                className="w-8 h-8 md:w-10 md:h-10"
                strokeWidth={2}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Overlay Menu - Always mounted, visibility controlled by GSAP */}
      <div
        ref={menuContainerRef}
        id="fullscreen-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-60 bg-background invisible opacity-0" // Default CSS hidden state
        onClick={(e) => {
          // Close menu when clicking backdrop (not menu content)
          if (e.target === e.currentTarget) {
            setIsMenuOpen(false);
          }
        }}
      >
        {/* Overlay Container Content */}
        <div className="menu-content relative w-full h-full flex flex-col">
          {/* Top Bar: Theme Toggle + Close Button */}
          <div className="absolute top-0 left-0 right-0 z-10 px-6 py-6 md:px-12 lg:px-24">
            <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
              <div className="md:flex-1" />

              <div className="flex items-center gap-4">
                <VerticalThemeWipeToggle
                  className="text-foreground hover:text-[#C3E41D] transition-colors duration-300"
                  direction="top"
                />

                <button
                  type="button"
                  className="p-2 text-neutral-500 hover:text-foreground transition-colors duration-300 focus:outline-none"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MenuToggleIcon
                    open={true}
                    className="w-8 h-8 md:w-10 md:h-10"
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Main Navigation Content - Centered */}
          <div className="flex-1 flex items-center justify-center px-6 py-20 md:py-24">
            <div className="w-full max-w-4xl">
              <Skiper58 className="bg-transparent backdrop-blur-none" />
            </div>
          </div>

          {/* Bottom Meta Section */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-6 md:px-12 lg:px-24">
            <div className="flex items-center justify-between max-w-screen-2xl mx-auto text-xs md:text-sm text-neutral-500 tracking-wider uppercase">
              <div className="hidden md:block">
                <span className="text-[#C3E41D] font-bold">
                  AVAILABLE FOR WORK
                </span>
              </div>

              <div className="flex items-center gap-6 md:gap-8">
                {/* Navigation Links */}
                {["GITHUB", "LINKEDIN", "TWITTER"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="hover:text-foreground transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
