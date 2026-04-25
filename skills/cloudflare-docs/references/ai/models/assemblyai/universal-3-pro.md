---
title: Universal 3 Pro
description: AssemblyAI's Universal 3 Pro speech recognition model for high-accuracy transcription.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![AssemblyAI logo](https://developers.cloudflare.com/_astro/assemblyai.DKrad3Z3.svg) 

#  Universal 3 Pro 

Automatic Speech Recognition • AssemblyAI • Proxied 

`assemblyai/universal-3-pro` 

AssemblyAI's Universal 3 Pro speech recognition model for high-accuracy transcription.

| Model Info        |                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.assemblyai.com/legal/terms-of-service)                                                                  |
| More information  | [link ↗](https://www.assemblyai.com/)                                                                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/assemblyai/universal-3-pro) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'assemblyai/universal-3-pro',

  {

    audio_url: 'https://cdn.openai.com/API/docs/audio/alloy.wav',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-106)
* [ Output ](#tab-panel-107)

```

{

    "audio_url": "https://cdn.openai.com/API/docs/audio/alloy.wav"

}


```

```

{

    "text": "The sun rises in the east and sets in the west. This simple fact has been observed by humans for thousands of years."

}


```

## Examples

**With Language Code**  — Transcribe with an explicit language code 

TypeScript

```

const response = await env.AI.run(

  'assemblyai/universal-3-pro',

  {

    audio_url: 'https://cdn.openai.com/API/docs/audio/echo.wav',

    language_code: 'en',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-108)
* [ Output ](#tab-panel-109)

```

{

    "audio_url": "https://cdn.openai.com/API/docs/audio/echo.wav",

    "language_code": "en"

}


```

```

{

    "text": "In the heart of the city, there is a large park where people go to relax and enjoy nature. The park has a beautiful pond with ducks and swans."

}


```

**With Key Terms**  — Improve accuracy for domain-specific vocabulary 

TypeScript

```

const response = await env.AI.run(

  'assemblyai/universal-3-pro',

  {

    audio_url: 'https://cdn.openai.com/API/docs/audio/nova.wav',

    keyterms_prompt: [

      'Kubernetes',

      'microservices',

      'containerization',

      'load balancer',

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-112)
* [ Output ](#tab-panel-113)

```

{

    "audio_url": "https://cdn.openai.com/API/docs/audio/nova.wav",

    "keyterms_prompt": [

        "Kubernetes",

        "microservices",

        "containerization",

        "load balancer"

    ]

}


```

```

{

    "text": "In the kitchen, the aroma of freshly baked bread filled the air. The loaves were golden brown and crusty on the outside and soft and warm on the inside."

}


```

**Speaker Diarization**  — Identify different speakers in the audio 

TypeScript

```

const response = await env.AI.run(

  'assemblyai/universal-3-pro',

  {

    audio_url: 'https://cdn.openai.com/API/docs/audio/onyx.wav',

    speaker_labels: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-110)
* [ Output ](#tab-panel-111)

```

{

    "audio_url": "https://cdn.openai.com/API/docs/audio/onyx.wav",

    "speaker_labels": true

}


```

```

{

    "text": "The train chugged along the tracks, carrying passengers to their destinations. The rhythmic sound of the wheels on the rails was soothing."

}


```

## Parameters

* [ Input ](#tab-panel-116)
* [ Output ](#tab-panel-117)

audio\_url

`string`requiredThe URL of the audio file to transcribe. Can be a publicly accessible URL or a data URI (data:audio/...;base64,...). For data URIs, the audio will be uploaded to AssemblyAI automatically.

language\_code

`string`The language code for the audio file (e.g., "en", "es", "fr"). Defaults to automatic language detection.

language\_detection

`boolean`Enable automatic language detection. When enabled with speech\_models, the system will automatically select the best model for the detected language.

prompt

`string`A custom prompt to guide transcription style, formatting, and output characteristics. Maximum 1,500 words.

▶keyterms\_prompt\[\]

`array`An array of up to 1,000 words or phrases (max 6 words per phrase) to improve transcription accuracy. Cannot be used with the prompt parameter.

temperature

`number`minimum: 0maximum: 1Controls randomness in model output (0.0-1.0). Lower values make output more deterministic. Default is 0.0.

speaker\_labels

`boolean`Enable speaker diarization to identify different speakers in the audio.

speakers\_expected

`integer`minimum: 1maximum: 9007199254740991Expected number of speakers for speaker diarization.

auto\_chapters

`boolean`Enable automatic chapter detection.

entity\_detection

`boolean`Enable detection of entities like names, organizations, and locations.

sentiment\_analysis

`boolean`Enable sentiment analysis for each sentence.

auto\_highlights

`boolean`Enable automatic extraction of key phrases and highlights.

content\_safety

`boolean`Enable content safety detection for sensitive content.

iab\_categories

`boolean`Enable IAB (Interactive Advertising Bureau) content taxonomy classification.

▶custom\_spelling\[\]

`array`Custom spelling rules to replace specific words or phrases in the transcription output.

disfluencies

`boolean`Include filler words like "um", "uh", etc. in the transcript.

multichannel

`boolean`Process each audio channel separately for multi-channel audio files.

dual\_channel

`boolean`Process audio as dual-channel (stereo) for better accuracy.

webhook\_url

`string`format: uriURL to receive webhook notifications when transcription is complete.

audio\_start\_from

`integer`minimum: 0maximum: 9007199254740991Timestamp (in milliseconds) to start transcription from.

audio\_end\_at

`integer`minimum: 0maximum: 9007199254740991Timestamp (in milliseconds) to end transcription at.

▶word\_boost\[\]

`array`Array of words to boost recognition accuracy (legacy - use keyterms\_prompt instead).

boost\_param

`string`enum: low, default, highHow much to boost the words in word\_boost.

filter\_profanity

`boolean`Filter profanity from the transcription.

redact\_pii

`boolean`Redact personally identifiable information.

redact\_pii\_audio

`boolean`Generate a redacted audio file with PII removed.

▶redact\_pii\_policies\[\]

`array`Specific PII policies to apply for redaction.

redact\_pii\_sub

`string`enum: entity\_name, hashStrategy for substituting redacted PII.

speech\_threshold

`number`minimum: 0maximum: 1Confidence threshold for speech detection.

domain

`string`enum: medical-v1Domain-specific transcription mode. "medical-v1" enables medical terminology optimization.

text

`string`The transcribed text.

words

`array | null`Word-level timestamps and confidence scores.

utterances

`array | null`Speaker-separated utterances (when speaker\_labels is enabled).

confidence

`number | null`Overall confidence score for the transcription.

language\_code

`string | null`Detected or specified language code.

language\_confidence

`number | null`Confidence score for language detection.

## API Schemas

* [ Input ](#tab-panel-114)
* [ Output ](#tab-panel-115)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "audio_url": {

      "description": "The URL of the audio file to transcribe. Can be a publicly accessible URL or a data URI (data:audio/...;base64,...). For data URIs, the audio will be uploaded to AssemblyAI automatically.",

      "type": "string"

    },

    "language_code": {

      "description": "The language code for the audio file (e.g., \"en\", \"es\", \"fr\"). Defaults to automatic language detection.",

      "type": "string"

    },

    "language_detection": {

      "description": "Enable automatic language detection. When enabled with speech_models, the system will automatically select the best model for the detected language.",

      "type": "boolean"

    },

    "prompt": {

      "description": "A custom prompt to guide transcription style, formatting, and output characteristics. Maximum 1,500 words.",

      "type": "string"

    },

    "keyterms_prompt": {

      "description": "An array of up to 1,000 words or phrases (max 6 words per phrase) to improve transcription accuracy. Cannot be used with the prompt parameter.",

      "type": "array",

      "items": {

        "type": "string"

      }

    },

    "temperature": {

      "description": "Controls randomness in model output (0.0-1.0). Lower values make output more deterministic. Default is 0.0.",

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "speaker_labels": {

      "description": "Enable speaker diarization to identify different speakers in the audio.",

      "type": "boolean"

    },

    "speakers_expected": {

      "description": "Expected number of speakers for speaker diarization.",

      "type": "integer",

      "minimum": 1,

      "maximum": 9007199254740991

    },

    "auto_chapters": {

      "description": "Enable automatic chapter detection.",

      "type": "boolean"

    },

    "entity_detection": {

      "description": "Enable detection of entities like names, organizations, and locations.",

      "type": "boolean"

    },

    "sentiment_analysis": {

      "description": "Enable sentiment analysis for each sentence.",

      "type": "boolean"

    },

    "auto_highlights": {

      "description": "Enable automatic extraction of key phrases and highlights.",

      "type": "boolean"

    },

    "content_safety": {

      "description": "Enable content safety detection for sensitive content.",

      "type": "boolean"

    },

    "iab_categories": {

      "description": "Enable IAB (Interactive Advertising Bureau) content taxonomy classification.",

      "type": "boolean"

    },

    "custom_spelling": {

      "description": "Custom spelling rules to replace specific words or phrases in the transcription output.",

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "from": {

            "type": "array",

            "items": {

              "type": "string"

            }

          },

          "to": {

            "type": "string"

          }

        },

        "required": [

          "from",

          "to"

        ],

        "additionalProperties": false

      }

    },

    "disfluencies": {

      "description": "Include filler words like \"um\", \"uh\", etc. in the transcript.",

      "type": "boolean"

    },

    "multichannel": {

      "description": "Process each audio channel separately for multi-channel audio files.",

      "type": "boolean"

    },

    "dual_channel": {

      "description": "Process audio as dual-channel (stereo) for better accuracy.",

      "type": "boolean"

    },

    "webhook_url": {

      "description": "URL to receive webhook notifications when transcription is complete.",

      "type": "string",

      "format": "uri"

    },

    "audio_start_from": {

      "description": "Timestamp (in milliseconds) to start transcription from.",

      "type": "integer",

      "minimum": 0,

      "maximum": 9007199254740991

    },

    "audio_end_at": {

      "description": "Timestamp (in milliseconds) to end transcription at.",

      "type": "integer",

      "minimum": 0,

      "maximum": 9007199254740991

    },

    "word_boost": {

      "description": "Array of words to boost recognition accuracy (legacy - use keyterms_prompt instead).",

      "type": "array",

      "items": {

        "type": "string"

      }

    },

    "boost_param": {

      "description": "How much to boost the words in word_boost.",

      "type": "string",

      "enum": [

        "low",

        "default",

        "high"

      ]

    },

    "filter_profanity": {

      "description": "Filter profanity from the transcription.",

      "type": "boolean"

    },

    "redact_pii": {

      "description": "Redact personally identifiable information.",

      "type": "boolean"

    },

    "redact_pii_audio": {

      "description": "Generate a redacted audio file with PII removed.",

      "type": "boolean"

    },

    "redact_pii_policies": {

      "description": "Specific PII policies to apply for redaction.",

      "type": "array",

      "items": {

        "type": "string"

      }

    },

    "redact_pii_sub": {

      "description": "Strategy for substituting redacted PII.",

      "type": "string",

      "enum": [

        "entity_name",

        "hash"

      ]

    },

    "speech_threshold": {

      "description": "Confidence threshold for speech detection.",

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "domain": {

      "description": "Domain-specific transcription mode. \"medical-v1\" enables medical terminology optimization.",

      "type": "string",

      "enum": [

        "medical-v1"

      ]

    }

  },

  "required": [

    "audio_url"

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

    },

    "words": {

      "description": "Word-level timestamps and confidence scores.",

      "anyOf": [

        {

          "type": "array",

          "items": {

            "type": "object",

            "properties": {

              "text": {

                "type": "string"

              },

              "start": {

                "type": "number"

              },

              "end": {

                "type": "number"

              },

              "confidence": {

                "type": "number"

              },

              "speaker": {

                "anyOf": [

                  {

                    "type": "string"

                  },

                  {

                    "type": "null"

                  }

                ]

              }

            },

            "required": [

              "text",

              "start",

              "end",

              "confidence"

            ],

            "additionalProperties": false

          }

        },

        {

          "type": "null"

        }

      ]

    },

    "utterances": {

      "description": "Speaker-separated utterances (when speaker_labels is enabled).",

      "anyOf": [

        {

          "type": "array",

          "items": {

            "type": "object",

            "properties": {

              "text": {

                "type": "string"

              },

              "start": {

                "type": "number"

              },

              "end": {

                "type": "number"

              },

              "confidence": {

                "type": "number"

              },

              "speaker": {

                "type": "string"

              }

            },

            "required": [

              "text",

              "start",

              "end",

              "confidence",

              "speaker"

            ],

            "additionalProperties": false

          }

        },

        {

          "type": "null"

        }

      ]

    },

    "confidence": {

      "description": "Overall confidence score for the transcription.",

      "anyOf": [

        {

          "type": "number"

        },

        {

          "type": "null"

        }

      ]

    },

    "language_code": {

      "description": "Detected or specified language code.",

      "anyOf": [

        {

          "type": "string"

        },

        {

          "type": "null"

        }

      ]

    },

    "language_confidence": {

      "description": "Confidence score for language detection.",

      "anyOf": [

        {

          "type": "number"

        },

        {

          "type": "null"

        }

      ]

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
