import rss from "@astrojs/rss";
import { getPublishedPosts, getPostSlug } from "@lib/utils";
import { SITE, HOME } from "@consts";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

type Context = {
  site: string
}

export async function GET(context: Context) {
  const posts = await getPublishedPosts();

  const rssResponse = await rss({
    title: `${SITE.NAME} - ${HOME.TITLE}`,
    description: SITE.NAME,
    site: context.site,
    customData: `<language>zh-cn</language>`,
    items: posts.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      link: `/${item.collection}/${getPostSlug(item.id)}/`,
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
  });

  const rssText = await rssResponse.text();

  return new Response(rssText, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}