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

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-pro` 

Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.

| Model Info        |                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                  |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                       |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-pro) |

## Usage

* [ TypeScript ](#tab-panel-1248)
* [ cURL ](#tab-panel-1249)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A detailed vintage botanical illustration of a rose with leaves and thorns, scientific illustration style',

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

  "model": "recraft/recraftv4-pro",

  "input": {

    "prompt": "A detailed vintage botanical illustration of a rose with leaves and thorns, scientific illustration style"

  }

}'


```

* [ Output ](#tab-panel-1246)
* [ Raw response ](#tab-panel-1247)

![Print-Ready Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/print-ready-illustration.png) 

```

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

* [ TypeScript ](#tab-panel-1252)
* [ cURL ](#tab-panel-1253)

TypeScript

```

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

Terminal window

```

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

* [ Output ](#tab-panel-1250)
* [ Raw response ](#tab-panel-1251)

![Large Format Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/large-format-art.png) 

```

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

* [ TypeScript ](#tab-panel-1260)
* [ cURL ](#tab-panel-1261)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    controls: {

      background_color: { rgb: [15, 23, 42] },

      colors: [{ rgb: [46, 117, 182] }, { rgb: [255, 255, 255] }],

    },

    prompt:

      'A modern, clean illustration of a shield with a checkmark inside, representing security and trust',

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

  "model": "recraft/recraftv4-pro",

  "input": {

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

    "prompt": "A modern, clean illustration of a shield with a checkmark inside, representing security and trust",

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1254)
* [ Raw response ](#tab-panel-1255)

![Brand Asset](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/brand-asset.png) 

```

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

* [ TypeScript ](#tab-panel-1258)
* [ cURL ](#tab-panel-1259)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A conceptual illustration of artificial intelligence as a tree with circuit-board branches and glowing data leaves',

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

  "model": "recraft/recraftv4-pro",

  "input": {

    "prompt": "A conceptual illustration of artificial intelligence as a tree with circuit-board branches and glowing data leaves"

  }

}'


```

* [ Output ](#tab-panel-1256)
* [ Raw response ](#tab-panel-1257)

![Editorial Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/editorial-illustration.png) 

```

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

* [ Input ](#tab-panel-1262)
* [ Output ](#tab-panel-1263)

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
