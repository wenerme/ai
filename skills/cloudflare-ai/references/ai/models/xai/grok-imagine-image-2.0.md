---
description: xAI's Grok Imagine Image 2.0 is a precise image generation and editing model for creative work, with strong instruction following, typography, layout, and reference-image preservation.
title: Grok Imagine Image 2.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok Imagine Image 2.0

Text-to-Image • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-2.0/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-imagine-image-2.0`

* Third-party

xAI's Grok Imagine Image 2.0 is a precise image generation and editing model for creative work, with strong instruction following, typography, layout, and reference-image preservation.

| Model Info        |                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                                |
| More information  | [link ↗](https://docs.x.ai/developers/model-capabilities/images/generation)                                                  |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-image-2.0) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-2.0',
  { prompt: 'A concert poster for a synthwave band, bold retro typography, sharp small print' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-image-2.0",
  "input": {
    "prompt": "A concert poster for a synthwave band, bold retro typography, sharp small print"
  }
}'
```

![Simple Generation](https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/simple-generation.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/simple-generation.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Portrait 2K** — High-resolution image with a controlled aspect ratio

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-2.0',
  {
    aspect_ratio: '3:4',
    prompt:
      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',
    quality: 'medium',
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
  "model": "xai/grok-imagine-image-2.0",
  "input": {
    "aspect_ratio": "3:4",
    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",
    "quality": "medium",
    "resolution": "2k"
  }
}'
```

![Portrait 2K](https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/portrait-2k.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/portrait-2k.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Low Quality Draft** — Fast low-quality draft for iteration

```ts
const response = await env.AI.run(
  'xai/grok-imagine-image-2.0',
  {
    aspect_ratio: '1:1',
    prompt: 'A quiet Japanese garden in morning mist with a stone lantern and koi pond',
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
  "model": "xai/grok-imagine-image-2.0",
  "input": {
    "aspect_ratio": "1:1",
    "prompt": "A quiet Japanese garden in morning mist with a stone lantern and koi pond",
    "quality": "low",
    "resolution": "1k"
  }
}'
```

![Low Quality Draft](https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/low-quality-draft.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/low-quality-draft.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`required

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9, 2:3, 3:2, 9:19.5, 19.5:9, 9:20, 20:9, 1:2, 2:1, auto

quality

`string`enum: low, medium

resolution

`string`enum: 1k, 2k

response\_format

`string`enum: url, b64\_json

user

`string`

▶image{}

`object`

▶images\[\]

`array`maxItems: 5

▶mask{}

`object`

image

`string`Generated image. Either a base64 data URI (\`data:image/png;base64,...\`) or an \`https://\` URL, depending on the upstream \`response\_format\`.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-2.0/#page","headline":"Grok Imagine Image 2.0 (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok Imagine Image 2.0 is a precise image generation and editing model for creative work, with strong instruction following, typography, layout, and reference-image preservation.","url":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-image-2.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
