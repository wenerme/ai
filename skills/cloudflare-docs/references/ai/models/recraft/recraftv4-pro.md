---
title: Recraft V4 Pro
description: Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.
image: https://developers.cloudflare.com/dev-products-preview.png
---

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

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A detailed vintage botanical illustration of a rose with leaves and thorns, scientific illustration style',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Print-Ready Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/print-ready-illustration.png) 

## Examples

**Large Format Art**  — Large canvas digital art 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A sweeping fantasy landscape with floating islands, waterfalls cascading into clouds, and ancient stone bridges connecting the islands',

    size: '2048x2048',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Large Format Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/large-format-art.png) 

**Brand Asset**  — Professional brand asset with controlled colors 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A modern, clean illustration of a shield with a checkmark inside, representing security and trust',

    size: '2048x2048',

    controls: {

      colors: [

        {

          rgb: [46, 117, 182],

        },

        {

          rgb: [255, 255, 255],

        },

      ],

      background_color: {

        rgb: [15, 23, 42],

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

Response200 ![Brand Asset](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/brand-asset.png) 

**Editorial Illustration**  — Magazine-quality editorial illustration 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A conceptual illustration of artificial intelligence as a tree with circuit-board branches and glowing data leaves',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Editorial Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-pro/editorial-illustration.png) 

## Parameters

* [ Input ](#tab-panel-340)
* [ Output ](#tab-panel-341)

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
