---
title: Nano Banana
description: Google's fast image generation model producing high-quality images from text prompts.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana 

Text-to-Image • Google 

`google/nano-banana` 

Google's fast image generation model producing high-quality images from text prompts.

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                     |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/)                                                               |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana) |

## Usage

* [ TypeScript ](#tab-panel-568)
* [ cURL ](#tab-panel-569)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A cozy coffee shop interior with warm lighting, plants hanging from the ceiling, and a cat sleeping on a velvet armchair by the window',

    aspect_ratio: '16:9',

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

  "model": "google/nano-banana",

  "input": {

    "prompt": "A cozy coffee shop interior with warm lighting, plants hanging from the ceiling, and a cat sleeping on a velvet armchair by the window",

    "aspect_ratio": "16:9"

  }

}'


```

* [ Output ](#tab-panel-566)
* [ Raw response ](#tab-panel-567)

![Cozy Coffee Shop](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png"

  },

  "state": "Completed"

}


```

## Examples

**Vintage Tokyo Poster**  — Retro travel poster style illustration 

* [ TypeScript ](#tab-panel-572)
* [ cURL ](#tab-panel-573)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A vintage travel poster for Tokyo, Japan in the style of 1960s airline advertisements, with Mount Fuji in the background and cherry blossoms framing the scene',

    aspect_ratio: '9:16',

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

  "model": "google/nano-banana",

  "input": {

    "prompt": "A vintage travel poster for Tokyo, Japan in the style of 1960s airline advertisements, with Mount Fuji in the background and cherry blossoms framing the scene",

    "aspect_ratio": "9:16"

  }

}'


```

* [ Output ](#tab-panel-570)
* [ Raw response ](#tab-panel-571)

![Vintage Tokyo Poster](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/vintage-tokyo-poster.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/vintage-tokyo-poster.png"

  },

  "state": "Completed"

}


```

**Dewdrops Macro**  — Photorealistic macro photography 

* [ TypeScript ](#tab-panel-576)
* [ cURL ](#tab-panel-577)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A photorealistic macro shot of dewdrops on a spider web at sunrise, with rainbow light refracting through each droplet',

    aspect_ratio: '1:1',

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

  "model": "google/nano-banana",

  "input": {

    "prompt": "A photorealistic macro shot of dewdrops on a spider web at sunrise, with rainbow light refracting through each droplet",

    "aspect_ratio": "1:1"

  }

}'


```

* [ Output ](#tab-panel-574)
* [ Raw response ](#tab-panel-575)

![Dewdrops Macro](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/dewdrops-macro.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/dewdrops-macro.png"

  },

  "state": "Completed"

}


```

**Pixel Art Marketplace**  — Isometric pixel art scene 

* [ TypeScript ](#tab-panel-580)
* [ cURL ](#tab-panel-581)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'An isometric pixel art scene of a bustling medieval marketplace with merchants, knights, and a dragon perched on the town hall roof',

    aspect_ratio: '1:1',

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

  "model": "google/nano-banana",

  "input": {

    "prompt": "An isometric pixel art scene of a bustling medieval marketplace with merchants, knights, and a dragon perched on the town hall roof",

    "aspect_ratio": "1:1"

  }

}'


```

* [ Output ](#tab-panel-578)
* [ Raw response ](#tab-panel-579)

![Pixel Art Marketplace](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png"

  },

  "state": "Completed"

}


```

**High Resolution Landscape**  — Generate a high-resolution 4K landscape image 

* [ TypeScript ](#tab-panel-584)
* [ cURL ](#tab-panel-585)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A dramatic mountain landscape at golden hour with snow-capped peaks and a crystal clear alpine lake',

    aspect_ratio: '16:9',

    image_size: '4K',

    output_format: 'png',

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

  "model": "google/nano-banana",

  "input": {

    "prompt": "A dramatic mountain landscape at golden hour with snow-capped peaks and a crystal clear alpine lake",

    "aspect_ratio": "16:9",

    "image_size": "4K",

    "output_format": "png"

  }

}'


```

* [ Output ](#tab-panel-582)
* [ Raw response ](#tab-panel-583)

![High Resolution Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/high-resolution-landscape.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/high-resolution-landscape.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-586)
* [ Output ](#tab-panel-587)

aspect\_ratio

`string`enum: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

▶image\_input\[\]

`array`maxItems: 3

image\_size

`string`enum: 1K, 2K, 4K

output\_format

`string`enum: jpg, png, webp

prompt

`string`required

image

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
