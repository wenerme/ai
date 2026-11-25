---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Kling v2.6 generates cinematic 5- or 10-second videos with synchronized audio from text prompts or a base64-encoded starting image. It supports 16:9, 9:16, and 1:1 aspect ratios, with optional negative prompts and standard or pro quality modes.
title: Kling v2.6
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

k

# Kling v2.6

Text-to-Video • kwaivgi

Model ID

`kwaivgi/kling-v2.6` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kling v2.6 generates cinematic 5- or 10-second videos with synchronized audio from text prompts or a base64-encoded starting image. It supports 16:9, 9:16, and 1:1 aspect ratios, with optional negative prompts and standard or pro quality modes.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://klingai.com/) |
| Pricing | <ul><li>Default (per second)$0.07</li><li>default audio$0.14</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'kwaivgi/kling-v2.6',
  {
    prompt:
      'A cinematic wide shot of a red hot-air balloon drifting above a mountain valley at sunrise, the camera slowly tracking forward as golden light breaks through the clouds.',
    aspect_ratio: '16:9',
    duration: '5',
    mode: 'pro',
    sound: 'on',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "kwaivgi/kling-v2.6",
  "input": {
    "prompt": "A cinematic wide shot of a red hot-air balloon drifting above a mountain valley at sunrise, the camera slowly tracking forward as golden light breaks through the clouds.",
    "aspect_ratio": "16:9",
    "duration": "5",
    "mode": "pro",
    "sound": "on"
  }
}'
```

```json
{
  "code": 0,
  "message": "SUCCEED",
  "request_id": "088b1870-9e01-49b4-9b8c-485313e0259c",
  "data": {
    "task_id": "949523490075068623",
    "task_status": "succeed",
    "task_info": {},
    "task_result": {
      "videos": [
        {
          "id": "949520558369162413",
          "url": "https://examples.aig.cloudflare.com/kwaivgi/kling-v2.6/generate-a-cinematic-mountain-sunrise.mp4",
          "duration": "5.041"
        }
      ]
    },
    "task_status_msg": "",
    "created_at": 1794413587278,
    "updated_at": 1794413715176,
    "final_unit_deduction": "0",
    "final_balance_deduction": {
      "quota": "0.42",
      "list_price": "0.7"
    }
  }
}
```

## Parameters

prompt

`string`requiredText prompt for video generation

negative\_prompt

`string`Things to exclude from the video

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 1:1Output aspect ratio

duration

`string`requireddefault: 5enum: 5, 10Video duration in seconds

mode

`string`requireddefault: proenum: std, proGeneration quality mode

sound

`string`requireddefault: onenum: on, offGenerate synchronized audio

video

`string`format: uriGenerated video URL

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/kwaivgi/kling-v2.6/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/kwaivgi/kling-v2.6/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/kwaivgi/kling-v2.6/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/kwaivgi/kling-v2.6/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/kwaivgi/kling-v2.6/#page","headline":"Kling v2.6","description":"Kling v2.6 generates cinematic 5- or 10-second videos with synchronized audio from text prompts or a base64-encoded starting image. It supports 16:9, 9:16, and 1:1 aspect ratios, with optional negative prompts and standard or pro quality modes.","url":"https://developers.cloudflare.com/ai/models/kwaivgi/kling-v2.6/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
