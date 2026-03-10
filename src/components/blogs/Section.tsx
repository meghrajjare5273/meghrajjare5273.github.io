// src/components/blogs/Section.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-creative-website-guide",
    date: "2026.1.11",
    title: "The Creative Website Guide",
    image: "/images/blog/post-1.jpg",
  },
  {
    slug: "how-to-rewire-your-brain-to-be-addicted-to-coding",
    date: "2025.12.22",
    title: "How to rewire your brain to be addicted to coding",
    image: "/images/blog/post-2.jpg",
  },
  {
    slug: "everything-you-need-to-know-to-make-a-good-developer-portfolio-site",
    date: "2025.12.15",
    title:
      "Everything You Need to Know To Make A Good Developer Portfolio Site",
    image: "/images/blog/post-3.jpg",
  },
];

function BlogListItem({
  post,
  onHover,
  onLeave,
}: {
  post: BlogPost;
  onHover: (post: BlogPost) => void;
  onLeave: () => void;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const dateWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    const dateWrapper = dateWrapperRef.current;
    const textWrapper = textWrapperRef.current;

    if (!row || !dateWrapper || !textWrapper) return;

    gsap.set([dateWrapper, textWrapper], { y: "0%" });

    const onEnter = () => {
      onHover(post);
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = gsap.timeline();

      gsap.killTweensOf([dateWrapper, textWrapper]);

      tlRef.current
        .to(
          [dateWrapper, textWrapper],
          { y: "-33.333%", duration: 0.4, ease: "power2.out", stagger: 0.02 },
          0,
        )
        .to(
          row,
          {
            backgroundColor: "#0a0a0a",
            color: "#f5f5f0",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        );
    };

    const onLeaveLocal = () => {
      onLeave();
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = gsap.timeline();

      gsap.killTweensOf([dateWrapper, textWrapper]);

      tlRef.current
        .to(
          [dateWrapper, textWrapper],
          { y: "0%", duration: 0.4, ease: "power2.out", stagger: 0.02 },
          0,
        )
        .to(
          row,
          {
            backgroundColor: "transparent",
            color: "#0a0a0a",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        );
    };

    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeaveLocal);

    return () => {
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeaveLocal);
      tlRef.current?.kill();
    };
  }, [post, onHover, onLeave]);

  // Shared ticker span classes for date and title columns
  const tickerSpanBase =
    "h-[100px] max-[900px]:h-[80px] max-[600px]:h-[70px] flex items-center shrink-0 text-[0.9375rem] max-[600px]:text-[0.875rem] text-inherit whitespace-nowrap overflow-hidden text-ellipsis";

  const tickerSpanTitle =
    "h-[100px] max-[900px]:h-[80px] max-[600px]:h-[70px] flex items-center shrink-0 text-[1.75rem] max-[900px]:text-[1.25rem] max-[600px]:text-base font-semibold tracking-[-0.02em] whitespace-nowrap max-[600px]:whitespace-normal leading-[1.2] max-[600px]:leading-[1.3] overflow-hidden text-ellipsis text-inherit";

  return (
    <a
      ref={rowRef}
      href={`/blog/${post.slug}`}
      className="block no-underline relative overflow-hidden cursor-pointer"
      style={{ backgroundColor: "transparent", color: "#0a0a0a" }}
    >
      {/* Divider */}
      <div className="h-px bg-[#e5e5e5] w-full" />

      {/* Inner grid row */}
      <div className="grid grid-cols-[140px_1fr] max-[900px]:grid-cols-[100px_1fr] max-[600px]:grid-cols-[80px_1fr] items-center h-[100px] max-[900px]:h-[80px] max-[600px]:h-[70px] overflow-hidden px-10 max-[900px]:px-8 max-[600px]:px-6">
        {/* DATE column */}
        <div className="overflow-hidden h-[100px] max-[900px]:h-[80px] max-[600px]:h-[70px]">
          <div
            ref={dateWrapperRef}
            className="flex flex-col will-change-transform"
          >
            <span className={tickerSpanBase}>{post.date}</span>
            <span className={tickerSpanBase}>{post.date}</span>
            <span className={tickerSpanBase}>{post.date}</span>
          </div>
        </div>

        {/* TITLE column */}
        <div className="overflow-hidden h-[100px] max-[900px]:h-[80px] max-[600px]:h-[70px]">
          <div
            ref={textWrapperRef}
            className="flex flex-col will-change-transform"
          >
            <span className={tickerSpanTitle}>{post.title}</span>
            <span className={tickerSpanTitle}>{post.title}</span>
            <span className={tickerSpanTitle}>{post.title}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const displayPost = activePost || BLOG_POSTS[0];

  const handleHover = (post: BlogPost) => {
    if (imageRef.current && post.image !== displayPost.image) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setActivePost(post);
          gsap.to(imageRef.current, { opacity: 1, duration: 0.2 });
        },
      });
    } else {
      setActivePost(post);
    }
  };

  const handleLeave = () => {
    if (imageRef.current && !activePost) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setActivePost(null);
          gsap.to(imageRef.current, { opacity: 1, duration: 0.2 });
        },
      });
    } else {
      setActivePost(null);
    }
  };

  return (
    <section className="grid grid-cols-[380px_1fr] max-[900px]:grid-cols-1 gap-0 min-h-screen font-sans bg-white">
      {/* ── SIDEBAR ── */}
      <div className="px-10 py-12 max-[900px]:px-8 max-[900px]:py-8 border-r border-[#e5e5e5] max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-b-[#e5e5e5]">
        <div className="sticky top-12 max-[900px]:static">
          <h1 className="text-[5rem] max-[900px]:text-[3.5rem] max-[600px]:text-[2.5rem] font-bold leading-[0.9] tracking-[-0.04em] mt-0 mb-12 max-[900px]:mb-8 text-[#0a0a0a] flex items-start gap-[0.1em]">
            Blog
            {/* <sup className="text-base font-normal align-super ml-[0.15em] text-[#666] tracking-normal relative top-[0.5em]">({BLOG_POSTS.length})</sup> */}
          </h1>

          <div className="text-xs font-medium tracking-[0.05em] uppercase text-[#0a0a0a] mb-3">
            <span>ABOUT</span>
          </div>
          <div className="h-px bg-[#e5e5e5] mb-5" />

          <p className="text-[0.9375rem] leading-[1.6] text-[#666] max-w-[280px] mt-0 mb-10">
            Here's where I share my thoughts, insights, and growth. New blog
            article monthly, released towards the end of every month.
          </p>

          {/* Thumbnail */}
          <div className="relative w-full max-w-[280px] max-[900px]:max-w-[240px] aspect-square bg-[#0a0a0a] overflow-hidden">
            <div className="absolute top-4 left-4 text-white text-2xl font-semibold tracking-[0.02em] z-[2] leading-none">
              N<sup className="text-[0.75em] mx-[0.1em]">o</sup>&nbsp;0
              {displayPost === BLOG_POSTS[0] && !activePost
                ? BLOG_POSTS.length
                : BLOG_POSTS.findIndex((p) => p.slug === displayPost.slug) + 1}
            </div>
            <img
              ref={imageRef}
              src={displayPost.image}
              alt={displayPost.title}
              className="absolute bottom-0 right-0 w-[70%] h-[75%] object-cover block will-change-[opacity]"
            />
          </div>
        </div>
      </div>

      {/* ── ARTICLE LIST ── */}
      <div>
        {/* Header row */}
        <div className="grid grid-cols-[140px_1fr] max-[900px]:grid-cols-[100px_1fr] max-[600px]:grid-cols-[80px_1fr] px-10 max-[900px]:px-8 max-[600px]:px-6 py-6 max-[900px]:py-4 border-b border-b-[#e5e5e5]">
          <span className="text-xs font-medium tracking-[0.05em] uppercase text-[#666]">
            DATE
          </span>
          <span className="text-xs font-medium tracking-[0.05em] uppercase text-[#666]">
            NAME
          </span>
        </div>

        <ul className="list-none m-0 p-0">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug} className="relative">
              <BlogListItem
                post={post}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            </li>
          ))}
          {/* Final bottom divider */}
          <div className="h-px bg-[#e5e5e5] w-full" />
        </ul>
      </div>
    </section>
  );
}
