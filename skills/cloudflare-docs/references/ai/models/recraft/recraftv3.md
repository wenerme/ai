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

Text-to-Image • Recraft 

`recraft/recraftv3` 

Recraft V3 is the previous-generation text-to-image model from Recraft, well-suited to design-quality compositions, brand-aware imagery, and accurate text rendering.

| Model Info          |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                              |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                   |
| Zero data retention | Yes                                                                                                                 |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv3) |

## Usage

* [ TypeScript ](#tab-panel-1520)
* [ cURL ](#tab-panel-1521)

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

* [ Output ](#tab-panel-1518)
* [ Raw response ](#tab-panel-1519)

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

* [ TypeScript ](#tab-panel-1524)
* [ cURL ](#tab-panel-1525)

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

* [ Output ](#tab-panel-1522)
* [ Raw response ](#tab-panel-1523)

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

* [ TypeScript ](#tab-panel-1528)
* [ cURL ](#tab-panel-1529)

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

* [ Output ](#tab-panel-1526)
* [ Raw response ](#tab-panel-1527)

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

* [ TypeScript ](#tab-panel-1536)
* [ cURL ](#tab-panel-1537)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

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

* [ Output ](#tab-panel-1530)
* [ Raw response ](#tab-panel-1531)

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

* [ TypeScript ](#tab-panel-1534)
* [ cURL ](#tab-panel-1535)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv3',

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

  "model": "recraft/recraftv3",

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

* [ Output ](#tab-panel-1532)
* [ Raw response ](#tab-panel-1533)

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

* [ Input ](#tab-panel-1538)
* [ Output ](#tab-panel-1539)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv3/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
