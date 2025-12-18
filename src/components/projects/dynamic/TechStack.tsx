import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger)

interface TechStackProps {
  title: string;
  description: string;
  techStack: string[];
  team: string[];
  roles: string[];
  image: string;
  imageAlt?: string;
  containerClassName?: string;
}

export const TechStack = ({
  title,
  description,
  techStack,
  team,
  roles,
  image,
  imageAlt = "Team working",
  containerClassName = "",
}: TechStackProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const techCols = gsap.utils.toArray(".tech-col");
      gsap.from(techCols, {
        y: -20,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.fromTo(
        ".tech-img",
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`w-full max-w-[1920px] mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-8 ${containerClassName}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="flex flex-col h-full justify-between gap-16">
          <div className="tech-col flex flex-col gap-6">
            <h3 className="text-[28px] md:text-[36px] leading-[130%] font-light dark:text-[#eceae8] text-[#101010]">
              {title}
            </h3>
            <p className="text-[18px] leading-[160%] dark:text-[#eceae8]/70 text-[#101010]/70">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4">
            <div className="tech-col flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase dark:text-[#eceae8]/50 text-[#101010]/50">
                Tech Stack
              </span>
              <div className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-wide dark:text-[#eceae8] text-[#101010]">
                {techStack.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="tech-col flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase dark:text-[#eceae8]/50 text-[#101010]/50">
                Team
              </span>
              <div className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-wide dark:text-[#eceae8] text-[#101010]">
                {team.map((member, index) => (
                  <span key={index}>{member}</span>
                ))}
              </div>
            </div>

            <div className="tech-col flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase dark:text-[#eceae8]/50 text-[#101010]/50">
                Role
              </span>
              <div className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-wide dark:text-[#eceae8] text-[#101010]">
                {roles.map((role, index) => (
                  <span key={index}>{role}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full aspect-[4/5] md:aspect-square relative rounded-2xl overflow-hidden bg-gray-800">
          <img
            src={image}
            alt={imageAlt}
            className="tech-img w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
