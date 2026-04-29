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

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-vector` 

Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.

| Model Info        |                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                                     |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-vector) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt: 'A simple flat icon of a coffee cup with steam rising',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Simple Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-vector/simple-icon.jpg) 

## Examples

**App Icon**  — Mobile app icon in vector format 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt:

      'A colorful gradient app icon featuring a chat bubble with a sparkle effect',

    size: '1024x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![App Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-vector/app-icon.jpg) 

**Illustration**  — Vector illustration for web use 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt:

      'A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view',

    size: '1024x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-vector/illustration.jpg) 

**With Brand Colors**  — Vector with specific color palette 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-vector',

  {

    prompt:

      'A badge or seal design with a star in the center, suitable for a certification mark',

    controls: {

      colors: [

        {

          rgb: [0, 119, 182],

        },

        {

          rgb: [255, 209, 102],

        },

      ],

      background_color: {

        rgb: [255, 255, 255],

      },

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![With Brand Colors](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-vector/with-brand-colors.jpg) 

## Parameters

* [ Input ](#tab-panel-344)
* [ Output ](#tab-panel-345)

prompt

`string`required

size

`string`

style

`string`

substyle

`string`

▶controls{}

`object`

image

`string`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
