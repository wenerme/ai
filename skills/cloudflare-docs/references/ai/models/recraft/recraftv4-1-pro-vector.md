---
title: Recraft V4.1 Pro SVG
description: Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.
image: https://developers.cloudflare.com/dev-products-preview.png
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

* [ TypeScript ](#tab-panel-1604)
* [ cURL ](#tab-panel-1605)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-pro-vector',

  { prompt: 'A modern minimalist logo for a cloud computing company, clean geometric shapes' },

)

console.log(response)


```

Terminal window

```

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

* [ Output ](#tab-panel-1602)
* [ Raw response ](#tab-panel-1603)

![Logo Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/logo-design.jpg) 

```

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

* [ TypeScript ](#tab-panel-1608)
* [ cURL ](#tab-panel-1609)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-pro-vector',

  {

    prompt: 'A flat design icon of a rocket launching, suitable for a mobile app',

    size: '2048x2048',

  },

)

console.log(response)


```

Terminal window

```

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

* [ Output ](#tab-panel-1606)
* [ Raw response ](#tab-panel-1607)

![Icon Set](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/icon-set.jpg) 

```

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

* [ TypeScript ](#tab-panel-1612)
* [ cURL ](#tab-panel-1613)

TypeScript

```

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

Terminal window

```

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

* [ Output ](#tab-panel-1610)
* [ Raw response ](#tab-panel-1611)

![Print-Ready Vector](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/print-ready-vector.jpg) 

```

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

* [ TypeScript ](#tab-panel-1616)
* [ cURL ](#tab-panel-1617)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-pro-vector',

  {

    prompt: 'A vector illustration of a cityscape skyline at sunset with clean lines and flat colors',

    controls: { colors: [{ rgb: [255, 87, 51] }, { rgb: [41, 50, 65] }, { rgb: [239, 239, 239] }] },

  },

)

console.log(response)


```

Terminal window

```

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

* [ Output ](#tab-panel-1614)
* [ Raw response ](#tab-panel-1615)

![Brand Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/brand-illustration.jpg) 

```

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

* [ Input ](#tab-panel-1618)
* [ Output ](#tab-panel-1619)

▶controls{}

`object`

prompt

`string`required

size

`string`

style

`string`

substyle

`string`

image

`string`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/#page","headline":"Recraft V4.1 Pro SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
