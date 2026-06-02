---
title: FLUX.2 [pro] Preview
description: FLUX.2 [pro] Preview is Black Forest Labs' recommended default for production image generation and editing — tracks the latest [pro] weights with strong multi-reference support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  FLUX.2 \[pro\] Preview 

Text-to-Image • Black Forest Labs • Proxied 

`black-forest-labs/flux-2-pro-preview` 

FLUX.2 \[pro\] Preview is Black Forest Labs' recommended default for production image generation and editing — tracks the latest \[pro\] weights with strong multi-reference support.

| Model Info        |                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                                 |
| More information  | [link ↗](https://blackforestlabs.ai/)                                                                                                  |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-2-pro-preview) |

## Usage

* [ TypeScript ](#tab-panel-312)
* [ cURL ](#tab-panel-313)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-pro-preview',

  {

    prompt:

      'A serene mountain landscape at golden hour, soft diffused light filtering through clouds',

    height: 1024,

    width: 1024,

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

  "model": "black-forest-labs/flux-2-pro-preview",

  "input": {

    "prompt": "A serene mountain landscape at golden hour, soft diffused light filtering through clouds",

    "height": 1024,

    "width": 1024

  }

}'


```

* [ Output ](#tab-panel-310)
* [ Raw response ](#tab-panel-311)

![Simple Prompt](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-pro-preview/simple-prompt.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-pro-preview/simple-prompt.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Multi-Reference Editing**  — Multi-reference editing — combine two reference images in a single composition 

* [ TypeScript ](#tab-panel-318)
* [ cURL ](#tab-panel-319)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-pro-preview',

  {

    prompt: 'Combine the subjects of these images into a single editorial fashion scene',

    input_images: [

      'https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg',

      'https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg',

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

  "model": "black-forest-labs/flux-2-pro-preview",

  "input": {

    "prompt": "Combine the subjects of these images into a single editorial fashion scene",

    "input_images": [

      "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg",

      "https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg"

    ]

  }

}'


```

* [ Output ](#tab-panel-314)
* [ Raw response ](#tab-panel-315)

![Multi-Reference Editing](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-pro-preview/multi-reference-editing.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-pro-preview/multi-reference-editing.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Reproducible PNG Output**  — Seeded generation with PNG output for downstream editing pipelines 

* [ TypeScript ](#tab-panel-320)
* [ cURL ](#tab-panel-321)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-pro-preview',

  { prompt: 'A pastel watercolor of a koi pond at sunrise', output_format: 'png', seed: 1337 },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "black-forest-labs/flux-2-pro-preview",

  "input": {

    "prompt": "A pastel watercolor of a koi pond at sunrise",

    "output_format": "png",

    "seed": 1337

  }

}'


```

* [ Output ](#tab-panel-316)
* [ Raw response ](#tab-panel-317)

![Reproducible PNG Output](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-pro-preview/reproducible-png-output.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-pro-preview/reproducible-png-output.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-322)
* [ Output ](#tab-panel-323)

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
