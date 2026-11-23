---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Xiaomi MiMo-V2.6-Pro is a reasoning model served by PrimaLabs. It thinks before it answers, supports tool calling and prompt caching, and has a context window of about 1M tokens through an OpenAI-compatible Chat Completions API.
title: MiMo-V2.6-Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

x

# MiMo-V2.6-Pro

Text Generation • xiaomi

Model ID

`xiaomi/mimo-v2.6-pro` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Xiaomi MiMo-V2.6-Pro is a reasoning model served by PrimaLabs. It thinks before it answers, supports tool calling and prompt caching, and has a context window of about 1M tokens through an OpenAI-compatible Chat Completions API.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens |
| More information | [link ↗](https://docs.primalabs.ai/inference/models.md) |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$4.00</li><li>Output (per 1M tokens)$8.00</li><li>Cached input (per 1M tokens)$0.036</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'xiaomi/mimo-v2.6-pro',
  {
    messages: [{ role: 'user', content: 'Explain KV caching in two sentences.' }],
    max_completion_tokens: 2048,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xiaomi/mimo-v2.6-pro",
  "messages": [
    {
      "role": "user",
      "content": "Explain KV caching in two sentences."
    }
  ],
  "max_completion_tokens": 2048
}'
```

```
KV caching stores the key and value tensors computed at each layer during the autoregressive generation of a transformer so that, on the next token prediction, the model only needs to compute attention for the new token against the cached keys and values rather than reprocessing the entire sequence from scratch. This avoids redundant computation across decoding steps, reducing time complexity from O(n²) to O(n) per new token and making text generation significantly faster.
```

```json
{
  "id": "chatcmpl-b690f48c7de59601",
  "object": "chat.completion",
  "created": 1794584767,
  "model": "xiaomi/mimo-v2.6-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "KV caching stores the key and value tensors computed at each layer during the autoregressive generation of a transformer so that, on the next token prediction, the model only needs to compute attention for the new token against the cached keys and values rather than reprocessing the entire sequence from scratch. This avoids redundant computation across decoding steps, reducing time complexity from O(n²) to O(n) per new token and making text generation significantly faster.",
        "reasoning_content": "The user wants a concise two-sentence explanation of KV caching.",
        "provider_specific_fields": {
          "refusal": null,
          "reasoning": "The user wants a concise two-sentence explanation of KV caching."
        }
      },
      "finish_reason": "stop",
      "provider_specific_fields": {
        "token_ids": null,
        "routed_experts": null
      }
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 103,
    "total_tokens": 118,
    "completion_tokens_details": {
      "reasoning_tokens": 13
    },
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "created_cache_tokens": 0
    }
  }
}
```

## Examples

<details>

<summary>**Streaming chat** — Stream a short explanation of exponential backoff.</summary>



```ts
const response = await env.AI.run(
  'xiaomi/mimo-v2.6-pro',
  {
    messages: [{ role: 'user', content: 'Explain exponential backoff in two sentences.' }],
    max_completion_tokens: 2048,
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
  "model": "xiaomi/mimo-v2.6-pro",
  "messages": [
    {
      "role": "user",
      "content": "Explain exponential backoff in two sentences."
    }
  ],
  "max_completion_tokens": 2048,
  "stream": true
}'
```

```
Exponential backoff is a retry strategy where the wait time between successive attempts increases exponentially (e.g., 1s, 2s, 4s, 8s…) rather than remaining constant. This prevents overwhelming a struggling service or network with rapid repeated requests and gives it time to recover before the next attempt.
```

```json
[
  {
    "id": "chatcmpl-b41c1b2c54f92779",
    "object": "chat.completion.chunk",
    "created": 1794584769,
    "model": "primalabs-ai/MiMo-V2.6-Pro-cloudflare",
    "choices": [
      {
        "index": 0,
        "delta": {
          "role": "assistant",
          "content": ""
        }
      }
    ]
  },
  {
    "id": "chatcmpl-b41c1b2c54f92779",
    "created": 1794584769,
    "model": "primalabs-ai/MiMo-V2.6-Pro-cloudflare",
    "object": "chat.completion.chunk",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": "The user wants a concise two-sentence explanation of exponential backoff."
        }
      }
    ]
  },
  "... 27 more chunks omitted ...",
  {
    "id": "chatcmpl-b41c1b2c54f92779",
    "created": 1794584769,
    "model": "primalabs-ai/MiMo-V2.6-Pro-cloudflare",
    "object": "chat.completion.chunk",
    "choices": [
      {
        "index": 0,
        "delta": {}
      }
    ],
    "usage": {
      "completion_tokens": 82,
      "prompt_tokens": 16,
      "total_tokens": 98,
      "completion_tokens_details": {
        "reasoning_tokens": 14
      },
      "prompt_tokens_details": {
        "cached_tokens": 0,
        "created_cache_tokens": 16
      },
      "cost": 0.00072
    }
  }
]
```

</details>

<details>

<summary>**Tool calling** — Ask MiMo-V2.6-Pro to call a weather lookup function.</summary>



```ts
const response = await env.AI.run(
  'xiaomi/mimo-v2.6-pro',
  {
    messages: [{ role: 'user', content: 'What is the weather in Paris?' }],
    max_completion_tokens: 2048,
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
  "model": "xiaomi/mimo-v2.6-pro",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather in Paris?"
    }
  ],
  "max_completion_tokens": 2048,
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
  "id": "chatcmpl-8692555c2e4e4ec8",
  "object": "chat.completion",
  "created": 1794584770,
  "model": "xiaomi/mimo-v2.6-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "tool_calls": [
          {
            "function": {
              "arguments": "{\"city\": \"Paris\"}",
              "name": "get_weather"
            },
            "id": "chatcmpl-tool-85225333bedb366a",
            "type": "function"
          }
        ],
        "reasoning_content": "The user wants weather in Paris.",
        "provider_specific_fields": {
          "refusal": null,
          "reasoning": "The user wants weather in Paris."
        }
      },
      "finish_reason": "tool_calls",
      "provider_specific_fields": {
        "token_ids": null,
        "routed_experts": null
      }
    }
  ],
  "usage": {
    "prompt_tokens": 90,
    "completion_tokens": 27,
    "total_tokens": 117,
    "completion_tokens_details": {
      "reasoning_tokens": 7
    },
    "prompt_tokens_details": {
      "cached_tokens": 16,
      "created_cache_tokens": 64
    }
  }
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

Input [Open](https://developers.cloudflare.com/ai/models/xiaomi/mimo-v2.6-pro/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/xiaomi/mimo-v2.6-pro/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/xiaomi/mimo-v2.6-pro/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/xiaomi/mimo-v2.6-pro/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xiaomi/mimo-v2.6-pro/#page","headline":"MiMo-V2.6-Pro","description":"Xiaomi MiMo-V2.6-Pro is a reasoning model served by PrimaLabs. It thinks before it answers, supports tool calling and prompt caching, and has a context window of about 1M tokens through an OpenAI-compatible Chat Completions API.","url":"https://developers.cloudflare.com/ai/models/xiaomi/mimo-v2.6-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
