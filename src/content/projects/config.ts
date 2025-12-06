import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    coverImage: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    // Add any other fields your projects use
  }),
});

export const collections = {
  'projects': projectsCollection,
};
