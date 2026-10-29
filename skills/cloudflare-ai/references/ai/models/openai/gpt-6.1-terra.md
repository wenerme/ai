---
description: GPT-6.1 Terra is OpenAI's fast, efficient model for visual reasoning, precise computer use, and clear, natural writing. Use it to match product photos to catalog entries, interpret technical drawings, act on application screens, or draft and revise text. Tool calling requires the Responses API.
title: GPT-6.1 Terra
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-6.1 Terra

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-6.1-terra`

- Third-party
- Zero data retention

GPT-6.1 Terra is OpenAI's fast, efficient model for visual reasoning, precise computer use, and clear, natural writing. Use it to match product photos to catalog entries, interpret technical drawings, act on application screens, or draft and revise text. Tool calling requires the Responses API.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,050,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/models/gpt-6.1-terra) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Short-context input (per 1M)$1.00</li><li>Short-context cached input (per 1M)$0.05</li><li>Short-context cache write (per 1M)$1.25</li><li>Short-context output (per 1M)$5.00</li><li>Long-context input (per 1M)$2.00</li><li>Long-context cached input (per 1M)$0.10</li><li>Long-context cache write (per 1M)$2.50</li><li>Long-context output (per 1M)$7.50</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-6.1-terra',
  {
    input:
      'Match this product to the best catalog entry: a blue insulated stainless-steel bottle with a screw cap and a 750 ml capacity. Catalog: A: blue plastic sports bottle, 750 ml; B: blue insulated stainless-steel bottle, 750 ml; C: silver insulated stainless-steel bottle, 500 ml. Return the entry letter and one sentence explaining the match.',
    max_output_tokens: 512,
    reasoning: { effort: 'high' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6.1-terra",
  "input": "Match this product to the best catalog entry: a blue insulated stainless-steel bottle with a screw cap and a 750 ml capacity. Catalog: A: blue plastic sports bottle, 750 ml; B: blue insulated stainless-steel bottle, 750 ml; C: silver insulated stainless-steel bottle, 500 ml. Return the entry letter and one sentence explaining the match.",
  "max_output_tokens": 512,
  "reasoning": {
    "effort": "high"
  }
}'
```

```
**B** — it matches the blue color, insulated stainless-steel construction, and 750 ml capacity.
```

```json
{
  "id": "resp_0acdd97eb3c98a2b006adf9b32809487d18cea64c95e19ba89",
  "object": "response",
  "created_at": 1793039154,
  "status": "completed",
  "access_programs": {
    "cyber": "standard"
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1793039155,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-6.1-terra",
  "moderation": null,
  "output": [
    {
      "id": "msg_0acdd97eb3c98a2b006adf9b331a5087d1ac4b592c306e418f",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "**B** — it matches the blue color, insulated stainless-steel construction, and 750 ml capacity."
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "context": "all_turns",
    "effort": "high",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tool_usage": {
    "image_gen": {
      "input_tokens": 0,
      "input_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "total_tokens": 0
    },
    "web_search": {
      "num_requests": 0
    }
  },
  "tools": [],
  "top_logprobs": 0,
  "top_p": 0.98,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 83,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 26,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 109
  },
  "user": null,
  "metadata": {}
}
```

## Examples

<details>

<summary>**Clear Writing** — Revise customer-facing text through Chat Completions</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-6.1-terra',
  {
    messages: [
      {
        role: 'user',
        content:
          'Rewrite this delivery update in a clear, friendly tone, keeping it under 40 words: Your shipment has experienced an unforeseen logistical delay. We anticipate dispatch within two business days and will provide tracking information upon fulfillment.',
      },
    ],
    max_completion_tokens: 256,
    reasoning_effort: 'none',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6.1-terra",
  "messages": [
    {
      "role": "user",
      "content": "Rewrite this delivery update in a clear, friendly tone, keeping it under 40 words: Your shipment has experienced an unforeseen logistical delay. We anticipate dispatch within two business days and will provide tracking information upon fulfillment."
    }
  ],
  "max_completion_tokens": 256,
  "reasoning_effort": "none"
}'
```

```
Your shipment is slightly delayed, but we expect to dispatch it within two business days. We’ll send you tracking information as soon as it’s on its way.
```

```json
{
  "id": "resp_0c11f8df88dbcabd006adfa1295b2087d1bc7cabf9e0226961",
  "object": "chat.completion",
  "created": 1793040682,
  "model": "gpt-6.1-terra",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Your shipment is slightly delayed, but we expect to dispatch it within two business days. We’ll send you tracking information as soon as it’s on its way.",
        "refusal": null
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 48,
    "completion_tokens": 36,
    "total_tokens": 84,
    "completion_tokens_details": {
      "reasoning_tokens": 0
    }
  }
}
```

</details>

## Parameters

Schema variant

ResponsesChat Completions

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

▶messages\[]

`array`required

temperature

`number`minimum: 0maximum: 2

max\_tokens

`number`exclusiveMinimum: 0

max\_completion\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

frequency\_penalty

`number`minimum: -2maximum: 2

presence\_penalty

`number`minimum: -2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[]

`array`

tool\_choice

response\_format

▶modalities\[]

`array`

▶audio{}

`object`

reasoning\_effort

`string`Optional reasoning control; availability and accepted values are model-dependent.

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[]

`array`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/#page","headline":"GPT-6.1 Terra","description":"GPT-6.1 Terra is OpenAI's fast, efficient model for visual reasoning, precise computer use, and clear, natural writing. Use it to match product photos to catalog entries, interpret technical drawings, act on application screens, or draft and revise text. Tool calling requires the Responses API.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-6.1-terra/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
