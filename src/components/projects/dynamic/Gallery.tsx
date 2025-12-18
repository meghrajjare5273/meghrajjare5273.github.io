import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GalleryItem {
  image: string;
  text?: string;
}

interface ProjectGalleryProps {
  left: { image: string; caption: string };
  right: { image: string; quote: string };
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  left,
  right,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Parallax effects
      gsap.to(".gravity-left", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".gravity-right", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".gravity-img",
        { filter: "grayscale(100%)" },
        {
          filter: "grayscale(0%)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "center 50%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="gravity-left flex flex-col gap-3">
          <div className="w-full aspect-[4/5] bg-gray-800 rounded-none overflow-hidden relative">
            <img
              src={left.image}
              className="gravity-img w-full h-full object-cover transition-all duration-500"
              alt="Project detail left"
            />
          </div>
          <p className="text-sm dark:text-[#eceae8] text-[#101010] uppercase tracking-widest mt-1">
            {left.caption}
          </p>
        </div>

        {/* Right Column */}
        <div className="gravity-right flex flex-col gap-3 pt-0 md:pt-16">
          <div className="w-full aspect-[4/5] bg-gray-800 rounded-none overflow-hidden relative">
            <img
              src={right.image}
              className="gravity-img w-full h-full object-cover transition-all duration-500"
              alt="Project detail right"
            />
          </div>
          <div className="md:text-right">
            <p className="text-[18px] dark:text-[#eceae8] text-[#101010] max-w-sm ml-auto">
              "{right.quote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
