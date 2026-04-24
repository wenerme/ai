---
title: llama-3.2-11b-vision-instruct
description:  The Llama 3.2-Vision instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image.
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

#  llama-3.2-11b-vision-instruct 

Text Generation • Meta • Hosted 

`@cf/meta/llama-3.2-11b-vision-instruct` 

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

* [  Worker (Streaming) ](#tab-panel-3569)
* [  TypeScript ](#tab-panel-3570)
* [  Python ](#tab-panel-3571)
* [  curl ](#tab-panel-3572)

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

    const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", { messages });


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

Explain Code

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

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3577)
* [ Output ](#tab-panel-3578)

prompt

`string`requiredminLength: 1maxLength: 131072The input text prompt for the model to generate a response.

▶image

`one of`

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0maximum: 2Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: 0maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: 0maximum: 2Increases the likelihood of the model introducing new topics.

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

response

`string`The generated text response from the model

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3579)
* [ Output ](#tab-panel-3580)

prompt

`string`requiredminLength: 1maxLength: 131072The input text prompt for the model to generate a response.

▶image

`one of`

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0maximum: 2Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: 0maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: 0maximum: 2Increases the likelihood of the model introducing new topics.

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

type

`string`

contentType

`text/event-stream`

format

`binary`

## API Schemas (Raw)

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3573)
* [ Output ](#tab-panel-3574)

```

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

}


```

Explain Code

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3575)
* [ Output ](#tab-panel-3576)

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
