---
title: Recraft V4 Pro SVG
description: Generate detailed, production-ready SVG vector graphics from text prompts with fine geometry, scalable to any size for print and design work.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 Pro SVG 

Text-to-Image • Recraft 

`recraft/recraftv4-pro-vector` 

Generate detailed, production-ready SVG vector graphics from text prompts with fine geometry, scalable to any size for print and design work.

| Model Info        |                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                         |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                              |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-pro-vector) |

## Usage

* [ TypeScript ](#tab-panel-1454)
* [ cURL ](#tab-panel-1455)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

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

  "model": "recraft/recraftv4-pro-vector",

  "input": {

    "prompt": "A modern minimalist logo for a cloud computing company, clean geometric shapes"

  }

}'


```

* [ Output ](#tab-panel-1452)
* [ Raw response ](#tab-panel-1453)

![Logo Design](https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/logo-design.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/logo-design.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Icon Set**  — Generate a vector icon 

* [ TypeScript ](#tab-panel-1458)
* [ cURL ](#tab-panel-1459)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

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

  "model": "recraft/recraftv4-pro-vector",

  "input": {

    "prompt": "A flat design icon of a rocket launching, suitable for a mobile app",

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1456)
* [ Raw response ](#tab-panel-1457)

![Icon Set](https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/icon-set.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/icon-set.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Print-Ready Vector**  — High-resolution vector for large-format print 

* [ TypeScript ](#tab-panel-1462)
* [ cURL ](#tab-panel-1463)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

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

  "model": "recraft/recraftv4-pro-vector",

  "input": {

    "prompt": "An intricate mandala pattern with floral and geometric elements, highly detailed and symmetrical",

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1460)
* [ Raw response ](#tab-panel-1461)

![Print-Ready Vector](https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/print-ready-vector.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/print-ready-vector.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Brand Illustration**  — Vector illustration with brand colors 

* [ TypeScript ](#tab-panel-1466)
* [ cURL ](#tab-panel-1467)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

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

  "model": "recraft/recraftv4-pro-vector",

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

* [ Output ](#tab-panel-1464)
* [ Raw response ](#tab-panel-1465)

![Brand Illustration](https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/brand-illustration.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-pro-vector/brand-illustration.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-1468)
* [ Output ](#tab-panel-1469)

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
