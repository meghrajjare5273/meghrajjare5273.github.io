// src/components/projects/ProjectRow.tsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects"; // Assuming you updated your types file

interface ProjectRowProps {
  project: Project;
  index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const paddedIndex = index.toString().padStart(2, "0");

  useGSAP(() => {
    const el = rowRef.current;
    if (!el) return;

    const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: "power2.out" } });
    
    // 1. Reveal Image
    tl.to(imageRef.current, { autoAlpha: 1, scale: 1, x: 0 }, 0);
    // 2. Darken Row BG
    tl.to(overlayRef.current, { opacity: 1 }, 0);
    // 3. Shift Title
    tl.to(".row-title", { x: 10}, 0);
    // 4. Reveal Arrow
    tl.to(".row-arrow", { x: 0, opacity: 1 }, 0);
    // 5. Fade out Year/Tags slightly to focus on image? (Optional, let's keep it clean)
    tl.to(".row-meta", { opacity: 0.5 }, 0);

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: rowRef });

  return (
    <a
      ref={rowRef}
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      // Increased height: py-8 (was py-6)
      className="group relative block w-full border-b border-black/10 dark:border-white/10 outline-none"
    >
      {/* Hover Background Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-neutral-200/50 dark:bg-white/5 opacity-0 transition-opacity pointer-events-none" />

      {/* Grid Container */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 py-8 relative z-10">
        <div className="grid grid-cols-12 gap-4 items-center">
          
          {/* COL 1: Index (Span 1) */}
          <div className="col-span-2 md:col-span-1">
             <span className="font-space font-medium text-xs text-neutral-400 dark:text-neutral-600">
               ({paddedIndex})
             </span>
          </div>

          {/* COL 2: Title (Span 3) */}
          <div className="col-span-10 md:col-span-3">
            <h3 className="row-title font-akira text-xl md:text-2xl text-neutral-900 dark:text-white uppercase tracking-tight transition-transform will-change-transform">
              {project.title}
            </h3>
          </div>

          {/* COL 3: Description (Span 4) */}
          <div className="hidden md:block col-span-4 pr-8">
            <p className="font-space text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* COL 4: Year (Span 2) - NEW */}
          <div className="hidden md:block col-span-2">
             <span className="row-meta font-space text-sm text-neutral-500 dark:text-neutral-400 transition-opacity duration-300">
               {project.year}
             </span>
          </div>

          {/* COL 5: Tags & Arrow (Span 2) - Right Aligned */}
          <div className="hidden md:flex col-span-2 justify-end items-center gap-4 relative">
             {/* Tags (Fades out on hover slightly via .row-meta class) */}
             <div className="row-meta flex gap-2 transition-opacity duration-300">
                {/* {project.tags.slice(0, 2).map(tag => ( // Limited to 2 tags to save space
                  <span key={tag} className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {tag}
                  </span>
                ))} */}
             </div>

             {/* Arrow Icon (Slides in) */}
             <div className="row-arrow -translate-x-4 opacity-0 text-neutral-900 dark:text-white absolute right-0">
                <ArrowRight className="w-5 h-5" />
             </div>
          </div>

        </div>
      </div>

      {/* REVEAL IMAGE 
          Positioned to overlap the Tags/Year area slightly but keeping Title clear.
          Right-aligned at roughly 10-15%.
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

      {/* MOBILE LAYOUT (Simple Stack) */}
      <div className="md:hidden w-full px-6 pb-6">
         <div className="flex justify-between items-center mb-4">
             <span className="font-space text-xs text-neutral-400">{project.year}</span>
             <div className="flex gap-2">
                 {/* {project.tags.slice(0,2).map(t => <span key={t} className="text-[10px] uppercase text-neutral-400">{t}</span>)} */}
             </div>
         </div>
         <p className="font-space text-sm text-neutral-500 mb-4">{project.description}</p>
         <div className="w-full aspect-video rounded overflow-hidden border border-black/5 dark:border-white/5">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
         </div>
      </div>

    </a>
  );
};