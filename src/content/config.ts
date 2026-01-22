import { defineCollection, z } from "astro:content";

// 博客集：处理长文章
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    // 新增：必填的分类字段
    category: z.string(), 
  }),
});

// 刹那集保持不变
const instants = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    date: z.coerce.date(),
    location: z.string(),
    images: z.array(image()),
  }),
});

export const collections = { posts, instants };