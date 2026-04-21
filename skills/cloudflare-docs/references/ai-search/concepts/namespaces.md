---
title: Namespaces
description: Group AI Search instances into namespaces and manage them dynamically from a Workers binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/concepts/namespaces.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Namespaces

Every AI Search instance belongs to a **namespace**. A namespace is a logical grouping of instances within your account.

## Requirements

The namespace binding requires the following minimum package versions for TypeScript types and local development support.

| Package                   | Minimum version |
| ------------------------- | --------------- |
| @cloudflare/workers-types | 4.20260304.0    |
| wrangler                  | 4.68.1          |

## How namespaces work

When you add an `ai_search_namespaces` binding to your Wrangler configuration, you specify which namespace the binding has access to. The binding grants full access to all instances within that namespace. You can get, list, create, and delete instances at runtime.

* [  wrangler.jsonc ](#tab-panel-5167)
* [  wrangler.toml ](#tab-panel-5168)

JSONC

```

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

TOML

```

[[ai_search_namespaces]]

binding = "AI_SEARCH"

namespace = "my-namespace"


```

At runtime, `env.AI_SEARCH` is the namespace handle. Use `env.AI_SEARCH.get("my-instance")` to get a handle to a specific instance:

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({

  messages: [{ role: "user", content: "How does caching work?" }],

});


```

The `get()` method is synchronous and does not make a network call. The instance is resolved lazily when you call a method like `search()` or `chatCompletions()`.

## Default namespace

A `default` namespace is automatically created for every account. If you do not need multiple namespaces, use `default` for all your instances.

You can also bind directly to specific instances in the default namespace using the `ai_search` binding. This binds each entry to a single pre-existing instance without needing to call `get()`.

* [  wrangler.jsonc ](#tab-panel-5169)
* [  wrangler.toml ](#tab-panel-5170)

JSONC

```

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

Explain Code

TOML

```

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

* [  wrangler.jsonc ](#tab-panel-5171)
* [  wrangler.toml ](#tab-panel-5172)

JSONC

```

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

Explain Code

TOML

```

[[ai_search_namespaces]]

binding = "BLOG_SEARCH"

namespace = "blog"


[[ai_search_namespaces]]

binding = "SUPPORT_SEARCH"

namespace = "support"


```

### Common reasons to use multiple namespaces

* **Domain separation**: Separate instances by product area, for example `blog`, `support`, and `docs`.
* **Tenant isolation**: Assign each tenant their own namespace so that instance names do not collide across tenants.
* **Agent isolation**: Give each agent its own namespace for independent context management.

## Namespaces and instance uniqueness

An instance name must be unique within a namespace. This means you can have an instance named `docs` in both the `blog` and `support` namespaces without conflict.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/concepts/namespaces/","name":"Namespaces"}}]}
```
