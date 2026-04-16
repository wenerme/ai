---
title: Speech 2.8 Turbo
description: MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  Speech 2.8 Turbo 

Text-to-Speech • MiniMax • Proxied 

`minimax/speech-2.8-turbo` 

MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.

| Model Info        |                                          |
| ----------------- | ---------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms) |
| More information  | [link ↗](https://www.minimaxi.com/)      |

## Usage

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

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

**Fast Narration**  — Speed up narration for quick playback 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.',

    voice_id: 'English_expressive_narrator',

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

**Calm Tone**  — Calm and steady speech for meditation or relaxation 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'Take a deep breath in. Hold it for a moment. Now slowly exhale. Let your shoulders relax and release any tension.',

    voice_id: 'English_expressive_narrator',

    speed: 0.8,

    emotion: 'calm',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Adjusted Pitch**  — Lower the pitch for a deeper voice 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    text: 'Good evening. Tonight we explore the mysteries of the deep ocean and the creatures that live in total darkness.',

    voice_id: 'English_expressive_narrator',

    pitch: -6,

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

* [ Input ](#tab-panel-154)
* [ Output ](#tab-panel-155)

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

`string`requiredURL to the generated audio file

## API Schemas

* [ Input ](#tab-panel-152)
* [ Output ](#tab-panel-153)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "text": {

      "description": "The text to convert to speech. Maximum 10,000 characters.",

      "type": "string",

      "maxLength": 10000

    },

    "voice_id": {

      "description": "The voice ID to use for synthesis",

      "default": "English_expressive_narrator",

      "type": "string"

    },

    "speed": {

      "description": "Speech speed (0.5 to 2)",

      "default": 1,

      "type": "number",

      "minimum": 0.5,

      "maximum": 2

    },

    "volume": {

      "description": "Speech volume (0 to 10)",

      "default": 1,

      "type": "number",

      "minimum": 0,

      "maximum": 10

    },

    "pitch": {

      "description": "Pitch adjustment (-12 to 12)",

      "default": 0,

      "type": "integer",

      "minimum": -12,

      "maximum": 12

    },

    "emotion": {

      "description": "Emotion control for synthesized speech",

      "type": "string",

      "enum": [

        "happy",

        "sad",

        "angry",

        "fearful",

        "disgusted",

        "surprised",

        "calm",

        "fluent"

      ]

    },

    "format": {

      "description": "Output audio format",

      "default": "mp3",

      "type": "string",

      "enum": [

        "mp3",

        "flac",

        "wav"

      ]

    },

    "sample_rate": {

      "description": "Audio sample rate",

      "anyOf": [

        {

          "type": "number",

          "const": 8000

        },

        {

          "type": "number",

          "const": 16000

        },

        {

          "type": "number",

          "const": 22050

        },

        {

          "type": "number",

          "const": 24000

        },

        {

          "type": "number",

          "const": 32000

        },

        {

          "type": "number",

          "const": 44100

        }

      ]

    }

  },

  "required": [

    "text",

    "voice_id",

    "speed",

    "volume",

    "pitch",

    "format"

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
