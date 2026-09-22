---
description: SEA-LION stands for Southeast Asian Languages In One Network, which is a collection of Large Language Models (LLMs) which have been pretrained and instruct-tuned for the Southeast Asia (SEA) region.
title: gemma-sea-lion-v4-27b-it
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

a

# gemma-sea-lion-v4-27b-it

Text Generation • aisingapore

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/aisingapore/gemma-sea-lion-v4-27b-it`

- Cloudflare-hosted

SEA-LION stands for Southeast Asian Languages In One Network, which is a collection of Large Language Models (LLMs) which have been pretrained and instruct-tuned for the Southeast Asia (SEA) region.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 128,000 tokens |
| Unit Pricing | $0.351 per M input tokens, $0.555 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and is an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/aisingapore/gemma-sea-lion-v4-27b-it)

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

    const stream = await env.AI.run("@cf/aisingapore/gemma-sea-lion-v4-27b-it", {
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
    const response = await env.AI.run("@cf/aisingapore/gemma-sea-lion-v4-27b-it", { messages });

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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/aisingapore/gemma-sea-lion-v4-27b-it",
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/aisingapore/gemma-sea-lion-v4-27b-it \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

<details>

<summary>Synchronous — Send a request and receive a complete response</summary>



prompt

<code>string</code>requiredminLength: 1The input text prompt for the model to generate a response.

lora

<code>string</code>Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

▶response\_format{}

<code>object</code>

raw

<code>boolean</code>default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

<code>boolean</code>default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

<code>integer</code>default: 2000The maximum number of tokens to generate in the response.

temperature

<code>number</code>default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

<code>number</code>minimum: 0.001maximum: 1Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

<code>integer</code>minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

<code>integer</code>minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

<code>number</code>minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

<code>number</code>minimum: -2maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

<code>number</code>minimum: -2maximum: 2Increases the likelihood of the model introducing new topics.

id

<code>string</code>Unique identifier for the completion

object

<code>string</code>enum: chat.completionObject type identifier

created

<code>number</code>Unix timestamp of when the completion was created

model

<code>string</code>Model used for the completion

▶choices\[]

<code>array</code>List of completion choices

▶usage{}

<code>object</code>Usage statistics for the inference request

prompt\_logprobs{}

<code>object</code>Log probabilities for the prompt (if requested)

</details>

<details>

<summary>Streaming — Send a request with `stream: true` and receive server-sent events</summary>



prompt

<code>string</code>requiredminLength: 1The input text prompt for the model to generate a response.

lora

<code>string</code>Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

▶response\_format{}

<code>object</code>

raw

<code>boolean</code>default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

<code>boolean</code>default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

<code>integer</code>default: 2000The maximum number of tokens to generate in the response.

temperature

<code>number</code>default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

<code>number</code>minimum: 0.001maximum: 1Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

<code>integer</code>minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

<code>integer</code>minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

<code>number</code>minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

<code>number</code>minimum: -2maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

<code>number</code>minimum: -2maximum: 2Increases the likelihood of the model introducing new topics.

type

<code>string</code>

contentType

<code>text/event-stream</code>

format

<code>binary</code>

</details>

<details>

<summary>Batch — Send multiple requests in a single API call</summary>



▶requests\[]

<code>array</code>required

id

<code>string</code>Unique identifier for the completion

object

<code>string</code>enum: chat.completionObject type identifier

created

<code>number</code>Unix timestamp of when the completion was created

model

<code>string</code>Model used for the completion

▶choices\[]

<code>array</code>List of completion choices

▶usage{}

<code>object</code>Usage statistics for the inference request

prompt\_logprobs{}

<code>object</code>Log probabilities for the prompt (if requested)

</details>

## API Schemas (Raw)

SynchronousInput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/sync-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/sync-input.json)

SynchronousOutput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/sync-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/sync-output.json)

StreamingInput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/streaming-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/streaming-input.json)

StreamingOutput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/streaming-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/streaming-output.json)

BatchInput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/batch-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/batch-input.json)

BatchOutput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/batch-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/batch-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/#page","headline":"gemma-sea-lion-v4-27b-it","description":"SEA-LION stands for Southeast Asian Languages In One Network, which is a collection of Large Language Models (LLMs) which have been pretrained and instruct-tuned for the Southeast Asia (SEA) region.","url":"https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
