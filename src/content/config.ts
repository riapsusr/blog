import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    // 发布日期是一个日历日，而不是某个时区中的瞬间；保留 YYYY-MM-DD
    // 可避免 UTC Date 在西半球格式化时倒退一天。
    // 注意：Astro 的 frontmatter 解析器（js-yaml，YAML 1.1）会把未加引号的
    // YYYY-MM-DD 自动转成 UTC 午夜的 Date，因此这里先规整回日历字符串。
    date: z.preprocess(
      (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
      z.string().date(),
    ),
    draft: z.boolean().optional(),
    category: z.string(),
  }),
});

export const collections = { posts };
