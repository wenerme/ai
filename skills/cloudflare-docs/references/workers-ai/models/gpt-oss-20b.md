---
title: gpt-oss-20b
description: OpenAI's open-weight models designed for powerful reasoning, agentic tasks, and versatile developer use cases – gpt-oss-20b is for lower latency, and local or specialized use-cases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  gpt-oss-20b 

Text Generation • OpenAI • Hosted 

`@cf/openai/gpt-oss-20b` 

OpenAI's open-weight models designed for powerful reasoning, agentic tasks, and versatile developer use cases – gpt-oss-20b is for lower latency, and local or specialized use-cases.

| Model Info                                                                           |                                                     |
| ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/)           | 128,000 tokens                                      |
| Function calling [ ↗](https://developers.cloudflare.com/workers-ai/function-calling) | Yes                                                 |
| Reasoning                                                                            | Yes                                                 |
| Unit Pricing                                                                         | $0.20 per M input tokens, $0.30 per M output tokens |

## Usage

* [  TypeScript ](#tab-panel-2593)
* [  Python ](#tab-panel-2594)
* [  curl ](#tab-panel-2595)

```

export default {

  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run('@cf/openai/gpt-oss-20b', {

      instructions: 'You are a concise assistant.',

      input: 'What is the origin of the phrase Hello, World?',

    });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

import os

import requests


ACCOUNT_ID = os.environ.get("CLOUDFLARE_ACCOUNT_ID")

AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


prompt = "Tell me all about PEP-8"

response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1/responses",

    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

    json={

      "model": "@cf/openai/gpt-oss-20b",

      "input": "Tell me all about PEP-8"

    }

)

result = response.json()

print(result)


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses   -H "Content-Type: application/json"   -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN"   -d '{

    "model": "@cf/openai/gpt-oss-20b",

    "input": "What are the benefits of open-source models?"

  }'


```

Multiple API format support 

This model supports three different API formats:
* **Responses API** (`/ai/v1/responses`) - Native OpenAI responses format shown above with `input` parameter
* **Workers AI Run** (`/ai/run`) - Dynamic format detection, accepts Chat Completions (`messages`), legacy Completions (`prompt`), or Responses API (`input`)
* **Chat Completions** (`/v1/chat/completions`) - OpenAI-compatible endpoint with `messages` array. Refer to [OpenAI Compatibility](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/)for details.

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-2596)
* [ Output ](#tab-panel-2597)

Input format

Prompt

Simple text input for single-turn interactions

Messages

Structured conversation format with roles (user, assistant, system)

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

* [ Input ](#tab-panel-2598)
* [ Output ](#tab-panel-2599)

Input format

Prompt

Simple text input for single-turn interactions

Messages

Structured conversation format with roles (user, assistant, system)

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

title

`Stream_Output`

description

`Server-Sent Events stream when streaming is enabled`

contentType

`text/event-stream`

format

`binary`

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-2600)
* [ Output ](#tab-panel-2601)

▶requests\[\]

`array`required

response

`string`The generated text response from the model

▶usage{}

`object`Usage statistics for the inference request

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

## API Schemas (Raw)

Synchronous Input 

Synchronous Output 

Streaming Input 

Streaming Output 

Batch Input 

Batch Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
