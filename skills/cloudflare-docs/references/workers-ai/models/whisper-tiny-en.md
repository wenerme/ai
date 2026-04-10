---
title: whisper-tiny-en
description: Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. Trained on 680k hours of labelled data, Whisper models demonstrate a strong ability to generalize to many datasets and domains without the need for fine-tuning. This is the English-only version of the Whisper Tiny model which was trained on the task of speech recognition.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.ChTKThcR.svg) 

#  whisper-tiny-en Beta 

Automatic Speech Recognition • OpenAI 

@cf/openai/whisper-tiny-en 

Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. Trained on 680k hours of labelled data, Whisper models demonstrate a strong ability to generalize to many datasets and domains without the need for fine-tuning. This is the English-only version of the Whisper Tiny model which was trained on the task of speech recognition.

| Model Info |     |
| ---------- | --- |
| Beta       | Yes |

## Usage

* [  TypeScript ](#tab-panel-2108)
* [  curl ](#tab-panel-2109)

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

      "@cf/openai/whisper-tiny-en",

      input

    );


    return Response.json({ input: { audio: [] }, response });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/openai/whisper-tiny-en  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  --data-binary "@talking-llama.mp3"


```

## Parameters

\* indicates a required field

### Input

* `0` ` string `
* `1` ` object `  
   * `audio` ` array ` required  
   An array of integers that represent the audio data constrained to 8-bit unsigned integer values  
         * `items` ` number `  
         A value between 0 and 255

### Output

* `text` ` string ` required  
The transcription
* `word_count` ` number `
* `words` ` array `  
   * `items` ` object `  
         * `word` ` string `  
         * `start` ` number `  
         The second this word begins in the recording  
         * `end` ` number `  
         The ending second when the word completes
* `vtt` ` string `

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-2110)
* [ Output ](#tab-panel-2111)

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
