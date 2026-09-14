---
description: Qwen 3.8 27B is a 27-billion-parameter instruction-tuned language model from Alibaba's Qwen family, designed for vision, efficient general-purpose text generation and agentic workloads.
title: qwen3.8-27b
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Qwen logo](https://developers.cloudflare.com/_astro/qwen.ByCZjtXU.svg)

# qwen3.8-27b

Image-Text-to-Text • Qwen

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/qwen/qwen3.8-27b`

- Cloudflare-hosted
- Function calling
- Reasoning
- Vision

Qwen 3.8 27B is a 27-billion-parameter instruction-tuned language model from Alibaba's Qwen family, designed for vision, efficient general-purpose text generation and agentic workloads.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 262,144 tokens |
| Function calling [↗](https://developers.cloudflare.com/workers-ai/function-calling/) | Yes |
| Reasoning | Yes |
| Vision | Yes |
| Unit Pricing | $0.45 per M input tokens, $3.20 per M output tokens |

## Parameters

<details>

<summary>Synchronous — Send a request and receive a complete response</summary>



Input format

Prompt Simple text input for single-turn interactionsMessages Structured conversation format with roles (user, assistant, system)

prompt

<code>string</code>requiredminLength: 1The input text prompt for the model to generate a response.

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

service\_tier

<code>string | null</code>enum: auto, default, flex, scale, prioritySpecifies the processing type used for serving the request.

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

service\_tier

<code>string | null</code>enum: auto, default, flex, scale, priority

</details>

<details>

<summary>Streaming — Send a request with `stream: true` and receive server-sent events</summary>



Input format

Prompt Simple text input for single-turn interactionsMessages Structured conversation format with roles (user, assistant, system)

prompt

<code>string</code>requiredminLength: 1The input text prompt for the model to generate a response.

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

service\_tier

<code>string | null</code>enum: auto, default, flex, scale, prioritySpecifies the processing type used for serving the request.

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

service\_tier

<code>string | null</code>enum: auto, default, flex, scale, priority

</details>

## API Schemas (Raw)

SynchronousInput [Open](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/sync-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/sync-input.json)

SynchronousOutput [Open](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/sync-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/sync-output.json)

StreamingInput [Open](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/streaming-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/streaming-input.json)

StreamingOutput [Open](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/streaming-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/streaming-output.json)

BatchInput [Open](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/batch-input.json) [Download](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/batch-input.json)

BatchOutput [Open](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/batch-output.json) [Download](https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/batch-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/#page","headline":"qwen3.8-27b (Qwen) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Qwen 3.8 27B is a 27-billion-parameter instruction-tuned language model from Alibaba's Qwen family, designed for vision, efficient general-purpose text generation and agentic workloads.","url":"https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
