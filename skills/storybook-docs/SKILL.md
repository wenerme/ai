---
name: storybook-docs
description: Use when building, configuring, upgrading, testing, documenting, or publishing Storybook component workbenches, including CSF stories, main/preview configuration, framework integrations, addons, Doc Blocks, MDX, interaction/accessibility/visual tests, or Storybook MCP.
---

# Storybook Docs

Official Storybook documentation synced from [`storybookjs/storybook/docs`](https://github.com/storybookjs/storybook/tree/next/docs).

Use this skill for Storybook setup and configuration, Component Story Format (CSF), stories and args, framework integration, addons, docs/MDX, test workflows, builders, deployment, releases, or Storybook MCP. For framework behavior outside Storybook's integration surface, cross-check the relevant React, Angular, Vue, Svelte, Next.js, Vite, or Webpack documentation.

## Content Scope

The references mirror the text-only upstream documentation tree:

- `references/` contains all Storybook MDX pages for getting started, configuration, APIs, addons, docs, stories, tests, AI, sharing, and contributor documentation.
- `references/_snippets/` contains every reusable code snippet. A page's `> Code snippet: `_snippets/...`` line identifies the exact supporting file; inspect it for framework, package-manager, or variant-specific commands.
- Image and video assets under the upstream `docs/_assets/` are intentionally excluded. Markdown image text may be retained, but the reference mirror is not a renderable website.

The source uses renderer-conditional sections. The sync preserves these as `> **Renderer: ...**` or `> **Except renderer: ...**`; apply only the variants matching the target framework.

## Hard Rules

- MUST search `references/` before giving exact Storybook package names, CLI commands, config fields, CSF types, addon APIs, test APIs, or migration steps.
- MUST identify the target framework and builder before choosing setup or configuration guidance. React/Vite, React/Webpack, Next.js, Angular, Vue, Svelte, SvelteKit, Preact, React Native Web, and Web Components differ.
- MUST read the referenced `_snippets/` file when a page names a code snippet; do not infer its command, config, or framework variant from the filename.
- MUST distinguish Storybook configuration (`.storybook/main`, `.storybook/preview`, project annotations) from application code and test-runner configuration.
- NEVER invent `@storybook/*` import paths, CSF fields, CLI flags, framework package names, builder options, or version-migration steps without checking the references.

## Fast Lookup

```bash
rg -n "npx|npm create storybook|storybook dev|storybook build|automigrate" skills/storybook-docs/references/get-started skills/storybook-docs/references/_snippets
rg -n "defineConfig|StorybookConfig|framework:|addons:|stories:|preview" skills/storybook-docs/references/api skills/storybook-docs/references/configure skills/storybook-docs/references/_snippets
rg -n "Meta|StoryObj|satisfies Meta|args|argTypes|play|loaders|decorators|parameters" skills/storybook-docs/references/writing-stories skills/storybook-docs/references/api
rg -n "autodocs|Doc Blocks|Canvas|Controls|MDX|docs" skills/storybook-docs/references/writing-docs skills/storybook-docs/references/api
rg -n "Vitest|interaction|accessibility|visual|test|expect" skills/storybook-docs/references/writing-tests skills/storybook-docs/references/_snippets
rg -n "MCP|createStorybookMcpHandler|renderer=|Except renderer|Renderer:" skills/storybook-docs/references/ai skills/storybook-docs/references
```

## Reference Map

- `references/get-started/install.mdx` and `references/get-started/frameworks/` — installation, supported environments, and framework-specific setup.
- `references/writing-stories/` and `references/api/csf/` — CSF, stories, args, controls, decorators, loaders, play functions, and TypeScript.
- `references/configure/` and `references/api/main-config/` — `.storybook/main`, `.storybook/preview`, builders, UI, integrations, and configuration APIs.
- `references/writing-docs/` and `references/api/doc-blocks/` — autodocs, MDX, Doc Blocks, and documentation configuration.
- `references/writing-tests/` — interaction, accessibility, visual, snapshot, and Vitest-addon testing.
- `references/addons/`, `references/essentials/`, and `references/sharing/` — built-in features, addon authoring, publishing, embedding, and design integrations.
- `references/ai/` — AI-assisted workflows and Storybook MCP.
- `references/_snippets/` — framework- and package-manager-specific commands and configuration fragments.

## Workflow

1. Identify the Storybook version, framework, builder, and whether the task is setup, configuration, authoring, docs, tests, addon work, or migration.
2. Search the narrowest relevant reference area and inspect every named code snippet for the selected framework/variant.
3. Apply the exact documented package imports, config fields, and commands; keep application code separate from `.storybook` configuration.
4. For version upgrades, read both the relevant release/migration reference and the affected framework/configuration pages before changing code.
