---
description: Eleven Sound Effects v3 generates sound effects up to 30 seconds long from a text description, with optional seamless looping.
title: Eleven Sound Effects v3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ElevenLabs logo](https://developers.cloudflare.com/_astro/elevenlabs.0RXw7U95.svg)

# Eleven Sound Effects v3

Music Generation • ElevenLabs

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`elevenlabs/eleven-text-to-sound-v3` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Eleven Sound Effects v3 generates sound effects up to 30 seconds long from a text description, with optional seamless looping.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://elevenlabs.io/terms) |
| More information | [link ↗](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert) |
| Pricing | <ul><li>output audio seconds$0.002</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'elevenlabs/eleven-text-to-sound-v3',
  { text: 'Heavy wooden door creaking open slowly in an empty stone hallway', duration_seconds: 4 },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/eleven-text-to-sound-v3",
  "input": {
    "text": "Heavy wooden door creaking open slowly in an empty stone hallway",
    "duration_seconds": 4
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/elevenlabs/eleven-text-to-sound-v3/door-creak.mp3"
  }
}
```

## Examples

<details>

<summary>**Rain Loop** — Generate a seamless loop for background ambience</summary>



```ts
const response = await env.AI.run(
  'elevenlabs/eleven-text-to-sound-v3',
  {
    text: 'Gentle rain on a tin roof with distant thunder',
    duration_seconds: 8,
    loop: true,
    output_format: 'mp3_44100_128',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/eleven-text-to-sound-v3",
  "input": {
    "text": "Gentle rain on a tin roof with distant thunder",
    "duration_seconds": 8,
    "loop": true,
    "output_format": "mp3_44100_128"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/elevenlabs/eleven-text-to-sound-v3/rain-loop.mp3"
  }
}
```

</details>

## Parameters

text

`string`requiredminLength: 1Description of the sound effect to generate.

duration\_seconds

`number`requiredminimum: 0.5maximum: 30Length of the sound effect in seconds, from 0.5 to 30.

loop

`boolean`Create a sound effect that loops smoothly.

prompt\_influence

`number`minimum: 0maximum: 1How closely to follow the prompt, from 0 to 1 (default 0.3). Higher is closer and less varied.

output\_format

`string`enum: mp3\_22050\_32, mp3\_24000\_48, mp3\_44100\_32, mp3\_44100\_64, mp3\_44100\_96, mp3\_44100\_128, mp3\_44100\_192, opus\_48000\_32, opus\_48000\_64, opus\_48000\_96, opus\_48000\_128, opus\_48000\_192Audio codec, sample rate and bitrate (default mp3\_44100\_128).

audio

`string`URL of the generated sound effect.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/#page","headline":"Eleven Sound Effects v3","description":"Eleven Sound Effects v3 generates sound effects up to 30 seconds long from a text description, with optional seamless looping.","url":"https://developers.cloudflare.com/ai/models/elevenlabs/eleven-text-to-sound-v3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
