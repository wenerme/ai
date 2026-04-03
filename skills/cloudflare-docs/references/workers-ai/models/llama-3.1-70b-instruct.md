---
title: llama-3.1-70b-instruct
description: The Meta Llama 3.1 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction tuned generative models. The Llama 3.1 instruction tuned text only models are optimized for multilingual dialogue use cases and outperform many of the available open source and closed chat models on common industry benchmarks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Meta logo](https://developers.cloudflare.com/_astro/meta.x5nlFKBG.svg) 

#  llama-3.1-70b-instruct 

Text Generation • Meta 

@cf/meta/llama-3.1-70b-instruct 

The Meta Llama 3.1 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction tuned generative models. The Llama 3.1 instruction tuned text only models are optimized for multilingual dialogue use cases and outperform many of the available open source and closed chat models on common industry benchmarks.

| Model Info                                                                 |                                                                                          |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 24,000 tokens                                                                            |
| Terms and License                                                          | [link ↗](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F1/LICENSE) |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-3.1-70b-instruct) 

## Usage

* [  Worker (Streaming) ](#tab-panel-1835)
* [  TypeScript ](#tab-panel-1836)
* [  Python ](#tab-panel-1837)
* [  curl ](#tab-panel-1838)

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const messages = [

      { role: "system", content: "You are a friendly assistant" },

      {

        role: "user",

        content: "What is the origin of the phrase Hello, World",

      },

    ];


    const stream = await env.AI.run("@cf/meta/llama-3.1-70b-instruct", {

      messages,

      stream: true,

    });


    return new Response(stream, {

      headers: { "content-type": "text/event-stream" },

    });

  },

} satisfies ExportedHandler<Env>;


```

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const messages = [

      { role: "system", content: "You are a friendly assistant" },

      {

        role: "user",

        content: "What is the origin of the phrase Hello, World",

      },

    ];

    const response = await env.AI.run("@cf/meta/llama-3.1-70b-instruct", { messages });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

```

import os

import requests


ACCOUNT_ID = "your-account-id"

AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


prompt = "Tell me all about PEP-8"

response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-70b-instruct",

    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

    json={

      "messages": [

        {"role": "system", "content": "You are a friendly assistant"},

        {"role": "user", "content": prompt}

      ]

    }

)

result = response.json()

print(result)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.1-70b-instruct \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

\* indicates a required field

### Input

* `0` ` object `  
   * `frequency_penalty` ` number ` min 0 max 2  
   Decreases the likelihood of the model repeating the same lines verbatim.  
   * `image` ` one of `  
         * `0` ` array `  
         An array of integers that represent the image data constrained to 8-bit unsigned integer values  
                  * `items` ` number `  
                  A value between 0 and 255  
         * `1` ` string `  
         Binary string representing the image contents.  
   * `lora` ` string `  
   Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.  
   * `max_tokens` ` integer ` default 256  
   The maximum number of tokens to generate in the response.  
   * `presence_penalty` ` number ` min 0 max 2  
   Increases the likelihood of the model introducing new topics.  
   * `prompt` ` string ` required min 1 max 131072  
   The input text prompt for the model to generate a response.  
   * `raw` ` boolean `  
   If true, a chat template is not applied and you must adhere to the specific model's expected formatting.  
   * `repetition_penalty` ` number ` min 0 max 2  
   Penalty for repeated tokens; higher values discourage repetition.  
   * `seed` ` integer ` min 1 max 9999999999  
   Random seed for reproducibility of the generation.  
   * `stream` ` boolean `  
   If true, the response will be streamed back incrementally using SSE, Server Sent Events.  
   * `temperature` ` number ` default 0.6 min 0 max 5  
   Controls the randomness of the output; higher values produce more random results.  
   * `top_k` ` integer ` min 1 max 50  
   Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.  
   * `top_p` ` number ` min 0 max 2  
   Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
* `1` ` object `  
   * `frequency_penalty` ` number ` min 0 max 2  
   Decreases the likelihood of the model repeating the same lines verbatim.  
   * `functions` ` array `  
         * `items` ` object `  
                  * `code` ` string ` required  
                  * `name` ` string ` required  
   * `image` ` one of `  
         * `0` ` array `  
         An array of integers that represent the image data constrained to 8-bit unsigned integer values  
                  * `items` ` number `  
                  A value between 0 and 255  
         * `1` ` string `  
         Binary string representing the image contents.  
   * `max_tokens` ` integer ` default 256  
   The maximum number of tokens to generate in the response.  
   * `messages` ` array ` required  
   An array of message objects representing the conversation history.  
         * `items` ` object `  
                  * `content` ` string ` required max 131072  
                  The content of the message as a string.  
                  * `role` ` string ` required  
                  The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').  
   * `presence_penalty` ` number ` min 0 max 2  
   Increases the likelihood of the model introducing new topics.  
   * `repetition_penalty` ` number ` min 0 max 2  
   Penalty for repeated tokens; higher values discourage repetition.  
   * `seed` ` integer ` min 1 max 9999999999  
   Random seed for reproducibility of the generation.  
   * `stream` ` boolean `  
   If true, the response will be streamed back incrementally.  
   * `temperature` ` number ` default 0.6 min 0 max 5  
   Controls the randomness of the output; higher values produce more random results.  
   * `tools` ` array `  
   A list of tools available for the assistant to use.  
         * `items` ` one of `  
                  * `0` ` object `  
                              * `description` ` string ` required  
                              A brief description of what the tool does.  
                              * `name` ` string ` required  
                              The name of the tool. More descriptive the better.  
                              * `parameters` ` object ` required  
                              Schema defining the parameters accepted by the tool.  
                                             * `properties` ` object ` required  
                                             Definitions of each parameter.  
                                                               * `additionalProperties` ` object `  
                                                                                    * `description` ` string ` required  
                                                                                    A description of the expected parameter.  
                                                                                    * `type` ` string ` required  
                                                                                    The data type of the parameter.  
                                             * `required` ` array `  
                                             List of required parameter names.  
                                                               * `items` ` string `  
                                             * `type` ` string ` required  
                                             The type of the parameters object (usually 'object').  
                  * `1` ` object `  
                              * `function` ` object ` required  
                              Details of the function tool.  
                                             * `description` ` string ` required  
                                             A brief description of what the function does.  
                                             * `name` ` string ` required  
                                             The name of the function.  
                                             * `parameters` ` object ` required  
                                             Schema defining the parameters accepted by the function.  
                                                               * `properties` ` object ` required  
                                                               Definitions of each parameter.  
                                                                                    * `additionalProperties` ` object `  
                                                                                                            * `description` ` string ` required  
                                                                                                            A description of the expected parameter.  
                                                                                                            * `type` ` string ` required  
                                                                                                            The data type of the parameter.  
                                                               * `required` ` array `  
                                                               List of required parameter names.  
                                                                                    * `items` ` string `  
                                                               * `type` ` string ` required  
                                                               The type of the parameters object (usually 'object').  
                              * `type` ` string ` required  
                              Specifies the type of tool (e.g., 'function').  
   * `top_k` ` integer ` min 1 max 50  
   Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.  
   * `top_p` ` number ` min 0 max 2  
   Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

### Output

* `0` ` object `  
   * `response` ` string `  
   The generated text response from the model  
   * `tool_calls` ` array `  
   An array of tool calls requests made during the response generation  
         * `items` ` object `  
                  * `arguments` ` object `  
                  The arguments passed to be passed to the tool call request  
                  * `name` ` string `  
                  The name of the tool to be called
* `1` ` string `

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1839)
* [ Output ](#tab-panel-1840)

```

{

    "oneOf": [

        {

            "properties": {

                "frequency_penalty": {

                    "description": "Decreases the likelihood of the model repeating the same lines verbatim.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                },

                "image": {

                    "oneOf": [

                        {

                            "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",

                            "items": {

                                "description": "A value between 0 and 255",

                                "type": "number"

                            },

                            "type": "array"

                        },

                        {

                            "description": "Binary string representing the image contents.",

                            "format": "binary",

                            "type": "string"

                        }

                    ]

                },

                "lora": {

                    "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.",

                    "type": "string"

                },

                "max_tokens": {

                    "default": 256,

                    "description": "The maximum number of tokens to generate in the response.",

                    "type": "integer"

                },

                "presence_penalty": {

                    "description": "Increases the likelihood of the model introducing new topics.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                },

                "prompt": {

                    "description": "The input text prompt for the model to generate a response.",

                    "maxLength": 131072,

                    "minLength": 1,

                    "type": "string"

                },

                "raw": {

                    "default": false,

                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",

                    "type": "boolean"

                },

                "repetition_penalty": {

                    "description": "Penalty for repeated tokens; higher values discourage repetition.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                },

                "seed": {

                    "description": "Random seed for reproducibility of the generation.",

                    "maximum": 9999999999,

                    "minimum": 1,

                    "type": "integer"

                },

                "stream": {

                    "default": false,

                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",

                    "type": "boolean"

                },

                "temperature": {

                    "default": 0.6,

                    "description": "Controls the randomness of the output; higher values produce more random results.",

                    "maximum": 5,

                    "minimum": 0,

                    "type": "number"

                },

                "top_k": {

                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",

                    "maximum": 50,

                    "minimum": 1,

                    "type": "integer"

                },

                "top_p": {

                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                }

            },

            "required": [

                "prompt"

            ],

            "title": "Prompt"

        },

        {

            "properties": {

                "frequency_penalty": {

                    "description": "Decreases the likelihood of the model repeating the same lines verbatim.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                },

                "functions": {

                    "items": {

                        "properties": {

                            "code": {

                                "type": "string"

                            },

                            "name": {

                                "type": "string"

                            }

                        },

                        "required": [

                            "name",

                            "code"

                        ],

                        "type": "object"

                    },

                    "type": "array"

                },

                "image": {

                    "oneOf": [

                        {

                            "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",

                            "items": {

                                "description": "A value between 0 and 255",

                                "type": "number"

                            },

                            "type": "array"

                        },

                        {

                            "description": "Binary string representing the image contents.",

                            "format": "binary",

                            "type": "string"

                        }

                    ]

                },

                "max_tokens": {

                    "default": 256,

                    "description": "The maximum number of tokens to generate in the response.",

                    "type": "integer"

                },

                "messages": {

                    "description": "An array of message objects representing the conversation history.",

                    "items": {

                        "properties": {

                            "content": {

                                "description": "The content of the message as a string.",

                                "maxLength": 131072,

                                "type": "string"

                            },

                            "role": {

                                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",

                                "type": "string"

                            }

                        },

                        "required": [

                            "role",

                            "content"

                        ],

                        "type": "object"

                    },

                    "type": "array"

                },

                "presence_penalty": {

                    "description": "Increases the likelihood of the model introducing new topics.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                },

                "repetition_penalty": {

                    "description": "Penalty for repeated tokens; higher values discourage repetition.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                },

                "seed": {

                    "description": "Random seed for reproducibility of the generation.",

                    "maximum": 9999999999,

                    "minimum": 1,

                    "type": "integer"

                },

                "stream": {

                    "default": false,

                    "description": "If true, the response will be streamed back incrementally.",

                    "type": "boolean"

                },

                "temperature": {

                    "default": 0.6,

                    "description": "Controls the randomness of the output; higher values produce more random results.",

                    "maximum": 5,

                    "minimum": 0,

                    "type": "number"

                },

                "tools": {

                    "description": "A list of tools available for the assistant to use.",

                    "items": {

                        "oneOf": [

                            {

                                "properties": {

                                    "description": {

                                        "description": "A brief description of what the tool does.",

                                        "type": "string"

                                    },

                                    "name": {

                                        "description": "The name of the tool. More descriptive the better.",

                                        "type": "string"

                                    },

                                    "parameters": {

                                        "description": "Schema defining the parameters accepted by the tool.",

                                        "properties": {

                                            "properties": {

                                                "additionalProperties": {

                                                    "properties": {

                                                        "description": {

                                                            "description": "A description of the expected parameter.",

                                                            "type": "string"

                                                        },

                                                        "type": {

                                                            "description": "The data type of the parameter.",

                                                            "type": "string"

                                                        }

                                                    },

                                                    "required": [

                                                        "type",

                                                        "description"

                                                    ],

                                                    "type": "object"

                                                },

                                                "description": "Definitions of each parameter.",

                                                "type": "object"

                                            },

                                            "required": {

                                                "description": "List of required parameter names.",

                                                "items": {

                                                    "type": "string"

                                                },

                                                "type": "array"

                                            },

                                            "type": {

                                                "description": "The type of the parameters object (usually 'object').",

                                                "type": "string"

                                            }

                                        },

                                        "required": [

                                            "type",

                                            "properties"

                                        ],

                                        "type": "object"

                                    }

                                },

                                "required": [

                                    "name",

                                    "description",

                                    "parameters"

                                ]

                            },

                            {

                                "properties": {

                                    "function": {

                                        "description": "Details of the function tool.",

                                        "properties": {

                                            "description": {

                                                "description": "A brief description of what the function does.",

                                                "type": "string"

                                            },

                                            "name": {

                                                "description": "The name of the function.",

                                                "type": "string"

                                            },

                                            "parameters": {

                                                "description": "Schema defining the parameters accepted by the function.",

                                                "properties": {

                                                    "properties": {

                                                        "additionalProperties": {

                                                            "properties": {

                                                                "description": {

                                                                    "description": "A description of the expected parameter.",

                                                                    "type": "string"

                                                                },

                                                                "type": {

                                                                    "description": "The data type of the parameter.",

                                                                    "type": "string"

                                                                }

                                                            },

                                                            "required": [

                                                                "type",

                                                                "description"

                                                            ],

                                                            "type": "object"

                                                        },

                                                        "description": "Definitions of each parameter.",

                                                        "type": "object"

                                                    },

                                                    "required": {

                                                        "description": "List of required parameter names.",

                                                        "items": {

                                                            "type": "string"

                                                        },

                                                        "type": "array"

                                                    },

                                                    "type": {

                                                        "description": "The type of the parameters object (usually 'object').",

                                                        "type": "string"

                                                    }

                                                },

                                                "required": [

                                                    "type",

                                                    "properties"

                                                ],

                                                "type": "object"

                                            }

                                        },

                                        "required": [

                                            "name",

                                            "description",

                                            "parameters"

                                        ],

                                        "type": "object"

                                    },

                                    "type": {

                                        "description": "Specifies the type of tool (e.g., 'function').",

                                        "type": "string"

                                    }

                                },

                                "required": [

                                    "type",

                                    "function"

                                ]

                            }

                        ],

                        "type": "object"

                    },

                    "type": "array"

                },

                "top_k": {

                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",

                    "maximum": 50,

                    "minimum": 1,

                    "type": "integer"

                },

                "top_p": {

                    "description": "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",

                    "maximum": 2,

                    "minimum": 0,

                    "type": "number"

                }

            },

            "required": [

                "messages"

            ],

            "title": "Messages"

        }

    ],

    "type": "object"

}


```

```

{

    "oneOf": [

        {

            "contentType": "application/json",

            "properties": {

                "response": {

                    "description": "The generated text response from the model",

                    "type": "string"

                },

                "tool_calls": {

                    "description": "An array of tool calls requests made during the response generation",

                    "items": {

                        "properties": {

                            "arguments": {

                                "description": "The arguments passed to be passed to the tool call request",

                                "type": "object"

                            },

                            "name": {

                                "description": "The name of the tool to be called",

                                "type": "string"

                            }

                        },

                        "type": "object"

                    },

                    "type": "array"

                }

            },

            "type": "object"

        },

        {

            "contentType": "text/event-stream",

            "format": "binary",

            "type": "string"

        }

    ]

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
