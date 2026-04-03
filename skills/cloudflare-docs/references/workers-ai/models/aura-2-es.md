---
title: aura-2-es
description: Aura-2 is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.DVGPhlbc.svg) 

#  aura-2-es 

Text-to-Speech • Deepgram 

@cf/deepgram/aura-2-es 

Aura-2 is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://deepgram.com/terms) |
| Batch             | Yes                                  |
| Partner           | Yes                                  |
| Real-time         | Yes                                  |
| Unit Pricing      | $0.03 per 1k characters              |

## Parameters

\* indicates a required field

### Input

* `speaker` ` string ` default aquila  
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

* [ Input ](#tab-panel-1626)
* [ Output ](#tab-panel-1627)

```

{

    "type": "object",

    "properties": {

        "speaker": {

            "type": "string",

            "enum": [

                "sirio",

                "nestor",

                "carina",

                "celeste",

                "alvaro",

                "diana",

                "aquila",

                "selena",

                "estrella",

                "javier"

            ],

            "default": "aquila",

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
