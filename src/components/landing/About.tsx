import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

ScrollTrigger.config({ ignoreMobileResize: true });

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  // Only keeping refs for elements actually present in the JSX
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const awardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Detect Mobile
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // --- SECTION HEADING ANIMATION ---
      if (headingRef.current) {
        if (!isMobile) {
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
          });
        } else {
          gsap.from(headingRef.current, {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      }

      // --- HERO TEXT ANIMATION ---
      if (heroTextRef.current) {
        if (!isMobile) {
          const heroSplit = new SplitText(heroTextRef.current, {
            type: "lines,words",
            linesClass: "line-wrapper",
            wordsClass: "word",
          });
          gsap.set(heroSplit.lines, { overflow: "hidden" });

          gsap.from(heroSplit.words, {
            scrollTrigger: {
              trigger: heroTextRef.current,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
            yPercent: 100,
            opacity: 0,
            rotationX: -45,
            transformOrigin: "75% 100%",
            stagger: { amount: 0.6, from: "start" },
            duration: 0.9,
            ease: "power3.out",
          });
        } else {
          gsap.from(heroTextRef.current, {
            scrollTrigger: {
              trigger: heroTextRef.current,
              start: "top 85%",
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      }

      // --- TEXT BLOCK ANIMATIONS ---
      textBlocksRef.current.forEach((block) => {
        if (!block) return;

        if (isMobile) {
          gsap.from(block, {
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          });
        } else {
          const paragraphs = block.querySelectorAll<HTMLParagraphElement>("p");
          paragraphs.forEach((p) => {
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
              transformOrigin: "75% 100%",
              stagger: { amount: 0.5, from: "start" },
              duration: 0.8,
              ease: "power3.out",
            });
          });
        }
      });

      // --- IMAGE REVEAL ---
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: isMobile ? true : 2.5,
          },
          clipPath: "inset(0% 0% 100% 0%)",
          ease: "none",
        });
      }

      // --- SKILLS LIST ANIMATION (Formerly animateList) ---
      // Logic simplified as we only have one list now (awardsRef)
      const skillsTargets = awardsRef.current.filter((r) => r);
      if (skillsTargets.length > 0) {
        if (isMobile) {
          ScrollTrigger.batch(skillsTargets, {
            start: "top 90%",
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                overwrite: true,
              }),
          });
          gsap.set(skillsTargets, { opacity: 0, y: 30 });
        } else {
          skillsTargets.forEach((item, index) => {
            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 30,
              duration: 0.6,
              delay: index * 0.08,
              ease: "power2.out",
            });
          });
        }
      }

      // --- CONTACT / RESUME LINKS ---
      if (sectionRef.current) {
        const contactLinks = sectionRef.current.querySelectorAll(
          "[data-contact-link]"
        );

        if (isMobile) {
          ScrollTrigger.batch(contactLinks, {
            start: "top 90%",
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1 }),
          });
          gsap.set(contactLinks, { opacity: 0, y: 20 });
        } else {
          contactLinks.forEach((link, index) => {
            gsap.from(link, {
              scrollTrigger: {
                trigger: link,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 20,
              duration: 0.5,
              delay: index * 0.1,
              ease: "power2.out",
            });
          });
        }
      }

      // --- SECTION HEADERS ---
      if (sectionRef.current) {
        const sectionHeaders = sectionRef.current.querySelectorAll(
          "[data-section-header]"
        );
        sectionHeaders.forEach((header) => {
          gsap.from(header, {
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
            force3D: true,
          });
        });
      }
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- NEW: Dynamic Sticky Offset Logic ---
  useEffect(() => {
    const updateStickyPosition = () => {
      if (!sectionRef.current) return;

      const viewportHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Calculate the offset:
      // If section is taller than screen, stick so the bottom is visible (negative top).
      // If section is shorter, stick to the top (0).
      const topOffset = Math.min(0, viewportHeight - sectionHeight);

      sectionRef.current.style.top = `${topOffset}px`;
    };

    // Run on mount and resize
    updateStickyPosition();
    const handleResize = () => {
      updateStickyPosition();
      ScrollTrigger.refresh(); // Ensure GSAP stays in sync
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={sectionRef}
      // CHANGE: 'relative' -> 'sticky'
      // CHANGE: 'z-20' ensures it is below Contact (z-30)
      // REMOVE: 'bottom-0' (we set 'top' via JS above)
      className="sticky z-20 min-h-screen bg-[#9f9a95] dark:bg-[#1d1d1d] text-foreground font-mono selection:bg-black selection:text-white overflow-hidden py-24 px-6 md:px-12 lg:px-20"
    >
      <style>
        {`          
          .char, .word, .line-wrapper {
            display: inline-block;
          }
          
          .line-wrapper {
            overflow: hidden;
            padding: 2px 0;
          }

          .underline-link {
            position: relative;
            text-decoration: none;
          }

          .underline-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 1px;
            background: currentColor;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }

          .underline-link:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        `}
      </style>

      <div className="max-w-[1400px] mx-auto">
        {/* Section Heading */}
        <div className="w-full text-center mb-20 md:mb-32">
          <h1
            ref={headingRef}
            className="font-akira text-[16vw] md:text-[10rem] lg:text-[12rem] leading-[0.8] tracking-tighter uppercase cursor-default"
          >
            About Me
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-32 cursor-n-resize font-about">
          <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7">
            <h2
              ref={heroTextRef}
              className="text-[7vw] md:text-[2.5rem] lg:text-[3.125rem] leading-[1.1] tracking-tight mb-8"
            >
              <span className="block ml-[15%] md:ml-[20%]">Meghraj Jare.</span>
              {/* Fixed typo: "md: block" -> "md:block" */}
              <br className="md:block" />
              I am a full-stack developer & AI/ML engineer
              <br />
              based in India, passionate about
              <br />
              <span className="relative inline-block">AI/ML</span> and
              originally from
              <br />
              <span className="relative inline-block">Pune</span>. Currently
              building
              <br />
              <span className="relative inline-block">innovative</span> web
              experiences,
              <br />
              RAG-powered assistants, and real-time
              <br />
              collaboration tools.
            </h2>
          </div>

          {/* Side Description */}
          <div className="md:col-start-3 md:col-span-8 lg:col-start-11 lg:col-span-3 mt-8 md:mt-0">
            <span className="hidden font-bold lg:block text-xs mb-6 opacity-60">
              Last Updated: November 29, 2025
            </span>
            <div
              ref={(el) => {
                textBlocksRef.current[0] = el;
              }}
            >
              <p className="text-sm md:text-base leading-relaxed">
                My expertise lies in building full-stack applications with
                modern frameworks like Next.js and FastAPI. I have been building
                projects for the past two years and have had fun doing it.
                I&apos;m currently pursuing a B.Tech. in Artificial Intelligence
                and Data Science at AISSMS Institute of Information Technology,
                Pune (CGPA 8.18).
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-32">
          <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7">
            <div
              ref={imageRef}
              className="relative w-full aspect-3/4 overflow-hidden rounded-4xl bg-gray-300"
            >
              <img
                src="/prof.jpeg"
                alt="Developer workspace"
                className="w-full h-full object-cover grayscale brightness-95 contrast-110 transition-all duration-700 ease-in-out hover:scale-105 hover:contrast-100"
              />
            </div>
          </div>
        </div>

        {/* Resume Link */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-48 md:mb-56 font-about">
          <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7">
            <h3 className="text-[7vw] md:text-[2rem] lg:text-[2.5rem] leading-[1.1] mb-10">
              {/* Fixed typo: "ml:8%" -> "ml-[8%]" */}
              <span className="md:ml-[10%] ml-[8%]">Here's</span> a link to my
              résumé.
            </h3>

            <ul className="grid grid-cols-2 md:ml-[15%] md:flex md:flex-wrap gap-6 md:gap-12 text-lg md:text-xl lg:text-2xl mt-8 md:mt-12">
              <li data-contact-link>
                <a
                  href="/Meghraj Jare.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-link"
                >
                  My Résumé ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-32 md:mb-40 font-about">
          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8 mb-12"
            data-section-header
          >
            {/* FIX APPLIED HERE: Added lg:col-start-4 lg:col-span-7 to align with the skills grid below */}
            <h3 className="col-start-1 col-span-5 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7 text-[7vw] md:text-[2rem] lg:text-[2.5rem] font-bold leading-tight">
              Skills &<br />
              Technologies
            </h3>
          </div>

          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8"
            data-section-header
          >
            {/* Subtext stays at col-3 creating the staggered effect if intended, or you can add lg:col-start-4 here too if needed */}
            <h5 className="col-start-1 col-span-15 md:col-start-3 md:col-span-24 mb-12 text-lg md:text-xl">
              <span className="ml-[5%] md:ml-[15%]">Here's</span> a brief
              overview of the technologies I am familiar with in the domains I
              am familiar with.
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* This is the "Lower Text" referenced - it starts at col-4 on lg */}
            <div className="ml-[5%] md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
              {[
                {
                  category: "AI & ML",
                  count: "Scikit-Learn, Huggingface, NLTK",
                },
                {
                  category: "Web Development",
                  count: "Next.js, React, Astro",
                },
                {
                  category: "Backend & APIs",
                  count: "FastAPI, Node.js, Express.js",
                },
                {
                  category: "Data & Infra",
                  count: "PostgreSQL, Redis, Pinecone, Prisma",
                },
                {
                  category: "Programming Languages",
                  count: "C, C++, Python, TypeScript",
                },
                {
                  category: "Cloud & DevOps",
                  count: "Microsoft Azure, Github Pages",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (awardsRef.current) awardsRef.current[index] = el;
                  }}
                  className="text-base md:text-lg lg:text-xl"
                >
                  <div className="text-sm md:text-base opacity-60 mb-2">
                    {item.category}
                  </div>
                  <div className="font-medium">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-24 md:mb-40 font-about mt-60 md:mt-80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Section 2: This remains as it was in your original code (starts at col-4 on lg) */}
            <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7">
              <h3
                className="text-[7vw] font-bold md:text-[2rem] lg:text-[2.5rem] leading-[1.1] mb-6"
                data-section-header
              >
                Want to see  <br />
               <p className="opacity-50">what I've been up to.?</p>
              </h3>

              <p
                className="text-sm md:text-base leading-relaxed opacity-80 max-w-xl mb-12"
                data-section-header
              >
                I believe in learning by doing. The links attached below cover my journey over the past few years.
              </p>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-center">
                <a
                  href="/projects"
                  className="underline-link text-lg md:text-xl font-medium w-fit"
                  data-contact-link
                >
                  Projects ↗
                </a>
                <a
                  href="/awards"
                  className="underline-link text-lg md:text-xl font-medium w-fit"
                  data-contact-link
                >
                  Awards and Recognition ↗
                </a>
                <a
                  href="/blogs"
                  className="underline-link text-lg md:text-xl font-medium w-fit"
                  data-contact-link
                >
                  Blogs ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
