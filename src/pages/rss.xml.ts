import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import rss from "@astrojs/rss";
import { getPublishedPosts, getPostURL } from "@lib/utils";
import { SITE, HOME } from "@consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

// 收集正文目录下的图片资源，构建时产出可访问的哈希 URL（如 /_astro/xxx.png）。
const contentImages = import.meta.glob("/src/content/posts/**/*.{avif,gif,jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

function getRssImageURL(src: string | undefined, item: CollectionEntry<"posts">, site: URL | string): string | undefined {
  if (!src) return undefined;
  // 外链与 data URL 保持原样；绝对路径直接基于站点解析。
  if (/^(?:https?:|data:)/i.test(src)) return src;
  if (src.startsWith("/")) return new URL(src, site).href;

  // Markdown 中的相对路径（如 ./images/foo.png）以文章文件为基准解析，
  // 再到构建资源表里找到最终 URL。
  const sourcePath = new URL(
    src,
    `file:///src/content/${item.collection}/${item.id}`,
  ).pathname;
  const outputPath = contentImages[sourcePath];

  return outputPath ? new URL(outputPath, site).href : undefined;
}

function getRssLinkURL(href: string | undefined, item: CollectionEntry<"posts">, site: URL | string): string | undefined {
  // 外链、锚点等保持原样；站内相对链接以文章 URL 为基准绝对化。
  if (!href || /^(?:[a-z][a-z0-9+.-]*:|#)/i.test(href)) return href;
  return new URL(href, new URL(getPostURL(item), site)).href;
}

export const GET: APIRoute = async (context) => {
  // RSS 需要绝对 URL；site 已在 astro.config.mjs 配置，未配置时直接失败并给出明确原因。
  const site = context.site;
  if (!site) throw new Error("RSS 生成需要 site 配置（astro.config.mjs）");
  const posts = await getPublishedPosts();

  return rss({
    title: `${SITE.NAME} - ${HOME.TITLE}`,
    description: SITE.NAME,
    site,
    customData: `<language>zh-cn</language>`,
    items: posts.map((item) => ({
      title: item.data.title,
      // 日历字符串 -> 明确的 UTC 瞬间，避免 RSS 阅读器时区换算倒退一天
      pubDate: new Date(`${item.data.date}T00:00:00.000Z`),
      // 统一通过 getPostURL 构造链接，避免与页内引用不一致
      link: getPostURL(item),
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        // 默认仅允许 http/https/mailto；data: 只对 img 放行，
        // 避免 <a href="data:..."> 之类的注入面。
        allowedSchemes: ["http", "https", "mailto"],
        allowedSchemesByTag: { img: ["http", "https", "data"] },
        allowedAttributes: {
          img: ["src", "alt", "title", "width", "height", "loading", "decoding", "srcset", "sizes"],
          a: ["href", "title", "rel", "target"],
        },
        allowProtocolRelative: false,
        transformTags: {
          a: (tagName, attribs) => {
            const href = getRssLinkURL(attribs.href, item, site);
            const next: Record<string, string> = {
              ...attribs,
              rel: "noopener noreferrer",
              target: "_blank",
            };
            if (href) {
              next.href = href;
            } else {
              delete next.href;
            }
            return { tagName, attribs: next };
          },
          img: (tagName, attribs) => {
            const src = getRssImageURL(attribs.src, item, site);
            const next: Record<string, string> = {
              ...attribs,
              loading: "lazy",
              decoding: "async",
            };
            if (src) {
              next.src = src;
            } else {
              // 无法解析的图片直接移除 src，避免输出裸属性或相对路径。
              delete next.src;
            }
            return { tagName, attribs: next };
          },
        },
      }),
    })),
  });
};
