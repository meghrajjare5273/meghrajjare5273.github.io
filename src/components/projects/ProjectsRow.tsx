// src/components/projects/ProjectRow.tsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import DOMPurify from "isomorphic-dompurify";

gsap.registerPlugin(ScrollTrigger);

interface ProjectRowProps {
  project: Project;
  index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const rowRef = useRef<HTMLAnchorElement>(null);

  // Refs for interaction elements
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null); // Animate this for hover
  const arrowRef = useRef<HTMLDivElement>(null);

  // Refs for entrance elements (Wrappers)
  const titleWrapperRef = useRef<HTMLDivElement>(null); // Animate this for scroll
  const metaWrapperRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const sanitizedSVG = project.svgTitle
    ? DOMPurify.sanitize(project.svgTitle)
    : null;
  const paddedIndex = index.toString().padStart(2, "0");

  const { contextSafe } = useGSAP(
    () => {
      const el = rowRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // ---------------------------------------------------------
      // 1. SETUP & HOVER LOGIC (Desktop Only)
      // ---------------------------------------------------------
      mm.add("(min-width: 768px)", () => {
        // SET INITIAL STATES (Prevents FOUC/Jumps)
        gsap.set(imageRef.current, {
          autoAlpha: 0,
          scale: 0.9,
          x: 0,
          y: "-50%", // Keep centered vertically
          transformOrigin: "center center",
        });
        gsap.set(arrowRef.current, { x: -15, autoAlpha: 0 });
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(titleInnerRef.current, { x: 0 });

        // HOVER TIMELINE
        // Using 'overwrite: "auto"' ensures if user spams hover,
        // it doesn't break.
        tl.current = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out", duration: 0.4 },
        });

        if (tl.current) {
          // > Background
          tl.current.to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0);

          // > Image Snap
          tl.current.to(
            imageRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.35,
            },
            0
          );

          // > Title Slide (The Inner Element)
          tl.current.to(
            titleInnerRef.current,
            {
              x: 10,
              duration: 0.5,
            },
            0
          );

          // > Meta Fade (Using class selector for simplicity)
          tl.current.to(
            ".row-meta",
            {
              opacity: 0.3,
              duration: 0.3,
            },
            0
          );

          // > Arrow Reveal
          tl.current.to(
            arrowRef.current,
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.3,
            },
            0.05
          );
        }
      });

      // ---------------------------------------------------------
      // 2. SCROLL ENTRANCE (Wrappers Only)
      // ---------------------------------------------------------
      // We animate the WRAPPERS so the Hover transforms (on inner elements)
      // never conflict with the Scroll transforms.

      const wrappers = [titleWrapperRef.current, metaWrapperRef.current];

      gsap.fromTo(
        wrappers,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 95%", // Start slightly earlier
            toggleActions: "play none none reverse", // Simple play/reverse
          },
        }
      );
    },
    { scope: rowRef }
  );

  // ---------------------------------------------------------
  // HANDLERS (Safe Context)
  // ---------------------------------------------------------
  const handleMouseEnter = contextSafe(() => {
    tl.current?.play();
  });

  const handleMouseLeave = contextSafe(() => {
    tl.current?.reverse();
  });

  return (
    <a
      ref={rowRef}
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-full min-h-35 border-b border-black/10 dark:border-white/10 outline-none overflow-hidden"
    >
      {/* BACKGROUND OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-neutral-100 dark:bg-white/5 opacity-0 pointer-events-none z-0"
      />

      {/* CONTENT GRID */}
      <div className="w-full max-w-450 mx-auto px-6 md:px-10 py-12 relative z-10">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* COL 1: Index */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-space font-medium text-xs text-neutral-400 dark:text-neutral-600">
              ({paddedIndex})
            </span>
          </div>

          {/* COL 2: Title (Decoupled Animations) */}
          {/* Scroll animates 'titleWrapperRef', Hover animates 'titleInnerRef' */}
          <div
            ref={titleWrapperRef}
            className="col-span-10 md:col-span-3 flex items-center overflow-hidden" // Overflow hidden for clean entrance
          >
            <div ref={titleInnerRef} className="will-change-transform">
              {sanitizedSVG ? (
                <div
                  className="max-w-35 md:max-w-45 h-8 md:h-10 text-neutral-900 dark:text-white [&>svg]:w-auto! [&>svg]:h-full! [&>svg]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: sanitizedSVG }}
                />
              ) : (
                <h3 className="font-akira text-xl md:text-2xl text-neutral-900 dark:text-white uppercase tracking-tight">
                  {project.title}
                </h3>
              )}
            </div>
          </div>

          {/* COL 3, 4, 5: Meta (Decoupled Wrapper) */}
          <div
            ref={metaWrapperRef}
            className="col-span-12 md:col-span-8 grid grid-cols-8 gap-4 items-center"
          >
            {/* Description */}
            <div className="hidden md:block col-span-4 pr-8">
              <p className="row-meta font-space text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 transition-opacity">
                {project.description}
              </p>
            </div>

            {/* Year */}
            <div className="hidden md:block col-span-2">
              <span className="row-meta font-space text-sm text-neutral-500 dark:text-neutral-400 transition-opacity">
                {project.year}
              </span>
            </div>

            {/* Arrow & Tags */}
            <div className="hidden md:flex col-span-2 justify-end items-center gap-4 relative">
              <div
                ref={arrowRef}
                className="text-neutral-900 dark:text-white opacity-0 absolute right-0"
              >
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOVER IMAGE */}
      <div
        ref={imageRef}
        className="hidden md:block absolute right-[10%] top-1/2 w-55 aspect-video z-20 pointer-events-none opacity-0 shadow-2xl rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden w-full px-6 pb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-space text-xs text-neutral-400">
            {project.year}
          </span>
        </div>
        <p className="font-space text-sm text-neutral-500 mb-4">
          {project.description}
        </p>
        <div className="w-full aspect-video rounded overflow-hidden border border-black/5 dark:border-white/5">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-center"
          />
        </div>
      </div>
    </a>
  );
};
