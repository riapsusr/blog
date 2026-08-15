export type Site = {
  NAME: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  FOUNDED_YEAR: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION?: string;
};

export type NavItem = {
  path: string;
  label: string;
};
