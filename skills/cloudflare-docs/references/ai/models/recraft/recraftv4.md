---
title: Recraft V4
description: Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4` 

Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.

| Model Info        |                                        |
| ----------------- | -------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms) |
| More information  | [link ↗](https://www.recraft.ai/)      |

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

Response200 ![Simple Generation](https://replicate.delivery/xezq/rffiesPWfSUe6l6jneyhKfO1i52NlHqaER5y68lkB0ybNa4MLA/tmp9j2fyavc.webp) 

## Examples

**With Style**  — Generate with a specific artistic style 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney',

    style: 'realistic_image',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![With Style](https://replicate.delivery/xezq/yF3RaaZAeY3qOiwx32wcOV89Nc5WgKrZ39QFPkOM52JFT5MLA/tmpssefh11s.webp) 

**Custom Size**  — Specify output dimensions 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',

    size: '1024x1024',

    style: 'digital_illustration',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Custom Size](https://replicate.delivery/xezq/Dyq7HL6CCm49NZPNlguOHy2Qr3Qbo1WtqFmeQAMdqWHTa4MLA/tmp8u1mkfnl.webp) 

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

Response200 ![With Color Controls](https://replicate.delivery/xezq/0VdYE6Re010Te0fsnRyGHCxnLjqgNJ7Aye6n1XeoGAftMNcmF/tmp4n5wzf9s.webp) 

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

Response200 ![Background Color](https://replicate.delivery/xezq/7F4vZhspELqLERfFjVqOMRJgfSBN1PRkcae1q0beKn45TDnZB/tmp37tx7zib.webp) 

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

`string`format: uricontentMediaType: image/svg+xml

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
