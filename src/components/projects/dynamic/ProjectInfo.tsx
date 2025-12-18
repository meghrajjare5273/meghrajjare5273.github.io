import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectInfoProps {
  industry: string;
  year: string;
  services: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  industry,
  year,
  services,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".info-col", {
        y: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-y-6 gap-x-6 w-full pt-4 md:pt-8"
    >
      <div className="info-col flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">
          Industry
        </p>
        <p className="text-[16px] sm:text-[18px] dark:text-[#eceae8] text-[#101010]">
          {industry}
        </p>
      </div>
      <div className="info-col flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">
          Year
        </p>
        <p className="text-[16px] sm:text-[18px] dark:text-[#eceae8] text-[#101010]">
          {year}
        </p>
      </div>
      <div className="info-col flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">
          Services
        </p>
        <p className="text-[16px] sm:text-[18px] dark:text-[#eceae8] text-[#101010]">
          {services}
        </p>
      </div>
    </div>
  );
};
