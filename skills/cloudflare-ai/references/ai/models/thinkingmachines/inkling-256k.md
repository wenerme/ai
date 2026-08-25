---
description: The 256K-context variant of Inkling, Thinking Machines' open-weights hybrid reasoning MoE model. Same hybrid reasoning, tool-use, and streaming support as the base model, with an extended context window for longer conversations and documents. Currently intended for low-traffic testing and internal use rather than high-throughput production deployments.
title: Inkling 256K
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Inkling 256K

Text Generation • thinkingmachines

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/thinkingmachines/inkling-256k/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`thinkingmachines/inkling-256k`

* Third-party

The 256K-context variant of Inkling, Thinking Machines' open-weights hybrid reasoning MoE model. Same hybrid reasoning, tool-use, and streaming support as the base model, with an extended context window for longer conversations and documents. Currently intended for low-traffic testing and internal use rather than high-throughput production deployments.

| Model Info                                                                          |                                                                                                                                 |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 262,144 tokens                                                                                                                  |
| More information                                                                    | [link ↗](https://huggingface.co/thinkingmachines/Inkling)                                                                       |
| Request formats                                                                     | Anthropic Messages                                                                                                              |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/thinkingmachines/inkling-256k) |

## Usage

```ts
const response = await env.AI.run(
  'thinkingmachines/inkling-256k',
  { max_tokens: 512, messages: [{ content: 'The capital of France is', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "thinkingmachines/inkling-256k",
  "max_tokens": 512,
  "messages": [
    {
      "content": "The capital of France is",
      "role": "user"
    }
  ]
}'
```

The capital of France is **Paris**.

```json
{
  "id": "msg_f3f0874570144f29add4272d4f07491d",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "The user is asking \"The capital of France is\". This is a straightforward factual question. The capital of France is Paris. I should provide the answer clearly and concisely.",
      "signature": ""
    },
    {
      "type": "text",
      "text": "The capital of France is **Paris**."
    }
  ],
  "model": "thinkingmachines/Inkling:peft:262144",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 52,
    "cache_creation_input_tokens": 19,
    "cache_read_input_tokens": 0
  }
}
```

## Examples

**Tool Use** — Tool use round-trip: the model requests a tool call, then answers using the tool\_result supplied in a follow-up user message

```ts
const response = await env.AI.run(
  'thinkingmachines/inkling-256k',
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
  "model": "thinkingmachines/inkling-256k",
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

The weather in Paris is sunny with a temperature of 22°C.

```json
{
  "id": "msg_5711f240c8da46eeb462f8900281d087",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "The user asked for the weather in Paris. The function returned \"Sunny, 22°C\". I should provide a clear, concise answer.",
      "signature": ""
    },
    {
      "type": "text",
      "text": "The weather in Paris is sunny with a temperature of 22°C."
    }
  ],
  "model": "thinkingmachines/Inkling:peft:262144",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 49,
    "cache_creation_input_tokens": 95,
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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/thinkingmachines/inkling-256k/#page","headline":"Inkling 256K (thinkingmachines) · Cloudflare AI docs · Cloudflare AI docs","description":"The 256K-context variant of Inkling, Thinking Machines' open-weights hybrid reasoning MoE model. Same hybrid reasoning, tool-use, and streaming support as the base model, with an extended context window for longer conversations and documents. Currently intended for low-traffic testing and internal use rather than high-throughput production deployments.","url":"https://developers.cloudflare.com/ai/models/thinkingmachines/inkling-256k/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
