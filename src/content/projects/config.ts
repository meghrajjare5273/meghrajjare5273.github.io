import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metadata: z.object({
      industry: z.string(),
      year: z.string(),
      services: z.string(), // Consider z.array(z.string()) if you want a list
      repoLink: z.string(),
      deploymentLink: z.string(),
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
      heading: z.array(z.string()), // Renamed from title to distinguish from page title
      svgIcon: z.string().optional(),
      image: z.string(),
      imageAlt: z.string().optional(),
    }),
    showcase: z.object({
      // Renamed from video
      thumbnail: z.string(),
      alt: z.string(),
      videoSrc: z.string(),
    }),
    gallery: z.object({
      // Renamed from gravityImages
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
        })
      ),
      teamImage: z.string(),
    }),
    stats: z.object({
      heading: z.string().optional(),
      description: z.string().optional(),
      snapshotDate: z.string().optional(), // New optional field for section-level date
      services: z.array(
        // Renamed from 'items' to match component prop
        z.object({
          name: z.string(),
          status: z.enum(["active", "degraded", "offline"]), // Strict validation for visual logic
          description: z.string(), // Short status explanation
          updatedAt: z.string(), // e.g. "12 Aug 2025"
        })
      ),
    }),
    testimonial: z.object({
      // Renamed from footer
      quote: z.string(),
      author: z.object({
        // Renamed from avatar
        image: z.string(),
        name: z.string(),
        role: z.string(), // Renamed from title
      }),
    }),
  }),
});

export default projectsCollection;
