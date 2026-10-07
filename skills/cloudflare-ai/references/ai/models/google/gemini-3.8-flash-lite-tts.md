---
description: Gemini 3.8 Flash-Lite TTS is a fast, cost-efficient text-to-speech model optimized for high-throughput production workloads.
title: Gemini 3.8 Flash-Lite TTS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 3.8 Flash-Lite TTS

Text-to-Speech • Google

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-3.8-flash-lite-tts`

- Third-party

Gemini 3.8 Flash-Lite TTS is a fast, cost-efficient text-to-speech model optimized for high-throughput production workloads.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 8,192 tokens |
| More information | [link ↗](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts) |
| Pricing | <ul><li>Input text (per 1M tokens)$0.50</li><li>Cached input (per 1M tokens)$0.125</li><li>Output audio (per 1M tokens)$6.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-3.8-flash-lite-tts',
  { text: 'Hello, welcome to Cloudflare AI Gateway!' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.8-flash-lite-tts",
  "input": {
    "text": "Hello, welcome to Cloudflare AI Gateway!"
  }
}'
```

```json
{
  "audio": "https://examples.aig.cloudflare.com/google/gemini-3.8-flash-lite-tts/simple-text-to-speech.wav",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**Expressive Pause** — Generate expressive speech with an inline vocal pause</summary>



```ts
const response = await env.AI.run(
  'google/gemini-3.8-flash-lite-tts',
  {
    text: 'Welcome to the future of voice. <short pause> Let us build something remarkable together.',
    voice: 'Puck',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.8-flash-lite-tts",
  "input": {
    "text": "Welcome to the future of voice. <short pause> Let us build something remarkable together.",
    "voice": "Puck"
  }
}'
```

```json
{
  "audio": "https://examples.aig.cloudflare.com/google/gemini-3.8-flash-lite-tts/expressive-pause.wav",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Narrated Passage** — Generate a longer narrated passage with a different voice</summary>



```ts
const response = await env.AI.run(
  'google/gemini-3.8-flash-lite-tts',
  {
    text: 'At sunrise, the research team opened the observatory and watched the first light move across the valley. Every sensor came online in sequence, and the quiet room filled with the soft rhythm of discovery.',
    voice: 'Charon',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.8-flash-lite-tts",
  "input": {
    "text": "At sunrise, the research team opened the observatory and watched the first light move across the valley. Every sensor came online in sequence, and the quiet room filled with the soft rhythm of discovery.",
    "voice": "Charon"
  }
}'
```

```json
{
  "audio": "https://examples.aig.cloudflare.com/google/gemini-3.8-flash-lite-tts/narrated-passage.wav",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**French Greeting** — Generate speech from a French greeting using a distinct voice</summary>



```ts
const response = await env.AI.run(
  'google/gemini-3.8-flash-lite-tts',
  {
    text: "Bonjour et bienvenue. Nous sommes ravis de vous accompagner aujourd'hui.",
    voice: 'Kore',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.8-flash-lite-tts",
  "input": {
    "text": "Bonjour et bienvenue. Nous sommes ravis de vous accompagner aujourd'\''hui.",
    "voice": "Kore"
  }
}'
```

```json
{
  "audio": "https://examples.aig.cloudflare.com/google/gemini-3.8-flash-lite-tts/french-greeting.wav",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

text

`string`requiredmaxLength: 10000The text to convert to speech. Maximum 10,000 characters.

voice

`string`enum: Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede, Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba, Despina, Erinome, Algenib, Rasalgethi, Laomedeia, Achernar, Alnilam, Schedar, Gacrux, Pulcherrima, Achird, Zubenelgenubi, Vindemiatrix, Sadachbia, Sadaltager, SulafatThe voice to use for speech synthesis

temperature

`number`minimum: 0maximum: 2Controls randomness in generation (0-2)

topP

`number`minimum: 0maximum: 1Nucleus sampling threshold (0-1). Tokens with cumulative probability up to topP are considered

topK

`integer`exclusiveMinimum: 0maximum: 9007199254740991Only sample from the top K tokens. Smaller K = more focused, larger K = more diverse

maxOutputTokens

`integer`exclusiveMinimum: 0maximum: 9007199254740991Maximum number of tokens to generate

▶stopSequences\[]

`array`Sequences where the model will stop generating further tokens

audio

`string`Base64-encoded audio data (WAV format)

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/#page","headline":"Gemini 3.8 Flash-Lite TTS","description":"Gemini 3.8 Flash-Lite TTS is a fast, cost-efficient text-to-speech model optimized for high-throughput production workloads.","url":"https://developers.cloudflare.com/ai/models/google/gemini-3.8-flash-lite-tts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
