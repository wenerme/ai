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

## Parameters

* [ Input ](#tab-panel-50)
* [ Output ](#tab-panel-51)

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

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
