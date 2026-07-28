---
description: Generation over generation, Meta Llama 3 demonstrates state-of-the-art performance on a wide range of industry benchmarks and offers new capabilities, including improved reasoning.
title: llama-3-8b-instruct
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.BR4nfp35.svg)

# llama-3-8b-instruct

Text Generation • Meta

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/%40cf/meta/llama-3-8b-instruct/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/meta/llama-3-8b-instruct`

* Cloudflare-hosted
* Deprecated

Generation over generation, Meta Llama 3 demonstrates state-of-the-art performance on a wide range of industry benchmarks and offers new capabilities, including improved reasoning.

| Model Info                                                                          |                                                     |
| ----------------------------------------------------------------------------------- | --------------------------------------------------- |
| Deprecated                                                                          | 5/30/2026                                           |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 7,968 tokens                                        |
| Terms and License                                                                   | [link ↗](https://llama.meta.com/llama3/license/#)   |
| More information                                                                    | [link ↗](https://llama.meta.com)                    |
| Unit Pricing                                                                        | $0.28 per M input tokens, $0.83 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and is an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-3-8b-instruct)

## Usage

```ts

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

    const stream = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
      messages,
      stream: true,
    });

    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  },
} satisfies ExportedHandler<Env>;
```

```ts

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
    const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", { messages });

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

```py

import os
import requests

ACCOUNT_ID = "your-account-id"
AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")

prompt = "Tell me all about PEP-8"
response = requests.post(
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct",
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

```sh

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3-8b-instruct \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

### Input

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

### Output

Synchronous — Send a request and receive a complete response

response

`string`The generated text response from the model

▶usage{}

`object`Usage statistics for the inference request

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

Streaming — Send a request with \`stream: true\` and receive server-sent events

type

`string`

format

`binary`

## API Schemas (Raw)

SynchronousInput

SynchronousOutput

StreamingInput

StreamingOutput

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/meta/llama-3-8b-instruct/#page","headline":"llama-3-8b-instruct (Meta) · Cloudflare AI docs · Cloudflare AI docs","description":"Generation over generation, Meta Llama 3 demonstrates state-of-the-art performance on a wide range of industry benchmarks and offers new capabilities, including improved reasoning.","url":"https://developers.cloudflare.com/ai/models/%40cf/meta/llama-3-8b-instruct/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
