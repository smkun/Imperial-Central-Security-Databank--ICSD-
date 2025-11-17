import { defineCollection, z } from 'astro:content';

const storiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    character: z.string(),
    lastUpdated: z.coerce.date(),
    portrait: z.string(),
    summary: z.string(),
    threatLevel: z.enum(['CRITICAL', 'HIGH', 'MODERATE-HIGH', 'MODERATE', 'LOW']).optional(),
    homeworld: z.string().optional(),
    authorNotes: z.string().optional(),
    linkedStories: z.array(z.string()).optional(),
    characterSheet: z.string().optional(),
  }),
});

export const collections = {
  stories: storiesCollection,
};
