---
title: bge-small-en-v1.5
description: BAAI general embedding (Small) model that transforms any given text into a 384-dimensional vector
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg)

#  bge-small-en-v1.5

Text Embeddings • BAAI

`@cf/baai/bge-small-en-v1.5`

BAAI general embedding (Small) model that transforms any given text into a 384-dimensional vector

| Model Info           |                                                         |
| -------------------- | ------------------------------------------------------- |
| More information     | [link ↗](https://huggingface.co/BAAI/bge-small-en-v1.5) |
| Maximum Input Tokens | 512                                                     |
| Output Dimensions    | 384                                                     |
| Batch                | Yes                                                     |
| Unit Pricing         | $0.02 per M input tokens                                |

## Usage

* [  TypeScript ](#tab-panel-5237)
* [  Python ](#tab-panel-5238)
* [  curl ](#tab-panel-5239)

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
      "@cf/baai/bge-small-en-v1.5",
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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-small-en-v1.5",
  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
  json={"text": stories}
)


print(response.json())
```

```sh
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-small-en-v1.5  \
  -X POST  \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations ](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response

* [ Input ](#tab-panel-5240)
* [ Output ](#tab-panel-5241)

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

Batch — Send multiple requests in a single API call

* [ Input ](#tab-panel-5242)
* [ Output ](#tab-panel-5243)

▶requests\[\]

`array`requiredBatch of the embeddings requests to run using async-queue

▶shape\[\]

`array`

▶data\[\]

`array`Embeddings of the requested text values

pooling

`string`enum: mean, clsThe pooling method used in the embedding process.

## API Schemas (Raw)

 Synchronous Input [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/sync-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/sync-input.json "Download")

 Synchronous Output [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/sync-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/sync-output.json "Download")

 Batch Input [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/batch-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/batch-input.json "Download")

 Batch Output [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/batch-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/batch-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/#page","headline":"bge-small-en-v1.5 (BAAI) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"BAAI general embedding (Small) model that transforms any given text into a 384-dimensional vector","url":"https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
