---
title: Recraft V4
description: Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4

Text-to-Image • Recraft

`recraft/recraftv4`

Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.

| Model Info          |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                              |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                   |
| Zero data retention | Yes                                                                                                                 |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4) |

## Usage

* [ TypeScript ](#tab-panel-1792)
* [ cURL ](#tab-panel-1793)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  { prompt: 'A minimalist logo of a mountain range with a sun rising behind it' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"
  }
}'
```

* [ Output ](#tab-panel-1790)
* [ Raw response ](#tab-panel-1791)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png"
  },
  "state": "Completed"
}
```

## Examples

**Scene Composition**  — Generate a complex compositional scene

* [ TypeScript ](#tab-panel-1796)
* [ cURL ](#tab-panel-1797)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney"
  }
}'
```

* [ Output ](#tab-panel-1794)
* [ Raw response ](#tab-panel-1795)

![Scene Composition](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png"
  },
  "state": "Completed"
}
```

**Custom Size**  — Specify output dimensions

* [ TypeScript ](#tab-panel-1800)
* [ cURL ](#tab-panel-1801)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',
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
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1798)
* [ Raw response ](#tab-panel-1799)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png"
  },
  "state": "Completed"
}
```

**With Color Controls**  — Guide generation with specific brand colors

* [ TypeScript ](#tab-panel-1808)
* [ cURL ](#tab-panel-1809)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'An abstract geometric pattern suitable for a tech company brand identity',
    controls: { colors: [{ rgb: [255, 107, 53] }, { rgb: [0, 43, 91] }] },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "An abstract geometric pattern suitable for a tech company brand identity",
    "controls": {
      "colors": [
        {
          "rgb": [
            255,
            107,
            53
          ]
        },
        {
          "rgb": [
            0,
            43,
            91
          ]
        }
      ]
    }
  }
}'
```

* [ Output ](#tab-panel-1802)
* [ Raw response ](#tab-panel-1803)

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png"
  },
  "state": "Completed"
}
```

**Background Color**  — Set a specific background color

* [ TypeScript ](#tab-panel-1806)
* [ cURL ](#tab-panel-1807)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'A clean icon of a lightning bolt',
    controls: { background_color: { rgb: [245, 245, 245] } },
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
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A clean icon of a lightning bolt",
    "controls": {
      "background_color": {
        "rgb": [
          245,
          245,
          245
        ]
      }
    },
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1804)
* [ Raw response ](#tab-panel-1805)

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-1810)
* [ Output ](#tab-panel-1811)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4/#page","headline":"Recraft V4 (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
