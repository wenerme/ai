---
description: Alibaba's Wan 3.0 Prime text-to-video model. Generates cinematic videos from text prompts with adaptive aspect ratio, 480P, 720P, or 1080P resolution, and configurable duration.
title: Wan 3.0 Prime Video
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.BK31NAJz.svg)

# Wan 3.0 Prime Video

Text-to-Video • Alibaba

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/wan-3.0-prime`

- Third-party

Alibaba's Wan 3.0 Prime text-to-video model. Generates cinematic videos from text prompts with adaptive aspect ratio, 480P, 720P, or 1080P resolution, and configurable duration.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal) |
| More information | [link ↗](https://www.alibabacloud.com/help/en/model-studio/models) |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-3.0-prime) |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/wan-3.0-prime',
  {
    prompt:
      'A kitten running across a rooftop under the moonlight, city neon lights flickering in the distance, cinematic quality, smooth camera movement.',
    resolution: '480P',
    ratio: 'adaptive',
    duration: 5,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-3.0-prime",
  "input": {
    "prompt": "A kitten running across a rooftop under the moonlight, city neon lights flickering in the distance, cinematic quality, smooth camera movement.",
    "resolution": "480P",
    "ratio": "adaptive",
    "duration": 5
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/wan-3.0-prime/adaptive-480p-text-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredminLength: 1maxLength: 2500

resolution

`string`enum: 480P, 720P, 1080P

ratio

`string`enum: adaptive, 16:9, 9:16, 1:1, 4:3, 3:4

duration

`integer`minimum: 1maximum: 15

video

`string`format: uri

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/#page","headline":"Wan 3.0 Prime Video (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's Wan 3.0 Prime text-to-video model. Generates cinematic videos from text prompts with adaptive aspect ratio, 480P, 720P, or 1080P resolution, and configurable duration.","url":"https://developers.cloudflare.com/ai/models/alibaba/wan-3.0-prime/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
