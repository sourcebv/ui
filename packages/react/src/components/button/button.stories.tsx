import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./button";

const variants = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
] as const;

const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    isDisabled: false,
    isPending: false,
    onPress: fn(),
  },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "inline-radio", options: sizes },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Tertiary: Story = { args: { variant: "tertiary" } };

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Danger: Story = { args: { variant: "danger" } };

export const DangerSoft: Story = { args: { variant: "danger-soft" } };

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size}>
          Size {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: AllVariants.render,
};

/**
 * Tokens are plain CSS variables. Overriding `--primary` on `:root` in the
 * app's CSS restyles every primary-derived style (secondary, hover, focus ring).
 *
 * To scope an override to a subtree, put it on an element with a `data-theme`
 * attribute: themes can be partial and only redefine what they need, the rest
 * is inherited from the surrounding theme.
 */
export const CustomPrimary: Story = {
  render: (args) => (
    <div
      data-theme="brand"
      className="flex flex-wrap items-center gap-3"
      style={{ "--primary": "oklch(0.6 0.18 150)" } as CSSProperties}
    >
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};
