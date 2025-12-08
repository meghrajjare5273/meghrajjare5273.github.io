// src/components/projects/ProjectsList.tsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectRow } from "@/components/projects/ProjectsRow";
import { projects } from "@/lib/projects";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      
      // 1. Header Entrance
      gsap.fromTo(".header-reveal",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out", delay: 0.2 }
      );

      // 2. List Entrance
      gsap.fromTo(".project-row-wrapper",
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
          }
        }
      );
    });
    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="min-h-dvh w-full bg-[#f4f4f4] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white transition-colors duration-500"
    >
      <Navbar />
      
      <main className="w-full pt-28 md:pt-40 pb-20">
        
        {/* Page Title */}
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-20">
          <h1 className="font-about text-5xl md:text-7xl leading-tight uppercase tracking-tighter">
            <span className="header-reveal block">Selected</span>
            <span className="header-reveal block text-neutral-400">Works</span>
          </h1>
        </div>
        
        {/* THE TABLE HEADER */}
        {/* We use the exact same grid-cols-12 and col-spans as the row to ensure alignment */}
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-4 hidden md:grid grid-cols-12 gap-4 border-b border-black/10 dark:border-white/10 pb-4">
            {/* Col 1: Index */}
            <div className="col-span-1">
                <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
                    No.
                </span>
            </div>
            {/* Col 2: Project Title (3 cols) */}
            <div className="col-span-3">
                <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
                    Project
                </span>
            </div>
            {/* Col 3: Description (4 cols) */}
            <div className="col-span-4">
                <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
                    Context
                </span>
            </div>
            {/* Col 4: Year (2 cols) - NEW */}
            <div className="col-span-2">
                 <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
                    Year
                </span>
            </div>
            {/* Col 5: Tags/Link (2 cols) */}
            <div className="col-span-2 text-right">
                 <span className="header-reveal font-space text-xs uppercase tracking-widest text-neutral-500 block">
                    Type
                </span>
            </div>
        </div>

        {/* List Section */}
        <div className="project-list-container w-full flex flex-col">
           {projects.map((project, index) => (
             <div key={project.id} className="project-row-wrapper opacity-0">
                <ProjectRow project={project} index={index + 1} />
             </div>
           ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}