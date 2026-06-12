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

Text-to-Image • Google 

`google/imagen-4` 

Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.

| Model Info          |                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                  |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                            |
| Zero data retention | Yes                                                                                                               |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/imagen-4) |

## Usage

* [ TypeScript ](#tab-panel-606)
* [ cURL ](#tab-panel-607)

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

* [ Output ](#tab-panel-604)
* [ Raw response ](#tab-panel-605)

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

* [ TypeScript ](#tab-panel-610)
* [ cURL ](#tab-panel-611)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt:

      'A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones',

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

  "model": "google/imagen-4",

  "input": {

    "prompt": "A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones",

    "aspect_ratio": "16:9"

  }

}'


```

* [ Output ](#tab-panel-608)
* [ Raw response ](#tab-panel-609)

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

* [ TypeScript ](#tab-panel-614)
* [ cURL ](#tab-panel-615)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',

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

  "model": "google/imagen-4",

  "input": {

    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight",

    "aspect_ratio": "9:16"

  }

}'


```

* [ Output ](#tab-panel-612)
* [ Raw response ](#tab-panel-613)

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

* [ TypeScript ](#tab-panel-618)
* [ cURL ](#tab-panel-619)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt: 'A chef preparing sushi in a traditional Japanese kitchen, detailed close-up',

    person_generation: 'allow_adult',

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

    "prompt": "A chef preparing sushi in a traditional Japanese kitchen, detailed close-up",

    "person_generation": "allow_adult"

  }

}'


```

* [ Output ](#tab-panel-616)
* [ Raw response ](#tab-panel-617)

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

* [ TypeScript ](#tab-panel-622)
* [ cURL ](#tab-panel-623)

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt:

      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',

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

  "model": "google/imagen-4",

  "input": {

    "prompt": "A sleek wireless headphone on a minimalist white marble surface with soft studio lighting",

    "aspect_ratio": "1:1"

  }

}'


```

* [ Output ](#tab-panel-620)
* [ Raw response ](#tab-panel-621)

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

* [ Input ](#tab-panel-624)
* [ Output ](#tab-panel-625)

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9Aspect ratio of the generated image

person\_generation

`string`enum: dont\_allow, allow\_adult, allow\_allAllow the model to generate images of people. dont\_allow: block people, allow\_adult: adults only, allow\_all: adults and children

prompt

`string`requiredText prompt describing the image to generate

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
