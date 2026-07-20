---
title: Recraft V4.1 Utility SVG
description: Generate production-ready SVG vector graphics from text prompts with a general-purpose model suited for a wide range of design and illustration tasks.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4.1 Utility SVG

Text-to-Image • Recraft

`recraft/recraftv4-1-utility-vector`

Generate production-ready SVG vector graphics from text prompts with a general-purpose model suited for a wide range of design and illustration tasks.

| Model Info          |                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                               |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                                    |
| Zero data retention | Yes                                                                                                                                  |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility-vector) |

## Usage

* [ TypeScript ](#tab-panel-1930)
* [ cURL ](#tab-panel-1931)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-vector',
  { prompt: 'A simple flat icon of a calendar with a date marked' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility-vector",
  "input": {
    "prompt": "A simple flat icon of a calendar with a date marked"
  }
}'
```

* [ Output ](#tab-panel-1928)
* [ Raw response ](#tab-panel-1929)

![Simple Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/simple-icon.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/simple-icon.jpg"
  },
  "state": "Completed"
}
```

## Examples

**App Icon**  — Mobile app icon in vector format

* [ TypeScript ](#tab-panel-1934)
* [ cURL ](#tab-panel-1935)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-vector',
  { prompt: 'A clean app icon featuring a magnifying glass over a document', size: '1024x1024' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility-vector",
  "input": {
    "prompt": "A clean app icon featuring a magnifying glass over a document",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1932)
* [ Raw response ](#tab-panel-1933)

![App Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/app-icon.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/app-icon.jpg"
  },
  "state": "Completed"
}
```

**Illustration**  — Vector illustration for general use

* [ TypeScript ](#tab-panel-1938)
* [ cURL ](#tab-panel-1939)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-vector',
  {
    prompt:
      'A flat vector illustration of a team of people collaborating around a table with laptops',
    size: '1024x1024',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility-vector",
  "input": {
    "prompt": "A flat vector illustration of a team of people collaborating around a table with laptops",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1936)
* [ Raw response ](#tab-panel-1937)

![Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/illustration.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/illustration.jpg"
  },
  "state": "Completed"
}
```

**With Brand Colors**  — Vector with specific color palette

* [ TypeScript ](#tab-panel-1942)
* [ cURL ](#tab-panel-1943)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-vector',
  {
    prompt: 'A simple shield icon representing protection and security',
    controls: {
      background_color: { rgb: [245, 245, 245] },
      colors: [{ rgb: [34, 139, 87] }, { rgb: [255, 255, 255] }],
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility-vector",
  "input": {
    "prompt": "A simple shield icon representing protection and security",
    "controls": {
      "background_color": {
        "rgb": [
          245,
          245,
          245
        ]
      },
      "colors": [
        {
          "rgb": [
            34,
            139,
            87
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
    }
  }
}'
```

* [ Output ](#tab-panel-1940)
* [ Raw response ](#tab-panel-1941)

![With Brand Colors](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/with-brand-colors.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-vector/with-brand-colors.jpg"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-1944)
* [ Output ](#tab-panel-1945)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-vector/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-vector/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-vector/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-vector/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-vector/#page","headline":"Recraft V4.1 Utility SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate production-ready SVG vector graphics from text prompts with a general-purpose model suited for a wide range of design and illustration tasks.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
