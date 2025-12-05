import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "@/content/projects"
    }),
    // type:'content',
  schema: z.object({
    title: z.string(),
    // slug is handled by the file name in Astro
    date: z.date(),
    featured: z.boolean().default(false),
    summary: z.string(), // 1-2 lines
    coverImage: z.string(), // path to image
    ogImage: z.string().optional(),
    tags: z.array(z.string()),
    role: z.string(), // e.g. "Full-stack"
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    // Optional metrics
    impactMetrics: z.array(z.string()).optional(),
    client: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};