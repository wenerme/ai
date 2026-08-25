---
description: Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.
title: Wan 2.7 I2V
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.BK31NAJz.svg)

# Wan 2.7 I2V

Image-to-Video • Alibaba

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/wan-2.7-i2v`

* Third-party
* Zero data retention

Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.

| Model Info          |                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                  |
| More information    | [link ↗](https://wan.video/)                                                                                          |
| Zero data retention | Yes                                                                                                                   |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-2.7-i2v) |

## Usage

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

**High Resolution** — Generate at 1080P with a longer duration

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

**With Negative Prompt** — Guide generation away from unwanted artifacts

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

**Reproducible Output** — Use a fixed seed for reproducibility

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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/#page","headline":"Wan 2.7 I2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.","url":"https://developers.cloudflare.com/ai/models/alibaba/wan-2.7-i2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
