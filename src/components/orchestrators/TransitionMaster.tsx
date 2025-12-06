import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TransitionMaster() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const handleBeforePreparation = () => {
        if (!curtainRef.current) return;

        // Kill any previous timeline for safety
        if (tl.current) {
          tl.current.kill();
          tl.current = null;
        }

        tl.current = gsap.timeline();

        // Ensure starting state
        gsap.set(curtainRef.current, { yPercent: 100, autoAlpha: 1 });

        // Animate UP to cover screen
        tl.current.to(curtainRef.current, {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.inOut",
        });
      };

      const handleAfterSwap = () => {
        // New content is in the DOM at this point; refresh ScrollTrigger
        ScrollTrigger.refresh();
      };

      const handlePageLoad = () => {
        if (!curtainRef.current) return;

        // If navigation happened without an exit timeline (first load), create one
        if (!tl.current) {
          tl.current = gsap.timeline();
        }

        // Reveal animation queued after the cover tween
        tl.current.to(
          curtainRef.current,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
              if (!curtainRef.current) return;

              // Reset for next navigation
              gsap.set(curtainRef.current, { yPercent: 100, autoAlpha: 0 });

              tl.current?.kill();
              tl.current = null;
            },
          },
          ">" // start after previous tween ends
        );
      };

      document.addEventListener(
        "astro:before-preparation",
        handleBeforePreparation
      );
      document.addEventListener("astro:after-swap", handleAfterSwap);
      document.addEventListener("astro:page-load", handlePageLoad);

      // Cleanup: avoid duplicate handlers and leaks (important in React Strict Mode)
      return () => {
        document.removeEventListener(
          "astro:before-preparation",
          handleBeforePreparation
        );
        document.removeEventListener("astro:after-swap", handleAfterSwap);
        document.removeEventListener("astro:page-load", handlePageLoad);

        if (tl.current) {
          tl.current.kill();
          tl.current = null;
        }
      };
    },
    { scope: curtainRef }
  );

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 w-full h-full bg-[#0e0e0e] z-[10000] pointer-events-none opacity-0 invisible"
      style={{ willChange: "transform" }}
    />
  );
}
