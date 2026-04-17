---
title: Recraft V4 Pro Vector
description: Generate detailed, production-ready SVG vector graphics from text prompts with fine geometry, scalable to any size for print and design work.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 Pro Vector 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-pro-vector` 

Generate detailed, production-ready SVG vector graphics from text prompts with fine geometry, scalable to any size for print and design work.

| Model Info        |                                        |
| ----------------- | -------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms) |
| More information  | [link ↗](https://www.recraft.ai/)      |

## Usage

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

  {

    prompt:

      'A modern minimalist logo for a cloud computing company, clean geometric shapes',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Logo Design](https://replicate.delivery/xezq/ADdqVTvbVaJVNpexJBKcfHfaisT6IqHCKMVtdCIfexaCXGOzC/tmpyl5i46hr.svg) 

## Examples

**Icon Set**  — Generate a vector icon 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

  {

    prompt:

      'A flat design icon of a rocket launching, suitable for a mobile app',

    size: '2048x2048',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Icon Set](https://replicate.delivery/xezq/kAEXVRyFCewUK6mBCZWun3GnQ1nUOgeRmV3VjDeWloAlmhzsA/tmpweqnhf9b.svg) 

**Print-Ready Vector**  — High-resolution vector for large-format print 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

  {

    prompt:

      'An intricate mandala pattern with floral and geometric elements, highly detailed and symmetrical',

    size: '2048x2048',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Print-Ready Vector](https://replicate.delivery/xezq/oF6t1Dm9hi6IH9ECfGRUt0FR2mCsSbfMcdfCedXfJVaieMcmF/tmpuiezfalr.svg) 

**Brand Illustration**  — Vector illustration with brand colors 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4-pro-vector',

  {

    prompt:

      'A vector illustration of a cityscape skyline at sunset with clean lines and flat colors',

    controls: {

      colors: [

        {

          rgb: [255, 87, 51],

        },

        {

          rgb: [41, 50, 65],

        },

        {

          rgb: [239, 239, 239],

        },

      ],

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Brand Illustration](https://replicate.delivery/xezq/CIT2K8gZDCJVLd2VhDla0GOkhWwg92eo4eikkCq285IP0wZWA/tmpds4b_4rl.svg) 

## Parameters

* [ Input ](#tab-panel-234)
* [ Output ](#tab-panel-235)

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

`string`format: uricontentMediaType: image/svg+xml

## API Schemas

* [ Input ](#tab-panel-232)
* [ Output ](#tab-panel-233)

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
