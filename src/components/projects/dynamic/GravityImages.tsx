import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger)

interface GravityImage {
  src: string;
  alt: string;
}

interface GravityImagesProps {
  leftImage: GravityImage | string;
  rightImage: GravityImage | string;
  leftCaption: string;
  rightCaption?: string;
  quote?: string;
  containerClassName?: string;
}

export const GravityImages = ({
  leftImage,
  rightImage,
  leftCaption,
  rightCaption,
  quote,
  containerClassName = "",
}: GravityImagesProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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

  const leftImageSrc = typeof leftImage === "string" ? leftImage : leftImage.src;
  const leftImageAlt = typeof leftImage === "string" ? leftCaption : leftImage.alt;
  const rightImageSrc = typeof rightImage === "string" ? rightImage : rightImage.src;
  const rightImageAlt = typeof rightImage === "string" ? rightCaption : rightImage.alt;

  return (
    <section
      ref={containerRef}
      className={`w-full max-w-[1920px] mx-auto px-6 md:px-12 ${containerClassName}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="gravity-left flex flex-col gap-3">
          <div className="w-full aspect-[4/5] bg-gray-800 rounded-none overflow-hidden relative">
            <img
              src={leftImageSrc}
              className="gravity-img w-full h-full object-cover transition-all duration-500"
              alt={leftImageAlt}
            />
          </div>
          <p className="text-sm dark:text-[#eceae8] text-[#101010] uppercase tracking-widest mt-1">
            {leftCaption}
          </p>
        </div>
        <div className="gravity-right flex flex-col gap-3 pt-0 md:pt-16">
          <div className="w-full aspect-[4/5] bg-gray-800 rounded-none overflow-hidden relative">
            <img
              src={rightImageSrc}
              className="gravity-img w-full h-full object-cover transition-all duration-500"
              alt={rightImageAlt}
            />
          </div>
          {quote && (
            <div className="md:text-right">
              <p className="text-[18px] dark:text-[#eceae8] text-[#101010] max-w-sm ml-auto">
                "{quote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
