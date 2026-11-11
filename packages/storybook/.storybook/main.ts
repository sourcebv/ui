import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const reactSrc = fileURLToPath(new URL("../../react/src", import.meta.url));
const stylesSrc = fileURLToPath(new URL("../../styles/src", import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../../react/src/**/*.mdx",
    "../../react/src/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");
    const { default: tailwindcss } = await import("@tailwindcss/vite");

    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          { find: /^@sourcebv\/react$/, replacement: `${reactSrc}/index.ts` },
          { find: /^@sourcebv\/styles$/, replacement: `${stylesSrc}/index.ts` },
        ],
      },
    });
  },
};

export default config;
