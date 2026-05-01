---
title: MiniMax Speech 2.8 Turbo
description: MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Speech 2.8 Turbo 

Text-to-Speech • MiniMax • Proxied 

`minimax/speech-2.8-turbo` 

MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.

| Model Info        |                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms)                                                                                   |
| More information  | [link ↗](https://www.minimaxi.com/)                                                                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-turbo) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

    voice_id: 'English_expressive_narrator',

    speed: 1,

    volume: 1,

    pitch: 0,

    format: 'mp3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

## Examples

**Fast Narration**  — Speed up narration for quick playback 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.',

    voice_id: 'English_expressive_narrator',

    speed: 1.5,

    volume: 1,

    pitch: 0,

    format: 'mp3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

**Calm Tone**  — Calm and steady speech for meditation or relaxation 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'Take a deep breath in. Hold it for a moment. Now slowly exhale. Let your shoulders relax and release any tension.',

    voice_id: 'English_expressive_narrator',

    speed: 0.8,

    volume: 1,

    pitch: 0,

    emotion: 'calm',

    format: 'mp3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

**Adjusted Pitch**  — Lower the pitch for a deeper voice 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'Good evening. Tonight we explore the mysteries of the deep ocean and the creatures that live in total darkness.',

    voice_id: 'English_expressive_narrator',

    speed: 1,

    volume: 1,

    pitch: -6,

    format: 'mp3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

## Parameters

* [ Input ](#tab-panel-66)
* [ Output ](#tab-panel-67)

text

`string`requiredmaxLength: 10000The text to convert to speech. Maximum 10,000 characters.

voice\_id

`string`requireddefault: English\_expressive\_narratorThe voice ID to use for synthesis

speed

`number`requireddefault: 1minimum: 0.5maximum: 2Speech speed (0.5 to 2)

volume

`number`requireddefault: 1minimum: 0maximum: 10Speech volume (0 to 10)

pitch

`integer`requireddefault: 0minimum: \-12maximum: 12Pitch adjustment (-12 to 12)

emotion

`string`enum: happy, sad, angry, fearful, disgusted, surprised, calm, fluentEmotion control for synthesized speech

format

`string`requireddefault: mp3enum: mp3, flac, wavOutput audio format

▶sample\_rate

`one of`

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
