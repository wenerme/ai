---
title: FLUX.2 [max]
description: FLUX.2 [max] is Black Forest Labs' highest-quality image model — top editing consistency, strongest prompt following, and grounding search for visualizations of real-time information.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  FLUX.2 \[max\] 

Text-to-Image • Black Forest Labs • Proxied 

`black-forest-labs/flux-2-max` 

FLUX.2 \[max\] is Black Forest Labs' highest-quality image model — top editing consistency, strongest prompt following, and grounding search for visualizations of real-time information.

| Model Info        |                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                         |
| More information  | [link ↗](https://blackforestlabs.ai/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-2-max) |

## Usage

* [ TypeScript ](#tab-panel-298)
* [ cURL ](#tab-panel-299)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-max',

  {

    prompt:

      'A cat on its back legs running like a human is holding a big silver fish with its arms. The cat is running away from the shop owner and has a panicked look on his face. The scene is situated in a crowded market.',

    height: 2048,

    width: 1440,

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

  "model": "black-forest-labs/flux-2-max",

  "input": {

    "prompt": "A cat on its back legs running like a human is holding a big silver fish with its arms. The cat is running away from the shop owner and has a panicked look on his face. The scene is situated in a crowded market.",

    "height": 2048,

    "width": 1440

  }

}'


```

* [ Output ](#tab-panel-296)
* [ Raw response ](#tab-panel-297)

![High Resolution Scene](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/high-resolution-scene.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/high-resolution-scene.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Hex Color Control**  — Exact color control via hex codes — useful for brand-consistent imagery 

* [ TypeScript ](#tab-panel-302)
* [ cURL ](#tab-panel-303)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-max',

  {

    prompt:

      'A vase on a table in living room, the color of the vase is a gradient of color, starting with color #02eb3c and finishing with color #edfa3c. The flowers inside the vase have the color #ff0088',

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

  "model": "black-forest-labs/flux-2-max",

  "input": {

    "prompt": "A vase on a table in living room, the color of the vase is a gradient of color, starting with color #02eb3c and finishing with color #edfa3c. The flowers inside the vase have the color #ff0088"

  }

}'


```

* [ Output ](#tab-panel-300)
* [ Raw response ](#tab-panel-301)

![Hex Color Control](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/hex-color-control.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/hex-color-control.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Image Editing**  — Single-reference image editing — relight or restage a product photo 

* [ TypeScript ](#tab-panel-306)
* [ cURL ](#tab-panel-307)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-max',

  {

    prompt: 'Place this product onto a minimalist marble countertop with soft window light',

    input_images: [

      'https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg',

    ],

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

  "model": "black-forest-labs/flux-2-max",

  "input": {

    "prompt": "Place this product onto a minimalist marble countertop with soft window light",

    "input_images": [

      "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg"

    ]

  }

}'


```

* [ Output ](#tab-panel-304)
* [ Raw response ](#tab-panel-305)

![Image Editing](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/image-editing.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/image-editing.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-308)
* [ Output ](#tab-panel-309)

height

`integer`maximum: 9007199254740991minimum: 64Height of the generated image in pixels (minimum 64). Omit to let BFL pick.

▶input\_images\[\]

`array`maxItems: 8Up to 8 reference images for editing or multi-image composition. Each entry is an HTTPS URL or a data:image/...;base64,... URI.

output\_format

`string`enum: jpeg, png, webpOutput image format. Defaults to jpeg.

prompt

`string`requiredText prompt for image generation or editing.

safety\_tolerance

`integer`maximum: 5minimum: 0Tolerance for input/output moderation. 0 is the strictest, 5 the most permissive. Defaults to 2.

seed

`integer`maximum: 9007199254740991minimum: \-9007199254740991Optional seed for reproducible generation.

width

`integer`maximum: 9007199254740991minimum: 64Width of the generated image in pixels (minimum 64). Omit to let BFL pick.

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
