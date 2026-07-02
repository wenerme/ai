---
title: Grok Imagine Image Quality
description: xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok Imagine Image Quality

Text-to-Image • xAI

`xai/grok-imagine-image-quality`

xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.

| Model Info        |                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                                    |
| More information  | [link ↗](https://docs.x.ai/developers/models/grok-imagine-image-quality)                                                         |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-image-quality) |

## Usage

* [ TypeScript ](#tab-panel-2064)
* [ cURL ](#tab-panel-2065)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-quality',
  { prompt: 'A golden retriever puppy playing in autumn leaves' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image-quality",
  "input": {
    "prompt": "A golden retriever puppy playing in autumn leaves"
  }
}'
```

* [ Output ](#tab-panel-2062)
* [ Raw response ](#tab-panel-2063)

![Simple Generation](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/simple-generation.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/simple-generation.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**High Quality Portrait**  — High-quality portrait-orientation render at 2K resolution

* [ TypeScript ](#tab-panel-2070)
* [ cURL ](#tab-panel-2071)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-quality',
  {
    prompt:
      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',
    aspect_ratio: '3:4',
    quality: 'high',
    resolution: '2k',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image-quality",
  "input": {
    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",
    "aspect_ratio": "3:4",
    "quality": "high",
    "resolution": "2k"
  }
}'
```

* [ Output ](#tab-panel-2066)
* [ Raw response ](#tab-panel-2067)

![High Quality Portrait](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/high-quality-portrait.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/high-quality-portrait.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Cinematic Widescreen**  — Widescreen cinematic composition

* [ TypeScript ](#tab-panel-2074)
* [ cURL ](#tab-panel-2075)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-quality',
  {
    prompt:
      'A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting',
    aspect_ratio: '16:9',
    quality: 'high',
    resolution: '2k',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image-quality",
  "input": {
    "prompt": "A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting",
    "aspect_ratio": "16:9",
    "quality": "high",
    "resolution": "2k"
  }
}'
```

* [ Output ](#tab-panel-2068)
* [ Raw response ](#tab-panel-2069)

![Cinematic Widescreen](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/cinematic-widescreen.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/cinematic-widescreen.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Medium Quality Landscape**  — Balanced quality landscape render

* [ TypeScript ](#tab-panel-2078)
* [ cURL ](#tab-panel-2079)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-quality',
  {
    prompt:
      'A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky',
    aspect_ratio: '16:9',
    quality: 'medium',
    resolution: '1k',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image-quality",
  "input": {
    "prompt": "A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky",
    "aspect_ratio": "16:9",
    "quality": "medium",
    "resolution": "1k"
  }
}'
```

* [ Output ](#tab-panel-2072)
* [ Raw response ](#tab-panel-2073)

![Medium Quality Landscape](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/medium-quality-landscape.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/medium-quality-landscape.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Square Low Quality Draft**  — Fast, rough draft for iteration

* [ TypeScript ](#tab-panel-2080)
* [ cURL ](#tab-panel-2081)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-quality',
  {
    prompt: 'A quiet Japanese garden in morning mist with a stone lantern and koi pond',
    aspect_ratio: '1:1',
    quality: 'low',
    resolution: '1k',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image-quality",
  "input": {
    "prompt": "A quiet Japanese garden in morning mist with a stone lantern and koi pond",
    "aspect_ratio": "1:1",
    "quality": "low",
    "resolution": "1k"
  }
}'
```

* [ Output ](#tab-panel-2076)
* [ Raw response ](#tab-panel-2077)

![Square Low Quality Draft](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/square-low-quality-draft.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/square-low-quality-draft.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-2082)
* [ Output ](#tab-panel-2083)

prompt

`string`required

n

`integer`minimum: 1maximum: 10

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9, 2:3, 3:2, 9:19.5, 19.5:9, 9:20, 20:9, 1:2, 2:1, auto

quality

`string`enum: low, medium, high

resolution

`string`enum: 1k, 2k

response\_format

`string`enum: url, b64\_json

user

`string`

▶image{}

`object`

▶images\[\]

`array`maxItems: 10

▶mask{}

`object`

image

`string`Generated image. Either a base64 data URI (\`data:image/png;base64,...\`) or an \`https://\` URL, depending on the upstream \`response\_format\` (defaults to base64).

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/#page","headline":"Grok Imagine Image Quality (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.","url":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
