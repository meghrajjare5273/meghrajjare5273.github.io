// src/components/projects/ProjectsList.tsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectRow } from "@/components/projects/ProjectsRow"; // Ensure import path matches your file structure
import { projects } from "@/lib/projects";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // A. HEADER TEXT REVEAL
      const textTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      textTl.fromTo(".header-line", 
        { y: "110%", rotateX: -20, opacity: 0 },
        { 
          y: "0%", 
          rotateX: 0, 
          opacity: 1, 
          duration: 1.5, 
          stagger: 0.15,
          delay: 0.2
        }
      );

      // B. PROJECT ROWS ENTRANCE
      gsap.fromTo(".project-row",
        { y: 100, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.2)",
          stagger: 0.1,
          delay: 0.6
        }
      );

      // C. SCROLL VELOCITY SKEW
      projects.forEach((_, i) => {
        const row = document.querySelectorAll(".project-row")[i];
        if(!row) return;

        ScrollTrigger.create({
            trigger: row,
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const skew = Math.min(Math.max(velocity / -1000, -2), 2);
                
                gsap.to(row, { 
                    skewY: skew, 
                    // CRITICAL FIX: Changed from true to "auto". 
                    // 'true' was killing the entrance animation of the 1st item.
                    overwrite: "auto", 
                    duration: 0.1, 
                    ease: "power1.out" 
                });
            },
            onScrubComplete: () => {
                gsap.to(row, { skewY: 0, duration: 0.5, ease: "power3.out" });
            }
        });
      });
    });

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    // Updated Background Colors here
    <div ref={containerRef} className="min-h-dvh bg-[#eceae8] dark:bg-[#0e0e0e] text-neutral-950 dark:text-white selection:bg-black/20 dark:selection:bg-white/20 duration-300">
      <Navbar />
      
      <main className="w-full pt-32 md:pt-48 pb-20">
        
        {/* Header Section */}
        <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 mb-20 md:mb-32">
            <h1 className="font-about text-4xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.1] text-neutral-900 dark:text-white uppercase">
                {/* Masked Wrapper for Line 1 */}
                <div className="overflow-hidden">
                    <span className="header-line block origin-top-left">Building with the</span>
                </div>
                {/* Masked Wrapper for Line 2 */}
                <div className="overflow-hidden">
                    <span className="header-line block origin-top-left text-neutral-500 dark:text-neutral-500">World's Best</span>
                </div>
            </h1>
        </div>

        {/* List Section */}
        <div className="w-full flex flex-col">
           {/* Header Line */}
           <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-0" />
           
           {projects.map((project) => (
             <div key={project.id} className="project-row opacity-0 will-change-transform">
                <ProjectRow project={project} />
             </div>
           ))}
           
           {/* Bottom Line */}
           <div className="w-full h-px bg-black/10 dark:bg-white/10 mt-0" />
        </div>

      </main>

      <Footer />
    </div>
  );
}