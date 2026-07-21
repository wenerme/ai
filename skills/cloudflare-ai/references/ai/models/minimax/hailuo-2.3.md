---
title: MiniMax Hailuo 2.3
description: A high-fidelity video generation model optimized for realistic human motion, cinematic VFX, expressive characters, and strong prompt and style adherence across text-to-video and image-to-video workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg)

#  MiniMax Hailuo 2.3

Text-to-Video • MiniMax

`minimax/hailuo-2.3`

A high-fidelity video generation model optimized for realistic human motion, cinematic VFX, expressive characters, and strong prompt and style adherence across text-to-video and image-to-video workflows.

| Model Info          |                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://hailuoai.com/terms)                                                                                 |
| More information    | [link ↗](https://hailuoai.com/)                                                                                      |
| Zero data retention | Yes                                                                                                                  |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/hailuo-2.3) |

## Usage

* [ TypeScript ](#tab-panel-910)
* [ cURL ](#tab-panel-911)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/hailuo-2.3',
  {
    prompt: 'A golden retriever playing fetch on a sandy beach at sunset',
    duration: 6,
    fast_pretreatment: false,
    prompt_optimizer: true,
    resolution: '768P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/hailuo-2.3",
  "input": {
    "prompt": "A golden retriever playing fetch on a sandy beach at sunset",
    "duration": 6,
    "fast_pretreatment": false,
    "prompt_optimizer": true,
    "resolution": "768P"
  }
}'
```

* [ Output ](#tab-panel-908)
* [ Raw response ](#tab-panel-909)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "status": "Success",
    "task_id": "388507504709991",
    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/97d0c2d0-45ab-4ce8-a1f4-177401f43073/output.mp4"
  },
  "state": "Completed"
}
```

## Examples

**High Resolution**  — 1080P video for higher quality output

* [ TypeScript ](#tab-panel-914)
* [ cURL ](#tab-panel-915)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/hailuo-2.3',
  {
    prompt:
      'A professional chef preparing sushi in a traditional Japanese kitchen, detailed close-up shots',
    duration: 6,
    fast_pretreatment: false,
    prompt_optimizer: true,
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
  "model": "minimax/hailuo-2.3",
  "input": {
    "prompt": "A professional chef preparing sushi in a traditional Japanese kitchen, detailed close-up shots",
    "duration": 6,
    "fast_pretreatment": false,
    "prompt_optimizer": true,
    "resolution": "1080P"
  }
}'
```

* [ Output ](#tab-panel-912)
* [ Raw response ](#tab-panel-913)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "status": "Success",
    "task_id": "388510158565457",
    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/1ee6a770-eb88-4b6a-86ea-61981f01ed65/output.mp4"
  },
  "state": "Completed"
}
```

**Image to Video**  — Animate a still image with I2V

* [ TypeScript ](#tab-panel-920)
* [ cURL ](#tab-panel-921)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/hailuo-2.3',
  {
    prompt: 'Slowly zoom in with subtle parallax movement, gentle atmospheric motion',
    duration: 6,
    fast_pretreatment: false,
    first_frame_image:
      'https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg',
    prompt_optimizer: true,
    resolution: '768P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/hailuo-2.3",
  "input": {
    "prompt": "Slowly zoom in with subtle parallax movement, gentle atmospheric motion",
    "duration": 6,
    "fast_pretreatment": false,
    "first_frame_image": "https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg",
    "prompt_optimizer": true,
    "resolution": "768P"
  }
}'
```

* [ Output ](#tab-panel-916)
* [ Raw response ](#tab-panel-917)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "status": "Success",
    "task_id": "388509844320343",
    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/a19c7850-6f3b-47dd-b6f1-decb592a11ff/output.mp4"
  },
  "state": "Completed"
}
```

**Fast Processing**  — Enable fast pretreatment for quicker results

* [ TypeScript ](#tab-panel-922)
* [ cURL ](#tab-panel-923)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/hailuo-2.3',
  {
    prompt: 'Fireworks exploding over a city skyline at night, colorful reflections on water',
    duration: 6,
    fast_pretreatment: true,
    prompt_optimizer: true,
    resolution: '768P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/hailuo-2.3",
  "input": {
    "prompt": "Fireworks exploding over a city skyline at night, colorful reflections on water",
    "duration": 6,
    "fast_pretreatment": true,
    "prompt_optimizer": true,
    "resolution": "768P"
  }
}'
```

* [ Output ](#tab-panel-918)
* [ Raw response ](#tab-panel-919)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "status": "Success",
    "task_id": "388509805367378",
    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/438b5433-5d32-4760-9564-c86da3d22aee/output.mp4"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-924)
* [ Output ](#tab-panel-925)

prompt

`string`maxLength: 2000

first\_frame\_image

`string`

prompt\_optimizer

`boolean`requireddefault: true

fast\_pretreatment

`boolean`requireddefault: false

▶duration

`one of`required

resolution

`string`requireddefault: 768Penum: 768P, 1080P

video

`string`format: uri

task\_id

`string`

status

`string`enum: Preparing, Queueing, Processing, Success, Fail

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/minimax/hailuo-2.3/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/minimax/hailuo-2.3/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/minimax/hailuo-2.3/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/minimax/hailuo-2.3/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/hailuo-2.3/#page","headline":"MiniMax Hailuo 2.3 (MiniMax) · Cloudflare AI docs · Cloudflare AI docs","description":"A high-fidelity video generation model optimized for realistic human motion, cinematic VFX, expressive characters, and strong prompt and style adherence across text-to-video and image-to-video workflows.","url":"https://developers.cloudflare.com/ai/models/minimax/hailuo-2.3/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
