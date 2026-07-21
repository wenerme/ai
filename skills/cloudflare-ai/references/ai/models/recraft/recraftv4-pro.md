---
title: Recraft V4 Pro
description: Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4 Pro

Text-to-Image • Recraft

`recraft/recraftv4-pro`

Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.

| Model Info          |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                  |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                       |
| Zero data retention | Yes                                                                                                                     |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-pro) |

## Usage

* [ TypeScript ](#tab-panel-1966)
* [ cURL ](#tab-panel-1967)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-pro',
  {
    prompt:
      'A detailed vintage botanical illustration of a rose with leaves and thorns, scientific illustration style',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-pro",
  "input": {
    "prompt": "A detailed vintage botanical illustration of a rose with leaves and thorns, scientific illustration style"
  }
}'
```

* [ Output ](#tab-panel-1964)
* [ Raw response ](#tab-panel-1965)

![Print-Ready Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/print-ready-illustration.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/print-ready-illustration.png"
  },
  "state": "Completed"
}
```

## Examples

**Large Format Art**  — Large canvas digital art

* [ TypeScript ](#tab-panel-1970)
* [ cURL ](#tab-panel-1971)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-pro',
  {
    prompt:
      'A sweeping fantasy landscape with floating islands, waterfalls cascading into clouds, and ancient stone bridges connecting the islands',
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
  "model": "recraft/recraftv4-pro",
  "input": {
    "prompt": "A sweeping fantasy landscape with floating islands, waterfalls cascading into clouds, and ancient stone bridges connecting the islands",
    "size": "2048x2048"
  }
}'
```

* [ Output ](#tab-panel-1968)
* [ Raw response ](#tab-panel-1969)

![Large Format Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/large-format-art.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/large-format-art.png"
  },
  "state": "Completed"
}
```

**Brand Asset**  — Professional brand asset with controlled colors

* [ TypeScript ](#tab-panel-1978)
* [ cURL ](#tab-panel-1979)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-pro',
  {
    prompt:
      'A modern, clean illustration of a shield with a checkmark inside, representing security and trust',
    controls: {
      background_color: { rgb: [15, 23, 42] },
      colors: [{ rgb: [46, 117, 182] }, { rgb: [255, 255, 255] }],
    },
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
  "model": "recraft/recraftv4-pro",
  "input": {
    "prompt": "A modern, clean illustration of a shield with a checkmark inside, representing security and trust",
    "controls": {
      "background_color": {
        "rgb": [
          15,
          23,
          42
        ]
      },
      "colors": [
        {
          "rgb": [
            46,
            117,
            182
          ]
        },
        {
          "rgb": [
            255,
            255,
            255
          ]
        }
      ]
    },
    "size": "2048x2048"
  }
}'
```

* [ Output ](#tab-panel-1972)
* [ Raw response ](#tab-panel-1973)

![Brand Asset](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/brand-asset.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/brand-asset.png"
  },
  "state": "Completed"
}
```

**Editorial Illustration**  — Magazine-quality editorial illustration

* [ TypeScript ](#tab-panel-1976)
* [ cURL ](#tab-panel-1977)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-pro',
  {
    prompt:
      'A conceptual illustration of artificial intelligence as a tree with circuit-board branches and glowing data leaves',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-pro",
  "input": {
    "prompt": "A conceptual illustration of artificial intelligence as a tree with circuit-board branches and glowing data leaves"
  }
}'
```

* [ Output ](#tab-panel-1974)
* [ Raw response ](#tab-panel-1975)

![Editorial Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/editorial-illustration.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/editorial-illustration.png"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-1980)
* [ Output ](#tab-panel-1981)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-pro/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-pro/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-pro/#page","headline":"Recraft V4 Pro (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
