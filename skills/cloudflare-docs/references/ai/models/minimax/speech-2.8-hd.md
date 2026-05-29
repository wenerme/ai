---
title: MiniMax Speech 2.8 HD
description: MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Speech 2.8 HD 

Text-to-Speech • MiniMax • Proxied 

`minimax/speech-2.8-hd` 

MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.

| Model Info        |                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms)                                                                                |
| More information  | [link ↗](https://www.minimaxi.com/)                                                                                     |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-hd) |

## Usage

* [ TypeScript ](#tab-panel-812)
* [ cURL ](#tab-panel-813)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    format: 'mp3',

    pitch: 0,

    speed: 1,

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

    voice_id: 'English_expressive_narrator',

    volume: 1,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "minimax/speech-2.8-hd",

  "input": {

    "format": "mp3",

    "pitch": 0,

    "speed": 1,

    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-808)
* [ Raw response ](#tab-panel-809)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/simple-speech.mp3"

  },

  "state": "Completed"

}


```

## Examples

**Custom Voice**  — Use a specific voice and adjust speed 

* [ TypeScript ](#tab-panel-816)
* [ cURL ](#tab-panel-817)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    format: 'mp3',

    pitch: 0,

    speed: 0.9,

    text: 'The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.',

    voice_id: 'English_expressive_narrator',

    volume: 1,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "minimax/speech-2.8-hd",

  "input": {

    "format": "mp3",

    "pitch": 0,

    "speed": 0.9,

    "text": "The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-810)
* [ Raw response ](#tab-panel-811)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/custom-voice.mp3"

  },

  "state": "Completed"

}


```

**With Emotion**  — Apply emotional tone to speech 

* [ TypeScript ](#tab-panel-820)
* [ cURL ](#tab-panel-821)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    emotion: 'happy',

    format: 'mp3',

    pitch: 0,

    speed: 1,

    text: "Congratulations! You've just won the grand prize! This is absolutely incredible news!",

    voice_id: 'English_expressive_narrator',

    volume: 1,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "minimax/speech-2.8-hd",

  "input": {

    "emotion": "happy",

    "format": "mp3",

    "pitch": 0,

    "speed": 1,

    "text": "Congratulations! You've just won the grand prize! This is absolutely incredible news!",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-814)
* [ Raw response ](#tab-panel-815)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/with-emotion.mp3"

  },

  "state": "Completed"

}


```

**High Sample Rate**  — Studio quality at 44.1kHz sample rate 

* [ TypeScript ](#tab-panel-822)
* [ cURL ](#tab-panel-823)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-hd',

  {

    format: 'mp3',

    pitch: 0,

    sample_rate: 44100,

    speed: 1,

    text: 'This recording is generated at studio quality sample rate for the highest possible audio fidelity.',

    voice_id: 'English_expressive_narrator',

    volume: 1,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "minimax/speech-2.8-hd",

  "input": {

    "format": "mp3",

    "pitch": 0,

    "sample_rate": 44100,

    "speed": 1,

    "text": "This recording is generated at studio quality sample rate for the highest possible audio fidelity.",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-818)
* [ Raw response ](#tab-panel-819)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/high-sample-rate.mp3"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-824)
* [ Output ](#tab-panel-825)

emotion

`string`enum: happy, sad, angry, fearful, disgusted, surprised, calm, fluentEmotion control for synthesized speech

format

`string`requireddefault: mp3enum: mp3, flac, wavOutput audio format

pitch

`integer`requireddefault: 0maximum: 12minimum: \-12Pitch adjustment (-12 to 12)

▶sample\_rate

`one of`

speed

`number`requireddefault: 1maximum: 2minimum: 0.5Speech speed (0.5 to 2)

text

`string`requiredmaxLength: 10000The text to convert to speech. Maximum 10,000 characters.

voice\_id

`string`requireddefault: English\_expressive\_narratorThe voice ID to use for synthesis

volume

`number`requireddefault: 1maximum: 10minimum: 0Speech volume (0 to 10)

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
