// src/components/projects/ProjectRow.tsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import DOMPurify from "isomorphic-dompurify";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ProjectRowProps {
  project: Project;
  index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Timeline ref for hover effects
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  const sanitizedSVG = project.svgTitle ? DOMPurify.sanitize(project.svgTitle) : null;
  const paddedIndex = index.toString().padStart(2, "0");

  useGSAP(() => {
    const el = rowRef.current;
    if (!el) return;

    // 1. SCROLL TRIGGER ANIMATION (SVG Load-in)
    // This runs once when the element hits the viewport
    if (sanitizedSVG) {
      gsap.fromTo(
        ".row-title svg path, .row-title svg circle, .row-title svg rect", 
        { 
          opacity: 0, 
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Starts when top of row hits 85% of viewport height
            toggleActions: "play none none reverse" 
          }
        }
      );
    }

    // 2. HOVER ANIMATION (Desktop Only)
    // We use matchMedia so this timeline essentially doesn't exist on mobile
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      hoverTl.current = gsap.timeline({ 
        paused: true, 
        defaults: { duration: 0.4, ease: "power2.out" } 
      });

      if (!hoverTl.current) return;

      // > Reveal Image
      hoverTl.current.to(imageRef.current, { autoAlpha: 1, scale: 1, x: 0 }, 0);
      // > Darken Row BG
      hoverTl.current.to(overlayRef.current, { opacity: 1 }, 0);
      // > Shift Title
      hoverTl.current.to(".row-title", { x: 10 }, 0);
      // > Reveal Arrow
      hoverTl.current.to(".row-arrow", { x: 0, opacity: 1 }, 0);
      // > Fade out Meta
      hoverTl.current.to(".row-meta", { opacity: 0.5 }, 0);
    });

    return () => {
      mm.revert(); // Cleanup
    };
  }, { scope: rowRef });

  // Native handlers for better React performance
  const handleMouseEnter = () => hoverTl.current?.play();
  const handleMouseLeave = () => hoverTl.current?.reverse();

  return (
    <a
      ref={rowRef}
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // UPDATED CLASSES:
      // 1. py-12: Increased vertical padding to accommodate the ~125px height of the hover image
      // 2. min-h-[140px]: Enforces a minimum height so the overlay always covers the image
      className="group relative block w-full min-h-[140px] border-b border-black/10 dark:border-white/10 outline-none"
    >
      {/* Hover Background Overlay */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-neutral-200/50 dark:bg-white/5 opacity-0 transition-opacity pointer-events-none" 
      />

      {/* Grid Container */}
      {/* Changed py-8 to py-12 to ensure row height > image height */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 py-12 relative z-10">
        <div className="grid grid-cols-12 gap-4 items-center">
          
          {/* COL 1: Index */}
          <div className="col-span-2 md:col-span-1">
             <span className="font-space font-medium text-xs text-neutral-400 dark:text-neutral-600">
               ({paddedIndex})
             </span>
          </div>

          {/* COL 2: Title */}
          <div className="col-span-10 md:col-span-3 flex items-center">
            {sanitizedSVG ? (
              // Ensuring SVG container has explicit dimensions to prevent layout shifts
              <div 
                className="row-title max-w-[140px] md:max-w-[180px] h-8 md:h-10 text-neutral-900 dark:text-white transition-transform will-change-transform [&>svg]:!w-auto [&>svg]:!h-full [&>svg]:max-w-full"
                dangerouslySetInnerHTML={{ __html: sanitizedSVG }}
              />
            ) : (
              <h3 className="row-title font-akira text-xl md:text-2xl text-neutral-900 dark:text-white uppercase tracking-tight transition-transform will-change-transform">
                {project.title}
              </h3>
            )}
          </div>

          {/* COL 3: Description */}
          <div className="hidden md:block col-span-4 pr-8">
            <p className="font-space text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* COL 4: Year */}
          <div className="hidden md:block col-span-2">
             <span className="row-meta font-space text-sm text-neutral-500 dark:text-neutral-400 transition-opacity duration-300">
               {project.year}
             </span>
          </div>

          {/* COL 5: Tags & Arrow */}
          <div className="hidden md:flex col-span-2 justify-end items-center gap-4 relative">
             <div className="row-meta flex gap-2 transition-opacity duration-300">
               {/* Tags here */}
             </div>
             <div className="row-arrow -translate-x-4 opacity-0 text-neutral-900 dark:text-white absolute right-0">
                <ArrowRight className="w-5 h-5" />
             </div>
          </div>

        </div>
      </div>

      {/* REVEAL IMAGE */}
      {/* Size Calc: w-[220px] * 9/16 = ~124px height.
         The row padding (py-12) + content ensures the row is ~140px+ tall.
         This prevents the image from bleeding out of the overlay background.
      */}
      <div 
        ref={imageRef}
        className="hidden md:block absolute right-[12%] top-1/2 -translate-y-1/2 w-[220px] aspect-video z-20 pointer-events-none invisible opacity-0 scale-95 origin-center shadow-xl rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900"
      >
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* MOBILE LAYOUT (Static) */}
      <div className="md:hidden w-full px-6 pb-6">
         <div className="flex justify-between items-center mb-4">
             <span className="font-space text-xs text-neutral-400">{project.year}</span>
         </div>
         <p className="font-space text-sm text-neutral-500 mb-4">{project.description}</p>
         <div className="w-full aspect-video rounded overflow-hidden border border-black/5 dark:border-white/5">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
         </div>
      </div>

    </a>
  );
};