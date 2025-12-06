import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function TransitionMaster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const bars = gsap.utils.toArray<HTMLElement>(".transition-bar");
    
    const handleBeforePreparation = () => {
      if (tl.current) tl.current.kill();
      tl.current = gsap.timeline();

      // Reset
      gsap.set(containerRef.current, { autoAlpha: 1 });
      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });

      // Close Shutters
      tl.current.to(bars, {
        scaleY: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.inOut",
      });
    };

    const handlePageLoad = () => {
      if (!tl.current) tl.current = gsap.timeline();

      // Open Shutters (change origin to top to make them shrink upwards)
      tl.current.set(bars, { transformOrigin: "top" });
      
      tl.current.to(bars, {
        scaleY: 0,
        duration: 0.5,
          delay: 0.8   , // Small delay for content load
        stagger: 0.05,
        ease: "power3.inOut",
        onComplete: () => {
           gsap.set(containerRef.current, { autoAlpha: 0 });
        }
      });
    };

    document.addEventListener("astro:before-preparation", handleBeforePreparation);
    document.addEventListener("astro:page-load", handlePageLoad);
    return () => {
      document.removeEventListener("astro:before-preparation", handleBeforePreparation);
      document.removeEventListener("astro:page-load", handlePageLoad);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-10000 flex pointer-events-none opacity-0 invisible">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="transition-bar flex-1 bg-[#0e0e0e] w-full h-full" />
      ))}
    </div>
  );
}