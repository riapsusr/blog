import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCollection, type CollectionEntry } from "astro:content";
import sanitizeHtml from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, "-");
}

export function formatShortDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

export function getPostSlug(id: string) {
  return id.replace(/\.[^/.]+$/, "");
}

/**
 * 统一构造文章的 URL。
 * 集中所有「collection + slug」拼接逻辑，避免页内、RSS、卡片各写一遍导致尾斜杠不一致。
 */
export function getPostURL(entry: CollectionEntry<"posts">): string {
  return `/${entry.collection}/${getPostSlug(entry.id)}`;
}

export async function getPublishedPosts() {
  return (await getCollection("posts"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const EXCERPT_TAG_RE = /<[^>]+>/g;
const EXCERPT_WS_RE = /\s+/g;

/**
 * 提取文章纯文本摘要。
 * 使用 sanitize-html 做稳健的 HTML 清洗（可处理嵌套/注释/CDATA），输出纯文本后按字符截断。
 * CJK 无词边界，按字符直接 slice 即可，无需做边界回溯。
 */
export function getPostExcerpt(body: string, maxLength = 150): string {
  // allowedTags 为空时 sanitize-html 会剥离所有标签并返回纯文本
  const plain = sanitizeHtml(body, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  })
    .replace(EXCERPT_TAG_RE, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(EXCERPT_WS_RE, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength) + "…";
}
