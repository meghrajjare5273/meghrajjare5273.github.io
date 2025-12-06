import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectRow } from "./ProjectsRow";
import { projects } from "@/lib/projects";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // A. HEADER TEXT REVEAL
    // We select the spans inside the h1 and animate them up
    const textTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    textTl.fromTo(".header-line", 
      { y: "110%", rotateX: -20, opacity: 0 },
      { 
        y: "0%", 
        rotateX: 0, 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.15,
        delay: 0.2 // Wait slightly for curtain to start lifting
      }
    );

    // B. PROJECT ROWS "DECK OF CARDS" ENTRANCE
    // Staggered entrance that snaps into place
    gsap.fromTo(".project-row",
      { y: 100, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.2)", // The "Snap" effect
        stagger: 0.1,
        delay: 0.6 // Start after header is mostly visible
      }
    );

    // C. SCROLL VELOCITY SKEW (Cinematic Touch)
    // This adds a subtle "bend" to rows when scrolling fast
    // Note: This requires ScrollTrigger
    projects.forEach((_, i) => {
        const row = document.querySelectorAll(".project-row")[i];
        if(!row) return;

        ScrollTrigger.create({
            trigger: row,
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                // Limit the skew to prevent it from looking broken
                const skew = Math.min(Math.max(velocity / -1000, -2), 2);
                gsap.to(row, { 
                    skewY: skew, 
                    overwrite: true, 
                    duration: 0.1, 
                    ease: "power1.out" 
                });
            },
            onScrubComplete: () => {
                gsap.to(row, { skewY: 0, duration: 0.5, ease: "power3.out" });
            }
        });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <Navbar />
      
      <main className="w-full pt-32 md:pt-48 pb-20">
        
        {/* Header Section */}
        <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 mb-20 md:mb-32">
            <h1 className="font-about text-4xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.1] text-white uppercase">
                {/* Masked Wrapper for Line 1 */}
                <div className="overflow-hidden">
                    <span className="header-line block origin-top-left">Building with the</span>
                </div>
                {/* Masked Wrapper for Line 2 */}
                <div className="overflow-hidden">
                    <span className="header-line block origin-top-left text-neutral-500">World's Best</span>
                </div>
            </h1>
        </div>

        {/* List Section */}
        <div className="w-full flex flex-col">
           {/* Header Line */}
           <div className="w-full h-px bg-white/10 mb-0" />
           
           {projects.map((project) => (
             // Wrap ProjectRow in a div to target it with GSAP class '.project-row'
             <div key={project.id} className="project-row opacity-0 will-change-transform">
                <ProjectRow project={project} />
             </div>
           ))}
           
           {/* Bottom Line */}
           <div className="w-full h-px bg-white/10 mt-0" />
        </div>

      </main>

      <Footer />
    </div>
  );
}