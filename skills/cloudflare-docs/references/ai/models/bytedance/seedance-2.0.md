---
title: Seedance 2.0
description: ByteDance's next-generation video model with a unified multimodal architecture. Generates high-quality video with synchronized audio from text, images, video clips, and audio inputs. Supports multimodal references (up to 9 images, 3 videos, 3 audio files), native audio generation, video editing, video extension, intelligent duration, and adaptive aspect ratio.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedance 2.0 

Text-to-Video • ByteDance • Proxied 

`bytedance/seedance-2.0` 

ByteDance's next-generation video model with a unified multimodal architecture. Generates high-quality video with synchronized audio from text, images, video clips, and audio inputs. Supports multimodal references (up to 9 images, 3 videos, 3 audio files), native audio generation, video editing, video extension, intelligent duration, and adaptive aspect ratio.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedance2%5F0)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedance-2.0) |

## Usage

* [ TypeScript ](#tab-panel-310)
* [ cURL ](#tab-panel-311)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedance-2.0',

  {

    aspect_ratio: '16:9',

    duration: 5,

    prompt: 'A golden retriever running through a field of sunflowers on a sunny day',

    resolution: '720p',

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

  "model": "bytedance/seedance-2.0",

  "input": {

    "aspect_ratio": "16:9",

    "duration": 5,

    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-306)
* [ Raw response ](#tab-panel-307)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0/simple-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Resolution Cinematic**  — Cinematic video in 1080p 

* [ TypeScript ](#tab-panel-314)
* [ cURL ](#tab-panel-315)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedance-2.0',

  {

    aspect_ratio: '16:9',

    duration: 10,

    prompt:

      'A dramatic drone shot flying through misty mountain peaks at sunrise, cinematic lighting with volumetric fog',

    resolution: '1080p',

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

  "model": "bytedance/seedance-2.0",

  "input": {

    "aspect_ratio": "16:9",

    "duration": 10,

    "prompt": "A dramatic drone shot flying through misty mountain peaks at sunrise, cinematic lighting with volumetric fog",

    "resolution": "1080p"

  }

}'


```

* [ Output ](#tab-panel-308)
* [ Raw response ](#tab-panel-309)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0/high-resolution-cinematic.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Image to Video**  — Generate video from a reference image 

* [ TypeScript ](#tab-panel-318)
* [ cURL ](#tab-panel-319)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedance-2.0',

  {

    aspect_ratio: '16:9',

    duration: 5,

    image:

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',

    prompt: 'The character begins walking forward through the scene',

    resolution: '720p',

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

  "model": "bytedance/seedance-2.0",

  "input": {

    "aspect_ratio": "16:9",

    "duration": 5,

    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=",

    "prompt": "The character begins walking forward through the scene",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-312)
* [ Raw response ](#tab-panel-313)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0/image-to-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Portrait Video**  — Vertical video for social media 

* [ TypeScript ](#tab-panel-320)
* [ cURL ](#tab-panel-321)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedance-2.0',

  {

    aspect_ratio: '9:16',

    duration: 5,

    prompt: 'Abstract ink drops spreading through water, vivid colors mixing in slow motion',

    resolution: '720p',

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

  "model": "bytedance/seedance-2.0",

  "input": {

    "aspect_ratio": "9:16",

    "duration": 5,

    "prompt": "Abstract ink drops spreading through water, vivid colors mixing in slow motion",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-316)
* [ Raw response ](#tab-panel-317)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0/portrait-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-322)
* [ Output ](#tab-panel-323)

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 4:3, 1:1, 3:4, 9:16, 21:9, 9:21Video aspect ratio. Ignored if an image is used.

camera\_fixed

`boolean`requireddefault: falseWhether to fix camera position

duration

`integer`requireddefault: 5maximum: 12minimum: 4Video duration in seconds

fps

`number`requireddefault: 24const: 24Frame rate (frames per second)

generate\_audio

`boolean`Whether to generate audio with the video

image

`string`Reference image (HTTP(S) URL or base64 data URI) for image-to-video

last\_frame\_image

`string`Reference image (HTTP(S) URL or base64 data URI) for last-frame guidance. Only works if an image start frame is also given.

prompt

`string`requiredmaxLength: 2000Text prompt describing the video to generate

▶reference\_images\[\]

`array`maxItems: 4Reference images (1-4, HTTP(S) URLs or base64 data URIs) to guide video generation for characters, avatars, clothing, or environments. Cannot be used with 1080p resolution or first/last frame images.

reference\_video

`string`Reference video (HTTP(S) URL or base64 data URI) for style/motion guidance

resolution

`string`requireddefault: 720penum: 480p, 720p, 1080pVideo resolution

seed

`integer`maximum: 9007199254740991minimum: \-9007199254740991Random seed for reproducible generation

watermark

`boolean`requireddefault: falseWhether to add a watermark to the output video

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
