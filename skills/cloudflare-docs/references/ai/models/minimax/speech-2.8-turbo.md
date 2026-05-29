---
title: MiniMax Speech 2.8 Turbo
description: MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Speech 2.8 Turbo 

Text-to-Speech • MiniMax • Proxied 

`minimax/speech-2.8-turbo` 

MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.

| Model Info        |                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms)                                                                                   |
| More information  | [link ↗](https://www.minimaxi.com/)                                                                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-turbo) |

## Usage

* [ TypeScript ](#tab-panel-830)
* [ cURL ](#tab-panel-831)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

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

  "model": "minimax/speech-2.8-turbo",

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

* [ Output ](#tab-panel-826)
* [ Raw response ](#tab-panel-827)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/simple-speech.mp3"

  },

  "state": "Completed"

}


```

## Examples

**Fast Narration**  — Speed up narration for quick playback 

* [ TypeScript ](#tab-panel-834)
* [ cURL ](#tab-panel-835)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    format: 'mp3',

    pitch: 0,

    speed: 1.5,

    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.',

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

  "model": "minimax/speech-2.8-turbo",

  "input": {

    "format": "mp3",

    "pitch": 0,

    "speed": 1.5,

    "text": "This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-828)
* [ Raw response ](#tab-panel-829)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/fast-narration.mp3"

  },

  "state": "Completed"

}


```

**Calm Tone**  — Calm and steady speech for meditation or relaxation 

* [ TypeScript ](#tab-panel-838)
* [ cURL ](#tab-panel-839)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    emotion: 'calm',

    format: 'mp3',

    pitch: 0,

    speed: 0.8,

    text: 'Take a deep breath in. Hold it for a moment. Now slowly exhale. Let your shoulders relax and release any tension.',

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

  "model": "minimax/speech-2.8-turbo",

  "input": {

    "emotion": "calm",

    "format": "mp3",

    "pitch": 0,

    "speed": 0.8,

    "text": "Take a deep breath in. Hold it for a moment. Now slowly exhale. Let your shoulders relax and release any tension.",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-832)
* [ Raw response ](#tab-panel-833)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/calm-tone.mp3"

  },

  "state": "Completed"

}


```

**Adjusted Pitch**  — Lower the pitch for a deeper voice 

* [ TypeScript ](#tab-panel-840)
* [ cURL ](#tab-panel-841)

TypeScript

```

const response = await env.AI.run(

  'minimax/speech-2.8-turbo',

  {

    format: 'mp3',

    pitch: -6,

    speed: 1,

    text: 'Good evening. Tonight we explore the mysteries of the deep ocean and the creatures that live in total darkness.',

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

  "model": "minimax/speech-2.8-turbo",

  "input": {

    "format": "mp3",

    "pitch": -6,

    "speed": 1,

    "text": "Good evening. Tonight we explore the mysteries of the deep ocean and the creatures that live in total darkness.",

    "voice_id": "English_expressive_narrator",

    "volume": 1

  }

}'


```

* [ Output ](#tab-panel-836)
* [ Raw response ](#tab-panel-837)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/adjusted-pitch.mp3"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-842)
* [ Output ](#tab-panel-843)

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
