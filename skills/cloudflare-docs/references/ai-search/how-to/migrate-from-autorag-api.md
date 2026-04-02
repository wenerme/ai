---
title: Migrate from AutoRAG Search API
description: This guide explains how to migrate from the previous AutoRAG API endpoints to the new AI Search API endpoints. The old /autorag/rags/ endpoints were named after the original product name (AutoRAG). The new /ai-search/instances/ endpoints reflect the product rename and include improvements like OpenAI-compatible formatting.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/how-to/migrate-from-autorag-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Migrate from AutoRAG Search API

This guide explains how to migrate from the previous AutoRAG API endpoints to the new AI Search API endpoints. The old `/autorag/rags/` endpoints were named after the original product name (AutoRAG). The new `/ai-search/instances/` endpoints reflect the product rename and include improvements like OpenAI-compatible formatting.

## Endpoint changes

| Old endpoint (AutoRAG)                                     | New endpoint (AI Search)                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| POST /accounts/{account\_id}/autorag/rags/{name}/ai-search | POST /accounts/{account\_id}/ai-search/instances/{name}/chat/completions |
| POST /accounts/{account\_id}/autorag/rags/{name}/search    | POST /accounts/{account\_id}/ai-search/instances/{name}/search           |

The `{name}` parameter refers to your AI Search instance name.

## Why migrate

The new AI Search API offers several advantages:

* **OpenAI-compatible format**: Use the familiar `messages` array structure that works with existing OpenAI SDKs and tools
* **New features**: Future enhancements will only be available on the new API

## Chat completions

### Before (AutoRAG API)

For all parameters and options, refer to the [AutoRAG /ai-search API reference](https://developers.cloudflare.com/api/resources/autorag/methods/ai%5Fsearch/).

**Request:**

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/{NAME}/ai-search \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "query": "How do I get started?"

  }'


```

**Response:**

```

{

  "success": true,

  "result": {

    "object": "vector_store.search_results.page",

    "search_query": "How do I get started?",

    "response": "To get started with AI Search...",

    "data": [

      {

        "file_id": "doc001",

        "filename": "getting-started.md",

        "score": 0.45,

        "content": [

          {

            "id": "doc001",

            "type": "text",

            "text": "Welcome to AI Search..."

          }

        ]

      }

    ]

  }

}


```

### After (AI Search API)

For all parameters and options, refer to the [AI Search /chat/completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/).

**Request:**

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai-search/instances/{NAME}/chat/completions \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "messages": [

      {

        "content": "How do I get started?",

        "role": "user"

      }

    ]

  }'


```

**Response:**

```

{

  "id": "chatcmpl-abc123",

  "object": "chat.completion",

  "created": 1771886959,

  "model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  "choices": [

    {

      "index": 0,

      "message": {

        "role": "assistant",

        "content": "To get started with AI Search..."

      },

      "finish_reason": "stop"

    }

  ],

  "usage": {

    "prompt_tokens": 6507,

    "completion_tokens": 137,

    "total_tokens": 6644

  },

  "chunks": [

    {

      "id": "chunk001",

      "type": "text",

      "score": 0.85,

      "text": "Welcome to AI Search...",

      "item": {

        "key": "getting-started.md",

        "timestamp": 1735689600

      },

      "scoring_details": {

        "vector_score": 0.85

      }

    }

  ]

}


```

### Request format changes

| Old format               | New format                                                     |
| ------------------------ | -------------------------------------------------------------- |
| "query": "your question" | "messages": \[{ "content": "your question", "role": "user" }\] |

### Response format changes

| Old format                | New format                   |
| ------------------------- | ---------------------------- |
| result.response           | choices\[0\].message.content |
| result.data               | chunks                       |
| data\[\].filename         | chunks\[\].item.key          |
| data\[\].content\[\].text | chunks\[\].text              |
| No scoring breakdown      | chunks\[\].scoring\_details  |

### Streaming behavior changes

In the old AutoRAG API, when `stream` was set to `true`, you would only receive the streamed response without the retrieved chunks.

Now, in the new AI Search API, streaming responses include the chunks. The retrieved chunks are sent first as a `chunks` event, followed by the streamed response data. This allows you to display the source chunks immediately while streaming the generated response to the user.

## Search

### Before (AutoRAG API)

For all parameters and options, refer to the [AutoRAG /search API reference](https://developers.cloudflare.com/api/resources/autorag/methods/search/).

**Request:**

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/{NAME}/search \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "query": "How do I get started?"

  }'


```

**Response:**

```

{

  "success": true,

  "result": {

    "object": "vector_store.search_results.page",

    "search_query": "How do I get started?",

    "data": [

      {

        "file_id": "doc001",

        "filename": "getting-started.md",

        "score": 0.45,

        "content": [

          {

            "id": "doc001",

            "type": "text",

            "text": "Welcome to AI Search..."

          }

        ]

      }

    ]

  }

}


```

### After (AI Search API)

For all parameters and options, refer to the [AI Search /search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/).

**Request:**

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai-search/instances/{NAME}/search \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "messages": [

      {

        "content": "How do I get started?",

        "role": "user"

      }

    ]

  }'


```

**Response:**

```

{

  "success": true,

  "result": {

    "search_query": "How do I get started?",

    "chunks": [

      {

        "id": "chunk001",

        "type": "text",

        "score": 0.85,

        "text": "Welcome to AI Search...",

        "item": {

          "key": "getting-started.md",

          "timestamp": 1735689600

        },

        "scoring_details": {

          "vector_score": 0.85

        }

      }

    ]

  }

}


```

### Request format changes

| Old format               | New format                                                     |
| ------------------------ | -------------------------------------------------------------- |
| "query": "your question" | "messages": \[{ "content": "your question", "role": "user" }\] |

### Response format changes

| Old format                | New format                  |
| ------------------------- | --------------------------- |
| result.data               | result.chunks               |
| data\[\].filename         | chunks\[\].item.key         |
| data\[\].content\[\].text | chunks\[\].text             |
| No scoring breakdown      | chunks\[\].scoring\_details |

## Filter format

The new AI Search REST API uses Vectorize-style metadata filtering, which differs from the AutoRAG API format. Filters are now nested under `ai_search_options.retrieval.filters` in the request body. For full documentation of the old format, refer to [AutoRAG API filter format](https://developers.cloudflare.com/ai-search/autorag-filter-format/).

### Operator mapping

| AutoRAG API | AI Search API     |
| ----------- | ----------------- |
| eq          | $eq (or implicit) |
| ne          | $ne               |
| gt          | $gt               |
| gte         | $gte              |
| lt          | $lt               |
| lte         | $lte              |
| —           | $in (new)         |
| —           | $nin (new)        |

### Examples

#### Simple filter

**Before (AutoRAG API):**

JavaScript

```

filters: {

  type: "eq",

  key: "folder",

  value: "customer-a/"

}


```

**After (AI Search API):**

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": "customer-a/" }

    }

  }

}


```

#### Compound filter (AND)

**Before (AutoRAG API):**

JavaScript

```

filters: {

  type: "and",

  filters: [

    { type: "eq", key: "folder", value: "customer-a/" },

    { type: "gte", key: "timestamp", value: "1735689600000" }

  ]

}


```

**After (AI Search API):**

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": {

        "folder": "customer-a/",

        "timestamp": { "$gte": 1735689600 }

      }

    }

  }

}


```

#### "Starts with" filter

**Before (AutoRAG API):**

JavaScript

```

filters: {

  type: "and",

  filters: [

    { type: "gt", key: "folder", value: "customer-a//" },

    { type: "lte", key: "folder", value: "customer-a/z" }

  ]

}


```

**After (AI Search API):**

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": { "$gte": "customer-a/", "$lt": "customer-a0" } }

    }

  }

}


```

## API references

* [REST API documentation](https://developers.cloudflare.com/ai-search/usage/rest-api/)
* [Chat Completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/)
* [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/)
* [Legacy AutoRAG API reference](https://developers.cloudflare.com/api/resources/autorag/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/migrate-from-autorag-api/","name":"Migrate from AutoRAG Search API"}}]}
```
