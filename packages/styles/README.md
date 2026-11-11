# @sourcebv/styles

Tailwind CSS v4 styles and style functions for `@sourcebv/react`.

## Setup

Requires Tailwind CSS v4. In your app's main CSS file:

```css
@import "tailwindcss";
@import "@sourcebv/styles";
```

## Theming

All colours are CSS variables (`--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--focus`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--tertiary`, `--tertiary-foreground`, `--danger`, `--danger-foreground`, `--danger-soft`, `--danger-soft-foreground`) plus `--radius`. They're also available as Tailwind utilities (`bg-primary`, `text-danger`, `rounded-base`, …).

Change the brand colour by redefining it. Hover states, `secondary` and the focus ring follow automatically:

```css
:root {
  --primary: oklch(0.62 0.19 150);
}
```

Themes: `light` (default) and `dark` ship out of the box. Use `data-theme="dark"` (or the `.dark` class) on `<html>` or any subtree. Add any number of custom themes by redefining tokens under a `data-theme` name. Themes can be partial and inherit the rest:

```css
[data-theme="ocean"] {
  color-scheme: dark;
  --background: oklch(0.22 0.04 240);
  --foreground: oklch(0.96 0.01 220);
  --primary: oklch(0.72 0.14 200);
}
```
