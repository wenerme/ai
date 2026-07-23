---
description: Gemini 3.5 Flash-Lite is a low-latency, cost-effective multimodal model optimized for high-throughput, low-cost execution for subagent tasks and document parsing.
title: Gemini 3.5 Flash-Lite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 3.5 Flash-Lite

Text Generation • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-3.5-flash-lite/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-3.5-flash-lite`

* Third-party

Gemini 3.5 Flash-Lite is a low-latency, cost-effective multimodal model optimized for high-throughput, low-cost execution for subagent tasks and document parsing.

| Model Info                                                                 |                                                                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,048,576 tokens                                                                                                               |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                               |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/)                                                                         |
| Request formats                                                            | Chat Completions                                                                                                               |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.5-flash-lite) |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-3.5-flash-lite',
  { contents: [{ parts: [{ text: 'What are the three laws of thermodynamics?' }], role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.5-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "What are the three laws of thermodynamics?"
          }
        ],
        "role": "user"
      }
    ]
  }
}'
```

The three laws of thermodynamics are fundamental physical principles that describe how energy behaves in the universe—specifically regarding heat, work, entropy, and the limits of energy transfer.

Here is a summary of the three laws, along with a "zeroth law" that was established later but is equally fundamental.

---

### The Zeroth Law of Thermodynamics
*(Establishes temperature as a measurable property and defines thermal equilibrium.)*
* **The Law:** If two systems are each in thermal equilibrium with a third system, they are also in thermal equilibrium with each other.
* **Plain English:** If System A is the same temperature as System C, and System B is also the same temperature as System C, then System A and System B are the same temperature.
* **Why it matters:** This law forms the scientific basis for thermometers.

---

### The First Law of Thermodynamics
*(The Law of Conservation of Energy)*
* **The Law:** Energy cannot be created or destroyed in an isolated system; it can only be changed from one form to another.
* **Plain English:** You can’t get something for nothing. The total amount of energy in the universe remains constant. If a system gains energy, it must come from somewhere else; if it loses energy, it must go somewhere else.
* **Example:** When you drive a car, chemical energy stored in the gasoline is converted into thermal energy (heat) and kinetic energy (motion). No energy is lost, just transformed.

---

### The Second Law of Thermodynamics
*(The Law of Entropy)*
* **The Law:** The total entropy (disorder or randomness) of an isolated system always increases over time. Heat naturally flows from a hotter object to a cooler object, never the reverse spontaneously.
* **Plain English:** Things naturally fall apart, cool down, or become disorganized unless you put work into maintaining them. You cannot convert heat energy into work with 100% efficiency; some energy is always "lost" as unusable waste heat.
* **Example:** A cup of hot coffee left on a table will eventually cool down to room temperature. The reverse—a room-temperature cup of coffee spontaneously absorbing heat from the room to become boiling hot—never happens naturally.
* **Why it matters:** This law explains why perpetual motion machines are impossible and gives our universe a "direction of time" (often called the "arrow of time").

---

### The Third Law of Thermodynamics
*(The Behavior at Absolute Zero)*
* **The Law:** As the temperature of a system approaches absolute zero ($0\text{ Kelvin}$ or $-273.15^\circ\text{C}$), the entropy of a pure, perfect crystalline substance approaches a minimum value (typically zero).
* **Plain English:** You cannot reach absolute zero. As atoms get colder and colder, they slow down and lose thermal motion, but you can never completely stop molecular motion entirely.
* **Why it matters:** It sets a fundamental lower limit on temperature and helps scientists calculate the absolute entropy of substances.

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "The three laws of thermodynamics are fundamental physical principles that describe how energy behaves in the universe—specifically regarding heat, work, entropy, and the limits of energy transfer. \n\nHere is a summary of the three laws, along with a \"zeroth law\" that was established later but is equally fundamental.\n\n---\n\n### The Zeroth Law of Thermodynamics\n*(Establishes temperature as a measurable property and defines thermal equilibrium.)*\n* **The Law:** If two systems are each in thermal equilibrium with a third system, they are also in thermal equilibrium with each other.\n* **Plain English:** If System A is the same temperature as System C, and System B is also the same temperature as System C, then System A and System B are the same temperature. \n* **Why it matters:** This law forms the scientific basis for thermometers.\n\n---\n\n### The First Law of Thermodynamics\n*(The Law of Conservation of Energy)*\n* **The Law:** Energy cannot be created or destroyed in an isolated system; it can only be changed from one form to another.\n* **Plain English:** You can’t get something for nothing. The total amount of energy in the universe remains constant. If a system gains energy, it must come from somewhere else; if it loses energy, it must go somewhere else.\n* **Example:** When you drive a car, chemical energy stored in the gasoline is converted into thermal energy (heat) and kinetic energy (motion). No energy is lost, just transformed.\n\n---\n\n### The Second Law of Thermodynamics\n*(The Law of Entropy)*\n* **The Law:** The total entropy (disorder or randomness) of an isolated system always increases over time. Heat naturally flows from a hotter object to a cooler object, never the reverse spontaneously.\n* **Plain English:** Things naturally fall apart, cool down, or become disorganized unless you put work into maintaining them. You cannot convert heat energy into work with 100% efficiency; some energy is always \"lost\" as unusable waste heat.\n* **Example:** A cup of hot coffee left on a table will eventually cool down to room temperature. The reverse—a room-temperature cup of coffee spontaneously absorbing heat from the room to become boiling hot—never happens naturally. \n* **Why it matters:** This law explains why perpetual motion machines are impossible and gives our universe a \"direction of time\" (often called the \"arrow of time\").\n\n---\n\n### The Third Law of Thermodynamics\n*(The Behavior at Absolute Zero)*\n* **The Law:** As the temperature of a system approaches absolute zero ($0\\text{ Kelvin}$ or $-273.15^\\circ\\text{C}$), the entropy of a pure, perfect crystalline substance approaches a minimum value (typically zero).\n* **Plain English:** You cannot reach absolute zero. As atoms get colder and colder, they slow down and lose thermal motion, but you can never completely stop molecular motion entirely.\n* **Why it matters:** It sets a fundamental lower limit on temperature and helps scientists calculate the absolute entropy of substances.",
            "thoughtSignature": "AY89a1/ol32QPrMVbKQjdSf9juhARUkac2Z+KPcq5oo84TKrgbEj7WuE+4yuNhidBd0="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 8,
    "candidatesTokenCount": 634,
    "totalTokenCount": 642,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 8
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 634
      }
    ]
  },
  "modelVersion": "gemini-3.5-flash-lite",
  "createTime": "2026-07-21T16:21:55.338444Z",
  "responseId": "o5xfaozUFK2o8sYPiYHy-Ag"
}
```

## Examples

**Data Extraction** — Structured data extraction from unstructured text, a common subagent task

```ts
const response = await env.AI.run(
  'google/gemini-3.5-flash-lite',
  {
    contents: [
      {
        parts: [
          {
            text: "Extract the name, email, and phone number from this text as JSON: 'Hi, I'm Jordan Blake, reach me at jordan.blake@example.com or 555-2938.'",
          },
        ],
        role: 'user',
      },
    ],
    generationConfig: { temperature: 0 },
    systemInstruction: {
      parts: [
        {
          text: 'You are a data extraction assistant. Respond with only valid JSON, no extra commentary.',
        },
      ],
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.5-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "Extract the name, email, and phone number from this text as JSON: '\''Hi, I'\''m Jordan Blake, reach me at jordan.blake@example.com or 555-2938.'\''"
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "temperature": 0
    },
    "systemInstruction": {
      "parts": [
        {
          "text": "You are a data extraction assistant. Respond with only valid JSON, no extra commentary."
        }
      ]
    }
  }
}'
```

{
  "name": "Jordan Blake",
  "email": "jordan.blake@example.com",
  "phone": "555-2938"
}

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "{\n  \"name\": \"Jordan Blake\",\n  \"email\": \"jordan.blake@example.com\",\n  \"phone\": \"555-2938\"\n}",
            "thoughtSignature": "AY89a1+AejOv/9okEuBeoArPDSAKd5ZcT4tlNk6itaskjb7ezx7K9fEu5NLFUx4iUig="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 63,
    "candidatesTokenCount": 43,
    "totalTokenCount": 106,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 63
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 43
      }
    ]
  },
  "modelVersion": "gemini-3.5-flash-lite",
  "createTime": "2026-07-21T16:21:57.867550Z",
  "responseId": "pZxfat75NIvG8sYP3dfakAo"
}
```

**Multi-turn Conversation** — Continuing a short conversation with low-latency, high-throughput responses

```ts
const response = await env.AI.run(
  'google/gemini-3.5-flash-lite',
  {
    contents: [
      {
        parts: [
          {
            text: 'Summarize this in one sentence: The meeting covered Q3 budget overruns, a proposed hiring freeze, and a plan to renegotiate vendor contracts.',
          },
        ],
        role: 'user',
      },
      {
        parts: [
          {
            text: 'The meeting addressed Q3 budget overruns by proposing a hiring freeze and vendor contract renegotiations.',
          },
        ],
        role: 'model',
      },
      { parts: [{ text: 'Now make it even shorter, under 10 words.' }], role: 'user' },
    ],
    generationConfig: { maxOutputTokens: 512 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.5-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "Summarize this in one sentence: The meeting covered Q3 budget overruns, a proposed hiring freeze, and a plan to renegotiate vendor contracts."
          }
        ],
        "role": "user"
      },
      {
        "parts": [
          {
            "text": "The meeting addressed Q3 budget overruns by proposing a hiring freeze and vendor contract renegotiations."
          }
        ],
        "role": "model"
      },
      {
        "parts": [
          {
            "text": "Now make it even shorter, under 10 words."
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 512
    }
  }
}'
```

Addressing Q3 budget overruns, hiring freezes, and vendor contracts.

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Addressing Q3 budget overruns, hiring freezes, and vendor contracts.",
            "thoughtSignature": "AY89a1/dUv1ajorDdpZkOzaeL0fb5CjoZL4SoKtpQeX8AK5jF5vNa/v4F6r7OqdabWs="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 61,
    "candidatesTokenCount": 14,
    "totalTokenCount": 75,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 61
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 14
      }
    ]
  },
  "modelVersion": "gemini-3.5-flash-lite",
  "createTime": "2026-07-21T16:21:58.695703Z",
  "responseId": "ppxfape7KqSn8sYPpMq_gQ8"
}
```

## Parameters

Schema variant

Generate ContentChat Completions

▶contents\[\]

`array`required

▶systemInstruction{}

`object`

▶generationConfig{}

`object`

▶safetySettings\[\]

`array`

▶tools\[\]

`array`

toolConfig

``

▶messages\[\]

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

`number`minimum: \-2maximum: 2

presence\_penalty

`number`minimum: \-2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[\]

`array`

tool\_choice

``

response\_format

``

▶modalities\[\]

`array`

▶audio{}

`object`

▶candidates\[\]

`array`

▶usageMetadata{}

`object`

modelVersion

`string`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[\]

`array`

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3.5-flash-lite/#page","headline":"Gemini 3.5 Flash-Lite (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Gemini 3.5 Flash-Lite is a low-latency, cost-effective multimodal model optimized for high-throughput, low-cost execution for subagent tasks and document parsing.","url":"https://developers.cloudflare.com/ai/models/google/gemini-3.5-flash-lite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
