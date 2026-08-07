---
description: Group AI Search instances into namespaces and manage them dynamically from a Workers binding.
title: Namespaces
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Namespaces

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/concepts/namespaces/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Every AI Search instance belongs to a **namespace**. A namespace is a logical grouping of instances within your account.

[Tenant A](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[Tenant B](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[Tenant C](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

[env.AI\_SEARCH.get(id)Worker](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

namespace: tenants

[AI Search instancetenant-a](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[AI Search instancetenant-b](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[AI Search instancetenant-c](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

## Why use namespaces

Common reasons to use namespaces include:

* **Domain separation**: Separate instances by product area, for example `blog`, `support`, and `docs`.
* **Tenant isolation**: Assign each tenant their own namespace so that instance names do not collide across tenants.
* **Agent isolation**: Give each agent its own namespace for independent context management.

For a step-by-step guide to isolating search per tenant, see [Multitenancy](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/).

## Requirements

The namespace binding requires the following minimum package versions for TypeScript types and local development support.

| Package                   | Minimum version |
| ------------------------- | --------------- |
| @cloudflare/workers-types | 4.20260304.0    |
| wrangler                  | 4.68.1          |

## How namespaces work

When you add an `ai_search_namespaces` binding to your Wrangler configuration, you specify which namespace the binding has access to. The binding grants full access to all instances within that namespace. You can get, list, create, and delete instances at runtime.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "my-namespace"
    }
  ]
}
```

```toml
[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "my-namespace"
```

At runtime, `env.AI_SEARCH` is the namespace handle. Use `env.AI_SEARCH.get("my-instance")` to get a handle to a specific instance:

```ts
const instance = env.AI_SEARCH.get("my-instance");
const results = await instance.search({
	messages: [{ role: "user", content: "How does caching work?" }],
});
```

The `get()` method is synchronous and does not make a network call. The instance is resolved lazily when you call a method like `search()` or `chatCompletions()`.

## Default namespace

A `default` namespace is automatically created for every account. If you do not need multiple namespaces, use `default` for all your instances.

You can also bind directly to specific instances in the default namespace using the `ai_search` binding. This binds each entry to a single pre-existing instance without needing to call `get()`.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search": [
    {
      "binding": "PROD_SEARCH",
      "instance_name": "production"
    },
    {
      "binding": "STAGING_SEARCH",
      "instance_name": "staging"
    }
  ]
}
```

```toml
[[ai_search]]
binding = "PROD_SEARCH"
instance_name = "production"

[[ai_search]]
binding = "STAGING_SEARCH"
instance_name = "staging"
```

The `ai_search` binding provides the same instance methods (`search()`, `chatCompletions()`, `info()`, `stats()`, `items`) but does not support namespace-level operations like `list()`, `create()`, or `delete()`.

## Multiple namespaces

You can declare multiple namespace bindings in the same Worker. Each binding maps to a different namespace and provides isolated access to its instances.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "BLOG_SEARCH",
      "namespace": "blog"
    },
    {
      "binding": "SUPPORT_SEARCH",
      "namespace": "support"
    }
  ]
}
```

```toml
[[ai_search_namespaces]]
binding = "BLOG_SEARCH"
namespace = "blog"

[[ai_search_namespaces]]
binding = "SUPPORT_SEARCH"
namespace = "support"
```

## Namespace public endpoints

A namespace can expose its own public `/search`, `/chat/completions`, and `/mcp` endpoints. One URL then searches across the instances you choose in that namespace and merges the results.

Refer to [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/).

## Namespaces and instance uniqueness

An instance name must be unique within a namespace. This means you can have an instance named `docs` in both the `blog` and `support` namespaces without conflict.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/concepts/namespaces/#page","headline":"Namespaces · Cloudflare AI Search docs","description":"Group AI Search instances into namespaces and manage them dynamically from a Workers binding.","url":"https://developers.cloudflare.com/ai-search/concepts/namespaces/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
