---
title: Recraft V4.1 Utility
description: Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4.1 Utility

Text-to-Image • Recraft

`recraft/recraftv4-1-utility`

Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.

| Model Info          |                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                        |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                             |
| Zero data retention | Yes                                                                                                                           |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility) |

## Usage

* [ TypeScript ](#tab-panel-1872)
* [ cURL ](#tab-panel-1873)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  { prompt: 'A friendly cartoon robot waving hello against a white background' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A friendly cartoon robot waving hello against a white background"
  }
}'
```

* [ Output ](#tab-panel-1870)
* [ Raw response ](#tab-panel-1871)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/simple-generation.png"
  },
  "state": "Completed"
}
```

## Examples

**Product Mockup**  — Generate a product concept image

* [ TypeScript ](#tab-panel-1876)
* [ cURL ](#tab-panel-1877)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  { prompt: 'A clean product photo of a white ceramic coffee mug on a wooden table' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A clean product photo of a white ceramic coffee mug on a wooden table"
  }
}'
```

* [ Output ](#tab-panel-1874)
* [ Raw response ](#tab-panel-1875)

![Product Mockup](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/product-mockup.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/product-mockup.png"
  },
  "state": "Completed"
}
```

**Custom Size**  — Specify output dimensions

* [ TypeScript ](#tab-panel-1880)
* [ cURL ](#tab-panel-1881)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  {
    prompt: 'A simple banner illustration with abstract shapes and warm colors',
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
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A simple banner illustration with abstract shapes and warm colors",
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1878)
* [ Raw response ](#tab-panel-1879)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/custom-size.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/custom-size.png"
  },
  "state": "Completed"
}
```

**With Color Controls**  — Guide generation with specific colors

* [ TypeScript ](#tab-panel-1888)
* [ cURL ](#tab-panel-1889)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  {
    prompt: 'A flat illustration of a globe with network connections',
    controls: { colors: [{ rgb: [30, 90, 200] }, { rgb: [255, 255, 255] }] },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A flat illustration of a globe with network connections",
    "controls": {
      "colors": [
        {
          "rgb": [
            30,
            90,
            200
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

* [ Output ](#tab-panel-1882)
* [ Raw response ](#tab-panel-1883)

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/with-color-controls.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/with-color-controls.png"
  },
  "state": "Completed"
}
```

**Background Color**  — Set a specific background color

* [ TypeScript ](#tab-panel-1886)
* [ cURL ](#tab-panel-1887)

**TypeScript**

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  {
    prompt: 'A simple icon of a checkmark inside a circle',
    controls: { background_color: { rgb: [240, 248, 255] } },
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
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A simple icon of a checkmark inside a circle",
    "controls": {
      "background_color": {
        "rgb": [
          240,
          248,
          255
        ]
      }
    },
    "size": "1024x1024"
  }
}'
```

* [ Output ](#tab-panel-1884)
* [ Raw response ](#tab-panel-1885)

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/background-color.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/background-color.png"
  },
  "state": "Completed"
}
```

## Parameters

* [ Input ](#tab-panel-1890)
* [ Output ](#tab-panel-1891)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/#page","headline":"Recraft V4.1 Utility (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
