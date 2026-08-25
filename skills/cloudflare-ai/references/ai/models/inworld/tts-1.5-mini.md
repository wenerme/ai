---
description: Ultra-fast, cost-efficient text-to-speech with approximately 120ms latency and 15-language support.
title: Inworld TTS 1.5 Mini
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Inworld logo](https://developers.cloudflare.com/_astro/inworld.BDwMAXI2.svg)

# Inworld TTS 1.5 Mini

Text-to-Speech • Inworld

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/inworld/tts-1.5-mini/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`inworld/tts-1.5-mini`

* Third-party
* Zero data retention

Ultra-fast, cost-efficient text-to-speech with approximately 120ms latency and 15-language support.

| Model Info          |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://inworld.ai/terms)                                                                                     |
| More information    | [link ↗](https://inworld.ai/)                                                                                          |
| Zero data retention | Yes                                                                                                                    |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/inworld/tts-1.5-mini) |

## Usage

```ts
const response = await env.AI.run(
  'inworld/tts-1.5-mini',
  {
    output_format: 'mp3',
    temperature: 1,
    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',
    timestamp_type: 'none',
    voice_id: 'Dennis',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "inworld/tts-1.5-mini",
  "input": {
    "output_format": "mp3",
    "temperature": 1,
    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",
    "timestamp_type": "none",
    "voice_id": "Dennis"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/inworld__tts-1.5-mini/simple-speech.mp3"
  },
  "state": "Completed"
}
```

## Examples

**Fast Speech** — Speed up speech for quick playback

```ts
const response = await env.AI.run(
  'inworld/tts-1.5-mini',
  {
    output_format: 'mp3',
    speaking_rate: 1.4,
    temperature: 1,
    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.',
    timestamp_type: 'none',
    voice_id: 'Dennis',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "inworld/tts-1.5-mini",
  "input": {
    "output_format": "mp3",
    "speaking_rate": 1.4,
    "temperature": 1,
    "text": "This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.",
    "timestamp_type": "none",
    "voice_id": "Dennis"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/inworld__tts-1.5-mini/fast-speech.mp3"
  },
  "state": "Completed"
}
```

**Low Latency** — Minimize latency by disabling text normalization

```ts
const response = await env.AI.run(
  'inworld/tts-1.5-mini',
  {
    apply_text_normalization: false,
    output_format: 'mp3',
    temperature: 1,
    text: 'Quick response needed. The server is ready.',
    timestamp_type: 'none',
    voice_id: 'Dennis',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "inworld/tts-1.5-mini",
  "input": {
    "apply_text_normalization": false,
    "output_format": "mp3",
    "temperature": 1,
    "text": "Quick response needed. The server is ready.",
    "timestamp_type": "none",
    "voice_id": "Dennis"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/inworld__tts-1.5-mini/low-latency.mp3"
  },
  "state": "Completed"
}
```

## Parameters

text

`string`requiredmaxLength: 2000The text to be synthesized into speech. Maximum input of 2,000 characters.

voice\_id

`string`requireddefault: Dennisenum: Loretta, Darlene, Marlene, Hank, Evelyn, Celeste, Pippa, Tessa, Liam, Callum, Hamish, Abby, Graham, Rupert, Mortimer, Snik, Anjali, Saanvi, Arjun, Claire, Oliver, Simon, Elliot, James, Serena, Gareth, Vinny, Lauren, Jessica, Ethan, Tyler, Jason, Chloe, Veronica, Victoria, Miranda, Sebastian, Victor, Malcolm, Nate, Brian, Amina, Kelsey, Derek, Evan, Kayla, Jake, Grant, Tristan, Nadia, Selene, Marcus, Riley, Damon, Cedric, Mia, Naomi, Jonah, Levi, Avery, Brandon, Conrad, Bianca, Lucian, Trevor, Alex, Ashley, Craig, Deborah, Dennis, Edward, Elizabeth, Hades, Julia, Pixie, Mark, Olivia, Priya, Ronald, Sarah, Shaun, Theodore, Timothy, Wendy, Dominus, Hana, Clive, Carter, Blake, Luna, Reed, Duncan, Felix, Eleanor, SophieThe ID of the voice to use for synthesizing speech. Defaults to Dennis.

output\_format

`string`requireddefault: mp3enum: mp3, opus, wav, flacThe output format for the audio. Supported formats are mp3, opus, wav, and flac. Defaults to mp3.

bit\_rate

`integer`minimum: \-9007199254740991maximum: 9007199254740991Bits per second of the audio. Only for compressed audio formats (mp3, opus). The default is 128,000.

sample\_rate

`integer`minimum: \-9007199254740991maximum: 9007199254740991The synthesis sample rate in hertz. Accepts: 8000, 16000, 22050, 24000, 32000, 44100, 48000\. The default is 48,000.

speaking\_rate

`number`minimum: 0.5maximum: 1.5Speaking rate/speed, in the range \[0.5, 1.5\]. The default is 1.0\. We recommend using values above 0.8 to ensure high quality.

temperature

`number`requireddefault: 1minimum: 0.01maximum: 2Determines the degree of randomness when sampling audio tokens. Defaults to 1.0\. Accepts values between 0 (exclusive) and 2 (inclusive). Higher values = more expressive, lower values = more deterministic.

timestamp\_type

`string`requireddefault: noneenum: none, word, characterControls timestamp metadata returned with the audio. "word" returns word-level timing, "character" returns character-level timing. Note: adds latency. Defaults to none.

apply\_text\_normalization

`boolean`When enabled, text normalization expands numbers, dates, times, and abbreviations before converting to speech. Turning this off may reduce latency.

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/inworld/tts-1.5-mini/#page","headline":"Inworld TTS 1.5 Mini (Inworld) · Cloudflare AI docs · Cloudflare AI docs","description":"Ultra-fast, cost-efficient text-to-speech with approximately 120ms latency and 15-language support.","url":"https://developers.cloudflare.com/ai/models/inworld/tts-1.5-mini/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
