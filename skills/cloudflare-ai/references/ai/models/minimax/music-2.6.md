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

Music Generation • MiniMax

`minimax/music-2.6`

MiniMax's music generation model that creates full-length songs with vocals from text prompts and lyrics, or instrumental tracks. Supports BPM/key control and auto-generated lyrics.

| Model Info          |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.minimaxi.com/terms)                                                                            |
| More information    | [link ↗](https://www.minimaxi.com/)                                                                                 |
| Zero data retention | Yes                                                                                                                 |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/music-2.6) |

## Usage

* [ TypeScript ](#tab-panel-978)
* [ cURL ](#tab-panel-979)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/music-2.6',
  {
    prompt: 'An upbeat electronic dance track with a catchy synth melody and driving beat',
    is_instrumental: false,
    lyrics_optimizer: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/music-2.6",
  "input": {
    "prompt": "An upbeat electronic dance track with a catchy synth melody and driving beat",
    "is_instrumental": false,
    "lyrics_optimizer": true
  }
}'
```

* [ Output ](#tab-panel-976)
* [ Raw response ](#tab-panel-977)

```json
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

* [ TypeScript ](#tab-panel-984)
* [ cURL ](#tab-panel-985)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/music-2.6',
  {
    prompt: 'A warm acoustic folk ballad with fingerpicked guitar and gentle vocals',
    is_instrumental: false,
    lyrics:
      'Walking down a dusty road\nWith the sunset painting gold\nEvery step a story told\nOf the places I call home',
    lyrics_optimizer: false,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/music-2.6",
  "input": {
    "prompt": "A warm acoustic folk ballad with fingerpicked guitar and gentle vocals",
    "is_instrumental": false,
    "lyrics": "Walking down a dusty road\nWith the sunset painting gold\nEvery step a story told\nOf the places I call home",
    "lyrics_optimizer": false
  }
}'
```

* [ Output ](#tab-panel-980)
* [ Raw response ](#tab-panel-981)

```json
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

* [ TypeScript ](#tab-panel-986)
* [ cURL ](#tab-panel-987)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/music-2.6',
  {
    prompt: 'A calm lo-fi hip hop instrumental with vinyl crackle and mellow piano chords',
    is_instrumental: true,
    lyrics_optimizer: false,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/music-2.6",
  "input": {
    "prompt": "A calm lo-fi hip hop instrumental with vinyl crackle and mellow piano chords",
    "is_instrumental": true,
    "lyrics_optimizer": false
  }
}'
```

* [ Output ](#tab-panel-982)
* [ Raw response ](#tab-panel-983)

```json
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

* [ TypeScript ](#tab-panel-992)
* [ cURL ](#tab-panel-993)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/music-2.6',
  {
    prompt: 'An orchestral cinematic score building to an epic crescendo with full symphony',
    format: 'wav',
    is_instrumental: false,
    lyrics_optimizer: true,
    sample_rate: 44100,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/music-2.6",
  "input": {
    "prompt": "An orchestral cinematic score building to an epic crescendo with full symphony",
    "format": "wav",
    "is_instrumental": false,
    "lyrics_optimizer": true,
    "sample_rate": 44100
  }
}'
```

* [ Output ](#tab-panel-988)
* [ Raw response ](#tab-panel-989)

```json
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

* [ TypeScript ](#tab-panel-994)
* [ cURL ](#tab-panel-995)

**TypeScript**

```ts
const response = await env.AI.run(
  'minimax/music-2.6',
  {
    prompt: 'A cheerful pop song about a summer road trip with friends',
    is_instrumental: false,
    lyrics_optimizer: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/music-2.6",
  "input": {
    "prompt": "A cheerful pop song about a summer road trip with friends",
    "is_instrumental": false,
    "lyrics_optimizer": true
  }
}'
```

* [ Output ](#tab-panel-990)
* [ Raw response ](#tab-panel-991)

```json
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

* [ Input ](#tab-panel-996)
* [ Output ](#tab-panel-997)

prompt

`string`requiredmaxLength: 2000Description of the music style, mood, and scenario

lyrics

`string`minLength: 1maxLength: 3500Song lyrics, using \\n to separate lines

▶sample\_rate

`one of`

▶bitrate

`one of`

format

`string`enum: mp3, wavAudio format

lyrics\_optimizer

`boolean`requireddefault: falseAutomatically generate lyrics based on the prompt description

is\_instrumental

`boolean`requireddefault: falseGenerate instrumental music (no vocals)

audio

`string`format: uriURL to the generated audio file

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/minimax/music-2.6/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/minimax/music-2.6/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/minimax/music-2.6/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/minimax/music-2.6/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/music-2.6/#page","headline":"MiniMax Music 2.6 (MiniMax) · Cloudflare AI docs · Cloudflare AI docs","description":"MiniMax's music generation model that creates full-length songs with vocals from text prompts and lyrics, or instrumental tracks. Supports BPM/key control and auto-generated lyrics.","url":"https://developers.cloudflare.com/ai/models/minimax/music-2.6/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
