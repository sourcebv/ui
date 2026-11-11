import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Theme (sets data-theme on <html>)",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "ocean", title: "Ocean (custom)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = String(
        context.globals.theme ?? "light",
      );
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // "todo" reports violations in the UI; switch to "error" to fail on them.
      test: "todo",
    },
  },
};

export default preview;
