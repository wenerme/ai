---
title: GPT-5.6 Luna
description: GPT-5.6 Luna is an OpenAI GPT-5.6 model optimized for cost-sensitive workloads, using the Responses API for efficient text generation.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  GPT-5.6 Luna

Text Generation • OpenAI

`openai/gpt-5.6-luna`

GPT-5.6 Luna is an OpenAI GPT-5.6 model optimized for cost-sensitive workloads, using the Responses API for efficient text generation.

| Model Info                                                                 |                                                                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,050,000 tokens                                                                                                      |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                                |
| More information                                                           | [link ↗](https://openai.com/)                                                                                         |
| Request formats                                                            | Responses                                                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.6-luna) |

## Usage

* [ TypeScript ](#tab-panel-1484)
* [ cURL ](#tab-panel-1485)

**TypeScript**

```ts
const response = await env.AI.run(
  'openai/gpt-5.6-luna',
  {
    input: 'Summarize the benefits of API rate limiting in three bullets.',
    max_output_tokens: 256,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.6-luna",
  "input": "Summarize the benefits of API rate limiting in three bullets.",
  "max_output_tokens": 256
}'
```

* [ Output ](#tab-panel-1488)
* [ Raw response ](#tab-panel-1489)

- **Protects system stability:** Prevents overload, reduces outages, and ensures predictable performance during traffic spikes.
- **Ensures fair access:** Stops individual users or applications from consuming disproportionate resources.
- **Improves security and cost control:** Helps mitigate abuse, brute-force attacks, and unexpected infrastructure usage.

```json
{
  "id": "resp_0e481f0cb46bf357016a4fe99bd5fc8194b6ce2049aa65ab08",
  "object": "response",
  "created_at": 1783622043,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1783622044,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 256,
  "max_tool_calls": null,
  "model": "gpt-5.6-luna",
  "moderation": null,
  "output": [
    {
      "id": "msg_0e481f0cb46bf357016a4fe99c2e288194a6fd0ce3f5f88786",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "- **Protects system stability:** Prevents overload, reduces outages, and ensures predictable performance during traffic spikes.\n- **Ensures fair access:** Stops individual users or applications from consuming disproportionate resources.\n- **Improves security and cost control:** Helps mitigate abuse, brute-force attacks, and unexpected infrastructure usage."
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
    "input_tokens": 19,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 66,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 85
  },
  "user": null,
  "metadata": {}
}
```

## Examples

**Pull Request Description**  — Using instructions for a cost-sensitive drafting task

* [ TypeScript ](#tab-panel-1486)
* [ cURL ](#tab-panel-1487)

**TypeScript**

```ts
const response = await env.AI.run(
  'openai/gpt-5.6-luna',
  {
    input:
      'Write a brief pull request description for a bug fix that prevents duplicate webhook deliveries.',
    instructions: 'Keep it under 100 words.',
    max_output_tokens: 256,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.6-luna",
  "input": "Write a brief pull request description for a bug fix that prevents duplicate webhook deliveries.",
  "instructions": "Keep it under 100 words.",
  "max_output_tokens": 256
}'
```

* [ Output ](#tab-panel-1490)
* [ Raw response ](#tab-panel-1491)

## Summary
Prevents duplicate webhook deliveries by ensuring each event is processed only once, even when retries or concurrent requests occur.

## Changes
- Added idempotency checks for webhook events.
- Prevented duplicate delivery attempts.
- Added regression tests covering retries and concurrent processing.

## Testing
All existing and new tests pass.

```json
{
  "id": "resp_0bed05adeda548a1016a4fe99d1e408194bb0375bad96ab71a",
  "object": "response",
  "created_at": 1783622045,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1783622046,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": "Keep it under 100 words.",
  "max_output_tokens": 256,
  "max_tool_calls": null,
  "model": "gpt-5.6-luna",
  "moderation": null,
  "output": [
    {
      "id": "msg_0bed05adeda548a1016a4fe99daa748194992854423ba08e72",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "## Summary\nPrevents duplicate webhook deliveries by ensuring each event is processed only once, even when retries or concurrent requests occur.\n\n## Changes\n- Added idempotency checks for webhook events.\n- Prevented duplicate delivery attempts.\n- Added regression tests covering retries and concurrent processing.\n\n## Testing\nAll existing and new tests pass."
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
    "output_tokens": 69,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 102
  },
  "user": null,
  "metadata": {}
}
```

## Parameters

* [ Input ](#tab-panel-1492)
* [ Output ](#tab-panel-1493)

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

Input [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-luna/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-luna/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-luna/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.6-luna/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5.6-luna/#page","headline":"GPT-5.6 Luna (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"GPT-5.6 Luna is an OpenAI GPT-5.6 model optimized for cost-sensitive workloads, using the Responses API for efficient text generation.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5.6-luna/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
