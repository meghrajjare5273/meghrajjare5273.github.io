import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGalleryProps {
  left: { image: string; description: string };
  right: { image: string; quote: string; description: string };
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  left,
  right,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Refs for Image Containers
  const leftContainerRef = useRef<HTMLDivElement | null>(null);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  // Refs for Images
  const leftImageRef = useRef<HTMLImageElement | null>(null);
  const rightImageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      // 1. Header Reveal
      gsap.from(".header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. Parallax Logic
      const images = [
        { container: leftContainerRef.current, img: leftImageRef.current },
        { container: rightContainerRef.current, img: rightImageRef.current },
      ];

      images.forEach(({ container, img }) => {
        if (!container || !img) return;
        gsap.fromTo(
          img,
          { y: "-10%" },
          {
            y: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // 3. Quote Reveal
      gsap.from(".anim-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".text-container",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full py-16 md:py-32 bg-[#eceae8] dark:bg-[#0e0e0e] text-[#0e0e0e] dark:text-[#eceae8] overflow-hidden transition-colors duration-500"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        {/* --- SECTION HEADING --- */}
        <div className="header-reveal mb-12 md:mb-20 flex flex-col gap-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.9]">
            Selected Works
          </h2>
          <div className="w-full h-[1px] bg-[#0e0e0e]/10 dark:bg-[#eceae8]/10 mt-2" />
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 h-auto lg:h-[850px]">
          {/* --- LEFT CARD --- */}
          <div
            ref={leftContainerRef}
            className="group relative w-full h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-sm cursor-default"
          >
            <img
              ref={leftImageRef}
              src={left.image}
              // alt={left.title}
              className="absolute inset-0 w-full h-[120%] object-cover -top-[10%] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay (Fades in) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              {/* Title (Blur In) */}
              {/* <h3 className="text-white text-3xl font-medium tracking-tight translate-y-4 blur-sm opacity-0 group-hover:translate-y-0 group-hover:blur-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                {left.title}
              </h3> */}

              {/* Paragraph (Progressive Blur In - Delayed) */}
              <p className="mt-4 text-white/80 text-lg leading-relaxed max-w-md translate-y-8 blur-md opacity-0 group-hover:translate-y-0 group-hover:blur-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
                {left.description}
              </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col gap-8 md:gap-12 h-full">
            {/* Text Context Area */}
            <div className="text-container flex flex-col justify-center px-2 lg:px-6 h-auto lg:h-[35%]">
              <div className="anim-text w-12 h-[2px] bg-neutral-400 dark:bg-neutral-600 mb-8" />
              <h3 className="anim-text text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-tight">
                "{right.quote}"
              </h3>
            </div>

            {/* --- RIGHT CARD --- */}
            <div
              ref={rightContainerRef}
              className="group relative w-full h-[400px] lg:h-[65%] rounded-3xl overflow-hidden shadow-sm cursor-default"
            >
              <img
                ref={rightImageRef}
                src={right.image}
                // alt={right.title}
                className="absolute inset-0 w-full h-[120%] object-cover -top-[10%] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                {/* Title */}
                {/* <h3 className="text-white text-3xl font-medium tracking-tight translate-y-4 blur-sm opacity-0 group-hover:translate-y-0 group-hover:blur-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  {right.title}
                </h3> */}

                {/* Paragraph */}
                <p className="mt-4 text-white/80 text-lg leading-relaxed max-w-md translate-y-8 blur-md opacity-0 group-hover:translate-y-0 group-hover:blur-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
                  {right.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
