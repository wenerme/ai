---
description: ElevenLabs Scribe v3 is ElevenLabs' most accurate speech recognition model for recorded audio, with 90+ languages, speaker diarization for up to 32 speakers, word-level timestamps, audio event tags, keyterm prompting, numbers as digits or words, and secondary languages for mixed-language audio.
title: Scribe v3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ElevenLabs logo](https://developers.cloudflare.com/_astro/elevenlabs.0RXw7U95.svg)

# Scribe v3

Automatic Speech Recognition • ElevenLabs

Model ID

`elevenlabs/scribe-v3` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

ElevenLabs Scribe v3 is ElevenLabs' most accurate speech recognition model for recorded audio, with 90+ languages, speaker diarization for up to 32 speakers, word-level timestamps, audio event tags, keyterm prompting, numbers as digits or words, and secondary languages for mixed-language audio.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://elevenlabs.io/terms) |
| More information | [link ↗](https://elevenlabs.io/docs/api-reference/speech-to-text/convert) |
| Pricing | <ul><li>Per audio minute$0.003333</li><li>Per minute (key terms)$0.000833</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'elevenlabs/scribe-v3',
  {
    source_url: 'https://storage.googleapis.com/cloud-samples-data/speech/commercial_mono.wav',
    language_code: 'en',
    diarize: true,
    num_speakers: 2,
    numbers_format: 'digits',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/scribe-v3",
  "input": {
    "source_url": "https://storage.googleapis.com/cloud-samples-data/speech/commercial_mono.wav",
    "language_code": "en",
    "diarize": true,
    "num_speakers": 2,
    "numbers_format": "digits"
  }
}'
```

```
Okay, I'm here. Hi. I'd like to buy a Chromecast, and I was wondering whether you could help me with that. Uh, certainly. Which color would you like? We have blue, black, and red. Let's get the black one. Uh, okay, great. Would you like the new Chromecast Ultra model or the regular Chromecast? Mm, regular Chromecast is fine. Okay, sure. Would you like to ship it regular or express? Express, please. Terrific. It's, uh, on the way. Thank you very much. [phone buzzing] Thank you. Bye.
```

```json
{
  "state": "Completed",
  "result": {
    "text": "Okay, I'm here. Hi. I'd like to buy a Chromecast, and I was wondering whether you could help me with that. Uh, certainly. Which color would you like? We have blue, black, and red. Let's get the black one. Uh, okay, great. Would you like the new Chromecast Ultra model or the regular Chromecast? Mm, regular Chromecast is fine. Okay, sure. Would you like to ship it regular or express? Express, please. Terrific. It's, uh, on the way. Thank you very much. [phone buzzing] Thank you. Bye.",
    "language_code": "eng",
    "language_probability": 1,
    "words": [
      {
        "text": "Okay,",
        "type": "word",
        "logprob": -0.0009961870033293962,
        "start": 2.42,
        "end": 2.52,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000014305104514278355,
        "start": 2.52,
        "end": 2.6,
        "speaker_id": "speaker_0"
      },
      {
        "text": "I'm",
        "type": "word",
        "logprob": -0.000001549719551500554,
        "start": 2.6,
        "end": 2.7,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000008821448318485636,
        "start": 2.7,
        "end": 2.74,
        "speaker_id": "speaker_0"
      },
      {
        "text": "here.",
        "type": "word",
        "logprob": -0.000007510153454859392,
        "start": 2.74,
        "end": 2.9,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": 0,
        "start": 2.9,
        "end": 2.9,
        "speaker_id": "speaker_0"
      },
      {
        "text": "Hi.",
        "type": "word",
        "logprob": -0.010061527595098596,
        "start": 4.74,
        "end": 5.04,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -4.768370445162873e-7,
        "start": 5.04,
        "end": 5.04,
        "speaker_id": "speaker_1"
      },
      {
        "text": "I'd",
        "type": "word",
        "logprob": -0.000001390773415247774,
        "start": 5.44,
        "end": 5.54,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000029802276912960224,
        "start": 5.54,
        "end": 5.56,
        "speaker_id": "speaker_1"
      },
      {
        "text": "like",
        "type": "word",
        "logprob": -0.0000029802276912960224,
        "start": 5.56,
        "end": 5.7,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": 0,
        "start": 5.7,
        "end": 5.74,
        "speaker_id": "speaker_1"
      },
      {
        "text": "to",
        "type": "word",
        "logprob": 0,
        "start": 5.74,
        "end": 5.82,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000022053474822314456,
        "start": 5.82,
        "end": 5.84,
        "speaker_id": "speaker_1"
      },
      {
        "text": "buy",
        "type": "word",
        "logprob": -0.000022053474822314456,
        "start": 5.84,
        "end": 5.96,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -3.576278118089249e-7,
        "start": 5.96,
        "end": 6.02,
        "speaker_id": "speaker_1"
      },
      {
        "text": "a",
        "type": "word",
        "logprob": -3.576278118089249e-7,
        "start": 6.02,
        "end": 6.08,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00020561488054227084,
        "start": 6.08,
        "end": 6.12,
        "speaker_id": "speaker_1"
      },
      {
        "text": "Chromecast,",
        "type": "word",
        "logprob": -0.0007269590727942573,
        "start": 6.12,
        "end": 6.78,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000019073468138230965,
        "start": 6.78,
        "end": 6.96,
        "speaker_id": "speaker_1"
      },
      {
        "text": "and",
        "type": "word",
        "logprob": -0.0000019073468138230965,
        "start": 6.96,
        "end": 7.04,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -2.3841855067985307e-7,
        "start": 7.04,
        "end": 7.08,
        "speaker_id": "speaker_1"
      },
      {
        "text": "I",
        "type": "word",
        "logprob": -2.3841855067985307e-7,
        "start": 7.08,
        "end": 7.12,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000029802276912960224,
        "start": 7.12,
        "end": 7.14,
        "speaker_id": "speaker_1"
      },
      {
        "text": "was",
        "type": "word",
        "logprob": -0.0000029802276912960224,
        "start": 7.14,
        "end": 7.24,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000028132995794294402,
        "start": 7.24,
        "end": 7.28,
        "speaker_id": "speaker_1"
      },
      {
        "text": "wondering",
        "type": "word",
        "logprob": -0.000028132995794294402,
        "start": 7.28,
        "end": 7.58,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000004172316494077677,
        "start": 7.58,
        "end": 7.62,
        "speaker_id": "speaker_1"
      },
      {
        "text": "whether",
        "type": "word",
        "logprob": -0.000004172316494077677,
        "start": 7.62,
        "end": 7.82,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -8.344646857949556e-7,
        "start": 7.82,
        "end": 7.88,
        "speaker_id": "speaker_1"
      },
      {
        "text": "you",
        "type": "word",
        "logprob": -8.344646857949556e-7,
        "start": 7.88,
        "end": 7.92,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000015735502529423684,
        "start": 7.92,
        "end": 7.96,
        "speaker_id": "speaker_1"
      },
      {
        "text": "could",
        "type": "word",
        "logprob": -0.000015735502529423684,
        "start": 7.96,
        "end": 8.06,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00002109982233378105,
        "start": 8.06,
        "end": 8.1,
        "speaker_id": "speaker_1"
      },
      {
        "text": "help",
        "type": "word",
        "logprob": -0.00002109982233378105,
        "start": 8.1,
        "end": 8.24,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": 0,
        "start": 8.24,
        "end": 8.28,
        "speaker_id": "speaker_1"
      },
      {
        "text": "me",
        "type": "word",
        "logprob": 0,
        "start": 8.28,
        "end": 8.38,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000020265558760002023,
        "start": 8.38,
        "end": 8.4,
        "speaker_id": "speaker_1"
      },
      {
        "text": "with",
        "type": "word",
        "logprob": -0.0000020265558760002023,
        "start": 8.42,
        "end": 8.52,
        "speaker_id": "speaker_1"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -3.576278118089249e-7,
        "start": 8.52,
        "end": 8.56,
        "speaker_id": "speaker_1"
      },
      {

... response truncated ...
```

## Examples

<details>

<summary>**Audio Events** — Transcribe with word timestamps and tag non-speech sounds such as laughter</summary>



```ts
const response = await env.AI.run(
  'elevenlabs/scribe-v3',
  {
    source_url: 'https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3',
    language_code: 'en',
    tag_audio_events: true,
    diarize: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/scribe-v3",
  "input": {
    "source_url": "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3",
    "language_code": "en",
    "tag_audio_events": true,
    "diarize": true
  }
}'
```

```
With a soft and whispery American accent, I'm the ideal choice for creating ASMR content, meditative guides, or adding an intimate feel to your narrative projects.
```

```json
{
  "state": "Completed",
  "result": {
    "text": "With a soft and whispery American accent, I'm the ideal choice for creating ASMR content, meditative guides, or adding an intimate feel to your narrative projects.",
    "language_code": "eng",
    "language_probability": 1,
    "words": [
      {
        "text": "With",
        "type": "word",
        "logprob": -0.00004100715523236431,
        "start": 0.12,
        "end": 0.24,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -2.3841855067985307e-7,
        "start": 0.24,
        "end": 0.3,
        "speaker_id": "speaker_0"
      },
      {
        "text": "a",
        "type": "word",
        "logprob": -2.3841855067985307e-7,
        "start": 0.3,
        "end": 0.4,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000032066785934148356,
        "start": 0.4,
        "end": 0.5,
        "speaker_id": "speaker_0"
      },
      {
        "text": "soft",
        "type": "word",
        "logprob": -0.000032066785934148356,
        "start": 0.5,
        "end": 1.02,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000029802276912960224,
        "start": 1.02,
        "end": 1.22,
        "speaker_id": "speaker_0"
      },
      {
        "text": "and",
        "type": "word",
        "logprob": -0.0000029802276912960224,
        "start": 1.22,
        "end": 1.32,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.015721073374152184,
        "start": 1.32,
        "end": 1.44,
        "speaker_id": "speaker_0"
      },
      {
        "text": "whispery",
        "type": "word",
        "logprob": -0.013756341533081695,
        "start": 1.44,
        "end": 1.9,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000011086402082582936,
        "start": 1.9,
        "end": 2.2,
        "speaker_id": "speaker_0"
      },
      {
        "text": "American",
        "type": "word",
        "logprob": -0.000011086402082582936,
        "start": 2.2,
        "end": 2.68,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000007271740287251305,
        "start": 2.68,
        "end": 2.84,
        "speaker_id": "speaker_0"
      },
      {
        "text": "accent,",
        "type": "word",
        "logprob": -0.000019021801303357018,
        "start": 2.84,
        "end": 3.32,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00001549708758830093,
        "start": 3.32,
        "end": 3.32,
        "speaker_id": "speaker_0"
      },
      {
        "text": "I'm",
        "type": "word",
        "logprob": -0.0003584757531219414,
        "start": 4.24,
        "end": 4.46,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -2.3841855067985307e-7,
        "start": 4.46,
        "end": 4.54,
        "speaker_id": "speaker_0"
      },
      {
        "text": "the",
        "type": "word",
        "logprob": -2.3841855067985307e-7,
        "start": 4.54,
        "end": 4.62,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000037788631743751466,
        "start": 4.62,
        "end": 4.72,
        "speaker_id": "speaker_0"
      },
      {
        "text": "ideal",
        "type": "word",
        "logprob": -0.000037788631743751466,
        "start": 4.72,
        "end": 5.06,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000010967194612021558,
        "start": 5.06,
        "end": 5.22,
        "speaker_id": "speaker_0"
      },
      {
        "text": "choice",
        "type": "word",
        "logprob": -0.000010967194612021558,
        "start": 5.22,
        "end": 5.68,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000015497195136049413,
        "start": 5.68,
        "end": 6.1,
        "speaker_id": "speaker_0"
      },
      {
        "text": "for",
        "type": "word",
        "logprob": -0.0000015497195136049413,
        "start": 6.1,
        "end": 6.22,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00002098061486321967,
        "start": 6.22,
        "end": 6.26,
        "speaker_id": "speaker_0"
      },
      {
        "text": "creating",
        "type": "word",
        "logprob": -0.00002098061486321967,
        "start": 6.26,
        "end": 6.88,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00010525626566959545,
        "start": 6.88,
        "end": 7,
        "speaker_id": "speaker_0"
      },
      {
        "text": "ASMR",
        "type": "word",
        "logprob": -0.00006925755224074237,
        "start": 7,
        "end": 7.72,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000010371154530730564,
        "start": 7.72,
        "end": 7.86,
        "speaker_id": "speaker_0"
      },
      {
        "text": "content,",
        "type": "word",
        "logprob": -0.000009372783097205684,
        "start": 7.86,
        "end": 8.38,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00033361115492880344,
        "start": 8.38,
        "end": 8.38,
        "speaker_id": "speaker_0"
      },
      {
        "text": "meditative",
        "type": "word",
        "logprob": -0.00033361115492880344,
        "start": 9.08,
        "end": 9.6,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000507818695041351,
        "start": 9.6,
        "end": 9.7,
        "speaker_id": "speaker_0"
      },
      {
        "text": "guides,",
        "type": "word",
        "logprob": -0.0002598305270242106,
        "start": 9.7,
        "end": 10.18,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000005722029527532868,
        "start": 10.18,
        "end": 10.18,
        "speaker_id": "speaker_0"
      },
      {
        "text": "or",
        "type": "word",
        "logprob": -0.000005722029527532868,
        "start": 11.34,
        "end": 11.48,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00000965590606938349,
        "start": 11.48,
        "end": 11.58,
        "speaker_id": "speaker_0"
      },
      {
        "text": "adding",
        "type": "word",
        "logprob": -0.00000965590606938349,
        "start": 11.58,
        "end": 11.92,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000010609570381348021,
        "start": 11.92,
        "end": 11.98,
        "speaker_id": "speaker_0"
      },
      {
        "text": "an",
        "type": "word",
        "logprob": -0.000010609570381348021,
        "start": 11.98,
        "end": 12.12,
        "speaker_id": "speaker_0"
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000037788631743751466,
        "start": 12.12,
        "end": 12.2,
        "speaker_id": "speaker_0"
      },
      {
        "text": "intimate",
        "type": "word",
        "logprob": -0.000037788631743751466,
        "start": 12.2,
        "end": 12.56,
        "speaker_id": "speaker_0"
      },

... response truncated ...
```

</details>

<details>

<summary>**Automatic Language Detection** — Transcribe French audio with no language hint; Scribe detects the language</summary>



```ts
const response = await env.AI.run(
  'elevenlabs/scribe-v3',
  {
    source_url: 'https://storage.googleapis.com/cloud-samples-data/speech/corbeau_renard.flac',
    timestamps_granularity: 'none',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/scribe-v3",
  "input": {
    "source_url": "https://storage.googleapis.com/cloud-samples-data/speech/corbeau_renard.flac",
    "timestamps_granularity": "none"
  }
}'
```

```
Maître Corbeau, sur un arbre perché, tenait en son bec un fromage. Maître Renard, par l'odeur alléché, lui tint à peu près ce langage : « Hé ! bonjour, monsieur du Corbeau. »
```

```json
{
  "state": "Completed",
  "result": {
    "text": "Maître Corbeau, sur un arbre perché, tenait en son bec un fromage. Maître Renard, par l'odeur alléché, lui tint à peu près ce langage : « Hé ! bonjour, monsieur du Corbeau. »",
    "language_code": "fra",
    "language_probability": 0.9803594946861267,
    "words": [
      {
        "text": "Maître",
        "type": "word",
        "logprob": -0.011800810675291965
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.1482163816690445
      },
      {
        "text": "Corbeau,",
        "type": "word",
        "logprob": -0.1044449663022533
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00006639736966462806
      },
      {
        "text": "sur",
        "type": "word",
        "logprob": -0.00006639736966462806
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000003576272320060525
      },
      {
        "text": "un",
        "type": "word",
        "logprob": -0.000003576272320060525
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00016652150952722877
      },
      {
        "text": "arbre",
        "type": "word",
        "logprob": -0.00016652150952722877
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.003065056400373578
      },
      {
        "text": "perché,",
        "type": "word",
        "logprob": -0.0026305119918106357
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.06317463517189026
      },
      {
        "text": "tenait",
        "type": "word",
        "logprob": -0.031594708507327596
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000005006777428206988
      },
      {
        "text": "en",
        "type": "word",
        "logprob": -0.000005006777428206988
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00003099393507000059
      },
      {
        "text": "son",
        "type": "word",
        "logprob": -0.00003099393507000059
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00033384948619641364
      },
      {
        "text": "bec",
        "type": "word",
        "logprob": -0.00033384948619641364
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00006103329360485077
      },
      {
        "text": "un",
        "type": "word",
        "logprob": -0.00006103329360485077
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00004911301948595792
      },
      {
        "text": "fromage.",
        "type": "word",
        "logprob": -0.000043420926090220746
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000428942235885188
      },
      {
        "text": "Maître",
        "type": "word",
        "logprob": -0.0001879608656357353
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.02000793069601059
      },
      {
        "text": "Renard,",
        "type": "word",
        "logprob": -0.008608494261904655
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000030397906812140718
      },
      {
        "text": "par",
        "type": "word",
        "logprob": -0.000030397906812140718
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0000020265558760002023
      },
      {
        "text": "l'odeur",
        "type": "word",
        "logprob": -0.0020720194518162316
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.004456469789147377
      },
      {
        "text": "alléché,",
        "type": "word",
        "logprob": -0.002393497434809433
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00006389413465512916
      },
      {
        "text": "lui",
        "type": "word",
        "logprob": -0.00006389413465512916
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0012462714221328497
      },
      {
        "text": "tint",
        "type": "word",
        "logprob": -0.0012462714221328497
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00005221230458118953
      },
      {
        "text": "à",
        "type": "word",
        "logprob": -0.00005221230458118953
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0002674698771443218
      },
      {
        "text": "peu",
        "type": "word",
        "logprob": -0.0002674698771443218
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0001212284987559542
      },
      {
        "text": "près",
        "type": "word",
        "logprob": -0.0001212284987559542
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.000030397906812140718
      },
      {
        "text": "ce",
        "type": "word",
        "logprob": -0.000030397906812140718
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.0009043894242495298
      },
      {
        "text": "langage",
        "type": "word",
        "logprob": -0.0009043894242495298
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.01156542357057333
      },
      {
        "text": ":",
        "type": "word",
        "logprob": -0.01156542357057333
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.015058765187859535
      },
      {
        "text": "«",
        "type": "word",
        "logprob": -0.015058765187859535
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.408755362033844
      },
      {
        "text": "Hé",
        "type": "word",
        "logprob": -0.408755362033844
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.002424398437142372
      },
      {
        "text": "!",
        "type": "word",
        "logprob": -0.002424398437142372
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.6351345777511597
      },
      {
        "text": "bonjour,",
        "type": "word",
        "logprob": -0.5557559572635
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.28182077407836914
      },
      {
        "text": "monsieur",
        "type": "word",
        "logprob": -0.28182077407836914
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.00016318420239258558
      },
      {
        "text": "du",
        "type": "word",
        "logprob": -0.00016318420239258558
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.011819451116025448
      },
      {
        "text": "Corbeau.",
        "type": "word",
        "logprob": -0.020815744501305744
      },
      {
        "text": " ",
        "type": "spacing",
        "logprob": -0.22597452998161316
      },
      {
        "text": "»",
        "type": "word",
        "logprob": -0.22597452998161316
      }
    ],
    "audio_duration_secs": 12.7869375,
    "transcription_id": "ZlXe3jSz4ASpWgeiTczb"
  }
}
```

</details>

## Parameters

file

`string`pattern: ^data:.\*Audio or video file as a data URI (data:audio/...;base64,...), up to 25 MB. Provide exactly one of file or source\_url.

source\_url

`string`pattern: ^https:\\/\\/.\*HTTPS URL of an audio or video file for ElevenLabs to fetch, including YouTube and TikTok links. Provide exactly one of file or source\_url.

language\_code

`string`minLength: 2maxLength: 3ISO-639-1 or ISO-639-3 code of the main language (e.g. "en" or "eng"). Detected automatically when omitted.

tag\_audio\_events

`boolean`Tag non-speech sounds such as (laughter) or (applause) in the transcript.

diarize

`boolean`Label which speaker said each word (speaker\_id).

num\_speakers

`integer`minimum: 1maximum: 32Maximum number of speakers in the audio, up to 32. Helps diarization.

diarization\_threshold

`number`minimum: 0maximum: 1Higher values make one speaker less likely to be split in two. Only with diarize=true and no num\_speakers.

timestamps\_granularity

`string`enum: none, word, characterTimestamp detail in words\[]: none, word (default) or character.

file\_format

`string`enum: pcm\_s16le\_16, otherpcm\_s16le\_16 for raw 16-bit, 16 kHz, mono, little-endian PCM (lower latency); other (default) for any encoded file.

no\_verbatim

`boolean`Remove filler words, false starts and non-speech sounds.

▶keyterms\[]

`array`minItems: 1maxItems: 100Up to 100 words or phrases (each up to 50 characters and 5 words) to recognise more accurately, such as names or jargon. Adds a per-minute surcharge.

temperature

`number`minimum: 0maximum: 2Randomness from 0 to 2. Defaults to the model setting, usually 0.

seed

`integer`minimum: 0maximum: 2147483647Best-effort deterministic sampling for repeated requests.

▶secondary\_language\_codes\[]

`array`minItems: 1maxItems: 10Other languages that may be spoken alongside language\_code, as ISO-639-1 or ISO-639-3 codes. Improves code-switched audio.

numbers\_format

`string`enum: digits, wordsWrite numbers as digits ("42") or words ("forty-two").

text

`string`Full transcript.

language\_code

`string`Detected language code (e.g. "eng").

language\_probability

`number`Confidence of the language detection, 0 to 1.

▶words\[]

`array`Words, spaces and audio events with start/end seconds, log probability and, with diarize, speaker\_id.

audio\_duration\_secs

`number`Billed audio duration in seconds.

transcription\_id

`string`ElevenLabs transcription id.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/elevenlabs/scribe-v3/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/elevenlabs/scribe-v3/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/elevenlabs/scribe-v3/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/elevenlabs/scribe-v3/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/elevenlabs/scribe-v3/#page","headline":"Scribe v3","description":"ElevenLabs Scribe v3 is ElevenLabs' most accurate speech recognition model for recorded audio, with 90+ languages, speaker diarization for up to 32 speakers, word-level timestamps, audio event tags, keyterm prompting, numbers as digits or words, and secondary languages for mixed-language audio.","url":"https://developers.cloudflare.com/ai/models/elevenlabs/scribe-v3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
