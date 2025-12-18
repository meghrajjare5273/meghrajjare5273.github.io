"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroSectionProps {
  title: string[];
  tag?: string;
  image: string;
  imageAlt?: string;
}

export const HeroSection = ({
  title,
  tag,
  image,
  imageAlt = "hero",
}: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-line-inner", {
        yPercent: 100,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      });

      if (tag) {
        gsap.from(".hero-tag", {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: 1.2,
          ease: "power2.out",
        });
      }

      gsap.fromTo(
        ".hero-img-anim",
        { scale: 1.15 },
        { scale: 1, duration: 2, ease: "power2.out", delay: 0.1 }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row pb-8 md:pb-16 items-start md:items-center md:justify-between">
        <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[60px] leading-[110%] font-light dark:text-[#eceae8] text-[#101010] w-full max-w-4xl">
          <div className="overflow-hidden">
            {title.map((line, i) => (
              <div key={i} className="hero-line-inner">
                {line}
              </div>
            ))}
          </div>
        </h1>
        {tag && (
          <div className="hero-tag mt-8 md:mt-0">
            <div className="border border-white/20 px-4 py-2 rounded text-lg font-bold tracking-wider uppercase dark:text-[#eceae8] text-[#101010]">
              {tag}
            </div>
          </div>
        )}
      </div>
      <div className="w-full aspect-375/348 md:aspect-[1440/800] overflow-hidden">
        <img
          alt={imageAlt}
          className="hero-img-anim w-full h-full object-cover"
          src={image}
        />
      </div>
    </section>
  );
};
