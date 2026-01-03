import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@consts";

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
    })),
  });
}
