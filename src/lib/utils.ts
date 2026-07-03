import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";

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

export async function getPublishedPosts() {
  return (await getCollection("posts"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const excerptParser = new MarkdownIt();

const TAG_RE = /<[^>]+>/g;
const WS_RE = /\s+/g;

export function getPostExcerpt(body: string, maxLength = 150): string {
  const html = excerptParser.render(body);
  const plain = html
    .replace(TAG_RE, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(WS_RE, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}