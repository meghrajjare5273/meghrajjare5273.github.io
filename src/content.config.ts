import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
    order: z.number().int(),
    slug: z.string().optional(),
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

export const collections = {
  projects,
};
