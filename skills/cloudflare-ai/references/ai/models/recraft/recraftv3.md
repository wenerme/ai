---
title: Recraft V3
description: Recraft V3 is the previous-generation text-to-image model from Recraft, well-suited to design-quality compositions, brand-aware imagery, and accurate text rendering.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V3

Text-to-Image • Recraft

`recraft/recraftv3`

Recraft V3 is the previous-generation text-to-image model from Recraft, well-suited to design-quality compositions, brand-aware imagery, and accurate text rendering.

| Model Info          |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                              |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                   |
| Zero data retention | Yes                                                                                                                 |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv3) |

## Usage

* [ TypeScript ](#tab-panel-1770)
* [ cURL ](#tab-panel-1771)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv3',
  { prompt: 'A minimalist logo of a mountain range with a sun rising behind it' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv3",
  "input": {
    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"
  }
}'
```

* [ Output ](#tab-panel-1768)
* [ Raw response ](#tab-panel-1769)

![Simple Generation](https://examples.aig.cloudflare.com/recraft/recraftv3/simple-generation.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv3/simple-generation.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Scene Composition**  — Generate a complex compositional scene

* [ TypeScript ](#tab-panel-1774)
* [ cURL ](#tab-panel-1775)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv3',
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
  "model": "recraft/recraftv3",
  "input": {
    "prompt": "A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney"
  }
}'
```

* [ Output ](#tab-panel-1772)
* [ Raw response ](#tab-panel-1773)

![Scene Composition](https://examples.aig.cloudflare.com/recraft/recraftv3/scene-composition.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv3/scene-composition.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Custom Size**  — Specify output dimensions

* [ TypeScript ](#tab-panel-1778)
* [ cURL ](#tab-panel-1779)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv3',
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
  "model": "recraft/recraftv3",
  "input": {
    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1776)
* [ Raw response ](#tab-panel-1777)

![Custom Size](https://examples.aig.cloudflare.com/recraft/recraftv3/custom-size.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv3/custom-size.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**With Color Controls**  — Guide generation with specific brand colors

* [ TypeScript ](#tab-panel-1786)
* [ cURL ](#tab-panel-1787)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv3',
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
  "model": "recraft/recraftv3",
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

* [ Output ](#tab-panel-1780)
* [ Raw response ](#tab-panel-1781)

![With Color Controls](https://examples.aig.cloudflare.com/recraft/recraftv3/with-color-controls.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv3/with-color-controls.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Background Color**  — Set a specific background color

* [ TypeScript ](#tab-panel-1784)
* [ cURL ](#tab-panel-1785)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv3',
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
  "model": "recraft/recraftv3",
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

* [ Output ](#tab-panel-1782)
* [ Raw response ](#tab-panel-1783)

![Background Color](https://examples.aig.cloudflare.com/recraft/recraftv3/background-color.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv3/background-color.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-1788)
* [ Output ](#tab-panel-1789)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv3/#page","headline":"Recraft V3 (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V3 is the previous-generation text-to-image model from Recraft, well-suited to design-quality compositions, brand-aware imagery, and accurate text rendering.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
