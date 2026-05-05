---
title: AssemblyAI Universal-3 Pro
description: AssemblyAI's Universal 3 Pro speech recognition model for high-accuracy transcription.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![AssemblyAI logo](https://developers.cloudflare.com/_astro/assemblyai.DKrad3Z3.svg) 

#  AssemblyAI Universal-3 Pro 

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

* [ Output ](#tab-panel-124)
* [ Raw response ](#tab-panel-125)

The sun rises in the east and sets in the west. This simple fact has been observed by humans for thousands of years.

```

{

  "state": "Completed",

  "result": {

    "text": "The sun rises in the east and sets in the west. This simple fact has been observed by humans for thousands of years.",

    "words": [

      {

        "text": "The",

        "start": 32,

        "end": 129,

        "confidence": 0.9713957,

        "speaker": null

      },

      {

        "text": "sun",

        "start": 129,

        "end": 404,

        "confidence": 0.97053415,

        "speaker": null

      },

      {

        "text": "rises",

        "start": 420,

        "end": 809,

        "confidence": 0.9998932,

        "speaker": null

      },

      {

        "text": "in",

        "start": 841,

        "end": 922,

        "confidence": 0.999092,

        "speaker": null

      },

      {

        "text": "the",

        "start": 922,

        "end": 1068,

        "confidence": 0.9997658,

        "speaker": null

      },

      {

        "text": "east",

        "start": 1149,

        "end": 1456,

        "confidence": 0.9684294,

        "speaker": null

      },

      {

        "text": "and",

        "start": 1570,

        "end": 1634,

        "confidence": 0.9894344,

        "speaker": null

      },

      {

        "text": "sets",

        "start": 1715,

        "end": 2055,

        "confidence": 0.9999058,

        "speaker": null

      },

      {

        "text": "in",

        "start": 2055,

        "end": 2104,

        "confidence": 0.9997663,

        "speaker": null

      },

      {

        "text": "the",

        "start": 2120,

        "end": 2217,

        "confidence": 0.9999552,

        "speaker": null

      },

      {

        "text": "west.",

        "start": 2217,

        "end": 2638,

        "confidence": 0.9913442,

        "speaker": null

      },

      {

        "text": "This",

        "start": 3107,

        "end": 3221,

        "confidence": 0.9974367,

        "speaker": null

      },

      {

        "text": "simple",

        "start": 3269,

        "end": 3560,

        "confidence": 0.99965656,

        "speaker": null

      },

      {

        "text": "fact",

        "start": 3593,

        "end": 3997,

        "confidence": 0.999713,

        "speaker": null

      },

      {

        "text": "has",

        "start": 3997,

        "end": 4175,

        "confidence": 0.99924207,

        "speaker": null

      },

      {

        "text": "been",

        "start": 4224,

        "end": 4289,

        "confidence": 0.9995851,

        "speaker": null

      },

      {

        "text": "observed",

        "start": 4337,

        "end": 4807,

        "confidence": 0.9984724,

        "speaker": null

      },

      {

        "text": "by",

        "start": 4807,

        "end": 4952,

        "confidence": 0.9997143,

        "speaker": null

      },

      {

        "text": "humans",

        "start": 4969,

        "end": 5422,

        "confidence": 0.9997894,

        "speaker": null

      },

      {

        "text": "for",

        "start": 5422,

        "end": 5519,

        "confidence": 0.99947494,

        "speaker": null

      },

      {

        "text": "thousands",

        "start": 5616,

        "end": 6118,

        "confidence": 0.99950385,

        "speaker": null

      },

      {

        "text": "of",

        "start": 6118,

        "end": 6231,

        "confidence": 0.9995235,

        "speaker": null

      },

      {

        "text": "years.",

        "start": 6328,

        "end": 6636,

        "confidence": 0.9519594,

        "speaker": null

      }

    ],

    "utterances": null,

    "confidence": 0.99276465,

    "language_code": "en",

    "language_confidence": 0.9998

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

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

* [ Output ](#tab-panel-128)
* [ Raw response ](#tab-panel-129)

In the heart of the city, there is a large park where people go to relax and enjoy nature. The park has a beautiful pond with ducks and swans.

```

{

  "state": "Completed",

  "result": {

    "text": "In the heart of the city, there is a large park where people go to relax and enjoy nature. The park has a beautiful pond with ducks and swans.",

    "words": [

      {

        "text": "In",

        "start": 32,

        "end": 80,

        "confidence": 0.88134426,

        "speaker": null

      },

      {

        "text": "the",

        "start": 177,

        "end": 241,

        "confidence": 0.9984907,

        "speaker": null

      },

      {

        "text": "heart",

        "start": 258,

        "end": 500,

        "confidence": 0.99956447,

        "speaker": null

      },

      {

        "text": "of",

        "start": 500,

        "end": 548,

        "confidence": 0.9995684,

        "speaker": null

      },

      {

        "text": "the",

        "start": 596,

        "end": 677,

        "confidence": 0.99977916,

        "speaker": null

      },

      {

        "text": "city,",

        "start": 677,

        "end": 967,

        "confidence": 0.9956655,

        "speaker": null

      },

      {

        "text": "there",

        "start": 1322,

        "end": 1435,

        "confidence": 0.9987048,

        "speaker": null

      },

      {

        "text": "is",

        "start": 1467,

        "end": 1516,

        "confidence": 0.99971443,

        "speaker": null

      },

      {

        "text": "a",

        "start": 1564,

        "end": 1596,

        "confidence": 0.99948585,

        "speaker": null

      },

      {

        "text": "large",

        "start": 1709,

        "end": 2016,

        "confidence": 0.9987669,

        "speaker": null

      },

      {

        "text": "park",

        "start": 2129,

        "end": 2467,

        "confidence": 0.9981509,

        "speaker": null

      },

      {

        "text": "where",

        "start": 2693,

        "end": 2838,

        "confidence": 0.9559358,

        "speaker": null

      },

      {

        "text": "people",

        "start": 2854,

        "end": 3145,

        "confidence": 0.99979085,

        "speaker": null

      },

      {

        "text": "go",

        "start": 3177,

        "end": 3338,

        "confidence": 0.9993555,

        "speaker": null

      },

      {

        "text": "to",

        "start": 3338,

        "end": 3467,

        "confidence": 0.9998317,

        "speaker": null

      },

      {

        "text": "relax",

        "start": 3500,

        "end": 4064,

        "confidence": 0.99991953,

        "speaker": null

      },

      {

        "text": "and",

        "start": 4064,

        "end": 4161,

        "confidence": 0.9988979,

        "speaker": null

      },

      {

        "text": "enjoy",

        "start": 4161,

        "end": 4484,

        "confidence": 0.9999237,

        "speaker": null

      },

      {

        "text": "nature.",

        "start": 4484,

        "end": 4887,

        "confidence": 0.998528,

        "speaker": null

      },

      {

        "text": "The",

        "start": 5597,

        "end": 5758,

        "confidence": 0.990198,

        "speaker": null

      },

      {

        "text": "park",

        "start": 5758,

        "end": 6016,

        "confidence": 0.99979144,

        "speaker": null

      },

      {

        "text": "has",

        "start": 6064,

        "end": 6177,

        "confidence": 0.99926263,

        "speaker": null

      },

      {

        "text": "a",

        "start": 6177,

        "end": 6242,

        "confidence": 0.9992211,

        "speaker": null

      },

      {

        "text": "beautiful",

        "start": 6322,

        "end": 6774,

        "confidence": 0.99989605,

        "speaker": null

      },

      {

        "text": "pond",

        "start": 6790,

        "end": 7193,

        "confidence": 0.9998628,

        "speaker": null

      },

      {

        "text": "with",

        "start": 7193,

        "end": 7355,

        "confidence": 0.99960047,

        "speaker": null

      },

      {

        "text": "ducks",

        "start": 7371,

        "end": 7806,

        "confidence": 0.99963534,

        "speaker": null

      },

      {

        "text": "and",

        "start": 7855,

        "end": 7919,

        "confidence": 0.99866796,

        "speaker": null

      },

      {

        "text": "swans.",

        "start": 7935,

        "end": 8629,

        "confidence": 0.9833702,

        "speaker": null

      }

    ],

    "utterances": null,

    "confidence": 0.9927905,

    "language_code": "en_us",

    "language_confidence": null

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

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

* [ Output ](#tab-panel-130)
* [ Raw response ](#tab-panel-131)

In the kitchen, the aroma of freshly baked bread filled the air. The loaves were golden brown and crusty on the outside and soft and warm on the inside.

```

{

  "state": "Completed",

  "result": {

    "text": "In the kitchen, the aroma of freshly baked bread filled the air. The loaves were golden brown and crusty on the outside and soft and warm on the inside.",

    "words": [

      {

        "text": "In",

        "start": 32,

        "end": 80,

        "confidence": 0.9785539,

        "speaker": null

      },

      {

        "text": "the",

        "start": 177,

        "end": 242,

        "confidence": 0.99962807,

        "speaker": null

      },

      {

        "text": "kitchen,",

        "start": 258,

        "end": 565,

        "confidence": 0.99617165,

        "speaker": null

      },

      {

        "text": "the",

        "start": 743,

        "end": 839,

        "confidence": 0.9991928,

        "speaker": null

      },

      {

        "text": "aroma",

        "start": 839,

        "end": 1292,

        "confidence": 0.99992657,

        "speaker": null

      },

      {

        "text": "of",

        "start": 1308,

        "end": 1405,

        "confidence": 0.99955577,

        "speaker": null

      },

      {

        "text": "freshly",

        "start": 1405,

        "end": 1889,

        "confidence": 0.9996594,

        "speaker": null

      },

      {

        "text": "baked",

        "start": 1970,

        "end": 2261,

        "confidence": 0.99850214,

        "speaker": null

      },

      {

        "text": "bread",

        "start": 2293,

        "end": 2584,

        "confidence": 0.9999217,

        "speaker": null

      },

      {

        "text": "filled",

        "start": 2600,

        "end": 2859,

        "confidence": 0.9999,

        "speaker": null

      },

      {

        "text": "the",

        "start": 2859,

        "end": 3004,

        "confidence": 0.99993885,

        "speaker": null

      },

      {

        "text": "air.",

        "start": 3020,

        "end": 3262,

        "confidence": 0.9961201,

        "speaker": null

      },

      {

        "text": "The",

        "start": 4054,

        "end": 4119,

        "confidence": 0.99501073,

        "speaker": null

      },

      {

        "text": "loaves",

        "start": 4215,

        "end": 4522,

        "confidence": 0.9997483,

        "speaker": null

      },

      {

        "text": "were",

        "start": 4619,

        "end": 4781,

        "confidence": 0.9998282,

        "speaker": null

      },

      {

        "text": "golden",

        "start": 4878,

        "end": 5249,

        "confidence": 0.99248224,

        "speaker": null

      },

      {

        "text": "brown",

        "start": 5362,

        "end": 5718,

        "confidence": 0.9700398,

        "speaker": null

      },

      {

        "text": "and",

        "start": 5928,

        "end": 5992,

        "confidence": 0.9419883,

        "speaker": null

      },

      {

        "text": "crusty",

        "start": 6089,

        "end": 6541,

        "confidence": 0.9994146,

        "speaker": null

      },

      {

        "text": "on",

        "start": 6574,

        "end": 6703,

        "confidence": 0.9997141,

        "speaker": null

      },

      {

        "text": "the",

        "start": 6719,

        "end": 6784,

        "confidence": 0.9999218,

        "speaker": null

      },

      {

        "text": "outside",

        "start": 6881,

        "end": 7365,

        "confidence": 0.9993179,

        "speaker": null

      },

      {

        "text": "and",

        "start": 7365,

        "end": 7462,

        "confidence": 0.8661144,

        "speaker": null

      },

      {

        "text": "soft",

        "start": 7462,

        "end": 7882,

        "confidence": 0.9996922,

        "speaker": null

      },

      {

        "text": "and",

        "start": 7882,

        "end": 7995,

        "confidence": 0.9998481,

        "speaker": null

      },

      {

        "text": "warm",

        "start": 8028,

        "end": 8270,

        "confidence": 0.99996424,

        "speaker": null

      },

      {

        "text": "on",

        "start": 8270,

        "end": 8399,

        "confidence": 0.9998791,

        "speaker": null

      },

      {

        "text": "the",

        "start": 8415,

        "end": 8512,

        "confidence": 0.99982506,

        "speaker": null

      },

      {

        "text": "inside.",

        "start": 8512,

        "end": 8964,

        "confidence": 0.9834439,

        "speaker": null

      }

    ],

    "utterances": null,

    "confidence": 0.9901139,

    "language_code": "en",

    "language_confidence": 0.9969

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

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

* [ Output ](#tab-panel-126)
* [ Raw response ](#tab-panel-127)

The train chugged along the tracks, carrying passengers to their destinations. The rhythmic sound of the wheels on the rails was soothing.

```

{

  "state": "Completed",

  "result": {

    "text": "The train chugged along the tracks, carrying passengers to their destinations. The rhythmic sound of the wheels on the rails was soothing.",

    "words": [

      {

        "text": "The",

        "start": 32,

        "end": 113,

        "confidence": 0.9742124,

        "speaker": "A"

      },

      {

        "text": "train",

        "start": 177,

        "end": 403,

        "confidence": 0.99997795,

        "speaker": "A"

      },

      {

        "text": "chugged",

        "start": 516,

        "end": 904,

        "confidence": 0.99713653,

        "speaker": "A"

      },

      {

        "text": "along",

        "start": 904,

        "end": 1130,

        "confidence": 0.9999881,

        "speaker": "A"

      },

      {

        "text": "the",

        "start": 1227,

        "end": 1308,

        "confidence": 0.9999676,

        "speaker": "A"

      },

      {

        "text": "tracks,",

        "start": 1308,

        "end": 1808,

        "confidence": 0.9995983,

        "speaker": "A"

      },

      {

        "text": "carrying",

        "start": 2131,

        "end": 2341,

        "confidence": 0.9998933,

        "speaker": "A"

      },

      {

        "text": "passengers",

        "start": 2454,

        "end": 3068,

        "confidence": 0.999992,

        "speaker": "A"

      },

      {

        "text": "to",

        "start": 3100,

        "end": 3229,

        "confidence": 0.99999034,

        "speaker": "A"

      },

      {

        "text": "their",

        "start": 3262,

        "end": 3423,

        "confidence": 0.9999908,

        "speaker": "A"

      },

      {

        "text": "destinations.",

        "start": 3423,

        "end": 4198,

        "confidence": 0.9992286,

        "speaker": "A"

      },

      {

        "text": "The",

        "start": 5038,

        "end": 5119,

        "confidence": 0.99871373,

        "speaker": "A"

      },

      {

        "text": "rhythmic",

        "start": 5184,

        "end": 5523,

        "confidence": 0.9999517,

        "speaker": "A"

      },

      {

        "text": "sound",

        "start": 5523,

        "end": 5926,

        "confidence": 0.99993813,

        "speaker": "A"

      },

      {

        "text": "of",

        "start": 5926,

        "end": 6007,

        "confidence": 0.99991894,

        "speaker": "A"

      },

      {

        "text": "the",

        "start": 6007,

        "end": 6088,

        "confidence": 0.99993825,

        "speaker": "A"

      },

      {

        "text": "wheels",

        "start": 6169,

        "end": 6459,

        "confidence": 0.99995935,

        "speaker": "A"

      },

      {

        "text": "on",

        "start": 6556,

        "end": 6605,

        "confidence": 0.99997675,

        "speaker": "A"

      },

      {

        "text": "the",

        "start": 6637,

        "end": 6718,

        "confidence": 0.99999475,

        "speaker": "A"

      },

      {

        "text": "rails",

        "start": 6718,

        "end": 7105,

        "confidence": 0.9999932,

        "speaker": "A"

      },

      {

        "text": "was",

        "start": 7138,

        "end": 7299,

        "confidence": 0.999851,

        "speaker": "A"

      },

      {

        "text": "soothing.",

        "start": 7299,

        "end": 7719,

        "confidence": 0.98378325,

        "speaker": "A"

      }

    ],

    "utterances": [

      {

        "text": "The train chugged along the tracks, carrying passengers to their destinations. The rhythmic sound of the wheels on the rails was soothing.",

        "start": 32,

        "end": 7719,

        "confidence": 0.99781793,

        "speaker": "A"

      }

    ],

    "confidence": 0.99781793,

    "language_code": "en",

    "language_confidence": 0.9906

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-132)
* [ Output ](#tab-panel-133)

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

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
