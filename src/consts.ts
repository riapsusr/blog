import type { Site, Metadata, NavItem } from "@types";

export const SITE: Site = {
  NAME: "Syu's Blog",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "首页",
  DESCRIPTION: "Syu's Blog 首页",
};

export const POSTS: Metadata = {
  TITLE: "文章",
  DESCRIPTION: "所有文章",
};

export const ABOUT: Metadata = {
  TITLE: "关于",
  DESCRIPTION: "关于我",
};

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "首页" },
  { path: "/posts", label: "文章" },
  { path: "/about", label: "关于" },
];
