---
title: RunwayML Gen-4.5
description: RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.
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

![RunwayML logo](https://developers.cloudflare.com/_astro/runway.Cq8Cjov4.svg) 

#  RunwayML Gen-4.5 

Text-to-Video • RunwayML • Proxied 

`runwayml/gen-4.5` 

RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.

| Model Info        |                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://runwayml.com/terms-of-use)                                                                        |
| More information  | [link ↗](https://runwayml.com/)                                                                                    |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/runwayml/gen-4.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt:

      'A timelapse of the Eiffel Tower on a sunny day with clouds flying by',

    ratio: '1280:720',

    duration: 5,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

## Examples

**Portrait Video**  — Vertical video for social media 

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt:

      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',

    ratio: '720:1280',

    duration: 5,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Nature Close-up**  — Close-up wildlife shot in 16:9 

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt:

      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',

    ratio: '1280:720',

    duration: 5,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Cinematic Scene**  — Longer duration cinematic video 

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt:

      'Aerial drone shot flying through a misty forest at dawn, rays of sunlight breaking through the trees',

    ratio: '1280:720',

    duration: 10,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Image-to-Video**  — Animate an existing image 

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt: 'Camera slowly pans across the scene, gentle wind blowing',

    image_input:

      'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',

    ratio: '1280:720',

    duration: 5,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Reproducible Generation**  — Use seed for consistent results 

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt: 'A sailboat gliding across calm ocean waters at sunset',

    ratio: '1280:720',

    duration: 5,

    seed: 42,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**With Content Moderation**  — Adjust content moderation settings 

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    prompt: 'A press conference with multiple speakers at podiums',

    ratio: '1280:720',

    duration: 5,

    content_moderation: {

      public_figure_threshold: 'low',

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

## Parameters

* [ Input ](#tab-panel-418)
* [ Output ](#tab-panel-419)

prompt

`string`requiredminLength: 1maxLength: 1000Text prompt describing what should appear in the video

image\_input

`string`HTTPS URL, Runway URI, or data URI containing an image for image-to-video

ratio

`string`requireddefault: 1280:720enum: 1280:720, 720:1280, 1104:832, 960:960, 832:1104, 1584:672Resolution/aspect ratio of the output video

duration

`integer`requireddefault: 5minimum: 2maximum: 10Video duration in seconds

seed

`integer`minimum: 0maximum: 4294967295Random seed for reproducible results

▶content\_moderation{}

`object`Content moderation settings

video

`string`format: uriURL to the generated video

## API Schemas

* [ Input ](#tab-panel-416)
* [ Output ](#tab-panel-417)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "description": "Text prompt describing what should appear in the video",

      "type": "string",

      "minLength": 1,

      "maxLength": 1000

    },

    "image_input": {

      "description": "HTTPS URL, Runway URI, or data URI containing an image for image-to-video",

      "type": "string"

    },

    "ratio": {

      "description": "Resolution/aspect ratio of the output video",

      "default": "1280:720",

      "type": "string",

      "enum": [

        "1280:720",

        "720:1280",

        "1104:832",

        "960:960",

        "832:1104",

        "1584:672"

      ]

    },

    "duration": {

      "description": "Video duration in seconds",

      "default": 5,

      "type": "integer",

      "minimum": 2,

      "maximum": 10

    },

    "seed": {

      "description": "Random seed for reproducible results",

      "type": "integer",

      "minimum": 0,

      "maximum": 4294967295

    },

    "content_moderation": {

      "description": "Content moderation settings",

      "type": "object",

      "properties": {

        "public_figure_threshold": {

          "description": "Content moderation strictness for public figures",

          "type": "string",

          "enum": [

            "auto",

            "low"

          ]

        }

      },

      "additionalProperties": false

    }

  },

  "required": [

    "prompt",

    "ratio",

    "duration"

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

    "video": {

      "description": "URL to the generated video",

      "type": "string",

      "format": "uri"

    }

  },

  "required": [

    "video"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
