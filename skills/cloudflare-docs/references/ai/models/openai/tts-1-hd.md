---
title: TTS-1-HD
description: OpenAI's high-definition text-to-speech model producing higher quality audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  TTS-1-HD 

Text-to-Speech • OpenAI • Proxied 

`openai/tts-1-hd` 

OpenAI's high-definition text-to-speech model producing higher quality audio output.

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                            |
| More information  | [link ↗](https://platform.openai.com/docs/guides/text-to-speech)                                                  |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/tts-1-hd) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

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

* [ Output ](#tab-panel-504)
* [ Raw response ](#tab-panel-505)

```

{

  "state": "Completed",

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/simple-speech.mp3"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Storytelling**  — HD narration with the Fable voice 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

  {

    text: 'Once upon a time, in a kingdom beyond the clouds, there lived a young inventor who dreamed of building machines that could think.',

    voice: 'fable',

    response_format: 'mp3',

    speed: 0.9,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-506)
* [ Raw response ](#tab-panel-507)

```

{

  "state": "Completed",

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/storytelling.mp3"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Podcast Style**  — Conversational podcast narration 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

  {

    text: "So here's the thing about large language models — they're not actually thinking. They're predicting the next token based on patterns in their training data. But the results can be surprisingly coherent.",

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

* [ Output ](#tab-panel-508)
* [ Raw response ](#tab-panel-509)

```

{

  "state": "Completed",

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/podcast-style.mp3"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Shimmer Voice**  — Bright and expressive voice 

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

  {

    text: 'Breaking news: scientists have discovered a new species of deep-sea fish that produces its own light using bioluminescence.',

    voice: 'shimmer',

    response_format: 'mp3',

    speed: 1,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-510)
* [ Raw response ](#tab-panel-511)

```

{

  "state": "Completed",

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/shimmer-voice.mp3"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-512)
* [ Output ](#tab-panel-513)

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
