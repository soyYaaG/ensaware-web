import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    service: passthroughImageService()
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});