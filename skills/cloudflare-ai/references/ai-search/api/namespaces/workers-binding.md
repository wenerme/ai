---
description: Work with the instances in an AI Search namespace from a Cloudflare Worker using the namespace binding.
title: Workers binding
image: https://developers.cloudflare.com/ai-search/api/namespaces/workers-binding/og.png?v=fa78d292a041eecc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers binding

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/api/namespaces/workers-binding/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `ai_search_namespaces` binding gives a [Worker](https://developers.cloudflare.com/workers/) access to one [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/). Use it to get, list, create, and delete instances in that namespace, and to search across several of its instances in one call.

The binding is scoped to the namespace you configure. It cannot create, list, update, or delete namespaces. To manage namespaces, use the [REST API](https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/), [Terraform](https://developers.cloudflare.com/ai-search/api/namespaces/terraform/), or [Wrangler](https://developers.cloudflare.com/ai-search/wrangler-commands/).

## Configure the binding

Add an `ai_search_namespaces` entry to your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) and set the namespace the binding can access:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  // Set this to today's date
  "compatibility_date": "2026-11-13",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "support"
    }
  ]
}
```

```toml
# Set this to today's date
compatibility_date = "2026-11-13"

[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "support"
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `binding` | string | Yes | The variable name available on `env`. For example, `"AI_SEARCH"` makes it accessible as `env.AI_SEARCH`. |
| `namespace` | string | Yes | The namespace to bind to. A `default` namespace exists for every account. If the namespace does not exist, Wrangler creates it when you deploy. |
| `remote` | boolean | No | Set to `true` for local development with `wrangler dev`. |

## What the binding can do

At runtime, `env.AI_SEARCH` is the namespace handle. It exposes the following methods:

| Method | Description |
| --- | --- |
| `get()` | Returns a handle to an instance. Does not make a network call. |
| `list()` | Lists the instances in the namespace. |
| `create()` | Creates an instance in the namespace and returns a handle. |
| `delete()` | Permanently deletes an instance and its indexed content. |
| `search()` | Searches across several instances in the namespace. |
| `chatCompletions()` | Generates a response from several instances in the namespace. |

For parameters and responses of the instance methods, refer to the [Instances Workers binding](https://developers.cloudflare.com/ai-search/api/instances/workers-binding/) reference. For `search()` and `chatCompletions()`, refer to the [Search Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) reference.

### Get an instance

```ts
const instance = env.AI_SEARCH.get("docs");
const results = await instance.search({
	messages: [{ role: "user", content: "How do I reset my password?" }],
});
```

### List instances

```ts
const { result } = await env.AI_SEARCH.list();

for (const instance of result) {
	console.log(instance.id);
}
```

### Create an instance

```ts
const instance = await env.AI_SEARCH.create({
	id: "faq",
});
```

### Delete an instance

```ts
await env.AI_SEARCH.delete("faq");
```

Caution

Deleting an instance permanently removes all indexed data, including embeddings, chunks, and source files.

## Bind multiple namespaces

Declare one binding per namespace. Each binding only reaches the instances in its own namespace.

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

```ts
const blogPosts = await env.BLOG_SEARCH.list();
const supportDocs = env.SUPPORT_SEARCH.get("docs");
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/namespaces/workers-binding/#page","headline":"Workers binding","description":"Work with the instances in an AI Search namespace from a Cloudflare Worker using the namespace binding.","url":"https://developers.cloudflare.com/ai-search/api/namespaces/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/api/namespaces/workers-binding/og.png?v=fa78d292a041eecc","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
