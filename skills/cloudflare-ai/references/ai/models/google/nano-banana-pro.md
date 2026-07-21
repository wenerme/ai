---
title: Nano Banana Pro
description: Google's higher-quality image generation model with improved detail and prompt adherence.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

#  Nano Banana Pro

Text-to-Image • Google

`google/nano-banana-pro`

Google's higher-quality image generation model with improved detail and prompt adherence.

| Model Info          |                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                         |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                   |
| Zero data retention | Yes                                                                                                                      |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-pro) |

## Usage

* [ TypeScript ](#tab-panel-744)
* [ cURL ](#tab-panel-745)

**TypeScript**

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

* [ Output ](#tab-panel-742)
* [ Raw response ](#tab-panel-743)

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

**Fantasy Illustration**  — Epic fantasy scene

* [ TypeScript ](#tab-panel-748)
* [ cURL ](#tab-panel-749)

**TypeScript**

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

* [ Output ](#tab-panel-746)
* [ Raw response ](#tab-panel-747)

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

**Architectural Visualization**  — Modern architecture render

* [ TypeScript ](#tab-panel-754)
* [ cURL ](#tab-panel-755)

**TypeScript**

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

* [ Output ](#tab-panel-750)
* [ Raw response ](#tab-panel-751)

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

**Character Design**  — Game character concept art

* [ TypeScript ](#tab-panel-756)
* [ cURL ](#tab-panel-757)

**TypeScript**

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

* [ Output ](#tab-panel-752)
* [ Raw response ](#tab-panel-753)

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

* [ Input ](#tab-panel-758)
* [ Output ](#tab-panel-759)

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

Input [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-pro/#page","headline":"Nano Banana Pro (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's higher-quality image generation model with improved detail and prompt adherence.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
