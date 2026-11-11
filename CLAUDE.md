# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

Monorepo for UI libraries published to npm (`github.com/sourcebv/ui`, Apache-2.0, author "Source BV"). Uses **npm workspaces** (`packages/*`); only npm is available (Node 24). Each package has its own `package.json` and is versioned and published on its own. The root package is private.

- `packages/react` → `@sourcebv/react` (React 19 component library, peer dependencies `react`/`react-dom` `^19.0.0`).
- `packages/storybook` → `@sourcebv/storybook` (**private**, never published). Storybook 10 (`@storybook/react-vite`) with addon-docs (autodocs on by default) and addon-a11y. Depends on `@sourcebv/react` through the workspace link.
- `packages/styles` → `@sourcebv/styles` (published). Tailwind CSS v4 styles + `tailwind-variants` style functions, HeroUI-style. Consumers need Tailwind v4: `@import "tailwindcss"; @import "@sourcebv/styles";`.
- `@sourcebv/react` depends on `@sourcebv/styles` (style functions) and `react-aria-components` (primitives). Workspaces are listed explicitly in root `package.json` so `styles` builds before `react`.

## Commands (run from repo root)

- `npm run build` — build every workspace (tsup → `packages/react/dist`: ESM `index.js`, CJS `index.cjs`, `index.d.ts`/`index.d.cts`, sourcemaps).
- `npm run typecheck` — `tsc --noEmit` per workspace.
- `npm test` — Vitest (jsdom, Testing Library, jest-dom matchers, globals enabled) per workspace.
- `npm run lint` / `npm run lint:fix` — ESLint flat config at root (`eslint.config.js`).
- `npm run format` / `npm run format:check` — Prettier (default config).
- `npm run check` — format check + lint + typecheck + tests.
- Single test file: `npm test -w @sourcebv/react -- src/components/<name>/<name>.test.tsx`; by name: append `-t "<test name>"`.
- `npm run storybook` — Storybook dev server on http://localhost:6006.
- `npm run build-storybook` — static Storybook in `packages/storybook/storybook-static` (not hosted anywhere). Root `npm run build` does **not** build Storybook.
- Watch mode: `npm run dev -w @sourcebv/react` (tsup) and `npm run test:watch -w @sourcebv/react`.

## Component conventions (`packages/react`)

- Component: `src/components/<component-name>/<component-name>.tsx` (kebab-case folder/file names).
- Folder barrel: `src/components/<component-name>/index.ts` → `export * from "./<component-name>";`
- Tests next to the component: `<component-name>.test.tsx` (picked up by `src/**/*.test.{ts,tsx}`).
- `src/index.ts` is the **single, manually maintained** public entry point: add `export * from "./components/<component-name>";` for each new component. There are no subpath exports.
- Every component gets a story next to it: `<component-name>.stories.tsx` (CSF3, `Meta`/`StoryObj` from `@storybook/react-vite`, `satisfies Meta<typeof X>`). Storybook loads stories from `packages/react/src/**/*.stories.@(ts|tsx)` and `*.mdx`. Stories aren't in the npm package (tsup only bundles `src/index.ts`) and aren't run by Vitest.
- tsup bundles only `src/index.ts`; `react`, `react-dom` and `react/jsx-runtime` are external. `sideEffects: false`.

## Styles conventions (`packages/styles`)

- Tokens are plain CSS variables (`--primary`, `--background`, …) in `themes/default.css`, inside `@layer base` so unlayered app CSS always wins. `base.css` maps them onto Tailwind with `@theme inline` (`bg-primary`, `text-danger`, `rounded-base`, …).
- A theme is any selector redefining tokens (`:root`/`.light`/`[data-theme="light"]`, `.dark`/`[data-theme="dark"]`, or any `[data-theme="<name>"]`). Tokens derived from other tokens (`--secondary`, `--danger-soft`, `--focus`, …) are declared in the `:root, .light, .dark, [data-theme]` block so they're recalculated per theme scope — put new derived tokens there.
- Component CSS: `components/<name>.css`, BEM classes (`.button`, `.button--primary`) written with `@apply` in `@layer components`; states use react-aria data attributes (`data-hovered:`, `data-pressed:`, `data-focus-visible:`, `data-disabled:`). Import it from `index.css`.
- Style function: `src/components/<name>/<name>.styles.ts` (`tv()` mapping variants → BEM classes), barrel `index.ts`, re-exported from `src/index.ts`.
- `@sourcebv/react` resolves `@sourcebv/styles` to source via tsconfig `paths` + Vitest alias (no build needed for typecheck/tests); Storybook aliases it too and imports the CSS relatively in `.storybook/preview.css`.

## Toolchain notes

- TypeScript is pinned to `~6.0.x` (root and package) because `typescript-eslint` does not yet support TS 7. Don't upgrade TS without checking that.
- Shared compiler options live in `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` → use `import type` for type-only imports). Packages extend it.
- Storybook resolves `@sourcebv/react` to `packages/react/src/index.ts` with a Vite alias in `packages/storybook/.storybook/main.ts`. Stories therefore always use source (no build needed, HMR works), whether they import relatively or by package name.
- `eslint-plugin-storybook` (flat/recommended) lints story files. The a11y addon only reports violations (`a11y.test: "todo"` in `preview.ts`); it doesn't fail anything.
- Publishing: `npm publish -w @sourcebv/react` runs `prepublishOnly` first (clean, typecheck, test, build). `publishConfig.access` is `public`.

## Working rules

- Never create git commits, even when asked to.
