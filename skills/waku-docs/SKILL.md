---
name: waku-docs
description: "Use when working with Waku, the React 19 framework for React Server Components: file-system routing, createPages low-level routing, server/client components, API routes, server actions, navigation/prefetching, request context, custom routers, adapters, static or dynamic deployments, Cloudflare/AWS Lambda/Docker deployment, CSP, redirects, typed routes, no-SSR, or Waku build/runtime behavior."
---

# Waku Docs

Official Waku docs synced from [`wakujs/waku/docs`](https://github.com/wakujs/waku/tree/main/docs).

Use this skill for Waku application structure, React Server Components integration, routing, `createPages`, minimal APIs, navigation/prefetching, deployment guides, adapters, and Waku-specific runtime behavior. For generic React, Vite, Hono, Cloudflare Workers, or AWS Lambda behavior, use those docs as the source of truth.

## Content Scope

The upstream `docs/` tree is small and documentation-focused: 23 `.mdx` files under root, `guides/`, and `community/`. This skill syncs all of them:

- `references/create-pages.mdx` — low-level programmatic routing API.
- `references/guides/` — getting started, routing/navigation, minimal API, adapters, deploy targets, request context, typed routes, redirects, CSP, no-SSR, React Compiler, Docker, monorepo, and related guides.
- `references/community/` — community examples and localized/community resources.

No generated build output, static assets, examples outside `docs/`, or package source files are included.

## Hard Rules

- MUST search `references/` before giving Waku-specific API, route convention, rendering, deployment, adapter, prefetch, or server/client boundary guidance.
- MUST distinguish Waku's file-system router, `createPages`, and minimal APIs; they are not interchangeable.
- MUST call out unstable APIs and props when documented with `unstable_` or `_UNSTABLE` names.
- NEVER invent Waku route filenames, `Link` props, router APIs, adapter hooks, request context behavior, or deployment configuration without checking references.

## Fast Lookup

```bash
rg -n "createPages|createPage|createLayout|createRoot|createSlice|createApi" skills/waku-docs/references
rg -n "Link|prefetch|useRouter|useNavigationStatus|typed routes|redirect|not found" skills/waku-docs/references
rg -n "Cloudflare|AWS Lambda|Docker|static deployment|adapter|request context|CSP|no-SSR" skills/waku-docs/references
rg -n "minimal|unstable_defineHandlers|renderRsc|renderHtml|server action|Server Components" skills/waku-docs/references
```

## Reference Map

- `references/guides/getting-started.mdx` — scaffold and file-system router basics.
- `references/create-pages.mdx` — low-level `createPages` API for programmatic routes, layouts, roots, slices, and API endpoints.
- `references/guides/minimal-api.mdx` — minimal server/client primitives for custom integrations.
- `references/guides/navigation-prefetching.mdx` — `<Link>`, `router.prefetch`, experimental prefetch props, pending UI, custom transitions.
- `references/guides/adapter-authoring.mdx` — custom adapter authoring.
- `references/guides/cloudflare.mdx`, `aws-lambda.mdx`, `docker.mdx`, `static-deployments.mdx` — deployment targets.

## Workflow

1. Identify whether the question is app routing, low-level `createPages`, minimal API, deployment/adapter, or client navigation.
2. Search the specific guide plus cross-cutting terms such as `unstable_`, `dynamic`, `static`, `RSC`, and `Link`.
3. Prefer Waku's exact documented filenames, props, exported functions, and deployment constraints.
4. Cross-check framework/runtime docs when the issue is generic React, Vite, Hono, Cloudflare Workers, AWS Lambda, or Docker rather than Waku-specific behavior.
