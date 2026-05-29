---
title: Veo 3
description: Google's video generation model capable of producing high-quality videos with optional audio from text prompts.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Veo 3 

Text-to-Video • Google • Proxied 

`google/veo-3` 

Google's video generation model capable of producing high-quality videos with optional audio from text prompts.

| Model Info        |                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                               |
| More information  | [link ↗](https://deepmind.google/technologies/veo/)                                                            |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3) |

## Usage

* [ TypeScript ](#tab-panel-610)
* [ cURL ](#tab-panel-611)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: true,

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

  "model": "google/veo-3",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": true,

    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-606)
* [ Raw response ](#tab-panel-607)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/simple-video-generation.mp4"

  },

  "state": "Completed"

}


```

## Examples

**Cinematic Scene**  — Widescreen cinematic video in 1080p 

* [ TypeScript ](#tab-panel-614)
* [ cURL ](#tab-panel-615)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    aspect_ratio: '16:9',

    duration: '8s',

    generate_audio: true,

    prompt:

      'A dramatic drone shot flying through misty mountain peaks at sunrise, with clouds rolling through valleys below',

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

  "model": "google/veo-3",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "8s",

    "generate_audio": true,

    "prompt": "A dramatic drone shot flying through misty mountain peaks at sunrise, with clouds rolling through valleys below",

    "resolution": "1080p"

  }

}'


```

* [ Output ](#tab-panel-608)
* [ Raw response ](#tab-panel-609)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/cinematic-scene.mp4"

  },

  "state": "Completed"

}


```

**Vertical Video**  — Portrait orientation for social media 

* [ TypeScript ](#tab-panel-618)
* [ cURL ](#tab-panel-619)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    aspect_ratio: '9:16',

    duration: '6s',

    generate_audio: true,

    prompt: 'A barista expertly pouring latte art, close-up shot with shallow depth of field',

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

  "model": "google/veo-3",

  "input": {

    "aspect_ratio": "9:16",

    "duration": "6s",

    "generate_audio": true,

    "prompt": "A barista expertly pouring latte art, close-up shot with shallow depth of field",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-612)
* [ Raw response ](#tab-panel-613)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/vertical-video.mp4"

  },

  "state": "Completed"

}


```

**Short Format**  — Short video for social media posts 

* [ TypeScript ](#tab-panel-622)
* [ cURL ](#tab-panel-623)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    aspect_ratio: '16:9',

    duration: '4s',

    generate_audio: true,

    prompt: 'A timelapse of a flower blooming, soft natural lighting',

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

  "model": "google/veo-3",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "4s",

    "generate_audio": true,

    "prompt": "A timelapse of a flower blooming, soft natural lighting",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-616)
* [ Raw response ](#tab-panel-617)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/short-format.mp4"

  },

  "state": "Completed"

}


```

**Silent Video**  — Video without audio generation 

* [ TypeScript ](#tab-panel-624)
* [ cURL ](#tab-panel-625)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: false,

    prompt: 'Abstract flowing liquid metal morphing into geometric shapes',

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

  "model": "google/veo-3",

  "input": {

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": false,

    "prompt": "Abstract flowing liquid metal morphing into geometric shapes",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-620)
* [ Raw response ](#tab-panel-621)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/silent-video.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-626)
* [ Output ](#tab-panel-627)

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
