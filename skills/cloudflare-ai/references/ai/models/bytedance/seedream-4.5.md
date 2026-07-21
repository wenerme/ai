---
title: Seedream 4.5
description: Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

#  Seedream 4.5

Text-to-Image • ByteDance

`bytedance/seedream-4.5`

Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F5)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-4.5) |

## Usage

* [ TypeScript ](#tab-panel-474)
* [ cURL ](#tab-panel-475)

**TypeScript**

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

* [ Output ](#tab-panel-476)
* [ Raw response ](#tab-panel-477)

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

**High Resolution**  — 4K quality image generation

* [ TypeScript ](#tab-panel-480)
* [ cURL ](#tab-panel-481)

**TypeScript**

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

* [ Output ](#tab-panel-478)
* [ Raw response ](#tab-panel-479)

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

**Image-to-Image**  — Edit using reference images

* [ TypeScript ](#tab-panel-484)
* [ cURL ](#tab-panel-485)

**TypeScript**

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

* [ Output ](#tab-panel-482)
* [ Raw response ](#tab-panel-483)

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

**Sequential Generation**  — Generate multiple related images

* [ TypeScript ](#tab-panel-488)
* [ cURL ](#tab-panel-489)

**TypeScript**

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

* [ Output ](#tab-panel-486)
* [ Raw response ](#tab-panel-487)

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

**Multi-Image Edit**  — Combine multiple reference images

* [ TypeScript ](#tab-panel-492)
* [ cURL ](#tab-panel-493)

**TypeScript**

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

* [ Output ](#tab-panel-490)
* [ Raw response ](#tab-panel-491)

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

* [ Input ](#tab-panel-494)
* [ Output ](#tab-panel-495)

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

Input [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/#page","headline":"Seedream 4.5 (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedream-4.5/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
