---
title: Recraft V4
description: Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4` 

Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                              |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                   |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4) |

## Usage

* [ TypeScript ](#tab-panel-1226)
* [ cURL ](#tab-panel-1227)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

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

  "model": "recraft/recraftv4",

  "input": {

    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"

  }

}'


```

* [ Output ](#tab-panel-1224)
* [ Raw response ](#tab-panel-1225)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png) 

```

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

* [ TypeScript ](#tab-panel-1230)
* [ cURL ](#tab-panel-1231)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

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

  "model": "recraft/recraftv4",

  "input": {

    "prompt": "A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney"

  }

}'


```

* [ Output ](#tab-panel-1228)
* [ Raw response ](#tab-panel-1229)

![Scene Composition](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png) 

```

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

* [ TypeScript ](#tab-panel-1234)
* [ cURL ](#tab-panel-1235)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

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

  "model": "recraft/recraftv4",

  "input": {

    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1232)
* [ Raw response ](#tab-panel-1233)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png) 

```

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

* [ TypeScript ](#tab-panel-1242)
* [ cURL ](#tab-panel-1243)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    controls: { colors: [{ rgb: [255, 107, 53] }, { rgb: [0, 43, 91] }] },

    prompt: 'An abstract geometric pattern suitable for a tech company brand identity',

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

  "model": "recraft/recraftv4",

  "input": {

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

    },

    "prompt": "An abstract geometric pattern suitable for a tech company brand identity"

  }

}'


```

* [ Output ](#tab-panel-1236)
* [ Raw response ](#tab-panel-1237)

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png) 

```

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

* [ TypeScript ](#tab-panel-1240)
* [ cURL ](#tab-panel-1241)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    controls: { background_color: { rgb: [245, 245, 245] } },

    prompt: 'A clean icon of a lightning bolt',

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

  "model": "recraft/recraftv4",

  "input": {

    "controls": {

      "background_color": {

        "rgb": [

          245,

          245,

          245

        ]

      }

    },

    "prompt": "A clean icon of a lightning bolt",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1238)
* [ Raw response ](#tab-panel-1239)

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png) 

```

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

* [ Input ](#tab-panel-1244)
* [ Output ](#tab-panel-1245)

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
