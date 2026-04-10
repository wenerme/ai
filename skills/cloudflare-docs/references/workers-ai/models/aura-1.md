---
title: aura-1
description: Aura is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.DVGPhlbc.svg) 

#  aura-1 

Text-to-Speech • Deepgram 

@cf/deepgram/aura-1 

Aura is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://deepgram.com/terms) |
| Batch             | Yes                                  |
| Partner           | Yes                                  |
| Real-time         | Yes                                  |
| Unit Pricing      | $0.015 per 1k characters             |

## Usage

* [  TypeScript ](#tab-panel-1620)
* [  curl ](#tab-panel-1621)

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

      const resp = await env.AI.run("@cf/deepgram/aura-1", {

        "text":"Hello World!"

      }, {

        returnRawResponse: true

      });


      return resp;

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl --request POST   --url 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/deepgram/aura-1'   --header 'Authorization: Bearer {TOKEN}'   --header 'Content-Type: application/json'   --data '{

    "text":"Hello world!"

}'


```

## Parameters

\* indicates a required field

### Input

* `speaker` ` string ` default angus  
Speaker used to produce the audio.
* `encoding` ` string `  
Encoding of the output audio.
* `container` ` string `  
Container specifies the file format wrapper for the output audio. The available options depend on the encoding type..
* `text` ` string ` required  
The text content to be converted to speech
* `sample_rate` ` number `  
Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable
* `bit_rate` ` number `  
The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type.

### Output

 The binding returns a `ReadableStream` with the audio in MPEG format (check the model's output schema). 

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1622)
* [ Output ](#tab-panel-1623)

```

{

    "type": "object",

    "properties": {

        "speaker": {

            "type": "string",

            "enum": [

                "angus",

                "asteria",

                "arcas",

                "orion",

                "orpheus",

                "athena",

                "luna",

                "zeus",

                "perseus",

                "helios",

                "hera",

                "stella"

            ],

            "default": "angus",

            "description": "Speaker used to produce the audio."

        },

        "encoding": {

            "type": "string",

            "enum": [

                "linear16",

                "flac",

                "mulaw",

                "alaw",

                "mp3",

                "opus",

                "aac"

            ],

            "description": "Encoding of the output audio."

        },

        "container": {

            "type": "string",

            "enum": [

                "none",

                "wav",

                "ogg"

            ],

            "description": "Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.."

        },

        "text": {

            "type": "string",

            "description": "The text content to be converted to speech"

        },

        "sample_rate": {

            "type": "number",

            "description": "Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable"

        },

        "bit_rate": {

            "type": "number",

            "description": "The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type."

        }

    },

    "required": [

        "text"

    ]

}


```

Explain Code

```

{

    "type": "string",

    "contentType": "audio/mpeg",

    "format": "binary",

    "description": "The generated audio in MP3 format"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
