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
      // Removed hover:bg-black/5 and hover:bg-white/5
      className="group block w-full bg-[#eceae8] dark:bg-[#0e0e0e] border-t border-black/10 dark:border-white/10 transition-colors duration-300"
    >
      <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 xl:gap-6 items-start">
          
          {/* COLUMN 1-2: Title */}
          <div className="xl:col-span-2 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between w-full">
              <div className="relative">
                {/* Removed drastic color shift, added subtle opacity shift instead */}
                <h3 className="font-akira text-2xl md:text-3xl text-neutral-900 dark:text-white tracking-wide uppercase transition-opacity duration-300 group-hover:opacity-70">
                  {project.title}
                </h3>
              </div>

              {project.featured && (
                <div className="xl:hidden flex items-center gap-1 py-1 px-3 bg-black/5 dark:bg-white/10 rounded-full">
                  <Asterisk className="w-3 h-3 text-neutral-900 dark:text-white" />
                  <span className="font-space text-xs text-neutral-900 dark:text-white">
                    {project.featuredText}
                  </span>
                </div>
              )}
            </div>

            {project.featured && (
              <div className="hidden xl:flex w-fit items-center gap-1 py-1 px-2 bg-black/5 dark:bg-white/10 rounded-full mt-auto">
                <Asterisk className="w-3 h-3 text-neutral-600 dark:text-white/80" />
                <span className="font-space text-xs text-neutral-600 dark:text-white/80">
                  {project.featuredText}
                </span>
              </div>
            )}
          </div>

          {/* COLUMN 3-6: Description */}
          <div className="xl:col-start-3 xl:col-span-4">
            <p className="font-space text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* COLUMN 7-8: Thumbnail */}
          <div className="hidden xl:block xl:col-start-7 xl:col-span-2 relative h-[120px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] aspect-video rounded-lg overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out shadow-2xl border border-black/10 dark:border-white/10">
              <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile Image */}
          <div className="block xl:hidden w-full aspect-video rounded-lg overflow-hidden border border-black/10 dark:border-white/10">
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* COLUMN 9-10: Tags */}
          <div className="xl:col-start-9 xl:col-span-2">
            <div className="flex flex-wrap xl:flex-col gap-2 items-start">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-space text-xs text-neutral-600 dark:text-neutral-400 px-3 py-1 border border-black/10 dark:border-white/10 rounded-full whitespace-nowrap group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* COLUMN 11-12: Button */}
          <div className="xl:col-start-11 xl:col-span-2 flex justify-start xl:justify-end">
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-space text-neutral-900 dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
              <span>View Case</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};