---
name: orpc-docs
description: "Use when working with oRPC (OpenAPI Remote Procedure Call): defining type-safe RPC procedures, routers, middleware, context, error handling, event iterators (streaming), file upload/download, contract-first design, OpenAPI spec generation, server adapters (Next.js, Hono, Express, Fastify, Nuxt, Astro, Elysia, H3, SvelteKit, Remix, TanStack Start, Solid Start, WebSocket, Electron, Web Workers), client-side usage (RPC link, OpenAPI link, dynamic link), plugins (CORS, batch requests, compression, retry, CSRF, rate limit), integrations (TanStack Query, AI SDK, Better Auth, Sentry, OpenTelemetry, Pinia Colada, SWR), or migrating from tRPC."
---

# oRPC Documentation

Official oRPC docs (sourced from [github.com/unnoq/orpc/apps/content/docs](https://github.com/unnoq/orpc/tree/main/apps/content/docs)).

oRPC combines RPC with OpenAPI — type-safe procedures, OpenAPI spec generation, and framework adapters in one library.

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Core Concepts
- `getting-started.md` — Installation, basic setup
- `procedure.md` — Defining procedures (input/output schemas)
- `router.md` — Grouping procedures into routers
- `middleware.md` — Middleware chain
- `context.md` — Request context
- `error-handling.md` — Error handling patterns
- `event-iterator.md` — Streaming with event iterators
- `file-upload-download.md` — File upload/download
- `metadata.md` — Procedure metadata
- `rpc-handler.md` — RPC handler setup
- `server-action.md` — React Server Actions integration

### Contract-First
- `contract-first/define-contract.md` — Define contract schema
- `contract-first/implement-contract.md` — Implement from contract
- `contract-first/router-to-contract.md` — Extract contract from router

### Client
- `client/client-side.md` — Browser client setup
- `client/server-side.md` — Server-to-server calls
- `client/rpc-link.md` — RPC link (binary protocol)
- `client/dynamic-link.md` — Dynamic link routing
- `client/error-handling.md` — Client error handling
- `client/event-iterator.md` — Client-side streaming

### Server Adapters
- `adapters/next.md` — Next.js
- `adapters/hono.md` — Hono
- `adapters/express.md` — Express
- `adapters/fastify.md` — Fastify
- `adapters/nuxt.md` — Nuxt
- `adapters/astro.md` — Astro
- `adapters/elysia.md` — Elysia
- `adapters/h3.md` — H3
- `adapters/svelte-kit.md` — SvelteKit
- `adapters/remix.md` — Remix
- `adapters/tanstack-start.md` — TanStack Start
- `adapters/solid-start.md` — Solid Start
- `adapters/websocket.md` — WebSocket
- `adapters/electron.md` — Electron
- `adapters/browser.md` — In-browser
- `adapters/http.md` — Raw HTTP
- `adapters/web-workers.md` — Web Workers
- `adapters/worker-threads.md` — Node Worker Threads
- `adapters/message-port.md` — MessagePort
- `adapters/react-native.md` — React Native

### OpenAPI
- `openapi/getting-started.md` — OpenAPI setup
- `openapi/openapi-specification.md` — Spec generation
- `openapi/openapi-handler.md` — OpenAPI handler
- `openapi/routing.md` — Route customization
- `openapi/input-output-structure.md` — Input/output mapping
- `openapi/scalar.md` — Scalar API reference UI
- `openapi/client/openapi-link.md` — OpenAPI client link
- `openapi/error-handling.md` — OpenAPI error format

### Plugins
- `plugins/cors.md` — CORS
- `plugins/batch-requests.md` — Request batching
- `plugins/compression.md` — Response compression
- `plugins/client-retry.md` — Client retry
- `plugins/dedupe-requests.md` — Request deduplication
- `plugins/simple-csrf-protection.md` — CSRF protection
- `plugins/body-limit.md` — Body size limit
- `plugins/strict-get-method.md` — Strict GET enforcement
- `plugins/request-headers.md` / `response-headers.md` — Header management
- `plugins/request-validation.md` / `response-validation.md` — Validation

### Integrations
- `integrations/tanstack-query.md` — TanStack Query (React/Vue/Solid/Svelte)
- `integrations/ai-sdk.md` — Vercel AI SDK
- `integrations/better-auth.md` — Better Auth
- `integrations/sentry.md` — Sentry
- `integrations/opentelemetry.md` — OpenTelemetry
- `integrations/pinia-colada.md` — Pinia Colada (Vue)
- `integrations/react-swr.md` — React SWR
- `integrations/pino.md` — Pino logger

### Other
- `comparison.md` — oRPC vs tRPC vs ts-rest vs Hono
- `ecosystem.md` — Ecosystem overview
- `playgrounds.md` — Live playgrounds
- `migrations/from-trpc.md` — Migrating from tRPC
- `best-practices/` — Monorepo setup, SSR optimization, dedupe middleware
- `advanced/` — Custom plugins, testing, SuperJSON, RPC protocol
- `helpers/` — Utilities (cookie, encryption, ratelimit, signing, etc.)
