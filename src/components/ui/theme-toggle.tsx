"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

type VerticalDirection = "top" | "bottom";

type VerticalThemeWipeToggleProps = {
  className?: string;
  direction?: VerticalDirection;
};

export const VerticalThemeWipeToggle = ({
  className,
  direction = "top",
}: VerticalThemeWipeToggleProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const isMounted = useRef(false);

  // Initialize state from DOM on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    isMounted.current = true;
  }, []);

  // Sync with external changes (system preference or manual class changes)
  useEffect(() => {
    const syncTheme = () =>
      setDarkMode(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // GSAP Icon Animation
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Set (No animation on first render)
      if (!isMounted.current) {
        if (darkMode) {
          gsap.set(".sun-icon", { opacity: 1, scale: 1, rotation: 0 });
          gsap.set(".moon-icon", { opacity: 0, scale: 0, rotation: 90 });
        } else {
          gsap.set(".sun-icon", { opacity: 0, scale: 0, rotation: -90 });
          gsap.set(".moon-icon", { opacity: 1, scale: 1, rotation: 0 });
        }
        return;
      }

      // Toggle Animation
      if (darkMode) {
        // Animate to Dark (Show Sun, Hide Moon)
        // Note: In this component logic, Dark Mode = Sun Icon visible (to switch to light)
        tl.to(".moon-icon", {
          opacity: 0,
          scale: 0.5,
          rotation: 90,
          duration: 0.3,
          ease: "power2.in",
        }).to(
          ".sun-icon",
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        ); // Overlap slightly
      } else {
        // Animate to Light (Show Moon, Hide Sun)
        tl.to(".sun-icon", {
          opacity: 0,
          scale: 0.5,
          rotation: -90,
          duration: 0.3,
          ease: "power2.in",
        }).to(
          ".moon-icon",
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      }
    },
    { scope: containerRef, dependencies: [darkMode] }
  );

  const onToggle = useCallback(async () => {
    if (!containerRef.current) return;

    // View Transition Logic
    await document.startViewTransition(() => {
      flushSync(() => {
        const toggled = !darkMode;
        setDarkMode(toggled);
        document.documentElement.classList.toggle("dark", toggled);
        localStorage.setItem("theme", toggled ? "dark" : "light");
      });
    }).ready;

    // Wipe Animation using Native WAAPI
    if (direction === "top") {
      document.documentElement.animate(
        {
          clipPath: [
            "inset(0 0 100% 0)", // bottom fully covered
            "inset(0 0 0 0)", // fully revealed
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } else {
      document.documentElement.animate(
        {
          clipPath: [
            "inset(100% 0 0 0)", // top fully covered
            "inset(0 0 0 0)", // fully revealed
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    }
  }, [darkMode, direction]);

  return (
    <button
      ref={containerRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={cn(
        "relative flex items-center justify-center p-2 rounded-full outline-none focus:outline-none focus:ring-0 cursor-pointer overflow-hidden",
        className
      )}
      type="button"
    >
      {/* Spacer to maintain button size since icons are absolute */}
      <div className="invisible opacity-0 pointer-events-none">
        <Sun size={24} />
      </div>

      {/* Sun Icon (Visible in Dark Mode) */}
      <div className="sun-icon absolute inset-0 flex items-center justify-center text-white origin-center">
        <Sun size={24} />
      </div>

      {/* Moon Icon (Visible in Light Mode) */}
      <div className="moon-icon absolute inset-0 flex items-center justify-center text-black origin-center">
        <Moon size={24} />
      </div>
    </button>
  );
};
