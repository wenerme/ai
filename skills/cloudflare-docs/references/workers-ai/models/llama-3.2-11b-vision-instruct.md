---
title: llama-3.2-11b-vision-instruct
description:  The Llama 3.2-Vision instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Meta logo](https://developers.cloudflare.com/_astro/meta.x5nlFKBG.svg) 

#  llama-3.2-11b-vision-instruct 

Text Generation • Meta 

@cf/meta/llama-3.2-11b-vision-instruct 

 The Llama 3.2-Vision instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image.

Note 

To use Llama 3.2 11b Vision Instruct, you need to agree to the [Meta License](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F2/LICENSE)and [Acceptable Use Policy](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F2/USE%5FPOLICY.md). To do so, please send an initial request to`@cf/meta/llama-3.2-11b-vision-instruct` with`"prompt" : "agree"`. After that, you'll be able to use the model as normal.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.2-11b-vision-instruct \

   -X POST \

   -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

   -d '{ "prompt": "agree"}'


```

| Model Info                                                                 |                                                                                          |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                           |
| Terms and License                                                          | [link ↗](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F2/LICENSE) |
| Vision                                                                     | Yes                                                                                      |
| LoRA                                                                       | Yes                                                                                      |
| Unit Pricing                                                               | $0.049 per M input tokens, $0.68 per M output tokens                                     |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-3.2-11b-vision-instruct) 

## Usage

* [  Worker (Streaming) ](#tab-panel-1865)
* [  TypeScript ](#tab-panel-1866)
* [  Python ](#tab-panel-1867)
* [  curl ](#tab-panel-1868)

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


    const stream = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {

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

    const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", { messages });


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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.2-11b-vision-instruct",

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

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.2-11b-vision-instruct \

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
   * `prompt` ` string ` required min 1 max 131072  
   The input text prompt for the model to generate a response.  
   * `image` ` one of `  
         * `0` ` array `  
         An array of integers that represent the image data constrained to 8-bit unsigned integer values. Deprecated, use image as a part of messages now.  
                  * `items` ` number `  
                  A value between 0 and 255  
         * `1` ` string `  
         Binary string representing the image contents. Deprecated, use image as a part of messages now.  
   * `raw` ` boolean `  
   If true, a chat template is not applied and you must adhere to the specific model's expected formatting.  
   * `stream` ` boolean `  
   If true, the response will be streamed back incrementally using SSE, Server Sent Events.  
   * `max_tokens` ` integer ` default 256  
   The maximum number of tokens to generate in the response.  
   * `temperature` ` number ` default 0.6 min 0 max 5  
   Controls the randomness of the output; higher values produce more random results.  
   * `top_p` ` number ` min 0 max 2  
   Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.  
   * `top_k` ` integer ` min 1 max 50  
   Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.  
   * `seed` ` integer ` min 1 max 9999999999  
   Random seed for reproducibility of the generation.  
   * `repetition_penalty` ` number ` min 0 max 2  
   Penalty for repeated tokens; higher values discourage repetition.  
   * `frequency_penalty` ` number ` min 0 max 2  
   Decreases the likelihood of the model repeating the same lines verbatim.  
   * `presence_penalty` ` number ` min 0 max 2  
   Increases the likelihood of the model introducing new topics.  
   * `lora` ` string `  
   Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
* `1` ` object `  
   * `messages` ` array ` required  
   An array of message objects representing the conversation history.  
         * `items` ` object `  
                  * `role` ` string `  
                  The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').  
                  * `tool_call_id` ` string `  
                  The tool call id. If you don't know what to put here you can fall back to 000000001  
                  * `content` ` one of `  
                              * `0` ` string `  
                              The content of the message as a string.  
                              * `1` ` array `  
                                             * `items` ` object `  
                                                               * `type` ` string `  
                                                               Type of the content provided  
                                                               * `text` ` string `  
                                                               * `image_url` ` object `  
                                                                                    * `url` ` string `  
                                                                                    image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted  
                              * `2` ` object `  
                                             * `type` ` string `  
                                             Type of the content provided  
                                             * `text` ` string `  
                                             * `image_url` ` object `  
                                                               * `url` ` string `  
                                                               image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted  
   * `image` ` one of `  
         * `0` ` array `  
         An array of integers that represent the image data constrained to 8-bit unsigned integer values. Deprecated, use image as a part of messages now.  
                  * `items` ` number `  
                  A value between 0 and 255  
         * `1` ` string `  
         Binary string representing the image contents. Deprecated, use image as a part of messages now.  
   * `functions` ` array `  
         * `items` ` object `  
                  * `name` ` string ` required  
                  * `code` ` string ` required  
   * `tools` ` array `  
   A list of tools available for the assistant to use.  
         * `items` ` one of `  
                  * `0` ` object `  
                              * `name` ` string ` required  
                              The name of the tool. More descriptive the better.  
                              * `description` ` string ` required  
                              A brief description of what the tool does.  
                              * `parameters` ` object ` required  
                              Schema defining the parameters accepted by the tool.  
                                             * `type` ` string ` required  
                                             The type of the parameters object (usually 'object').  
                                             * `required` ` array `  
                                             List of required parameter names.  
                                                               * `items` ` string `  
                                             * `properties` ` object ` required  
                                             Definitions of each parameter.  
                                                               * `additionalProperties` ` object `  
                                                                                    * `type` ` string ` required  
                                                                                    The data type of the parameter.  
                                                                                    * `description` ` string ` required  
                                                                                    A description of the expected parameter.  
                  * `1` ` object `  
                              * `type` ` string ` required  
                              Specifies the type of tool (e.g., 'function').  
                              * `function` ` object ` required  
                              Details of the function tool.  
                                             * `name` ` string ` required  
                                             The name of the function.  
                                             * `description` ` string ` required  
                                             A brief description of what the function does.  
                                             * `parameters` ` object ` required  
                                             Schema defining the parameters accepted by the function.  
                                                               * `type` ` string ` required  
                                                               The type of the parameters object (usually 'object').  
                                                               * `required` ` array `  
                                                               List of required parameter names.  
                                                                                    * `items` ` string `  
                                                               * `properties` ` object ` required  
                                                               Definitions of each parameter.  
                                                                                    * `additionalProperties` ` object `  
                                                                                                            * `type` ` string ` required  
                                                                                                            The data type of the parameter.  
                                                                                                            * `description` ` string ` required  
                                                                                                            A description of the expected parameter.  
   * `stream` ` boolean `  
   If true, the response will be streamed back incrementally.  
   * `max_tokens` ` integer ` default 256  
   The maximum number of tokens to generate in the response.  
   * `temperature` ` number ` default 0.6 min 0 max 5  
   Controls the randomness of the output; higher values produce more random results.  
   * `top_p` ` number ` min 0 max 2  
   Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.  
   * `top_k` ` integer ` min 1 max 50  
   Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.  
   * `seed` ` integer ` min 1 max 9999999999  
   Random seed for reproducibility of the generation.  
   * `repetition_penalty` ` number ` min 0 max 2  
   Penalty for repeated tokens; higher values discourage repetition.  
   * `frequency_penalty` ` number ` min 0 max 2  
   Decreases the likelihood of the model repeating the same lines verbatim.  
   * `presence_penalty` ` number ` min 0 max 2  
   Increases the likelihood of the model introducing new topics.

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

* [ Input ](#tab-panel-1869)
* [ Output ](#tab-panel-1870)

```

{

    "type": "object",

    "oneOf": [

        {

            "title": "Prompt",

            "properties": {

                "prompt": {

                    "type": "string",

                    "minLength": 1,

                    "maxLength": 131072,

                    "description": "The input text prompt for the model to generate a response."

                },

                "image": {

                    "oneOf": [

                        {

                            "type": "array",

                            "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values.  Deprecated, use image as a part of messages now.",

                            "items": {

                                "type": "number",

                                "description": "A value between 0 and 255"

                            }

                        },

                        {

                            "type": "string",

                            "format": "binary",

                            "description": "Binary string representing the image contents.  Deprecated, use image as a part of messages now."

                        }

                    ]

                },

                "raw": {

                    "type": "boolean",

                    "default": false,

                    "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."

                },

                "stream": {

                    "type": "boolean",

                    "default": false,

                    "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."

                },

                "max_tokens": {

                    "type": "integer",

                    "default": 256,

                    "description": "The maximum number of tokens to generate in the response."

                },

                "temperature": {

                    "type": "number",

                    "default": 0.6,

                    "minimum": 0,

                    "maximum": 5,

                    "description": "Controls the randomness of the output; higher values produce more random results."

                },

                "top_p": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

                },

                "top_k": {

                    "type": "integer",

                    "minimum": 1,

                    "maximum": 50,

                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

                },

                "seed": {

                    "type": "integer",

                    "minimum": 1,

                    "maximum": 9999999999,

                    "description": "Random seed for reproducibility of the generation."

                },

                "repetition_penalty": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Penalty for repeated tokens; higher values discourage repetition."

                },

                "frequency_penalty": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."

                },

                "presence_penalty": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Increases the likelihood of the model introducing new topics."

                },

                "lora": {

                    "type": "string",

                    "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."

                }

            },

            "required": [

                "prompt"

            ]

        },

        {

            "title": "Messages",

            "properties": {

                "messages": {

                    "type": "array",

                    "description": "An array of message objects representing the conversation history.",

                    "items": {

                        "type": "object",

                        "properties": {

                            "role": {

                                "type": "string",

                                "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."

                            },

                            "tool_call_id": {

                                "type": "string",

                                "description": "The tool call id. If you don't know what to put here you can fall back to 000000001"

                            },

                            "content": {

                                "oneOf": [

                                    {

                                        "type": "string",

                                        "description": "The content of the message as a string."

                                    },

                                    {

                                        "type": "array",

                                        "items": {

                                            "type": "object",

                                            "properties": {

                                                "type": {

                                                    "type": "string",

                                                    "description": "Type of the content provided"

                                                },

                                                "text": {

                                                    "type": "string"

                                                },

                                                "image_url": {

                                                    "type": "object",

                                                    "properties": {

                                                        "url": {

                                                            "type": "string",

                                                            "pattern": "^data:*",

                                                            "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    },

                                    {

                                        "type": "object",

                                        "properties": {

                                            "type": {

                                                "type": "string",

                                                "description": "Type of the content provided"

                                            },

                                            "text": {

                                                "type": "string"

                                            },

                                            "image_url": {

                                                "type": "object",

                                                "properties": {

                                                    "url": {

                                                        "type": "string",

                                                        "pattern": "^data:*",

                                                        "description": "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted"

                                                    }

                                                }

                                            }

                                        }

                                    }

                                ]

                            }

                        }

                    }

                },

                "image": {

                    "oneOf": [

                        {

                            "type": "array",

                            "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values. Deprecated, use image as a part of messages now.",

                            "items": {

                                "type": "number",

                                "description": "A value between 0 and 255"

                            }

                        },

                        {

                            "type": "string",

                            "format": "binary",

                            "description": "Binary string representing the image contents. Deprecated, use image as a part of messages now."

                        }

                    ]

                },

                "functions": {

                    "type": "array",

                    "items": {

                        "type": "object",

                        "properties": {

                            "name": {

                                "type": "string"

                            },

                            "code": {

                                "type": "string"

                            }

                        },

                        "required": [

                            "name",

                            "code"

                        ]

                    }

                },

                "tools": {

                    "type": "array",

                    "description": "A list of tools available for the assistant to use.",

                    "items": {

                        "type": "object",

                        "oneOf": [

                            {

                                "properties": {

                                    "name": {

                                        "type": "string",

                                        "description": "The name of the tool. More descriptive the better."

                                    },

                                    "description": {

                                        "type": "string",

                                        "description": "A brief description of what the tool does."

                                    },

                                    "parameters": {

                                        "type": "object",

                                        "description": "Schema defining the parameters accepted by the tool.",

                                        "properties": {

                                            "type": {

                                                "type": "string",

                                                "description": "The type of the parameters object (usually 'object')."

                                            },

                                            "required": {

                                                "type": "array",

                                                "description": "List of required parameter names.",

                                                "items": {

                                                    "type": "string"

                                                }

                                            },

                                            "properties": {

                                                "type": "object",

                                                "description": "Definitions of each parameter.",

                                                "additionalProperties": {

                                                    "type": "object",

                                                    "properties": {

                                                        "type": {

                                                            "type": "string",

                                                            "description": "The data type of the parameter."

                                                        },

                                                        "description": {

                                                            "type": "string",

                                                            "description": "A description of the expected parameter."

                                                        }

                                                    },

                                                    "required": [

                                                        "type",

                                                        "description"

                                                    ]

                                                }

                                            }

                                        },

                                        "required": [

                                            "type",

                                            "properties"

                                        ]

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

                                    "type": {

                                        "type": "string",

                                        "description": "Specifies the type of tool (e.g., 'function')."

                                    },

                                    "function": {

                                        "type": "object",

                                        "description": "Details of the function tool.",

                                        "properties": {

                                            "name": {

                                                "type": "string",

                                                "description": "The name of the function."

                                            },

                                            "description": {

                                                "type": "string",

                                                "description": "A brief description of what the function does."

                                            },

                                            "parameters": {

                                                "type": "object",

                                                "description": "Schema defining the parameters accepted by the function.",

                                                "properties": {

                                                    "type": {

                                                        "type": "string",

                                                        "description": "The type of the parameters object (usually 'object')."

                                                    },

                                                    "required": {

                                                        "type": "array",

                                                        "description": "List of required parameter names.",

                                                        "items": {

                                                            "type": "string"

                                                        }

                                                    },

                                                    "properties": {

                                                        "type": "object",

                                                        "description": "Definitions of each parameter.",

                                                        "additionalProperties": {

                                                            "type": "object",

                                                            "properties": {

                                                                "type": {

                                                                    "type": "string",

                                                                    "description": "The data type of the parameter."

                                                                },

                                                                "description": {

                                                                    "type": "string",

                                                                    "description": "A description of the expected parameter."

                                                                }

                                                            },

                                                            "required": [

                                                                "type",

                                                                "description"

                                                            ]

                                                        }

                                                    }

                                                },

                                                "required": [

                                                    "type",

                                                    "properties"

                                                ]

                                            }

                                        },

                                        "required": [

                                            "name",

                                            "description",

                                            "parameters"

                                        ]

                                    }

                                },

                                "required": [

                                    "type",

                                    "function"

                                ]

                            }

                        ]

                    }

                },

                "stream": {

                    "type": "boolean",

                    "default": false,

                    "description": "If true, the response will be streamed back incrementally."

                },

                "max_tokens": {

                    "type": "integer",

                    "default": 256,

                    "description": "The maximum number of tokens to generate in the response."

                },

                "temperature": {

                    "type": "number",

                    "default": 0.6,

                    "minimum": 0,

                    "maximum": 5,

                    "description": "Controls the randomness of the output; higher values produce more random results."

                },

                "top_p": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

                },

                "top_k": {

                    "type": "integer",

                    "minimum": 1,

                    "maximum": 50,

                    "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

                },

                "seed": {

                    "type": "integer",

                    "minimum": 1,

                    "maximum": 9999999999,

                    "description": "Random seed for reproducibility of the generation."

                },

                "repetition_penalty": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Penalty for repeated tokens; higher values discourage repetition."

                },

                "frequency_penalty": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Decreases the likelihood of the model repeating the same lines verbatim."

                },

                "presence_penalty": {

                    "type": "number",

                    "minimum": 0,

                    "maximum": 2,

                    "description": "Increases the likelihood of the model introducing new topics."

                }

            },

            "required": [

                "messages"

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

                "response": {

                    "type": "string",

                    "description": "The generated text response from the model"

                },

                "tool_calls": {

                    "type": "array",

                    "description": "An array of tool calls requests made during the response generation",

                    "items": {

                        "type": "object",

                        "properties": {

                            "arguments": {

                                "type": "object",

                                "description": "The arguments passed to be passed to the tool call request"

                            },

                            "name": {

                                "type": "string",

                                "description": "The name of the tool to be called"

                            }

                        }

                    }

                }

            }

        },

        {

            "type": "string",

            "contentType": "text/event-stream",

            "format": "binary"

        }

    ]

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
