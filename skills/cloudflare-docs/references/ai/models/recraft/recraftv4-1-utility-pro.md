---
title: Recraft V4.1 Utility Pro
description: Recraft V4.1 Utility Pro is a general-purpose text-to-image model producing high-resolution 2048px+ output for a wide range of production and print use cases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4.1 Utility Pro 

Text-to-Image • Recraft 

`recraft/recraftv4-1-utility-pro` 

Recraft V4.1 Utility Pro is a general-purpose text-to-image model producing high-resolution 2048px+ output for a wide range of production and print use cases.

| Model Info        |                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                            |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility-pro) |

## Usage

* [ TypeScript ](#tab-panel-1634)
* [ cURL ](#tab-panel-1635)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro',

  {

    prompt:

      'A detailed illustrated map of an imaginary fantasy island with labeled landmarks, mountains, and forests',

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

  "model": "recraft/recraftv4-1-utility-pro",

  "input": {

    "prompt": "A detailed illustrated map of an imaginary fantasy island with labeled landmarks, mountains, and forests"

  }

}'


```

* [ Output ](#tab-panel-1632)
* [ Raw response ](#tab-panel-1633)

![Print-Ready Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/print-ready-illustration.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/print-ready-illustration.png"

  },

  "state": "Completed"

}


```

## Examples

**Large Format Art**  — Large canvas general-purpose image 

* [ TypeScript ](#tab-panel-1638)
* [ cURL ](#tab-panel-1639)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro',

  {

    prompt:

      'A wide panoramic landscape of rolling green hills with a river winding through the valley under a bright blue sky',

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

  "model": "recraft/recraftv4-1-utility-pro",

  "input": {

    "prompt": "A wide panoramic landscape of rolling green hills with a river winding through the valley under a bright blue sky",

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1636)
* [ Raw response ](#tab-panel-1637)

![Large Format Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/large-format-art.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/large-format-art.png"

  },

  "state": "Completed"

}


```

**Marketing Asset**  — High-resolution marketing visual with controlled colors 

* [ TypeScript ](#tab-panel-1646)
* [ cURL ](#tab-panel-1647)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro',

  {

    prompt: 'A clean, modern banner illustration of a smartphone displaying a productivity app',

    controls: {

      background_color: { rgb: [250, 250, 255] },

      colors: [{ rgb: [100, 200, 150] }, { rgb: [20, 20, 60] }],

    },

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

  "model": "recraft/recraftv4-1-utility-pro",

  "input": {

    "prompt": "A clean, modern banner illustration of a smartphone displaying a productivity app",

    "controls": {

      "background_color": {

        "rgb": [

          250,

          250,

          255

        ]

      },

      "colors": [

        {

          "rgb": [

            100,

            200,

            150

          ]

        },

        {

          "rgb": [

            20,

            20,

            60

          ]

        }

      ]

    },

    "size": "2048x2048"

  }

}'


```

* [ Output ](#tab-panel-1640)
* [ Raw response ](#tab-panel-1641)

![Marketing Asset](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/marketing-asset.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/marketing-asset.png"

  },

  "state": "Completed"

}


```

**Technical Diagram**  — High-resolution technical or infographic illustration 

* [ TypeScript ](#tab-panel-1644)
* [ cURL ](#tab-panel-1645)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility-pro',

  {

    prompt:

      'A clean technical diagram showing the layers of a cloud computing architecture with labeled tiers',

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

  "model": "recraft/recraftv4-1-utility-pro",

  "input": {

    "prompt": "A clean technical diagram showing the layers of a cloud computing architecture with labeled tiers"

  }

}'


```

* [ Output ](#tab-panel-1642)
* [ Raw response ](#tab-panel-1643)

![Technical Diagram](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/technical-diagram.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/technical-diagram.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1648)
* [ Output ](#tab-panel-1649)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
