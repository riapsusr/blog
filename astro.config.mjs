import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://199623.xyz",
  integrations: [sitemap()],
  image: {
    // 正文 Markdown 图片按全宽响应式输出 srcset/sizes，
    // 避免窄屏仍默认下载 ~3164px 原始变体。
    layout: "full-width",
    responsiveStyles: true,
  },
});
