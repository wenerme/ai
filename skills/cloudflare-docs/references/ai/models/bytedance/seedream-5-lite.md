---
title: Seedream 5 Lite
description: Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedream 5 Lite 

Text-to-Image • ByteDance • Proxied 

`bytedance/seedream-5-lite` 

Seedream 5 Lite is a lighter, faster version of the Seedream 5 family with multi-reference and batch generation support.

| Model Info       |                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedream5%5F0%5Flite)                                                                |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-5-lite) |

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

Input / Output JSON 

* [ Input ](#tab-panel-126)
* [ Output ](#tab-panel-127)

```

{

    "prompt": "A cute robot watering plants in a sunny greenhouse"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/simple-generation-0.jpeg"

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

    aspect_ratio: '16:9',

    output_format: 'png',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-128)
* [ Output ](#tab-panel-129)

```

{

    "prompt": "A detailed technical blueprint of a futuristic spacecraft with annotations and measurements",

    "size": "3K",

    "aspect_ratio": "16:9",

    "output_format": "png"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/high-resolution-png-0.png"

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

    aspect_ratio: '3:4',

    output_format: 'jpeg',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-130)
* [ Output ](#tab-panel-131)

```

{

    "prompt": "A professional headshot portrait with soft studio lighting and a neutral gray background",

    "size": "2K",

    "aspect_ratio": "3:4",

    "output_format": "jpeg"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/portrait-photo-0.jpeg"

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

    aspect_ratio: '4:3',

    sequential_image_generation: 'auto',

    max_images: 4,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-132)
* [ Output ](#tab-panel-133)

```

{

    "prompt": "A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it",

    "aspect_ratio": "4:3",

    "sequential_image_generation": "auto",

    "max_images": 4

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/sequential-comic-0.jpeg"

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

    size: '2K',

    aspect_ratio: 'match_input_image',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-134)
* [ Output ](#tab-panel-135)

```

{

    "prompt": "Create a variation of this image in a watercolor painting style",

    "image_input": [

        "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg"

    ],

    "size": "2K",

    "aspect_ratio": "match_input_image"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/image-variation-0.jpeg"

    ]

}


```

## Parameters

* [ Input ](#tab-panel-136)
* [ Output ](#tab-panel-137)

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

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
