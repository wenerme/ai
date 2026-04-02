---
title: Create a simple search engine
description: By using the search method, you can implement a simple but fast search engine. This example uses Workers Binding, but can be easily adapted to use the REST API instead.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/how-to/simple-search-engine.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a simple search engine

By using the `search` method, you can implement a simple but fast search engine. This example uses [Workers Binding](https://developers.cloudflare.com/ai-search/usage/workers-binding/), but can be easily adapted to use the [REST API](https://developers.cloudflare.com/ai-search/usage/rest-api/) instead.

To replicate this example remember to:

* Disable `rewrite_query`, as you want to match the original user query
* Configure your AI Search to have small chunk sizes, usually 256 tokens is enough

* [  JavaScript ](#tab-panel-3081)
* [  TypeScript ](#tab-panel-3082)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    const userQuery =

      url.searchParams.get("query") ??

      "How do I train a llama to deliver coffee?";

    const searchResult = await env.AI.autorag("my-rag").search({

      query: userQuery,

      rewrite_query: false,

    });


    return Response.json({

      files: searchResult.data.map((obj) => obj.filename),

    });

  },

};


```

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const url = new URL(request.url);

    const userQuery =

      url.searchParams.get("query") ??

      "How do I train a llama to deliver coffee?";

    const searchResult = await env.AI.autorag("my-rag").search({

      query: userQuery,

      rewrite_query: false,

    });


    return Response.json({

      files: searchResult.data.map((obj) => obj.filename),

    });

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/simple-search-engine/","name":"Create a simple search engine"}}]}
```
