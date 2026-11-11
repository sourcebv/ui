import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const reactSrc = fileURLToPath(new URL("../../react/src", import.meta.url));

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
    
    return mergeConfig(viteConfig, {
      resolve: {
        alias: [
          { find: /^@sourcebv\/react$/, replacement: `${reactSrc}/index.ts` },
        ],
      },
    });
  },
};

export default config;
