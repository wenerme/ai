---
title: qwen3-embedding-0.6b
description: The Qwen3 Embedding model series is the latest proprietary model of the Qwen family, specifically designed for text embedding and ranking tasks. 
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Qwen logo](https://developers.cloudflare.com/_astro/qwen.B8ST_F2H.svg) 

#  qwen3-embedding-0.6b 

Text Embeddings • Qwen 

@cf/qwen/qwen3-embedding-0.6b 

The Qwen3 Embedding model series is the latest proprietary model of the Qwen family, specifically designed for text embedding and ranking tasks. 

| Model Info                                                                 |                           |
| -------------------------------------------------------------------------- | ------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 8,192 tokens              |
| Unit Pricing                                                               | $0.012 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-2018)
* [  Python ](#tab-panel-2019)
* [  curl ](#tab-panel-2020)

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

      "@cf/qwen/qwen3-embedding-0.6b",

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/qwen/qwen3-embedding-0.6b",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/qwen/qwen3-embedding-0.6b  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

\* indicates a required field

### Input

* `queries` ` one of `  
   * `0` ` string ` min 1  
   A single query string  
   * `1` ` array `  
   An array of query strings  
         * `items` ` string ` min 1
* `instruction` ` string ` default Given a web search query, retrieve relevant passages that answer the query  
Optional instruction for the task
* `documents` ` one of `  
   * `0` ` string ` min 1  
   A single document string  
   * `1` ` array `  
   An array of document strings  
         * `items` ` string ` min 1
* `text` ` one of `  
   * `0` ` string ` min 1  
   Alias for documents: a single text string  
   * `1` ` array `  
   Alias for documents: an array of text strings  
         * `items` ` string ` min 1

### Output

* `data` ` array `  
   * `items` ` array `  
         * `items` ` number `
* `shape` ` array `  
   * `items` ` integer `

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-2021)
* [ Output ](#tab-panel-2022)

```

{

    "type": "object",

    "properties": {

        "queries": {

            "oneOf": [

                {

                    "type": "string",

                    "description": "A single query string",

                    "minLength": 1

                },

                {

                    "type": "array",

                    "description": "An array of query strings",

                    "items": {

                        "type": "string",

                        "minLength": 1

                    },

                    "maxItems": 32

                }

            ]

        },

        "instruction": {

            "type": "string",

            "default": "Given a web search query, retrieve relevant passages that answer the query",

            "description": "Optional instruction for the task"

        },

        "documents": {

            "oneOf": [

                {

                    "type": "string",

                    "description": "A single document string",

                    "minLength": 1

                },

                {

                    "type": "array",

                    "description": "An array of document strings",

                    "items": {

                        "type": "string",

                        "minLength": 1

                    },

                    "maxItems": 32

                }

            ]

        },

        "text": {

            "oneOf": [

                {

                    "type": "string",

                    "description": "Alias for documents: a single text string",

                    "minLength": 1

                },

                {

                    "type": "array",

                    "description": "Alias for documents: an array of text strings",

                    "items": {

                        "type": "string",

                        "minLength": 1

                    },

                    "maxItems": 32

                }

            ]

        }

    }

}


```

```

{

    "type": "object",

    "properties": {

        "data": {

            "items": {

                "items": {

                    "type": "number"

                },

                "type": "array"

            },

            "type": "array"

        },

        "shape": {

            "items": {

                "type": "integer"

            },

            "type": "array"

        }

    }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
