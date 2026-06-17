---
title: Veo 3 Fast
description: A faster version of Veo 3 optimized for lower latency video generation with audio support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Veo 3 Fast 

Text-to-Video • Google 

`google/veo-3-fast` 

A faster version of Veo 3 optimized for lower latency video generation with audio support.

| Model Info          |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                    |
| More information    | [link ↗](https://deepmind.google/technologies/veo/)                                                                 |
| Zero data retention | Yes                                                                                                                 |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3-fast) |

## Usage

* [ TypeScript ](#tab-panel-710)
* [ cURL ](#tab-panel-711)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'Ocean waves crashing on a rocky shoreline at sunset',

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: true,

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

  "model": "google/veo-3-fast",

  "input": {

    "prompt": "Ocean waves crashing on a rocky shoreline at sunset",

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": true,

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-706)
* [ Raw response ](#tab-panel-707)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/quick-preview.mp4"

  },

  "state": "Completed"

}


```

## Examples

**Social Media Clip**  — Quick vertical video for stories 

* [ TypeScript ](#tab-panel-714)
* [ cURL ](#tab-panel-715)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A coffee cup with steam rising, cozy cafe atmosphere',

    aspect_ratio: '9:16',

    duration: '4s',

    generate_audio: true,

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

  "model": "google/veo-3-fast",

  "input": {

    "prompt": "A coffee cup with steam rising, cozy cafe atmosphere",

    "aspect_ratio": "9:16",

    "duration": "4s",

    "generate_audio": true,

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-708)
* [ Raw response ](#tab-panel-709)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/social-media-clip.mp4"

  },

  "state": "Completed"

}


```

**Animated Loop**  — Short loopable animation 

* [ TypeScript ](#tab-panel-718)
* [ cURL ](#tab-panel-719)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A campfire burning with flames dancing and sparks floating upward, seamless loop',

    aspect_ratio: '16:9',

    duration: '4s',

    generate_audio: true,

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

  "model": "google/veo-3-fast",

  "input": {

    "prompt": "A campfire burning with flames dancing and sparks floating upward, seamless loop",

    "aspect_ratio": "16:9",

    "duration": "4s",

    "generate_audio": true,

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-712)
* [ Raw response ](#tab-panel-713)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/animated-loop.mp4"

  },

  "state": "Completed"

}


```

**Product Shot**  — Quick product video preview 

* [ TypeScript ](#tab-panel-720)
* [ cURL ](#tab-panel-721)

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A smartphone rotating on a dark surface with dramatic lighting',

    aspect_ratio: '16:9',

    duration: '6s',

    generate_audio: false,

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

  "model": "google/veo-3-fast",

  "input": {

    "prompt": "A smartphone rotating on a dark surface with dramatic lighting",

    "aspect_ratio": "16:9",

    "duration": "6s",

    "generate_audio": false,

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-716)
* [ Raw response ](#tab-panel-717)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/product-shot.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-722)
* [ Output ](#tab-panel-723)

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

Input [ ](https://developers.cloudflare.com/ai/models/google/veo-3-fast/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/veo-3-fast/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/google/veo-3-fast/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/veo-3-fast/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/veo-3-fast/#page","headline":"Veo 3 Fast (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"A faster version of Veo 3 optimized for lower latency video generation with audio support.","url":"https://developers.cloudflare.com/ai/models/google/veo-3-fast/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
