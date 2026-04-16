---
title: whisper-large-v3-turbo
description: Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. 
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  whisper-large-v3-turbo 

Automatic Speech Recognition • OpenAI • Hosted 

`@cf/openai/whisper-large-v3-turbo` 

Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. 

| Model Info   |                           |
| ------------ | ------------------------- |
| Batch        | Yes                       |
| Unit Pricing | $0.00051 per audio minute |

## Usage

* [  TypeScript ](#tab-panel-3807)
* [  Python ](#tab-panel-3808)
* [  curl ](#tab-panel-3809)

```

import { Buffer } from 'node:buffer';

export interface Env {

    AI: Ai;

}

const URL = "https://pub-dbcf9f0bd3af47ca9d40971179ee62de.r2.dev/02f6edc0-1f7b-4272-bd17-f05335104725/audio.mp3";

export default {

    async fetch(request, env, ctx): Promise<Response> {

        const mp3 = await fetch(URL);

        if (!mp3.ok) {

          return Response.json({ error: `Failed to fetch MP3: ${mp3.status}` });

        }

        const mp3Buffer = await mp3.arrayBuffer();

        const base64 = Buffer.from(mp3Buffer, 'binary').toString("base64");

        try {

            const res = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {

                audio: base64,

                // Specify the language using an ISO 639-1 code.

                // Examples: "en" (English), "es" (Spanish), "fr" (French)

                // If omitted, the model will auto-detect the language.

                language: "en",

            });

            return Response.json(res);

        }

        catch (e) {

            console.error(e);

            return Response.json({ error: "An unexpected error occurred" });

        }

    },

} satisfies ExportedHandler<Env>


```

Explain Code

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

```

import requests

import base64


API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"

headers = {"Authorization": "Bearer {API_KEY}"}


def run(model, input):

    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)

    return response.json()


with open("audio.mp3", "rb") as audio_file:

    audio_base64 = base64.b64encode(audio_file.read()).decode("utf-8")


# Specify the language using an ISO 639-1 code.

# Examples: "en" (English), "es" (Spanish), "fr" (French)

# If omitted, the model will auto-detect the language.

output = run("@cf/openai/whisper-large-v3-turbo", {

    "audio": audio_base64,

    "language": "en"

})

print(output)


```

Explain Code

Terminal window

```

# Encode the audio file as base64

AUDIO_BASE64=$(base64 -i audio.mp3)


# Specify the language using an ISO 639-1 code.

# Examples: "en" (English), "es" (Spanish), "fr" (French)

# If omitted, the model will auto-detect the language.

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/openai/whisper-large-v3-turbo \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -d "{\"audio\": \"$AUDIO_BASE64\", \"language\": \"en\"}"


```

Explain Code

## Parameters

* [ Input ](#tab-panel-3812)
* [ Output ](#tab-panel-3813)

▶audio

`one of`required

task

`string`default: transcribeSupported tasks are 'translate' or 'transcribe'.

language

`string`The language of the audio being transcribed or translated.

vad\_filter

`boolean`default: falsePreprocess the audio with a voice activity detection model.

initial\_prompt

`string`A text prompt to help provide context to the model on the contents of the audio.

prefix

`string`The prefix appended to the beginning of the output of the transcription and can guide the transcription result.

beam\_size

`integer`default: 5The number of beams to use in beam search decoding. Higher values may improve accuracy at the cost of speed.

condition\_on\_previous\_text

`boolean`default: trueWhether to condition on previous text during transcription. Setting to false may help prevent hallucination loops.

no\_speech\_threshold

`number`default: 0.6Threshold for detecting no-speech segments. Segments with no-speech probability above this value are skipped.

compression\_ratio\_threshold

`number`default: 2.4Threshold for filtering out segments with high compression ratio, which often indicate repetitive or hallucinated text.

log\_prob\_threshold

`number`default: \-1Threshold for filtering out segments with low average log probability, indicating low confidence.

hallucination\_silence\_threshold

`number`Optional threshold (in seconds) to skip silent periods that may cause hallucinations.

▶transcription\_info{}

`object`

text

`string`requiredThe complete transcription of the audio.

word\_count

`number`The total number of words in the transcription.

▶segments\[\]

`array`

vtt

`string`The transcription in WebVTT format, which includes timing and text information for use in subtitles.

## API Schemas

* [ Input ](#tab-panel-3810)
* [ Output ](#tab-panel-3811)

```

{

  "type": "object",

  "properties": {

    "audio": {

      "anyOf": [

        {

          "type": "string",

          "description": "Base64 encoded value of the audio data."

        },

        {

          "type": "object",

          "properties": {

            "body": {

              "type": "object"

            },

            "contentType": {

              "type": "string"

            }

          }

        }

      ]

    },

    "task": {

      "type": "string",

      "default": "transcribe",

      "description": "Supported tasks are 'translate' or 'transcribe'."

    },

    "language": {

      "type": "string",

      "description": "The language of the audio being transcribed or translated."

    },

    "vad_filter": {

      "type": "boolean",

      "default": false,

      "description": "Preprocess the audio with a voice activity detection model."

    },

    "initial_prompt": {

      "type": "string",

      "description": "A text prompt to help provide context to the model on the contents of the audio."

    },

    "prefix": {

      "type": "string",

      "description": "The prefix appended to the beginning of the output of the transcription and can guide the transcription result."

    },

    "beam_size": {

      "type": "integer",

      "default": 5,

      "description": "The number of beams to use in beam search decoding. Higher values may improve accuracy at the cost of speed."

    },

    "condition_on_previous_text": {

      "type": "boolean",

      "default": true,

      "description": "Whether to condition on previous text during transcription. Setting to false may help prevent hallucination loops."

    },

    "no_speech_threshold": {

      "type": "number",

      "default": 0.6,

      "description": "Threshold for detecting no-speech segments. Segments with no-speech probability above this value are skipped."

    },

    "compression_ratio_threshold": {

      "type": "number",

      "default": 2.4,

      "description": "Threshold for filtering out segments with high compression ratio, which often indicate repetitive or hallucinated text."

    },

    "log_prob_threshold": {

      "type": "number",

      "default": -1,

      "description": "Threshold for filtering out segments with low average log probability, indicating low confidence."

    },

    "hallucination_silence_threshold": {

      "type": "number",

      "description": "Optional threshold (in seconds) to skip silent periods that may cause hallucinations."

    }

  },

  "required": [

    "audio"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "transcription_info": {

      "type": "object",

      "properties": {

        "language": {

          "type": "string",

          "description": "The language of the audio being transcribed or translated."

        },

        "language_probability": {

          "type": "number",

          "description": "The confidence level or probability of the detected language being accurate, represented as a decimal between 0 and 1."

        },

        "duration": {

          "type": "number",

          "description": "The total duration of the original audio file, in seconds."

        },

        "duration_after_vad": {

          "type": "number",

          "description": "The duration of the audio after applying Voice Activity Detection (VAD) to remove silent or irrelevant sections, in seconds."

        }

      }

    },

    "text": {

      "type": "string",

      "description": "The complete transcription of the audio."

    },

    "word_count": {

      "type": "number",

      "description": "The total number of words in the transcription."

    },

    "segments": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "start": {

            "type": "number",

            "description": "The starting time of the segment within the audio, in seconds."

          },

          "end": {

            "type": "number",

            "description": "The ending time of the segment within the audio, in seconds."

          },

          "text": {

            "type": "string",

            "description": "The transcription of the segment."

          },

          "temperature": {

            "type": "number",

            "description": "The temperature used in the decoding process, controlling randomness in predictions. Lower values result in more deterministic outputs."

          },

          "avg_logprob": {

            "type": "number",

            "description": "The average log probability of the predictions for the words in this segment, indicating overall confidence."

          },

          "compression_ratio": {

            "type": "number",

            "description": "The compression ratio of the input to the output, measuring how much the text was compressed during the transcription process."

          },

          "no_speech_prob": {

            "type": "number",

            "description": "The probability that the segment contains no speech, represented as a decimal between 0 and 1."

          },

          "words": {

            "type": "array",

            "items": {

              "type": "object",

              "properties": {

                "word": {

                  "type": "string",

                  "description": "The individual word transcribed from the audio."

                },

                "start": {

                  "type": "number",

                  "description": "The starting time of the word within the audio, in seconds."

                },

                "end": {

                  "type": "number",

                  "description": "The ending time of the word within the audio, in seconds."

                }

              }

            }

          }

        }

      }

    },

    "vtt": {

      "type": "string",

      "description": "The transcription in WebVTT format, which includes timing and text information for use in subtitles."

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
