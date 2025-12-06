// src/components/projects/ProjectsList.tsx
import React from "react";
import { ProjectRow } from "./ProjectsRow";
import { projects } from "@/lib/projects";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export function ProjectsList() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <Navbar />
      
      <main className="w-full pt-32 md:pt-48 pb-20">
        
        {/* Header Section */}
        <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 mb-20 md:mb-32">
            <h1 className="font-about text-4xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.1] text-white uppercase opacity-0 animate-fade-in-up">
                Building with the <br />
                <span className="text-neutral-500">World's Best</span>
            </h1>
        </div>

        {/* List Section */}
        <div className="w-full flex flex-col opacity-0 animate-fade-in-up delay-200">
           {/* Header Line */}
           <div className="w-full h-px bg-white/10 mb-0" />
           
           {projects.map((project) => (
             <ProjectRow key={project.id} project={project} />
           ))}
           
           {/* Bottom Line */}
           <div className="w-full h-px bg-white/10 mt-0" />
        </div>

      </main>

      <Footer />
    </div>
  );
}