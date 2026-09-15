---
description: Gemma 4 is Google's most intelligent family of open models, built from Gemini 3 research to maximize intelligence-per-parameter.
title: gemma-4-26b-a4b-it
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# gemma-4-26b-a4b-it

Text Generation • Google

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/google/gemma-4-26b-a4b-it`

- Cloudflare-hosted
- Batch
- Function calling
- Reasoning
- Vision

Gemma 4 is Google's most intelligent family of open models, built from Gemini 3 research to maximize intelligence-per-parameter.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 256,000 tokens |
| Terms and License | [link ↗](https://ai.google.dev/gemma/docs/gemma_4_license) |
| Function calling [↗](https://developers.cloudflare.com/workers-ai/function-calling/) | Yes |
| Reasoning | Yes |
| Vision | Yes |
| Batch | Yes |
| Unit Pricing | $0.10 per M input tokens, $0.30 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and is an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/google/gemma-4-26b-a4b-it)

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

    const stream = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
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
    const response = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", { messages });

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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/google/gemma-4-26b-a4b-it",
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/google/gemma-4-26b-a4b-it \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

<details>

<summary>Synchronous — Send a request and receive a complete response</summary>



Input format

Prompt Simple text input for single-turn interactionsMessages Structured conversation format with roles (user, assistant, system)

prompt

<code>string</code>requiredminLength: 1The input text prompt for the model to generate a response.

skip\_special\_tokens

<code>boolean</code>default: false

model

<code>string</code>ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').

▶audio{}

<code>object</code>Parameters for audio output. Required when modalities includes 'audio'.

frequency\_penalty

<code>number | null</code>Penalizes new tokens based on their existing frequency in the text so far.

logit\_bias

<code>object | null</code>Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.

logprobs

<code>boolean | null</code>Whether to return log probabilities of the output tokens.

top\_logprobs

<code>integer | null</code>How many top log probabilities to return at each token position (0-20). Requires logprobs=true.

max\_tokens

<code>integer | null</code>Deprecated in favor of max_completion_tokens. The maximum number of tokens to generate.

max\_completion\_tokens

<code>integer | null</code>An upper bound for the number of tokens that can be generated for a completion.

metadata

<code>object | null</code>Set of 16 key-value pairs that can be attached to the object.

modalities

<code>array | null</code>Output types requested from the model (e.g. ['text'] or ['text', 'audio']).

n

<code>integer | null</code>How many chat completion choices to generate for each input message.

parallel\_tool\_calls

<code>boolean</code>default: trueWhether to enable parallel function calling during tool use.

▶prediction{}

<code>object</code>

presence\_penalty

<code>number | null</code>Penalizes new tokens based on whether they appear in the text so far.

reasoning\_effort

<code>string | null</code>enum: low, medium, highConstrains effort on reasoning for reasoning models (o1, o3-mini, etc.).

▶chat\_template\_kwargs{}

<code>object</code>

▶response\_format

<code>one of</code>Specifies the format the model must output.

seed

<code>integer | null</code>If specified, the system will make a best effort to sample deterministically.

▶stop

<code>one of</code>

store

<code>boolean | null</code>Whether to store the output for model distillation / evals.

stream

<code>boolean | null</code>If true, partial message deltas will be sent as server-sent events.

▶stream\_options{}

<code>object</code>

temperature

<code>number | null</code>Sampling temperature between 0 and 2.

▶tool\_choice

<code>one of</code>Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.

▶tools\[]

<code>array</code>A list of tools the model may call.

top\_p

<code>number | null</code>Nucleus sampling: considers the results of the tokens with top_p probability mass.

user

<code>string</code>A unique identifier representing your end-user, for abuse monitoring.

▶web\_search\_options{}

<code>object</code>Options for the web search tool (when using built-in web search).

▶function\_call

<code>one of</code>

▶functions\[]

<code>array</code>minItems: 1maxItems: 128

id

<code>string</code>A unique identifier for the chat completion.

object

<code>string</code>

created

<code>integer</code>Unix timestamp (seconds) of when the completion was created.

model

<code>string</code>The model used for the chat completion.

▶choices\[]

<code>array</code>minItems: 1

▶usage{}

<code>object</code>

system\_fingerprint

<code>string | null</code>

</details>

<details>

<summary>Streaming — Send a request with `stream: true` and receive server-sent events</summary>



Input format

Prompt Simple text input for single-turn interactionsMessages Structured conversation format with roles (user, assistant, system)

prompt

<code>string</code>requiredminLength: 1The input text prompt for the model to generate a response.

skip\_special\_tokens

<code>boolean</code>default: false

model

<code>string</code>ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').

▶audio{}

<code>object</code>Parameters for audio output. Required when modalities includes 'audio'.

frequency\_penalty

<code>number | null</code>Penalizes new tokens based on their existing frequency in the text so far.

logit\_bias

<code>object | null</code>Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.

logprobs

<code>boolean | null</code>Whether to return log probabilities of the output tokens.

top\_logprobs

<code>integer | null</code>How many top log probabilities to return at each token position (0-20). Requires logprobs=true.

max\_tokens

<code>integer | null</code>Deprecated in favor of max_completion_tokens. The maximum number of tokens to generate.

max\_completion\_tokens

<code>integer | null</code>An upper bound for the number of tokens that can be generated for a completion.

metadata

<code>object | null</code>Set of 16 key-value pairs that can be attached to the object.

modalities

<code>array | null</code>Output types requested from the model (e.g. ['text'] or ['text', 'audio']).

n

<code>integer | null</code>How many chat completion choices to generate for each input message.

parallel\_tool\_calls

<code>boolean</code>default: trueWhether to enable parallel function calling during tool use.

▶prediction{}

<code>object</code>

presence\_penalty

<code>number | null</code>Penalizes new tokens based on whether they appear in the text so far.

reasoning\_effort

<code>string | null</code>enum: low, medium, highConstrains effort on reasoning for reasoning models (o1, o3-mini, etc.).

▶chat\_template\_kwargs{}

<code>object</code>

▶response\_format

<code>one of</code>Specifies the format the model must output.

seed

<code>integer | null</code>If specified, the system will make a best effort to sample deterministically.

▶stop

<code>one of</code>

store

<code>boolean | null</code>Whether to store the output for model distillation / evals.

stream

<code>boolean | null</code>If true, partial message deltas will be sent as server-sent events.

▶stream\_options{}

<code>object</code>

temperature

<code>number | null</code>Sampling temperature between 0 and 2.

▶tool\_choice

<code>one of</code>Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.

▶tools\[]

<code>array</code>A list of tools the model may call.

top\_p

<code>number | null</code>Nucleus sampling: considers the results of the tokens with top_p probability mass.

user

<code>string</code>A unique identifier representing your end-user, for abuse monitoring.

▶web\_search\_options{}

<code>object</code>Options for the web search tool (when using built-in web search).

▶function\_call

<code>one of</code>

▶functions\[]

<code>array</code>minItems: 1maxItems: 128

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

<code>array</code>

id

<code>string</code>A unique identifier for the chat completion.

object

<code>string</code>

created

<code>integer</code>Unix timestamp (seconds) of when the completion was created.

model

<code>string</code>The model used for the chat completion.

▶choices\[]

<code>array</code>minItems: 1

▶usage{}

<code>object</code>

system\_fingerprint

<code>string | null</code>

</details>

## API Schemas (Raw)

SynchronousInput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/sync-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/sync-input.json)

SynchronousOutput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/sync-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/sync-output.json)

StreamingInput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/streaming-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/streaming-input.json)

StreamingOutput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/streaming-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/streaming-output.json)

BatchInput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/batch-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/batch-input.json)

BatchOutput [Open](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/batch-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/batch-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/#page","headline":"gemma-4-26b-a4b-it (Google) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Gemma 4 is Google's most intelligent family of open models, built from Gemini 3 research to maximize intelligence-per-parameter.","url":"https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
