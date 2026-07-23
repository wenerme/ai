---
description: Google's higher-quality image generation model with improved detail and prompt adherence.
title: Nano Banana Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Nano Banana Pro

Text-to-Image • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/nano-banana-pro`

* Third-party
* Zero data retention

Google's higher-quality image generation model with improved detail and prompt adherence.

| Model Info          |                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                         |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                   |
| Zero data retention | Yes                                                                                                                      |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-pro) |

## Usage

```ts
const response = await env.AI.run(
  'google/nano-banana-pro',
  {
    prompt:
      'A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows',
    aspect_ratio: '1:1',
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
  "model": "google/nano-banana-pro",
  "input": {
    "prompt": "A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows",
    "aspect_ratio": "1:1",
    "output_format": "png"
  }
}'
```

![Product Photography](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png"
  },
  "state": "Completed"
}
```

## Examples

**Fantasy Illustration** — Epic fantasy scene

```ts
const response = await env.AI.run(
  'google/nano-banana-pro',
  {
    prompt:
      'An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows',
    aspect_ratio: '16:9',
    image_size: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-pro",
  "input": {
    "prompt": "An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows",
    "aspect_ratio": "16:9",
    "image_size": "2K"
  }
}'
```

![Fantasy Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png"
  },
  "state": "Completed"
}
```

**Architectural Visualization** — Modern architecture render

```ts
const response = await env.AI.run(
  'google/nano-banana-pro',
  {
    prompt:
      'A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset',
    aspect_ratio: '16:9',
    image_size: '4K',
    output_format: 'jpg',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-pro",
  "input": {
    "prompt": "A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset",
    "aspect_ratio": "16:9",
    "image_size": "4K",
    "output_format": "jpg"
  }
}'
```

![Architectural Visualization](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg"
  },
  "state": "Completed"
}
```

**Character Design** — Game character concept art

```ts
const response = await env.AI.run(
  'google/nano-banana-pro',
  {
    prompt:
      'A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles',
    aspect_ratio: '3:2',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-pro",
  "input": {
    "prompt": "A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles",
    "aspect_ratio": "3:2"
  }
}'
```

![Character Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png"
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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-pro/#page","headline":"Nano Banana Pro (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's higher-quality image generation model with improved detail and prompt adherence.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
