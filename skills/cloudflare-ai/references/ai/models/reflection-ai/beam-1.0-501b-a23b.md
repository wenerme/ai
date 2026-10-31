---
description: Beam-1.0-501B-A23B is Reflection AI's open-weights mixture-of-experts model with 501B total parameters and 23B active parameters, built for coding, reasoning, and agentic workloads.
title: Beam 1.0 501B A23B
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

r

# Beam 1.0 501B A23B

Text Generation • reflection-ai

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`reflection-ai/beam-1.0-501b-a23b`

- Third-party
- Zero data retention

Beam-1.0-501B-A23B is Reflection AI's open-weights mixture-of-experts model with 501B total parameters and 23B active parameters, built for coding, reasoning, and agentic workloads.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 262,144 tokens |
| Terms and License | [link ↗](https://developers.reflection.ai/introduction) |
| More information | [link ↗](https://developers.reflection.ai/models) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$0.00</li><li>Cached input (per 1M tokens)$0.00</li><li>Output (per 1M tokens)$0.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'reflection-ai/beam-1.0-501b-a23b',
  {
    messages: [{ role: 'user', content: 'Explain why the sky is blue in one sentence.' }],
    max_completion_tokens: 256,
    reasoning_effort: 'low',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "messages": [
    {
      "role": "user",
      "content": "Explain why the sky is blue in one sentence."
    }
  ],
  "max_completion_tokens": 256,
  "reasoning_effort": "low"
}'
```

```
The sky is blue because sunlight undergoes Rayleigh scattering in the atmosphere, which preferentially redirects shorter blue wavelengths toward your eyes.
```

```json
{
  "id": "chatcmpl-002d24bd-de9c-4bab-947d-47f77166eb5c",
  "object": "chat.completion",
  "created": 1792089654,
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The sky is blue because sunlight undergoes Rayleigh scattering in the atmosphere, which preferentially redirects shorter blue wavelengths toward your eyes.",
        "refusal": null,
        "reasoning_content": "The user asks: \"Explain why the sky is blue in one sentence.\" Straightforward. Need one sentence. Ensure accuracy: Rayleigh scattering scatters shorter blue wavelengths more. Provide concise. No safety issues."
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 506,
    "completion_tokens": 79,
    "total_tokens": 585,
    "prompt_tokens_details": {
      "cached_tokens": 448
    },
    "completion_tokens_details": {
      "reasoning_tokens": 50
    }
  }
}
```

## Examples

<details>

<summary>**Structured project status** — Return a typed project status summary using structured output</summary>



```ts
const response = await env.AI.run(
  'reflection-ai/beam-1.0-501b-a23b',
  {
    messages: [
      {
        role: 'user',
        content:
          'Summarize this project update: API integration is complete, security review is scheduled for Friday, and the mobile client is blocked on final design assets.',
      },
    ],
    max_completion_tokens: 512,
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'project_status',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            overall_status: { type: 'string', enum: ['on_track', 'at_risk', 'blocked'] },
            completed: { type: 'array', items: { type: 'string' } },
            next_steps: { type: 'array', items: { type: 'string' } },
            blockers: { type: 'array', items: { type: 'string' } },
          },
          required: ['overall_status', 'completed', 'next_steps', 'blockers'],
          additionalProperties: false,
        },
      },
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
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "messages": [
    {
      "role": "user",
      "content": "Summarize this project update: API integration is complete, security review is scheduled for Friday, and the mobile client is blocked on final design assets."
    }
  ],
  "max_completion_tokens": 512,
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "project_status",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "overall_status": {
            "type": "string",
            "enum": [
              "on_track",
              "at_risk",
              "blocked"
            ]
          },
          "completed": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "next_steps": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "blockers": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "overall_status",
          "completed",
          "next_steps",
          "blockers"
        ],
        "additionalProperties": false
      }
    }
  }
}'
```

```
{"overall_status": "on_track",
"completed": ["API integration"],
"next_steps": ["Security review scheduled for Friday"],
"blockers": ["Mobile client awaiting final design assets"]}
```

```json
{
  "id": "chatcmpl-781353f2-706b-4d56-b771-c785968bbf97",
  "object": "chat.completion",
  "created": 1792089661,
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"overall_status\": \"on_track\",\n\"completed\": [\"API integration\"],\n\"next_steps\": [\"Security review scheduled for Friday\"],\n\"blockers\": [\"Mobile client awaiting final design assets\"]}",
        "refusal": null,
        "reasoning_content": "The user wants a summary of a project update. Straightforward. Just summarize."
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 527,
    "completion_tokens": 64,
    "total_tokens": 591,
    "prompt_tokens_details": {
      "cached_tokens": 512
    },
    "completion_tokens_details": {
      "reasoning_tokens": 18
    }
  }
}
```

</details>

<details>

<summary>**Weather tool call** — Choose a weather lookup function and supply its arguments</summary>



```ts
const response = await env.AI.run(
  'reflection-ai/beam-1.0-501b-a23b',
  {
    messages: [{ role: 'user', content: 'What is the weather in Lisbon today?' }],
    max_completion_tokens: 256,
    tool_choice: 'required',
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Look up the current weather for a city.',
          parameters: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              units: { type: 'string', enum: ['celsius', 'fahrenheit'] },
            },
            required: ['city', 'units'],
            additionalProperties: false,
          },
        },
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
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather in Lisbon today?"
    }
  ],
  "max_completion_tokens": 256,
  "tool_choice": "required",
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Look up the current weather for a city.",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string"
            },
            "units": {
              "type": "string",
              "enum": [
                "celsius",
                "fahrenheit"
              ]
            }
          },
          "required": [
            "city",
            "units"
          ],
          "additionalProperties": false
        }
      }
    }
  ]
}'
```

```json
{
  "id": "chatcmpl-fda9d6ad-dcb0-4b60-9e5a-4d78f406ecc1",
  "object": "chat.completion",
  "created": 1792089672,
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call-c105de7f-4e34-4ce9-bab9-ef2e6a89b645",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\": \"Lisbon\", \"units\": \"celsius\"}"
            }
          }
        ],
        "refusal": null,
        "reasoning_content": "The user is asking about the weather in Lisbon today. I have a tool to get weather. Let me call it with city Lisbon and units... the user didn't specify units. Celsius is reasonable default, but maybe I should pick. Let me use celsius as default. Actually, let me just call."
      },
      "finish_reason": "tool_calls",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 544,
    "completion_tokens": 92,
    "total_tokens": 636,
    "prompt_tokens_details": {
      "cached_tokens": 512
    },
    "completion_tokens_details": {
      "reasoning_tokens": 69
    }
  }
}
```

</details>

<details>

<summary>**Scheduling reasoning** — Reason through a scheduling constraint with system guidance</summary>



```ts
const response = await env.AI.run(
  'reflection-ai/beam-1.0-501b-a23b',
  {
    messages: [
      {
        role: 'system',
        content: 'Answer concisely and show the scheduling logic in two bullet points.',
      },
      {
        role: 'user',
        content:
          'Maya is available Monday and Wednesday. Theo is available Wednesday and Thursday. Priya is available Monday, Wednesday, and Friday. Which day should they schedule a 90-minute meeting, and why?',
      },
      { role: 'user', content: 'The meeting must include all three attendees.' },
      { role: 'user', content: 'Please give the recommendation.' },
    ],
    max_completion_tokens: 384,
    reasoning_effort: 'medium',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "messages": [
    {
      "role": "system",
      "content": "Answer concisely and show the scheduling logic in two bullet points."
    },
    {
      "role": "user",
      "content": "Maya is available Monday and Wednesday. Theo is available Wednesday and Thursday. Priya is available Monday, Wednesday, and Friday. Which day should they schedule a 90-minute meeting, and why?"
    },
    {
      "role": "user",
      "content": "The meeting must include all three attendees."
    },
    {
      "role": "user",
      "content": "Please give the recommendation."
    }
  ],
  "max_completion_tokens": 384,
  "reasoning_effort": "medium"
}'
```

```
- All three must attend, so the meeting day must be in the intersection of Maya's (Mon, Wed), Theo's (Wed, Thu), and Priya's (Mon, Wed, Fri) calendars; only Wednesday appears for all three.
- Therefore, schedule the 90-minute meeting on Wednesday, since it is the only day all attendees are available.
```

```json
{
  "id": "chatcmpl-26cd51e7-33f7-4048-93f0-69f51b1c66cc",
  "object": "chat.completion",
  "created": 1792089681,
  "model": "reflection-ai/beam-1.0-501b-a23b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "- All three must attend, so the meeting day must be in the intersection of Maya's (Mon, Wed), Theo's (Wed, Thu), and Priya's (Mon, Wed, Fri) calendars; only Wednesday appears for all three.\n- Therefore, schedule the 90-minute meeting on Wednesday, since it is the only day all attendees are available.",
        "refusal": null,
        "reasoning_content": "The user asks: Maya available Mon/Wed, Theo available Wed/Thu, Priya available Mon/Wed/Fri. Meeting must include all three. Need schedule 90-min meeting. Which day should schedule and why? Concise, two bullet points showing scheduling logic. Constraints: all three must attend. Intersection: Maya ∩ Theo = Wed; Priya ∩ {Wed} = Wed. So Wednesday is common day. Need 90-minute meeting—presumably available all day? No time specifics. So recommend Wednesday; only day all three available. Answer with two bullet points.\n\nNeed ensure not violate policy. Fine.\n\nLet's craft concise."
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 572,
    "completion_tokens": 218,
    "total_tokens": 790,
    "prompt_tokens_details": {
      "cached_tokens": 448
    },
    "completion_tokens_details": {
      "reasoning_tokens": 138
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

Input [Open](https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/#page","headline":"Beam 1.0 501B A23B","description":"Beam-1.0-501B-A23B is Reflection AI's open-weights mixture-of-experts model with 501B total parameters and 23B active parameters, built for coding, reasoning, and agentic workloads.","url":"https://developers.cloudflare.com/ai/models/reflection-ai/beam-1.0-501b-a23b/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
