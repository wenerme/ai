---
title: Recraft V4.1 SVG
description: Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4.1 SVG 

Text-to-Image • Recraft 

`recraft/recraftv4-1-vector` 

Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.

| Model Info          |                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                       |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                            |
| Zero data retention | Yes                                                                                                                          |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-vector) |

## Usage

* [ TypeScript ](#tab-panel-1698)
* [ cURL ](#tab-panel-1699)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-vector',

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

  "model": "recraft/recraftv4-1-vector",

  "input": {

    "prompt": "A simple flat icon of a coffee cup with steam rising"

  }

}'


```

* [ Output ](#tab-panel-1696)
* [ Raw response ](#tab-panel-1697)

![Simple Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/simple-icon.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/simple-icon.jpg"

  },

  "state": "Completed"

}


```

## Examples

**App Icon**  — Mobile app icon in vector format 

* [ TypeScript ](#tab-panel-1702)
* [ cURL ](#tab-panel-1703)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-vector',

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

  "model": "recraft/recraftv4-1-vector",

  "input": {

    "prompt": "A colorful gradient app icon featuring a chat bubble with a sparkle effect",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1700)
* [ Raw response ](#tab-panel-1701)

![App Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/app-icon.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/app-icon.jpg"

  },

  "state": "Completed"

}


```

**Illustration**  — Vector illustration for web use 

* [ TypeScript ](#tab-panel-1706)
* [ cURL ](#tab-panel-1707)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-vector',

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

  "model": "recraft/recraftv4-1-vector",

  "input": {

    "prompt": "A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-1704)
* [ Raw response ](#tab-panel-1705)

![Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/illustration.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/illustration.jpg"

  },

  "state": "Completed"

}


```

**With Brand Colors**  — Vector with specific color palette 

* [ TypeScript ](#tab-panel-1710)
* [ cURL ](#tab-panel-1711)

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-1-vector',

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

  "model": "recraft/recraftv4-1-vector",

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

* [ Output ](#tab-panel-1708)
* [ Raw response ](#tab-panel-1709)

![With Brand Colors](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/with-brand-colors.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/with-brand-colors.jpg"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1712)
* [ Output ](#tab-panel-1713)

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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
