import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-light", keepBackground: true }],
        ],
      }),
    },
    react(),
  ],
  base: '/nyu_coding/'
});
