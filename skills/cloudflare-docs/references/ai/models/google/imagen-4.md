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

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt: 'A golden retriever puppy playing in autumn leaves',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/simple-generation.png) 

## Examples

**Widescreen Landscape**  — Generate a widescreen landscape image 

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt:

      'A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones',

    aspect_ratio: '16:9',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/widescreen-landscape.png) 

**Portrait Format**  — Vertical portrait-style image 

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt:

      'An elegant Art Deco poster featuring a jazz singer under a spotlight',

    aspect_ratio: '9:16',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/portrait-format.png) 

**With People**  — Allow generation of adult people 

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt:

      'A chef preparing sushi in a traditional Japanese kitchen, detailed close-up',

    person_generation: 'allow_adult',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

![With People](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/with-people.png) 

**Product Photo**  — Square product photography 

TypeScript

```

const response = await env.AI.run(

  'google/imagen-4',

  {

    prompt:

      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',

    aspect_ratio: '1:1',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

![Product Photo](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/product-photo.png) 

## Parameters

* [ Input ](#tab-panel-36)
* [ Output ](#tab-panel-37)

prompt

`string`requiredText prompt describing the image to generate

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9Aspect ratio of the generated image

person\_generation

`string`enum: dont\_allow, allow\_adult, allow\_allAllow the model to generate images of people. dont\_allow: block people, allow\_adult: adults only, allow\_all: adults and children

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
