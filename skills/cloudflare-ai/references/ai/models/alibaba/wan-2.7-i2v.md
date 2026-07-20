---
title: Wan 2.7 I2V
description: Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

#  Wan 2.7 I2V

Image-to-Video • Alibaba

`alibaba/wan-2.7-i2v`

Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.

| Model Info          |                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                  |
| More information    | [link ↗](https://wan.video/)                                                                                          |
| Zero data retention | Yes                                                                                                                   |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-2.7-i2v) |

## Usage

* [ TypeScript ](#tab-panel-122)
* [ cURL ](#tab-panel-123)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/wan-2.7-i2v',
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
  "model": "alibaba/wan-2.7-i2v",
  "input": {
    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",
    "prompt": "A gentle camera push-in on the scene with soft ambient lighting"
  }
}'
```

* [ Output ](#tab-panel-120)
* [ Raw response ](#tab-panel-121)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/simple-image-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**High Resolution**  — Generate at 1080P with a longer duration

* [ TypeScript ](#tab-panel-128)
* [ cURL ](#tab-panel-129)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/wan-2.7-i2v',
  {
    image:
      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',
    prompt: 'Subject begins rapping confidently, head bobbing to the beat',
    duration: 10,
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
  "model": "alibaba/wan-2.7-i2v",
  "input": {
    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",
    "prompt": "Subject begins rapping confidently, head bobbing to the beat",
    "duration": 10,
    "resolution": "1080P"
  }
}'
```

* [ Output ](#tab-panel-124)
* [ Raw response ](#tab-panel-125)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/high-resolution.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**With Negative Prompt**  — Guide generation away from unwanted artifacts

* [ TypeScript ](#tab-panel-132)
* [ cURL ](#tab-panel-133)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/wan-2.7-i2v',
  {
    image:
      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',
    prompt: 'Subject slowly turns their head and smiles',
    duration: 5,
    negative_prompt: 'blurry, distorted face, extra limbs',
    resolution: '720P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.7-i2v",
  "input": {
    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",
    "prompt": "Subject slowly turns their head and smiles",
    "duration": 5,
    "negative_prompt": "blurry, distorted face, extra limbs",
    "resolution": "720P"
  }
}'
```

* [ Output ](#tab-panel-126)
* [ Raw response ](#tab-panel-127)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/with-negative-prompt.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Reproducible Output**  — Use a fixed seed for reproducibility

* [ TypeScript ](#tab-panel-134)
* [ cURL ](#tab-panel-135)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/wan-2.7-i2v',
  {
    image:
      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',
    prompt: 'Camera orbits slowly around the subject under streetlamp light',
    duration: 8,
    resolution: '720P',
    seed: 42,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.7-i2v",
  "input": {
    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",
    "prompt": "Camera orbits slowly around the subject under streetlamp light",
    "duration": 8,
    "resolution": "720P",
    "seed": 42
  }
}'
```

* [ Output ](#tab-panel-130)
* [ Raw response ](#tab-panel-131)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/reproducible-output.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-136)
* [ Output ](#tab-panel-137)

image

`string`requiredformat: uri

prompt

`string`

negative\_prompt

`string`

resolution

`string`enum: 720P, 1080P

duration

`integer`minimum: 2maximum: 15

seed

`integer`minimum: 0maximum: 2147483647

watermark

`boolean`

video

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/#page","headline":"Wan 2.7 I2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.","url":"https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
