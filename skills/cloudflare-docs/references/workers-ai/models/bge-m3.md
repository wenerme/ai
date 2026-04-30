---
title: bge-m3
description: Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg) 

#  bge-m3 

Text Embeddings • BAAI • Hosted 

`@cf/baai/bge-m3` 

Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.

| Model Info                                                                 |                           |
| -------------------------------------------------------------------------- | ------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 60,000 tokens             |
| Unit Pricing                                                               | $0.012 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-2464)
* [  Python ](#tab-panel-2465)
* [  curl ](#tab-panel-2466)

```

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

      "@cf/baai/bge-m3",

      {

        text: stories,

      }

    );


    return Response.json(embeddings);

  },

} satisfies ExportedHandler<Env>;


```

```

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-m3",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-m3  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-2467)
* [ Output ](#tab-panel-2468)

query

`string`minLength: 1A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts

▶contexts\[\]

`array`requiredList of provided contexts. Note that the index in this array is important, as the response will refer to it.

truncate\_inputs

`boolean`default: falseWhen provided with too long context should the model error out or truncate the context to fit?

request\_id

`string`The async request id that can be used to obtain the results.

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-2469)
* [ Output ](#tab-panel-2470)

▶requests\[\]

`array`requiredBatch of the embeddings requests to run using async-queue

request\_id

`string`The async request id that can be used to obtain the results.

## API Schemas (Raw)

Synchronous Input 

Synchronous Output 

Batch Input 

Batch Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
