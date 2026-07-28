---
description: GPT-5.6 Sol is OpenAI's frontier GPT-5.6 model for complex professional work, using the Responses API for reasoning and stateful context management.
title: GPT-5.6 Sol
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

# GPT-5.6 Sol

Text Generation • OpenAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-sol/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-5.6-sol`

* Third-party

GPT-5.6 Sol is OpenAI's frontier GPT-5.6 model for complex professional work, using the Responses API for reasoning and stateful context management.

| Model Info                                                                          |                                                                                                                      |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,050,000 tokens                                                                                                     |
| Terms and License                                                                   | [link ↗](https://openai.com/policies/)                                                                               |
| More information                                                                    | [link ↗](https://openai.com/)                                                                                        |
| Request formats                                                                     | Responses                                                                                                            |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.6-sol) |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-5.6-sol',
  {
    input: 'Create a concise launch checklist for migrating a production API to a new region.',
    instructions: 'Use five bullets and focus on risk reduction.',
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
  "model": "openai/gpt-5.6-sol",
  "input": "Create a concise launch checklist for migrating a production API to a new region.",
  "instructions": "Use five bullets and focus on risk reduction.",
  "max_output_tokens": 512
}'
```

- **Validate readiness:** Confirm capacity, quotas, security controls, certificates, secrets, dependencies, and compliance requirements in the new region.
- **Protect data:** Take verified backups; validate replication consistency, encryption, retention, and restore procedures before cutover.
- **Test end to end:** Run load, latency, failover, integration, and smoke tests using production-like traffic and data.
- **Control cutover:** Lower DNS TTLs, deploy gradually with canary traffic, freeze risky changes, and monitor errors, latency, saturation, and data integrity.
- **Prepare rollback:** Define go/no-go thresholds, owners, communication channels, and a rehearsed rollback plan; retain the old region until stability is confirmed.

```json
{
  "id": "resp_0f038c9de2c94eb6016a4fe97e94f081909f0edfecbfb2abd9",
  "object": "response",
  "created_at": 1783622014,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1783622017,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": "Use five bullets and focus on risk reduction.",
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-5.6-sol",
  "moderation": null,
  "output": [
    {
      "id": "rs_0f038c9de2c94eb6016a4fe97f2bac81909bf1c27c448cf46b",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "msg_0f038c9de2c94eb6016a4fe97fa0688190a1b4958a6a0aa218",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "- **Validate readiness:** Confirm capacity, quotas, security controls, certificates, secrets, dependencies, and compliance requirements in the new region.\n- **Protect data:** Take verified backups; validate replication consistency, encryption, retention, and restore procedures before cutover.\n- **Test end to end:** Run load, latency, failover, integration, and smoke tests using production-like traffic and data.\n- **Control cutover:** Lower DNS TTLs, deploy gradually with canary traffic, freeze risky changes, and monitor errors, latency, saturation, and data integrity.\n- **Prepare rollback:** Define go/no-go thresholds, owners, communication channels, and a rehearsed rollback plan; retain the old region until stability is confirmed."
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
    "input_tokens": 34,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 182,
    "output_tokens_details": {
      "reasoning_tokens": 32
    },
    "total_tokens": 216
  },
  "user": null,
  "metadata": {}
}
```

## Examples

**Operational Reasoning** — Using reasoning effort for a multi-step operational decision

```ts
const response = await env.AI.run(
  'openai/gpt-5.6-sol',
  {
    input:
      'A service has 99.9% monthly availability and just had 31 minutes of downtime. Has it exceeded the monthly error budget for a 30-day month? Show the calculation briefly.',
    max_output_tokens: 512,
    reasoning: { effort: 'medium' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.6-sol",
  "input": "A service has 99.9% monthly availability and just had 31 minutes of downtime. Has it exceeded the monthly error budget for a 30-day month? Show the calculation briefly.",
  "max_output_tokens": 512,
  "reasoning": {
    "effort": "medium"
  }
}'
```

- Total minutes in 30 days: \(30 \times 24 \times 60 = 43{,}200\)
- Error budget at 99.9% availability: \(43{,}200 \times 0.001 = 43.2\) minutes
- Downtime used: 31 minutes

**No**, it has not exceeded the monthly error budget. It has **12.2 minutes remaining**.

```json
{
  "id": "resp_0fcb12a6aa68f25a016a4fe98205b881978b6ab83321e02e3b",
  "object": "response",
  "created_at": 1783622018,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1783622020,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-5.6-sol",
  "moderation": null,
  "output": [
    {
      "id": "rs_0fcb12a6aa68f25a016a4fe98293e081979139ff657f9b612b",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "msg_0fcb12a6aa68f25a016a4fe98354fc8197a4b488662491fdd8",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "- Total minutes in 30 days: \\(30 \\times 24 \\times 60 = 43{,}200\\)\n- Error budget at 99.9% availability: \\(43{,}200 \\times 0.001 = 43.2\\) minutes\n- Downtime used: 31 minutes\n\n**No**, it has not exceeded the monthly error budget. It has **12.2 minutes remaining**."
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
    "input_tokens": 44,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 159,
    "output_tokens_details": {
      "reasoning_tokens": 63
    },
    "total_tokens": 203
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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5.6-sol/#page","headline":"GPT-5.6 Sol (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"GPT-5.6 Sol is OpenAI's frontier GPT-5.6 model for complex professional work, using the Responses API for reasoning and stateful context management.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5.6-sol/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
