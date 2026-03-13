"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BlogPost = {
  slug: string;
  date: string;
  title: string;
  image: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-creative-website-guide",
    date: "2026.1.11",
    title: "The Creative Website Guide",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80",
  },
  {
    slug: "how-to-rewire-your-brain-to-be-addicted-to-coding",
    date: "2025.12.22",
    title: "How to rewire your brain to be addicted to coding",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
  },
  {
    slug: "everything-you-need-to-know-to-make-a-good-developer-portfolio-site",
    date: "2025.12.15",
    title:
      "Everything You Need to Know To Make A Good Developer Portfolio Site",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&q=80",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);

  const imgARef = useRef<HTMLImageElement | null>(null);
  const imgBRef = useRef<HTMLImageElement | null>(null);
  const imageCardRef = useRef<HTMLDivElement | null>(null);
  const numBadgeRef = useRef<HTMLSpanElement | null>(null);

  const dateTrackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleTrackRefs = useRef<Array<HTMLDivElement | null>>([]);

  const useARef = useRef<boolean>(true);

  // ─── Entrance animation ───────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".blog-heading", { y: 40, opacity: 0 });
      gsap.set(".blog-about-label", { y: 16, opacity: 0 });
      gsap.set(".blog-about-divider", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".blog-about-text", { y: 20, opacity: 0 });
      gsap.set(".blog-col-header", { y: 12, opacity: 0 });
      gsap.set(".blog-row", { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".blog-heading", { y: 0, opacity: 1, duration: 0.9 })
        .to(".blog-about-label", { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
        .to(
          ".blog-about-divider",
          { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
          "-=0.4",
        )
        .to(".blog-about-text", { y: 0, opacity: 1, duration: 0.7 }, "-=0.35")
        .to(
          ".blog-col-header",
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          "-=0.5",
        )
        .to(
          ".blog-row",
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── Scroll-driven image card parallax ───────────────────────────────────
  useEffect(() => {
    if (!asideRef.current || !imageCardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".blog-image-card-inner", {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, asideRef);

    return () => ctx.revert();
  }, []);

  // ─── Mouse-follow for image card ─────────────────────────────────────────
  const handleSectionMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!imageCardRef.current) return;
      const rect = imageCardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      gsap.to(imageCardRef.current, {
        rotateX: -dy * 6,
        rotateY: dx * 6,
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 800,
        overwrite: "auto",
      });
    },
    [],
  );

  const handleSectionMouseLeave = useCallback(() => {
    if (!imageCardRef.current) return;
    gsap.to(imageCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  }, []);

  // ─── Hover helpers (unchanged logic, smoother timing) ────────────────────
  const showImage = useCallback((): void => {
    if (!imageCardRef.current) return;
    gsap.to(imageCardRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  const hideImage = useCallback((): void => {
    if (!imageCardRef.current) return;
    gsap.to(imageCardRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 8,
      duration: 0.35,
      ease: "power2.in",
      overwrite: true,
    });
  }, []);

  const rollText = useCallback(
    (trackEl: HTMLDivElement | null, reverse = false): void => {
      if (!trackEl) return;
      gsap.killTweensOf(trackEl);

      if (!reverse) {
        gsap.fromTo(
          trackEl,
          { yPercent: 0 },
          {
            yPercent: -33.333,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
          },
        );
      } else {
        gsap.to(trackEl, {
          yPercent: 0,
          duration: 0.35,
          ease: "power2.inOut",
          overwrite: true,
        });
      }
    },
    [],
  );

  const crossfadeImages = useCallback((post: BlogPost, num: number): void => {
    const outgoingEl = useARef.current ? imgARef.current : imgBRef.current;
    const incomingEl = useARef.current ? imgBRef.current : imgARef.current;

    if (!outgoingEl || !incomingEl) return;

    gsap.killTweensOf([outgoingEl, incomingEl], "opacity");
    gsap.set(incomingEl, { attr: { src: post.image, alt: post.title } });

    gsap
      .timeline({ overwrite: true })
      .to(outgoingEl, { opacity: 0, duration: 0.36, ease: "power1.inOut" }, 0)
      .to(incomingEl, { opacity: 1, duration: 0.36, ease: "power1.inOut" }, 0);

    if (numBadgeRef.current) {
      numBadgeRef.current.textContent = String(num).padStart(2, "0");
    }

    useARef.current = !useARef.current;
  }, []);

  const handleEnter = useCallback(
    (post: BlogPost, i: number): void => {
      showImage();
      crossfadeImages(post, i + 1);
      rollText(dateTrackRefs.current[i]);
      rollText(titleTrackRefs.current[i]);
    },
    [showImage, crossfadeImages, rollText],
  );

  const handleLeave = useCallback((): void => {
    hideImage();
    crossfadeImages(BLOG_POSTS[0], 1);
    dateTrackRefs.current.forEach((el) => rollText(el, true));
    titleTrackRefs.current.forEach((el) => rollText(el, true));
  }, [hideImage, crossfadeImages, rollText]);

  const setDateTrackRef = (el: HTMLDivElement | null, i: number): void => {
    dateTrackRefs.current[i] = el;
  };

  const setTitleTrackRef = (el: HTMLDivElement | null, i: number): void => {
    titleTrackRefs.current[i] = el;
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="grid min-h-screen grid-cols-[320px_minmax(0,1fr)] items-start bg-[#fafaf8] px-6 font-['DM_Sans',sans-serif] max-[1100px]:grid-cols-[280px_minmax(0,1fr)] max-[900px]:grid-cols-1 max-[900px]:px-4"
    >
      <aside
        ref={asideRef}
        className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto px-0 pb-[72px] pl-2 pr-9 pt-[72px] max-[900px]:relative max-[900px]:top-auto max-[900px]:h-auto max-[900px]:overflow-visible max-[900px]:border-b max-[900px]:border-[#e9e9e7] max-[900px]:pb-12"
      >
        <div>
          <h1 className="blog-heading mb-14 text-[clamp(3.5rem,5vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.045em] text-[#111]">
            Blog
            <sup className="ml-[5px] align-super text-[clamp(0.85rem,1.6vw,1.35rem)] font-light tracking-[0] text-[#999]">
              ({BLOG_POSTS.length})
            </sup>
          </h1>

          <p className="blog-about-label mb-[14px] text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[#bbb]">
            About
          </p>

          <div className="blog-about-divider mb-[18px] h-px bg-[#e9e9e7]" />

          <p className="blog-about-text mb-12 max-w-[250px] text-sm leading-[1.7] text-[#888]">
            Here's where I share my thoughts, insights, and growth. New blog
            article monthly, released towards the end of every month.
          </p>

          {/* Image card — wrapped so parallax transforms don't fight opacity */}
          <div
            ref={imageCardRef}
            className="relative aspect-square w-full max-w-[252px] origin-bottom-left overflow-hidden rounded-[3px] bg-[#111] opacity-0 scale-95"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="blog-image-card-inner absolute inset-0">
              <div className="absolute left-[18px] top-4 z-[2] text-[1.3rem] font-semibold leading-none tracking-[-0.03em] text-white">
                N<sup className="align-super text-[0.8rem]">o</sup>{" "}
                <span ref={numBadgeRef}>01</span>
              </div>

              <div className="absolute bottom-0 right-0 h-[75%] w-[70%]">
                <img
                  ref={imgARef}
                  src={BLOG_POSTS[0].image}
                  alt={BLOG_POSTS[0].title}
                  className="absolute inset-0 block h-full w-full object-cover"
                />
                <img
                  ref={imgBRef}
                  src={BLOG_POSTS[0].image}
                  alt={BLOG_POSTS[0].title}
                  className="absolute inset-0 block h-full w-full object-cover opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="pb-[72px] pl-8 pr-2 pt-[72px]">
        <div className="grid grid-cols-[128px_minmax(0,1fr)] gap-x-5 px-8 pb-5 max-[900px]:grid-cols-[96px_minmax(0,1fr)] max-[900px]:px-5 max-[900px]:pb-4 max-[600px]:grid-cols-[68px_minmax(0,1fr)] max-[600px]:px-[14px] max-[600px]:pb-3">
          <span className="blog-col-header text-[0.68rem] font-medium uppercase tracking-[0.09em] text-[#c0c0bc]">
            Date
          </span>
          <span className="blog-col-header text-[0.68rem] font-medium uppercase tracking-[0.09em] text-[#c0c0bc]">
            Name
          </span>
        </div>

        {BLOG_POSTS.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-row group block cursor-pointer border-t border-[#e9e9e7] bg-transparent text-[#111] no-underline transition-colors duration-[260ms] ease-[ease] last:border-b last:border-[#e9e9e7] hover:bg-[#111] hover:text-[#f4f4f0]"
            onMouseEnter={() => handleEnter(post, i)}
            onMouseLeave={handleLeave}
          >
            <div className="grid h-[110px] grid-cols-[128px_minmax(0,1fr)] items-stretch gap-x-5 overflow-hidden px-8 max-[900px]:h-[86px] max-[900px]:grid-cols-[96px_minmax(0,1fr)] max-[900px]:gap-x-[14px] max-[900px]:px-5 max-[600px]:h-[72px] max-[600px]:grid-cols-[68px_minmax(0,1fr)] max-[600px]:gap-x-[10px] max-[600px]:px-[14px]">
              <div className="relative h-full overflow-hidden">
                <div
                  ref={(el) => setDateTrackRef(el, i)}
                  className="flex h-[300%] flex-col will-change-transform"
                >
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-sm tracking-[0.01em] opacity-[0.45] transition-opacity duration-[250ms] ease-[ease] group-hover:opacity-100 max-[600px]:text-[0.78rem]"
                    >
                      {post.date}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-full overflow-hidden">
                <div
                  ref={(el) => setTitleTrackRef(el, i)}
                  className="flex h-[300%] flex-col will-change-transform"
                >
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] max-[900px]:text-[1.2rem] max-[600px]:text-[0.95rem]"
                    >
                      {post.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
