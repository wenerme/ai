---
title: Workers Binding
description: Cloudflare’s serverless platform allows you to run code at the edge to build full-stack applications with Workers. A binding enables your Worker or Pages Function to interact with resources on the Cloudflare Developer Platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Bindings ](https://developers.cloudflare.com/search/?tags=Bindings) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/usage/workers-binding.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Workers Binding

Cloudflare’s serverless platform allows you to run code at the edge to build full-stack applications with [Workers](https://developers.cloudflare.com/workers/). A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) enables your Worker or Pages Function to interact with resources on the Cloudflare Developer Platform.

To use your AI Search with Workers or Pages, create an AI binding either in the Cloudflare dashboard (refer to [AI bindings](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai) for instructions), or you can update your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/). To bind AI Search to your Worker, add the following to your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-3099)
* [  wrangler.toml ](#tab-panel-3100)

```

{

  "ai": {

    "binding": "AI", // i.e. available in your Worker on env.AI

  },

}


```

```

[ai]

binding = "AI"


```

AI Search is the new name for AutoRAG

API endpoints may still reference `autorag` for the time being. Functionality remains the same, and support for the new naming will be introduced gradually.

## `aiSearch()`

This method searches for relevant results from your data source and generates a response using your default model and the retrieved context, for an AI Search named `my-autorag`:

JavaScript

```

const answer = await env.AI.autorag("my-autorag").aiSearch({

  query: "How do I train a llama to deliver coffee?",

  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  rewrite_query: true,

  max_num_results: 2,

  ranking_options: {

    score_threshold: 0.3,

  },

  reranking: {

    enabled: true,

    model: "@cf/baai/bge-reranker-base",

  },

  stream: true,

});


```

### Parameters

`query` ` string ` required

The input query.

`model` ` string ` optional

The text-generation model that is used to generate the response for the query. For a list of valid options, check the AI Search Generation model Settings. Defaults to the generation model selected in the AI Search Settings.

`system_prompt` ` string ` optional

The system prompt for generating the answer.

`rewrite_query` ` boolean ` optional

Rewrites the original query into a search optimized query to improve retrieval accuracy. Defaults to `false`.

`max_num_results` ` number ` optional

The maximum number of results that can be returned from the Vectorize database. Defaults to `10`. Must be between `1` and `50`.

`ranking_options` ` object ` optional

Configurations for customizing result ranking. Defaults to `{}`.

* `score_threshold` ` number ` optional  
   * The minimum match score required for a result to be considered a match. Defaults to `0`. Must be between `0` and `1`.

`reranking` ` object ` optional

Configurations for customizing reranking. Defaults to `{}`.

* `enabled` ` boolean ` optional  
   * Enables or disables reranking, which reorders retrieved results based on semantic relevance using a reranking model. Defaults to `false`.
* `model` ` string ` optional  
   * The reranking model to use when reranking is enabled.

`stream` ` boolean ` optional

Returns a stream of results as they are available. Defaults to `false`.

`filters` ` object ` optional

Narrow down search results based on metadata, like folder and date, so only relevant content is retrieved. For more details, refer to [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/metadata/).

### Response

This is the response structure without `stream` enabled.

```

{

    "object": "vector_store.search_results.page",

    "search_query": "How do I train a llama to deliver coffee?",

    "response": "To train a llama to deliver coffee:\n\n1. **Build trust** — Llamas appreciate patience (and decaf).\n2. **Know limits** — Max 3 cups per llama, per `llama-logistics.md`.\n3. **Use voice commands** — Start with \"Espresso Express!\"\n4.",

    "data": [

      {

        "file_id": "llama001",

        "filename": "llama/logistics/llama-logistics.md",

        "score": 0.45,

        "attributes": {

          "modified_date": 1735689600000,   // unix timestamp for 2025-01-01

          "folder": "llama/logistics/",

        },

        "content": [

          {

            "id": "llama001",

            "type": "text",

            "text": "Llamas can carry 3 drinks max."

          }

        ]

      },

      {

        "file_id": "llama042",

        "filename": "llama/llama-commands.md",

        "score": 0.4,

        "attributes": {

          "modified_date": 1735689600000,   // unix timestamp for 2025-01-01

          "folder": "llama/",

        },

        "content": [

          {

            "id": "llama042",

            "type": "text",

            "text": "Start with basic commands like 'Espresso Express!' Llamas love alliteration."

          }

        ]

      },

    ],

    "has_more": false,

    "next_page": null

}


```

## `search()`

This method searches for results from your corpus and returns the relevant results, for the AI Search instance named `my-autorag`:

JavaScript

```

const answer = await env.AI.autorag("my-autorag").search({

  query: "How do I train a llama to deliver coffee?",

  rewrite_query: true,

  max_num_results: 2,

  ranking_options: {

    score_threshold: 0.3,

  },

  reranking: {

    enabled: true,

    model: "@cf/baai/bge-reranker-base",

  },

});


```

### Parameters

`messages` ` array ` required

An array of message objects. Each message has:

* `content` ` string ` \- The search query content.
* `role` ` string ` \- The role: `user`, `system`, or `assistant`.

`ai_search_options` ` object ` optional

Per-request overrides for retrieval and model behavior. Supports the following nested options:

* `retrieval.filters` ` object ` \- Narrow down search results based on metadata. Refer to [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/metadata/) for syntax and examples.
* `retrieval.max_num_results` ` number ` \- Maximum number of chunks to return. Defaults to `10`, maximum `50`.
* `retrieval.retrieval_type` ` string ` \- One of `vector`, `keyword`, or `hybrid`.
* `retrieval.match_threshold` ` number ` \- Minimum similarity score (0-1). Defaults to `0.4`.
* `cache.enabled` ` boolean ` \- Override the instance-level cache setting for this request.
* `reranking.enabled` ` boolean ` \- Override the instance-level reranking setting for this request.

---

For the full list of optional parameters, refer to the [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/).

### Response

```

{

    "object": "vector_store.search_results.page",

    "search_query": "How do I train a llama to deliver coffee?",

    "data": [

      {

        "file_id": "llama001",

        "filename": "llama/logistics/llama-logistics.md",

        "score": 0.45,

        "attributes": {

          "modified_date": 1735689600000,   // unix timestamp for 2025-01-01

          "folder": "llama/logistics/",

        },

        "content": [

          {

            "id": "llama001",

            "type": "text",

            "text": "Llamas can carry 3 drinks max."

          }

        ]

      },

      {

        "file_id": "llama042",

        "filename": "llama/llama-commands.md",

        "score": 0.4,

        "attributes": {

          "modified_date": 1735689600000,   // unix timestamp for 2025-01-01

          "folder": "llama/",

        },

        "content": [

          {

            "id": "llama042",

            "type": "text",

            "text": "Start with basic commands like 'Espresso Express!' Llamas love alliteration."

          }

        ]

      },

    ],

    "has_more": false,

    "next_page": null

}


```

## Local development

Local development is supported by proxying requests to your deployed AI Search instance. When running in local mode, your application forwards queries to the configured remote AI Search instance and returns the generated responses as if they were served locally.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/usage/","name":"Search API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/usage/workers-binding/","name":"Workers Binding"}}]}
```
