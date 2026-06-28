---
name: ant-design-docs
description: "Use when working with Ant Design React (`antd`) official docs in Chinese: getting started, ConfigProvider, theme tokens, CSS-in-JS, SSR, compatibility, i18n, migration to v6, CLI/MCP/LLMs.txt for agents, integrations with Vite/Next/Umi/Farm/Rsbuild/Refine, design spec/patterns, resources, and Ant Design architecture/blog guidance."
---

# Ant Design Docs

Official Ant Design Chinese documentation synced from [`ant-design/ant-design/docs`](https://github.com/ant-design/ant-design/tree/master/docs).

Use this skill for Ant Design React (`antd`) documentation, Chinese guides, design token/theme guidance, CSS-in-JS behavior, SSR, compatibility, i18n, migration, CLI/MCP/LLMs.txt agent workflow, ecosystem integrations, design principles/patterns, and architecture blog posts. For component-level props, demos, tokens, semantic DOM, and changelog details, prefer `@ant-design/cli` or Ant Design's LLM docs when available; this skill intentionally syncs only the `docs/**/*.zh-CN.md` documentation tree, not the `components/` tree.

## Content Scope

The sync script copies exactly the Chinese docs files from upstream `docs/**/*.zh-CN.md` and normalizes output paths by removing `.zh-CN`:

- `references/react/` — Ant Design React guides: quick start, theme customization, CSS compatibility, SSR, i18n, FAQ, migration v6, CLI, MCP, LLMs, agent guidance, and framework integrations.
- `references/spec/` — design values, design principles, visual rules, layout, navigation, feedback, data entry/display, page patterns, research patterns, motion, typography, color, icon, and related design guidance.
- `references/blog/` — architecture and engineering posts: CSS-in-JS, SSR extraction, rendering performance, virtual table, form names, tree shaking, token/css variable planning, testing migration, visual regression, and maintenance notes.
- `references/resources.md` — Ant Design resource index.

The script excludes English pages, demo source files, `docs/react/demo/`, `components/`, images, and generated artifacts. Upstream demo tags are converted into text notes such as `Demo: ... (source not bundled: ...)`.

## Hard Rules

- MUST search `references/` before answering Ant Design docs questions about theme tokens, ConfigProvider, CSS-in-JS, SSR, compatibility, i18n, migration, CLI/MCP/LLMs, integrations, or design specs.
- MUST state when this skill does not include component API pages. For exact component props/demos/tokens, use `@ant-design/cli`, `antd info`, `antd doc`, `antd demo`, `antd token`, or Ant Design component docs/LLMs.
- MUST distinguish Ant Design v5/v6 docs from older v3/v4 behavior. Check migration docs before giving upgrade guidance.
- MUST distinguish Ant Design React (`antd`) from Ant Design Pro, ProComponents, Umi, Refine, Next.js, Vite, Farm, Rsbuild, and other integration framework behavior.
- NEVER invent component props, Design Token names, `ConfigProvider` options, CSS-in-JS APIs, CLI commands, MCP tools, or migration steps without checking references or component-specific docs.

## Fast Lookup

```bash
rg -n "ConfigProvider|theme|token|Design Token|Seed Token|Alias Token|algorithm|zeroRuntime" skills/ant-design-docs/references/react
rg -n "CSS-in-JS|StyleProvider|SSR|extractStyle|@layer|hashPriority|Shadow DOM|px2rem" skills/ant-design-docs/references/react skills/ant-design-docs/references/blog
rg -n "migration|v6|deprecated|废弃|兼容|React 19|React" skills/ant-design-docs/references/react
rg -n "CLI|MCP|LLMs|for-agents|antd info|antd doc|antd demo|antd token" skills/ant-design-docs/references/react
rg -n "Vite|Next|Umi|Farm|Rsbuild|Refine|国际化|locale|dayjs" skills/ant-design-docs/references/react
rg -n "设计模式|设计原则|视觉|布局|导航|反馈|数据录入|数据展示|动效|字体|色彩" skills/ant-design-docs/references/spec
```

## Reference Map

- Start and integrations: `references/react/getting-started.md`, `use-with-vite.md`, `use-with-next.md`, `use-with-umi.md`, `use-with-farm.md`, `use-with-rsbuild.md`, `use-with-refine.md`.
- Theme and styling: `references/react/customize-theme.md`, `compatible-style.md`, `server-side-rendering.md`, `common-props.md`.
- Agent tooling: `references/react/for-agents.md`, `cli.md`, `mcp.md`, `llms.md`.
- Migration and support: `references/react/migration-v6.md`, `faq.md`, `i18n.md`, `contributing.md`.
- Design guidance: start with `references/spec/overview.md` and `references/spec/introduce.md`, then search specific spec pages.
- Engineering background: search `references/blog/` for CSS-in-JS, token, rendering, SSR, virtual table, and maintenance topics.

## Workflow

1. Identify whether the question is app setup, theming, styling/SSR, migration, agent tooling, integration framework, design spec, or architecture background.
2. Search the relevant reference subtree and quote exact API names, commands, token terms, or migration constraints.
3. If the user asks for component API details, load component-specific sources via Ant Design CLI/LLMs/component docs rather than relying on this docs-only skill.
4. Call out version scope and integration-framework assumptions before giving code changes.
