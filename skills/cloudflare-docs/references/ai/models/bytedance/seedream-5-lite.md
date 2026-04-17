---
title: Seedream 5 Lite
description: Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedream 5 Lite 

Text-to-Image • ByteDance • Proxied 

`bytedance/seedream-5-lite` 

Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.

| Model Info       |                                                              |
| ---------------- | ------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedream5%5F0%5Flite) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    prompt: 'A cute robot watering plants in a sunny greenhouse',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-70)
* [ Output ](#tab-panel-71)

```

{

    "prompt": "A cute robot watering plants in a sunny greenhouse"

}


```

```

{

    "images": [

        "https://replicate.delivery/xezq/P3tn7Cb6LqrVOJujUhMyW7vTVw2SjmzMtqgkCdicjR5sTNmF/tmp40gc10ey.png"

    ]

}


```

## Examples

**High Resolution PNG**  — 3K quality with PNG output 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    prompt:

      'A detailed technical blueprint of a futuristic spacecraft with annotations and measurements',

    size: '3K',

    output_format: 'png',

    aspect_ratio: '16:9',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-72)
* [ Output ](#tab-panel-73)

```

{

    "prompt": "A detailed technical blueprint of a futuristic spacecraft with annotations and measurements",

    "size": "3K",

    "output_format": "png",

    "aspect_ratio": "16:9"

}


```

```

{

    "images": [

        "https://replicate.delivery/xezq/v8WigeO3ss1bHCMcpejgxcSknPaKJre3f2sW9PJzyfrDeTNmF/tmpw9lduzh0.png"

    ]

}


```

**Portrait Photo**  — JPEG output for photographs 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    prompt:

      'A professional headshot portrait with soft studio lighting and a neutral gray background',

    size: '2K',

    output_format: 'jpeg',

    aspect_ratio: '3:4',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-74)
* [ Output ](#tab-panel-75)

```

{

    "prompt": "A professional headshot portrait with soft studio lighting and a neutral gray background",

    "size": "2K",

    "output_format": "jpeg",

    "aspect_ratio": "3:4"

}


```

```

{

    "images": [

        "https://replicate.delivery/xezq/0hfH1l5S6fhF3EzDwZUFTfDPTaeAeJLFJNNpfwCWemTJDoaMLA/tmpb32_cbxa.jpg"

    ]

}


```

**Sequential Comic**  — Generate sequential comic panels 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    prompt:

      'A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it',

    sequential_image_generation: 'auto',

    max_images: 4,

    aspect_ratio: '4:3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-76)
* [ Output ](#tab-panel-77)

```

{

    "prompt": "A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it",

    "sequential_image_generation": "auto",

    "max_images": 4,

    "aspect_ratio": "4:3"

}


```

```

{

    "images": [

        "https://replicate.delivery/xezq/YH2RGRLXJ569JxZn52sdZdOqVY2ilGTqWOp3eJ7ekznvQ1YWA/tmp0_talk8q.png"

    ]

}


```

**Image Variation**  — Create variation from reference 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    prompt: 'Create a variation of this image in a watercolor painting style',

    image_input: [

      'https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg',

    ],

    aspect_ratio: 'match_input_image',

    size: '2K',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-78)
* [ Output ](#tab-panel-79)

```

{

    "prompt": "Create a variation of this image in a watercolor painting style",

    "image_input": [

        "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg"

    ],

    "aspect_ratio": "match_input_image",

    "size": "2K"

}


```

```

{

    "images": [

        "https://replicate.delivery/xezq/WrzzelpFP52EVqaXrD8vFjYHv5yi5beRTbdefyhBKFCSlWjZB/tmpw2z1atr3.png"

    ]

}


```

## Parameters

* [ Input ](#tab-panel-82)
* [ Output ](#tab-panel-83)

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 14format: uri

size

`string`enum: 2K, 3K

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

sequential\_image\_generation

`string`enum: disabled, auto

max\_images

`integer`minimum: 1maximum: 15

output\_format

`string`enum: png, jpeg

▶images\[\]

`array`minItems: 1format: uri

## API Schemas

* [ Input ](#tab-panel-80)
* [ Output ](#tab-panel-81)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "image_input": {

      "maxItems": 14,

      "type": "array",

      "items": {

        "type": "string",

        "format": "uri"

      }

    },

    "size": {

      "type": "string",

      "enum": [

        "2K",

        "3K"

      ]

    },

    "aspect_ratio": {

      "type": "string",

      "enum": [

        "match_input_image",

        "1:1",

        "4:3",

        "3:4",

        "16:9",

        "9:16",

        "3:2",

        "2:3",

        "21:9"

      ]

    },

    "sequential_image_generation": {

      "type": "string",

      "enum": [

        "disabled",

        "auto"

      ]

    },

    "max_images": {

      "type": "integer",

      "minimum": 1,

      "maximum": 15

    },

    "output_format": {

      "type": "string",

      "enum": [

        "png",

        "jpeg"

      ]

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

    "images": {

      "minItems": 1,

      "type": "array",

      "items": {

        "type": "string",

        "format": "uri"

      }

    }

  },

  "required": [

    "images"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
