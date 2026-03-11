import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, HOME } from "@consts";
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
    title: `${SITE.NAME} - ${HOME.TITLE}`,
    description: SITE.NAME,
    site: context.site,
    customData: `<language>zh-cn</language>`,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.id.replace(/\.[^/.]+$/, "")}/`,
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
  });
}