import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://199623.xyz",
  integrations: [sitemap()],
});
