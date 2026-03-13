// src/lib/blog-content.ts
import { getCollection, type CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blogs">;

/** Full data shape — used by [slug].astro and BlogLayout */
export interface BlogPostData {
  title: string;
  slug: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  thumbnail: string;
  tags: string[];
  readTime?: number;
  published: boolean;
  featured: boolean;
}

/** Lean type — used by BlogList and BlogCard components */
export interface BlogCard {
  title: string;
  slug: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  thumbnail: string;
  tags: string[];
  readTime?: number;
  featured: boolean;
}

// ─── Sorting ───────────────────────────────────────────────────────────────

function sortPosts(a: BlogEntry, b: BlogEntry): number {
  return b.data.pubDate.getTime() - a.data.pubDate.getTime();
}

// ─── Query Helpers ─────────────────────────────────────────────────────────

/** Returns all published posts sorted newest-first */
export async function getAllPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection("blogs", ({ data }) => data.published);
  return posts.sort(sortPosts);
}

/** Returns only featured published posts */
export async function getFeaturedPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection(
    "blogs",
    ({ data }) => data.published && data.featured,
  );
  return posts.sort(sortPosts);
}

/** Returns lean BlogCard objects for the listing page */
export async function getBlogCards(): Promise<BlogCard[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    title: post.data.title,
    slug: post.data.slug,
    description: post.data.description,
    pubDate: post.data.pubDate,
    updatedDate: post.data.updatedDate,
    author: post.data.author,
    thumbnail: post.data.thumbnail,
    tags: post.data.tags,
    readTime: post.data.readTime,
    featured: post.data.featured,
  }));
}

// ─── Formatting Utility ────────────────────────────────────────────────────

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
