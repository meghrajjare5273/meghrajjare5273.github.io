import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectInfoProps {
  industry: string;
  year: string;
  services: string;
  deploymentLink?: string;
  repoLink?: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  industry,
  year,
  services,
  deploymentLink = "#",
  repoLink = "#",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".divider-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        ".minimal-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8, // Slightly slower for more "weight"
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      // UPDATE 1: Kept max-w-[1920px] but increased padding (px-6 -> px-10/24)
      // This ensures it spans the full screen but doesn't touch the edges on massive monitors
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-12"
    >
      {/* Divider - Optional, uncomment if you want the line back */}
      {/* <div className="divider-line w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 origin-left mb-8" /> */}

      {/* UPDATE 2: Increased gap (gap-x-8 -> gap-x-16) to spread columns out visually */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-16">
        {/* Industry - 3 Cols */}
        <div className="minimal-item lg:col-span-3 flex flex-col gap-3">
          <Label text="Industry" />
          {/* UPDATE 3: Increased text size (text-lg -> text-xl/2xl) */}
          <p className="text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 font-medium">
            {industry}
          </p>
        </div>

        {/* Year - 2 Cols */}
        <div className="minimal-item lg:col-span-2 flex flex-col gap-3">
          <Label text="Year" />
          <p className="text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 font-medium">
            {year}
          </p>
        </div>

        {/* Services - 4 Cols */}
        <div className="minimal-item lg:col-span-4 flex flex-col gap-3">
          <Label text="Services" />
          <p className="text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 font-medium leading-normal">
            {services}
          </p>
        </div>

        {/* Links - 3 Cols */}
        <div className="minimal-item lg:col-span-3 flex flex-col gap-4">
          <Label text="Links" />

          <div className="flex flex-col gap-2">
            <MinimalLink
              href={deploymentLink}
              text="Live Deployment"
              icon={<Globe size={18} />}
            />
            <MinimalLink
              href={repoLink}
              text="Github Repository"
              icon={<Github size={18} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Sub Components ---

const Label = ({ text }: { text: string }) => (
  // UPDATE 4: Slightly larger label for balance
  <h4 className="text-xs md:text-sm uppercase tracking-widest text-neutral-500 font-semibold mb-1">
    {text}
  </h4>
);

const MinimalLink = ({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 py-1"
  >
    <span className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
      {icon}
    </span>

    {/* UPDATE 5: Link text size matched to content (text-lg) */}
    <span className="text-lg md:text-xl font-normal relative">
      {text}
      <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-black dark:bg-white group-hover:w-full transition-all duration-300 ease-out" />
    </span>

    <ArrowUpRight
      size={16}
      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
    />
  </a>
);
