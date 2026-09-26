---
description: GPT-6 Sol is OpenAI's mid-tier GPT-6 model, built to power complex coding and agentic workflows.
title: GPT-6 Sol
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-6 Sol

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-6-sol`

- Third-party

GPT-6 Sol is OpenAI's mid-tier GPT-6 model, built to power complex coding and agentic workflows.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,050,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/models/gpt-6-sol) |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Short-context input (per 1M)$2.00</li><li>Short-context cached input (per 1M)$0.20</li><li>Short-context cache write (per 1M)$2.50</li><li>Short-context output (per 1M)$10.00</li><li>Long-context input (per 1M)$4.00</li><li>Long-context cached input (per 1M)$0.40</li><li>Long-context cache write (per 1M)$5.00</li><li>Long-context output (per 1M)$15.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-6-sol',
  {
    input:
      'A service has 99.9% monthly availability and just had 31 minutes of downtime. Has it exceeded the monthly error budget for a 30-day month? Show the calculation briefly.',
    max_output_tokens: 512,
    reasoning: { effort: 'high' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6-sol",
  "input": "A service has 99.9% monthly availability and just had 31 minutes of downtime. Has it exceeded the monthly error budget for a 30-day month? Show the calculation briefly.",
  "max_output_tokens": 512,
  "reasoning": {
    "effort": "high"
  }
}'
```

```
No. A 30-day month has \(30 \times 24 \times 60 = 43{,}200\) minutes, so the 0.1% downtime budget is **43.2 minutes**. After 31 minutes of downtime, **12.2 minutes remain**.
```

```json
{
  "id": "resp_004a362708bc0a44006ab2cc7bd4c487d1bffa1555dc6c5110",
  "object": "response",
  "created_at": 1790102651,
  "status": "completed",
  "access_programs": {
    "cyber": "daybreak_blue"
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1790102653,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-6-sol",
  "moderation": null,
  "output": [
    {
      "id": "rs_004a362708bc0a44006ab2cc7c78bc87d1b3ac1095e5bbaaae",
      "type": "reasoning",
      "content": [],
      "encrypted_content": "gAAAAABqssx9oBJ5yr_VdmObO4zvyzJEasvjs_4xsaXswQG7TjMqx-6kfx_szw29t29TiMj1CMtiWD8IdaVjgznOab6hu0poxB9ZuvgbmIrkgiYx_oqp8UHjtJd06fhkzNaTp01_BBaBQpcwhC9bd_Y6VR8HlvEB1Go4JL7-RLhwh2nJN5wjRjWOlqWaHZRaz1Wz2eQon9IYI8pJ9jpxvYMQpNBle___KLzlJiCjeDKw5yFf9NAjKDwqi75YR4f2uhsWYIfRNgi3Eyzx-h_5dnIahzx1-26Bj_UcRQvUhqf0-0jGmIS1PLg1uSVlHJ7iQsuLJwtcwJYG7X-FYEx61X9BtqtiUFODxRODCUpq3RMrZKUm6N9BtNwqB1PkLR6Y5gCyhWPAdf77zvcxGJKncLGIduS4Fei5u3lJTg8NlDpFC5sFNUu6wEmBV3Mz3e_uCo3B2bHVFNAFcK8h-nnvj3hM6EYbVTRnXlaFrb2Fb51_TvZBQ1ReAPmz9nQcdb9bIZRBeRIN7PAKChmwgS4gYD_r3IE3k4q8CWBHOPzzxHeQzOSPgameIHzXR13uc9dy-gBD8o2wWChw616xhktHemPEUZG4l2AIBVSJNuFKIoGS_jT_P7ScPZwynxwS3wSGuyCLa3qAPkZWeP7qqfZQmtDKWj0xnjyipbOGoDQh5pAPtkIMdKIsMBj12RY_Ms-sYB7ojN1vOhUWeN-2MXPDkBmxY_L58hUjNVyLbYo1TUQsZVQX5r0tT0o3_9GI7aAa-vgMz_hXFJ4QepBtzc2hlGDT6CKp5tt235fisry5k0xaMAsl9ae6o-yEn0KDeLmpeIICZX6vDgqIZjPny7D_jpmHNZPLYkC56kQL2xaLI695l3GuMkeV6S5kphxK1y-5yyEJ9lasAT2aEwTIFSQ1fjdMwb9QjCpDXL-w-fUMxAfy_u8LapQBH5aV6XH5L2No4VKP-0IDrstrfh38LEEm9sBt55zVBQ2-UpB_DYy-BsG4Qn77cpDVaKC3MHXBbMhYWaNc6vJ1zsLaUhO2AgH7QW8sCRHexDRb1QO9NRXbp9Y-HSOIV8UxFEXjxbUV_dPxYUABNioPutzYq54kqnJc8ekT45AN-CRgviXVG9824m20cjEz1ryvnVNIKmen_ysou2W98MQqIch2Hh4cqgCkBxOyh7iYTqSS8LhGoJqAtGRgK7XlV8sB-q3xEDLEsW5cD_irRuVzh5Bb1ofy4emT2HNeoYUNdA9SLvpZfK9c8jCHr01ia4NzGrjwSBn4fzujX-eCPoYaN2MLQ2N8mp1cfYGH35LDIhmCjA==",
      "summary": []
    },
    {
      "id": "msg_004a362708bc0a44006ab2cc7ca89487d1a80f11a6def484c5",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "No. A 30-day month has \\(30 \\times 24 \\times 60 = 43{,}200\\) minutes, so the 0.1% downtime budget is **43.2 minutes**. After 31 minutes of downtime, **12.2 minutes remain**."
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "context": "all_turns",
    "effort": "high",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tool_usage": {
    "image_gen": {
      "input_tokens": 0,
      "input_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "total_tokens": 0
    },
    "web_search": {
      "num_requests": 0
    }
  },
  "tools": [],
  "top_logprobs": 0,
  "top_p": 0.98,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 44,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 103,
    "output_tokens_details": {
      "reasoning_tokens": 36
    },
    "total_tokens": 147
  },
  "user": null,
  "metadata": {}
}
```

## Examples

<details>

<summary>**Migration Safeguards** — Generate a concise answer through Chat Completions</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-6-sol',
  {
    messages: [
      { role: 'user', content: 'List three practical safeguards for a production API migration.' },
    ],
    max_completion_tokens: 256,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6-sol",
  "messages": [
    {
      "role": "user",
      "content": "List three practical safeguards for a production API migration."
    }
  ],
  "max_completion_tokens": 256
}'
```

```
1. **Preserve compatibility:** Version breaking changes and run contract tests against existing clients.
2. **Roll out gradually:** Start with a canary or small percentage of traffic, and monitor errors, latency, and key business metrics.
3. **Prepare a rollback:** Keep the previous API deployable, back up data, and rehearse how to reverse any schema changes.
```

```json
{
  "id": "chatcmpl-EQzlOt1nlzMH6eShi7U8iGaHTJByy",
  "object": "chat.completion",
  "created": 1790102654,
  "model": "gpt-6-sol",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "1. **Preserve compatibility:** Version breaking changes and run contract tests against existing clients.\n2. **Roll out gradually:** Start with a canary or small percentage of traffic, and monitor errors, latency, and key business metrics.\n3. **Prepare a rollback:** Keep the previous API deployable, back up data, and rehearse how to reverse any schema changes.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 118,
    "total_tokens": 134,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 34,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null
}
```

</details>

## Parameters

Schema variant

ResponsesChat Completions

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

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

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/#page","headline":"GPT-6 Sol","description":"GPT-6 Sol is OpenAI's mid-tier GPT-6 model, built to power complex coding and agentic workflows.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-6-sol/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
