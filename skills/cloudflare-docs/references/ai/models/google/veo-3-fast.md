---
title: Veo 3 Fast
description: A faster version of Veo 3 optimized for lower latency video generation with audio support.
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

#  Veo 3 Fast 

Text-to-Video • Google • Proxied 

`google/veo-3-fast` 

A faster version of Veo 3 optimized for lower latency video generation with audio support.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                    |
| More information  | [link ↗](https://deepmind.google/technologies/veo/)                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3-fast) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'Ocean waves crashing on a rocky shoreline at sunset',

    duration: '6s',

    aspect_ratio: '16:9',

    resolution: '720p',

    generate_audio: true,

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

**Social Media Clip**  — Quick vertical video for stories 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A coffee cup with steam rising, cozy cafe atmosphere',

    duration: '4s',

    aspect_ratio: '9:16',

    resolution: '720p',

    generate_audio: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Animated Loop**  — Short loopable animation 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt:

      'A campfire burning with flames dancing and sparks floating upward, seamless loop',

    duration: '4s',

    aspect_ratio: '16:9',

    resolution: '720p',

    generate_audio: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Product Shot**  — Quick product video preview 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A smartphone rotating on a dark surface with dramatic lighting',

    duration: '6s',

    aspect_ratio: '16:9',

    resolution: '720p',

    generate_audio: false,

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

* [ Input ](#tab-panel-208)
* [ Output ](#tab-panel-209)

prompt

`string`requiredText prompt describing the video to generate

image\_input

`string`Base64-encoded reference image for i2v

duration

`string`requireddefault: 6senum: 4s, 6s, 8sVideo duration

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 1:1Video aspect ratio

resolution

`string`requireddefault: 720penum: 720p, 1080pVideo resolution

generate\_audio

`boolean`requireddefault: trueWhether to generate audio with the video

video

`string`format: uriURL to the generated video

## API Schemas

* [ Input ](#tab-panel-206)
* [ Output ](#tab-panel-207)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "description": "Text prompt describing the video to generate",

      "type": "string"

    },

    "image_input": {

      "description": "Base64-encoded reference image for i2v",

      "type": "string"

    },

    "duration": {

      "description": "Video duration",

      "default": "6s",

      "type": "string",

      "enum": [

        "4s",

        "6s",

        "8s"

      ]

    },

    "aspect_ratio": {

      "description": "Video aspect ratio",

      "default": "16:9",

      "type": "string",

      "enum": [

        "16:9",

        "9:16",

        "1:1"

      ]

    },

    "resolution": {

      "description": "Video resolution",

      "default": "720p",

      "type": "string",

      "enum": [

        "720p",

        "1080p"

      ]

    },

    "generate_audio": {

      "description": "Whether to generate audio with the video",

      "default": true,

      "type": "boolean"

    }

  },

  "required": [

    "prompt",

    "duration",

    "aspect_ratio",

    "resolution",

    "generate_audio"

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
