import { defineCollection, z } from "astro:content";

// 博客集：处理长文章
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

// 刹那集：处理摄影和瞬间记录
const instants = defineCollection({
  type: "content", // 显式声明为内容集
  schema: ({ image }) => z.object({
    date: z.coerce.date(),
    location: z.string(),
    images: z.array(image()),
  }),
});

export const collections = { posts, instants };