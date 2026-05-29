---
title: Recraft V3
description: Recraft V3 is the previous-generation text-to-image model from Recraft, well-suited to design-quality compositions, brand-aware imagery, and accurate text rendering.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V3 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv3` 

Recraft V3 is the previous-generation text-to-image model from Recraft, well-suited to design-quality compositions, brand-aware imagery, and accurate text rendering.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                              |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                   |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv3) |

## Usage

* [ TypeScript ](#tab-panel-1204)
* [ cURL ](#tab-panel-1205)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

  "input": {

    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"

  }

}'


```

* [ Output ](#tab-panel-1202)
* [ Raw response ](#tab-panel-1203)

![Simple Generation](https://examples.aig.cloudflare.com/recraft/recraftv3/simple-generation.png) 

```

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

* [ TypeScript ](#tab-panel-1208)
* [ cURL ](#tab-panel-1209)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

  "input": {

    "prompt": "A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney"

  }

}'


```

* [ Output ](#tab-panel-1206)
* [ Raw response ](#tab-panel-1207)

![Scene Composition](https://examples.aig.cloudflare.com/recraft/recraftv3/scene-composition.png) 

```

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

* [ TypeScript ](#tab-panel-1212)
* [ cURL ](#tab-panel-1213)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

  "input": {

    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1210)
* [ Raw response ](#tab-panel-1211)

![Custom Size](https://examples.aig.cloudflare.com/recraft/recraftv3/custom-size.png) 

```

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

* [ TypeScript ](#tab-panel-1220)
* [ cURL ](#tab-panel-1221)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

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

* [ Output ](#tab-panel-1214)
* [ Raw response ](#tab-panel-1215)

![With Color Controls](https://examples.aig.cloudflare.com/recraft/recraftv3/with-color-controls.png) 

```

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

* [ TypeScript ](#tab-panel-1218)
* [ cURL ](#tab-panel-1219)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

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

* [ Output ](#tab-panel-1216)
* [ Raw response ](#tab-panel-1217)

![Background Color](https://examples.aig.cloudflare.com/recraft/recraftv3/background-color.png) 

```

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

* [ Input ](#tab-panel-1222)
* [ Output ](#tab-panel-1223)

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
