---
title: Public endpoint
description: AI Search public endpoints allow you to expose AI Search capabilities without requiring authentication. This enables you to integrate AI Search into public-facing applications or share it with external users.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/usage/public-endpoint.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Public endpoint

AI Search public endpoints allow you to expose AI Search capabilities without requiring authentication. This enables you to integrate AI Search into public-facing applications or share it with external users.

For pre-built search and chat components you can embed on your website using the public endpoints, refer to [UI snippets](https://developers.cloudflare.com/ai-search/configuration/embed-search-snippets/).

## Prerequisites

Enable public endpoints for your AI Search instance:

1. Go to **AI Search** in the Cloudflare dashboard.[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL.

For configuration options like rate limiting and CORS, refer to [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/public-endpoint/).

## Chat completions

The `/chat/completions` endpoint searches your data source and generates a response using the model and retrieved context. It uses the same OpenAI-compatible format as the [REST API](https://developers.cloudflare.com/ai-search/usage/rest-api/#chat-completions).

Terminal window

```

curl https://<INSTANCE_ID>.search.ai.cloudflare.com/chat/completions \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "content": "How do I configure AI Search?",

        "role": "user"

      }

    ]

  }'


```

For the full list of options, refer to the [Chat Completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/).

## Search

The `/search` endpoint returns relevant chunks from your data source without generating a response. It uses the same format as the [REST API](https://developers.cloudflare.com/ai-search/usage/rest-api/#search).

Terminal window

```

curl https://<INSTANCE_ID>.search.ai.cloudflare.com/search \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "content": "How do I configure AI Search?",

        "role": "user"

      }

    ]

  }'


```

For the full list of options, refer to the [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/).

## Next steps

* [UI snippets](https://developers.cloudflare.com/ai-search/configuration/embed-search-snippets/) \- Add pre-built search and chat components to your website.
* [MCP](https://developers.cloudflare.com/ai-search/usage/mcp/) \- Connect AI agents using the Model Context Protocol.
* [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/public-endpoint/) \- Configure rate limiting, CORS, and security settings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/usage/","name":"Search API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/usage/public-endpoint/","name":"Public endpoint"}}]}
```
