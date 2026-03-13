import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const mediaItemSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string().url(),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Meghraj Jare"),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    readTime: z.number().int().optional(), // estimated minutes
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  blogs,
};
