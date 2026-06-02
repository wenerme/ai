---
title: Recraft V4.1
description: Recraft V4.1 generates art-directed images tuned for high aesthetics, with strong composition, accurate text rendering, and refined design taste. Fast and cost-efficient at standard resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4.1 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-1` 

Recraft V4.1 generates art-directed images tuned for high aesthetics, with strong composition, accurate text rendering, and refined design taste. Fast and cost-efficient at standard resolution.

| Model Info        |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                     |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1) |

## Usage

* [ TypeScript ](#tab-panel-1284)
* [ cURL ](#tab-panel-1285)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1',

  { prompt: 'A minimalist logo of a mountain range with a sun rising behind it' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "recraft/recraftv4-1",

  "input": {

    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"

  }

}'


```

* [ Output ](#tab-panel-1282)
* [ Raw response ](#tab-panel-1283)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/simple-generation.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/simple-generation.png"

  },

  "state": "Completed"

}


```

## Examples

**Scene Composition**  — Generate a complex compositional scene 

* [ TypeScript ](#tab-panel-1288)
* [ cURL ](#tab-panel-1289)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1',

  {

    prompt: 'A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney',

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

  "model": "recraft/recraftv4-1",

  "input": {

    "prompt": "A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney"

  }

}'


```

* [ Output ](#tab-panel-1286)
* [ Raw response ](#tab-panel-1287)

![Scene Composition](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/scene-composition.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/scene-composition.png"

  },

  "state": "Completed"

}


```

**Custom Size**  — Specify output dimensions 

* [ TypeScript ](#tab-panel-1292)
* [ cURL ](#tab-panel-1293)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1',

  {

    prompt: 'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',

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

  "model": "recraft/recraftv4-1",

  "input": {

    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1290)
* [ Raw response ](#tab-panel-1291)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/custom-size.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/custom-size.png"

  },

  "state": "Completed"

}


```

**With Color Controls**  — Guide generation with specific brand colors 

* [ TypeScript ](#tab-panel-1300)
* [ cURL ](#tab-panel-1301)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1',

  {

    prompt: 'An abstract geometric pattern suitable for a tech company brand identity',

    controls: { colors: [{ rgb: [255, 107, 53] }, { rgb: [0, 43, 91] }] },

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

  "model": "recraft/recraftv4-1",

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

* [ Output ](#tab-panel-1294)
* [ Raw response ](#tab-panel-1295)

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/with-color-controls.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/with-color-controls.png"

  },

  "state": "Completed"

}


```

**Background Color**  — Set a specific background color 

* [ TypeScript ](#tab-panel-1298)
* [ cURL ](#tab-panel-1299)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1',

  {

    prompt: 'A clean icon of a lightning bolt',

    controls: { background_color: { rgb: [245, 245, 245] } },

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

  "model": "recraft/recraftv4-1",

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

* [ Output ](#tab-panel-1296)
* [ Raw response ](#tab-panel-1297)

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/background-color.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1/background-color.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1302)
* [ Output ](#tab-panel-1303)

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
