---
description: Alibaba's HappyHorse 1.1 text-to-video model. Generates videos from a text prompt with stronger dynamic expressiveness, better visual quality, and improved instruction following over 1.0. Configurable resolution, aspect ratio, and duration (3-15s).
title: HappyHorse 1.1 T2V
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

#  HappyHorse 1.1 T2V

 Text-to-Video • Alibaba

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` alibaba/hh1.1-t2v `

* Third-party

Alibaba's HappyHorse 1.1 text-to-video model. Generates videos from a text prompt with stronger dynamic expressiveness, better visual quality, and improved instruction following over 1.0\. Configurable resolution, aspect ratio, and duration (3-15s).

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                 |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                              |
| Pricing           | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1.1-t2v) |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/hh1.1-t2v',
  { prompt: 'A little girl walking on the road' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/hh1.1-t2v",
  "input": {
    "prompt": "A little girl walking on the road"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/hh1.1-t2v/simple-text-to-video.mp4"
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

`string`enum: 720P, 1080P

ratio

`string`enum: 16:9, 9:16, 1:1, 4:3, 3:4

duration

`integer`minimum: 3maximum: 15

seed

`integer`minimum: 0maximum: 2147483647

watermark

`boolean`

video

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/#page","headline":"HappyHorse 1.1 T2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's HappyHorse 1.1 text-to-video model. Generates videos from a text prompt with stronger dynamic expressiveness, better visual quality, and improved instruction following over 1.0. Configurable resolution, aspect ratio, and duration (3-15s).","url":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-t2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
