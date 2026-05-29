---
title: MiniMax Music 2.6
description: MiniMax's music generation model that creates full-length songs with vocals from text prompts and lyrics, or instrumental tracks. Supports BPM/key control and auto-generated lyrics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Music 2.6 

Music Generation • MiniMax • Proxied 

`minimax/music-2.6` 

MiniMax's music generation model that creates full-length songs with vocals from text prompts and lyrics, or instrumental tracks. Supports BPM/key control and auto-generated lyrics.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms)                                                                            |
| More information  | [link ↗](https://www.minimaxi.com/)                                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/music-2.6) |

## Usage

* [ TypeScript ](#tab-panel-788)
* [ cURL ](#tab-panel-789)

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    is_instrumental: false,

    lyrics_optimizer: true,

    prompt: 'An upbeat electronic dance track with a catchy synth melody and driving beat',

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

  "model": "minimax/music-2.6",

  "input": {

    "is_instrumental": false,

    "lyrics_optimizer": true,

    "prompt": "An upbeat electronic dance track with a catchy synth melody and driving beat"

  }

}'


```

* [ Output ](#tab-panel-786)
* [ Raw response ](#tab-panel-787)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/music%2Fprod%2Ftts-20260417092034-QxSPMzdbiRxBSbDb.mp3"

  },

  "state": "Completed"

}


```

## Examples

**With Lyrics**  — Generate a song with custom lyrics 

* [ TypeScript ](#tab-panel-794)
* [ cURL ](#tab-panel-795)

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    is_instrumental: false,

    lyrics:

      'Walking down a dusty road\nWith the sunset painting gold\nEvery step a story told\nOf the places I call home',

    lyrics_optimizer: false,

    prompt: 'A warm acoustic folk ballad with fingerpicked guitar and gentle vocals',

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

  "model": "minimax/music-2.6",

  "input": {

    "is_instrumental": false,

    "lyrics": "Walking down a dusty road\nWith the sunset painting gold\nEvery step a story told\nOf the places I call home",

    "lyrics_optimizer": false,

    "prompt": "A warm acoustic folk ballad with fingerpicked guitar and gentle vocals"

  }

}'


```

* [ Output ](#tab-panel-790)
* [ Raw response ](#tab-panel-791)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/music%2Fprod%2Ftts-20260417091919-YiIxwmvIqXtREDcu.mp3"

  },

  "state": "Completed"

}


```

**Instrumental**  — Generate instrumental music without vocals 

* [ TypeScript ](#tab-panel-796)
* [ cURL ](#tab-panel-797)

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    is_instrumental: true,

    lyrics_optimizer: false,

    prompt: 'A calm lo-fi hip hop instrumental with vinyl crackle and mellow piano chords',

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

  "model": "minimax/music-2.6",

  "input": {

    "is_instrumental": true,

    "lyrics_optimizer": false,

    "prompt": "A calm lo-fi hip hop instrumental with vinyl crackle and mellow piano chords"

  }

}'


```

* [ Output ](#tab-panel-792)
* [ Raw response ](#tab-panel-793)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/music%2Fprod%2Ftts-20260417092057-LOwvBOOdyGvAyHkQ.mp3"

  },

  "state": "Completed"

}


```

**High Quality Audio**  — Specify audio format and sample rate 

* [ TypeScript ](#tab-panel-802)
* [ cURL ](#tab-panel-803)

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    format: 'wav',

    is_instrumental: false,

    lyrics_optimizer: true,

    prompt: 'An orchestral cinematic score building to an epic crescendo with full symphony',

    sample_rate: 44100,

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

  "model": "minimax/music-2.6",

  "input": {

    "format": "wav",

    "is_instrumental": false,

    "lyrics_optimizer": true,

    "prompt": "An orchestral cinematic score building to an epic crescendo with full symphony",

    "sample_rate": 44100

  }

}'


```

* [ Output ](#tab-panel-798)
* [ Raw response ](#tab-panel-799)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/music%2Fprod%2Ftts-20260417092208-UGTfqDggHaemCDAW.wav"

  },

  "state": "Completed"

}


```

**Auto-Generated Lyrics**  — Let the model generate lyrics from the prompt 

* [ TypeScript ](#tab-panel-804)
* [ cURL ](#tab-panel-805)

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    is_instrumental: false,

    lyrics_optimizer: true,

    prompt: 'A cheerful pop song about a summer road trip with friends',

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

  "model": "minimax/music-2.6",

  "input": {

    "is_instrumental": false,

    "lyrics_optimizer": true,

    "prompt": "A cheerful pop song about a summer road trip with friends"

  }

}'


```

* [ Output ](#tab-panel-800)
* [ Raw response ](#tab-panel-801)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/music%2Fprod%2Ftts-20260417092245-UlqOBbhqSXtRPopt.mp3"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-806)
* [ Output ](#tab-panel-807)

▶bitrate

`one of`

format

`string`enum: mp3, wavAudio format

is\_instrumental

`boolean`requireddefault: falseGenerate instrumental music (no vocals)

lyrics

`string`maxLength: 3500minLength: 1Song lyrics, using \\n to separate lines

lyrics\_optimizer

`boolean`requireddefault: falseAutomatically generate lyrics based on the prompt description

prompt

`string`requiredmaxLength: 2000Description of the music style, mood, and scenario

▶sample\_rate

`one of`

audio

`string`format: uriURL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
