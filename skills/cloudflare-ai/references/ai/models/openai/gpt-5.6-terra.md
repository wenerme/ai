---
description: GPT-5.6 Terra is an OpenAI GPT-5.6 model that balances intelligence and cost, using the Responses API for reasoning and stateful context management.
title: GPT-5.6 Terra
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  GPT-5.6 Terra

 Text Generation • OpenAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` openai/gpt-5.6-terra `

* Third-party

GPT-5.6 Terra is an OpenAI GPT-5.6 model that balances intelligence and cost, using the Responses API for reasoning and stateful context management.

| Model Info                                                                  |                                                                                                                         |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,050,000 tokens                                                                                                        |
| Terms and License                                                           | [link ↗](https://openai.com/policies/)                                                                                  |
| More information                                                            | [link ↗](https://openai.com/)                                                                                           |
| Request formats                                                             | Responses                                                                                                               |
| Pricing                                                                     | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.6-terra) |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-5.6-terra',
  {
    input: 'Compare blue-green and canary deployments for a small engineering team.',
    instructions: 'Answer in two concise paragraphs.',
    max_output_tokens: 512,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.6-terra",
  "input": "Compare blue-green and canary deployments for a small engineering team.",
  "instructions": "Answer in two concise paragraphs.",
  "max_output_tokens": 512
}'
```

Blue-green deployments run two identical production environments: one active (“blue”) and one idle (“green”). A new version is deployed and tested on green, then traffic is switched over all at once. This makes rollback very fast—switch traffic back to blue—but requires maintaining duplicate infrastructure and handling database/schema compatibility carefully. For a small team, blue-green is often appealing when releases are infrequent, the system is simple enough to duplicate cheaply, and a clear cutover/rollback procedure matters more than gradual validation.

Canary deployments release the new version to a small percentage of users or requests first, then progressively increase traffic while monitoring errors, latency, and business metrics. They reduce the blast radius of defects and provide real-production validation, but require traffic splitting, strong observability, automated rollout controls, and usually feature-flag or version-compatibility discipline. For a small team, canaries are best when the platform already supports them or when the cost of a faulty release is high; otherwise, blue-green generally offers a simpler operational model.

```json
{
  "id": "resp_06924a0adf314715016a4fe98e1d2c81978067f843c9a357f1",
  "object": "response",
  "created_at": 1783622030,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1783622032,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": "Answer in two concise paragraphs.",
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-5.6-terra",
  "moderation": null,
  "output": [
    {
      "id": "msg_06924a0adf314715016a4fe98e76c4819780adfca3dd3ad1f3",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "Blue-green deployments run two identical production environments: one active (“blue”) and one idle (“green”). A new version is deployed and tested on green, then traffic is switched over all at once. This makes rollback very fast—switch traffic back to blue—but requires maintaining duplicate infrastructure and handling database/schema compatibility carefully. For a small team, blue-green is often appealing when releases are infrequent, the system is simple enough to duplicate cheaply, and a clear cutover/rollback procedure matters more than gradual validation.\n\nCanary deployments release the new version to a small percentage of users or requests first, then progressively increase traffic while monitoring errors, latency, and business metrics. They reduce the blast radius of defects and provide real-production validation, but require traffic splitting, strong observability, automated rollout controls, and usually feature-flag or version-compatibility discipline. For a small team, canaries are best when the platform already supports them or when the cost of a faulty release is high; otherwise, blue-green generally offers a simpler operational model."
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
  "prompt_cache_retention": "in_memory",
  "reasoning": {
    "context": "all_turns",
    "effort": "medium",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": false,
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
    "input_tokens": 29,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 211,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 240
  },
  "user": null,
  "metadata": {}
}
```

## Examples

**Customer Incident Update**  — Using instructions to tune the model's response style

```ts
const response = await env.AI.run(
  'openai/gpt-5.6-terra',
  {
    input: 'Draft a short incident update for customers after elevated API latency.',
    instructions: 'Be transparent, calm, and avoid unnecessary technical detail.',
    max_output_tokens: 512,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.6-terra",
  "input": "Draft a short incident update for customers after elevated API latency.",
  "instructions": "Be transparent, calm, and avoid unnecessary technical detail.",
  "max_output_tokens": 512
}'
```

**Incident Update:**
Earlier today, some customers experienced elevated API latency. Our team identified the issue and applied mitigation steps, and API performance has returned to normal.

We’ll continue monitoring closely and will share a follow-up with additional details if needed. We apologize for the disruption and appreciate your patience.

```json
{
  "id": "resp_0072e6076b1b184d016a4fe99105888190b25ef699c2a83380",
  "object": "response",
  "created_at": 1783622033,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1783622034,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": "Be transparent, calm, and avoid unnecessary technical detail.",
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-5.6-terra",
  "moderation": null,
  "output": [
    {
      "id": "msg_0072e6076b1b184d016a4fe9916d6081909385f3b15352b1a7",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "**Incident Update:**  \nEarlier today, some customers experienced elevated API latency. Our team identified the issue and applied mitigation steps, and API performance has returned to normal.\n\nWe’ll continue monitoring closely and will share a follow-up with additional details if needed. We apologize for the disruption and appreciate your patience."
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
  "prompt_cache_retention": "in_memory",
  "reasoning": {
    "context": "all_turns",
    "effort": "medium",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": false,
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
    "input_tokens": 33,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 64,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 97
  },
  "user": null,
  "metadata": {}
}
```

## Parameters

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

▶tools\[\]

`array`

tool\_choice

``

▶text{}

`object`

▶reasoning{}

`object`

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[\]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/#page","headline":"GPT-5.6 Terra (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"GPT-5.6 Terra is an OpenAI GPT-5.6 model that balances intelligence and cost, using the Responses API for reasoning and stateful context management.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5.6-terra/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
