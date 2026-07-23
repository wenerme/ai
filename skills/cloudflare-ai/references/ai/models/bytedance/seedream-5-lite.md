---
description: Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.
title: Seedream 5 Lite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

# Seedream 5 Lite

Text-to-Image • ByteDance

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`bytedance/seedream-5-lite`

* Third-party

Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.

| Model Info       |                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedream5%5F0%5Flite)                                                                |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-5-lite) |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedream-5-lite',
  { prompt: 'A cute robot watering plants in a sunny greenhouse' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-5-lite",
  "input": {
    "prompt": "A cute robot watering plants in a sunny greenhouse"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/simple-generation-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/021776405291656e8ad6f8fac80a9b78040141fa10ae51dc262e8_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

## Examples

**High Resolution PNG** — 3K quality with PNG output

```ts
const response = await env.AI.run(
  'bytedance/seedream-5-lite',
  {
    prompt:
      'A detailed technical blueprint of a futuristic spacecraft with annotations and measurements',
    aspect_ratio: '16:9',
    output_format: 'png',
    size: '3K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-5-lite",
  "input": {
    "prompt": "A detailed technical blueprint of a futuristic spacecraft with annotations and measurements",
    "aspect_ratio": "16:9",
    "output_format": "png",
    "size": "3K"
  }
}'
```

![High Resolution PNG](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/high-resolution-png-0.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/021776405293188e8ad6f8fac80a9b78040141fa10ae51d8ac521_0.png"
    ]
  },
  "state": "Completed"
}
```

**Portrait Photo** — JPEG output for photographs

```ts
const response = await env.AI.run(
  'bytedance/seedream-5-lite',
  {
    prompt:
      'A professional headshot portrait with soft studio lighting and a neutral gray background',
    aspect_ratio: '3:4',
    output_format: 'jpeg',
    size: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-5-lite",
  "input": {
    "prompt": "A professional headshot portrait with soft studio lighting and a neutral gray background",
    "aspect_ratio": "3:4",
    "output_format": "jpeg",
    "size": "2K"
  }
}'
```

![Portrait Photo](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/portrait-photo-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/021776405322247e8ad6f8fac80a9b78040141fa10ae51db518ee_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

**Sequential Comic** — Generate sequential comic panels

```ts
const response = await env.AI.run(
  'bytedance/seedream-5-lite',
  {
    prompt:
      'A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it',
    aspect_ratio: '4:3',
    max_images: 4,
    sequential_image_generation: 'auto',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-5-lite",
  "input": {
    "prompt": "A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it",
    "aspect_ratio": "4:3",
    "max_images": 4,
    "sequential_image_generation": "auto"
  }
}'
```

![Sequential Comic](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/sequential-comic-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/0217764053440971386b9a8ed856c57501cfa946ce34c987bb335_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

**Image Variation** — Create variation from reference

```ts
const response = await env.AI.run(
  'bytedance/seedream-5-lite',
  {
    prompt: 'Create a variation of this image in a watercolor painting style',
    aspect_ratio: 'match_input_image',
    image_input: [
      'https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg',
    ],
    size: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-5-lite",
  "input": {
    "prompt": "Create a variation of this image in a watercolor painting style",
    "aspect_ratio": "match_input_image",
    "image_input": [
      "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg"
    ],
    "size": "2K"
  }
}'
```

![Image Variation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/image-variation-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/0217764053505731386b9a8ed856c57501cfa946ce34c989ba40c_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 14format: uri

size

`string`enum: 2K, 3K

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

sequential\_image\_generation

`string`enum: disabled, auto

max\_images

`integer`minimum: 1maximum: 15

output\_format

`string`enum: png, jpeg

▶images\[\]

`array`minItems: 1format: uri

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/#page","headline":"Seedream 5 Lite (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
