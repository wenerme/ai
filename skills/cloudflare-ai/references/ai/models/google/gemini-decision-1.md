---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Gemini Decision 1 evaluates typed questions over shared text, images, audio, video, and PDFs. It returns calibrated yes/no probabilities, choices, and rubric scores for classification, routing, and ranking, with zero output tokens.
title: Gemini Decision 1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini Decision 1

Text Generation • Google

Model ID

`google/gemini-decision-1` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party
- Zero data retention

Gemini Decision 1 evaluates typed questions over shared text, images, audio, video, and PDFs. It returns calibrated yes/no probabilities, choices, and rubric scores for classification, routing, and ranking, with zero output tokens.

| Model Info | |
| --- | --- |
| Context Window [↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 262,144 tokens |
| Terms and License | [link ↗](https://aistudio.google.com/docs/terms) |
| More information | [link ↗](https://aistudio.google.com/docs/models/gemini-decision-1) |
| Zero data retention | Yes |
| Pricing | <ul><li>Input (per 1M tokens)$0.10</li><li>Output (per 1M tokens)$0.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-decision-1',
  {
    input: 'The blue mug I ordered on Monday arrived cracked on Wednesday.',
    questions: { is_damaged: { type: 'noul', instructions: 'Did the item arrive damaged?' } },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-decision-1",
  "input": {
    "input": "The blue mug I ordered on Monday arrived cracked on Wednesday.",
    "questions": {
      "is_damaged": {
        "type": "noul",
        "instructions": "Did the item arrive damaged?"
      }
    }
  }
}'
```

```json
{
  "answers": {
    "is_damaged": {
      "confidence": 0.99,
      "noul": 0.99,
      "type": "noul"
    }
  },
  "usage": {
    "total_tokens": 100,
    "total_input_tokens": 100,
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 100
      }
    ],
    "total_output_tokens": 0
  }
}
```

## Examples

<details>

<summary>**Route and score a support ticket** — Ask independent yes/no, choice, and score questions over the same input.</summary>



```ts
const response = await env.AI.run(
  'google/gemini-decision-1',
  {
    input: [
      { type: 'text', text: 'Customer tier: Gold. Order: headphones, $240.\n' },
      {
        type: 'text',
        text: 'Audio cuts out on the left earcup. Fix it today or I cancel my membership.',
      },
    ],
    questions: {
      is_defect: {
        type: 'noul',
        instructions: 'Is the customer reporting a hardware defect?',
        criteria: {
          true_description: 'The product itself is broken or faulty.',
          false_description: 'A preference, sizing, shipping, or pricing complaint.',
        },
      },
      department: {
        type: 'choice',
        instructions: 'Which department should handle this request?',
        criteria: {
          billing: 'Payments, invoices, and refunds.',
          technical: 'Problems using the product or hardware faults.',
          shipping: 'Delivery and tracking.',
          other: 'Anything outside these categories.',
        },
      },
      churn_risk: {
        type: 'score',
        instructions: 'How likely is the customer to churn if this issue is not resolved?',
        criteria: [
          'No churn signal',
          'Mild frustration',
          'Mentions alternatives',
          'Threatens to cancel',
        ],
      },
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
  "model": "google/gemini-decision-1",
  "input": {
    "input": [
      {
        "type": "text",
        "text": "Customer tier: Gold. Order: headphones, $240.\n"
      },
      {
        "type": "text",
        "text": "Audio cuts out on the left earcup. Fix it today or I cancel my membership."
      }
    ],
    "questions": {
      "is_defect": {
        "type": "noul",
        "instructions": "Is the customer reporting a hardware defect?",
        "criteria": {
          "true_description": "The product itself is broken or faulty.",
          "false_description": "A preference, sizing, shipping, or pricing complaint."
        }
      },
      "department": {
        "type": "choice",
        "instructions": "Which department should handle this request?",
        "criteria": {
          "billing": "Payments, invoices, and refunds.",
          "technical": "Problems using the product or hardware faults.",
          "shipping": "Delivery and tracking.",
          "other": "Anything outside these categories."
        }
      },
      "churn_risk": {
        "type": "score",
        "instructions": "How likely is the customer to churn if this issue is not resolved?",
        "criteria": [
          "No churn signal",
          "Mild frustration",
          "Mentions alternatives",
          "Threatens to cancel"
        ]
      }
    }
  }
}'
```

```json
{
  "answers": {
    "churn_risk": {
      "confidence": 0.9871029342727191,
      "score": 2.9847557447368054,
      "probabilities": {
        "0": 0.00024958590912331545,
        "1": 0.001848017717667642,
        "2": 0.01079946210049003,
        "3": 0.9871029342727191
      },
      "legend": {
        "0": "No churn signal",
        "1": "Mild frustration",
        "2": "Mentions alternatives",
        "3": "Threatens to cancel"
      },
      "type": "score"
    },
    "is_defect": {
      "confidence": 0.9740036578099637,
      "noul": 0.9740036578099637,
      "type": "noul"
    },
    "department": {
      "confidence": 0.9785049522314109,
      "choice": "technical",
      "probabilities": {
        "technical": 0.9785049522314109,
        "billing": 0.006229438550145094,
        "other": 0.013127015151353486,
        "shipping": 0.0021385940670906965
      },
      "type": "choice"
    }
  },
  "usage": {
    "total_tokens": 315,
    "total_input_tokens": 315,
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 315
      }
    ],
    "total_output_tokens": 0
  }
}
```

</details>

<details>

<summary>**Evaluate an audio recording** — Evaluate spoken content and delivery directly from an audio URL.</summary>



```ts
const response = await env.AI.run(
  'google/gemini-decision-1',
  {
    input: {
      type: 'audio',
      uri: 'https://storage.googleapis.com/generativeai-downloads/audio/rehearsing.wav',
      mime_type: 'audio/wav',
    },
    questions: {
      mentions_launch: {
        type: 'noul',
        instructions: 'Is the speaker talking about a product campaign launch?',
      },
      delivery: {
        type: 'score',
        instructions: 'How fluent and prepared does the speaker sound?',
        criteria: [
          'Hesitant, searching for notes, or self-correcting.',
          'Mostly steady with minor pauses.',
          'Polished, fluent, and confident throughout.',
        ],
      },
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
  "model": "google/gemini-decision-1",
  "input": {
    "input": {
      "type": "audio",
      "uri": "https://storage.googleapis.com/generativeai-downloads/audio/rehearsing.wav",
      "mime_type": "audio/wav"
    },
    "questions": {
      "mentions_launch": {
        "type": "noul",
        "instructions": "Is the speaker talking about a product campaign launch?"
      },
      "delivery": {
        "type": "score",
        "instructions": "How fluent and prepared does the speaker sound?",
        "criteria": [
          "Hesitant, searching for notes, or self-correcting.",
          "Mostly steady with minor pauses.",
          "Polished, fluent, and confident throughout."
        ]
      }
    }
  }
}'
```

```json
{
  "answers": {
    "delivery": {
      "confidence": 0.8753272828029849,
      "score": 0.13564676347359578,
      "probabilities": {
        "0": 0.8753272828029849,
        "1": 0.11369867092043455,
        "2": 0.010974046276580619
      },
      "legend": {
        "0": "Hesitant, searching for notes, or self-correcting.",
        "1": "Mostly steady with minor pauses.",
        "2": "Polished, fluent, and confident throughout."
      },
      "type": "score"
    },
    "mentions_launch": {
      "confidence": 0.9023548793133858,
      "noul": 0.9023548793133858,
      "type": "noul"
    }
  },
  "usage": {
    "total_tokens": 2147,
    "total_input_tokens": 2147,
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 298
      },
      {
        "modality": "audio",
        "tokens": 1849
      }
    ],
    "total_output_tokens": 0
  }
}
```

</details>

## Parameters

▶input

`one of`required

▶questions{}

`object`required

▶answers{}

`object`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/google/gemini-decision-1/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-decision-1/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/gemini-decision-1/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-decision-1/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-decision-1/#page","headline":"Gemini Decision 1","description":"Gemini Decision 1 evaluates typed questions over shared text, images, audio, video, and PDFs. It returns calibrated yes/no probabilities, choices, and rubric scores for classification, routing, and ranking, with zero output tokens.","url":"https://developers.cloudflare.com/ai/models/google/gemini-decision-1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
