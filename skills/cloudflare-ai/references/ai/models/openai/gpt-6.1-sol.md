---
description: GPT-6.1 Sol is OpenAI's newest Sol model, delivering near-Astra performance at a lower cost for complex coding, computer use, and professional work.
title: GPT-6.1 Sol
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-6.1 Sol

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-6.1-sol`

- Third-party

GPT-6.1 Sol is OpenAI's newest Sol model, delivering near-Astra performance at a lower cost for complex coding, computer use, and professional work.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,050,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/models/gpt-6.1-sol) |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Short-context input (per 1M)$2.00</li><li>Short-context cached input (per 1M)$0.10</li><li>Short-context cache write (per 1M)$2.50</li><li>Short-context output (per 1M)$10.00</li><li>Long-context input (per 1M)$4.00</li><li>Long-context cached input (per 1M)$0.20</li><li>Long-context cache write (per 1M)$5.00</li><li>Long-context output (per 1M)$15.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-6.1-sol',
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
  "model": "openai/gpt-6.1-sol",
  "input": "A service has 99.9% monthly availability and just had 31 minutes of downtime. Has it exceeded the monthly error budget for a 30-day month? Show the calculation briefly.",
  "max_output_tokens": 512,
  "reasoning": {
    "effort": "high"
  }
}'
```

```
No. A 30-day month has \(30 \times 24 \times 60 = 43{,}200\) minutes.

The downtime budget is:
\[
43{,}200 \times (1 - 0.999) = 43.2 \text{ minutes}
\]

With **31 minutes** of total downtime, it has **12.2 minutes remaining** in the monthly error budget.
```

```json
{
  "id": "resp_0742f162d8d88f47006abbfb65797087d1bf6067c71ad4f488",
  "object": "response",
  "created_at": 1790704485,
  "status": "completed",
  "access_programs": null,
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1790704489,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-6.1-sol",
  "moderation": null,
  "output": [
    {
      "id": "rs_0742f162d8d88f47006abbfb66b91887d1b350a855c33b1a1d",
      "type": "reasoning",
      "content": [],
      "encrypted_content": "gAAAAABqu_tp8krmIOoigihwk28V3hw4d1Y_Eool5VFtPYh3G8ZpXSlRoDhZdTuB2XNHizSr-faVPlm3Z-K0RgfU74vlZp8aWqhlnrGs8_XYwk1Iqi-TSacN9S_3wYvHyHpVKFqGAqAaj63TVGuYen-flkgSasvprEnL6KUPPjcJlHFoPMppkXXPFrwuaw7F47QHGv0FAvok_wtBiSgghzbXH4_dgwxvT0hsAcX03xTWRGMQP18n1esxQr47TyrQG2APoynZLdietAvr-qUmghFeKTrTusGjeLgVIFCDDEwSvLBW3sZj5ezX9-mWwKWdAx98-7C2e9322jTGXWSC_8Z3axK8DjKWLf8VXe8bBvAFA3g15o0aBpy144hYrsymXIax1k5SSYqvHvNiuV_eA2pzCG_BcJkvRtZ-9zFQLZ3rtO6objv3UbZ21qXwNfvlp2FGxI4Qv0LbReLaHua5Zttkg7N-t0n0D8NB2Tv2UP6FUdbAgLOqJXMYcivRP2vtvnrkUJz5DN23FIhiqGL8HgGDedg--_AqReHxNWGmh3EUsUK0IBLwJSO0WXF3yfBFqveVW_OWIoXugQha_KDz0SSTS3F4I98UAXCTV51KskT-caWnKs8SrilQtuHdhf-axWo_MnQLlsjoSNvPJI-G3-Dz8f-hLQvlo6yE3WejMXJpTpXtboCFId7ezJgZYrbDZTZJGurWODEGmk9BRmwRvg-BqFRt6OVyTioGafw0efSrEGEne50Lv5ACUfBzOV0-tCQ_bGFp0YW7HwpxLsdWjk0l6IteeFHQ6r6sFDm1lvt0GvYTa0KMmYJJxj3heM-m245AUZIrFf-D0vrII0VwKtHTtBhavXIpS--6P_SQ2A_RP10zMoWj3EOWa4s1tZ9zaJX1W1IFdqwBuOS4ISBAgaOKJe-GwypcOWMzmhNDV9ZGWtHwdkgzdd3ksZ6m5VF1mm1ngooUdJT1KidlGLLpamsmEPlUAJskSHBcMOcaT5RXqp4nPx3CPcHFetUTbSsYH0ArFRdPuPM8L8tR_HJ11sEM2fFWwKdgntQ48sS1o3ZS_t72yKBWxVO3XHWY-2Ej2PHvP1gjEuIRy1gWvZVBchb3KVBbqwGAND9IJ5zWmjlHEo48khWpCZiJUHtS8W1roy4bNOvEF0kWY0pe01-N7HKBDGHLPJbR3ifB0GMtQHkuTR_LhlfluWvvgODrRvzSdaconMNl_9V0p_KRulPSBVYdhQ1Pef_F0mm5S_rVq2aJR1v9Iqb7bF52TBFbZ4iXJphjpft1AxzDEEamX4O1hAiHpu0HgdwAwsV8lTxdUdeQ5c1fksqQyXCVwmBVL-Kiw7NGoiFDW1Q_uVLC1iv6-IiRaHWrFmvo85MLlhF-pUocgZasQC4mM70zW5AUaaT6adJD15cmTGIv3C5_UvjHUbPJ40Fy8Wd65bdZiER0WL2qTD13FUomOIK3JqTGTccqakCzkFDAv_2HCZBbn0xgM_oEdN2WsrP-iiBquNPCUr5Y8jqVsPHsLfxTOgbDCdWRHcAl-oe5aN_RtciAF6aH_oHoAft4LLRzS9APxWemfhUV9vsrQN4jxg32WghgIK3ot5vkKW0bJFnRmhr86esnTXfJIUMOQgjRA4hWvoejNqWnMLiWK9_C8PdvSiNhxTxxGVTEChQmql6WpS-AFYuZdTR9tARXap_cpQ==",
      "summary": []
    },
    {
      "id": "msg_0742f162d8d88f47006abbfb68a39c87d1b289852fcb1469dc",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "No. A 30-day month has \\(30 \\times 24 \\times 60 = 43{,}200\\) minutes.\n\nThe downtime budget is:\n\\[\n43{,}200 \\times (1 - 0.999) = 43.2 \\text{ minutes}\n\\]\n\nWith **31 minutes** of total downtime, it has **12.2 minutes remaining** in the monthly error budget."
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
    "output_tokens": 222,
    "output_tokens_details": {
      "reasoning_tokens": 129
    },
    "total_tokens": 266
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
  'openai/gpt-6.1-sol',
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
  "model": "openai/gpt-6.1-sol",
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
1. **Validate backward compatibility:** Run contract and integration tests against real client workflows. Version breaking changes and keep the old API available during the transition.

2. **Roll out gradually with monitoring:** Start with a small canary group, then increase traffic while tracking error rates, latency, and data correctness. Define thresholds that pause or reverse the rollout.

3. **Test the rollback plan:** Use feature flags or traffic routing to restore the old API quickly. Back up affected data and ensure schema changes remain compatible with the old version.
```

```json
{
  "id": "chatcmpl-ETWKQsjDdzqugdVw1xUKVJuFad33U",
  "object": "chat.completion",
  "created": 1790704490,
  "model": "gpt-6.1-sol",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "1. **Validate backward compatibility:** Run contract and integration tests against real client workflows. Version breaking changes and keep the old API available during the transition.\n\n2. **Roll out gradually with monitoring:** Start with a small canary group, then increase traffic while tracking error rates, latency, and data correctness. Define thresholds that pause or reverse the rollout.\n\n3. **Test the rollback plan:** Use feature flags or traffic routing to restore the old API quickly. Back up affected data and ensure schema changes remain compatible with the old version.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 155,
    "total_tokens": 171,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 40,
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/#page","headline":"GPT-6.1 Sol","description":"GPT-6.1 Sol is OpenAI's newest Sol model, delivering near-Astra performance at a lower cost for complex coding, computer use, and professional work.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-6.1-sol/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
