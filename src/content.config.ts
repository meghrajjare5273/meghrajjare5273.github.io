import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const mediaItemSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.url(),
  alt: z.string().optional(),
  aspectRatio: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    svgTitle: z.string(),
    thumbnail: z.string(),
    order: z.number().int(),
    slug: z.string(),
    year: z.number().int(),
    link: z.string().url(),
    githubLink: z.string().url().optional(),
    tagline: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    highlights: z.array(z.string()),
    media: z.array(mediaItemSchema),
    published: z.boolean(),
  }),
});

const blogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Meghraj Jare"),
    thumbnail: z.string().optional(), // FIX: optional — posts may not always have a cover image
    tags: z.array(z.string()).default([]),
    readTime: z.number().int().optional(),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects, blogs };
