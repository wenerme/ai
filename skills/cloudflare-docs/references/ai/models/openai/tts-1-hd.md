---
title: TTS-1 HD
description: OpenAI's high-definition text-to-speech model producing higher quality audio output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  TTS-1 HD 

Text-to-Speech • OpenAI • Proxied 

`openai/tts-1-hd` 

OpenAI's high-definition text-to-speech model producing higher quality audio output.

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                            |
| More information  | [link ↗](https://platform.openai.com/docs/guides/text-to-speech)                                                  |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/tts-1-hd) |

## Usage

* [ TypeScript ](#tab-panel-1188)
* [ cURL ](#tab-panel-1189)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

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

  "model": "openai/tts-1-hd",

  "input": {

    "response_format": "mp3",

    "speed": 1,

    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",

    "voice": "alloy"

  }

}'


```

* [ Output ](#tab-panel-1184)
* [ Raw response ](#tab-panel-1185)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/simple-speech.mp3"

  },

  "state": "Completed"

}


```

## Examples

**Storytelling**  — HD narration with the Fable voice 

* [ TypeScript ](#tab-panel-1192)
* [ cURL ](#tab-panel-1193)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

  {

    response_format: 'mp3',

    speed: 0.9,

    text: 'Once upon a time, in a kingdom beyond the clouds, there lived a young inventor who dreamed of building machines that could think.',

    voice: 'fable',

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

  "model": "openai/tts-1-hd",

  "input": {

    "response_format": "mp3",

    "speed": 0.9,

    "text": "Once upon a time, in a kingdom beyond the clouds, there lived a young inventor who dreamed of building machines that could think.",

    "voice": "fable"

  }

}'


```

* [ Output ](#tab-panel-1186)
* [ Raw response ](#tab-panel-1187)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/storytelling.mp3"

  },

  "state": "Completed"

}


```

**Podcast Style**  — Conversational podcast narration 

* [ TypeScript ](#tab-panel-1196)
* [ cURL ](#tab-panel-1197)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

  {

    response_format: 'mp3',

    speed: 1,

    text: "So here's the thing about large language models — they're not actually thinking. They're predicting the next token based on patterns in their training data. But the results can be surprisingly coherent.",

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

  "model": "openai/tts-1-hd",

  "input": {

    "response_format": "mp3",

    "speed": 1,

    "text": "So here'\''s the thing about large language models — they'\''re not actually thinking. They'\''re predicting the next token based on patterns in their training data. But the results can be surprisingly coherent.",

    "voice": "echo"

  }

}'


```

* [ Output ](#tab-panel-1190)
* [ Raw response ](#tab-panel-1191)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/podcast-style.mp3"

  },

  "state": "Completed"

}


```

**Shimmer Voice**  — Bright and expressive voice 

* [ TypeScript ](#tab-panel-1198)
* [ cURL ](#tab-panel-1199)

TypeScript

```

const response = await env.AI.run(

  'openai/tts-1-hd',

  {

    response_format: 'mp3',

    speed: 1,

    text: 'Breaking news: scientists have discovered a new species of deep-sea fish that produces its own light using bioluminescence.',

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

  "model": "openai/tts-1-hd",

  "input": {

    "response_format": "mp3",

    "speed": 1,

    "text": "Breaking news: scientists have discovered a new species of deep-sea fish that produces its own light using bioluminescence.",

    "voice": "shimmer"

  }

}'


```

* [ Output ](#tab-panel-1194)
* [ Raw response ](#tab-panel-1195)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/shimmer-voice.mp3"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1200)
* [ Output ](#tab-panel-1201)

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
