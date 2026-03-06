---
name: bun-docs
description: "Use when working with the Bun JavaScript runtime, package manager, bundler, or test runner: HTTP server, file I/O, SQLite, S3, Redis, shell scripting, FFI, workers, WebSocket, bunfig, bun install, bun test, bun build, bundler plugins, loaders, executables, macros, or any Bun API and configuration."
---

# Bun Documentation

Official Bun docs (sourced from [github.com/oven-sh/bun/docs](https://github.com/oven-sh/bun/tree/main/docs)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Runtime
- `runtime/` — Core runtime: watch mode, debugger, REPL, bunfig
- `runtime/http/` — HTTP server, routing, cookies, TLS, WebSocket, metrics
- `runtime/networking/` — fetch, TCP, UDP, DNS
- `runtime/file-io.mdx` — File I/O, streams, binary data
- `runtime/sql.mdx`, `runtime/sqlite.mdx` — SQL, SQLite
- `runtime/s3.mdx`, `runtime/redis.mdx` — S3, Redis
- `runtime/shell.mdx` — Shell scripting ($`...`)
- `runtime/workers.mdx` — Web Workers
- `runtime/ffi.mdx`, `runtime/c-compiler.mdx` — FFI, C compiler
- `runtime/plugins.mdx` — Runtime plugins
- `runtime/jsx.mdx`, `runtime/typescript.mdx` — JSX, TypeScript

### Package Manager
- `pm/cli/` — install, add, remove, update, publish, audit, link, patch, outdated
- `pm/workspaces.mdx` — Workspaces
- `pm/lockfile.mdx` — Lockfile format
- `pm/overrides.mdx` — Dependency overrides
- `pm/scopes-registries.mdx` — Scopes and registries

### Bundler
- `bundler/` — Bun.build(), plugins, loaders, macros, CSS, HTML
- `bundler/executables.mdx` — Single-file executables
- `bundler/fullstack.mdx` — Fullstack dev server
- `bundler/hot-reloading.mdx` — Hot module reloading

### Test Runner
- `test/` — bun test: writing tests, mocks, snapshots, lifecycle, DOM, coverage, reporters

### Guides
- `guides/ecosystem/` — Framework integration: Next.js, React, Vite, Express, Hono, Elysia, Prisma, Docker...
- `guides/deployment/` — Deploy to Vercel, Railway, AWS Lambda, etc.
- `guides/http/` — HTTP recipes: server, fetch, proxy, SSE, file uploads, streaming
- `guides/websocket/` — WebSocket: simple, pub/sub, compression
- `guides/test/` — Testing recipes: Jest migration, mocks, coverage, happy-dom
- `guides/install/` — Package management recipes
- `guides/binary/` — Binary data conversions (ArrayBuffer, Buffer, Blob, TypedArray)
- `guides/streams/` — Stream conversions
- `guides/read-file/`, `guides/write-file/` — File I/O recipes
- `guides/process/` — Process: spawn, IPC, signals, stdin
- `guides/runtime/` — Runtime recipes: env vars, TypeScript, debugging, CI/CD
- `guides/util/` — Utilities: hashing, UUID, base64, gzip, sleep
