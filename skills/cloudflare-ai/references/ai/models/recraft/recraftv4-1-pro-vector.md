---
title: Recraft V4.1 Pro SVG
description: Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4.1 Pro SVG

Text-to-Image • Recraft

`recraft/recraftv4-1-pro-vector`

Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.

| Model Info          |                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                           |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                                |
| Zero data retention | Yes                                                                                                                              |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-pro-vector) |

## Usage

* [ TypeScript ](#tab-panel-1854)
* [ cURL ](#tab-panel-1855)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  { prompt: 'A modern minimalist logo for a cloud computing company, clean geometric shapes' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "A modern minimalist logo for a cloud computing company, clean geometric shapes"
  }
}'
```

* [ Output ](#tab-panel-1852)
* [ Raw response ](#tab-panel-1853)

![Logo Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/logo-design.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/logo-design.jpg"
  },
  "state": "Completed"
}
```

## Examples

**Icon Set**  — Generate a vector icon

* [ TypeScript ](#tab-panel-1858)
* [ cURL ](#tab-panel-1859)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  {
    prompt: 'A flat design icon of a rocket launching, suitable for a mobile app',
    size: '2048x2048',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "A flat design icon of a rocket launching, suitable for a mobile app",
    "size": "2048x2048"
  }
}'
```

* [ Output ](#tab-panel-1856)
* [ Raw response ](#tab-panel-1857)

![Icon Set](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/icon-set.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/icon-set.jpg"
  },
  "state": "Completed"
}
```

**Print-Ready Vector**  — High-resolution vector for large-format print

* [ TypeScript ](#tab-panel-1862)
* [ cURL ](#tab-panel-1863)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  {
    prompt:
      'An intricate mandala pattern with floral and geometric elements, highly detailed and symmetrical',
    size: '2048x2048',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "An intricate mandala pattern with floral and geometric elements, highly detailed and symmetrical",
    "size": "2048x2048"
  }
}'
```

* [ Output ](#tab-panel-1860)
* [ Raw response ](#tab-panel-1861)

![Print-Ready Vector](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/print-ready-vector.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/print-ready-vector.jpg"
  },
  "state": "Completed"
}
```

**Brand Illustration**  — Vector illustration with brand colors

* [ TypeScript ](#tab-panel-1866)
* [ cURL ](#tab-panel-1867)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  {
    prompt: 'A vector illustration of a cityscape skyline at sunset with clean lines and flat colors',
    controls: { colors: [{ rgb: [255, 87, 51] }, { rgb: [41, 50, 65] }, { rgb: [239, 239, 239] }] },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "A vector illustration of a cityscape skyline at sunset with clean lines and flat colors",
    "controls": {
      "colors": [
        {
          "rgb": [
            255,
            87,
            51
          ]
        },
        {
          "rgb": [
            41,
            50,
            65
          ]
        },
        {
          "rgb": [
            239,
            239,
            239
          ]
        }
      ]
    }
  }
}'
```

* [ Output ](#tab-panel-1864)
* [ Raw response ](#tab-panel-1865)

![Brand Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/brand-illustration.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/brand-illustration.jpg"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-1868)
* [ Output ](#tab-panel-1869)

prompt

`string`required

size

`string`

style

`string`

substyle

`string`

▶controls{}

`object`

image

`string`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/#page","headline":"Recraft V4.1 Pro SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
