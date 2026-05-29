---
title: Seedance 2.0 Fast
description: Faster variant of ByteDance's Seedance 2.0 video model. Trades some quality for speed while sharing the same multimodal architecture. Supports text-to-video, image-to-video, native audio generation, multimodal references (images, videos, audio), video editing, and video extension.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedance 2.0 Fast 

Text-to-Video • ByteDance • Proxied 

`bytedance/seedance-2.0-fast` 

Faster variant of ByteDance's Seedance 2.0 video model. Trades some quality for speed while sharing the same multimodal architecture. Supports text-to-video, image-to-video, native audio generation, multimodal references (images, videos, audio), video editing, and video extension.

| Model Info       |                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedance)                                                                              |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedance-2.0-fast) |

## Usage

* [ TypeScript ](#tab-panel-328)
* [ cURL ](#tab-panel-329)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedance-2.0-fast',

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

  "model": "bytedance/seedance-2.0-fast",

  "input": {

    "aspect_ratio": "16:9",

    "duration": 5,

    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-324)
* [ Raw response ](#tab-panel-325)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-fast/quick-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Portrait Video**  — Vertical video for social media 

* [ TypeScript ](#tab-panel-330)
* [ cURL ](#tab-panel-331)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedance-2.0-fast',

  {

    aspect_ratio: '9:16',

    duration: 5,

    prompt: 'A barista pouring latte art in a cozy coffee shop, close-up with shallow depth of field',

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

  "model": "bytedance/seedance-2.0-fast",

  "input": {

    "aspect_ratio": "9:16",

    "duration": 5,

    "prompt": "A barista pouring latte art in a cozy coffee shop, close-up with shallow depth of field",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-326)
* [ Raw response ](#tab-panel-327)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-fast/portrait-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-332)
* [ Output ](#tab-panel-333)

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

`string`requireddefault: 720penum: 480p, 720pVideo resolution

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
