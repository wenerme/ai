---
title: Recraft V4
description: Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

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

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt: 'A minimalist logo of a mountain range with a sun rising behind it',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png) 

## Examples

**Scene Composition**  — Generate a complex compositional scene 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Scene Composition](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png) 

**Custom Size**  — Specify output dimensions 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',

    size: '1024x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png) 

**With Color Controls**  — Guide generation with specific brand colors 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'An abstract geometric pattern suitable for a tech company brand identity',

    controls: {

      colors: [

        {

          rgb: [255, 107, 53],

        },

        {

          rgb: [0, 43, 91],

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

Response200 ![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png) 

**Background Color**  — Set a specific background color 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt: 'A clean icon of a lightning bolt',

    size: '1024x1024',

    controls: {

      background_color: {

        rgb: [245, 245, 245],

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

Response200 ![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png) 

## Parameters

* [ Input ](#tab-panel-412)
* [ Output ](#tab-panel-413)

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

## API Schemas

* [ Input ](#tab-panel-410)
* [ Output ](#tab-panel-411)

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

      "type": "string"

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
