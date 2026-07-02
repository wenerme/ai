---
title: Seedream 5 Lite
description: Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

#  Seedream 5 Lite

Text-to-Image • ByteDance

`bytedance/seedream-5-lite`

Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.

| Model Info       |                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedream5%5F0%5Flite)                                                                |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-5-lite) |

## Usage

* [ TypeScript ](#tab-panel-446)
* [ cURL ](#tab-panel-447)

**TypeScript**

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

* [ Output ](#tab-panel-448)
* [ Raw response ](#tab-panel-449)

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

**High Resolution PNG**  — 3K quality with PNG output

* [ TypeScript ](#tab-panel-452)
* [ cURL ](#tab-panel-453)

**TypeScript**

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

* [ Output ](#tab-panel-450)
* [ Raw response ](#tab-panel-451)

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

**Portrait Photo**  — JPEG output for photographs

* [ TypeScript ](#tab-panel-456)
* [ cURL ](#tab-panel-457)

**TypeScript**

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

* [ Output ](#tab-panel-454)
* [ Raw response ](#tab-panel-455)

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

**Sequential Comic**  — Generate sequential comic panels

* [ TypeScript ](#tab-panel-460)
* [ cURL ](#tab-panel-461)

**TypeScript**

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

* [ Output ](#tab-panel-458)
* [ Raw response ](#tab-panel-459)

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

**Image Variation**  — Create variation from reference

* [ TypeScript ](#tab-panel-464)
* [ cURL ](#tab-panel-465)

**TypeScript**

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

* [ Output ](#tab-panel-462)
* [ Raw response ](#tab-panel-463)

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

* [ Input ](#tab-panel-466)
* [ Output ](#tab-panel-467)

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

Input [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/#page","headline":"Seedream 5 Lite (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedream-5-lite/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
