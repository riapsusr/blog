import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Syu's Blog",
  EMAIL: "riapsusr@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_INSTANTS_ON_HOMEPAGE: 3
};

export const HOME: Metadata = {
  TITLE: "主页",
  DESCRIPTION: "",
};

export const POSTS: Metadata = {
  TITLE: "文章",
  DESCRIPTION: "",
};

export const INSTANTS: Metadata = {
  TITLE: "刹那",
  DESCRIPTION: "",
};

export const ABOUT: Metadata = {
  TITLE: "关于",
  DESCRIPTION: "关于我",
};

export const SOCIALS: Socials = [
  { 
    NAME: "Twitter",
    HREF: "https://x.com/riapsusr",
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