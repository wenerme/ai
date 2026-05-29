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

* [ TypeScript ](#tab-panel-378)
* [ cURL ](#tab-panel-379)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  { prompt: 'A cute robot watering plants in a sunny greenhouse' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "bytedance/seedream-5-lite",

  "input": {

    "prompt": "A cute robot watering plants in a sunny greenhouse"

  }

}'


```

* [ Output ](#tab-panel-380)
* [ Raw response ](#tab-panel-381)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/simple-generation-0.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "images": [

      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/021776405291656e8ad6f8fac80a9b78040141fa10ae51dc262e8_0.jpeg"

    ]

  },

  "state": "Completed"

}


```

## Examples

**High Resolution PNG**  — 3K quality with PNG output 

* [ TypeScript ](#tab-panel-384)
* [ cURL ](#tab-panel-385)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    aspect_ratio: '16:9',

    output_format: 'png',

    prompt:

      'A detailed technical blueprint of a futuristic spacecraft with annotations and measurements',

    size: '3K',

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

  "model": "bytedance/seedream-5-lite",

  "input": {

    "aspect_ratio": "16:9",

    "output_format": "png",

    "prompt": "A detailed technical blueprint of a futuristic spacecraft with annotations and measurements",

    "size": "3K"

  }

}'


```

* [ Output ](#tab-panel-382)
* [ Raw response ](#tab-panel-383)

![High Resolution PNG](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/high-resolution-png-0.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "images": [

      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/021776405293188e8ad6f8fac80a9b78040141fa10ae51d8ac521_0.png"

    ]

  },

  "state": "Completed"

}


```

**Portrait Photo**  — JPEG output for photographs 

* [ TypeScript ](#tab-panel-388)
* [ cURL ](#tab-panel-389)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    aspect_ratio: '3:4',

    output_format: 'jpeg',

    prompt:

      'A professional headshot portrait with soft studio lighting and a neutral gray background',

    size: '2K',

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

  "model": "bytedance/seedream-5-lite",

  "input": {

    "aspect_ratio": "3:4",

    "output_format": "jpeg",

    "prompt": "A professional headshot portrait with soft studio lighting and a neutral gray background",

    "size": "2K"

  }

}'


```

* [ Output ](#tab-panel-386)
* [ Raw response ](#tab-panel-387)

![Portrait Photo](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/portrait-photo-0.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "images": [

      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/021776405322247e8ad6f8fac80a9b78040141fa10ae51db518ee_0.jpeg"

    ]

  },

  "state": "Completed"

}


```

**Sequential Comic**  — Generate sequential comic panels 

* [ TypeScript ](#tab-panel-392)
* [ cURL ](#tab-panel-393)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    aspect_ratio: '4:3',

    max_images: 4,

    prompt:

      'A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it',

    sequential_image_generation: 'auto',

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

  "model": "bytedance/seedream-5-lite",

  "input": {

    "aspect_ratio": "4:3",

    "max_images": 4,

    "prompt": "A four-panel comic strip showing a cat discovering a cardboard box and deciding to sit in it",

    "sequential_image_generation": "auto"

  }

}'


```

* [ Output ](#tab-panel-390)
* [ Raw response ](#tab-panel-391)

![Sequential Comic](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/sequential-comic-0.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "images": [

      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/0217764053440971386b9a8ed856c57501cfa946ce34c987bb335_0.jpeg"

    ]

  },

  "state": "Completed"

}


```

**Image Variation**  — Create variation from reference 

* [ TypeScript ](#tab-panel-396)
* [ cURL ](#tab-panel-397)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-5-lite',

  {

    aspect_ratio: 'match_input_image',

    image_input: [

      'https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg',

    ],

    prompt: 'Create a variation of this image in a watercolor painting style',

    size: '2K',

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

  "model": "bytedance/seedream-5-lite",

  "input": {

    "aspect_ratio": "match_input_image",

    "image_input": [

      "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg"

    ],

    "prompt": "Create a variation of this image in a watercolor painting style",

    "size": "2K"

  }

}'


```

* [ Output ](#tab-panel-394)
* [ Raw response ](#tab-panel-395)

![Image Variation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-5-lite/image-variation-0.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "images": [

      "https://ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-5-0/0217764053505731386b9a8ed856c57501cfa946ce34c989ba40c_0.jpeg"

    ]

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-398)
* [ Output ](#tab-panel-399)

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

▶image\_input\[\]

`array`maxItems: 14format: uri

max\_images

`integer`maximum: 15minimum: 1

output\_format

`string`enum: png, jpeg

prompt

`string`required

sequential\_image\_generation

`string`enum: disabled, auto

size

`string`enum: 2K, 3K

▶images\[\]

`array`minItems: 1format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
