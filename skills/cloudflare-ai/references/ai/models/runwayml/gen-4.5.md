---
title: RunwayML Gen-4.5
description: RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![RunwayML logo](https://developers.cloudflare.com/_astro/runway.Cq8Cjov4.svg)

#  RunwayML Gen-4.5

Text-to-Video • RunwayML

`runwayml/gen-4.5`

RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.

| Model Info        |                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://runwayml.com/terms-of-use)                                                                        |
| More information  | [link ↗](https://runwayml.com/)                                                                                    |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/runwayml/gen-4.5) |

## Usage

* [ TypeScript ](#tab-panel-2038)
* [ cURL ](#tab-panel-2039)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt: 'A timelapse of the Eiffel Tower on a sunny day with clouds flying by',
    duration: 5,
    ratio: '1280:720',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "A timelapse of the Eiffel Tower on a sunny day with clouds flying by",
    "duration": 5,
    "ratio": "1280:720"
  }
}'
```

* [ Output ](#tab-panel-2036)
* [ Raw response ](#tab-panel-2037)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/fd840364-360e-4903-8500-d5787fd8ab90.mp4"
  },
  "state": "Completed"
}
```

## Examples

**Portrait Video**  — Vertical video for social media

* [ TypeScript ](#tab-panel-2042)
* [ cURL ](#tab-panel-2043)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt:
      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',
    duration: 5,
    ratio: '720:1280',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling",
    "duration": 5,
    "ratio": "720:1280"
  }
}'
```

* [ Output ](#tab-panel-2040)
* [ Raw response ](#tab-panel-2041)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/44f43eac-8c12-4084-ace3-6395fa67c13e.mp4"
  },
  "state": "Completed"
}
```

**Nature Close-up**  — Close-up wildlife shot in 16:9

* [ TypeScript ](#tab-panel-2046)
* [ cURL ](#tab-panel-2047)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt:
      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',
    duration: 5,
    ratio: '1280:720',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background",
    "duration": 5,
    "ratio": "1280:720"
  }
}'
```

* [ Output ](#tab-panel-2044)
* [ Raw response ](#tab-panel-2045)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/e03781eb-2544-45ae-a9a8-6148d556bf2a.mp4"
  },
  "state": "Completed"
}
```

**Cinematic Scene**  — Longer duration cinematic video

* [ TypeScript ](#tab-panel-2050)
* [ cURL ](#tab-panel-2051)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt:
      'Aerial drone shot flying through a misty forest at dawn, rays of sunlight breaking through the trees',
    duration: 10,
    ratio: '1280:720',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "Aerial drone shot flying through a misty forest at dawn, rays of sunlight breaking through the trees",
    "duration": 10,
    "ratio": "1280:720"
  }
}'
```

* [ Output ](#tab-panel-2048)
* [ Raw response ](#tab-panel-2049)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/23ea177e-523d-45b4-9f8c-c4f8d7238ff0.mp4"
  },
  "state": "Completed"
}
```

**Image-to-Video**  — Animate an existing image

* [ TypeScript ](#tab-panel-2056)
* [ cURL ](#tab-panel-2057)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt: 'Camera slowly pans across the scene, gentle wind blowing',
    duration: 5,
    image_input:
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',
    ratio: '1280:720',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "Camera slowly pans across the scene, gentle wind blowing",
    "duration": 5,
    "image_input": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg",
    "ratio": "1280:720"
  }
}'
```

* [ Output ](#tab-panel-2052)
* [ Raw response ](#tab-panel-2053)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/ab424367-7431-4a0a-aa39-52604ff9150a.mp4"
  },
  "state": "Completed"
}
```

**Reproducible Generation**  — Use seed for consistent results

* [ TypeScript ](#tab-panel-2060)
* [ cURL ](#tab-panel-2061)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt: 'A sailboat gliding across calm ocean waters at sunset',
    duration: 5,
    ratio: '1280:720',
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
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "A sailboat gliding across calm ocean waters at sunset",
    "duration": 5,
    "ratio": "1280:720",
    "seed": 42
  }
}'
```

* [ Output ](#tab-panel-2054)
* [ Raw response ](#tab-panel-2055)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/0bdfbec7-0823-4529-bdb5-d37bb24adb0d.mp4"
  },
  "state": "Completed"
}
```

**With Content Moderation**  — Adjust content moderation settings

* [ TypeScript ](#tab-panel-2062)
* [ cURL ](#tab-panel-2063)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/gen-4.5',
  {
    prompt: 'A press conference with multiple speakers at podiums',
    content_moderation: { public_figure_threshold: 'low' },
    duration: 5,
    ratio: '1280:720',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/gen-4.5",
  "input": {
    "prompt": "A press conference with multiple speakers at podiums",
    "content_moderation": {
      "public_figure_threshold": "low"
    },
    "duration": 5,
    "ratio": "1280:720"
  }
}'
```

* [ Output ](#tab-panel-2058)
* [ Raw response ](#tab-panel-2059)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/75c4cb0d-20aa-4824-b1f3-32f33ab9269b.mp4"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-2064)
* [ Output ](#tab-panel-2065)

prompt

`string`requiredminLength: 1maxLength: 1000Text prompt describing what should appear in the video

image\_input

`string`HTTPS URL, Runway URI, or data URI containing an image for image-to-video

ratio

`string`requireddefault: 1280:720enum: 1280:720, 720:1280, 1104:832, 960:960, 832:1104, 1584:672Resolution/aspect ratio of the output video

duration

`integer`requireddefault: 5minimum: 2maximum: 10Video duration in seconds

seed

`integer`minimum: 0maximum: 4294967295Random seed for reproducible results

▶content\_moderation{}

`object`Content moderation settings

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/runwayml/gen-4.5/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/runwayml/gen-4.5/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/runwayml/gen-4.5/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/runwayml/gen-4.5/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/runwayml/gen-4.5/#page","headline":"RunwayML Gen-4.5 (RunwayML) · Cloudflare AI docs · Cloudflare AI docs","description":"RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.","url":"https://developers.cloudflare.com/ai/models/runwayml/gen-4.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
