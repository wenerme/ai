---
description: Claude Haiku 5.5 is a fast, cost-efficient model for high-volume, latency-sensitive tasks such as classification, extraction, routing, and subagent work.
title: Claude Haiku 5.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Haiku 5.5

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-haiku-5.5`

- Third-party

Claude Haiku 5.5 is a fast, cost-efficient model for high-volume, latency-sensitive tasks such as classification, extraction, routing, and subagent work.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://platform.claude.com/docs/en/models/haiku-5-5/overview) |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Short-context input (per 1M)$0.10</li><li>Short-context cached input (per 1M)$0.01</li><li>Short-context cache write (per 1M)$0.125</li><li>Short-context output (per 1M)$0.50</li><li>Long-context input (per 1M)$0.50</li><li>Long-context cached input (per 1M)$0.05</li><li>Long-context cache write (per 1M)$0.625</li><li>Long-context output (per 1M)$2.50</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-5.5',
  {
    max_tokens: 256,
    messages: [{ content: 'Classify this support ticket as billing, technical, or account: My invoice shows an unexpected charge.', role: 'user' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-haiku-5.5",
  "max_tokens": 256,
  "messages": [
    {
      "content": "Classify this support ticket as billing, technical, or account: My invoice shows an unexpected charge.",
      "role": "user"
    }
  ]
}'
```

```
**Billing**

The ticket is about an invoice showing an unexpected charge, which falls under billing.
```

```json
{
  "id": "msg_011CfoNwxiMXWCayWiWZRotX",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "**Billing**\n\nThe ticket is about an invoice showing an unexpected charge, which falls under billing."
    }
  ],
  "model": "claude-haiku-5-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 40,
    "output_tokens": 35
  },
  "container": null,
  "stop_sequence": null,
  "stop_details": null,
  "diagnostics": null
}
```

## Examples

<details>

<summary>**Structured Extraction** — Use adaptive thinking for structured extraction.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-5.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'Extract the order ID and requested action from: Please cancel order #A-1042 before it ships.', role: 'user' }],
    output_config: { effort: 'medium' },
    thinking: { type: 'adaptive' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-haiku-5.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "Extract the order ID and requested action from: Please cancel order #A-1042 before it ships.",
      "role": "user"
    }
  ],
  "output_config": {"effort": "medium"},
  "thinking": {"type": "adaptive"}
}'
```

```
**Order ID:** A-1042
**Requested action:** Cancel the order before it ships
```

```json
{
  "id": "msg_011CfoNx2fFMc8rnUuBBgE3A",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "**Order ID:** A-1042\n**Requested action:** Cancel the order before it ships"
    }
  ],
  "model": "claude-haiku-5-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 38,
    "output_tokens": 31
  },
  "container": null,
  "stop_sequence": null,
  "stop_details": null,
  "diagnostics": null
}
```

</details>

<details>

<summary>**Streaming Response** — Stream a low-latency response incrementally.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-5.5',
  {
    max_tokens: 512,
    messages: [{ content: 'Return a concise three-step deployment checklist.', role: 'user' }],
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-haiku-5.5",
  "max_tokens": 512,
  "messages": [{"content": "Return a concise three-step deployment checklist.", "role": "user"}],
  "stream": true
}'
```

```
**Three-Step Deployment Checklist**

1. **Pre-deployment**
   - Confirm all tests pass and code is reviewed and approved.
   - Verify configuration, environment variables, and secrets are set for the target environment.
   - Back up the current production state and prepare a rollback plan.

2. **Deploy**
   - Release to production using the approved pipeline or process, avoiding manual changes where possible.
   - Run database migrations or other required schema changes, if any.
   - Monitor the rollout in stages if supported (e.g., canary or gradual release).

3. **Post-deployment**
   - Run smoke tests on critical paths.
   - Check logs, error rates, and performance metrics against baseline.
   - Notify stakeholders of completion and keep the rollback plan ready for a defined monitoring window.
```

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-haiku-5-5",
      "id": "msg_011CfoNx62eTigAN2u1rkUKg",
      "type": "message",
      "role": "assistant",
      "content": [],
      "container": null,
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 23,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 4,
        "service_tier": "standard",
        "inference_geo": "global"
      },
      "diagnostics": null
    }
  },
  {
    "type": "content_block_start",
    "index": 0,
    "content_block": {
      "type": "thinking",
      "thinking": "",
      "signature": ""
    }
  },
  "... 75 more chunks omitted ...",
  {
    "type": "message_stop"
  }
]
```

</details>

## Parameters

▶messages\[]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

stream

`boolean`

▶metadata{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[]

`array`

model

`string`

stop\_reason

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/#page","headline":"Claude Haiku 5.5","description":"Claude Haiku 5.5 is a fast, cost-efficient model for high-volume, latency-sensitive tasks such as classification, extraction, routing, and subagent work.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-5.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
