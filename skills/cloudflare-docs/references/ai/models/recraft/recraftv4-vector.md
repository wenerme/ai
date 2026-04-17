---
title: Recraft V4 Vector
description: Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 Vector 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4-vector` 

Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.

| Model Info        |                                        |
| ----------------- | -------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms) |
| More information  | [link ↗](https://www.recraft.ai/)      |

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

Response200 ![Simple Icon](https://replicate.delivery/xezq/pes8cFTAAT2bDaVZ1gSRHHvwjbqcwBWlcqDWTsfklrwehhzsA/tmp4ofj5lhy.svg) 

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

Response200 ![App Icon](https://replicate.delivery/xezq/oc9wcTceufn1fpWILJeVltIPx4RWwaNmqfhP1KKdKWxgJGOzC/tmpz1_sfxxs.svg) 

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

Response200 ![Illustration](https://replicate.delivery/xezq/bOTBQsRwbqIRINwtP19YZ688A0Z8ucKYVlsvfflntqTdxwZWA/tmpktw4d6n1.svg) 

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

Response200 ![With Brand Colors](https://replicate.delivery/xezq/rVnICquh4J4rFVKHCBdc2B9HYqCZgEQfTuSU7FpBcDi2Y4MLA/tmpdzrwcs_b.svg) 

## Parameters

* [ Input ](#tab-panel-238)
* [ Output ](#tab-panel-239)

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

* [ Input ](#tab-panel-236)
* [ Output ](#tab-panel-237)

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
