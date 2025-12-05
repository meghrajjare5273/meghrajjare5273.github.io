import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectFrontmatter } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailViewProps {
  project: ProjectFrontmatter;
  children: React.ReactNode; // The MDX rendered content
}

export default function ProjectDetailView({ project, children }: ProjectDetailViewProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 3D Layered Hero Animation
  useGSAP(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Parallax effects
    tl.to(".hero-bg", { y: "30%", ease: "none" }, 0);
    tl.to(".hero-content", { y: "50%", opacity: 0, ease: "none" }, 0);
  }, { scope: heroRef });

  return (
    <article className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* 3D Layered Hero Strip */}
      <section ref={heroRef} className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
        {/* Background Layer */}
        <div className="hero-bg absolute inset-0 z-0">
          <img 
            src={project.coverImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 blur-sm scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        {/* Midground/Content Layer */}
        <div className="hero-content relative z-10 text-center max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 mb-6 border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-space uppercase tracking-wider">{project.role}</span>
          </div>
          
          <h1 className="font-about text-[12vw] md:text-[8vw] leading-[0.85] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            {project.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-3">
             {project.tags.map(tag => (
               <span key={tag} className="px-3 py-1 border border-border rounded-md text-sm font-space text-muted-foreground">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* Split Layout / Content Area */}
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 pb-24">
        
        {/* Sticky Sidebar (Left) */}
        <aside className="lg:col-span-4 h-fit lg:sticky lg:top-32 flex flex-col gap-8 order-2 lg:order-1">
          <a href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-space group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </a>

          <div className="space-y-6 border-l-2 border-border pl-6">
            <div>
              <h4 className="font-space uppercase text-xs text-muted-foreground mb-2">Timeline</h4>
              <p className="font-space text-lg">{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
            
            {project.client && (
              <div>
                <h4 className="font-space uppercase text-xs text-muted-foreground mb-2">Client</h4>
                <p className="font-space text-lg">{project.client}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex-1 btn-primary flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-lg font-space hover:opacity-90 transition-opacity">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex-1 btn-secondary flex items-center justify-center gap-2 border border-border py-3 rounded-lg font-space hover:bg-muted transition-colors">
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content (Right) */}
        <main ref={contentRef} className="lg:col-span-8 order-1 lg:order-2 prose prose-lg dark:prose-invert prose-headings:font-about prose-p:font-space prose-a:text-primary prose-img:rounded-xl max-w-none">
          {/* Render MDX Children here */}
          {children}
        </main>
      </div>
    </article>
  );
}