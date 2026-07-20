---
title: HappyHorse 1.0 T2V
description: Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

#  HappyHorse 1.0 T2V

Text-to-Video • Alibaba

`alibaba/hh1-t2v`

Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).

| Model Info          |                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                              |
| More information    | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                           |
| Zero data retention | Yes                                                                                                               |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1-t2v) |

## Usage

* [ TypeScript ](#tab-panel-16)
* [ cURL ](#tab-panel-17)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/hh1-t2v',
  { prompt: 'A little girl walking on the road' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/hh1-t2v",
  "input": {
    "prompt": "A little girl walking on the road"
  }
}'
```

* [ Output ](#tab-panel-14)
* [ Raw response ](#tab-panel-15)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-t2v/simple-text-to-video.mp4"
  },
  "state": "Completed"
}
```

## Examples

**Vertical 1080P**  — Vertical 9:16 output at 1080P for social media

* [ TypeScript ](#tab-panel-22)
* [ cURL ](#tab-panel-23)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/hh1-t2v',
  {
    prompt: 'A dog running through a field of tall grass, slow motion, golden hour',
    duration: 6,
    ratio: '9:16',
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
  "model": "alibaba/hh1-t2v",
  "input": {
    "prompt": "A dog running through a field of tall grass, slow motion, golden hour",
    "duration": 6,
    "ratio": "9:16",
    "resolution": "1080P"
  }
}'
```

* [ Output ](#tab-panel-18)
* [ Raw response ](#tab-panel-19)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-t2v/vertical-1080p.mp4"
  },
  "state": "Completed"
}
```

**Reproducible Output**  — Use a fixed seed for reproducibility

* [ TypeScript ](#tab-panel-24)
* [ cURL ](#tab-panel-25)

**TypeScript**

```ts
const response = await env.AI.run(
  'alibaba/hh1-t2v',
  {
    prompt: 'Clouds drifting across a mountain range, time-lapse style',
    duration: 5,
    ratio: '16:9',
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
  "model": "alibaba/hh1-t2v",
  "input": {
    "prompt": "Clouds drifting across a mountain range, time-lapse style",
    "duration": 5,
    "ratio": "16:9",
    "resolution": "720P",
    "seed": 42
  }
}'
```

* [ Output ](#tab-panel-20)
* [ Raw response ](#tab-panel-21)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-t2v/reproducible-output.mp4"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-26)
* [ Output ](#tab-panel-27)

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

Input [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1-t2v/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1-t2v/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1-t2v/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/alibaba/hh1-t2v/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/hh1-t2v/#page","headline":"HappyHorse 1.0 T2V (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).","url":"https://developers.cloudflare.com/ai/models/alibaba/hh1-t2v/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
