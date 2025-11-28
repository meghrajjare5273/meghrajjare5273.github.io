import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- HEADING ANIMATION ---
      if (headingRef.current) {
        const headingSplit = new SplitText(headingRef.current, {
          type: "chars",
          charsClass: "char",
        });

        gsap.from(headingSplit.chars, {
          opacity: 0,
          yPercent: 100,
          rotationX: -90,
          transformOrigin: "50% 100%",
          stagger: {
            each: 0.02,
            from: "center",
            ease: "power2.out",
          },
          duration: 0.8,
          ease: "back.out(1.2)",
          clearProps: "all",
          onComplete: () => headingSplit.revert(),
        });
      }

      // --- TEXT BLOCK ANIMATIONS ---
      textBlocksRef.current.forEach((block) => {
        if (!block) return;

        const paragraphs = block.querySelectorAll<HTMLParagraphElement>("p");

        paragraphs.forEach((p: HTMLParagraphElement) => {
          const split = new SplitText(p, {
            type: "lines,words",
            linesClass: "line-wrapper",
            wordsClass: "word",
          });

          gsap.set(split.lines, { overflow: "hidden" });

          gsap.from(split.words, {
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
            yPercent: 100,
            opacity: 0,
            rotationX: -45,
            transformOrigin: "50% 100%",
            stagger: {
              amount: 0.5,
              from: "start",
            },
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
            onComplete: () => split.revert(),
          });
        });
      });

      // --- IMAGE PARALLAX & REVEAL ---
      if (imageRef.current) {
        const imageWrapper = imageRef.current;
        const imageElement =
          imageWrapper.querySelector<HTMLImageElement>("img");

        gsap.from(imageWrapper, {
          scrollTrigger: {
            trigger: imageWrapper,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
          clipPath: "inset(0% 0% 100% 0%)",
          ease: "none",
        });

        if (imageElement) {
          gsap.fromTo(
            imageElement,
            {
              scale: 1.3,
              yPercent: -10,
            },
            {
              scrollTrigger: {
                trigger: imageWrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
              scale: 1,
              yPercent: 10,
              ease: "none",
            }
          );
        }
      }

      // --- STATUS SECTION REVEAL ---
      if (sectionRef.current) {
        const statusSection = sectionRef.current.querySelector<HTMLDivElement>(
          "[data-status-section]"
        );
        if (statusSection) {
          gsap.from(statusSection, {
            scrollTrigger: {
              trigger: statusSection,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });

          const borderLine =
            statusSection.querySelector<HTMLElement>(".border-t");
          if (borderLine) {
            gsap.from(borderLine, {
              scrollTrigger: {
                trigger: statusSection,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              scaleX: 0,
              transformOrigin: "left",
              duration: 1.2,
              ease: "power2.inOut",
            });
          }
        }
      }

      // --- CTA BUTTON HOVER ENHANCEMENT ---
      if (sectionRef.current) {
        const ctaButton =
          sectionRef.current.querySelector<HTMLButtonElement>(
            "[data-cta-button]"
          );
        if (ctaButton) {
          ctaButton.addEventListener("mouseenter", () => {
            gsap.to(ctaButton, {
              y: -2,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          ctaButton.addEventListener("mouseleave", () => {
            gsap.to(ctaButton, {
              y: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          });
        }
      }
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#EBEAE5] text-[#1A1A1A] font-mono selection:bg-black selection:text-white overflow-hidden py-24 px-6 md:px-12 lg:px-24"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
          .font-display { font-family: 'Anton', 'Impact', sans-serif; }
          
          .char, .word, .line-wrapper {
            display: inline-block;
            will-change: transform, opacity;
          }
          
          .line-wrapper {
            overflow: hidden;
            padding: 2px 0;
          }
        `}
      </style>

      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        <div className="w-full text-center mb-16 md:mb-24">
          <h1
            ref={headingRef}
            className="font-display text-[15vw] md:text-[12rem] leading-[0.8] tracking-tighter uppercase cursor-default"
          >
            About Me
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 mb-20 md:mb-32">
          <div className="hidden md:block md:col-span-2 lg:col-span-3"></div>

          <div
            className="md:col-span-8 lg:col-span-6"
            ref={(el) => {
              textBlocksRef.current[0] = el;
            }}
          >
            <p className="text-sm md:text-base leading-relaxed tracking-wide uppercase mb-8">
              I am a digital artisan obsessed with the space between silence and
              noise. Based in the digital ether, I construct systems that value
              function as the highest form of beauty. My work is a rejection of
              the decorative—stripping away the non-essential to reveal the raw
              structural integrity of the web.
            </p>

            <p className="text-sm md:text-base leading-relaxed tracking-wide uppercase text-gray-600">
              I don't just write code; I curate interactions. Working with
              ambitious brands to forge identities that demand attention through
              subtlety, not volume.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center mb-20 md:mb-32">
          <div
            ref={imageRef}
            className="relative group w-full max-w-md md:max-w-lg aspect-3/4 overflow-hidden bg-gray-300"
          >
            <img
              src="https://images.unsplash.com/photo-1764197944498-476aca304de5?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Portrait of the developer"
              className="w-full h-full object-cover grayscale brightness-95 contrast-110 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:contrast-125"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-2 lg:col-span-3"></div>

          <div
            className="md:col-span-8 lg:col-span-6"
            ref={(el) => {
              textBlocksRef.current[1] = el;
            }}
          >
            <p className="text-sm md:text-base leading-relaxed tracking-wide uppercase mb-8">
              To me, the browser is a canvas that breathes. I have a deep
              aversion to static, empty experiences. I strive to evoke feeling
              through motion, typography, and negative space.
            </p>

            <p className="text-sm md:text-base leading-relaxed tracking-wide uppercase mb-12">
              My approach is rooted in the belief that technology should feel
              organic. It should respond, adapt, and age gracefully.
            </p>

            <div className="border-t border-black pt-6" data-status-section>
              <p className="text-xs font-bold tracking-widest uppercase mb-2">
                Current Status
              </p>
              <p className="text-sm leading-relaxed tracking-wide uppercase text-gray-600">
                Accepting select freelance commissions for Q4 2025.
                <br />
                Open to collaborations with visionaries.
              </p>
              <div className="mt-8">
                <button
                  data-cta-button
                  className="text-sm font-bold uppercase tracking-widest border-b border-transparent hover:border-black transition-colors duration-300"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
