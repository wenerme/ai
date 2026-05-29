---
title: Imagen 4
description: Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Imagen 4 

Text-to-Image • Google • Proxied 

`google/imagen-4` 

Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                  |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/)                                                            |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/imagen-4) |

## Usage

* [ TypeScript ](#tab-panel-528)
* [ cURL ](#tab-panel-529)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  { prompt: 'A golden retriever puppy playing in autumn leaves' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/imagen-4",

  "input": {

    "prompt": "A golden retriever puppy playing in autumn leaves"

  }

}'


```

* [ Output ](#tab-panel-526)
* [ Raw response ](#tab-panel-527)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/simple-generation.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/simple-generation.png"

  },

  "state": "Completed"

}


```

## Examples

**Widescreen Landscape**  — Generate a widescreen landscape image 

* [ TypeScript ](#tab-panel-532)
* [ cURL ](#tab-panel-533)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    aspect_ratio: '16:9',

    prompt:

      'A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones',

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

  "model": "google/imagen-4",

  "input": {

    "aspect_ratio": "16:9",

    "prompt": "A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones"

  }

}'


```

* [ Output ](#tab-panel-530)
* [ Raw response ](#tab-panel-531)

![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/widescreen-landscape.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/widescreen-landscape.png"

  },

  "state": "Completed"

}


```

**Portrait Format**  — Vertical portrait-style image 

* [ TypeScript ](#tab-panel-536)
* [ cURL ](#tab-panel-537)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    aspect_ratio: '9:16',

    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',

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

  "model": "google/imagen-4",

  "input": {

    "aspect_ratio": "9:16",

    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight"

  }

}'


```

* [ Output ](#tab-panel-534)
* [ Raw response ](#tab-panel-535)

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/portrait-format.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/portrait-format.png"

  },

  "state": "Completed"

}


```

**With People**  — Allow generation of adult people 

* [ TypeScript ](#tab-panel-540)
* [ cURL ](#tab-panel-541)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    person_generation: 'allow_adult',

    prompt: 'A chef preparing sushi in a traditional Japanese kitchen, detailed close-up',

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

  "model": "google/imagen-4",

  "input": {

    "person_generation": "allow_adult",

    "prompt": "A chef preparing sushi in a traditional Japanese kitchen, detailed close-up"

  }

}'


```

* [ Output ](#tab-panel-538)
* [ Raw response ](#tab-panel-539)

![With People](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/with-people.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/with-people.png"

  },

  "state": "Completed"

}


```

**Product Photo**  — Square product photography 

* [ TypeScript ](#tab-panel-544)
* [ cURL ](#tab-panel-545)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    aspect_ratio: '1:1',

    prompt:

      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',

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

  "model": "google/imagen-4",

  "input": {

    "aspect_ratio": "1:1",

    "prompt": "A sleek wireless headphone on a minimalist white marble surface with soft studio lighting"

  }

}'


```

* [ Output ](#tab-panel-542)
* [ Raw response ](#tab-panel-543)

![Product Photo](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/product-photo.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/product-photo.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-546)
* [ Output ](#tab-panel-547)

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9Aspect ratio of the generated image

person\_generation

`string`enum: dont\_allow, allow\_adult, allow\_allAllow the model to generate images of people. dont\_allow: block people, allow\_adult: adults only, allow\_all: adults and children

prompt

`string`requiredText prompt describing the image to generate

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
