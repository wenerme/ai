---
description: BAAI general embedding (Large) model that transforms any given text into a 1024-dimensional vector
title: bge-large-en-v1.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg)

#  bge-large-en-v1.5

 Text Embeddings • BAAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/%40cf/baai/bge-large-en-v1.5/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` @cf/baai/bge-large-en-v1.5 `

* Cloudflare-hosted
* Batch

BAAI general embedding (Large) model that transforms any given text into a 1024-dimensional vector

| Model Info           |                                                         |
| -------------------- | ------------------------------------------------------- |
| More information     | [link ↗](https://huggingface.co/BAAI/bge-large-en-v1.5) |
| Maximum Input Tokens | 512                                                     |
| Output Dimensions    | 1,024                                                   |
| Batch                | Yes                                                     |
| Unit Pricing         | $0.20 per M input tokens                                |

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
      "@cf/baai/bge-large-en-v1.5",
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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-large-en-v1.5",
  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
  json={"text": stories}
)

print(response.json())
```

```sh

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-large-en-v1.5  \
  -X POST  \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'
```

OpenAI compatible endpoints

 Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous  — Send a request and receive a complete response

▶text

`one of`required

pooling

`string`default: meanenum: mean, clsThe pooling method used in the embedding process. \`cls\` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is \`mean\` in order for this to not be a breaking change, but we highly suggest using the new \`cls\` pooling for better accuracy.

▶shape\[\]

`array`

▶data\[\]

`array`Embeddings of the requested text values

pooling

`string`enum: mean, clsThe pooling method used in the embedding process.

Batch  — Send multiple requests in a single API call

▶requests\[\]

`array`requiredBatch of the embeddings requests to run using async-queue

▶shape\[\]

`array`

▶data\[\]

`array`Embeddings of the requested text values

pooling

`string`enum: mean, clsThe pooling method used in the embedding process.

## API Schemas (Raw)

Synchronous Input [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/sync-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/sync-input.json "Download")

Synchronous Output [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/sync-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/sync-output.json "Download")

Batch Input [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/batch-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/batch-input.json "Download")

Batch Output [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/batch-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/baai/bge-large-en-v1.5/batch-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/baai/bge-large-en-v1.5/#page","headline":"bge-large-en-v1.5 (BAAI) · Cloudflare AI docs · Cloudflare AI docs","description":"BAAI general embedding (Large) model that transforms any given text into a 1024-dimensional vector","url":"https://developers.cloudflare.com/ai/models/%40cf/baai/bge-large-en-v1.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
