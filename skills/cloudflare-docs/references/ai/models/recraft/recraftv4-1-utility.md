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

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-1-utility` 

Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.

| Model Info        |                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                        |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                             |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility) |

## Usage

* [ TypeScript ](#tab-panel-1342)
* [ cURL ](#tab-panel-1343)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility',

  { prompt: 'A friendly cartoon robot waving hello against a white background' },

)

console.log(response)


```

Terminal window

```

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

* [ Output ](#tab-panel-1340)
* [ Raw response ](#tab-panel-1341)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/simple-generation.png) 

```

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

* [ TypeScript ](#tab-panel-1346)
* [ cURL ](#tab-panel-1347)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility',

  { prompt: 'A clean product photo of a white ceramic coffee mug on a wooden table' },

)

console.log(response)


```

Terminal window

```

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

* [ Output ](#tab-panel-1344)
* [ Raw response ](#tab-panel-1345)

![Product Mockup](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/product-mockup.png) 

```

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

* [ TypeScript ](#tab-panel-1350)
* [ cURL ](#tab-panel-1351)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility',

  {

    prompt: 'A simple banner illustration with abstract shapes and warm colors',

    size: '1024x1024',

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

  "model": "recraft/recraftv4-1-utility",

  "input": {

    "prompt": "A simple banner illustration with abstract shapes and warm colors",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1348)
* [ Raw response ](#tab-panel-1349)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/custom-size.png) 

```

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

* [ TypeScript ](#tab-panel-1358)
* [ cURL ](#tab-panel-1359)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-utility',

  {

    prompt: 'A flat illustration of a globe with network connections',

    controls: { colors: [{ rgb: [30, 90, 200] }, { rgb: [255, 255, 255] }] },

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

* [ Output ](#tab-panel-1352)
* [ Raw response ](#tab-panel-1353)

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/with-color-controls.png) 

```

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

* [ TypeScript ](#tab-panel-1356)
* [ cURL ](#tab-panel-1357)

TypeScript

```

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

Terminal window

```

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

* [ Output ](#tab-panel-1354)
* [ Raw response ](#tab-panel-1355)

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/background-color.png) 

```

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

* [ Input ](#tab-panel-1360)
* [ Output ](#tab-panel-1361)

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
