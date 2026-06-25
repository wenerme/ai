---
name: hono-docs
description: "Use when working with Hono, the Web Standards JavaScript/TypeScript framework: Hono app/router APIs, Context and Request APIs, middleware, helpers, RPC client, validation, JSX, testing, deployment on Cloudflare Workers/Pages, Bun, Deno, Node.js, AWS Lambda, Vercel, Netlify, Fastly, service workers, or runtime-specific adapters."
---

# Hono Docs

Official Hono docs synced from [`honojs/website/docs`](https://github.com/honojs/website/tree/main/docs).

Use this skill for Hono framework APIs, routing, middleware, helpers, RPC/types, validation, JSX, testing, runtime adapters, and platform-specific getting-started guides. For platform behavior outside Hono's API surface, cross-check runtime-specific docs such as Cloudflare Workers, Bun, Deno, Node.js, AWS Lambda, or Vercel.

## Content Scope

The upstream `docs/` tree is a clean VitePress documentation tree with 84 Markdown files and no generated output, locale directories, or static assets. This skill syncs all Markdown pages:

- `references/api/` — `Hono`, `Context`, `Request`, routing, exceptions, presets.
- `references/concepts/` — motivation, routers, middleware, web standards, stacks, benchmarks, DX.
- `references/getting-started/` — runtime/platform guides for Cloudflare, Bun, Deno, Node.js, AWS Lambda, Vercel, Netlify, Fastly, Azure Functions, Google Cloud Run, and more.
- `references/guides/` — best practices, create-hono, examples, middleware, helpers, validation, RPC, JSX, testing, FAQ.
- `references/helpers/` — accepts, adapter, conninfo, cookie, factory, HTML, JWT, proxy, route, SSG, streaming, testing, websocket.
- `references/middleware/` — built-in middleware and third-party middleware overview.

The sync script strips decorative VitePress badge tags and normalizes trailing whitespace, but otherwise preserves docs as authored.

## Hard Rules

- MUST search `references/` before giving Hono-specific API, middleware, helper, RPC, validation, route matching, context/request, or adapter guidance.
- MUST distinguish Hono behavior from platform/runtime behavior. Hono wraps Web Standard APIs; runtime-specific limits still belong to the runtime docs.
- MUST call out runtime scope when relevant: Cloudflare Workers/Pages, Bun, Deno, Node.js, AWS Lambda/Lambda@Edge, Vercel, Netlify, Fastly, service worker, or WASI.
- NEVER invent middleware import paths, `Context` fields, `c.req` methods, `Hono` methods, helper APIs, RPC typing behavior, or platform adapter entrypoints without checking references.

## Fast Lookup

```bash
rg -n "new Hono|app\.get|app\.use|app\.route|app\.mount|notFound|onError|strict" skills/hono-docs/references
rg -n "Context|c\.req|c\.env|c\.var|c\.json|c\.text|c\.render|ExecutionContext" skills/hono-docs/references
rg -n "cors|jwt|basicAuth|bearerAuth|secureHeaders|bodyLimit|timeout|logger|prettyJSON" skills/hono-docs/references
rg -n "RPC|hc<|AppType|InferRequestType|InferResponseType|validator|zValidator" skills/hono-docs/references
rg -n "Cloudflare|Bun|Deno|Node\.js|AWS Lambda|Vercel|Netlify|Fastly" skills/hono-docs/references/getting-started
```

## Reference Map

- `references/index.md` — overview and quick start.
- `references/api/hono.md` — core `Hono` app methods and options.
- `references/api/context.md` and `references/api/request.md` — context and request APIs.
- `references/api/routing.md` — route matching and routing API.
- `references/guides/rpc.md` — Hono RPC client and shared type inference.
- `references/guides/validation.md` — validator usage and validation patterns.
- `references/middleware/builtin/` — built-in middleware docs.
- `references/getting-started/` — deployment/runtime-specific entrypoints.

## Workflow

1. Identify whether the question is core API, middleware/helper, RPC/types, validation, JSX, testing, or runtime deployment.
2. Search the most specific reference subtree first, then broader docs for cross-cutting examples.
3. Prefer exact documented import paths, method names, options, and runtime adapter snippets.
4. Cross-check runtime docs when the answer depends on Cloudflare/Bun/Deno/Node/AWS/Vercel/Netlify/Fastly behavior rather than Hono itself.
