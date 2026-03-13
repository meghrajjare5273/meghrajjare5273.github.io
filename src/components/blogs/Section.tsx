import { useCallback, useRef } from "react";
import { gsap } from "gsap";

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
  const imgARef = useRef<HTMLImageElement | null>(null);
  const imgBRef = useRef<HTMLImageElement | null>(null);
  const imageCardRef = useRef<HTMLDivElement | null>(null);
  const numBadgeRef = useRef<HTMLSpanElement | null>(null);

  const dateTrackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleTrackRefs = useRef<Array<HTMLDivElement | null>>([]);

  const useARef = useRef<boolean>(true);

  const showImage = useCallback((): void => {
    if (!imageCardRef.current) return;

    gsap.to(imageCardRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  const hideImage = useCallback((): void => {
    if (!imageCardRef.current) return;

    gsap.to(imageCardRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
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
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          },
        );
        return;
      }

      gsap.to(trackEl, {
        yPercent: 0,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: true,
      });
    },
    [],
  );

  const crossfadeImages = useCallback((post: BlogPost, num: number): void => {
    const outgoingEl = useARef.current ? imgARef.current : imgBRef.current;
    const incomingEl = useARef.current ? imgBRef.current : imgARef.current;

    if (!outgoingEl || !incomingEl) return;

    gsap.killTweensOf([outgoingEl, incomingEl], "opacity");

    gsap.set(incomingEl, {
      attr: { src: post.image, alt: post.title },
    });

    const tl = gsap.timeline({ overwrite: true });

    tl.to(
      outgoingEl,
      { opacity: 0, duration: 0.38, ease: "power1.inOut" },
      0,
    ).to(incomingEl, { opacity: 1, duration: 0.38, ease: "power1.inOut" }, 0);

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

    dateTrackRefs.current.forEach((trackEl) => {
      if (trackEl) rollText(trackEl, true);
    });

    titleTrackRefs.current.forEach((trackEl) => {
      if (trackEl) rollText(trackEl, true);
    });
  }, [hideImage, crossfadeImages, rollText]);

  const setDateTrackRef = (el: HTMLDivElement | null, i: number): void => {
    dateTrackRefs.current[i] = el;
  };

  const setTitleTrackRef = (el: HTMLDivElement | null, i: number): void => {
    titleTrackRefs.current[i] = el;
  };

  return (
    <section className="grid min-h-screen grid-cols-[320px_minmax(0,1fr)] items-start bg-[#fafaf8] px-6 font-['DM_Sans',sans-serif] max-[1100px]:grid-cols-[280px_minmax(0,1fr)] max-[900px]:grid-cols-1 max-[900px]:px-4">
      <aside className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto px-0 pb-[72px] pl-2 pr-9 pt-[72px] max-[900px]:relative max-[900px]:top-auto max-[900px]:h-auto max-[900px]:overflow-visible max-[900px]:border-b max-[900px]:border-[#e9e9e7] max-[900px]:pb-12">
        <div>
          <h1 className="mb-14 text-[clamp(3.5rem,5vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.045em] text-[#111]">
            Blog
            <sup className="ml-[5px] align-super text-[clamp(0.85rem,1.6vw,1.35rem)] font-light tracking-[0] text-[#999]">
              ({BLOG_POSTS.length})
            </sup>
          </h1>

          <p className="mb-[14px] text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[#bbb]">
            About
          </p>

          <div className="mb-[18px] h-px bg-[#e9e9e7]" />

          <p className="mb-12 max-w-[250px] text-sm leading-[1.7] text-[#888]">
            Here's where I share my thoughts, insights, and growth. New blog
            article monthly, released towards the end of every month.
          </p>

          <div
            ref={imageCardRef}
            className="relative aspect-square w-full max-w-[252px] origin-bottom-left overflow-hidden rounded-[3px] bg-[#111] opacity-0 scale-95"
          >
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
      </aside>

      <div className="pb-[72px] pl-8 pr-2 pt-[72px]">
        <div className="grid grid-cols-[128px_minmax(0,1fr)] gap-x-5 px-8 pb-5 max-[900px]:grid-cols-[96px_minmax(0,1fr)] max-[900px]:px-5 max-[900px]:pb-4 max-[600px]:grid-cols-[68px_minmax(0,1fr)] max-[600px]:px-[14px] max-[600px]:pb-3">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.09em] text-[#c0c0bc]">
            Date
          </span>
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.09em] text-[#c0c0bc]">
            Name
          </span>
        </div>

        {BLOG_POSTS.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block cursor-pointer border-t border-[#e9e9e7] bg-transparent text-[#111] no-underline transition-colors duration-[260ms] ease-[ease] last:border-b last:border-[#e9e9e7] hover:bg-[#111] hover:text-[#f4f4f0]"
            onMouseEnter={() => handleEnter(post, i)}
            onMouseLeave={handleLeave}
          >
            <div className="grid h-[110px] grid-cols-[128px_minmax(0,1fr)] items-stretch gap-x-5 overflow-hidden px-8 max-[900px]:h-[86px] max-[900px]:grid-cols-[96px_minmax(0,1fr)] max-[900px]:gap-x-[14px] max-[900px]:px-5 max-[600px]:h-[72px] max-[600px]:grid-cols-[68px_minmax(0,1fr)] max-[600px]:gap-x-[10px] max-[600px]:px-[14px]">
              <div className="relative h-full overflow-hidden">
                <div
                  ref={(el) => setDateTrackRef(el, i)}
                  className="flex h-[300%] flex-col will-change-transform"
                >
                  <div className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-sm tracking-[0.01em] opacity-[0.45] transition-opacity duration-[250ms] ease-[ease] group-hover:opacity-100 max-[600px]:text-[0.78rem]">
                    {post.date}
                  </div>
                  <div className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-sm tracking-[0.01em] opacity-[0.45] transition-opacity duration-[250ms] ease-[ease] group-hover:opacity-100 max-[600px]:text-[0.78rem]">
                    {post.date}
                  </div>
                  <div className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-sm tracking-[0.01em] opacity-[0.45] transition-opacity duration-[250ms] ease-[ease] group-hover:opacity-100 max-[600px]:text-[0.78rem]">
                    {post.date}
                  </div>
                </div>
              </div>

              <div className="relative h-full overflow-hidden">
                <div
                  ref={(el) => setTitleTrackRef(el, i)}
                  className="flex h-[300%] flex-col will-change-transform"
                >
                  <div className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] max-[900px]:text-[1.2rem] max-[600px]:text-[0.95rem]">
                    {post.title}
                  </div>
                  <div className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] max-[900px]:text-[1.2rem] max-[600px]:text-[0.95rem]">
                    {post.title}
                  </div>
                  <div className="flex h-1/3 shrink-0 items-center whitespace-nowrap text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] max-[900px]:text-[1.2rem] max-[600px]:text-[0.95rem]">
                    {post.title}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
