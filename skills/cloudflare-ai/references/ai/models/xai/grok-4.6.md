---
description: xAI's Grok 4.6, a flagship reasoning model for coding, agentic tasks, and visual work. Accepts text and image inputs, and supports function calling and structured outputs.
title: Grok 4.6
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok 4.6

Text Generation • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-4.6/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-4.6`

* Third-party
* Zero data retention

xAI's Grok 4.6, a flagship reasoning model for coding, agentic tasks, and visual work. Accepts text and image inputs, and supports function calling and structured outputs.

| Model Info                                                                          |                                                                                                                |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 500,000 tokens                                                                                                 |
| Terms and License                                                                   | [link ↗](https://x.ai/legal/terms-of-service-enterprise)                                                       |
| More information                                                                    | [link ↗](https://docs.x.ai/developers/models)                                                                  |
| Zero data retention                                                                 | Yes                                                                                                            |
| Request formats                                                                     | Chat Completions                                                                                               |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-4.6) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-4.6',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.6",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

**First law (conservation of energy):** The internal energy of an isolated system is constant; energy can change form (e.g., heat \(\leftrightarrow\) work) but is neither created nor destroyed. In equation form, \(\Delta U = Q - W\) (sign conventions vary).

**Second law (entropy/directionality):** The entropy of an isolated system never decreases; spontaneous processes increase total entropy. Equivalently, heat cannot spontaneously flow from a colder body to a hotter one, and no cyclic process can convert heat entirely into work with 100% efficiency (Kelvin–Planck and Clausius statements).

**Third law (unattainability of absolute zero):** As temperature approaches 0 K, the entropy of a perfect crystal approaches a minimum (conventionally taken as zero). Absolute zero is therefore unattainable in a finite number of steps.

(The zeroth law, which underpins the definition of temperature via thermal equilibrium, is sometimes listed separately and was formalized later.)

These statements have multiple equivalent formulations; the versions above are the most common in introductory physics/chemistry.

```json
{
  "id": "46e7d84b-3292-9934-9830-10a2926ac872",
  "object": "chat.completion",
  "created": 1786550938,
  "model": "grok-4.6",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**First law (conservation of energy):** The internal energy of an isolated system is constant; energy can change form (e.g., heat \\(\\leftrightarrow\\) work) but is neither created nor destroyed. In equation form, \\(\\Delta U = Q - W\\) (sign conventions vary).\n\n**Second law (entropy/directionality):** The entropy of an isolated system never decreases; spontaneous processes increase total entropy. Equivalently, heat cannot spontaneously flow from a colder body to a hotter one, and no cyclic process can convert heat entirely into work with 100% efficiency (Kelvin–Planck and Clausius statements).\n\n**Third law (unattainability of absolute zero):** As temperature approaches 0 K, the entropy of a perfect crystal approaches a minimum (conventionally taken as zero). Absolute zero is therefore unattainable in a finite number of steps.\n\n(The zeroth law, which underpins the definition of temperature via thermal equilibrium, is sometimes listed separately and was formalized later.)\n\nThese statements have multiple equivalent formulations; the versions above are the most common in introductory physics/chemistry.",
        "reasoning_content": "The question is: \"What are the three laws of thermodynamics?\"\nThe three laws of thermodynamics are:\n\n1. **First Law**: Energy is conserved. It cannot be created or destroyed, only converted between forms. The change in internal energy of a system equals the heat added to it minus the work done by it: ΔU = Q - W.\n\n2.",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 214,
    "completion_tokens": 220,
    "total_tokens": 870,
    "prompt_tokens_details": {
      "text_tokens": 214,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 436,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 41720000
  },
  "system_fingerprint": "fp_a7b4933f4a93564d",
  "service_tier": "default"
}
```

## Examples

**Image Understanding** — Analyze an image supplied alongside a text prompt

```ts
const response = await env.AI.run(
  'xai/grok-4.6',
  {
    messages: [
      {
        content: [
          {
            image_url: { url: 'https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png' },
            type: 'image_url',
          },
          {
            text: 'Describe the person in this image and their surroundings in one sentence.',
            type: 'text',
          },
        ],
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.6",
  "messages": [
    {
      "content": [
        {
          "image_url": {
            "url": "https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png"
          },
          "type": "image_url"
        },
        {
          "text": "Describe the person in this image and their surroundings in one sentence.",
          "type": "text"
        }
      ],
      "role": "user"
    }
  ]
}'
```

A smiling young woman with dark hair in a navy knit sweater holds a fuzzy microphone while seated in a cozy room with a white fireplace mantel, framed photo collage, and warm lighting.

```json
{
  "id": "5f620cf3-cd07-9a84-99d8-00f6f8712f95",
  "object": "chat.completion",
  "created": 1786550950,
  "model": "grok-4.6",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "A smiling young woman with dark hair in a navy knit sweater holds a fuzzy microphone while seated in a cozy room with a white fireplace mantel, framed photo collage, and warm lighting.",
        "reasoning_content": "The task is: \"Describe the person in this image and their surroundings in one sentence.\"\n",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 2628,
    "completion_tokens": 36,
    "total_tokens": 2925,
    "prompt_tokens_details": {
      "text_tokens": 221,
      "audio_tokens": 0,
      "image_tokens": 2407,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 261,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 68460000
  },
  "system_fingerprint": "fp_a7b4933f4a93564d",
  "service_tier": "default"
}
```

**Function Calling** — Force the model to return a typed function call

```ts
const response = await env.AI.run(
  'xai/grok-4.6',
  {
    messages: [{ content: 'What is the current temperature in San Francisco?', role: 'user' }],
    tool_choice: 'required',
    tools: [
      {
        function: {
          description: 'Get the current temperature for a city',
          name: 'get_temperature',
          parameters: {
            additionalProperties: false,
            properties: {
              city: { type: 'string' },
              unit: { enum: ['celsius', 'fahrenheit'], type: 'string' },
            },
            required: ['city', 'unit'],
            type: 'object',
          },
          strict: true,
        },
        type: 'function',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.6",
  "messages": [
    {
      "content": "What is the current temperature in San Francisco?",
      "role": "user"
    }
  ],
  "tool_choice": "required",
  "tools": [
    {
      "function": {
        "description": "Get the current temperature for a city",
        "name": "get_temperature",
        "parameters": {
          "additionalProperties": false,
          "properties": {
            "city": {
              "type": "string"
            },
            "unit": {
              "enum": [
                "celsius",
                "fahrenheit"
              ],
              "type": "string"
            }
          },
          "required": [
            "city",
            "unit"
          ],
          "type": "object"
        },
        "strict": true
      },
      "type": "function"
    }
  ]
}'
```

```json
{
  "id": "d1c2cf6d-a4c2-9b8b-a6e3-ff60e4dd12b8",
  "object": "chat.completion",
  "created": 1786550955,
  "model": "grok-4.6",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "reasoning_content": "The user is asking for the current temperature in San Francisco. I have a tool called \"get_temperature\" that can get the current temperature for a city. It requires \"city\" and \"unit\".\n",
        "tool_calls": [
          {
            "id": "call-67aeb658-cc74-4375-b860-f18970d8187a-0",
            "function": {
              "name": "get_temperature",
              "arguments": "{\"city\":\"San Francisco\",\"unit\":\"fahrenheit\"}"
            },
            "type": "function"
          }
        ],
        "refusal": null
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 333,
    "completion_tokens": 20,
    "total_tokens": 654,
    "prompt_tokens_details": {
      "text_tokens": 333,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 301,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 24000000
  },
  "system_fingerprint": "fp_a7b4933f4a93564d",
  "service_tier": "default"
}
```

**Structured Output** — Constrain the response to a JSON schema

```ts
const response = await env.AI.run(
  'xai/grok-4.6',
  {
    messages: [
      {
        content: 'Classify the sentiment of: The launch was smooth and customers loved it.',
        role: 'user',
      },
    ],
    response_format: {
      json_schema: {
        name: 'sentiment_result',
        schema: {
          additionalProperties: false,
          properties: {
            confidence: { maximum: 1, minimum: 0, type: 'number' },
            sentiment: { enum: ['positive', 'neutral', 'negative'], type: 'string' },
          },
          required: ['sentiment', 'confidence'],
          type: 'object',
        },
        strict: true,
      },
      type: 'json_schema',
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.6",
  "messages": [
    {
      "content": "Classify the sentiment of: The launch was smooth and customers loved it.",
      "role": "user"
    }
  ],
  "response_format": {
    "json_schema": {
      "name": "sentiment_result",
      "schema": {
        "additionalProperties": false,
        "properties": {
          "confidence": {
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "sentiment": {
            "enum": [
              "positive",
              "neutral",
              "negative"
            ],
            "type": "string"
          }
        },
        "required": [
          "sentiment",
          "confidence"
        ],
        "type": "object"
      },
      "strict": true
    },
    "type": "json_schema"
  }
}'
```

{"confidence":0.95,"sentiment":"positive"}

```json
{
  "id": "e89a3a47-b193-9785-9c35-f4dd3c098107",
  "object": "chat.completion",
  "created": 1786550957,
  "model": "grok-4.6",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"confidence\":0.95,\"sentiment\":\"positive\"}",
        "reasoning_content": "The task is to classify the sentiment of: \"The launch was smooth and customers loved it.\"\n",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 300,
    "completion_tokens": 12,
    "total_tokens": 607,
    "prompt_tokens_details": {
      "text_tokens": 300,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 295,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 22500000
  },
  "system_fingerprint": "fp_a7b4933f4a93564d",
  "service_tier": "default"
}
```

## Parameters

▶messages\[\]

`array`requiredminItems: 1maxItems: 500

max\_completion\_tokens

`integer | null`

max\_tokens

`integer | null`

n

`integer | null`

parallel\_tool\_calls

`boolean | null`

prompt\_cache\_key

`string | null`

reasoning\_effort

`string | null`enum: low, medium, high

▶response\_format

`one of`

▶search\_parameters{}

`object`

seed

`integer | null`

service\_tier

`string`enum: default, priority

stream

`boolean | null`

▶stream\_options{}

`object`

temperature

`number | null`

▶tool\_choice

`one of`

tools

`array | null`

top\_p

`number | null`

user

`string | null`

▶web\_search\_options{}

`object`

id

`string`

object

`string`const: chat.completion

created

`number`

model

`string`

▶choices\[\]

`array`

citations

`array | null`

output\_files

`array | null`

service\_tier

`string`enum: default, priority

system\_fingerprint

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-4.6/#page","headline":"Grok 4.6 (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok 4.6, a flagship reasoning model for coding, agentic tasks, and visual work. Accepts text and image inputs, and supports function calling and structured outputs.","url":"https://developers.cloudflare.com/ai/models/xai/grok-4.6/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
