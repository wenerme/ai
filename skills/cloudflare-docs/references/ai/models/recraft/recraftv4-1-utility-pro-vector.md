---
title: Recraft V4.1 Utility Pro SVG
description: Generate detailed, high-resolution SVG vector graphics from text prompts with a general-purpose model, scalable to any size for print and large-scale design work.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4.1 Utility Pro SVG 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-1-utility-pro-vector` 

Generate detailed, high-resolution SVG vector graphics from text prompts with a general-purpose model, scalable to any size for print and large-scale design work.

| Model Info        |                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                                   |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility-pro-vector) |

## Usage

* [ TypeScript ](#tab-panel-1382)
* [ cURL ](#tab-panel-1383)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro-vector',

  { prompt: 'A clean, versatile logo for a software company with abstract geometric shapes' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "recraft/recraftv4-1-utility-pro-vector",

  "input": {

    "prompt": "A clean, versatile logo for a software company with abstract geometric shapes"

  }

}'


```

* [ Output ](#tab-panel-1380)
* [ Raw response ](#tab-panel-1381)

![Logo Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/logo-design.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/logo-design.jpg"

  },

  "state": "Completed"

}


```

## Examples

**Detailed Illustration**  — High-resolution vector illustration 

* [ TypeScript ](#tab-panel-1386)
* [ cURL ](#tab-panel-1387)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro-vector',

  {

    prompt:

      'A detailed flat vector illustration of a city map with labeled streets, parks, and landmarks',

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

  "model": "recraft/recraftv4-1-utility-pro-vector",

  "input": {

    "prompt": "A detailed flat vector illustration of a city map with labeled streets, parks, and landmarks",

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1384)
* [ Raw response ](#tab-panel-1385)

![Detailed Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/detailed-illustration.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/detailed-illustration.jpg"

  },

  "state": "Completed"

}


```

**Print-Ready Vector**  — High-resolution vector for large-format print 

* [ TypeScript ](#tab-panel-1390)
* [ cURL ](#tab-panel-1391)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro-vector',

  {

    prompt:

      'A decorative border pattern with repeating floral and leaf motifs, suitable for certificate or diploma design',

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

  "model": "recraft/recraftv4-1-utility-pro-vector",

  "input": {

    "prompt": "A decorative border pattern with repeating floral and leaf motifs, suitable for certificate or diploma design",

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1388)
* [ Raw response ](#tab-panel-1389)

![Print-Ready Vector](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/print-ready-vector.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/print-ready-vector.jpg"

  },

  "state": "Completed"

}


```

**Brand Illustration**  — Vector illustration with brand colors 

* [ TypeScript ](#tab-panel-1394)
* [ cURL ](#tab-panel-1395)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro-vector',

  {

    prompt: 'A flat vector illustration of interconnected nodes representing a network or data flow',

    controls: { colors: [{ rgb: [0, 122, 204] }, { rgb: [255, 165, 0] }, { rgb: [240, 240, 240] }] },

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

  "model": "recraft/recraftv4-1-utility-pro-vector",

  "input": {

    "prompt": "A flat vector illustration of interconnected nodes representing a network or data flow",

    "controls": {

      "colors": [

        {

          "rgb": [

            0,

            122,

            204

          ]

        },

        {

          "rgb": [

            255,

            165,

            0

          ]

        },

        {

          "rgb": [

            240,

            240,

            240

          ]

        }

      ]

    }

  }

}'


```

* [ Output ](#tab-panel-1392)
* [ Raw response ](#tab-panel-1393)

![Brand Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/brand-illustration.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro-vector/brand-illustration.jpg"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1396)
* [ Output ](#tab-panel-1397)

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

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
