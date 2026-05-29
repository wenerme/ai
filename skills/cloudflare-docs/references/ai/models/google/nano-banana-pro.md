---
title: Nano Banana Pro
description: Google's higher-quality image generation model with improved detail and prompt adherence.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana Pro 

Text-to-Image • Google • Proxied 

`google/nano-banana-pro` 

Google's higher-quality image generation model with improved detail and prompt adherence.

| Model Info        |                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                         |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/)                                                                   |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-pro) |

## Usage

* [ TypeScript ](#tab-panel-590)
* [ cURL ](#tab-panel-591)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    aspect_ratio: '1:1',

    output_format: 'png',

    prompt:

      'A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows',

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

  "model": "google/nano-banana-pro",

  "input": {

    "aspect_ratio": "1:1",

    "output_format": "png",

    "prompt": "A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows"

  }

}'


```

* [ Output ](#tab-panel-588)
* [ Raw response ](#tab-panel-589)

![Product Photography](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png"

  },

  "state": "Completed"

}


```

## Examples

**Fantasy Illustration**  — Epic fantasy scene 

* [ TypeScript ](#tab-panel-594)
* [ cURL ](#tab-panel-595)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    aspect_ratio: '16:9',

    image_size: '2K',

    prompt:

      'An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows',

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

  "model": "google/nano-banana-pro",

  "input": {

    "aspect_ratio": "16:9",

    "image_size": "2K",

    "prompt": "An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows"

  }

}'


```

* [ Output ](#tab-panel-592)
* [ Raw response ](#tab-panel-593)

![Fantasy Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png"

  },

  "state": "Completed"

}


```

**Architectural Visualization**  — Modern architecture render 

* [ TypeScript ](#tab-panel-600)
* [ cURL ](#tab-panel-601)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    aspect_ratio: '16:9',

    image_size: '4K',

    output_format: 'jpg',

    prompt:

      'A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset',

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

  "model": "google/nano-banana-pro",

  "input": {

    "aspect_ratio": "16:9",

    "image_size": "4K",

    "output_format": "jpg",

    "prompt": "A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset"

  }

}'


```

* [ Output ](#tab-panel-596)
* [ Raw response ](#tab-panel-597)

![Architectural Visualization](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg"

  },

  "state": "Completed"

}


```

**Character Design**  — Game character concept art 

* [ TypeScript ](#tab-panel-602)
* [ cURL ](#tab-panel-603)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    aspect_ratio: '3:2',

    prompt:

      'A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles',

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

  "model": "google/nano-banana-pro",

  "input": {

    "aspect_ratio": "3:2",

    "prompt": "A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles"

  }

}'


```

* [ Output ](#tab-panel-598)
* [ Raw response ](#tab-panel-599)

![Character Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-604)
* [ Output ](#tab-panel-605)

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
