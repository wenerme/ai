---
title: Gemini 3.1 Flash TTS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 3.1 Flash TTS

Text-to-Speech • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-3.1-flash-tts`

* Third-party
* Zero data retention

| Model Info          |                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Zero data retention | Yes                                                                                                                           |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.1-flash-tts) |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-tts',
  { text: 'Hello, welcome to Cloudflare AI Gateway!' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.1-flash-tts",
  "input": {
    "text": "Hello, welcome to Cloudflare AI Gateway!"
  }
}'
```

```json
{
  "audio": "data:audio/l16;base64,...",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Custom Voice** — Generate speech with a specific voice

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-tts',
  { text: 'The quick brown fox jumps over the lazy dog.', voice: 'Puck' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.1-flash-tts",
  "input": {
    "text": "The quick brown fox jumps over the lazy dog.",
    "voice": "Puck"
  }
}'
```

```json
{
  "audio": "data:audio/l16;base64,...",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Longer Text** — Convert longer text to speech

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-tts',
  {
    text: 'Artificial intelligence has transformed the way we interact with technology. From voice assistants to autonomous vehicles, AI is reshaping our daily lives and creating new possibilities for innovation.',
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
  "model": "google/gemini-3.1-flash-tts",
  "input": {
    "text": "Artificial intelligence has transformed the way we interact with technology. From voice assistants to autonomous vehicles, AI is reshaping our daily lives and creating new possibilities for innovation.",
    "voice": "Charon"
  }
}'
```

```json
{
  "audio": "data:audio/l16;base64,...",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Narrative Voice** — Generate speech with a narrative voice style

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-tts',
  {
    text: 'Once upon a time, in a kingdom far away, there lived a brave knight who sought to protect the realm from all dangers.',
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
  "model": "google/gemini-3.1-flash-tts",
  "input": {
    "text": "Once upon a time, in a kingdom far away, there lived a brave knight who sought to protect the realm from all dangers.",
    "voice": "Kore"
  }
}'
```

```json
{
  "audio": "data:audio/l16;base64,...",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

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

▶stopSequences\[\]

`array`Sequences where the model will stop generating further tokens

audio

`string`Base64-encoded audio data (WAV format)

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/#page","headline":"Gemini 3.1 Flash TTS (Google) · Cloudflare AI docs · Cloudflare AI docs","url":"https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
