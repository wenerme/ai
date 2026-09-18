---
description: Union Alpha is a multimodal model designed for research, coding, and agentic workflows. It delivers frontier-level performance across diverse general-purpose tasks.
title: Union Alpha
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

s

# Union Alpha

Text Generation • stealth

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/stealth/union-alpha/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`stealth/union-alpha`

- Third-party

Union Alpha is a multimodal model designed for research, coding, and agentic workflows. It delivers frontier-level performance across diverse general-purpose tasks.

## Usage

```ts
const response = await env.AI.run(
  'stealth/union-alpha',
  {
    messages: [{ content: 'What is the capital of France? Answer in one word.', role: 'user' }],
    max_tokens: 16,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "stealth/union-alpha",
  "messages": [
    {
      "content": "What is the capital of France? Answer in one word.",
      "role": "user"
    }
  ],
  "max_tokens": 16
}'
```

```
Paris
```

```json
{
  "id": "chatcmpl-mu3b7o02sf9tov9z",
  "object": "chat.completion",
  "model": "union-alpha",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Paris"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 29,
    "completion_tokens": 5,
    "total_tokens": 34,
    "prompt_tokens_details": {
      "cached_tokens": 28
    },
    "cost": 0.000036700000000000004
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**System Guidance** — Set a helpful system role before asking a question.</summary>



```ts
const response = await env.AI.run(
  'stealth/union-alpha',
  {
    messages: [
      { content: 'You explain technical topics in plain language.', role: 'system' },
      { content: 'What is an API? Explain it in two sentences.', role: 'user' },
    ],
    max_tokens: 64,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "stealth/union-alpha",
  "messages": [
    {
      "content": "You explain technical topics in plain language.",
      "role": "system"
    },
    {
      "content": "What is an API? Explain it in two sentences.",
      "role": "user"
    }
  ],
  "max_tokens": 64
}'
```

```
An API (Application Programming Interface) is a set of rules that lets different software programs communicate with each other. For example, a weather app can use an API to request the latest forecast from a weather service.
```

```json
{
  "id": "chatcmpl-mu3b7pxpj3kdi2v5",
  "object": "chat.completion",
  "model": "union-alpha",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "An API (Application Programming Interface) is a set of rules that lets different software programs communicate with each other. For example, a weather app can use an API to request the latest forecast from a weather service."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 46,
    "total_tokens": 65,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.00031125
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Coding Example** — Ask for a short coding example.</summary>



```ts
const response = await env.AI.run(
  'stealth/union-alpha',
  {
    messages: [
      {
        content: 'Write a JavaScript function that reverses a string. Include one example call.',
        role: 'user',
      },
    ],
    max_tokens: 128,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "stealth/union-alpha",
  "messages": [
    {
      "content": "Write a JavaScript function that reverses a string. Include one example call.",
      "role": "user"
    }
  ],
  "max_tokens": 128
}'
```

````
```javascript
function reverseString(str) {
  return [...str].reverse().join("");
}

// Example call:
console.log(reverseString("hello")); // "olleh"
```
````

```json
{
  "id": "chatcmpl-mu3b7t0objtvuaa4",
  "object": "chat.completion",
  "model": "union-alpha",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "```javascript\nfunction reverseString(str) {\n  return [...str].reverse().join(\"\");\n}\n\n// Example call:\nconsole.log(reverseString(\"hello\")); // \"olleh\"\n```"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 39,
    "total_tokens": 53,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.00026125
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Follow-up Conversation** — Continue a short conversation with prior assistant context.</summary>



```ts
const response = await env.AI.run(
  'stealth/union-alpha',
  {
    messages: [
      { content: 'I am planning a weekend trip to a coastal city.', role: 'user' },
      {
        content: 'Consider walkable neighborhoods, local food, and a nearby beach.',
        role: 'assistant',
      },
      { content: 'What should I prioritize when choosing where to stay?', role: 'user' },
    ],
    max_tokens: 96,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "stealth/union-alpha",
  "messages": [
    {
      "content": "I am planning a weekend trip to a coastal city.",
      "role": "user"
    },
    {
      "content": "Consider walkable neighborhoods, local food, and a nearby beach.",
      "role": "assistant"
    },
    {
      "content": "What should I prioritize when choosing where to stay?",
      "role": "user"
    }
  ],
  "max_tokens": 96
}'
```

```
Prioritize **location over amenities** for a short weekend—you’ll get more out of your trip if you spend less time in transit.

- **Your main activity:** Stay near the beach for a relaxing getaway, or near the center for restaurants, sightseeing, and nightlife.
- **Walkability and transport:** Look for cafés and dinner options within walking distance, plus easy access to the airport or train station. If you’re driving, check parking costs.
- **Total
```

```json
{
  "id": "chatcmpl-mu3b7wo2jrkvi2t8",
  "object": "chat.completion",
  "model": "union-alpha",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Prioritize **location over amenities** for a short weekend—you’ll get more out of your trip if you spend less time in transit.\n\n- **Your main activity:** Stay near the beach for a relaxing getaway, or near the center for restaurants, sightseeing, and nightlife.\n- **Walkability and transport:** Look for cafés and dinner options within walking distance, plus easy access to the airport or train station. If you’re driving, check parking costs.\n- **Total"
      },
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 43,
    "completion_tokens": 96,
    "total_tokens": 139,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.00065375
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Generate a compact piece of creative writing.</summary>



```ts
const response = await env.AI.run(
  'stealth/union-alpha',
  {
    messages: [
      { content: 'Write a four-line poem about finding light after a difficult day.', role: 'user' },
    ],
    max_tokens: 96,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "stealth/union-alpha",
  "messages": [
    {
      "content": "Write a four-line poem about finding light after a difficult day.",
      "role": "user"
    }
  ],
  "max_tokens": 96
}'
```

```
The weary day sank softly out of sight,
And left me searching shadows for a spark.
Then one small star unfolded into light—
Enough to lead me gently through the dark.
```

```json
{
  "id": "chatcmpl-mu3b80ptkze4dltt",
  "object": "chat.completion",
  "model": "union-alpha",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The weary day sank softly out of sight,\nAnd left me searching shadows for a spark.\nThen one small star unfolded into light—\nEnough to lead me gently through the dark."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 39,
    "total_tokens": 51,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.00025875
  },
  "gatewayMetadata": {
    "keySource": "Unified"
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

Input [Open](https://developers.cloudflare.com/ai/models/stealth/union-alpha/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/stealth/union-alpha/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/stealth/union-alpha/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/stealth/union-alpha/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/stealth/union-alpha/#page","headline":"Union Alpha (stealth) · Cloudflare AI docs · Cloudflare AI docs","description":"Union Alpha is a multimodal model designed for research, coding, and agentic workflows. It delivers frontier-level performance across diverse general-purpose tasks.","url":"https://developers.cloudflare.com/ai/models/stealth/union-alpha/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
