# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

Monorepo for UI libraries published to npm (`github.com/sourcebv/ui`, Apache-2.0, author "Source BV"). Uses **npm workspaces** (`packages/*`); only npm is available (Node 24). Each package has its own `package.json` and is versioned and published on its own. The root package is private.

- `packages/react` → `@sourcebv/react` (React 19 component library, peer dependencies `react`/`react-dom` `^19.0.0`).
- `packages/styles` → empty and intentionally untouched for now.

## Commands (run from repo root)

- `npm run build` — build every workspace (tsup → `packages/react/dist`: ESM `index.js`, CJS `index.cjs`, `index.d.ts`/`index.d.cts`, sourcemaps).
- `npm run typecheck` — `tsc --noEmit` per workspace.
- `npm test` — Vitest (jsdom, Testing Library, jest-dom matchers, globals enabled) per workspace.
- `npm run lint` / `npm run lint:fix` — ESLint flat config at root (`eslint.config.js`).
- `npm run format` / `npm run format:check` — Prettier (default config).
- `npm run check` — format check + lint + typecheck + tests.
- Single test file: `npm test -w @sourcebv/react -- src/components/<name>/<name>.test.tsx`; by name: append `-t "<test name>"`.
- Watch mode: `npm run dev -w @sourcebv/react` (tsup) and `npm run test:watch -w @sourcebv/react`.

## Component conventions (`packages/react`)

- Component: `src/components/<component-name>/<component-name>.tsx` (kebab-case folder/file names).
- Folder barrel: `src/components/<component-name>/index.ts` → `export * from "./<component-name>";`
- Tests next to the component: `<component-name>.test.tsx` (picked up by `src/**/*.test.{ts,tsx}`).
- `src/index.ts` is the **single, manually maintained** public entry point: add `export * from "./components/<component-name>";` for each new component. There are no subpath exports.
- tsup bundles only `src/index.ts`; `react`, `react-dom` and `react/jsx-runtime` are external. `sideEffects: false`.

## Toolchain notes

- TypeScript is pinned to `~6.0.x` (root and package) because `typescript-eslint` does not yet support TS 7. Don't upgrade TS without checking that.
- Shared compiler options live in `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` → use `import type` for type-only imports). Packages extend it.
- Publishing: `npm publish -w @sourcebv/react` runs `prepublishOnly` first (clean, typecheck, test, build). `publishConfig.access` is `public`.

## Working rules

- Never create git commits, even when asked to.
