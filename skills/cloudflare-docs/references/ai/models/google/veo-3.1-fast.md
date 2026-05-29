---
title: Veo 3.1 Fast
description: A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Veo 3.1 Fast 

Text-to-Video • Google • Proxied 

`google/veo-3.1-fast` 

A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.

| Model Info        |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                      |
| More information  | [link ↗](https://deepmind.google/technologies/veo/)                                                                   |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3.1-fast) |

## Usage

* [ TypeScript ](#tab-panel-668)
* [ cURL ](#tab-panel-669)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: true,

    prompt: 'A butterfly landing on a colorful flower in a garden',

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

  "model": "google/veo-3.1-fast",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": true,

    "prompt": "A butterfly landing on a colorful flower in a garden",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-664)
* [ Raw response ](#tab-panel-665)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/quick-demo.mp4"

  },

  "state": "Completed"

}


```

## Examples

**Social Content**  — Quick vertical video for social media 

* [ TypeScript ](#tab-panel-672)
* [ cURL ](#tab-panel-673)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    aspect_ratio: '9:16',

    duration: '6s',

    generate_audio: true,

    prompt: 'Aesthetic morning routine: sun rays through curtains, coffee being poured',

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

  "model": "google/veo-3.1-fast",

  "input": {

    "aspect_ratio": "9:16",

    "duration": "6s",

    "generate_audio": true,

    "prompt": "Aesthetic morning routine: sun rays through curtains, coffee being poured",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-666)
* [ Raw response ](#tab-panel-667)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/social-content.mp4"

  },

  "state": "Completed"

}


```

**Motion Graphics**  — Quick animated graphics 

* [ TypeScript ](#tab-panel-676)
* [ cURL ](#tab-panel-677)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    aspect_ratio: '16:9',

    duration: '4s',

    generate_audio: false,

    prompt: 'Glowing neon lines forming geometric patterns on a dark background',

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

  "model": "google/veo-3.1-fast",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "4s",

    "generate_audio": false,

    "prompt": "Glowing neon lines forming geometric patterns on a dark background",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-670)
* [ Raw response ](#tab-panel-671)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/motion-graphics.mp4"

  },

  "state": "Completed"

}


```

**Ambient Scene**  — Relaxing background video 

* [ TypeScript ](#tab-panel-678)
* [ cURL ](#tab-panel-679)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1-fast',

  {

    aspect_ratio: '16:9',

    duration: '8s',

    generate_audio: true,

    prompt: 'Rain falling on a window with a blurred city skyline in the background at night',

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

  "model": "google/veo-3.1-fast",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "8s",

    "generate_audio": true,

    "prompt": "Rain falling on a window with a blurred city skyline in the background at night",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-674)
* [ Raw response ](#tab-panel-675)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/ambient-scene.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-680)
* [ Output ](#tab-panel-681)

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 1:1Video aspect ratio

duration

`string`requireddefault: 6senum: 4s, 6s, 8sVideo duration

generate\_audio

`boolean`requireddefault: trueWhether to generate audio with the video

image\_input

`string`Base64-encoded reference image for i2v

prompt

`string`requiredText prompt describing the video to generate

resolution

`string`requireddefault: 720penum: 720p, 1080pVideo resolution

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
