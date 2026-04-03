---
title: bge-m3
description: Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 b 

#  bge-m3 

Text Embeddings • baai 

@cf/baai/bge-m3 

Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.

| Model Info                                                                 |                           |
| -------------------------------------------------------------------------- | ------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 60,000 tokens             |
| Unit Pricing                                                               | $0.012 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-1642)
* [  Python ](#tab-panel-1643)
* [  curl ](#tab-panel-1644)

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

\* indicates a required field

### Input

* `0` ` object `  
   * `query` ` string ` min 1  
   A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts  
   * `contexts` ` array ` required  
   List of provided contexts. Note that the index in this array is important, as the response will refer to it.  
         * `items` ` object `  
                  * `text` ` string ` min 1  
                  One of the provided context content  
   * `truncate_inputs` ` boolean `  
   When provided with too long context should the model error out or truncate the context to fit?
* `1` ` object `  
   * `text` ` one of ` required  
         * `0` ` string ` min 1  
         The text to embed  
         * `1` ` array `  
         Batch of text values to embed  
                  * `items` ` string ` min 1  
                  The text to embed  
   * `truncate_inputs` ` boolean `  
   When provided with too long context should the model error out or truncate the context to fit?
* `2` ` object `  
   * `requests` ` array ` required  
   Batch of the embeddings requests to run using async-queue  
         * `items` ` one of `  
                  * `0` ` object `  
                              * `query` ` string ` min 1  
                              A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts  
                              * `contexts` ` array ` required  
                              List of provided contexts. Note that the index in this array is important, as the response will refer to it.  
                                             * `items` ` object `  
                                                               * `text` ` string ` min 1  
                                                               One of the provided context content  
                              * `truncate_inputs` ` boolean `  
                              When provided with too long context should the model error out or truncate the context to fit?  
                  * `1` ` object `  
                              * `text` ` one of ` required  
                                             * `0` ` string ` min 1  
                                             The text to embed  
                                             * `1` ` array `  
                                             Batch of text values to embed  
                                                               * `items` ` string ` min 1  
                                                               The text to embed  
                              * `truncate_inputs` ` boolean `  
                              When provided with too long context should the model error out or truncate the context to fit?

### Output

* `0` ` object `  
   * `response` ` array `  
         * `items` ` object `  
                  * `id` ` integer `  
                  Index of the context in the request  
                  * `score` ` number `  
                  Score of the context under the index.
* `1` ` object `  
   * `response` ` array `  
         * `items` ` array `  
                  * `items` ` number `  
   * `shape` ` array `  
         * `items` ` number `  
   * `pooling` ` string `  
   The pooling method used in the embedding process.
* `2` ` object `  
   * `shape` ` array `  
         * `items` ` number `  
   * `data` ` array `  
   Embeddings of the requested text values  
         * `items` ` array `  
         Floating point embedding representation shaped by the embedding model  
                  * `items` ` number `  
   * `pooling` ` string `  
   The pooling method used in the embedding process.
* `3` ` object `  
   * `request_id` ` string `  
   The async request id that can be used to obtain the results.

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1645)
* [ Output ](#tab-panel-1646)

```

{

    "type": "object",

    "oneOf": [

        {

            "title": "Input Query and Contexts",

            "properties": {

                "query": {

                    "type": "string",

                    "minLength": 1,

                    "description": "A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts"

                },

                "contexts": {

                    "type": "array",

                    "items": {

                        "type": "object",

                        "properties": {

                            "text": {

                                "type": "string",

                                "minLength": 1,

                                "description": "One of the provided context content"

                            }

                        }

                    },

                    "description": "List of provided contexts. Note that the index in this array is important, as the response will refer to it."

                },

                "truncate_inputs": {

                    "type": "boolean",

                    "default": false,

                    "description": "When provided with too long context should the model error out or truncate the context to fit?"

                }

            },

            "required": [

                "contexts"

            ]

        },

        {

            "title": "Input Embedding",

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

                "truncate_inputs": {

                    "type": "boolean",

                    "default": false,

                    "description": "When provided with too long context should the model error out or truncate the context to fit?"

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

                        "type": "object",

                        "oneOf": [

                            {

                                "title": "Input Query and Contexts",

                                "properties": {

                                    "query": {

                                        "type": "string",

                                        "minLength": 1,

                                        "description": "A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts"

                                    },

                                    "contexts": {

                                        "type": "array",

                                        "items": {

                                            "type": "object",

                                            "properties": {

                                                "text": {

                                                    "type": "string",

                                                    "minLength": 1,

                                                    "description": "One of the provided context content"

                                                }

                                            }

                                        },

                                        "description": "List of provided contexts. Note that the index in this array is important, as the response will refer to it."

                                    },

                                    "truncate_inputs": {

                                        "type": "boolean",

                                        "default": false,

                                        "description": "When provided with too long context should the model error out or truncate the context to fit?"

                                    }

                                },

                                "required": [

                                    "contexts"

                                ]

                            },

                            {

                                "title": "Input Embedding",

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

                                    "truncate_inputs": {

                                        "type": "boolean",

                                        "default": false,

                                        "description": "When provided with too long context should the model error out or truncate the context to fit?"

                                    }

                                },

                                "required": [

                                    "text"

                                ]

                            }

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

    "type": "object",

    "contentType": "application/json",

    "oneOf": [

        {

            "title": "Output Query",

            "properties": {

                "response": {

                    "type": "array",

                    "items": {

                        "type": "object",

                        "properties": {

                            "id": {

                                "type": "integer",

                                "description": "Index of the context in the request"

                            },

                            "score": {

                                "type": "number",

                                "description": "Score of the context under the index."

                            }

                        }

                    }

                }

            }

        },

        {

            "title": "Output Embedding for Contexts",

            "properties": {

                "response": {

                    "type": "array",

                    "items": {

                        "type": "array",

                        "items": {

                            "type": "number"

                        }

                    }

                },

                "shape": {

                    "type": "array",

                    "items": {

                        "type": "number"

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

            "title": "Output Embedding",

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
