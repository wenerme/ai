---
title: TTS-1
description: OpenAI's text-to-speech model optimized for real-time use with low latency.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  TTS-1 

Text-to-Speech • OpenAI • Proxied 

`openai/tts-1` 

OpenAI's text-to-speech model optimized for real-time use with low latency.

| Model Info        |                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                         |
| More information  | [link ↗](https://platform.openai.com/docs/guides/text-to-speech)                                               |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/tts-1) |

## Usage

* [ TypeScript ](#tab-panel-1130)
* [ cURL ](#tab-panel-1131)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    response_format: 'mp3',

    speed: 1,

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

    voice: 'alloy',

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

  "model": "openai/tts-1",

  "input": {

    "response_format": "mp3",

    "speed": 1,

    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",

    "voice": "alloy"

  }

}'


```

* [ Output ](#tab-panel-1126)
* [ Raw response ](#tab-panel-1127)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/simple-speech.mp3"

  },

  "state": "Completed"

}


```

## Examples

**Different Voice**  — Use the Nova voice for a different tone 

* [ TypeScript ](#tab-panel-1134)
* [ cURL ](#tab-panel-1135)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    response_format: 'mp3',

    speed: 1,

    text: 'The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.',

    voice: 'nova',

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

  "model": "openai/tts-1",

  "input": {

    "response_format": "mp3",

    "speed": 1,

    "text": "The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.",

    "voice": "nova"

  }

}'


```

* [ Output ](#tab-panel-1128)
* [ Raw response ](#tab-panel-1129)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/different-voice.mp3"

  },

  "state": "Completed"

}


```

**Narration**  — Slower narration style with the Onyx voice 

* [ TypeScript ](#tab-panel-1138)
* [ cURL ](#tab-panel-1139)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    response_format: 'mp3',

    speed: 0.85,

    text: 'In the beginning, the universe was a singularity of infinite density. Then, in a fraction of a second, it expanded into everything we know today.',

    voice: 'onyx',

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

  "model": "openai/tts-1",

  "input": {

    "response_format": "mp3",

    "speed": 0.85,

    "text": "In the beginning, the universe was a singularity of infinite density. Then, in a fraction of a second, it expanded into everything we know today.",

    "voice": "onyx"

  }

}'


```

* [ Output ](#tab-panel-1132)
* [ Raw response ](#tab-panel-1133)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/narration.mp3"

  },

  "state": "Completed"

}


```

**Echo Voice**  — Use the Echo voice for a deeper tone 

* [ TypeScript ](#tab-panel-1142)
* [ cURL ](#tab-panel-1143)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    response_format: 'mp3',

    speed: 1,

    text: 'Welcome back to the podcast. Today we are going to talk about the future of artificial intelligence and its impact on creative work.',

    voice: 'echo',

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

  "model": "openai/tts-1",

  "input": {

    "response_format": "mp3",

    "speed": 1,

    "text": "Welcome back to the podcast. Today we are going to talk about the future of artificial intelligence and its impact on creative work.",

    "voice": "echo"

  }

}'


```

* [ Output ](#tab-panel-1136)
* [ Raw response ](#tab-panel-1137)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/echo-voice.mp3"

  },

  "state": "Completed"

}


```

**Fast Playback**  — Speed up speech for quick listening 

* [ TypeScript ](#tab-panel-1144)
* [ cURL ](#tab-panel-1145)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1',

  {

    response_format: 'mp3',

    speed: 1.5,

    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent, user growth exceeded expectations, and infrastructure costs remain stable.',

    voice: 'shimmer',

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

  "model": "openai/tts-1",

  "input": {

    "response_format": "mp3",

    "speed": 1.5,

    "text": "This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent, user growth exceeded expectations, and infrastructure costs remain stable.",

    "voice": "shimmer"

  }

}'


```

* [ Output ](#tab-panel-1140)
* [ Raw response ](#tab-panel-1141)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/fast-playback.mp3"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1146)
* [ Output ](#tab-panel-1147)

response\_format

`string`requireddefault: mp3enum: mp3, opus, wav, aac, flacThe output format for the audio. Supported formats are mp3, opus, wav, aac and flac.

speed

`number`requireddefault: 1maximum: 4minimum: 0.25The speed of the generated audio. Select a value from 0.25 to 4.0\. 1.0 is the default.

text

`string`requiredmaxLength: 4096The text to generate audio for. Maximum length is 4096 characters.

voice

`string`requireddefault: alloyenum: alloy, echo, fable, onyx, nova, shimmerThe voice to use when generating the audio. Defaults to alloy.

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
