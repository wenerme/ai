---
description: Particle-1 is Particle AI's reasoning model for chat, agentic coding, and tool use. It accepts text and images, with a 1,048,576-token context window, streaming responses, and configurable reasoning effort.
title: Particle-1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

p

# Particle-1

Text Generation • particle

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/particle/particle-1/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`particle/particle-1`

- Third-party
- Zero data retention

Particle-1 is Particle AI's reasoning model for chat, agentic coding, and tool use. It accepts text and images, with a 1,048,576-token context window, streaming responses, and configurable reasoning effort.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens |
| More information | [link ↗](https://docs.particle.ai/models) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$0.25</li><li>Cached input (per 1M tokens)$0.03</li><li>Output (per 1M tokens)$1.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'particle/particle-1',
  {
    messages: [{ role: 'user', content: 'Explain KV caching in two sentences.' }],
    reasoning_effort: 'none',
    max_completion_tokens: 256,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "particle/particle-1",
  "messages": [
    {
      "role": "user",
      "content": "Explain KV caching in two sentences."
    }
  ],
  "reasoning_effort": "none",
  "max_completion_tokens": 256
}'
```

```
KV caching stores the key and value tensors computed for each token during transformer attention so they can be reused instead of recomputed at every decoding step. This turns generation from quadratic to roughly linear work per new token, dramatically speeding up autoregressive inference at the cost of extra memory.
```

```json
{
  "id": "e5778c6255f749c6ac49ebfaa882266d",
  "object": "chat.completion",
  "created": 1793303112,
  "model": "particle/particle-1",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "KV caching stores the key and value tensors computed for each token during transformer attention so they can be reused instead of recomputed at every decoding step. This turns generation from quadratic to roughly linear work per new token, dramatically speeding up autoregressive inference at the cost of extra memory.",
        "tool_calls": null,
        "reasoning_content": null
      },
      "finish_reason": "stop",
      "logprobs": null,
      "matched_stop": 1
    }
  ],
  "usage": {
    "prompt_tokens": 64,
    "completion_tokens": 57,
    "total_tokens": 121,
    "completion_tokens_details": {
      "reasoning_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "reasoning_tokens": 0
  },
  "metadata": null,
  "service_tier": "free"
}
```

## Examples

<details>

<summary>**Streaming chat** — Stream a short explanation of exponential backoff.</summary>



```ts
const response = await env.AI.run(
  'particle/particle-1',
  {
    messages: [{ role: 'user', content: 'Explain exponential backoff in two sentences.' }],
    reasoning_effort: 'none',
    max_completion_tokens: 256,
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "particle/particle-1",
  "messages": [
    {
      "role": "user",
      "content": "Explain exponential backoff in two sentences."
    }
  ],
  "reasoning_effort": "none",
  "max_completion_tokens": 256,
  "stream": true
}'
```

```
Exponential backoff is a strategy where a system retries a failed operation after waiting progressively longer intervals, typically doubling the delay after each attempt. It helps reduce contention and avoid overwhelming a struggling service by spreading out retries over time.
```

```json
[
  {
    "id": "819751464b54400dadedfd50c69e91ca",
    "object": "chat.completion.chunk",
    "created": 1793303113,
    "model": "particle-ai/particle-1",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": null,
          "role": "assistant",
          "content": ""
        },
        "logprobs": null,
        "finish_reason": null,
        "matched_stop": null
      }
    ],
    "service_tier": "free"
  },
  {
    "id": "819751464b54400dadedfd50c69e91ca",
    "object": "chat.completion.chunk",
    "created": 1793303113,
    "model": "particle-ai/particle-1",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": null,
          "content": "Ex"
        },
        "logprobs": null,
        "finish_reason": null,
        "matched_stop": null
      }
    ],
    "service_tier": "free"
  },
  "... 20 more chunks omitted ...",
  {
    "id": "819751464b54400dadedfd50c69e91ca",
    "object": "chat.completion.chunk",
    "created": 1793303113,
    "model": "particle-ai/particle-1",
    "choices": [],
    "usage": {
      "prompt_tokens": 65,
      "total_tokens": 113,
      "completion_tokens": 48,
      "completion_tokens_details": {
        "reasoning_tokens": 0
      },
      "prompt_tokens_details": {
        "cached_tokens": 0
      },
      "reasoning_tokens": 0
    },
    "service_tier": "free"
  }
]
```

</details>

<details>

<summary>**Tool calling** — Ask Particle-1 to call a weather lookup function.</summary>



```ts
const response = await env.AI.run(
  'particle/particle-1',
  {
    messages: [{ role: 'user', content: 'What is the weather in Paris?' }],
    reasoning_effort: 'none',
    max_completion_tokens: 256,
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get the current weather for a city.',
          parameters: {
            type: 'object',
            properties: { city: { type: 'string' } },
            required: ['city'],
          },
        },
      },
    ],
    tool_choice: { type: 'function', function: { name: 'get_weather' } },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "particle/particle-1",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather in Paris?"
    }
  ],
  "reasoning_effort": "none",
  "max_completion_tokens": 256,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get the current weather for a city.",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string"
            }
          },
          "required": [
            "city"
          ]
        }
      }
    }
  ],
  "tool_choice": {
    "type": "function",
    "function": {
      "name": "get_weather"
    }
  }
}'
```

```json
{
  "id": "3831fab494624c51ba5cd542d5b807a6",
  "object": "chat.completion",
  "created": 1793303113,
  "model": "particle/particle-1",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "tool_calls": [
          {
            "id": "call_b6bcda29bef84dcf80a570a1",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\": \"Paris\"}"
            }
          }
        ],
        "reasoning_content": null
      },
      "finish_reason": "tool_calls",
      "logprobs": null,
      "matched_stop": 1
    }
  ],
  "usage": {
    "prompt_tokens": 324,
    "completion_tokens": 39,
    "total_tokens": 363,
    "completion_tokens_details": {
      "reasoning_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "reasoning_tokens": 0
  },
  "metadata": null,
  "service_tier": "free"
}
```

</details>

## Parameters

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

Input [Open](https://developers.cloudflare.com/ai/models/particle/particle-1/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/particle/particle-1/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/particle/particle-1/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/particle/particle-1/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/particle/particle-1/#page","headline":"Particle-1","description":"Particle-1 is Particle AI's reasoning model for chat, agentic coding, and tool use. It accepts text and images, with a 1,048,576-token context window, streaming responses, and configurable reasoning effort.","url":"https://developers.cloudflare.com/ai/models/particle/particle-1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
