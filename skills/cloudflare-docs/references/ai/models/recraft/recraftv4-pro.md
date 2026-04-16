---
title: Recraft V4 Pro
description: Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 Pro 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-pro` 

Recraft V4 Pro generates high-resolution, art-directed images at 2048px+ with strong composition, text rendering, and design taste. Built for print and production work.

| Model Info        |                                        |
| ----------------- | -------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms) |
| More information  | [link ↗](https://www.recraft.ai/)      |

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

Response200 ![Print-Ready Illustration](https://replicate.delivery/xezq/JrYNZOq5mNJfZKJyJBCUdD2YED51vRw9CVtA0EysOHQ3Q5MLA/tmp_z0l47_v.webp) 

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

    style: 'digital_illustration',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Large Format Art](https://replicate.delivery/xezq/z9CHBBfUrDRDSazHffYY2Jx8p9ZeRh57xmbsRHY1eQFISUOzC/tmpq27syd4a.webp) 

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

Response200 ![Brand Asset](https://replicate.delivery/xezq/RleNHzPW0AXCOKAqjNR7sIxCzF56BZzFAQwgfeWvLaghhhzsA/tmpwzh90xti.webp) 

**Editorial Illustration**  — Magazine-quality editorial illustration 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro',

  {

    prompt:

      'A conceptual illustration of artificial intelligence as a tree with circuit-board branches and glowing data leaves',

    style: 'digital_illustration',

    substyle: 'hand_drawn',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Editorial Illustration](https://replicate.delivery/xezq/eBRR8WuwPBXiXSKkw6bMKNfTrXK1cu0oEeZ2D9Un9qxnFlzsA/tmpo2sylxd4.webp) 

## Parameters

* [ Input ](#tab-panel-226)
* [ Output ](#tab-panel-227)

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

`string`requiredformat: uricontentMediaType: image/svg+xml

## API Schemas

* [ Input ](#tab-panel-224)
* [ Output ](#tab-panel-225)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "size": {

      "type": "string"

    },

    "style": {

      "type": "string"

    },

    "substyle": {

      "type": "string"

    },

    "controls": {

      "type": "object",

      "properties": {

        "colors": {

          "maxItems": 5,

          "type": "array",

          "items": {

            "type": "object",

            "properties": {

              "rgb": {

                "minItems": 3,

                "maxItems": 3,

                "type": "array",

                "items": {

                  "type": "integer",

                  "minimum": 0,

                  "maximum": 255

                }

              }

            },

            "required": [

              "rgb"

            ],

            "additionalProperties": false

          }

        },

        "background_color": {

          "type": "object",

          "properties": {

            "rgb": {

              "minItems": 3,

              "maxItems": 3,

              "type": "array",

              "items": {

                "type": "integer",

                "minimum": 0,

                "maximum": 255

              }

            }

          },

          "required": [

            "rgb"

          ],

          "additionalProperties": false

        }

      },

      "additionalProperties": false

    }

  },

  "required": [

    "prompt"

  ],

  "additionalProperties": false

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "image": {

      "type": "string",

      "format": "uri",

      "contentMediaType": "image/svg+xml"

    }

  },

  "required": [

    "image"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
