---
title: Vidu Q3 Pro
description: Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Vidu logo](https://developers.cloudflare.com/_astro/vidu._WEx0U8r.svg) 

#  Vidu Q3 Pro 

Text-to-Video • Vidu • Proxied 

`vidu/q3-pro` 

Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://www.vidu.com/terms) |
| More information  | [link ↗](https://www.vidu.com/)      |

## Usage

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt: 'A golden retriever running through a sunlit meadow in slow motion',

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

**Custom Duration and Resolution**  — Longer video at higher resolution 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'Aerial drone shot flying through a misty forest at dawn, rays of sunlight breaking through the trees',

    duration: 10,

    resolution: '1080p',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Portrait Aspect Ratio**  — Vertical video for social media 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',

    aspect_ratio: '9:16',

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

**Silent Video**  — Generate video without audio 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'Abstract paint swirls slowly mixing in water, vivid blues and golds',

    audio: false,

    duration: 8,

    resolution: '720p',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Square Format**  — Square video for product demos or social posts 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background',

    aspect_ratio: '1:1',

    duration: 5,

    resolution: '720p',

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

* [ Input ](#tab-panel-246)
* [ Output ](#tab-panel-247)

prompt

`string`maxLength: 5000Text prompt describing what should appear in the video

start\_image

`string`Start image for video generation. Use alone for image-to-video, or with end\_image for start/end-to-video. Accepts public URL or Base64 data URI (data:image/png;base64,...)

end\_image

`string`End image for start/end-to-video generation. Must be used together with start\_image. Accepts public URL or Base64 data URI (data:image/png;base64,...)

duration

`integer`requireddefault: 5minimum: 1maximum: 16Video duration in seconds (1-16)

resolution

`string`requireddefault: 720penum: 540p, 720p, 1080pVideo resolution

audio

`boolean`Enable audio-video synchronization. Default: true for Q3 models. When false, outputs silent video

aspect\_ratio

`string`enum: 16:9, 9:16, 3:4, 4:3, 1:1Video aspect ratio (text-to-video only). Default: 16:9

video

`string`format: uriURL to the generated video

## API Schemas

* [ Input ](#tab-panel-244)
* [ Output ](#tab-panel-245)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "description": "Text prompt describing what should appear in the video",

      "type": "string",

      "maxLength": 5000

    },

    "start_image": {

      "description": "Start image for video generation. Use alone for image-to-video, or with end_image for start/end-to-video. Accepts public URL or Base64 data URI (data:image/png;base64,...)",

      "type": "string"

    },

    "end_image": {

      "description": "End image for start/end-to-video generation. Must be used together with start_image. Accepts public URL or Base64 data URI (data:image/png;base64,...)",

      "type": "string"

    },

    "duration": {

      "description": "Video duration in seconds (1-16)",

      "default": 5,

      "type": "integer",

      "minimum": 1,

      "maximum": 16

    },

    "resolution": {

      "description": "Video resolution",

      "default": "720p",

      "type": "string",

      "enum": [

        "540p",

        "720p",

        "1080p"

      ]

    },

    "audio": {

      "description": "Enable audio-video synchronization. Default: true for Q3 models. When false, outputs silent video",

      "type": "boolean"

    },

    "aspect_ratio": {

      "description": "Video aspect ratio (text-to-video only). Default: 16:9",

      "type": "string",

      "enum": [

        "16:9",

        "9:16",

        "3:4",

        "4:3",

        "1:1"

      ]

    }

  },

  "required": [

    "duration",

    "resolution"

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
