---
description: Decisions uses GPT-6 Luna to evaluate shared text or image evidence against typed questions. It returns probabilities, fixed choices, or rubric scores for low-latency classification, routing, and prioritization workflows.
title: Decisions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# Decisions

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/decisions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/decisions`

- Third-party

Decisions uses GPT-6 Luna to evaluate shared text or image evidence against typed questions. It returns probabilities, fixed choices, or rubric scores for low-latency classification, routing, and prioritization workflows.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,050,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/guides/decisions) |
| Pricing | <ul><li>Input (per 1M tokens)$0.10</li><li>Output (per 1M tokens)$0.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/decisions',
  {
    input: 'The customer reports that their card was charged twice for one order.',
    questions: [
      {
        instructions: 'Is this report about a billing problem?',
        name: 'billing_issue',
        type: 'predicate',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/decisions",
  "input": {
    "input": "The customer reports that their card was charged twice for one order.",
    "questions": [
      {
        "instructions": "Is this report about a billing problem?",
        "name": "billing_issue",
        "type": "predicate"
      }
    ]
  }
}'
```

```json
{
  "model": "gpt-6-luna",
  "answers": [
    {
      "type": "predicate",
      "name": "billing_issue",
      "probability": 1
    }
  ],
  "usage": {
    "input_tokens": 169,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 0,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 169
  }
}
```

## Examples

<details>

<summary>**Select a category** — Route a customer request to one of several departments</summary>



```ts
const response = await env.AI.run(
  'openai/decisions',
  {
    input: 'My package was expected yesterday, but tracking has not updated.',
    questions: [
      {
        choices: [
          { description: 'Payments, invoices, and refunds.', value: 'billing' },
          { description: 'Problems using the product.', value: 'technical' },
          { description: 'Delivery and tracking.', value: 'shipping' },
          { description: 'Requests outside these categories.', value: 'other' },
        ],
        instructions: 'Which department should handle this request?',
        name: 'department',
        type: 'choice',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/decisions",
  "input": {
    "input": "My package was expected yesterday, but tracking has not updated.",
    "questions": [
      {
        "choices": [
          {
            "description": "Payments, invoices, and refunds.",
            "value": "billing"
          },
          {
            "description": "Problems using the product.",
            "value": "technical"
          },
          {
            "description": "Delivery and tracking.",
            "value": "shipping"
          },
          {
            "description": "Requests outside these categories.",
            "value": "other"
          }
        ],
        "instructions": "Which department should handle this request?",
        "name": "department",
        "type": "choice"
      }
    ]
  }
}'
```

```json
{
  "model": "gpt-6-luna",
  "answers": [
    {
      "type": "choice",
      "name": "department",
      "choice": "shipping",
      "probabilities": [
        {
          "value": "billing",
          "probability": 0
        },
        {
          "value": "technical",
          "probability": 0.01
        },
        {
          "value": "shipping",
          "probability": 0.99
        },
        {
          "value": "other",
          "probability": 0
        }
      ],
      "confidence": 0.99
    }
  ],
  "usage": {
    "input_tokens": 149,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 0,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 149
  }
}
```

</details>

<details>

<summary>**Score against a rubric** — Score an issue against ordered severity levels</summary>



```ts
const response = await env.AI.run(
  'openai/decisions',
  {
    input: 'Export fails in Safari but works in Chrome.',
    questions: [
      {
        instructions: 'How severe is this issue?',
        levels: [
          { description: 'Appearance only; no lost functionality.', label: 'Cosmetic' },
          { description: 'A task fails, but another way works.', label: 'Workaround available' },
          { description: 'A task fails with no workaround.', label: 'Fully blocked' },
        ],
        name: 'severity',
        type: 'score',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/decisions",
  "input": {
    "input": "Export fails in Safari but works in Chrome.",
    "questions": [
      {
        "instructions": "How severe is this issue?",
        "levels": [
          {
            "description": "Appearance only; no lost functionality.",
            "label": "Cosmetic"
          },
          {
            "description": "A task fails, but another way works.",
            "label": "Workaround available"
          },
          {
            "description": "A task fails with no workaround.",
            "label": "Fully blocked"
          }
        ],
        "name": "severity",
        "type": "score"
      }
    ]
  }
}'
```

```json
{
  "model": "gpt-6-luna",
  "answers": [
    {
      "type": "score",
      "name": "severity",
      "score": 0.99,
      "probabilities": [
        {
          "value": 0,
          "label": "Cosmetic",
          "probability": 0.02
        },
        {
          "value": 1,
          "label": "Workaround available",
          "probability": 0.97
        },
        {
          "value": 2,
          "label": "Fully blocked",
          "probability": 0.01
        }
      ],
      "confidence": 0.96
    }
  ],
  "usage": {
    "input_tokens": 146,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 0,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 146
  }
}
```

</details>

## Parameters

▶input

`one of`required

▶questions\[]

`array`requiredminItems: 1maxItems: 200

prompt\_cache\_key

`string`

prompt\_cache\_options

`object | null`

safety\_identifier

`string`

▶answers\[]

`array`

model

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/decisions/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/decisions/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/decisions/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/decisions/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/decisions/#page","headline":"Decisions","description":"Decisions uses GPT-6 Luna to evaluate shared text or image evidence against typed questions. It returns probabilities, fixed choices, or rubric scores for low-latency classification, routing, and prioritization workflows.","url":"https://developers.cloudflare.com/ai/models/openai/decisions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
