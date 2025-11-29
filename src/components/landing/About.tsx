import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const awardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const clientsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- SECTION HEADING ANIMATION ---
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
        });
      }

      // --- HERO TEXT ANIMATION ---
      if (heroTextRef.current) {
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
          stagger: {
            amount: 0.6,
            from: "start",
          },
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
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
            transformOrigin: "75% 100%",
            stagger: {
              amount: 0.5,
              from: "start",
            },
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
          });
        });
      });

      // --- IMAGE REVEAL WITH CLIP PATH ---
      if (imageRef.current) {
        const imageWrapper = imageRef.current;

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
      }

      // --- AWARDS GRID STAGGER ---
      awardsRef.current.forEach((item, index) => {
        if (!item) return;
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

      // --- CLIENTS GRID STAGGER ---
      clientsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: index * 0.05,
          ease: "power2.out",
        });
      });

      // --- CONTACT LINKS ANIMATION ---
      if (sectionRef.current) {
        const contactLinks = sectionRef.current.querySelectorAll(
          "[data-contact-link]"
        );
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

      // --- SECTION HEADERS FADE IN ---
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

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#EBEAE5] text-[#1A1A1A] font-mono selection:bg-black selection:text-white overflow-hidden py-24 px-6 md:px-12 lg:px-20"
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
            className="font-akira text-[12vw] md:text-[10rem] lg:text-[12rem] leading-[0.8] tracking-tighter uppercase cursor-default"
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
              I am a full-stack developer & AI/ML engineer
              <br />
              based in India, passionate about
              <br />
              <span className="relative inline-block">
                AI/ML
                {/* <sup className="text-[0.5em] ml-1">(1)</sup> */}
              </span>{" "}
              and originally from
              <br />
              <span className="relative inline-block">
                Pune
                {/* <sup className="text-[0.5em] ml-1">(2)</sup> */}
              </span>
              . Currently building
              <br />
              <span className="relative inline-block">
                innovative
                {/* <sup className="text-[0.5em] ml-1">(3)</sup> */}
              </span>{" "}
              web experiences,
              <br />
              RAG-powered assistants, and real-time
              <br />
              collaboration tools.
            </h2>

            {/* Footnotes */}
            {/* <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-xs md:text-sm mt-8">
              <span className="flex gap-2">
                <span>(1)</span>
                <span>Machine Learning, RAG & AI Systems</span>
              </span>
              <span className="flex gap-2">
                <span>(2)</span>
                <span>Maharashtra, India</span>
              </span>
              <span className="flex gap-2">
                <span>(3)</span>
                <a
                  href="https://github.com/meghrajjare5273"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-link"
                >
                  Selected projects & experiments ↗
                </a>
              </span>
            </div>*/}
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
                porjects for the past two years and have had fun doing it.
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
              className="relative w-full aspect-4/3 overflow-hidden rounded-4xl bg-gray-300"
            >
              <img
                src="https://images.unsplash.com/photo-1764197944498-476aca304de5?q=80&w=1992&auto=format&fit=crop"
                alt="Developer workspace"
                className="w-full h-full object-cover grayscale brightness-95 contrast-110 transition-all duration-700 ease-in-out hover:scale-105 hover:contrast-125"
              />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-32 md:mb-40 font-about">
          <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7">
            <h3 className="text-[7vw] md:text-[2rem] lg:text-[2.5rem] leading-[1.1] mb-10">
              <span className="ml-[15%] md:ml-[20%]">Want</span> to reach out
              about a project, collaboration, or just want to say a friendly
              hello?
            </h3>

            <ul className="grid grid-cols-2 md:flex md:flex-wrap gap-6 md:gap-12 text-lg md:text-xl lg:text-2xl mt-8 md:mt-12">
              <li data-contact-link>
                <a
                  href="mailto:meghrajjare77@gmail.com"
                  className="underline-link"
                >
                  Email ↗
                </a>
              </li>
              <li data-contact-link>
                <a
                  href="https://www.instagram.com/meghrajjare/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-link"
                >
                  Instagram ↗
                </a>
              </li>
              <li data-contact-link>
                <a
                  href="https://linkedin.com/in/meghrajjare5273"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-link"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li data-contact-link>
                <a
                  href="https://github.com/meghrajjare5273"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-link"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Awards & Recognition Section */}
        <div className="mb-32 md:mb-40 font-about">
          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8 mb-12"
            data-section-header
          >
            <span className="col-start-1 md:col-start-2 text-xs pt-2 opacity-60">
              (01)
            </span>
            <h3 className="col-start-2 col-span-5 md:col-start-3 md:col-span-4 text-[7vw] md:text-3xl leading-tight">
              Skills &<br />
              Technologies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
              {[
                {
                  category: "AI & ML",
                  count: "RAG, SVR, KNN, SVM, Random Forest",
                },
                {
                  category: "Web Development",
                  count: "Next.js, React, TypeScript",
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
                  category: "AI Tooling",
                  count: "Google AI SDK, OpenAI SDK, NLTK",
                },
                {
                  category: "NLP & Vector Search",
                  count: "Sentence Transformers, Semantic Search",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    awardsRef.current[index] = el;
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

        {/* Projects & Experience Section */}
        <div className="mb-32 md:mb-40 font-about">
          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8 mb-12"
            data-section-header
          >
            <span className="col-start-1 md:col-start-2 text-xs pt-2 opacity-60">
              (02)
            </span>
            <h3 className="col-start-2 col-span-5 md:col-start-3 md:col-span-4 text-[7vw] md:text-3xl leading-tight">
              Current &<br />
              Recent Projects
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-8">
              {[
                "LegalMind – AI Legal Assistant",
                "ProjecTree – Collaboration Platform",
                "GreyMatter – RAG Debate Bot",
                "No-Code ML Model Builder",
                // "NeuralSafe – Women Safety App",
                // "Academic Event Platforms",
                // "Data Science & RAG Experiments",
                // "Hackathon Prototypes",
                // "Open Source Components",
              ].map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    clientsRef.current[index] = el;
                  }}
                  className="text-lg md:text-xl lg:text-2xl"
                >
                  {project}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colophon Section */}
        {/* <div className="pb-20 md:pb-32">
          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8 mb-12"
            data-section-header
          >
            <span className="col-start-1 md:col-start-2 text-xs pt-2 opacity-60">
              (03)
            </span>
            <h3 className="col-start-2 col-span-5 md:col-start-3 md:col-span-4 text-[7vw] md:text-3xl leading-tight">
              Colophon
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="text-base md:text-lg">
                <div className="text-sm md:text-base opacity-60 mb-3">
                  Typeface
                </div>
                <p>
                  <a
                    href="https://fonts.google.com/specimen/Anton"
                    className="underline-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Anton
                  </a>
                  <br />
                  By Google Fonts
                </p>
              </div>
              <div className="text-base md:text-lg">
                <div className="text-sm md:text-base opacity-60 mb-3">
                  Built with
                </div>
                <p>
                  React, TypeScript, GSAP
                  <br />
                  Tailwind CSS & Next.js
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutSection;
