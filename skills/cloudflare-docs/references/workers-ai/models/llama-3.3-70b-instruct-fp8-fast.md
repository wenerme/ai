---
title: llama-3.3-70b-instruct-fp8-fast
description: Llama 3.3 70B quantized to fp8 precision, optimized to be faster.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Meta logo](https://developers.cloudflare.com/_astro/meta.BR4nfp35.svg) 

#  llama-3.3-70b-instruct-fp8-fast 

Text Generation • Meta • Hosted 

`@cf/meta/llama-3.3-70b-instruct-fp8-fast` 

Llama 3.3 70B quantized to fp8 precision, optimized to be faster.

| Model Info                                                                           |                                                                                          |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/)           | 24,000 tokens                                                                            |
| Terms and License                                                                    | [link ↗](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F3/LICENSE) |
| Function calling [ ↗](https://developers.cloudflare.com/workers-ai/function-calling) | Yes                                                                                      |
| Batch                                                                                | Yes                                                                                      |
| Unit Pricing                                                                         | $0.29 per M input tokens, $2.25 per M output tokens                                      |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-3.3-70b-instruct-fp8-fast) 

## Usage

* [  Worker (Streaming) ](#tab-panel-3397)
* [  TypeScript ](#tab-panel-3398)
* [  Python ](#tab-panel-3399)
* [  curl ](#tab-panel-3400)

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


    const stream = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {

      messages,

      stream: true,

    });


    return new Response(stream, {

      headers: { "content-type": "text/event-stream" },

    });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

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

    const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", { messages });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

import os

import requests


ACCOUNT_ID = "your-account-id"

AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


prompt = "Tell me all about PEP-8"

response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast",

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

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3407)
* [ Output ](#tab-panel-3408)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

▶response\_format{}

`object`

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0.001maximum: 1Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: \-2maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: \-2maximum: 2Increases the likelihood of the model introducing new topics.

response

`string`The generated text response from the model

▶usage{}

`object`Usage statistics for the inference request

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3409)
* [ Output ](#tab-panel-3410)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

▶response\_format{}

`object`

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0.001maximum: 1Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: \-2maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: \-2maximum: 2Increases the likelihood of the model introducing new topics.

type

`string`

contentType

`text/event-stream`

format

`binary`

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-3411)
* [ Output ](#tab-panel-3412)

▶requests\[\]

`array`

response

`string`The generated text response from the model

▶usage{}

`object`Usage statistics for the inference request

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

## API Schemas (Raw)

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3403)
* [ Output ](#tab-panel-3404)

```

{

  "title": "Prompt",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "The input text prompt for the model to generate a response."

    },

    "lora": {

      "type": "string",

      "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."

    },

    "response_format": {

      "title": "JSON Mode",

      "type": "object",

      "properties": {

        "type": {

          "type": "string",

          "enum": [

            "json_object",

            "json_schema"

          ]

        },

        "json_schema": {}

      }

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

      "minimum": 0.001,

      "maximum": 1,

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

      "minimum": -2,

      "maximum": 2,

      "description": "Decreases the likelihood of the model repeating the same lines verbatim."

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2,

      "description": "Increases the likelihood of the model introducing new topics."

    }

  },

  "required": [

    "prompt"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "response": {

      "type": "string",

      "description": "The generated text response from the model"

    },

    "usage": {

      "type": "object",

      "description": "Usage statistics for the inference request",

      "properties": {

        "prompt_tokens": {

          "type": "number",

          "description": "Total number of tokens in input",

          "default": 0

        },

        "completion_tokens": {

          "type": "number",

          "description": "Total number of tokens in output",

          "default": 0

        },

        "total_tokens": {

          "type": "number",

          "description": "Total number of input and output tokens",

          "default": 0

        }

      }

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

  },

  "required": [

    "response"

  ]

}


```

Explain Code

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3405)
* [ Output ](#tab-panel-3406)

```

{

  "title": "Prompt",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "The input text prompt for the model to generate a response."

    },

    "lora": {

      "type": "string",

      "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."

    },

    "response_format": {

      "title": "JSON Mode",

      "type": "object",

      "properties": {

        "type": {

          "type": "string",

          "enum": [

            "json_object",

            "json_schema"

          ]

        },

        "json_schema": {}

      }

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

      "minimum": 0.001,

      "maximum": 1,

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

      "minimum": -2,

      "maximum": 2,

      "description": "Decreases the likelihood of the model repeating the same lines verbatim."

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2,

      "description": "Increases the likelihood of the model introducing new topics."

    }

  },

  "required": [

    "prompt"

  ]

}


```

Explain Code

```

{

  "type": "string",

  "contentType": "text/event-stream",

  "format": "binary"

}


```

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-3401)
* [ Output ](#tab-panel-3402)

```

{

  "title": "Async Batch",

  "type": "object",

  "properties": {

    "requests": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "external_reference": {

            "type": "string",

            "description": "User-supplied reference. This field will be present in the response as well it can be used to reference the request and response. It's NOT validated to be unique."

          },

          "prompt": {

            "type": "string",

            "minLength": 1,

            "description": "Prompt for the text generation model"

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

          "response_format": {

            "title": "JSON Mode",

            "type": "object",

            "properties": {

              "type": {

                "type": "string",

                "enum": [

                  "json_object",

                  "json_schema"

                ]

              },

              "json_schema": {}

            }

          }

        }

      }

    }

  }

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "response": {

      "type": "string",

      "description": "The generated text response from the model"

    },

    "usage": {

      "type": "object",

      "description": "Usage statistics for the inference request",

      "properties": {

        "prompt_tokens": {

          "type": "number",

          "description": "Total number of tokens in input",

          "default": 0

        },

        "completion_tokens": {

          "type": "number",

          "description": "Total number of tokens in output",

          "default": 0

        },

        "total_tokens": {

          "type": "number",

          "description": "Total number of input and output tokens",

          "default": 0

        }

      }

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

  },

  "required": [

    "response"

  ]

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
