---
description: Inkling is Thinking Machines' open-weights hybrid reasoning model, built on a mixture-of-experts architecture. It reasons by default, exposing its chain-of-thought as leading thinking content blocks, with reasoning effort tunable via a Tinker-specific output_config.effort parameter. Available through Tinker's beta Anthropic Messages-compatible endpoint alongside tool use, streaming, and multi-turn conversations. Currently intended for low-traffic testing and internal use rather than high-throughput production deployments; prompt caching, citations, and audio input are not supported through this endpoint.
title: Inkling
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Inkling

Text Generation • thinkingmachines

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/thinkingmachines/inkling/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`thinkingmachines/inkling`

* Third-party

Inkling is Thinking Machines' open-weights hybrid reasoning model, built on a mixture-of-experts architecture. It reasons by default, exposing its chain-of-thought as leading thinking content blocks, with reasoning effort tunable via a Tinker-specific output\_config.effort parameter. Available through Tinker's beta Anthropic Messages-compatible endpoint alongside tool use, streaming, and multi-turn conversations. Currently intended for low-traffic testing and internal use rather than high-throughput production deployments; prompt caching, citations, and audio input are not supported through this endpoint.

| Model Info                                                                 |                                                                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 64,000 tokens                                                                                                              |
| More information                                                           | [link ↗](https://huggingface.co/thinkingmachines/Inkling)                                                                  |
| Request formats                                                            | Anthropic Messages                                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/thinkingmachines/inkling) |

## Usage

```ts
const response = await env.AI.run(
  'thinkingmachines/inkling',
  { max_tokens: 512, messages: [{ content: 'The capital of France is', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "thinkingmachines/inkling",
  "max_tokens": 512,
  "messages": [
    {
      "content": "The capital of France is",
      "role": "user"
    }
  ]
}'
```

Paris.

```json
{
  "id": "msg_922ec1780752447c802ec60be3dabfd6",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "The user is asking a simple factual question: \"The capital of France is\". The answer is Paris. I should provide the answer clearly and concisely.",
      "signature": ""
    },
    {
      "type": "text",
      "text": "Paris."
    }
  ],
  "model": "thinkingmachines/Inkling",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 41,
    "cache_creation_input_tokens": 19,
    "cache_read_input_tokens": 0
  }
}
```

## Examples

**Tool Use** — Tool use round-trip: the model requests a tool call, then answers using the tool\_result supplied in a follow-up user message

```ts
const response = await env.AI.run(
  'thinkingmachines/inkling',
  {
    max_tokens: 1024,
    messages: [
      { content: "What's the weather in Paris?", role: 'user' },
      {
        content: [
          {
            id: 'toolu_01A1x1x1x1x1x1x1x1x1x1x1',
            input: { city: 'Paris' },
            name: 'get_weather',
            type: 'tool_use',
          },
        ],
        role: 'assistant',
      },
      {
        content: [
          {
            content: 'Sunny, 22°C',
            tool_use_id: 'toolu_01A1x1x1x1x1x1x1x1x1x1x1',
            type: 'tool_result',
          },
        ],
        role: 'user',
      },
    ],
    tools: [
      {
        description: 'Get the current weather for a city.',
        input_schema: {
          properties: { city: { type: 'string' } },
          required: ['city'],
          type: 'object',
        },
        name: 'get_weather',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "thinkingmachines/inkling",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What'\''s the weather in Paris?",
      "role": "user"
    },
    {
      "content": [
        {
          "id": "toolu_01A1x1x1x1x1x1x1x1x1x1x1",
          "input": {
            "city": "Paris"
          },
          "name": "get_weather",
          "type": "tool_use"
        }
      ],
      "role": "assistant"
    },
    {
      "content": [
        {
          "content": "Sunny, 22°C",
          "tool_use_id": "toolu_01A1x1x1x1x1x1x1x1x1x1x1",
          "type": "tool_result"
        }
      ],
      "role": "user"
    }
  ],
  "tools": [
    {
      "description": "Get the current weather for a city.",
      "input_schema": {
        "properties": {
          "city": {
            "type": "string"
          }
        },
        "required": [
          "city"
        ],
        "type": "object"
      },
      "name": "get_weather"
    }
  ]
}'
```

The weather in Paris is sunny with a temperature of 22°C. Enjoy the nice weather!

```json
{
  "id": "msg_ddfc346862fc4a3f8afc1f8f53e1d932",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "The user asked for the weather in Paris and the function returned \"Sunny, 22°C\". I should provide a clear, friendly answer with this information.",
      "signature": ""
    },
    {
      "type": "text",
      "text": "The weather in Paris is sunny with a temperature of 22°C. Enjoy the nice weather!"
    }
  ],
  "model": "thinkingmachines/Inkling",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 57,
    "cache_creation_input_tokens": 95,
    "cache_read_input_tokens": 0
  }
}
```

**Extended Thinking Effort** — Controlling reasoning effort via Tinker's output\_config.effort extension. The model's chain-of-thought is returned as a leading thinking content block before the answer.

```ts
const response = await env.AI.run(
  'thinkingmachines/inkling',
  {
    max_tokens: 1024,
    messages: [{ content: 'What is 17 * 23?', role: 'user' }],
    output_config: { effort: 'high' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "thinkingmachines/inkling",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What is 17 * 23?",
      "role": "user"
    }
  ],
  "output_config": {
    "effort": "high"
  }
}'
```

17 × 23 = **391**

(Breakdown: 17 × 20 = 340, plus 17 × 3 = 51; 340 + 51 = 391)

```json
{
  "id": "msg_a7e845f498bd44e9b1d63dca8b104a2e",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "The user is asking for the product of 17 and 23. Let me calculate that.\n\n17 * 23 = ?\n\nI can compute this as:\n17 * 20 = 340\n17 * 3 = 51\n340 + 51 = 391\n\nAlternatively:\n17 * 23 = 17 * (25 - 2) = 425 - 34 = 391\nOr (20 - 3) * 23 = 460 - 69 = 391\n\nSo the answer is 391.",
      "signature": ""
    },
    {
      "type": "text",
      "text": "17 × 23 = **391**\n\n(Breakdown: 17 × 20 = 340, plus 17 × 3 = 51; 340 + 51 = 391)"
    }
  ],
  "model": "thinkingmachines/Inkling",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 155,
    "cache_creation_input_tokens": 22,
    "cache_read_input_tokens": 0
  }
}
```

## Parameters

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

temperature

`number`minimum: 0maximum: 1

top\_p

`number`minimum: 0maximum: 1

top\_k

`number`exclusiveMinimum: 0

stream

`boolean`

▶metadata{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[\]

`array`

model

`string`

stop\_reason

`string | null`

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/thinkingmachines/inkling/#page","headline":"Inkling (thinkingmachines) · Cloudflare AI docs · Cloudflare AI docs","description":"Inkling is Thinking Machines' open-weights hybrid reasoning model, built on a mixture-of-experts architecture. It reasons by default, exposing its chain-of-thought as leading thinking content blocks, with reasoning effort tunable via a Tinker-specific output\\_config.effort parameter. Available through Tinker's beta Anthropic Messages-compatible endpoint alongside tool use, streaming, and multi-turn conversations. Currently intended for low-traffic testing and internal use rather than high-throughput production deployments; prompt caching, citations, and audio input are not supported through this endpoint.","url":"https://developers.cloudflare.com/ai/models/thinkingmachines/inkling/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
