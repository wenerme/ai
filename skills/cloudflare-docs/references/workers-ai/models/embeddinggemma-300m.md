---
title: embeddinggemma-300m
description: EmbeddingGemma is a 300M parameter, state-of-the-art for its size, open embedding model from Google, built from Gemma 3 (with T5Gemma initialization) and the same research and technology used to create Gemini models. EmbeddingGemma produces vector representations of text, making it well-suited for search and retrieval tasks, including classification, clustering, and semantic similarity search. This model was trained with data in 100+ spoken languages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.C4p59fss.svg) 

#  embeddinggemma-300m 

Text Embeddings • Google 

@cf/google/embeddinggemma-300m 

EmbeddingGemma is a 300M parameter, state-of-the-art for its size, open embedding model from Google, built from Gemma 3 (with T5Gemma initialization) and the same research and technology used to create Gemini models. EmbeddingGemma produces vector representations of text, making it well-suited for search and retrieval tasks, including classification, clustering, and semantic similarity search. This model was trained with data in 100+ spoken languages.

## Usage

* [  TypeScript ](#tab-panel-1700)
* [  Python ](#tab-panel-1701)
* [  curl ](#tab-panel-1702)

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

\* indicates a required field

### Input

* `text` ` one of ` required  
   * `0` ` string ` min 1  
   The text to embed  
   * `1` ` array `  
   Batch of text values to embed  
         * `items` ` string ` min 1  
         The text to embed

### Output

* `shape` ` array `  
   * `items` ` number `
* `data` ` array `  
Embeddings of the requested text values  
   * `items` ` array `  
   Floating point embedding representation shaped by the embedding model  
         * `items` ` number `

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1703)
* [ Output ](#tab-panel-1704)

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
