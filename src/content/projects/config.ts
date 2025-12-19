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
      team: z.array(z.string()),
      roles: z.array(z.string()),
      teamImage: z.string(),
    }),
    stats: z.object({
      heading: z.string(), // Renamed from resultTitle
      description: z.string(), // Renamed from resultDescription
      items: z.array(
        z.object({
          value: z.number(), // Renamed from number
          suffix: z.string().optional(),
          label: z.string(), // Renamed from description
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
