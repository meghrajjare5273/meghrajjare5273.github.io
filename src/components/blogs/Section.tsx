// src/components/BlogSection.tsx
"use client";

import { useRef, useEffect } from "react";
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

function BlogListItem({ post }: { post: BlogPost }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const dateWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    const dateWrapper = dateWrapperRef.current;
    const textWrapper = textWrapperRef.current;
    const imageEl = imageRef.current;

    if (!row || !dateWrapper || !textWrapper || !imageEl) return;

    // Each wrapper has 3 copies: [0] visible at rest, [1] hidden above (comes in), [2] spare
    // Layout: 3 spans stacked vertically, each 100% height of the row text area
    // At rest: translate Y = 0 (first span visible)
    // On hover: translate Y = -100% (second span scrolls into view from below...
    // actually it scrolls UP so second span comes from bottom)
    // The classic ticker: spans sit at 0%, 100%, 200% naturally via flex col
    // On hover, shift the whole wrapper upward by 1/3 of total height

    const SPAN_HEIGHT = 1 / 3; // each span is 1/3 of the wrapper

    // Initial state: position wrappers so first span is visible
    gsap.set([dateWrapper, textWrapper], { y: "0%" });

    const onEnter = () => {
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = gsap.timeline();

      // Slide text wrappers up so the 2nd span becomes visible
      tlRef.current
        .to(
          [dateWrapper, textWrapper],
          {
            y: "-33.333%",
            duration: 0.45,
            ease: "power3.out",
          },
          0,
        )
        // Background color change on the row
        .to(
          row,
          {
            backgroundColor: "var(--blog-hover-bg)",
            color: "var(--blog-hover-text)",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        // Image fades in
        .to(
          imageEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          0.05,
        );
    };

    const onLeave = () => {
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = gsap.timeline();

      tlRef.current
        .to(
          [dateWrapper, textWrapper],
          {
            y: "0%",
            duration: 0.45,
            ease: "power3.out",
          },
          0,
        )
        .to(
          row,
          {
            backgroundColor: "var(--blog-row-bg)",
            color: "var(--blog-row-text)",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          imageEl,
          {
            opacity: 0,
            y: 12,
            duration: 0.3,
            ease: "power2.in",
          },
          0,
        );
    };

    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);

    return () => {
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
      tlRef.current?.kill();
    };
  }, []);

  return (
    <a
      ref={rowRef}
      href={`/blog/${post.slug}`}
      className="blog-list-item"
      style={{
        backgroundColor: "var(--blog-row-bg)",
        color: "var(--blog-row-text)",
      }}
    >
      {/* Divider line at top */}
      <div className="blog-item-divider" />

      <div className="blog-item-inner">
        {/* DATE column */}
        <div className="blog-item-date-col">
          <div ref={dateWrapperRef} className="blog-ticker-wrapper">
            <span className="blog-ticker-span">{post.date}</span>
            <span className="blog-ticker-span">{post.date}</span>
            <span className="blog-ticker-span">{post.date}</span>
          </div>
        </div>

        {/* TITLE column */}
        <div className="blog-item-title-col">
          <div ref={textWrapperRef} className="blog-ticker-wrapper">
            <span className="blog-ticker-span blog-ticker-title">
              {post.title}
            </span>
            <span className="blog-ticker-span blog-ticker-title">
              {post.title}
            </span>
            <span className="blog-ticker-span blog-ticker-title">
              {post.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hover image */}
      <div
        ref={imageRef}
        className="blog-item-hover-image"
        style={{ opacity: 0, transform: "translateY(12px)" }}
      >
        <img src={post.image} alt={post.title} />
      </div>
    </a>
  );
}

export default function BlogSection() {
  return (
    <section className="blog-section">
      {/* ── SIDEBAR ── */}
      <div className="blog-sidebar">
        <div className="blog-sidebar-content">
          <h1 className="blog-heading">
            Blog
            <sup className="blog-count">({BLOG_POSTS.length})</sup>
          </h1>

          <div className="blog-sidebar-label">
            <span>ABOUT</span>
          </div>
          <div className="blog-sidebar-divider" />

          <p className="blog-description">
            Here's where I share my thoughts, insights, and growth. New blog
            article monthly, released towards the end of every month.
          </p>

          {/* Thumbnail — shown on hover of any row, or static */}
          <div className="blog-sidebar-thumbnail">
            <div className="blog-thumbnail-label">
              N<sup>o</sup>&nbsp;0{BLOG_POSTS.length}
            </div>
            {/* This can be swapped to a dynamic image per hover if desired */}
            <img
              src="/images/blog/post-1.jpg"
              alt="Latest blog"
              className="blog-thumbnail-img"
            />
          </div>
        </div>
      </div>

      {/* ── ARTICLE LIST ── */}
      <div className="blog-article-list">
        {/* Header row */}
        <div className="blog-list-header">
          <span className="blog-header-label">DATE</span>
          <span className="blog-header-label">NAME</span>
        </div>

        <ul className="blog-list">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug} className="blog-list-li">
              <BlogListItem post={post} />
            </li>
          ))}
          {/* Final bottom divider */}
          <div className="blog-item-divider" />
        </ul>
      </div>
    </section>
  );
}
