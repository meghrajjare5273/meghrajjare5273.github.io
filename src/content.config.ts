import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    order: z.number().int().nonnegative().default(999),
    published: z.boolean().default(true),

    metadata: z.object({
      industry: z.string(),
      year: z.string(),
      services: z.array(z.string()),
      repoLink: z.string().url(),
      deploymentLink: z.string().url().optional(),
    }),

    background: z.object({
      heading: z.string(),
      text: z.string(),
    }),

    challenge: z.object({
      objective: z.string(),
      detail: z.string(),
    }),

    hero: z.object({
      heading: z.array(z.string()).min(1),
      svgIcon: z.string().optional(),
      image: z.string(),
      imageAlt: z.string().optional(),
    }),

    showcase: z.object({
      thumbnail: z.string(),
      alt: z.string(),
      videoSrc: z.string(),
    }),

    gallery: z.object({
      left: z.object({
        image: z.string(),
        description: z.string(),
      }),
      right: z.object({
        image: z.string(),
        quote: z.string(),
        description: z.string(),
      }),
    }),

    techStack: z.object({
      heading: z.string(),
      description: z.string(),
      stack: z.array(z.string()),
      team: z.array(
        z.object({
          name: z.string(),
          role: z.string(),
        }),
      ),
      teamImage: z.string(),
    }),

    stats: z.object({
      heading: z.string().default("System status"),
      description: z.string().default("Current service overview."),
      snapshotDate: z.string().optional(),
      services: z.array(
        z.object({
          name: z.string(),
          status: z.enum(["active", "degraded", "offline"]),
          description: z.string(),
          updatedAt: z.string(),
        }),
      ),
    }),

    testimonial: z.object({
      quote: z.string(),
      author: z.object({
        image: z.string(),
        name: z.string(),
        role: z.string(),
      }),
    }),
  }),
});

export const collections = {
  projects,
};
