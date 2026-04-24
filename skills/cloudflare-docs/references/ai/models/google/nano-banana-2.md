---
title: Nano Banana 2
description: Google's second-generation image generation model with improved quality and speed.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana 2 

Text-to-Image • Google • Proxied 

`google/nano-banana-2` 

Google's second-generation image generation model with improved quality and speed.

| Model Info        |                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                       |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/)                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-2) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'A futuristic cyberpunk city at night with towering skyscrapers, neon signs in Japanese and English, flying cars, and rain-slicked streets reflecting colorful lights',

    aspect_ratio: '16:9',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Futuristic City](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/futuristic-city.png) 

## Examples

**Abstract Art**  — Modern abstract expressionist painting 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'An abstract expressionist painting with bold splashes of cobalt blue, crimson red, and gold leaf accents on a large canvas',

    aspect_ratio: '1:1',

    output_format: 'png',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Abstract Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/abstract-art.png) 

**With Google Search**  — Use web search grounding for current events 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'An illustration of the latest Mars rover exploring the Martian surface',

    aspect_ratio: '16:9',

    google_search: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![With Google Search](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/with-google-search.png) 

**High Resolution Portrait**  — 4K portrait with specific aspect ratio 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'A professional studio portrait of a woman with dramatic side lighting, wearing elegant jewelry',

    aspect_ratio: '3:4',

    output_format: 'jpg',

    resolution: '4K',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![High Resolution Portrait](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/high-resolution-portrait.jpg) 

## Parameters

* [ Input ](#tab-panel-196)
* [ Output ](#tab-panel-197)

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 3

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

output\_format

`string`enum: jpg, png

resolution

`string`enum: 1K, 2K, 4K

google\_search

`boolean`

image\_search

`boolean`

image

`string`format: uri

## API Schemas

* [ Input ](#tab-panel-194)
* [ Output ](#tab-panel-195)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "image_input": {

      "maxItems": 3,

      "type": "array",

      "items": {

        "type": "string"

      }

    },

    "aspect_ratio": {

      "type": "string",

      "enum": [

        "match_input_image",

        "1:1",

        "2:3",

        "3:2",

        "3:4",

        "4:3",

        "4:5",

        "5:4",

        "9:16",

        "16:9",

        "21:9"

      ]

    },

    "output_format": {

      "type": "string",

      "enum": [

        "jpg",

        "png"

      ]

    },

    "resolution": {

      "type": "string",

      "enum": [

        "1K",

        "2K",

        "4K"

      ]

    },

    "google_search": {

      "type": "boolean"

    },

    "image_search": {

      "type": "boolean"

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
