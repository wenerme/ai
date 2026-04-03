---
title: plamo-embedding-1b
description: PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc.

It can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 p 

#  plamo-embedding-1b 

Text Embeddings • pfnet 

@cf/pfnet/plamo-embedding-1b 

PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc. It can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.

| Model Info   |                           |
| ------------ | ------------------------- |
| Unit Pricing | $0.019 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-1993)
* [  Python ](#tab-panel-1994)
* [  curl ](#tab-panel-1995)

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

      "@cf/pfnet/plamo-embedding-1b",

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/pfnet/plamo-embedding-1b",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/pfnet/plamo-embedding-1b  \

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
   * `0` ` string `  
   Input text to embed. Can be a single string or a list of strings.  
   * `1` ` array `  
   Input text to embed. Can be a single string or a list of strings.  
         * `items` ` string `

### Output

* `data` ` array ` required  
Embedding vectors, where each vector is a list of floats.  
   * `items` ` array `  
         * `items` ` number `
* `shape` ` array ` required  
Shape of the embedding data as \[number\_of\_embeddings, embedding\_dimension\].  
   * `items` ` integer `

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1996)
* [ Output ](#tab-panel-1997)

```

{

    "type": "object",

    "properties": {

        "text": {

            "oneOf": [

                {

                    "type": "string"

                },

                {

                    "type": "array",

                    "items": {

                        "type": "string"

                    }

                }

            ],

            "description": "Input text to embed. Can be a single string or a list of strings."

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

    "properties": {

        "data": {

            "type": "array",

            "items": {

                "type": "array",

                "items": {

                    "type": "number"

                }

            },

            "description": "Embedding vectors, where each vector is a list of floats."

        },

        "shape": {

            "type": "array",

            "items": {

                "type": "integer"

            },

            "minItems": 2,

            "maxItems": 2,

            "description": "Shape of the embedding data as [number_of_embeddings, embedding_dimension]."

        }

    },

    "required": [

        "data",

        "shape"

    ]

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
