---
title: llama-3.1-8b-instruct-fast
description: [Fast version] The Meta Llama 3.1 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction tuned generative models. The Llama 3.1 instruction tuned text only models are optimized for multilingual dialogue use cases and outperform many of the available open source and closed chat models on common industry benchmarks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Meta logo](https://developers.cloudflare.com/_astro/meta.BR4nfp35.svg) 

#  llama-3.1-8b-instruct-fast 

Text Generation • Meta • Hosted 

`@cf/meta/llama-3.1-8b-instruct-fast` 

\[Fast version\] The Meta Llama 3.1 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction tuned generative models. The Llama 3.1 instruction tuned text only models are optimized for multilingual dialogue use cases and outperform many of the available open source and closed chat models on common industry benchmarks.

| Model Info                                                                 |                                                                                          |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                           |
| Terms and License                                                          | [link ↗](https://github.com/meta-llama/llama-models/blob/main/models/llama3%5F1/LICENSE) |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-3.1-8b-instruct-fast) 

## Usage

* [  Worker (Streaming) ](#tab-panel-2671)
* [  TypeScript ](#tab-panel-2672)
* [  Python ](#tab-panel-2673)
* [  curl ](#tab-panel-2674)

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


    const stream = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {

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

    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", { messages });


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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast",

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

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.1-8b-instruct-fast \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

### Input

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

### Output

Synchronous — Send a request and receive a complete response 

response

`string`The generated text response from the model

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

Streaming — Send a request with \`stream: true\` and receive server-sent events 

contentType

`text/event-stream`

format

`binary`

type

`string`

## API Schemas (Raw)

Synchronous Input 

Synchronous Output 

Streaming Input 

Streaming Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
