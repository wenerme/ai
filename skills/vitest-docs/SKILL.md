---
name: vitest-docs
description: "Vitest documentation — next-generation testing framework powered by Vite. Covers test API (describe, test, expect, vi, hooks), mocking (modules, functions, classes, timers, dates, file system, globals, network requests), snapshot testing, coverage (v8/istanbul), browser testing (Playwright/WebDriverIO, component testing for React/Vue/Svelte, visual regression, trace view), configuration reference (120+ options), CLI commands, environments (node/jsdom/happy-dom/edge-runtime), filtering/tags, projects/workspaces, parallelism, reporters, debugging, IDE integration, type testing, in-source testing, migration from Jest, and performance profiling. USE THIS SKILL WHEN the user asks about Vitest configuration, test writing, mocking, coverage, browser testing, or migration from Jest."
version: 0.1.0
---

# Vitest Documentation

Official docs for [Vitest](https://vitest.dev) — a blazing-fast unit test framework powered by Vite.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (191 docs)

### API Reference
- `references/api/test.md` — test(), it(), test.each(), test.skip(), test.only(), test.todo()
- `references/api/describe.md` — describe(), describe.each(), describe.skip()
- `references/api/expect.md` — Expect API (matchers: toBe, toEqual, toMatch, toThrow, etc.)
- `references/api/assert.md` — Chai assert API
- `references/api/vi.md` — vi utility (vi.fn, vi.mock, vi.spyOn, vi.useFakeTimers, etc.)
- `references/api/mock.md` — Mock functions API
- `references/api/hooks.md` — beforeAll, afterAll, beforeEach, afterEach
- `references/api/assert-type.md` — Type assertion API
- `references/api/expect-typeof.md` — expectTypeOf API

### API — Browser Testing
- `references/api/browser/locators.md` — Browser locators (getByRole, getByText, etc.)
- `references/api/browser/interactivity.md` — User interactions (click, fill, etc.)
- `references/api/browser/assertions.md` — Browser-specific assertions
- `references/api/browser/commands.md` — Custom browser commands
- `references/api/browser/context.md` — Browser context
- `references/api/browser/react.md` `vue.md` `svelte.md` — Component testing

### API — Advanced
- `references/api/advanced/runner.md` — Custom test runner
- `references/api/advanced/reporters.md` — Reporter API
- `references/api/advanced/plugin.md` — Vitest plugin API
- `references/api/advanced/vitest.md` — Vitest node API

### Guide (50+ docs)
- `references/guide/index.md` — Getting started
- `references/guide/features.md` — Feature overview
- `references/guide/mocking.md` — Mocking overview
- `references/guide/mocking/modules.md` — Module mocking
- `references/guide/mocking/functions.md` — Function mocking
- `references/guide/mocking/timers.md` — Fake timers
- `references/guide/mocking/classes.md` — Class mocking
- `references/guide/mocking/requests.md` — Network request mocking
- `references/guide/mocking/file-system.md` — File system mocking
- `references/guide/snapshot.md` — Snapshot testing
- `references/guide/coverage.md` — Code coverage
- `references/guide/environment.md` — Test environments
- `references/guide/debugging.md` — Debugging tests
- `references/guide/filtering.md` — Test filtering
- `references/guide/test-tags.md` — Test tags
- `references/guide/parallelism.md` — Parallel execution
- `references/guide/projects.md` — Projects & workspaces
- `references/guide/migration.md` — Migration from Jest
- `references/guide/ide.md` — IDE integration (VS Code)
- `references/guide/cli.md` — CLI reference
- `references/guide/improving-performance.md` — Performance optimization
- `references/guide/testing-types.md` — Type testing
- `references/guide/in-source.md` — In-source testing
- `references/guide/browser/` — Browser testing guide (6 docs)

### Configuration (120+ docs)
- `references/config/index.md` — Configuration overview
- `references/config/` — Individual config options (pool, coverage, environment, globals, setupfiles, reporters, browser/, etc.)

### Blog
- `references/blog/vitest-4.md` — Vitest 4.0 release
- `references/blog/vitest-3.md` — Vitest 3.0 release
