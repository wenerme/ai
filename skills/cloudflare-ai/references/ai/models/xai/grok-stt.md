---
description: xAI's Grok speech-to-text model. Transcribes audio files into text across 25 languages with word-level timestamps, multichannel transcription, speaker diarization, and key-term biasing.
title: Grok STT
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok STT

Automatic Speech Recognition • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-stt/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-stt`

* Third-party

xAI's Grok speech-to-text model. Transcribes audio files into text across 25 languages with word-level timestamps, multichannel transcription, speaker diarization, and key-term biasing.

| Model Info        |                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                  |
| More information  | [link ↗](https://docs.x.ai/developers/model-capabilities/audio/speech-to-text)                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-stt) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-stt',
  { url: 'https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-stt",
  "input": {
    "url": "https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3"
  }
}'
```

How old is the Brooklyn Bridge?

```json
{
  "state": "Completed",
  "result": {
    "text": "How old is the Brooklyn Bridge?",
    "language": "English",
    "duration": 1.85,
    "words": [
      {
        "text": "How",
        "start": 0.14,
        "end": 0.28
      },
      {
        "text": "old",
        "start": 0.4,
        "end": 0.6
      },
      {
        "text": "is",
        "start": 0.65,
        "end": 0.75
      },
      {
        "text": "the",
        "start": 0.81,
        "end": 0.89
      },
      {
        "text": "Brooklyn",
        "start": 0.95,
        "end": 1.29
      },
      {
        "text": "Bridge?",
        "start": 1.35,
        "end": 1.69
      }
    ]
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**With Language and Formatting** — Enable Inverse Text Normalization so spoken numbers become digits

```ts
const response = await env.AI.run(
  'xai/grok-stt',
  {
    url: 'https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3',
    language: 'en',
    format: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-stt",
  "input": {
    "url": "https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3",
    "language": "en",
    "format": true
  }
}'
```

How old is the Brooklyn Bridge?

```json
{
  "state": "Completed",
  "result": {
    "text": "How old is the Brooklyn Bridge?",
    "language": "English",
    "duration": 1.85,
    "words": [
      {
        "text": "How",
        "start": 0.14,
        "end": 0.28
      },
      {
        "text": "old",
        "start": 0.4,
        "end": 0.6
      },
      {
        "text": "is",
        "start": 0.65,
        "end": 0.75
      },
      {
        "text": "the",
        "start": 0.81,
        "end": 0.89
      },
      {
        "text": "Brooklyn",
        "start": 0.95,
        "end": 1.29
      },
      {
        "text": "Bridge?",
        "start": 1.35,
        "end": 1.69
      }
    ]
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Speaker Diarization with Key Terms** — Identify speakers and bias transcription toward proper nouns

```ts
const response = await env.AI.run(
  'xai/grok-stt',
  {
    url: 'https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3',
    language: 'en',
    diarize: true,
    keyterm: ['Brooklyn', 'Manhattan'],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-stt",
  "input": {
    "url": "https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3",
    "language": "en",
    "diarize": true,
    "keyterm": [
      "Brooklyn",
      "Manhattan"
    ]
  }
}'
```

How old is the Brooklyn Bridge?

```json
{
  "state": "Completed",
  "result": {
    "text": "How old is the Brooklyn Bridge?",
    "language": "English",
    "duration": 1.85,
    "words": [
      {
        "text": "How",
        "start": 0.14,
        "end": 0.28,
        "speaker": 0
      },
      {
        "text": "old",
        "start": 0.4,
        "end": 0.6,
        "speaker": 0
      },
      {
        "text": "is",
        "start": 0.65,
        "end": 0.75,
        "speaker": 0
      },
      {
        "text": "the",
        "start": 0.81,
        "end": 0.89,
        "speaker": 0
      },
      {
        "text": "Brooklyn",
        "start": 0.95,
        "end": 1.29,
        "speaker": 0
      },
      {
        "text": "Bridge?",
        "start": 1.35,
        "end": 1.69,
        "speaker": 0
      }
    ]
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Filler Words Preserved** — Keep filler words (uh, um, er) in the transcript instead of removing them

```ts
const response = await env.AI.run(
  'xai/grok-stt',
  {
    url: 'https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3',
    language: 'en',
    filler_words: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-stt",
  "input": {
    "url": "https://storage.googleapis.com/cloud-samples-data/speech/brooklyn_bridge.mp3",
    "language": "en",
    "filler_words": true
  }
}'
```

How old is the Brooklyn Bridge?

```json
{
  "state": "Completed",
  "result": {
    "text": "How old is the Brooklyn Bridge?",
    "language": "English",
    "duration": 1.85,
    "words": [
      {
        "text": "How",
        "start": 0.14,
        "end": 0.28
      },
      {
        "text": "old",
        "start": 0.4,
        "end": 0.6
      },
      {
        "text": "is",
        "start": 0.65,
        "end": 0.75
      },
      {
        "text": "the",
        "start": 0.81,
        "end": 0.89
      },
      {
        "text": "Brooklyn",
        "start": 0.95,
        "end": 1.29
      },
      {
        "text": "Bridge?",
        "start": 1.35,
        "end": 1.69
      }
    ]
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Data URI Upload** — Pass the audio file directly as a base64 data URI (mutually exclusive with \`url\`)

```ts
const response = await env.AI.run(
  'xai/grok-stt',
  { file: 'data:audio/wav;base64,<...>' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-stt",
  "input": {
    "file": "data:audio/wav;base64,<...>"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "text": "",
    "language": "",
    "duration": 1
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

file

`string`Audio file as a data URI (data:audio/...;base64,...) or an HTTPS URL the gateway fetches and uploads. Supported container formats: flac, mp3, mp4, m4a, mkv, ogg, opus, wav, aac. Raw formats (pcm, mulaw, alaw) also accepted — supply audio\_format and sample\_rate. Gateway-side size limit: 25 MB. Mutually exclusive with \`url\`.

url

`string`format: uriHTTPS URL of an audio file for xAI to fetch server-side. Mutually exclusive with \`file\` and \`websocket\`. No gateway-side size limit applies.

websocket

`boolean`Enable WebSocket streaming for speech-to-text. When true, establishes a bidirectional WebSocket connection for real-time audio transcription. Mutually exclusive with \`file\` and \`url\`.

audio\_format

`string`enum: pcm, mulaw, alawFormat hint for raw/headerless audio. Required for pcm, mulaw, alaw. Omit for container formats (mp3, wav, etc.) — xAI auto-detects them.

sample\_rate

`integer`minimum: \-9007199254740991maximum: 9007199254740991Sample rate in Hz. Required when audio\_format is set.

language

`string`Language code (e.g. "en", "fr", "de"). Used with format=true to enable Inverse Text Normalization. xAI transcribes in any language regardless — supplying this enables number/currency formatting in the transcript.

format

`boolean`When true, enables Inverse Text Normalization — spoken numbers and currencies are converted to written form (e.g. "one hundred dollars" → "$100"). Requires language to be set.

diarize

`boolean`When true, enables speaker diarization. Each word in the response includes a \`speaker\` integer identifying the detected speaker.

filler\_words

`boolean`When true, filler words (uh, um, er) are included in the transcript. Defaults to false — filler words are removed.

multichannel

`boolean`When true, each audio channel is transcribed independently. Results are returned in the \`channels\` array. Requires channels ≥ 2.

channels

`integer`minimum: 2maximum: 8Number of audio channels (2–8). Required only for multichannel raw audio; auto-detected for container formats.

▶keyterm\[\]

`array`maxItems: 100Key terms to bias transcription toward (e.g. product names, proper nouns). Each term up to 50 characters, max 100 terms. Sent as repeated form fields: keyterm=Term+One&keyterm=Term+Two.

text

`string`Full transcript text.

language

`string`Detected language name (e.g. "English", "French").

duration

`number`Audio duration in seconds (2 d.p.).

▶words\[\]

`array`Word-level segments. Each entry has text, start, end (seconds). Includes speaker integer when diarize=true.

▶channels\[\]

`array`Per-channel transcripts when multichannel=true.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-stt/#page","headline":"Grok STT (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok speech-to-text model. Transcribes audio files into text across 25 languages with word-level timestamps, multichannel transcription, speaker diarization, and key-term biasing.","url":"https://developers.cloudflare.com/ai/models/xai/grok-stt/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
