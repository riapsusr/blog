import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@consts";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

type Context = {
  site: string
}

export async function GET(context: Context) {
  const posts = (await getCollection("posts"))
    .filter(post => !post.data.draft);

  const items = [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.id.replace(/\.[^/.]+$/, "")}/`,
      // 核心修改：添加 content 字段
      // 1. parser.render(item.body) 将 markdown 转为 html
      // 2. sanitizeHtml 清洗 html 并配置允许 img 标签（RSS中图片很重要）
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
  });
}