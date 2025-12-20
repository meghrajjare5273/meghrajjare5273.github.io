import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectFooterProps {
  quote: string;
  author: {
    image: string;
    name: string;
    role: string;
  };
  // ctaLink?: string;
}

export const ProjectFooter: React.FC<ProjectFooterProps> = ({
  quote,
  author,
  // ctaLink = "#",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-avatar", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      });

      gsap.fromTo(
        ".footer-quote",
        { filter: "blur(10px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.5,
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto px-6 md:px-12 py-16 border-t border-white/10 mt-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="footer-avatar flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="dark:text-[#eceae8] text-[#101010] text-lg">
                {author.name}
              </p>
              <p className="dark:text-[#eceae8] text-[#101010] text-sm">
                {author.role}
              </p>
            </div>
          </div>
          <p className="footer-quote text-[24px] md:text-[35px] font-light dark:text-[#eceae8] text-[#101010] italic leading-[130%]">
            “{quote}”
          </p>
        </div>
        <div className="hidden lg:block lg:col-span-1 border-l border-white/10 h-full mx-auto"></div>
        <div className="lg:col-span-6 flex flex-col justify-center gap-6">
          <h3 className="text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">
            Like what you see here.?
          </h3>
          <p className="text-[18px] dark:text-[#eceae8] text-[#101010]">
            Let's talk and we can figure out something together.
          </p>
          <a
            href="/contact"
            className="w-fit  inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 dark:text-[#eceae8] text-[#101010] hover:bg-white/10 transition-colors"
          >
            Get in touch
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
