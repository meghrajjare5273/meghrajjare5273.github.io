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

      gsap.to(".sticky-heading", {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=128",
          toggleActions: "play reverse play reverse",
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
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12">
        {/* --- SECTION HEADING --- */}
        <div className="header-reveal mb-12 md:mb-20 flex flex-col gap-4">
          <h2 className="sticky-heading text-[32px] md:text-[48px] lg:text-[60px] leading-[110%] font-light dark:text-[#eceae8] text-[#101010] ">
            Selected Works
          </h2>
          <div className="w-full h-[1px] bg-[#0e0e0e]/10 dark:bg-[#eceae8]/10 mt-2" />
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 h-auto lg:h-[850px]">
          {/* --- LEFT COLUMN --- */}
          <div className="flex flex-col h-full">
            {/* Image Container */}
            <div
              ref={leftContainerRef}
              className="relative w-full h-[500px] lg:h-[75%] rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                // ref={leftImageRef}
                src={left.image}
                alt="Project Left"
                className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
              />
            </div>

            {/* Description Text - Moved Outside */}
            <div className="mt-6 md:mt-8">
              <p className="text-base md:text-lg leading-relaxed font-medium text-[#0e0e0e]/80 dark:text-[#eceae8]/80 max-w-lg">
                {left.description}
              </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col h-full">
            {/* Text Context Area (Quote) */}
            <div className="text-container flex flex-col justify-center px-2 lg:px-6 h-auto lg:h-[35%] mb-8 lg:mb-0">
              <div className="anim-text w-12 h-[2px] bg-neutral-400 dark:bg-neutral-600 mb-8" />
              <h3 className="anim-text text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-tight">
                "{right.quote}"
              </h3>
            </div>

            {/* Right Card Wrapper */}
            <div className="flex flex-col h-auto lg:h-[65%]">
              <div
                ref={rightContainerRef}
                className="relative w-full h-[400px] lg:h-full rounded-3xl overflow-hidden shadow-sm"
              >
                <img
                  // ref={rightImageRef}
                  src={right.image}
                  alt="Project Right"
                  className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                />
              </div>

              {/* Description Text - Moved Outside */}
              <div className="mt-6 md:mt-8">
                <p className="text-base md:text-lg leading-relaxed font-medium text-[#0e0e0e]/80 dark:text-[#eceae8]/80 max-w-lg">
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
