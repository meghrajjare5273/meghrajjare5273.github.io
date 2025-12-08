import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function TransitionMaster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<SVGPathElement>(null);
  const blob2Ref = useRef<SVGPathElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const blobPath = "M45.7,-76.4C58.9,-69.3,69.1,-55.6,76.9,-41.2C84.7,-26.8,90,-11.7,88.4,2.9C86.8,17.5,78.2,31.6,68,43.5C57.8,55.4,46,65.1,32.7,70.9C19.4,76.7,4.6,78.6,-9.3,77.2C-23.2,75.8,-36.2,71.1,-48.6,62.8C-61,54.5,-72.8,42.6,-79.6,28.7C-86.4,14.8,-88.2,-1.1,-83.4,-15.5C-78.6,-29.9,-67.2,-42.8,-54.6,-50.2C-42,-57.6,-28.2,-59.5,-15.1,-60.8C-2,-62.1,11.1,-62.8,25.2,-63.5";

  useGSAP(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const colors = {
      accent: isDark ? "#313131" : "#b3ada6",
      main:   isDark ? "#0e0e0e" : "#eceae8"
    };

    const handleBeforePreparation = () => {
      if (tl.current) tl.current.kill();
      tl.current = gsap.timeline();

      gsap.set(containerRef.current, { 
        autoAlpha: 1, 
        pointerEvents: "all" 
      });

      gsap.set(blob1Ref.current, { fill: colors.accent });
      gsap.set(blob2Ref.current, { fill: colors.main });

      gsap.set([blob1Ref.current, blob2Ref.current], {
        scale: 0,
        rotation: 0,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });

      tl.current.to(blob1Ref.current, {
        scale: 150, 
        rotation: 90,
        duration: 1.2,
        ease: "expo.inOut",
      }, 0);

      tl.current.to(blob2Ref.current, {
        scale: 150, 
        rotation: 45,
        duration: 1.2,
        ease: "expo.inOut",
      }, 0.15);
    };

    const handlePageLoad = () => {
      if (!tl.current) tl.current = gsap.timeline();

      tl.current.to(containerRef.current, {
        autoAlpha: 0, 
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.set(containerRef.current, { pointerEvents: "none" });
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
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] pointer-events-none opacity-0 invisible"
      style={{ 
        contain: 'layout style paint',
        width: '100vw',
        height: '100vh'
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible' }}
      >
        <g transform="translate(100, 100)">
          <path ref={blob1Ref} d={blobPath} />
          <path ref={blob2Ref} d={blobPath} />
        </g>
      </svg>
    </div>
  );
}
