import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DOMPurify from "isomorphic-dompurify";

gsap.registerPlugin(ScrollTrigger);

interface ProjectHeroProps {
  titleLines: string[];
  svgIcon?: string;
  image: string;
  imageAlt?: string;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({
  titleLines,
  svgIcon,
  image,
  imageAlt = "Project Hero",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  const sanitizedSvg = svgIcon ? DOMPurify.sanitize(svgIcon) : "";

  useGSAP(
    () => {
      // Create a master timeline for coordination
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // --- 1. Text Reveal (Standard) ---
      tl.from(
        ".hero-line-inner",
        {
          yPercent: 100,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
        },
        0
      );

      // --- 2. Image Reveal (Cinematic Zoom) ---
      tl.fromTo(
        ".hero-img-anim",
        { scale: 1.25, filter: "brightness(0.8)" },
        {
          scale: 1,
          filter: "brightness(1)",
          duration: 2.2,
          ease: "expo.out",
        },
        0
      );

      // --- 3. Hyper-Realistic SVG Load-In ---
      if (svgIcon && iconWrapperRef.current) {
        // Select internal SVG paths if they exist for detailed staggering
        // This makes the animation generic but highly detailed for any icon
        const internalPaths = gsap.utils.toArray<SVGPathElement>(
          ".hero-svg path, .hero-svg circle, .hero-svg rect"
        );

        // A. The Container Reveal (Mask + 3D Rotation)
        tl.fromTo(
          iconWrapperRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // Start hidden at bottom
            yPercent: 40, // Push down slightly
            rotationX: 25, // Tilt back
            opacity: 0,
            filter: "blur(15px)", // Strong initial blur
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveal up
            yPercent: 0,
            rotationX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "expo.out", // "Heavy" easing
            clearProps: "clipPath,filter,transform", // Cleanup for crisp rendering
          },
          0.4 // Slight delay after text starts
        );

        // B. Internal Detail Stagger (If paths exist)
        // This adds that "drawing itself" complexity
        if (internalPaths.length > 0) {
          tl.from(
            internalPaths,
            {
              y: 20,
              opacity: 0,
              duration: 1.2,
              stagger: {
                amount: 0.4,
                from: "random", // Organic feeling
              },
              ease: "power2.out",
            },
            0.6 // Overlap with container reveal
          );
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full perspective-[1200px]"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row pb-8 md:pb-16 items-start md:items-center md:justify-between">
        {/* Title Section */}
        <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[60px] leading-[110%] font-light dark:text-[#eceae8] text-[#101010] w-full max-w-4xl">
          {titleLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden pb-2">
              <div className="hero-line-inner">{line}</div>
            </div>
          ))}
        </h1>

        {/* SVG Icon Section */}
        {svgIcon && (
          <div className="mt-8 md:mt-0 flex-shrink-0 perspective-[1000px] overflow-visible">
            {/* 
                We use a wrapper for the mask animation so the inner SVG 
                can have its own transform context without conflict.
             */}
            <div
              ref={iconWrapperRef}
              className="hero-svg will-change-transform origin-bottom"
              dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
            />
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="w-fit h-fit items-center  overflow-hidden bg-[#eceae8] dark:bg-[#0e0e0e]">
        <img
          // ref={imageRef} // Optional: If you want to target specific transforms later
          alt={imageAlt}
          className="hero-img-anim w-full h-full items center object-contain object-center will-change-transform"
          src={image}
          // Change 2: "eager" ensures the browser prioritizes this image (prevents pop-in)
          loading="eager"
          // Change 3: "async" decoding allows the UI thread to stay smooth during the animation start
          decoding="async"
        />
      </div>
    </section>
  );
};
