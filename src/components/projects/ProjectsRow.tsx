// src/components/projects/ProjectRow.tsx
import React from "react";
import { ArrowRight, Asterisk } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow = ({ project }: ProjectRowProps) => {
  return (
    <a 
      href={project.link} 
      target={project.link.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      className="group block w-full border-t border-white/10 transition-colors duration-300 hover:bg-white/2"
    >
      <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Main Grid: 1 col on mobile, 12 cols on XL screens */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 xl:gap-6 items-start">
          
          {/* COLUMN 1-2: Title / Logo */}
          <div className="xl:col-span-2 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between w-full">
                {/* Logo Area */}
                <div className="relative">
                    {/* Fallback to text if no logo image */}
                    <h3 className="font-akira text-2xl md:text-3xl text-white tracking-wide uppercase group-hover:text-primary transition-colors duration-300">
                        {project.title}
                    </h3>
                </div>

                {/* Mobile-only featured badge */}
                {project.featured && (
                    <div className="xl:hidden flex items-center gap-1 py-1 px-3 bg-white/10 rounded-full">
                        <Asterisk className="w-3 h-3 text-white" />
                        <span className="font-space text-xs text-white">{project.featuredText}</span>
                    </div>
                )}
            </div>

            {/* Desktop Featured Badge (bottom of col) */}
            {project.featured && (
                <div className="hidden xl:flex w-fit items-center gap-1 py-1 px-2 bg-white/10 rounded-full mt-auto">
                     <Asterisk className="w-3 h-3 text-white/80" />
                     <span className="font-space text-xs text-white/80">{project.featuredText}</span>
                </div>
            )}
          </div>

          {/* COLUMN 3-6: Description */}
          <div className="xl:col-start-3 xl:col-span-4">
            <p className="font-space text-base md:text-lg text-neutral-400 group-hover:text-white transition-colors duration-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* COLUMN 7-8: Thumbnail (Desktop Hover Reveal) */}
          <div className="hidden xl:block xl:col-start-7 xl:col-span-2 relative h-[120px]">
             {/* The image appears on group hover */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] aspect-video rounded-lg overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out shadow-2xl border border-white/10">
                <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
             </div>
          </div>

          {/* Mobile Image (Visible inline on mobile) */}
          <div className="block xl:hidden w-full aspect-video rounded-lg overflow-hidden border border-white/10">
             <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover"
            />
          </div>

          {/* COLUMN 9-10: Tags */}
          <div className="xl:col-start-9 xl:col-span-2">
            <div className="flex flex-wrap xl:flex-col gap-2 items-start">
              {project.tags.map((tag) => (
                <span 
                    key={tag} 
                    className="font-space text-xs text-neutral-400 px-3 py-1 border border-white/10 rounded-full whitespace-nowrap group-hover:border-white/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* COLUMN 11-12: CTA Button */}
          <div className="xl:col-start-11 xl:col-span-2 flex justify-start xl:justify-end">
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-space text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <span>View Case</span>
                <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </a>
  );
};