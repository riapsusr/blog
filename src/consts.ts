import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Syu's Blog",
  EMAIL: "riapsusr@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Captured moments, fleeting memories.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "记录思考，分享见闻。",
};

export const INSTANT: Metadata = {
  TITLE: "Instant",
  DESCRIPTION: "Captured moments, fleeting memories.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "Twitter",
    HREF: "https://x.com/riapsusr", // 建议更新为 x.com
  },
  { 
    NAME: "Telegram",
    HREF: "https://t.me/riapsusr"
  },
  {
    NAME: "Email",
    HREF: "mailto:riapsusr@gmail.com"
  },
  {
    NAME: "RSS",
    HREF: "/rss.xml"
  }
];