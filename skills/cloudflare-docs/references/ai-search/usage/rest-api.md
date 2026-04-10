---
title: REST API
description: This guide explains how to use the AI Search REST API to query your AI Search instance.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/usage/rest-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# REST API

This guide explains how to use the AI Search REST API to query your AI Search instance.

Note

The previous [AutoRAG API endpoints](https://developers.cloudflare.com/api/resources/autorag/) are no longer recommended for use. Refer to [Migrate from AutoRAG Search API](https://developers.cloudflare.com/ai-search/how-to/migrate-from-autorag-api/) for details.

## Prerequisite: Get AI Search API token

You need an API token with `AI Search` `Run` permissions to use the REST API. To create a new token:

1. Log in to the Cloudflare dashboard, and go to API tokens for your profile.[ Go to **Account API tokens** ](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Enter a name for your token.
5. Under **Permissions**, select **AI Search** and **Run**.
6. Under **Account Resources**, select the account you want to use.
7. Select **Continue to summary**, then select **Create Token**.
8. Copy and save your API token for future use.

## Chat Completions

This endpoint searches for relevant results from your data source and generates a response using the model and the retrieved context:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai-search/instances/{AI_SEARCH_NAME}/chat/completions \

  -H 'Content-Type: application/json' \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "messages": [

      {

        "content": "How do I train a llama to deliver coffee?",

        "role": "user"

      }

    ]

  }'


```

Explain Code

Note

* `ACCOUNT_ID`: Find this by going to [Workers & Pages](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#find-account-id-workers-and-pages) in the Cloudflare dashboard.
* `AI_SEARCH_NAME`: The name of your AI Search instance.
* `API_TOKEN`: The API token you created in the [prerequisite step](#prerequisite-get-ai-search-api-token).

### Parameters

`messages` ` array ` required

An array of message objects. Each message has:

* `content` ` string ` \- The message content.
* `role` ` string ` \- The role: `user`, `system`, or `assistant`.

`stream` ` boolean ` optional

Set to `true` to return a stream of results as they are generated. Defaults to `false`.

`ai_search_options` ` object ` optional

Per-request overrides for retrieval and model behavior. Supports the following nested options:

* `retrieval.filters` ` object ` \- Narrow down search results based on metadata. Refer to [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/metadata/) for syntax and examples.
* `retrieval.max_num_results` ` number ` \- Maximum number of chunks to return. Defaults to `10`, maximum `50`.
* `retrieval.retrieval_type` ` string ` \- One of `vector`, `keyword`, or `hybrid`.
* `retrieval.match_threshold` ` number ` \- Minimum similarity score (0-1). Defaults to `0.4`.
* `cache.enabled` ` boolean ` \- Override the instance-level cache setting for this request.
* `reranking.enabled` ` boolean ` \- Override the instance-level reranking setting for this request.

---

For the full list of optional parameters, refer to the [Chat Completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/).

### Response

When `stream` is set to `false` (default), the response is returned as a single JSON object:

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

        "content": "To train a llama to deliver coffee, start by building trust...",

        "refusal": null

      },

      "logprobs": null,

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

      "text": "Llamas can carry up to 3 drinks.",

      "item": {

        "key": "llama-logistics.md",

        "timestamp": 1735689600

      },

      "scoring_details": {

        "vector_score": 0.85

      }

    }

  ]

}


```

Explain Code

When `stream` is set to `true`, the response is returned as server-sent events (SSE). The retrieved chunks are sent first as a single `chunks` event, followed by multiple `data` events containing the generated response in incremental pieces:

```

event: chunks

data: [{"id":"chunk001","type":"text","score":0.85,"text":"...","item":{...},"scoring_details":{...}}]


data: {"id":"id-123","created":1771887723,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"To"}}]}


data: {"id":"id-123","created":1771887723,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" train a llama"}}]}


data: [DONE]


```

This allows you to display the source chunks immediately while streaming the generated response to the user.

## Search

This endpoint searches for results from your data source and returns the relevant chunks without generating a response:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai-search/instances/{AI_SEARCH_NAME}/search \

  -H 'Content-Type: application/json' \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "messages": [

      {

        "content": "How do I train a llama to deliver coffee?",

        "role": "user"

      }

    ]

  }'


```

Explain Code

Note

* `ACCOUNT_ID`: Find this by going to [Workers & Pages](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#find-account-id-workers-and-pages) in the Cloudflare dashboard.
* `AI_SEARCH_NAME`: The name of your AI Search instance.
* `API_TOKEN`: The API token you created in the [prerequisite step](#prerequisite-get-ai-search-api-token).

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

  "success": true,

  "result": {

    "search_query": "How do I train a llama to deliver coffee?",

    "chunks": [

      {

        "id": "chunk001",

        "type": "text",

        "score": 0.85,

        "text": "Llamas can carry up to 3 drinks.",

        "item": {

          "key": "llama-logistics.md",

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/usage/","name":"Search API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/usage/rest-api/","name":"REST API"}}]}
```
