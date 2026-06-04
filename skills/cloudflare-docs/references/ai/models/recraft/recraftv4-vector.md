---
title: Recraft V4 SVG
description: Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 SVG 

Text-to-Image • Recraft 

`recraft/recraftv4-vector` 

Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.

| Model Info        |                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                     |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-vector) |

## Usage

* [ TypeScript ](#tab-panel-1472)
* [ cURL ](#tab-panel-1473)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  { prompt: 'A simple flat icon of a coffee cup with steam rising' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "recraft/recraftv4-vector",

  "input": {

    "prompt": "A simple flat icon of a coffee cup with steam rising"

  }

}'


```

* [ Output ](#tab-panel-1470)
* [ Raw response ](#tab-panel-1471)

![Simple Icon](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/simple-icon.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/simple-icon.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**App Icon**  — Mobile app icon in vector format 

* [ TypeScript ](#tab-panel-1476)
* [ cURL ](#tab-panel-1477)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt: 'A colorful gradient app icon featuring a chat bubble with a sparkle effect',

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

  "model": "recraft/recraftv4-vector",

  "input": {

    "prompt": "A colorful gradient app icon featuring a chat bubble with a sparkle effect",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1474)
* [ Raw response ](#tab-panel-1475)

![App Icon](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/app-icon.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/app-icon.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Illustration**  — Vector illustration for web use 

* [ TypeScript ](#tab-panel-1480)
* [ cURL ](#tab-panel-1481)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt:

      'A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view',

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

  "model": "recraft/recraftv4-vector",

  "input": {

    "prompt": "A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1478)
* [ Raw response ](#tab-panel-1479)

![Illustration](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/illustration.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/illustration.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**With Brand Colors**  — Vector with specific color palette 

* [ TypeScript ](#tab-panel-1484)
* [ cURL ](#tab-panel-1485)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt: 'A badge or seal design with a star in the center, suitable for a certification mark',

    controls: {

      background_color: { rgb: [255, 255, 255] },

      colors: [{ rgb: [0, 119, 182] }, { rgb: [255, 209, 102] }],

    },

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

  "model": "recraft/recraftv4-vector",

  "input": {

    "prompt": "A badge or seal design with a star in the center, suitable for a certification mark",

    "controls": {

      "background_color": {

        "rgb": [

          255,

          255,

          255

        ]

      },

      "colors": [

        {

          "rgb": [

            0,

            119,

            182

          ]

        },

        {

          "rgb": [

            255,

            209,

            102

          ]

        }

      ]

    }

  }

}'


```

* [ Output ](#tab-panel-1482)
* [ Raw response ](#tab-panel-1483)

![With Brand Colors](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/with-brand-colors.svg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/with-brand-colors.svg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-1486)
* [ Output ](#tab-panel-1487)

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
