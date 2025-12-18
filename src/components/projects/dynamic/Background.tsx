import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered if not done globally
gsap.registerPlugin(ScrollTrigger);

interface ProjectBackgroundProps {
  heading: string;
  text: string;
}

export const ProjectBackground: React.FC<ProjectBackgroundProps> = ({
  heading,
  text,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.from(".bg-heading", {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      });

      bgTl.fromTo(".bg-para", { opacity: 0.2 }, { opacity: 1 });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4"
    >
      <h3 className="bg-heading text-[24px] leading-[130%] md:text-[35px] font-light dark:text-[#eceae8] text-[#101010] col-span-full md:col-span-4 xl:col-span-6">
        {heading}
      </h3>
      <p className="bg-para text-[17px] leading-[150%] md:text-[20px] font-normal dark:text-[#eceae8] text-[#101010] col-span-full md:col-span-8 xl:col-span-6">
        {text}
      </p>
    </section>
  );
};
