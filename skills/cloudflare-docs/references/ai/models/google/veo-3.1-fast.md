---
title: Veo 3.1 Fast
description: A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Veo 3.1 Fast 

Text-to-Video • Google • Proxied 

`google/veo-3.1-fast` 

A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.

| Model Info        |                                                     |
| ----------------- | --------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)    |
| More information  | [link ↗](https://deepmind.google/technologies/veo/) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    prompt: 'A butterfly landing on a colorful flower in a garden',

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

**Social Content**  — Quick vertical video for social media 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    prompt:

      'Aesthetic morning routine: sun rays through curtains, coffee being poured',

    duration: '6s',

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

**Motion Graphics**  — Quick animated graphics 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    prompt:

      'Glowing neon lines forming geometric patterns on a dark background',

    duration: '4s',

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

**Ambient Scene**  — Relaxing background video 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    prompt:

      'Rain falling on a window with a blurred city skyline in the background at night',

    duration: '8s',

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

## Parameters

* [ Input ](#tab-panel-126)
* [ Output ](#tab-panel-127)

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

* [ Input ](#tab-panel-124)
* [ Output ](#tab-panel-125)

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
