---
title: Create a simple search engine
description: Build a simple search engine using the AI Search Workers binding and the search method.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/how-to/simple-search-engine.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Create a simple search engine

Use the `search()` method to implement a simple search engine. This example uses the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/), but can be adapted to use the [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/) instead.

To replicate this example:

* Disable query rewriting so that the original user query is matched directly
* Configure your AI Search instance to have small chunk sizes (256 tokens is usually enough)

* [  JavaScript ](#tab-panel-5362)
* [  TypeScript ](#tab-panel-5363)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";


    const searchResult = await env.AI_SEARCH.get("my-instance").search({

      messages: [{ role: "user", content: userQuery }],

    });


    return Response.json({

      files: searchResult.chunks.map((chunk) => chunk.item.key),

    });

  },

};


```

Explain Code

TypeScript

```

export interface Env {

  AI_SEARCH: AiSearchNamespace;

}


export default {

  async fetch(request, env): Promise<Response> {

    const url = new URL(request.url);

    const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";


    const searchResult = await env.AI_SEARCH.get("my-instance").search({

      messages: [{ role: "user", content: userQuery }],

    });


    return Response.json({

      files: searchResult.chunks.map((chunk) => chunk.item.key),

    });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/simple-search-engine/","name":"Create a simple search engine"}}]}
```
