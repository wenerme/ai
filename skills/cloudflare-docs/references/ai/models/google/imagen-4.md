---
title: Imagen 4
description: Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Imagen 4 

Text-to-Image • Google • Proxied 

`google/imagen-4` 

Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.

| Model Info        |                                                        |
| ----------------- | ------------------------------------------------------ |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)       |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/) |

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

Explain Code

Response200 ![Simple Generation](https://replicate.delivery/xezq/UtW29FgOBeTJRakGfCvfbUru8OjFr4VuuNeS4jfhUdtlgOYzC/tmpvhtnlgyb.jpg) 

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

Explain Code

Response200 ![Widescreen Landscape](https://replicate.delivery/xezq/2nkCTRdUxw50DdVtXa7f51D4pVyIG6vXGsvmSNjvJGIH6gNLA/tmp73fn5ayw.jpg) 

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

Explain Code

Response200 ![Portrait Format](https://replicate.delivery/xezq/exuPEZJNueg94U1EtcEwf8HlQX8W52vF4JsN5hfN0hlzRHsZB/tmpjd8xlnlv.jpg) 

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

Explain Code

Response200 ![With People](https://replicate.delivery/xezq/vRPujMfYTQVZcKT8dmQiDXSazkEsxENaGoeh9J0ceZfgSHsZB/tmp88g1pq9n.jpg) 

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

Explain Code

Response200 ![Product Photo](https://replicate.delivery/xezq/UJ4LsyIMfrXPJqElHCxNUILLjqp5ftyFXuTVQqWbgFLw0BbWA/tmpy8b6nyu2.jpg) 

## Parameters

* [ Input ](#tab-panel-94)
* [ Output ](#tab-panel-95)

prompt

`string`requiredText prompt describing the image to generate

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9Aspect ratio of the generated image

person\_generation

`string`enum: dont\_allow, allow\_adult, allow\_allAllow the model to generate images of people. dont\_allow: block people, allow\_adult: adults only, allow\_all: adults and children

image

`string`requiredformat: uriURL to the generated image

## API Schemas

* [ Input ](#tab-panel-92)
* [ Output ](#tab-panel-93)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "description": "Text prompt describing the image to generate",

      "type": "string"

    },

    "aspect_ratio": {

      "description": "Aspect ratio of the generated image",

      "type": "string",

      "enum": [

        "1:1",

        "3:4",

        "4:3",

        "9:16",

        "16:9"

      ]

    },

    "person_generation": {

      "description": "Allow the model to generate images of people. dont_allow: block people, allow_adult: adults only, allow_all: adults and children",

      "type": "string",

      "enum": [

        "dont_allow",

        "allow_adult",

        "allow_all"

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

    "image": {

      "description": "URL to the generated image",

      "type": "string",

      "format": "uri"

    }

  },

  "required": [

    "image"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
