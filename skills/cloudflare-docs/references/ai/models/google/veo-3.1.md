---
title: Veo 3.1
description: Google's latest video generation model with improved quality, motion, and audio generation.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Veo 3.1 

Text-to-Video • Google • Proxied 

`google/veo-3.1` 

Google's latest video generation model with improved quality, motion, and audio generation.

| Model Info        |                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                 |
| More information  | [link ↗](https://deepmind.google/technologies/veo/)                                                              |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3.1) |

## Usage

* [ TypeScript ](#tab-panel-650)
* [ cURL ](#tab-panel-651)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1',

  {

    aspect_ratio: '16:9',

    duration: '8s',

    generate_audio: true,

    prompt:

      'A majestic eagle soaring over snow-capped mountains, tracking shot following the bird as it glides through clouds',

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

  "model": "google/veo-3.1",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "8s",

    "generate_audio": true,

    "prompt": "A majestic eagle soaring over snow-capped mountains, tracking shot following the bird as it glides through clouds",

    "resolution": "1080p"

  }

}'


```

* [ Output ](#tab-panel-646)
* [ Raw response ](#tab-panel-647)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1/nature-documentary.mp4"

  },

  "state": "Completed"

}


```

## Examples

**Urban Time-lapse**  — City life time-lapse video 

* [ TypeScript ](#tab-panel-654)
* [ cURL ](#tab-panel-655)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1',

  {

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: true,

    prompt:

      'A time-lapse of a busy city intersection at night, car lights creating streaks, people walking in fast motion',

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

  "model": "google/veo-3.1",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": true,

    "prompt": "A time-lapse of a busy city intersection at night, car lights creating streaks, people walking in fast motion",

    "resolution": "1080p"

  }

}'


```

* [ Output ](#tab-panel-648)
* [ Raw response ](#tab-panel-649)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1/urban-time-lapse.mp4"

  },

  "state": "Completed"

}


```

**Abstract Art**  — Abstract motion graphics 

* [ TypeScript ](#tab-panel-658)
* [ cURL ](#tab-panel-659)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1',

  {

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: false,

    prompt:

      'Colorful ink drops falling into water in slow motion, creating organic swirling patterns',

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

  "model": "google/veo-3.1",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": false,

    "prompt": "Colorful ink drops falling into water in slow motion, creating organic swirling patterns",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-652)
* [ Raw response ](#tab-panel-653)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1/abstract-art.mp4"

  },

  "state": "Completed"

}


```

**Food Video**  — Appetizing food footage 

* [ TypeScript ](#tab-panel-660)
* [ cURL ](#tab-panel-661)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3.1',

  {

    aspect_ratio: '9:16',

    duration: '4s',

    generate_audio: true,

    prompt: 'Melted chocolate being poured over fresh strawberries in slow motion, rich and glossy',

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

  "model": "google/veo-3.1",

  "input": {

    "aspect_ratio": "9:16",

    "duration": "4s",

    "generate_audio": true,

    "prompt": "Melted chocolate being poured over fresh strawberries in slow motion, rich and glossy",

    "resolution": "1080p"

  }

}'


```

* [ Output ](#tab-panel-656)
* [ Raw response ](#tab-panel-657)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1/food-video.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-662)
* [ Output ](#tab-panel-663)

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
