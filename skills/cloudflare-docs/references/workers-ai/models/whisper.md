---
title: whisper
description: Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  whisper 

Automatic Speech Recognition • OpenAI • Hosted 

`@cf/openai/whisper` 

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.

| Model Info       |                                               |
| ---------------- | --------------------------------------------- |
| More information | [link ↗](https://openai.com/research/whisper) |
| Unit Pricing     | $0.00045 per audio minute                     |

## Usage

* [  TypeScript ](#tab-panel-4013)
* [  curl ](#tab-panel-4014)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const res = await fetch(

      "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"

    );

    const blob = await res.arrayBuffer();


    const input = {

      audio: [...new Uint8Array(blob)],

    };


    const response = await env.AI.run(

      "@cf/openai/whisper",

      input

    );


    return Response.json({ input: { audio: [] }, response });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/openai/whisper  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  --data-binary "@talking-llama.mp3"


```

## Parameters

* [ Input ](#tab-panel-4017)
* [ Output ](#tab-panel-4018)

Option 1

stringformat: binary

▶Option 2{}

object

text

`string`The transcription

word\_count

`number`

▶words\[\]

`array`

vtt

`string`

## API Schemas

* [ Input ](#tab-panel-4015)
* [ Output ](#tab-panel-4016)

```

{

  "oneOf": [

    {

      "type": "string",

      "format": "binary"

    },

    {

      "type": "object",

      "properties": {

        "audio": {

          "type": "array",

          "description": "An array of integers that represent the audio data constrained to 8-bit unsigned integer values",

          "items": {

            "type": "number",

            "description": "A value between 0 and 255"

          }

        }

      },

      "required": [

        "audio"

      ]

    }

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "text": {

      "type": "string",

      "description": "The transcription"

    },

    "word_count": {

      "type": "number"

    },

    "words": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "word": {

            "type": "string"

          },

          "start": {

            "type": "number",

            "description": "The second this word begins in the recording"

          },

          "end": {

            "type": "number",

            "description": "The ending second when the word completes"

          }

        }

      }

    },

    "vtt": {

      "type": "string"

    }

  },

  "required": [

    "text"

  ]

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
