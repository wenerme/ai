---
title: bge-base-en-v1.5
description: BAAI general embedding (Base) model that transforms any given text into a 768-dimensional vector
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg) 

#  bge-base-en-v1.5 

Text Embeddings • BAAI • Hosted 

`@cf/baai/bge-base-en-v1.5` 

BAAI general embedding (Base) model that transforms any given text into a 768-dimensional vector

| Model Info                                                                 |                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 153,600 tokens                                         |
| More information                                                           | [link ↗](https://huggingface.co/BAAI/bge-base-en-v1.5) |
| Maximum Input Tokens                                                       | 512                                                    |
| Output Dimensions                                                          | 768                                                    |
| Batch                                                                      | Yes                                                    |
| Unit Pricing                                                               | $0.067 per M input tokens                              |

## Usage

* [  TypeScript ](#tab-panel-2878)
* [  Python ](#tab-panel-2879)
* [  curl ](#tab-panel-2880)

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

      "@cf/baai/bge-base-en-v1.5",

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-base-en-v1.5",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-base-en-v1.5  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-2885)
* [ Output ](#tab-panel-2886)

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

* [ Input ](#tab-panel-2887)
* [ Output ](#tab-panel-2888)

▶requests\[\]

`array`requiredBatch of the embeddings requests to run using async-queue

▶shape\[\]

`array`

▶data\[\]

`array`Embeddings of the requested text values

pooling

`string`enum: mean, clsThe pooling method used in the embedding process.

## API Schemas (Raw)

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-2881)
* [ Output ](#tab-panel-2882)

```

{

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

    },

    "pooling": {

      "type": "string",

      "enum": [

        "mean",

        "cls"

      ],

      "default": "mean",

      "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."

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

    },

    "pooling": {

      "type": "string",

      "enum": [

        "mean",

        "cls"

      ],

      "description": "The pooling method used in the embedding process."

    }

  }

}


```

Explain Code

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-2883)
* [ Output ](#tab-panel-2884)

```

{

  "properties": {

    "requests": {

      "type": "array",

      "description": "Batch of the embeddings requests to run using async-queue",

      "items": {

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

          },

          "pooling": {

            "type": "string",

            "enum": [

              "mean",

              "cls"

            ],

            "default": "mean",

            "description": "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy."

          }

        },

        "required": [

          "text"

        ]

      }

    }

  },

  "required": [

    "requests"

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

    },

    "pooling": {

      "type": "string",

      "enum": [

        "mean",

        "cls"

      ],

      "description": "The pooling method used in the embedding process."

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
