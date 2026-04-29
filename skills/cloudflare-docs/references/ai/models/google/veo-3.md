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

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt:

      'A golden retriever running through a field of sunflowers on a sunny day',

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

**Cinematic Scene**  — Widescreen cinematic video in 1080p 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt:

      'A dramatic drone shot flying through misty mountain peaks at sunrise, with clouds rolling through valleys below',

    duration: '8s',

    aspect_ratio: '16:9',

    resolution: '1080p',

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

**Vertical Video**  — Portrait orientation for social media 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt:

      'A barista expertly pouring latte art, close-up shot with shallow depth of field',

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

Explain Code

Response200 

**Short Format**  — Short video for social media posts 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt: 'A timelapse of a flower blooming, soft natural lighting',

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

**Silent Video**  — Video without audio generation 

TypeScript

```

const response = await env.AI.run(

  'google/veo-3',

  {

    prompt: 'Abstract flowing liquid metal morphing into geometric shapes',

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

* [ Input ](#tab-panel-176)
* [ Output ](#tab-panel-177)

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
