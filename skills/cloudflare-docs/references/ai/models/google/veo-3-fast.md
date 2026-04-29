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

Text-to-Video • Google • Proxied 

`google/veo-3-fast` 

A faster version of Veo 3 optimized for lower latency video generation with audio support.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                    |
| More information  | [link ↗](https://deepmind.google/technologies/veo/)                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3-fast) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'Ocean waves crashing on a rocky shoreline at sunset',

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

**Social Media Clip**  — Quick vertical video for stories 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A coffee cup with steam rising, cozy cafe atmosphere',

    duration: '4s',

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

**Animated Loop**  — Short loopable animation 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt:

      'A campfire burning with flames dancing and sparks floating upward, seamless loop',

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

**Product Shot**  — Quick product video preview 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3-fast',

  {

    prompt: 'A smartphone rotating on a dark surface with dramatic lighting',

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

* [ Input ](#tab-panel-178)
* [ Output ](#tab-panel-179)

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
