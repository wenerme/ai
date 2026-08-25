---
description: xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.
title: Grok Imagine Image Quality
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok Imagine Image Quality

Text-to-Image • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-imagine-image-quality`

* Third-party
* Zero data retention

xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.

| Model Info          |                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://x.ai/legal/terms-of-service)                                                                                    |
| More information    | [link ↗](https://docs.x.ai/developers/models/grok-imagine-image-quality)                                                         |
| Zero data retention | Yes                                                                                                                              |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-image-quality) |

## Usage

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

**High Quality Portrait** — High-quality portrait-orientation render at 2K resolution

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

**Cinematic Widescreen** — Widescreen cinematic composition

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

**Medium Quality Landscape** — Balanced quality landscape render

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

**Square Low Quality Draft** — Fast, rough draft for iteration

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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/#page","headline":"Grok Imagine Image Quality (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.","url":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-quality/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
