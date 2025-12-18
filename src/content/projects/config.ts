import { defineCollection, z } from "astro:content";

export const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    year: z.string(),
    services: z.string(),
    background: z.object({
      heading: z.string(),
      text: z.string(),
    }),
    challenge: z.object({
      objective: z.string(),
      detail: z.string(),
    }),
    hero: z.object({
      title: z.array(z.string()),
      tag: z.string().optional(),
      image: z.string(),
      imageAlt: z.string().optional(),
    }),
    video: z.object({
      image: z.string(),
      imageAlt: z.string(),
    }),
    gravityImages: z.object({
      left: z.object({
        image: z.string(),
        caption: z.string(),
      }),
      right: z.object({
        image: z.string(),
        quote: z.string(),
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
      resultTitle: z.string(),
      resultDescription: z.string(),
      items: z.array(
        z.object({
          number: z.number(),
          suffix: z.string().optional(),
          description: z.string(),
        })
      ),
    }),
    footer: z.object({
      quote: z.string(),
      avatar: z.object({
        image: z.string(),
        name: z.string(),
        title: z.string(),
      }),
    }),
  }),
});

// export default collections;
