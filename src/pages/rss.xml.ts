import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getPublishedPosts, getPostURL } from "@lib/utils";
import { SITE, HOME } from "@consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const GET: APIRoute = async (context) => {
  const site = context.site ?? "https://199623.xyz";
  const posts = await getPublishedPosts();

  const rssResponse = await rss({
    title: `${SITE.NAME} - ${HOME.TITLE}`,
    description: SITE.NAME,
    site,
    customData: `<language>zh-cn</language>`,
    items: posts.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      // 统一通过 getPostURL 构造链接，避免与页内引用不一致
      link: getPostURL(item),
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        // 收紧图片：仅允许 http/https/同源 data，防止 javascript: 与任意外链注入
        allowedSchemes: ["http", "https", "data"],
        allowedAttributes: {
          img: ["src", "alt", "title", "width", "height", "loading", "decoding", "srcset", "sizes"],
          a: ["href", "title", "rel", "target"],
        },
        // 阻止相对 URL 被从 RSS 阅读器原样执行（强制绝对/已知 scheme）
        allowProtocolRelative: false,
        transformTags: {
          a: (tagName, attribs) => ({
            tagName,
            attribs: { ...attribs, rel: "noopener noreferrer", target: "_blank" },
          }),
          img: (tagName, attribs) => ({
            tagName,
            attribs: { ...attribs, loading: "lazy", decoding: "async" },
          }),
        },
      }),
    })),
  });

  const rssText = await rssResponse.text();

  return new Response(rssText, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
