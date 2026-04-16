---
title: GPT-4o Transcribe
description: A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-4o Transcribe 

Automatic Speech Recognition • OpenAI • Proxied 

`openai/gpt-4o-transcribe` 

A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.

| Model Info        |                                        |
| ----------------- | -------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information  | [link ↗](https://openai.com/)          |

## Usage

TypeScript

```

const resp = await fetch('https://cdn.openai.com/API/docs/audio/alloy.wav')

const buffer = await resp.arrayBuffer();

const bytes = new Uint8Array(buffer);

let binary = '';

for (let i = 0; i < bytes.length; i++) {

  binary += String.fromCharCode(bytes[i]);

}

const encoded = btoa(binary);

const response = await env.AI.run(

  'openai/gpt-4o-transcribe',

  {

    file: `data:audio/wav;base64,${encoded}`,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-168)
* [ Output ](#tab-panel-169)

```

{

    "file": "https://cdn.openai.com/API/docs/audio/alloy.wav"

}


```

```

{

    "text": "The sun rises in the east and sets in the west. This simple fact has been observed by humans for thousands of years."

}


```

## Examples

**With Language Hint**  — Transcribe with a language hint for better accuracy 

TypeScript

```

const resp = await fetch('https://cdn.openai.com/API/docs/audio/shimmer.wav')

const buffer = await resp.arrayBuffer();

const bytes = new Uint8Array(buffer);

let binary = '';

for (let i = 0; i < bytes.length; i++) {

  binary += String.fromCharCode(bytes[i]);

}

const encoded = btoa(binary);

const response = await env.AI.run(

  'openai/gpt-4o-transcribe',

  {

    file: `data:audio/wav;base64,${encoded}`,

    language: 'en',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-170)
* [ Output ](#tab-panel-171)

```

{

    "file": "https://cdn.openai.com/API/docs/audio/shimmer.wav",

    "language": "en"

}


```

```

{

    "text": "The beach was a popular spot on a hot summer day. People were swimming in the ocean, building sandcastles, and playing beach volleyball."

}


```

**Guided Transcription**  — Use a prompt to guide transcription style and context 

TypeScript

```

const resp = await fetch('https://cdn.openai.com/API/docs/audio/fable.wav')

const buffer = await resp.arrayBuffer();

const bytes = new Uint8Array(buffer);

let binary = '';

for (let i = 0; i < bytes.length; i++) {

  binary += String.fromCharCode(bytes[i]);

}

const encoded = btoa(binary);

const response = await env.AI.run(

  'openai/gpt-4o-transcribe',

  {

    file: `data:audio/wav;base64,${encoded}`,

    language: 'en',

    prompt:

      'This is a technical discussion about Kubernetes and cloud-native architecture.',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-172)
* [ Output ](#tab-panel-173)

```

{

    "file": "https://cdn.openai.com/API/docs/audio/fable.wav",

    "language": "en",

    "prompt": "This is a technical discussion about Kubernetes and cloud-native architecture."

}


```

```

{

    "text": "The library is a quiet and peaceful place where people go to read, study, and learn. The shelves are filled with books on every subject imaginable."

}


```

**High Temperature**  — Higher temperature for more varied transcription 

TypeScript

```

const resp = await fetch('https://cdn.openai.com/API/docs/audio/echo.wav')

const buffer = await resp.arrayBuffer();

const bytes = new Uint8Array(buffer);

let binary = '';

for (let i = 0; i < bytes.length; i++) {

  binary += String.fromCharCode(bytes[i]);

}

const encoded = btoa(binary);

const response = await env.AI.run(

  'openai/gpt-4o-transcribe',

  {

    file: `data:audio/wav;base64,${encoded}`,

    temperature: 0.5,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-174)
* [ Output ](#tab-panel-175)

```

{

    "file": "https://cdn.openai.com/API/docs/audio/echo.wav",

    "temperature": 0.5

}


```

```

{

    "text": "In the heart of the city, there is a large park where people go to relax and enjoy nature. The park has a beautiful pond with ducks and swans."

}


```

## Parameters

* [ Input ](#tab-panel-178)
* [ Output ](#tab-panel-179)

file

`string`requiredThe audio file as a data URI (data:audio/...;base64,...). Supported formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.

language

`string`The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.

prompt

`string`An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.

temperature

`number`requireddefault: 0minimum: 0maximum: 1The sampling temperature, between 0 and 1\. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

text

`string`requiredThe transcribed text.

## API Schemas

* [ Input ](#tab-panel-176)
* [ Output ](#tab-panel-177)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "file": {

      "description": "The audio file as a data URI (data:audio/...;base64,...). Supported formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.",

      "type": "string"

    },

    "language": {

      "description": "The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.",

      "type": "string"

    },

    "prompt": {

      "description": "An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.",

      "type": "string"

    },

    "temperature": {

      "description": "The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",

      "default": 0,

      "type": "number",

      "minimum": 0,

      "maximum": 1

    }

  },

  "required": [

    "file",

    "temperature"

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

    "text": {

      "description": "The transcribed text.",

      "type": "string"

    }

  },

  "required": [

    "text"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
