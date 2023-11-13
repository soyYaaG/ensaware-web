import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://ensaware.yaag.pro",
	integrations: [
		tailwind(),
		react(),
		robotsTxt({
			sitemap: true,
		}),
		sitemap(),
	],
	image: {
		service: passthroughImageService(),
	},
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
});
