---
title: HappyHorse 1.1 R2V
description: Alibaba's HappyHorse 1.1 reference-to-video model. Takes 1-9 reference images (characters and scenes) and a prompt that choreographs them into a single video, keeping each subject's identity consistent. Supports 720P and 1080P output with durations from 3 to 15 seconds.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

#  HappyHorse 1.1 R2V

Image-to-Video • Alibaba

`alibaba/hh1.1-r2v`

Alibaba's HappyHorse 1.1 reference-to-video model. Takes 1-9 reference images (characters and scenes) and a prompt that choreographs them into a single video, keeping each subject's identity consistent. Supports 720P and 1080P output with durations from 3 to 15 seconds.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                             |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1.1-r2v) |

## Usage

* [ TypeScript ](#tab-panel-36)
* [ cURL ](#tab-panel-37)

**TypeScript**

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

* [ Output ](#tab-panel-34)
* [ Raw response ](#tab-panel-35)

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

* [ Input ](#tab-panel-38)
* [ Output ](#tab-panel-39)

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

Input [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/#page","headline":"HappyHorse 1.1 R2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's HappyHorse 1.1 reference-to-video model. Takes 1-9 reference images (characters and scenes) and a prompt that choreographs them into a single video, keeping each subject's identity consistent. Supports 720P and 1080P output with durations from 3 to 15 seconds.","url":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-r2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
