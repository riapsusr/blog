import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCollection, type CollectionEntry } from "astro:content";
import MarkdownIt from "markdown-it";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return date;
}

export function formatShortDate(date: string) {
  return date.slice(5, 10);
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

export function getPostCategoryURL(category?: string): string {
  return category ? `/posts/category/${encodeURIComponent(category)}` : "/posts";
}

export async function getPublishedPosts() {
  return (await getCollection("posts"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

const EXCERPT_WS_RE = /\s+/g;
const excerptMarkdown = new MarkdownIt({ html: false });
const excerptCache = new Map<string, string>();

function getPostPlainText(body: string): string {
  const cached = excerptCache.get(body);
  if (cached !== undefined) return cached;

  const plain = excerptMarkdown
    .parse(body, {})
    .flatMap((token) => token.type === "inline" ? token.children ?? [] : [])
    .flatMap((token) => {
      if (token.type === "text" || token.type === "code_inline") return token.content;
      if (token.type === "image") return token.content;
      if (token.type === "softbreak" || token.type === "hardbreak") return " ";
      return [];
    })
    .join("")
    .replace(EXCERPT_WS_RE, " ")
    .trim();

  excerptCache.set(body, plain);
  return plain;
}

/**
 * 提取文章 Markdown 的纯文本摘要。
 * MarkdownIt 会解码实体、移除格式标记，并保留链接文字与图片替代文本。
 * CJK 无词边界，按字符直接 slice 即可，无需做边界回溯。
 */
export function getPostExcerpt(body: string, maxLength = 150): string {
  const plain = getPostPlainText(body);

  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength) + "…";
}
