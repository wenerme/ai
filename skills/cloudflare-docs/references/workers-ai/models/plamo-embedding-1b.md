---
title: plamo-embedding-1b
description: PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc.

It can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

 p 

#  plamo-embedding-1b 

Text Embeddings • pfnet • Hosted 

`@cf/pfnet/plamo-embedding-1b` 

PLaMo-Embedding-1B is a Japanese text embedding model developed by Preferred Networks, Inc. It can convert Japanese text input into numerical vectors and can be used for a wide range of applications, including information retrieval, text classification, and clustering.

| Model Info   |                           |
| ------------ | ------------------------- |
| Unit Pricing | $0.019 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-3837)
* [  Python ](#tab-panel-3838)
* [  curl ](#tab-panel-3839)

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/pfnet/plamo-embedding-1b",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Explain Code

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

* [ Input ](#tab-panel-3840)
* [ Output ](#tab-panel-3841)

▶text

`one of`required

▶data\[\]

`array`Embedding vectors, where each vector is a list of floats.

▶shape\[\]

`array`minItems: 2maxItems: 2Shape of the embedding data as \[number\_of\_embeddings, embedding\_dimension\].

## API Schemas

* [ Input ](#tab-panel-3835)
* [ Output ](#tab-panel-3836)

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

Explain Code

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
