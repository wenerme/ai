---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: MiniMax Speech 02 HD is a studio-quality multilingual text-to-speech model with emotion control and support for cloned and designed voices.
title: MiniMax Speech 02 HD
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.B0Y99aoe.svg)

# MiniMax Speech 02 HD

Text-to-Speech • MiniMax

Model ID

`minimax/speech-02-hd` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

MiniMax Speech 02 HD is a studio-quality multilingual text-to-speech model with emotion control and support for cloned and designed voices.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms) |
| More information | [link ↗](https://platform.minimax.io/docs/api-reference/speech-t2a-http) |
| Pricing | <ul><li>Per character$0.0001</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'minimax/speech-02-hd',
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

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-02-hd",
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

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/minimax/speech-02-hd/simple-speech.mp3"
  }
}
```

## Examples

<details>

<summary>**Custom Voice** — Use a specific voice and adjust speed</summary>



```ts
const response = await env.AI.run(
  'minimax/speech-02-hd',
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

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-02-hd",
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

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/minimax/speech-02-hd/custom-voice.mp3"
  }
}
```

</details>

<details>

<summary>**With Emotion** — Apply emotional tone to speech</summary>



```ts
const response = await env.AI.run(
  'minimax/speech-02-hd',
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

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-02-hd",
  "input": {
    "emotion": "happy",
    "format": "mp3",
    "pitch": 0,
    "speed": 1,
    "text": "Congratulations! You'\''ve just won the grand prize! This is absolutely incredible news!",
    "voice_id": "English_expressive_narrator",
    "volume": 1
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/minimax/speech-02-hd/with-emotion.mp3"
  }
}
```

</details>

<details>

<summary>**High Sample Rate** — Studio quality at 44.1kHz sample rate</summary>



```ts
const response = await env.AI.run(
  'minimax/speech-02-hd',
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

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-02-hd",
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

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/minimax/speech-02-hd/high-sample-rate.mp3"
  }
}
```

</details>

## Parameters

text

`string`requiredmaxLength: 10000The text to convert to speech. Maximum 10,000 characters.

voice\_id

`string`requireddefault: English\_expressive\_narratorThe voice ID to use for synthesis

speed

`number`requireddefault: 1minimum: 0.5maximum: 2Speech speed (0.5 to 2)

volume

`number`requireddefault: 1minimum: 0maximum: 10Speech volume (0 to 10)

pitch

`integer`requireddefault: 0minimum: -12maximum: 12Pitch adjustment (-12 to 12)

emotion

`string`enum: happy, sad, angry, fearful, disgusted, surprised, calmEmotion control for synthesized speech

format

`string`requireddefault: mp3enum: mp3, flac, wavOutput audio format

▶sample\_rate

`one of`

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/minimax/speech-02-hd/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/minimax/speech-02-hd/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/minimax/speech-02-hd/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/minimax/speech-02-hd/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/speech-02-hd/#page","headline":"MiniMax Speech 02 HD","description":"MiniMax Speech 02 HD is a studio-quality multilingual text-to-speech model with emotion control and support for cloned and designed voices.","url":"https://developers.cloudflare.com/ai/models/minimax/speech-02-hd/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
