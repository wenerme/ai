---
name: vite-docs
description: "Vite documentation — next-generation frontend build tool. Covers configuration (shared, server, build, preview, SSR, dep optimization, worker options), features (HMR, TypeScript, CSS/PostCSS, static assets, JSON, glob import, WebAssembly, Web Workers), plugin API (hooks, HMR API, environment API), SSR, backend integration, static deployment, dependency pre-bundling, env variables and modes, CLI, build optimization, migration guide (v5→v6→v7→v8), and Environment API (frameworks, instances, plugins, runtimes). USE THIS SKILL WHEN the user asks about Vite config, plugins, HMR, SSR, build optimization, or migration."
version: 0.1.0
---

# Vite Documentation

Official docs for [Vite](https://vite.dev) — next-generation frontend tooling with instant HMR and optimized builds.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (55 docs)

### Guide
- `references/guide/index.md` — Getting started
- `references/guide/features.md` — Features (HMR, TS, CSS, assets, glob import, WASM, workers)
- `references/guide/cli.md` — CLI commands (dev, build, preview, optimize)
- `references/guide/using-plugins.md` — Using plugins
- `references/guide/dep-pre-bundling.md` — Dependency pre-bundling (esbuild)
- `references/guide/assets.md` — Static asset handling
- `references/guide/build.md` — Building for production (Rolldown)
- `references/guide/env-and-mode.md` — Env variables and modes
- `references/guide/ssr.md` — Server-Side Rendering
- `references/guide/backend-integration.md` — Backend integration (Rails, Django, etc.)
- `references/guide/static-deploy.md` — Static deployment (Vercel, Netlify, GitHub Pages, etc.)
- `references/guide/performance.md` — Performance optimization
- `references/guide/troubleshooting.md` — Troubleshooting
- `references/guide/migration.md` — Migration guide
- `references/guide/why.md` — Why Vite
- `references/guide/philosophy.md` — Project philosophy

### Plugin & Environment API
- `references/guide/api-plugin.md` — Plugin API (hooks, ordering, HMR)
- `references/guide/api-hmr.md` — HMR API
- `references/guide/api-javascript.md` — JavaScript API (createServer, build, preview)
- `references/guide/api-environment.md` — Environment API overview
- `references/guide/api-environment-plugins.md` — Environment plugins
- `references/guide/api-environment-frameworks.md` — Environment for frameworks
- `references/guide/api-environment-instances.md` — Environment instances
- `references/guide/api-environment-runtimes.md` — Environment runtimes

### Configuration
- `references/config/index.md` — Config overview (vite.config.ts)
- `references/config/shared-options.md` — Shared options (root, base, mode, plugins, resolve, css, json, etc.)
- `references/config/server-options.md` — Dev server (host, port, proxy, cors, hmr, watch, etc.)
- `references/config/build-options.md` — Build (target, outDir, assetsInlineLimit, rollupOptions, etc.)
- `references/config/preview-options.md` — Preview server
- `references/config/dep-optimization-options.md` — Dep optimization (include, exclude, esbuildOptions)
- `references/config/ssr-options.md` — SSR options
- `references/config/worker-options.md` — Worker options

### Breaking Changes (v6→v7→v8)
- `references/changes/index.md` — Breaking changes overview
- `references/changes/per-environment-apis.md` — Per-environment APIs
- `references/changes/ssr-using-modulerunner.md` — SSR using ModuleRunner
- `references/changes/shared-plugins-during-build.md` — Shared plugins during build

### Blog (release announcements)
- `references/blog/announcing-vite8.md` — Vite 8
- `references/blog/announcing-vite7.md` — Vite 7
- `references/blog/announcing-vite6.md` — Vite 6
