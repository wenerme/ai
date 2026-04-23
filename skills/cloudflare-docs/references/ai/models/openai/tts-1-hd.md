---
title: TTS-1 HD
description: OpenAI's high-definition text-to-speech model producing higher quality audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  TTS-1 HD 

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

Explain Code

Response200 

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

Explain Code

Response200 

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

Explain Code

Response200 

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

Explain Code

Response200 

## Parameters

* [ Input ](#tab-panel-390)
* [ Output ](#tab-panel-391)

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

## API Schemas

* [ Input ](#tab-panel-388)
* [ Output ](#tab-panel-389)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "text": {

      "description": "The text to generate audio for. Maximum length is 4096 characters.",

      "type": "string",

      "maxLength": 4096

    },

    "voice": {

      "description": "The voice to use when generating the audio. Defaults to alloy.",

      "default": "alloy",

      "type": "string",

      "enum": [

        "alloy",

        "echo",

        "fable",

        "onyx",

        "nova",

        "shimmer"

      ]

    },

    "response_format": {

      "description": "The output format for the audio. Supported formats are mp3, opus, wav, aac and flac.",

      "default": "mp3",

      "type": "string",

      "enum": [

        "mp3",

        "opus",

        "wav",

        "aac",

        "flac"

      ]

    },

    "speed": {

      "description": "The speed of the generated audio. Select a value from 0.25 to 4.0. 1.0 is the default.",

      "default": 1,

      "type": "number",

      "minimum": 0.25,

      "maximum": 4

    }

  },

  "required": [

    "text",

    "voice",

    "response_format",

    "speed"

  ],

  "additionalProperties": false

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "audio": {

      "description": "URL to the generated audio file",

      "type": "string"

    }

  },

  "required": [

    "audio"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
