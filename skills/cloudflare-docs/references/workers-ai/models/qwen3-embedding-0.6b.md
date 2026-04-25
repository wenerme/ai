---
title: qwen3-embedding-0.6b
description: The Qwen3 Embedding model series is the latest proprietary model of the Qwen family, specifically designed for text embedding and ranking tasks. 
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![Qwen logo](https://developers.cloudflare.com/_astro/qwen.CVqFFn5h.svg) 

#  qwen3-embedding-0.6b 

Text Embeddings • Qwen • Hosted 

`@cf/qwen/qwen3-embedding-0.6b` 

The Qwen3 Embedding model series is the latest proprietary model of the Qwen family, specifically designed for text embedding and ranking tasks. 

| Model Info                                                                 |                           |
| -------------------------------------------------------------------------- | ------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 8,192 tokens              |
| Unit Pricing                                                               | $0.012 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-3918)
* [  Python ](#tab-panel-3919)
* [  curl ](#tab-panel-3920)

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/qwen/qwen3-embedding-0.6b",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Explain Code

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

* [ Input ](#tab-panel-3923)
* [ Output ](#tab-panel-3924)

▶queries

`one of`

instruction

`string`default: Given a web search query, retrieve relevant passages that answer the queryOptional instruction for the task

▶documents

`one of`

▶text

`one of`

▶data\[\]

`array`

▶shape\[\]

`array`

## API Schemas

* [ Input ](#tab-panel-3921)
* [ Output ](#tab-panel-3922)

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

Explain Code

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
