---
title: TTS-1
description: OpenAI's text-to-speech model optimized for real-time use with low latency.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  TTS-1 

Text-to-Speech • OpenAI • Proxied 

`openai/tts-1` 

OpenAI's text-to-speech model optimized for real-time use with low latency.

| Model Info        |                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                         |
| More information  | [link ↗](https://platform.openai.com/docs/guides/text-to-speech)                                               |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/tts-1) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

    voice: 'alloy',

    response_format: 'mp3',

    speed: 1,

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

**Different Voice**  — Use the Nova voice for a different tone 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    text: 'The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.',

    voice: 'nova',

    response_format: 'mp3',

    speed: 1,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Narration**  — Slower narration style with the Onyx voice 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    text: 'In the beginning, the universe was a singularity of infinite density. Then, in a fraction of a second, it expanded into everything we know today.',

    voice: 'onyx',

    response_format: 'mp3',

    speed: 0.85,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Echo Voice**  — Use the Echo voice for a deeper tone 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    text: 'Welcome back to the podcast. Today we are going to talk about the future of artificial intelligence and its impact on creative work.',

    voice: 'echo',

    response_format: 'mp3',

    speed: 1,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Fast Playback**  — Speed up speech for quick listening 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent, user growth exceeded expectations, and infrastructure costs remain stable.',

    voice: 'shimmer',

    response_format: 'mp3',

    speed: 1.5,

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

* [ Input ](#tab-panel-330)
* [ Output ](#tab-panel-331)

text

`string`requiredmaxLength: 4096The text to generate audio for. Maximum length is 4096 characters.

voice

`string`requireddefault: alloyenum: alloy, echo, fable, onyx, nova, shimmerThe voice to use when generating the audio. Defaults to alloy.

response\_format

`string`requireddefault: mp3enum: mp3, opus, wav, aac, flacThe output format for the audio. Supported formats are mp3, opus, wav, aac and flac.

speed

`number`requireddefault: 1minimum: 0.25maximum: 4The speed of the generated audio. Select a value from 0.25 to 4.0\. 1.0 is the default.

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
