import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { TagChip } from '@/components/ui/tag-chip';
import { cn } from '@/lib/utils';
import type { ProjectEntry } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsGridProps {
  initialProjects: ProjectEntry[];
  allTags: string[];
}

export default function ProjectsGrid({ initialProjects, allTags }: ProjectsGridProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'featured'>('newest');
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter & Sort Logic
  const filteredProjects = initialProjects
    .filter((p) => {
      const matchesSearch = p.data.title.toLowerCase().includes(query.toLowerCase()) || 
                            p.data.summary.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag ? p.data.tags.includes(activeTag) : true;
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortOrder === 'featured') {
        return (b.data.featured ? 1 : 0) - (a.data.featured ? 1 : 0) || b.data.date.valueOf() - a.data.date.valueOf();
      }
      return b.data.date.valueOf() - a.data.date.valueOf();
    });

  // Animation for list updates
  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(".project-card", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { dependencies: [filteredProjects], scope: containerRef });

  return (
    <section className="w-full px-6 md:px-12 py-24 max-w-[1920px] mx-auto min-h-screen">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-xl">
          <h1 className="font-about text-[12vw] md:text-[6vw] leading-none mb-6">WORK</h1>
          <p className="font-space text-lg text-muted-foreground">
            Selected cases and experiments in engineering and design.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-lg border border-border">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 w-full md:w-64 font-space"
            />
          </div>
          <div className="flex flex-wrap gap-2">
             <TagChip 
                label="All" 
                isActive={activeTag === null} 
                onClick={() => setActiveTag(null)} 
             />
             {allTags.map(tag => (
               <TagChip 
                 key={tag} 
                 label={tag} 
                 isActive={activeTag === tag} 
                 onClick={() => setActiveTag(tag)} 
               />
             ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredProjects.map((project) => (
          <a 
            key={project.slug} 
            href={`/projects/${project.slug}`}
            className="project-card group block relative w-full aspect-[4/5] md:aspect-square bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-500"
          >
            {/* Image Layer */}
            <div className="absolute inset-0 overflow-hidden">
               <img 
                 src={project.data.coverImage} 
                 alt={project.data.title}
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex flex-wrap gap-2 mb-2">
                    {project.data.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-white/80 border border-white/20 px-2 py-1 rounded-sm backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                   </div>
                   <div className="bg-white/10 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <ArrowUpRight className="w-5 h-5 text-white" />
                   </div>
                </div>
                <h3 className="font-about text-3xl text-white mb-2">{project.data.title}</h3>
                <p className="font-space text-white/70 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {project.data.summary}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="w-full py-20 text-center font-space text-muted-foreground">
          No projects found matching your criteria.
        </div>
      )}
    </section>
  );
}