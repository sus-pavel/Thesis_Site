import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite = repository?.endsWith(".github.io");

export default defineConfig({
  site: process.env.SITE_URL || "https://example.github.io",
  base: repository && !isUserSite ? `/${repository}/` : "/",
  output: "static",
  integrations: [mdx(), tailwind({ applyBaseStyles: false })]
});
