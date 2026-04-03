---
title: bge-small-en-v1.5
description: BAAI general embedding (Small) model that transforms any given text into a 384-dimensional vector
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 b 

#  bge-small-en-v1.5 

Text Embeddings • baai 

@cf/baai/bge-small-en-v1.5 

BAAI general embedding (Small) model that transforms any given text into a 384-dimensional vector

| Model Info           |                                                         |
| -------------------- | ------------------------------------------------------- |
| More information     | [link ↗](https://huggingface.co/BAAI/bge-small-en-v1.5) |
| Maximum Input Tokens | 512                                                     |
| Output Dimensions    | 384                                                     |
| Batch                | Yes                                                     |
| Unit Pricing         | $0.02 per M input tokens                                |

## Usage

* [  TypeScript ](#tab-panel-1652)
* [  Python ](#tab-panel-1653)
* [  curl ](#tab-panel-1654)

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

      "@cf/baai/bge-small-en-v1.5",

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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-small-en-v1.5",

  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

  json={"text": stories}

)


print(response.json())


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-small-en-v1.5  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

\* indicates a required field

### Input

* `0` ` object `  
   * `text` ` one of ` required  
         * `0` ` string ` min 1  
         The text to embed  
         * `1` ` array `  
         Batch of text values to embed  
                  * `items` ` string ` min 1  
                  The text to embed  
   * `pooling` ` string ` default mean  
   The pooling method used in the embedding process. \`cls\` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is \`mean\` in order for this to not be a breaking change, but we highly suggest using the new \`cls\` pooling for better accuracy.
* `1` ` object `  
   * `requests` ` array ` required  
   Batch of the embeddings requests to run using async-queue  
         * `items` ` object `  
                  * `text` ` one of ` required  
                              * `0` ` string ` min 1  
                              The text to embed  
                              * `1` ` array `  
                              Batch of text values to embed  
                                             * `items` ` string ` min 1  
                                             The text to embed  
                  * `pooling` ` string ` default mean  
                  The pooling method used in the embedding process. \`cls\` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is \`mean\` in order for this to not be a breaking change, but we highly suggest using the new \`cls\` pooling for better accuracy.

### Output

* `0` ` object `  
   * `shape` ` array `  
         * `items` ` number `  
   * `data` ` array `  
   Embeddings of the requested text values  
         * `items` ` array `  
         Floating point embedding representation shaped by the embedding model  
                  * `items` ` number `  
   * `pooling` ` string `  
   The pooling method used in the embedding process.
* `1` ` object `  
   * `request_id` ` string `  
   The async request id that can be used to obtain the results.

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1655)
* [ Output ](#tab-panel-1656)

```

{

    "type": "object",

    "oneOf": [

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

        },

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

    ]

}


```

```

{

    "oneOf": [

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

        },

        {

            "type": "object",

            "contentType": "application/json",

            "title": "Async response",

            "properties": {

                "request_id": {

                    "type": "string",

                    "description": "The async request id that can be used to obtain the results."

                }

            }

        }

    ]

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
