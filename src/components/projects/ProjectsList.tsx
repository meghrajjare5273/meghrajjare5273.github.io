// src/components/projects/ProjectsList.tsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectRow } from "@/components/projects/ProjectsRow";
// Import the type, but REMOVE the named import of the hardcoded 'projects' list
// import type { Project } from "@/lib/projects";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { ProjectCard } from "@/lib/project-content";

gsap.registerPlugin(ScrollTrigger);

// 1. Define the props interface
interface ProjectsListProps {
  projects: ProjectCard[];
}

// 2. Accept the prop in the component function
export function ProjectsList({ projects }: ProjectsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const ctx = gsap.context(() => {
        // (Keep existing animation code exactly as is)

        // 1. Header Entrance
        gsap.fromTo(
          ".header-reveal",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.3,
          },
        );

        // 3. Subtext Entrance
        gsap.fromTo(
          ".text-reveal",
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 0.4,
            duration: 0.8,
            stagger: 0.5,
            ease: "power2.out",
            delay: 0.3,
          },
        );

        // 2. List Entrance
        gsap.fromTo(
          ".project-row-wrapper",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".project-list-container",
              start: "top 90%",
            },
          },
        );
      });
      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-dvh w-full bg-[#eceae8] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white transition-colors duration-500"
    >
      <Navbar />

      <main className="w-full pt-28 md:pt-40 pb-20">
        {/* Page Title & Subtext (Keep existing code) */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12 w-full max-w-450 mx-auto px-6 md:px-10 mb-20">
          <div className="shrink-0">
            <h1 className="font-about-complement text-5xl md:text-7xl ">
              <span className="header-reveal block">Selected</span>
              <span className="header-reveal block text-neutral-400">
                Projects
              </span>
            </h1>
          </div>

          <div className="md:max-w-xl md:mt-2">
            <h3 className="font-about text-lg opacity-30 text-neutral-900 dark:text-white text-reveal">
              These are some of my best projects. Here I will be displaying most
              of my talent, some links may be broken and some of the services
              may also be down, but trust me I am working on getting it back
              online.
            </h3>
          </div>
        </div>

        {/* THE TABLE HEADER (Keep existing code) */}
        <div className="w-full max-w-450 mx-auto px-6 md:px-10 hidden md:grid grid-cols-12 gap-4 border-b border-black/10 dark:border-white/10 pb-4">
          <div className="col-span-1">
            <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
              No.
            </span>
          </div>
          <div className="col-span-3">
            <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
              Project
            </span>
          </div>
          <div className="col-span-4">
            <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
              Context
            </span>
          </div>
          <div className="col-span-2">
            <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
              Year
            </span>
          </div>
        </div>

        {/* List Section */}
        <div className="project-list-container w-full flex flex-col">
          {projects.map((project, index) => (
            <>
              {/* Replace project.id with project.slug or project.title */}
              <div
                key={project.slug || project.title}
                className="project-row-wrapper opacity-0"
              >
                <ProjectRow project={project} index={index + 1} />
              </div>
            </>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
