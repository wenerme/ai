---
title: Grok Imagine Image
description: xAI's Grok Imagine image model. Generates and edits images from text and reference-image inputs with configurable aspect ratio and resolution.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok Imagine Image

Text-to-Image • xAI

`xai/grok-imagine-image`

xAI's Grok Imagine image model. Generates and edits images from text and reference-image inputs with configurable aspect ratio and resolution.

| Model Info        |                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                            |
| More information  | [link ↗](https://docs.x.ai/developers/models/grok-imagine-image)                                                         |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-image) |

## Usage

* [ TypeScript ](#tab-panel-2196)
* [ cURL ](#tab-panel-2197)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image',
  { prompt: 'A golden retriever puppy playing in autumn leaves' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image",
  "input": {
    "prompt": "A golden retriever puppy playing in autumn leaves"
  }
}'
```

* [ Output ](#tab-panel-2194)
* [ Raw response ](#tab-panel-2195)

![Simple Generation](https://examples.aig.cloudflare.com/xai/grok-imagine-image/simple-generation.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image/simple-generation.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Custom Aspect Ratio**  — Portrait orientation render at 2K resolution

* [ TypeScript ](#tab-panel-2200)
* [ cURL ](#tab-panel-2201)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image',
  {
    prompt:
      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',
    aspect_ratio: '3:4',
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
  "model": "xai/grok-imagine-image",
  "input": {
    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",
    "aspect_ratio": "3:4",
    "resolution": "2k"
  }
}'
```

* [ Output ](#tab-panel-2198)
* [ Raw response ](#tab-panel-2199)

![Custom Aspect Ratio](https://examples.aig.cloudflare.com/xai/grok-imagine-image/custom-aspect-ratio.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image/custom-aspect-ratio.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Cinematic Landscape**  — Widescreen landscape at 2K resolution

* [ TypeScript ](#tab-panel-2204)
* [ cURL ](#tab-panel-2205)

**TypeScript**

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image',
  {
    prompt:
      'A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting',
    aspect_ratio: '16:9',
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
  "model": "xai/grok-imagine-image",
  "input": {
    "prompt": "A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting",
    "aspect_ratio": "16:9",
    "resolution": "2k"
  }
}'
```

* [ Output ](#tab-panel-2202)
* [ Raw response ](#tab-panel-2203)

![Cinematic Landscape](https://examples.aig.cloudflare.com/xai/grok-imagine-image/cinematic-landscape.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image/cinematic-landscape.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-2206)
* [ Output ](#tab-panel-2207)

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

`string`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image/#page","headline":"Grok Imagine Image (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok Imagine image model. Generates and edits images from text and reference-image inputs with configurable aspect ratio and resolution.","url":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
