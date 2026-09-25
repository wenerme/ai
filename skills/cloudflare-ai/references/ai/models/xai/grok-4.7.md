---
description: xAI's Grok 4.7, a frontier reasoning model for coding, agentic tasks, and knowledge work. Accepts text and image inputs, and supports function calling, structured outputs, and configurable reasoning effort (low, medium, high, xhigh).
title: Grok 4.7
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok 4.7

Text Generation • xAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-4.7/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-4.7`

- Third-party
- Zero data retention

xAI's Grok 4.7, a frontier reasoning model for coding, agentic tasks, and knowledge work. Accepts text and image inputs, and supports function calling, structured outputs, and configurable reasoning effort (low, medium, high, xhigh).

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 500,000 tokens |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service-enterprise) |
| More information | [link ↗](https://docs.x.ai/developers/models/grok-4.7) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-4.7) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-4.7',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.7",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The three fundamental laws of thermodynamics (excluding the later-added zeroth law) are:

- **First law** (conservation of energy): Energy cannot be created or destroyed, only converted between forms. For a closed system, the change in internal energy \(\Delta U\) equals heat added \(Q\) minus work done by the system \(W\) (\(\Delta U = Q - W\)).

- **Second law** (entropy): The total entropy of an isolated system never decreases; it increases for irreversible processes and stays constant for reversible ones. Equivalently, heat does not spontaneously flow from a colder body to a hotter one, and no process can convert heat entirely into work without losses.

- **Third law**: The entropy of a perfect crystalline substance approaches a universal constant (often taken as zero) as temperature approaches absolute zero. Absolute zero is unattainable in any finite number of steps.

(The zeroth law, which defines thermal equilibrium and temperature, is sometimes listed alongside these.)
```

```json
{
  "id": "aa4ae961-5289-9990-b9fd-14db5eb33bc1",
  "object": "chat.completion",
  "created": 1790013433,
  "model": "grok-4.7",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The three fundamental laws of thermodynamics (excluding the later-added zeroth law) are:\n\n- **First law** (conservation of energy): Energy cannot be created or destroyed, only converted between forms. For a closed system, the change in internal energy \\(\\Delta U\\) equals heat added \\(Q\\) minus work done by the system \\(W\\) (\\(\\Delta U = Q - W\\)).\n\n- **Second law** (entropy): The total entropy of an isolated system never decreases; it increases for irreversible processes and stays constant for reversible ones. Equivalently, heat does not spontaneously flow from a colder body to a hotter one, and no process can convert heat entirely into work without losses.\n\n- **Third law**: The entropy of a perfect crystalline substance approaches a universal constant (often taken as zero) as temperature approaches absolute zero. Absolute zero is unattainable in any finite number of steps.\n\n(The zeroth law, which defines thermal equilibrium and temperature, is sometimes listed alongside these.)",
        "reasoning_content": "The question is: \"What are the three laws of thermodynamics?\"\nThe three laws of thermodynamics, as commonly referred to, are the first, second, and third laws. The zeroth law is sometimes listed separately as it sets the foundation for temperature.\n\nHere they are:\n\n**First Law**: Energy is conserved.",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 214,
    "completion_tokens": 200,
    "total_tokens": 959,
    "prompt_tokens_details": {
      "text_tokens": 214,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 545,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 47060000
  },
  "system_fingerprint": "fp_c60958d81f66f847",
  "service_tier": "default"
}
```

## Examples

<details>

<summary>**Image Understanding** — Analyze an image supplied alongside a text prompt</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.7',
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
  "model": "xai/grok-4.7",
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

```
A young woman with dark hair pulled back, wearing a navy knit sweater, gold necklace, and several rings, sits smiling while holding a small microphone with a fuzzy windscreen in a softly lit room with framed photos and a lamp.
```

```json
{
  "id": "f3f060d5-351e-96cb-b367-1091568e9f60",
  "object": "chat.completion",
  "created": 1790013440,
  "model": "grok-4.7",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "A young woman with dark hair pulled back, wearing a navy knit sweater, gold necklace, and several rings, sits smiling while holding a small microphone with a fuzzy windscreen in a softly lit room with framed photos and a lamp.",
        "reasoning_content": "The user wants me to describe the person in the image and their surroundings in one sentence. Let me observe the image carefully.\n",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 2679,
    "completion_tokens": 46,
    "total_tokens": 2951,
    "prompt_tokens_details": {
      "text_tokens": 272,
      "audio_tokens": 0,
      "image_tokens": 2407,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 226,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 67980000
  },
  "system_fingerprint": "fp_c60958d81f66f847",
  "service_tier": "default"
}
```

</details>

<details>

<summary>**Function Calling** — Force the model to return a typed function call</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.7',
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
  "model": "xai/grok-4.7",
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
  "id": "c6f138a4-af95-98d8-aa31-016f3650c2ec",
  "object": "chat.completion",
  "created": 1790013442,
  "model": "grok-4.7",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "reasoning_content": "The user wants the current temperature in San Francisco. I have a tool for that: get_temperature. It requires city and unit.\n",
        "tool_calls": [
          {
            "id": "call-6774f30b-801b-4ad9-9c49-c8809040decc-0",
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
    "completion_tokens": 17,
    "total_tokens": 428,
    "prompt_tokens_details": {
      "text_tokens": 333,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 78,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 10440000
  },
  "system_fingerprint": "fp_c60958d81f66f847",
  "service_tier": "default"
}
```

</details>

<details>

<summary>**Structured Output** — Constrain the response to a JSON schema</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.7',
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
  "model": "xai/grok-4.7",
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

```
{"confidence":0.95,"sentiment":"positive"}
```

```json
{
  "id": "db60c6df-4285-9e1a-97b8-30bb8136e5ac",
  "object": "chat.completion",
  "created": 1790013445,
  "model": "grok-4.7",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"confidence\":0.95,\"sentiment\":\"positive\"}",
        "reasoning_content": "The user wants me to classify the sentiment of the sentence: \"The launch was smooth and customers loved it.\"\n",
        "refusal": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 300,
    "completion_tokens": 12,
    "total_tokens": 454,
    "prompt_tokens_details": {
      "text_tokens": 300,
      "audio_tokens": 0,
      "image_tokens": 0,
      "cached_tokens": 128
    },
    "completion_tokens_details": {
      "reasoning_tokens": 142,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "num_sources_used": 0,
    "cost_in_usd_ticks": 13320000
  },
  "system_fingerprint": "fp_c60958d81f66f847",
  "service_tier": "default"
}
```

</details>

## Parameters

▶messages\[]

`array`requiredminItems: 1maxItems: 500

max\_completion\_tokens

`integer | null`

max\_tokens

`integer | null`

n

`integer | null`

parallel\_tool\_calls

`boolean`

prompt\_cache\_key

`string`

reasoning\_effort

`string | null`enum: low, medium, high, xhigh

▶response\_format

`one of`

▶search\_parameters{}

`object`

seed

`integer | null`

service\_tier

`string`enum: default, priority

stream

`boolean`

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

`string`

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

▶choices\[]

`array`

citations

`array | null`

output\_files

`array | null`

service\_tier

`string`enum: default, priority

system\_fingerprint

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/xai/grok-4.7/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/xai/grok-4.7/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/xai/grok-4.7/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/xai/grok-4.7/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-4.7/#page","headline":"Grok 4.7","description":"xAI's Grok 4.7, a frontier reasoning model for coding, agentic tasks, and knowledge work. Accepts text and image inputs, and supports function calling, structured outputs, and configurable reasoning effort (low, medium, high, xhigh).","url":"https://developers.cloudflare.com/ai/models/xai/grok-4.7/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
