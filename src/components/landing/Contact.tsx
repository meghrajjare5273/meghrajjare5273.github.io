// src/components/landing/Contact.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Mail, Github, Linkedin, ArrowUpRight, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const decorativeTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // --- HEADING ANIMATION ---
      if (headingRef.current) {
        if (!isMobile) {
          const headingSplit = new SplitText(headingRef.current, {
            type: "chars",
            charsClass: "char",
          });

          gsap.from(headingSplit.chars, {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
            opacity: 0,
            yPercent: 100,
            rotationX: -90,
            transformOrigin: "50% 100%",
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.2)",
          });
        } else {
          gsap.from(headingRef.current, {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      }

      // --- SUBHEADING ANIMATION ---
      if (subheadingRef.current) {
        if (!isMobile) {
          const subheadingSplit = new SplitText(subheadingRef.current, {
            type: "lines,words",
            linesClass: "line-wrapper",
            wordsClass: "word",
          });
          gsap.set(subheadingSplit.lines, { overflow: "hidden" });

          gsap.from(subheadingSplit.words, {
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: "top 85%",
            },
            yPercent: 100,
            opacity: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out",
          });
        } else {
          gsap.from(subheadingRef.current, {
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: "top 90%",
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      }

      // --- FADE IN ELEMENTS (Description & CTA) ---
      const fadeElements = [descriptionRef.current, ctaBlockRef.current];
      fadeElements.forEach((el) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });

      // --- SOCIAL LINKS STAGGER ---
      const validLinks = linksRef.current.filter(Boolean);
      if (validLinks.length > 0) {
        gsap.from(validLinks, {
          scrollTrigger: {
            trigger: validLinks[0],
            start: "top 95%",
          },
          opacity: 0,
          y: 15,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // --- DECORATIVE TEXT PARALLAX ---
      if (decorativeTextRef.current && !isMobile) {
        gsap.to(decorativeTextRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          yPercent: -20,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative z-50 w-full bg-[#b3ada6] dark:bg-[#313131] text-foreground font-mono overflow-hidden py-16 md:py-24 px-4 md:px-8"
    >
      <style>
        {`
          .char, .word, .line-wrapper { display: inline-block; }
          .line-wrapper { overflow: hidden; padding-bottom: 0.1em; }
          .contact-link { position: relative; transition: transform 0.3s ease; }
          .contact-link::after {
            content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px;
            background: currentColor; transform: scaleX(0); transform-origin: right;
            transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
          }
          .contact-link:hover { transform: translateX(4px); }
          .contact-link:hover::after { transform: scaleX(1); transform-origin: left; }
        `}
      </style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* COMPACT HEADER */}
        <div className="mb-12 md:mb-20">
          <h1
            ref={headingRef}
            className="font-akira text-[13vw] md:text-8xl lg:text-9xl leading-[0.8] tracking-tighter uppercase cursor-default wrap-break-word"
          >
            Let's Talk
          </h1>
        </div>

        {/* TWO COLUMN COMPACT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 items-start">
          {/* Left Column: Text */}
          <div className="max-w-2xl">
            <h2
              ref={subheadingRef}
              className="font-about text-2xl md:text-4xl leading-[1.2] tracking-tight mb-6"
            >
              Have a project in mind? <br className="hidden md:block" />
              Let's build something great.
            </h2>

            <p
              ref={descriptionRef}
              className="text-sm md:text-base font-about leading-relaxed opacity-80 max-w-md"
            >
              I'm available for freelance projects and full-time opportunities.
              If you like what you see here—drop me a message.
            </p>
          </div>

          {/* Right Column: CTA Box */}
          <div className="w-full lg:w-auto" ref={ctaBlockRef}>
            <div className="bg-[#9f9a95] dark:bg-[#1d1d1d] rounded-xl p-6 md:p-8 inline-block w-full lg:w-auto">
              <p className="text-[10px] font-about uppercase tracking-widest opacity-60 mb-3">
                Primary Contact
              </p>
              <a
                href="mailto:meghrajjare77@gmail.com"
                className="block text-xl md:text-2xl lg:text-3xl font-about leading-tight break-all md:break-normal contact-link"
              >
                meghrajjare77@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="border-t border-black/10 dark:border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-[10px] text-transparent pointer-events-none touch-none font-about uppercase tracking-widest opacity-60"></p>

            <div className="flex flex-wrap gap-6 md:gap-10">
              <a
                ref={(el) => {
                  linksRef.current[0] = el;
                }}
                href="https://github.com/meghrajjare5273"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-base font-about contact-link"
              >
                <Github className="w-4 h-4" /> GitHub{" "}
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                ref={(el) => {
                  linksRef.current[1] = el;
                }}
                href="https://linkedin.com/in/meghrajjare5273"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-base font-about contact-link"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn{" "}
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                ref={(el) => {
                  linksRef.current[2] = el;
                }}
                href="mailto:meghrajjare77@gmail.com"
                className="flex items-center gap-2 text-base font-about contact-link"
              >
                <Mail className="w-4 h-4" /> Email{" "}
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                ref={(el) => {
                  linksRef.current[3] = el;
                }}
                href="https://www.instagram.com/meghrajjare"
                className="flex items-center gap-2 text-base font-about contact-link"
              >
                <Instagram className="w-4 h-4" /> Instagram{" "}
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DECORATIVE BACKGROUND TEXT */}
      <div
        ref={decorativeTextRef}
        className="hidden lg:block absolute bottom-[-5%] right-[4%] font-akira text-[12rem] leading-none tracking-tighter uppercase opacity-[0.03] pointer-events-none select-none whitespace-nowrap"
      >
        Connect
      </div>
    </div>
  );
};

export default Contact;
