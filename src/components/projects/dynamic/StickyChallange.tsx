import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger)
interface StickyChallengeProps {
  objective: string;
  detail: string;
  containerClassName?: string;
  headingClassName?: string;
}

export const StickyChallenge = ({
  objective,
  detail,
  containerClassName = "",
  headingClassName = "",
}: StickyChallengeProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".sticky-heading", {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=128",
          toggleActions: "play reverse play reverse",
        },
      });

      const challengeBlocks = gsap.utils.toArray(".challenge-block");
      gsap.from(challengeBlocks, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`w-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16 ${containerClassName}`}
    >
      <div className="md:w-5/12 lg:w-4/12">
        <div className="md:sticky md:top-32">
          <div className="w-12 h-[1px] bg-white/50 mb-4"></div>
          <h3
            className={`sticky-heading text-[32px] md:text-[48px] lg:text-[60px] leading-[110%] font-light dark:text-[#eceae8] text-[#101010] opacity-50 ${headingClassName}`}
          >
            The Challenge
          </h3>
        </div>
      </div>
      <div className="md:w-7/12 lg:w-8/12 flex flex-col gap-12 border-l border-white/10 pl-6 md:pl-12 py-2">
        <div className="challenge-block flex flex-col gap-4">
          <span className="dark:text-[#eceae8]/40 text-[#101010]/40 font-mono text-sm tracking-widest">
            01 — OBJECTIVE
          </span>
          <p className="text-[20px] md:text-[24px] leading-[150%] font-light dark:text-[#eceae8]/90 text-[#101010]/90 whitespace-pre-line">
            {objective}
          </p>
        </div>
        <div className="challenge-block flex flex-col gap-4">
          <span className="dark:text-[#eceae8]/40 text-[#101010]/40 font-mono text-sm tracking-widest">
            02 — DETAIL
          </span>
          <p className="text-[20px] md:text-[24px] leading-[150%] font-light dark:text-[#eceae8]/90 text-[#101010]/90 whitespace-pre-line">
            {detail}
          </p>
        </div>
      </div>
    </section>
  );
};
