---
name: biome-docs
description: "Biome documentation — fast web toolchain for JavaScript, TypeScript, JSX, JSON, CSS, and GraphQL. Covers linter (473 lint rules across accessibility, complexity, correctness, nursery, performance, security, style, suspicious categories), formatter (JS/TS/JSON/CSS/GraphQL formatting options), analyzer (import sorting), assist (actions and source actions), configuration reference (biome.json), CLI usage, editor integration, recipes (CI setup, Git hooks), and internals (architecture, changelog, credits). USE THIS SKILL WHEN the user asks about Biome linting rules, formatting config, biome.json setup, migration from ESLint/Prettier, or Biome CLI usage."
version: 0.1.0
---

# Biome Documentation

Official docs for [Biome](https://biomejs.dev) — one toolchain for your web project (formatter, linter, and more).

CRITICAL: grep `references/` for keywords before answering. Lint rules are at `references/linter/rules/`.

## Reference Index (546 docs)

### Linter Rules (473 docs)
- `references/linter/` — Linter overview and configuration
- `references/linter/rules/` — Individual rule docs organized by category:
  - **a11y** — Accessibility rules (useAltText, useAriaProps, etc.)
  - **complexity** — Complexity rules (noBannedTypes, noExcessiveCognitiveComplexity, etc.)
  - **correctness** — Correctness rules (noUnusedVariables, noConstAssign, useExhaustiveDependencies, etc.)
  - **nursery** — Experimental/new rules
  - **performance** — Performance rules (noAccumulatingSpread, noBarrelFile, noDelete, etc.)
  - **security** — Security rules (noDangerouslySetInnerHtml, noGlobalEval, etc.)
  - **style** — Style rules (useConst, noVar, useTemplate, useImportType, etc.)
  - **suspicious** — Suspicious code rules (noDoubleEquals, noExplicitAny, noDebugger, etc.)

### Formatter (3 docs)
- `references/formatter/` — Formatter overview, options (indentStyle, lineWidth, quoteStyle, etc.)

### Analyzer (1 doc)
- `references/analyzer/` — Import sorting and analysis

### Assist (18 docs)
- `references/assist/` — Source actions and assists

### Guides (11 docs)
- `references/guides/` — Getting started, configure Biome, integrate in editor, integrate in CI, migrate from ESLint/Prettier, use Biome in big projects

### Reference (9 docs)
- `references/reference/` — biome.json schema, CLI reference, diagnostics, reporters, GritQL patterns

### Recipes (4 docs)
- `references/recipes/` — CI setup, Git hooks, continuous integration

### Internals (6 docs)
- `references/internals/` — Architecture, changelog, credits, language support, versioning

### Blog (19 docs)
- `references/blog/` — Release announcements and updates
