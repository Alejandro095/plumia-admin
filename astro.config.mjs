import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': {
      status: 302,
      destination: '/dashboard/spots'
    },
    '/dashboard': {
      status: 302,
      destination: '/dashboard/spots'
    }
  },
  output: "server",
  adapter: vercel(),
  integrations: [tailwind()],
});