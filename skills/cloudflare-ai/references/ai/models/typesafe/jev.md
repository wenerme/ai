---
description: Jev 1.13 is TypeSafe's structured evaluation model. It evaluates one state against typed Noul, Choice, and Score questions and returns calibrated answers with probabilities and confidence. Image inputs are beta and dreamer-ready, not recommended for production.
title: Jev
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Jev

Text Generation • typesafe

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/typesafe/jev/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`typesafe/jev`

- Third-party
- Zero data retention

Jev 1.13 is TypeSafe's structured evaluation model. It evaluates one state against typed Noul, Choice, and Score questions and returns calibrated answers with probabilities and confidence. Image inputs are beta and dreamer-ready, not recommended for production.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 32,000 tokens |
| Terms and License | [link ↗](https://docs.typesafe.ai/legal.md) |
| More information | [link ↗](https://docs.typesafe.ai/models.md) |
| Zero data retention | Yes |
| Pricing | <ul><li>Input (per 1M tokens)$0.042</li><li>Cached input (per 1M tokens)$0.00</li><li>Output (per 1M tokens)$0.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'typesafe/jev',
  {
    state: 'Help! My payouts have been failing for 3 days.',
    questions: {
      is_urgent: {
        type: 'noul',
        instructions: 'Does this convey urgency?',
        criteria: { true: 'Explicitly time-sensitive', false: 'No urgency expressed' },
      },
      department: {
        type: 'choice',
        instructions: 'Which team should handle this?',
        criteria: {
          billing: 'Payments, invoicing, refunds',
          technical: 'Bugs, outages, integrations',
          sales: 'Pricing, upgrades, new accounts',
        },
      },
      frustration: {
        type: 'score',
        instructions: 'How frustrated is the customer?',
        criteria: ['Calm', 'Frustrated', 'Very angry'],
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
  "model": "typesafe/jev",
  "input": {
    "state": "Help! My payouts have been failing for 3 days.",
    "questions": {
      "is_urgent": {
        "type": "noul",
        "instructions": "Does this convey urgency?",
        "criteria": {
          "true": "Explicitly time-sensitive",
          "false": "No urgency expressed"
        }
      },
      "department": {
        "type": "choice",
        "instructions": "Which team should handle this?",
        "criteria": {
          "billing": "Payments, invoicing, refunds",
          "technical": "Bugs, outages, integrations",
          "sales": "Pricing, upgrades, new accounts"
        }
      },
      "frustration": {
        "type": "score",
        "instructions": "How frustrated is the customer?",
        "criteria": [
          "Calm",
          "Frustrated",
          "Very angry"
        ]
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "is_urgent": {
      "type": "noul",
      "noul": 0.95
    },
    "department": {
      "type": "choice",
      "choice": "billing",
      "confidence": 0.8,
      "probabilities": {
        "billing": 0.87,
        "technical": 0.13,
        "sales": 0
      }
    },
    "frustration": {
      "type": "score",
      "score": 1.05,
      "confidence": 0.93,
      "legend": {
        "0": "Calm",
        "1": "Frustrated",
        "2": "Very angry"
      },
      "probabilities": {
        "0": 0,
        "1": 0.95,
        "2": 0.05
      }
    }
  },
  "usage": {
    "input_tokens": 426,
    "output_tokens": 73
  }
}
```

## Examples

<details>

<summary>**Structured refund review** — Evaluate a refund request against a structured order and policy</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev',
  {
    state: {
      ticket: {
        subject: 'Duplicate charge',
        message: 'I was charged twice for order A-104. Please refund the duplicate.',
      },
      order: {
        id: 'A-104',
        charges: [
          { amount_usd: 49, status: 'captured' },
          { amount_usd: 49, status: 'captured' },
        ],
      },
      refund_policy: 'Duplicate charges are eligible for a refund.',
    },
    questions: {
      refund_requested: { type: 'noul', instructions: 'Does `ticket.message` request a refund?' },
      policy_supports_refund: {
        type: 'noul',
        instructions:
          'Does `refund_policy` support the refund requested in `ticket.message`, given `order.charges`?',
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
  "model": "typesafe/jev",
  "input": {
    "state": {
      "ticket": {
        "subject": "Duplicate charge",
        "message": "I was charged twice for order A-104. Please refund the duplicate."
      },
      "order": {
        "id": "A-104",
        "charges": [
          {
            "amount_usd": 49,
            "status": "captured"
          },
          {
            "amount_usd": 49,
            "status": "captured"
          }
        ]
      },
      "refund_policy": "Duplicate charges are eligible for a refund."
    },
    "questions": {
      "refund_requested": {
        "type": "noul",
        "instructions": "Does `ticket.message` request a refund?"
      },
      "policy_supports_refund": {
        "type": "noul",
        "instructions": "Does `refund_policy` support the refund requested in `ticket.message`, given `order.charges`?"
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "refund_requested": {
      "type": "noul",
      "noul": 0.99
    },
    "policy_supports_refund": {
      "type": "noul",
      "noul": 0.98
    }
  },
  "usage": {
    "input_tokens": 422,
    "output_tokens": 41
  }
}
```

</details>

<details>

<summary>**Support department routing** — Route a support request to the right department</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev',
  {
    state: 'I cannot log in after changing my password, and the reset email never arrives.',
    questions: {
      department: {
        type: 'choice',
        instructions: 'Which team should handle this support request?',
        criteria: {
          account: 'Login, password, profile, or security issues',
          billing: 'Charges, invoices, refunds, or subscriptions',
          technical: 'Product bugs, outages, or integrations',
          other: 'Requests that do not fit the other departments',
        },
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
  "model": "typesafe/jev",
  "input": {
    "state": "I cannot log in after changing my password, and the reset email never arrives.",
    "questions": {
      "department": {
        "type": "choice",
        "instructions": "Which team should handle this support request?",
        "criteria": {
          "account": "Login, password, profile, or security issues",
          "billing": "Charges, invoices, refunds, or subscriptions",
          "technical": "Product bugs, outages, or integrations",
          "other": "Requests that do not fit the other departments"
        }
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "department": {
      "type": "choice",
      "choice": "account",
      "confidence": 1,
      "probabilities": {
        "account": 1,
        "billing": 0,
        "technical": 0,
        "other": 0
      }
    }
  },
  "usage": {
    "input_tokens": 380,
    "output_tokens": 45
  }
}
```

</details>

<details>

<summary>**Account risk assessment** — Score account risk and determine whether escalation is needed</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev',
  {
    state: {
      account_age_days: 12,
      recent_events: [
        'Five failed login attempts',
        'Password reset requested from a new country',
        'Successful login from the usual device',
      ],
      account_verified: true,
    },
    questions: {
      risk_level: {
        type: 'score',
        instructions: 'How risky does this account activity appear?',
        criteria: [
          'Low risk: activity is consistent with the account history',
          'Moderate risk: some unusual activity needs monitoring',
          'High risk: multiple strong indicators of account compromise',
        ],
      },
      escalate: {
        type: 'noul',
        instructions: 'Should this account be escalated for manual security review?',
        criteria: {
          true: 'The activity warrants immediate human review',
          false: 'The activity can be handled with normal automated controls',
        },
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
  "model": "typesafe/jev",
  "input": {
    "state": {
      "account_age_days": 12,
      "recent_events": [
        "Five failed login attempts",
        "Password reset requested from a new country",
        "Successful login from the usual device"
      ],
      "account_verified": true
    },
    "questions": {
      "risk_level": {
        "type": "score",
        "instructions": "How risky does this account activity appear?",
        "criteria": [
          "Low risk: activity is consistent with the account history",
          "Moderate risk: some unusual activity needs monitoring",
          "High risk: multiple strong indicators of account compromise"
        ]
      },
      "escalate": {
        "type": "noul",
        "instructions": "Should this account be escalated for manual security review?",
        "criteria": {
          "true": "The activity warrants immediate human review",
          "false": "The activity can be handled with normal automated controls"
        }
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "risk_level": {
      "type": "score",
      "score": 1.86,
      "confidence": 0.79,
      "legend": {
        "0": "Low risk: activity is consistent with the account history",
        "1": "Moderate risk: some unusual activity needs monitoring",
        "2": "High risk: multiple strong indicators of account compromise"
      },
      "probabilities": {
        "0": 0,
        "1": 0.14,
        "2": 0.86
      }
    },
    "escalate": {
      "type": "noul",
      "noul": 0.8
    }
  },
  "usage": {
    "input_tokens": 421,
    "output_tokens": 36
  }
}
```

</details>

<details>

<summary>**Beta image classification** — Beta image input: identify whether a photo contains a blue object</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev',
  {
    state: { photo: 'solid-blue-photo' },
    assets: {
      'solid-blue-photo': {
        type: 'image',
        format: 'jpg',
        data_base64:
          '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAEAAQADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAUG/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoA0SMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=',
      },
    },
    questions: { is_blue: { type: 'noul', instructions: 'Is the object in `photo` blue?' } },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "typesafe/jev",
  "input": {
    "state": {
      "photo": "solid-blue-photo"
    },
    "assets": {
      "solid-blue-photo": {
        "type": "image",
        "format": "jpg",
        "data_base64": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAEAAQADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAUG/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoA0SMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
      }
    },
    "questions": {
      "is_blue": {
        "type": "noul",
        "instructions": "Is the object in `photo` blue?"
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "is_blue": {
      "type": "noul",
      "noul": 0
    }
  },
  "usage": {
    "input_tokens": 486,
    "output_tokens": 21
  }
}
```

</details>

<details>

<summary>**Beta image criteria** — Beta image input: classify a referenced image in question criteria</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev',
  {
    state: 'solid-blue-photo',
    assets: {
      'solid-blue-photo': {
        type: 'image',
        format: 'jpg',
        data_base64:
          '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAEAAQADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAUG/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoA0SMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=',
      },
    },
    questions: {
      color: {
        type: 'choice',
        instructions: 'Which color best describes the image?',
        criteria: {
          blue: 'A blue image such as solid-blue-photo',
          other: 'Any image that is not blue',
        },
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
  "model": "typesafe/jev",
  "input": {
    "state": "solid-blue-photo",
    "assets": {
      "solid-blue-photo": {
        "type": "image",
        "format": "jpg",
        "data_base64": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAEAAQADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAUG/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoA0SMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
      }
    },
    "questions": {
      "color": {
        "type": "choice",
        "instructions": "Which color best describes the image?",
        "criteria": {
          "blue": "A blue image such as solid-blue-photo",
          "other": "Any image that is not blue"
        }
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "color": {
      "type": "choice",
      "choice": "other",
      "confidence": 0.84,
      "probabilities": {
        "blue": 0.08,
        "other": 0.92
      }
    }
  },
  "usage": {
    "input_tokens": 726,
    "output_tokens": 31
  }
}
```

</details>

## Parameters

▶state

`one of`required

▶assets{}

`object`

▶questions{}

`object`required

model

`string`minLength: 1

▶answers{}

`object`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/typesafe/jev/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/typesafe/jev/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/typesafe/jev/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/typesafe/jev/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/typesafe/jev/#page","headline":"Jev","description":"Jev 1.13 is TypeSafe's structured evaluation model. It evaluates one state against typed Noul, Choice, and Score questions and returns calibrated answers with probabilities and confidence. Image inputs are beta and dreamer-ready, not recommended for production.","url":"https://developers.cloudflare.com/ai/models/typesafe/jev/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
