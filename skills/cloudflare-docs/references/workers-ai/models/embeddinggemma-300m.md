---
title: embeddinggemma-300m
description: EmbeddingGemma is a 300M parameter, state-of-the-art for its size, open embedding model from Google, built from Gemma 3 (with T5Gemma initialization) and the same research and technology used to create Gemini models. EmbeddingGemma produces vector representations of text, making it well-suited for search and retrieval tasks, including classification, clustering, and semantic similarity search. This model was trained with data in 100+ spoken languages.
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

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  embeddinggemma-300m 

Text Embeddings • Google • Hosted 

`@cf/google/embeddinggemma-300m` 

EmbeddingGemma is a 300M parameter, state-of-the-art for its size, open embedding model from Google, built from Gemma 3 (with T5Gemma initialization) and the same research and technology used to create Gemini models. EmbeddingGemma produces vector representations of text, making it well-suited for search and retrieval tasks, including classification, clustering, and semantic similarity search. This model was trained with data in 100+ spoken languages.

## Usage

* [  TypeScript ](#tab-panel-3206)
* [  Python ](#tab-panel-3207)
* [  curl ](#tab-panel-3208)

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

      "@cf/google/embeddinggemma-300m",

      {

        text: stories,

      }

    );


    return Response.json(embeddings);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/google/embeddinggemma-300m",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/google/embeddinggemma-300m  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

* [ Input ](#tab-panel-3209)
* [ Output ](#tab-panel-3210)

▶text

`one of`required

▶shape\[\]

`array`

▶data\[\]

`array`Embeddings of the requested text values

## API Schemas

* [ Input ](#tab-panel-3204)
* [ Output ](#tab-panel-3205)

```

{

  "type": "object",

  "properties": {

    "text": {

      "oneOf": [

        {

          "type": "string",

          "description": "The text to embed",

          "minLength": 1

        },

        {

          "type": "array",

          "description": "Batch of text values to embed",

          "items": {

            "type": "string",

            "description": "The text to embed",

            "minLength": 1

          },

          "maxItems": 100

        }

      ]

    }

  },

  "required": [

    "text"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "shape": {

      "type": "array",

      "items": {

        "type": "number"

      }

    },

    "data": {

      "type": "array",

      "description": "Embeddings of the requested text values",

      "items": {

        "type": "array",

        "description": "Floating point embedding representation shaped by the embedding model",

        "items": {

          "type": "number"

        }

      }

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
