import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Updated Interface to support combined Team + Role object
export interface TeamMember {
  name: string;
  role: string;
}

interface ProjectTechStackProps {
  heading: string;
  description: string;
  stack: string[];
  team: TeamMember[]; // Changed from string[]
  // roles prop removed as it is now part of team
  teamImage: string;
}

export const ProjectTechStack: React.FC<ProjectTechStackProps> = ({
  heading,
  description,
  stack,
  team,
  teamImage,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // 1. Image Reveal (Wider & Slower)
      tl.fromTo(
        ".hero-img",
        { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" },
        {
          clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
          duration: 1.4,
          ease: "power4.inOut",
        }
      )
        // 2. Heading Slide Up
        .from(
          ".hero-title",
          {
            y: 80, // Reduced movement slightly for elegance
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.0"
        )
        // 3. Description Fade
        .from(
          ".hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );

      // 4. The Footer Line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        }
      );

      // 5. Footer Metadata Stagger
      gsap.from(".footer-col", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 py-12 md:py-24 bg-[#eceae8] dark:bg-[#0e0e0e] text-[#101010] dark:text-[#eceae8]"
    >
      {/* --- TOP SECTION: SPLIT LAYOUT --- */}
      {/* Changed Grid Ratio: 5 cols Text / 7 cols Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 mb-20 items-end">
        {/* Left: Typography Block (Smaller width now) */}
        <div className="lg:col-span-5 flex flex-col justify-end pb-4 relative z-10 order-2 lg:order-1">
          <div className="overflow-hidden">
            {/* Reduced Heading Size */}
            <h2 className="hero-title text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-medium leading-[0.95] tracking-tight mb-8 text-black dark:text-white">
              {heading}
            </h2>
          </div>

          {/* Description (Removed indentation to fit narrower col) */}
          <p className="hero-desc text-lg leading-[1.6] font-light opacity-70 max-w-md">
            {description}
          </p>
        </div>

        {/* Right: Landscape Image (Larger width now) */}
        <div className="lg:col-span-7 w-full order-1 lg:order-2">
          {/* Increased aspect ratio to 4/3 for more height */}
          <div className="hero-img relative w-full aspect-3/2 overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img
              src={teamImage}
              alt="Project Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: CENTERED SPECS --- */}
      <div className="relative mt-24">
        {/* The Divider Line */}
        <div
          ref={lineRef}
          className="w-full h-[1px] bg-black/10 dark:bg-white/10 origin-left mb-12"
        />

        {/* Centered Grid Strategy */}
        {/* We use grid-cols-12. Content lives in cols 2-11. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Spacer (Left) */}
          <div className="hidden md:block md:col-span-1 lg:col-span-2"></div>

          {/* Column 1: Tech Stack (Takes 4 cols) */}
          <div className="footer-col md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <span className="text-[15px] uppercase tracking-[0.2em] font-about opacity-40">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {stack.map((item, i) => (
                <span
                  key={i}
                  className="text-sm md:text-base font-medium tracking-wide opacity-90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Team + Roles (Takes 4 cols) */}
          <div className="footer-col md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <span className="text-[15px] uppercase tracking-[0.2em] font-about  opacity-40">
              Team & Roles
            </span>
            <div className="flex flex-col gap-3 w-full">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between border-b border-black/5 dark:border-white/5 pb-1 last:border-0"
                >
                  <span className="text-sm md:text-base font-medium uppercase tracking-wide opacity-90">
                    {member.name}
                  </span>
                  <span className="text-xs md:text-sm font-about opacity-50 text-right">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer (Right) */}
          <div className="hidden md:block md:col-span-1 lg:col-span-2"></div>
        </div>
      </div>
    </section>
  );
};
