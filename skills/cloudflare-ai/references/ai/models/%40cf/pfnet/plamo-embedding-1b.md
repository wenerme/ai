---
description: PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc.

It can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.
title: plamo-embedding-1b
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

 p

#  plamo-embedding-1b

 Text Embeddings • pfnet

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/%40cf/pfnet/plamo-embedding-1b/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` @cf/pfnet/plamo-embedding-1b `

* Cloudflare-hosted

PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc. It can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.

| Model Info   |                           |
| ------------ | ------------------------- |
| Unit Pricing | $0.019 per M input tokens |

## Usage

```ts

export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Can be a string or array of strings]
    const stories = [
      "This is a story about an orange cloud",
      "This is a story about a llama",
      "This is a story about a hugging emoji",
    ];

    const embeddings = await env.AI.run(
      "@cf/pfnet/plamo-embedding-1b",
      {
        text: stories,
      }
    );

    return Response.json(embeddings);
  },
} satisfies ExportedHandler<Env>;
```

```py

import os
import requests


ACCOUNT_ID = "your-account-id"
AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")

stories = [
  'This is a story about an orange cloud',
  'This is a story about a llama',
  'This is a story about a hugging emoji'
]

response = requests.post(
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/pfnet/plamo-embedding-1b",
  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
  json={"text": stories}
)

print(response.json())
```

```sh

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/pfnet/plamo-embedding-1b  \
  -X POST  \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'
```

OpenAI compatible endpoints

 Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

▶text

`one of`required

▶data\[\]

`array`Embedding vectors, where each vector is a list of floats.

▶shape\[\]

`array`minItems: 2maxItems: 2Shape of the embedding data as \[number\_of\_embeddings, embedding\_dimension\].

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/@cf/pfnet/plamo-embedding-1b/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/pfnet/plamo-embedding-1b/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/@cf/pfnet/plamo-embedding-1b/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/pfnet/plamo-embedding-1b/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/pfnet/plamo-embedding-1b/#page","headline":"plamo-embedding-1b (pfnet) · Cloudflare AI docs · Cloudflare AI docs","description":"PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc.\n\nIt can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.","url":"https://developers.cloudflare.com/ai/models/%40cf/pfnet/plamo-embedding-1b/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
