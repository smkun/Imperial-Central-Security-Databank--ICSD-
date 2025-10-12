import { defineCollection, z } from 'astro:content';

const storiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    character: z.string(),
    species: z.string(),
    affiliation: z.string(),
    era: z.string(),
    tags: z.array(z.string()),
    ship: z.string().optional(),
    lastUpdated: z.date(),
    portrait: z.string(),
    summary: z.string(),
    homeworld: z.string().optional(),
    authorNotes: z.string().optional(),
    linkedStories: z.array(z.string()).optional(),
  }),
});

export const collections = {
  stories: storiesCollection,
};
