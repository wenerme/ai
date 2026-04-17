---
title: Veo 3
description: Google's video generation model capable of producing high-quality videos with optional audio from text prompts.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Veo 3 

Text-to-Video • Google • Proxied 

`google/veo-3` 

Google's video generation model capable of producing high-quality videos with optional audio from text prompts.

| Model Info        |                                                     |
| ----------------- | --------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)    |
| More information  | [link ↗](https://deepmind.google/technologies/veo/) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt:

      'A golden retriever running through a field of sunflowers on a sunny day',

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

**Cinematic Scene**  — Widescreen cinematic video in 1080p 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt:

      'A dramatic drone shot flying through misty mountain peaks at sunrise, with clouds rolling through valleys below',

    duration: '8s',

    aspect_ratio: '16:9',

    resolution: '1080p',

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

**Vertical Video**  — Portrait orientation for social media 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt:

      'A barista expertly pouring latte art, close-up shot with shallow depth of field',

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

**Short Format**  — Short video for social media posts 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt: 'A timelapse of a flower blooming, soft natural lighting',

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

**Silent Video**  — Video without audio generation 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt: 'Abstract flowing liquid metal morphing into geometric shapes',

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

* [ Input ](#tab-panel-114)
* [ Output ](#tab-panel-115)

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

* [ Input ](#tab-panel-112)
* [ Output ](#tab-panel-113)

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
