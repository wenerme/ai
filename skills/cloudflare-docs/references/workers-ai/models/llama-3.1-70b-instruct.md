---
title: llama-3.1-70b-instruct
description: The Meta Llama 3.1 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction tuned generative models. The Llama 3.1 instruction tuned text only models are optimized for multilingual dialogue use cases and outperform many of the available open source and closed chat models on common industry benchmarks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![Meta logo](https://developers.cloudflare.com/_astro/meta.BR4nfp35.svg) 

#  llama-3.1-70b-instruct 

Text Generation • Meta • Hosted 

`@cf/meta/llama-3.1-70b-instruct` 

The Meta Llama 3.1 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction tuned generative models. The Llama 3.1 instruction tuned text only models are optimized for multilingual dialogue use cases and outperform many of the available open source and closed chat models on common industry benchmarks.

| Model Info                                                                 |                                                                                          |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 24,000 tokens                                                                            |
| Terms and License                                                          | [link ↗](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F1/LICENSE) |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-3.1-70b-instruct) 

## Usage

* [  Worker (Streaming) ](#tab-panel-3509)
* [  TypeScript ](#tab-panel-3510)
* [  Python ](#tab-panel-3511)
* [  curl ](#tab-panel-3512)

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

    const response = await env.AI.run("@cf/meta/llama-3.1-70b-instruct", { messages });


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

Explain Code

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

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3517)
* [ Output ](#tab-panel-3518)

frequency\_penalty

`number`maximum: 2minimum: 0Decreases the likelihood of the model repeating the same lines verbatim.

▶image

`one of`

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

presence\_penalty

`number`maximum: 2minimum: 0Increases the likelihood of the model introducing new topics.

prompt

`string`requiredmaxLength: 131072minLength: 1The input text prompt for the model to generate a response.

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

repetition\_penalty

`number`maximum: 2minimum: 0Penalty for repeated tokens; higher values discourage repetition.

seed

`integer`maximum: 9999999999minimum: 1Random seed for reproducibility of the generation.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

temperature

`number`default: 0.6maximum: 5minimum: 0Controls the randomness of the output; higher values produce more random results.

top\_k

`integer`maximum: 50minimum: 1Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

top\_p

`number`maximum: 2minimum: 0Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

response

`string`The generated text response from the model

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3519)
* [ Output ](#tab-panel-3520)

frequency\_penalty

`number`maximum: 2minimum: 0Decreases the likelihood of the model repeating the same lines verbatim.

▶image

`one of`

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

presence\_penalty

`number`maximum: 2minimum: 0Increases the likelihood of the model introducing new topics.

prompt

`string`requiredmaxLength: 131072minLength: 1The input text prompt for the model to generate a response.

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

repetition\_penalty

`number`maximum: 2minimum: 0Penalty for repeated tokens; higher values discourage repetition.

seed

`integer`maximum: 9999999999minimum: 1Random seed for reproducibility of the generation.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

temperature

`number`default: 0.6maximum: 5minimum: 0Controls the randomness of the output; higher values produce more random results.

top\_k

`integer`maximum: 50minimum: 1Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

top\_p

`number`maximum: 2minimum: 0Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

contentType

`text/event-stream`

format

`binary`

type

`string`

## API Schemas (Raw)

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3513)
* [ Output ](#tab-panel-3514)

```

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

}


```

Explain Code

```

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

}


```

Explain Code

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3515)
* [ Output ](#tab-panel-3516)

```

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

}


```

Explain Code

```

{

  "contentType": "text/event-stream",

  "format": "binary",

  "type": "string"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
