---
description: Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.
title: Seedream 4.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

# Seedream 4.5

Text-to-Image • ByteDance

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`bytedance/seedream-4.5`

* Third-party

Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F5)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-4.5) |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.5',
  { prompt: 'A cozy reading nook with floor-to-ceiling bookshelves and a comfortable armchair' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.5",
  "input": {
    "prompt": "A cozy reading nook with floor-to-ceiling bookshelves and a comfortable armchair"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/simple-generation-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-5/0217764052077481386b9a8ed856c57501cfa946ce34c9865285c_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

## Examples

**High Resolution** — 4K quality image generation

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.5',
  {
    prompt:
      'A hyperrealistic still life painting of fresh fruit on an antique wooden table with dramatic chiaroscuro lighting',
    aspect_ratio: '4:3',
    size: '4K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.5",
  "input": {
    "prompt": "A hyperrealistic still life painting of fresh fruit on an antique wooden table with dramatic chiaroscuro lighting",
    "aspect_ratio": "4:3",
    "size": "4K"
  }
}'
```

![High Resolution](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/high-resolution-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-5/0217764052077581386b9a8ed856c57501cfa946ce34c985dabe3_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

**Image-to-Image** — Edit using reference images

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.5',
  {
    prompt: 'Transform this scene into a winter wonderland with snow covering everything',
    aspect_ratio: 'match_input_image',
    image_input: [
      'https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg',
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.5",
  "input": {
    "prompt": "Transform this scene into a winter wonderland with snow covering everything",
    "aspect_ratio": "match_input_image",
    "image_input": [
      "https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg"
    ]
  }
}'
```

![Image-to-Image](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/image-to-image-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-5/0217764052176861386b9a8ed856c57501cfa946ce34c98846458_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

**Sequential Generation** — Generate multiple related images

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.5',
  {
    prompt: 'A character design sheet for a fantasy warrior: front view, side view, and back view',
    aspect_ratio: '16:9',
    max_images: 3,
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
  "model": "bytedance/seedream-4.5",
  "input": {
    "prompt": "A character design sheet for a fantasy warrior: front view, side view, and back view",
    "aspect_ratio": "16:9",
    "max_images": 3,
    "sequential_image_generation": "auto"
  }
}'
```

![Sequential Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/sequential-generation-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-5/0217764052291261386b9a8ed856c57501cfa946ce34c98481db1_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

**Multi-Image Edit** — Combine multiple reference images

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.5',
  {
    prompt: 'Combine the style of the first image with the subject from the second image',
    image_input: [
      'https://replicate.delivery/xezq/TRYcLgNMrBpPJVq09ICKXWe4Z8d6olzpK5vtQPOB8O23ZaMLA/tmpaecga26m.jpg',
      'https://replicate.delivery/xezq/1SbAc0aXYXbVD9doyrdCW78hYufVefMsaJXBrETN7Lu2npxsA/tmphvkx7emy.jpg',
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
  "model": "bytedance/seedream-4.5",
  "input": {
    "prompt": "Combine the style of the first image with the subject from the second image",
    "image_input": [
      "https://replicate.delivery/xezq/TRYcLgNMrBpPJVq09ICKXWe4Z8d6olzpK5vtQPOB8O23ZaMLA/tmpaecga26m.jpg",
      "https://replicate.delivery/xezq/1SbAc0aXYXbVD9doyrdCW78hYufVefMsaJXBrETN7Lu2npxsA/tmphvkx7emy.jpg"
    ],
    "size": "2K"
  }
}'
```

![Multi-Image Edit](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/multi-image-edit-0.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-5/0217764052323791386b9a8ed856c57501cfa946ce34c98b2f132_0.jpeg"
    ]
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

▶image\_input\[\]

`array`format: uri

size

`string`enum: 2K, 4K

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

sequential\_image\_generation

`string`enum: disabled, auto

max\_images

`integer`minimum: 1maximum: 15

disable\_safety\_checker

`boolean`

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/#page","headline":"Seedream 4.5 (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
