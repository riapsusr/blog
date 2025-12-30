import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional()
  }),
});

const instant = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    location: z.string(),
    images: z.array(z.string()),
  }),
});

export const collections = { blog, instant };
