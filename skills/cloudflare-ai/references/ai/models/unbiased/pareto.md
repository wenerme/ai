---
description: Pareto is Unbiased's blended AI model. It engages multiple language models in parallel for each request, synthesizes one answer, and supports text and vision inputs through a single API response.
title: Pareto
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

u

# Pareto

Text Generation • unbiased

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/unbiased/pareto/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`unbiased/pareto`

- Third-party
- Zero data retention

Pareto is Unbiased's blended AI model. It engages multiple language models in parallel for each request, synthesizes one answer, and supports text and vision inputs through a single API response.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://unbiased.ai/terms/) |
| More information | [link ↗](https://unbiased.ai/model-card/) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$2.50</li><li>Output (per 1M tokens)$7.50</li><li>Cached input (per 1M tokens)$0.25</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'unbiased/pareto',
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
  "model": "unbiased/pareto",
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
  "id": "chatcmpl-mu5ww8tss0mj6ofw",
  "object": "chat.completion",
  "model": "unbiased/pareto",
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
    "prompt_tokens": 11,
    "completion_tokens": 5,
    "total_tokens": 16,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.000045
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
  'unbiased/pareto',
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
  "model": "unbiased/pareto",
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
An API (Application Programming Interface) is a set of rules that lets one software program request information or actions from another. For example, a weather app uses an API to get forecasts from a weather service.
```

```json
{
  "id": "chatcmpl-mu5wwcpm6hxi7lsb",
  "object": "chat.completion",
  "model": "unbiased/pareto",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "An API (Application Programming Interface) is a set of rules that lets one software program request information or actions from another. For example, a weather app uses an API to get forecasts from a weather service."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 45,
    "total_tokens": 64,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.000305
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
  'unbiased/pareto',
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
  "model": "unbiased/pareto",
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
  return Array.from(str).reverse().join("");
}

console.log(reverseString("Hello")); // "olleH"
```
````

```json
{
  "id": "chatcmpl-mu5wwj1mqcjfe7xb",
  "object": "chat.completion",
  "model": "unbiased/pareto",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "```javascript\nfunction reverseString(str) {\n  return Array.from(str).reverse().join(\"\");\n}\n\nconsole.log(reverseString(\"Hello\")); // \"olleH\"\n```"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 37,
    "total_tokens": 51,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.00024875
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
  'unbiased/pareto',
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
  "model": "unbiased/pareto",
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
For a weekend trip, **prioritize location over extra amenities**—less time in transit means more time enjoying the city.

- **Close to your main plans:** Stay near the beach for a beach-focused trip, or near restaurants and sights if you’re more interested in exploring.
- **Easy transportation:** Check airport or station connections, public transit, and parking costs if you’re driving.
- **Comfort and quiet:** Recent reviews can reveal street noise, cleanliness issues
```

```json
{
  "id": "chatcmpl-mu5wwqlruoazrxij",
  "object": "chat.completion",
  "model": "unbiased/pareto",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "For a weekend trip, **prioritize location over extra amenities**—less time in transit means more time enjoying the city.\n\n- **Close to your main plans:** Stay near the beach for a beach-focused trip, or near restaurants and sights if you’re more interested in exploring.\n- **Easy transportation:** Check airport or station connections, public transit, and parking costs if you’re driving.\n- **Comfort and quiet:** Recent reviews can reveal street noise, cleanliness issues"
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
  'unbiased/pareto',
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
  "model": "unbiased/pareto",
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
The day lay heavy, stitched with shades of gray,
Until one star shone through the frayed dusk’s seam.
I set my burdens down beside the way,
And let its little light rekindle dream.
```

```json
{
  "id": "chatcmpl-mu5wx6hq2jpgslxe",
  "object": "chat.completion",
  "model": "unbiased/pareto",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The day lay heavy, stitched with shades of gray,\nUntil one star shone through the frayed dusk’s seam.\nI set my burdens down beside the way,\nAnd let its little light rekindle dream."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 46,
    "total_tokens": 58,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "cost": 0.0003025
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

Input [Open](https://developers.cloudflare.com/ai/models/unbiased/pareto/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/unbiased/pareto/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/unbiased/pareto/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/unbiased/pareto/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/unbiased/pareto/#page","headline":"Pareto","description":"Pareto is Unbiased's blended AI model. It engages multiple language models in parallel for each request, synthesizes one answer, and supports text and vision inputs through a single API response.","url":"https://developers.cloudflare.com/ai/models/unbiased/pareto/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
