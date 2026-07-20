---
title: HappyHorse 1.1 I2V
description: Alibaba's HappyHorse 1.1 image-to-video model. Animates a reference image with an optional text prompt, with smoother motion, natural skin textures, and improved close-up quality over 1.0. Supports 720P and 1080P output with durations from 3 to 15 seconds.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

#  HappyHorse 1.1 I2V

Image-to-Video • Alibaba

`alibaba/hh1.1-i2v`

Alibaba's HappyHorse 1.1 image-to-video model. Animates a reference image with an optional text prompt, with smoother motion, natural skin textures, and improved close-up quality over 1.0\. Supports 720P and 1080P output with durations from 3 to 15 seconds.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                             |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1.1-i2v) |

## Usage

* [ TypeScript ](#tab-panel-30)
* [ cURL ](#tab-panel-31)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/hh1.1-i2v',
  {
    image:
      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',
    prompt: 'A gentle camera push-in on the scene with soft ambient lighting',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/hh1.1-i2v",
  "input": {
    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",
    "prompt": "A gentle camera push-in on the scene with soft ambient lighting"
  }
}'
```

* [ Output ](#tab-panel-28)
* [ Raw response ](#tab-panel-29)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/hh1.1-i2v/simple-image-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-32)
* [ Output ](#tab-panel-33)

image

`string`requiredformat: uri

prompt

`string`

negative\_prompt

`string`

resolution

`string`enum: 720P, 1080P

duration

`integer`minimum: 3maximum: 15

seed

`integer`minimum: 0maximum: 2147483647

watermark

`boolean`

video

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-i2v/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-i2v/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-i2v/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1.1-i2v/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-i2v/#page","headline":"HappyHorse 1.1 I2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's HappyHorse 1.1 image-to-video model. Animates a reference image with an optional text prompt, with smoother motion, natural skin textures, and improved close-up quality over 1.0. Supports 720P and 1080P output with durations from 3 to 15 seconds.","url":"https://developers.cloudflare.com/ai/models/alibaba/hh1.1-i2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
