---
title: Vidu Q3 Turbo
description: Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Vidu logo](https://developers.cloudflare.com/_astro/vidu._WEx0U8r.svg) 

#  Vidu Q3 Turbo 

Text-to-Video • Vidu • Proxied 

`vidu/q3-turbo` 

Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.

| Model Info        |                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.vidu.com/terms)                                                                            |
| More information  | [link ↗](https://www.vidu.com/)                                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-turbo) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    prompt: 'A cat lazily stretching on a sunlit windowsill',

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

## Examples

**High Resolution**  — Generate at 1080p 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    prompt:

      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',

    duration: 5,

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

**Portrait Video**  — Vertical video for mobile viewing 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    prompt:

      'A waterfall cascading down mossy rocks in a tropical jungle, mist rising',

    duration: 5,

    resolution: '720p',

    aspect_ratio: '9:16',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Extended Duration**  — Longer video clip 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    prompt:

      'Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting',

    duration: 16,

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

**Low Resolution Fast Preview**  — Quick preview at 540p 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    prompt: 'A sailboat gliding across calm ocean waters at sunset',

    duration: 3,

    resolution: '540p',

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

* [ Input ](#tab-panel-426)
* [ Output ](#tab-panel-427)

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

* [ Input ](#tab-panel-424)
* [ Output ](#tab-panel-425)

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
