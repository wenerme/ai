---
description: Google's fast image generation model producing high-quality images from text prompts.
title: Nano Banana
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

#  Nano Banana

 Text-to-Image • Google

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/google/nano-banana/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` google/nano-banana `

* Third-party
* Zero data retention

Google's fast image generation model producing high-quality images from text prompts.

| Model Info          |                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                      |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                |
| Zero data retention | Yes                                                                                                                   |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana) |

## Usage

```ts
const response = await env.AI.run(
  'google/nano-banana',
  {
    prompt:
      'A cozy coffee shop interior with warm lighting, plants hanging from the ceiling, and a cat sleeping on a velvet armchair by the window',
    aspect_ratio: '16:9',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana",
  "input": {
    "prompt": "A cozy coffee shop interior with warm lighting, plants hanging from the ceiling, and a cat sleeping on a velvet armchair by the window",
    "aspect_ratio": "16:9"
  }
}'
```

![Cozy Coffee Shop](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png"
  },
  "state": "Completed"
}
```

## Examples

**Vintage Tokyo Poster**  — Retro travel poster style illustration

```ts
const response = await env.AI.run(
  'google/nano-banana',
  {
    prompt:
      'A vintage travel poster for Tokyo, Japan in the style of 1960s airline advertisements, with Mount Fuji in the background and cherry blossoms framing the scene',
    aspect_ratio: '9:16',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana",
  "input": {
    "prompt": "A vintage travel poster for Tokyo, Japan in the style of 1960s airline advertisements, with Mount Fuji in the background and cherry blossoms framing the scene",
    "aspect_ratio": "9:16"
  }
}'
```

![Vintage Tokyo Poster](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/vintage-tokyo-poster.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/vintage-tokyo-poster.png"
  },
  "state": "Completed"
}
```

**Dewdrops Macro**  — Photorealistic macro photography

```ts
const response = await env.AI.run(
  'google/nano-banana',
  {
    prompt:
      'A photorealistic macro shot of dewdrops on a spider web at sunrise, with rainbow light refracting through each droplet',
    aspect_ratio: '1:1',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana",
  "input": {
    "prompt": "A photorealistic macro shot of dewdrops on a spider web at sunrise, with rainbow light refracting through each droplet",
    "aspect_ratio": "1:1"
  }
}'
```

![Dewdrops Macro](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/dewdrops-macro.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/dewdrops-macro.png"
  },
  "state": "Completed"
}
```

**Pixel Art Marketplace**  — Isometric pixel art scene

```ts
const response = await env.AI.run(
  'google/nano-banana',
  {
    prompt:
      'An isometric pixel art scene of a bustling medieval marketplace with merchants, knights, and a dragon perched on the town hall roof',
    aspect_ratio: '1:1',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana",
  "input": {
    "prompt": "An isometric pixel art scene of a bustling medieval marketplace with merchants, knights, and a dragon perched on the town hall roof",
    "aspect_ratio": "1:1"
  }
}'
```

![Pixel Art Marketplace](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png"
  },
  "state": "Completed"
}
```

**High Resolution Landscape**  — Generate a high-resolution 4K landscape image

```ts
const response = await env.AI.run(
  'google/nano-banana',
  {
    prompt:
      'A dramatic mountain landscape at golden hour with snow-capped peaks and a crystal clear alpine lake',
    aspect_ratio: '16:9',
    image_size: '4K',
    output_format: 'png',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana",
  "input": {
    "prompt": "A dramatic mountain landscape at golden hour with snow-capped peaks and a crystal clear alpine lake",
    "aspect_ratio": "16:9",
    "image_size": "4K",
    "output_format": "png"
  }
}'
```

![High Resolution Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/high-resolution-landscape.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/high-resolution-landscape.png"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 3

aspect\_ratio

`string`enum: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

output\_format

`string`enum: jpg, png, webp

image\_size

`string`enum: 1K, 2K, 4K

image

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/nano-banana/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/google/nano-banana/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana/#page","headline":"Nano Banana (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's fast image generation model producing high-quality images from text prompts.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
