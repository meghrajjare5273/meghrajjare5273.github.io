import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

interface ProjectStatsProps {
  heading: string;
  description: string;
  items: StatItem[];
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({
  heading,
  description,
  items,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Number Counters
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat: any) => {
        // We use the data-value attribute to drive the animation
        const endValue = parseInt(stat.getAttribute("data-value") || "0", 10);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          onEnter: () => {
            gsap.to(obj, {
              val: endValue,
              duration: 1.5,
              ease: "expo.out",
              onUpdate: () => {
                stat.innerText = Math.round(obj.val);
              },
            });
          },
        });
      });

      // Description Reveal
      gsap.from(".stat-desc", {
        x: -20,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12"
    >
      <div className="col-span-full lg:col-span-4 flex flex-col gap-4">
        <h2 className="text-[36px] md:text-[60px] font-light dark:text-[#eceae8] text-[#101010] leading-[110%]">
          {heading}
        </h2>
        <p className="text-[17px] md:text-[20px] dark:text-[#eceae8] text-[#101010] leading-[150%]">
          {description}
        </p>
      </div>

      <div className="col-span-full lg:col-span-7 lg:col-start-6 flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className="col-span-full border-t border-white/10 py-6 grid grid-cols-1 md:grid-cols-12 gap-4"
          >
            <div className="md:col-span-4 lg:col-span-3 flex items-end">
              <span className="flex text-[36px] leading-[120%] md:text-[80px] md:leading-[110%] font-light dark:text-[#eceae8] text-[#101010]">
                {/* We set data-value so GSAP can read the target number easily.
                   Initial innerText is 0 so the animation starts from 0.
                */}
                <span className="stat-number" data-value={item.value}>
                  0
                </span>
                {item.suffix && (
                  <span className="text-[24px] md:text-[35px] align-top ml-1">
                    {item.suffix}
                  </span>
                )}
              </span>
            </div>
            <div className="md:col-span-8 lg:col-span-9 flex items-center">
              <p className="stat-desc text-[17px] md:text-[20px] dark:text-[#eceae8] text-[#101010]">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
