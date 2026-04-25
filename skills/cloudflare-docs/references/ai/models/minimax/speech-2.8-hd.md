---
title: Speech 2.8 HD
description: MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  Speech 2.8 HD 

Text-to-Speech • MiniMax • Proxied 

`minimax/speech-2.8-hd` 

MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.

| Model Info        |                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms)                                                                                |
| More information  | [link ↗](https://www.minimaxi.com/)                                                                                     |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-hd) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

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

Explain Code

Response200 

## Examples

**Custom Voice**  — Use a specific voice and adjust speed 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    text: 'The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.',

    voice_id: 'English_expressive_narrator',

    speed: 0.9,

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

Explain Code

Response200 

**With Emotion**  — Apply emotional tone to speech 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    text: "Congratulations! You've just won the grand prize! This is absolutely incredible news!",

    voice_id: 'English_expressive_narrator',

    speed: 1,

    volume: 1,

    pitch: 0,

    emotion: 'happy',

    format: 'mp3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**High Sample Rate**  — Studio quality at 44.1kHz sample rate 

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    text: 'This recording is generated at studio quality sample rate for the highest possible audio fidelity.',

    voice_id: 'English_expressive_narrator',

    speed: 1,

    volume: 1,

    pitch: 0,

    format: 'mp3',

    sample_rate: 44100,

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

* [ Input ](#tab-panel-252)
* [ Output ](#tab-panel-253)

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

## API Schemas

* [ Input ](#tab-panel-250)
* [ Output ](#tab-panel-251)

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
