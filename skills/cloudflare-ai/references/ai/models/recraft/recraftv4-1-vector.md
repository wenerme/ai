---
title: Recraft V4.1 SVG
description: Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4.1 SVG

Text-to-Image • Recraft

`recraft/recraftv4-1-vector`

Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.

| Model Info          |                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                       |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                            |
| Zero data retention | Yes                                                                                                                          |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-vector) |

## Usage

* [ TypeScript ](#tab-panel-1948)
* [ cURL ](#tab-panel-1949)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  { prompt: 'A simple flat icon of a coffee cup with steam rising' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A simple flat icon of a coffee cup with steam rising"
  }
}'
```

* [ Output ](#tab-panel-1946)
* [ Raw response ](#tab-panel-1947)

![Simple Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/simple-icon.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/simple-icon.jpg"
  },
  "state": "Completed"
}
```

## Examples

**App Icon**  — Mobile app icon in vector format

* [ TypeScript ](#tab-panel-1952)
* [ cURL ](#tab-panel-1953)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  {
    prompt: 'A colorful gradient app icon featuring a chat bubble with a sparkle effect',
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
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A colorful gradient app icon featuring a chat bubble with a sparkle effect",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1950)
* [ Raw response ](#tab-panel-1951)

![App Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/app-icon.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/app-icon.jpg"
  },
  "state": "Completed"
}
```

**Illustration**  — Vector illustration for web use

* [ TypeScript ](#tab-panel-1956)
* [ cURL ](#tab-panel-1957)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  {
    prompt:
      'A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view',
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
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1954)
* [ Raw response ](#tab-panel-1955)

![Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/illustration.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/illustration.jpg"
  },
  "state": "Completed"
}
```

**With Brand Colors**  — Vector with specific color palette

* [ TypeScript ](#tab-panel-1960)
* [ cURL ](#tab-panel-1961)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  {
    prompt: 'A badge or seal design with a star in the center, suitable for a certification mark',
    controls: {
      background_color: { rgb: [255, 255, 255] },
      colors: [{ rgb: [0, 119, 182] }, { rgb: [255, 209, 102] }],
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
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A badge or seal design with a star in the center, suitable for a certification mark",
    "controls": {
      "background_color": {
        "rgb": [
          255,
          255,
          255
        ]
      },
      "colors": [
        {
          "rgb": [
            0,
            119,
            182
          ]
        },
        {
          "rgb": [
            255,
            209,
            102
          ]
        }
      ]
    }
  }
}'
```

* [ Output ](#tab-panel-1958)
* [ Raw response ](#tab-panel-1959)

![With Brand Colors](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/with-brand-colors.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/with-brand-colors.jpg"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-1962)
* [ Output ](#tab-panel-1963)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/#page","headline":"Recraft V4.1 SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
