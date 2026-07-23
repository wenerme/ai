---
description: Alibaba's HappyHorse 1.1 reference-to-video model. Takes 1-9 reference images (characters and scenes) and a prompt that choreographs them into a single video, keeping each subject's identity consistent. Supports 720P and 1080P output with durations from 3 to 15 seconds.
title: HappyHorse 1.1 R2V
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

# HappyHorse 1.1 R2V

Image-to-Video • Alibaba

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/hh1.1-r2v`

* Third-party

Alibaba's HappyHorse 1.1 reference-to-video model. Takes 1-9 reference images (characters and scenes) and a prompt that choreographs them into a single video, keeping each subject's identity consistent. Supports 720P and 1080P output with durations from 3 to 15 seconds.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                             |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1.1-r2v) |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/hh1.1-r2v',
  {
    prompt:
      'The person in image 1 walks through the futuristic city in image 2 and meets the person in image 3.',
    images: [
      'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/portrait-photo-0.jpeg',
      'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/futuristic-city.png',
      'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/high-resolution-portrait.jpg',
    ],
    duration: 8,
    ratio: '16:9',
    resolution: '1080P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/hh1.1-r2v",
  "input": {
    "prompt": "The person in image 1 walks through the futuristic city in image 2 and meets the person in image 3.",
    "images": [
      "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/portrait-photo-0.jpeg",
      "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/futuristic-city.png",
      "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/high-resolution-portrait.jpg"
    ],
    "duration": 8,
    "ratio": "16:9",
    "resolution": "1080P"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/hh1.1-r2v/multi-image-reference.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredminLength: 1maxLength: 2500

▶images\[\]

`array`requiredminItems: 1maxItems: 9format: uri

resolution

`string`enum: 720P, 1080P

ratio

`string`enum: 16:9, 9:16, 3:4, 4:3, 1:1, 21:9, 9:21, 5:4, 4:5

duration

`integer`minimum: 3maximum: 15

seed

`integer`minimum: 0maximum: 2147483647

watermark

`boolean`

video

`string`format: uri

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/#page","headline":"HappyHorse 1.1 R2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's HappyHorse 1.1 reference-to-video model. Takes 1-9 reference images (characters and scenes) and a prompt that choreographs them into a single video, keeping each subject's identity consistent. Supports 720P and 1080P output with durations from 3 to 15 seconds.","url":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
