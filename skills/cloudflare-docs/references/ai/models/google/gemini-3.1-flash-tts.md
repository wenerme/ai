---
title: Gemini 3.1 Flash TTS
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 3.1 Flash TTS 

Text-to-Speech • Google 

`google/gemini-3.1-flash-tts` 

| Model Info          |                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Zero data retention | Yes                                                                                                                           |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.1-flash-tts) |

## Usage

* [ TypeScript ](#tab-panel-550)
* [ cURL ](#tab-panel-551)

TypeScript

```
const response = await env.AI.run(  'google/gemini-3.1-flash-tts',  { text: 'Hello, welcome to Cloudflare AI Gateway!' },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/gemini-3.1-flash-tts",  "input": {    "text": "Hello, welcome to Cloudflare AI Gateway!"  }}'
```

* [ Output ](#tab-panel-546)
* [ Raw response ](#tab-panel-547)

```
{  "audio": "data:audio/l16;base64,...",  "gatewayMetadata": {    "keySource": "Unified"  }}
```

## Examples

**Custom Voice**  — Generate speech with a specific voice 

* [ TypeScript ](#tab-panel-554)
* [ cURL ](#tab-panel-555)

TypeScript

```
const response = await env.AI.run(  'google/gemini-3.1-flash-tts',  { text: 'The quick brown fox jumps over the lazy dog.', voice: 'Puck' },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/gemini-3.1-flash-tts",  "input": {    "text": "The quick brown fox jumps over the lazy dog.",    "voice": "Puck"  }}'
```

* [ Output ](#tab-panel-548)
* [ Raw response ](#tab-panel-549)

```
{  "audio": "data:audio/l16;base64,...",  "gatewayMetadata": {    "keySource": "Unified"  }}
```

**Longer Text**  — Convert longer text to speech 

* [ TypeScript ](#tab-panel-558)
* [ cURL ](#tab-panel-559)

TypeScript

```
const response = await env.AI.run(  'google/gemini-3.1-flash-tts',  {    text: 'Artificial intelligence has transformed the way we interact with technology. From voice assistants to autonomous vehicles, AI is reshaping our daily lives and creating new possibilities for innovation.',    voice: 'Charon',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/gemini-3.1-flash-tts",  "input": {    "text": "Artificial intelligence has transformed the way we interact with technology. From voice assistants to autonomous vehicles, AI is reshaping our daily lives and creating new possibilities for innovation.",    "voice": "Charon"  }}'
```

* [ Output ](#tab-panel-552)
* [ Raw response ](#tab-panel-553)

```
{  "audio": "data:audio/l16;base64,...",  "gatewayMetadata": {    "keySource": "Unified"  }}
```

**Narrative Voice**  — Generate speech with a narrative voice style 

* [ TypeScript ](#tab-panel-560)
* [ cURL ](#tab-panel-561)

TypeScript

```
const response = await env.AI.run(  'google/gemini-3.1-flash-tts',  {    text: 'Once upon a time, in a kingdom far away, there lived a brave knight who sought to protect the realm from all dangers.',    voice: 'Kore',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/gemini-3.1-flash-tts",  "input": {    "text": "Once upon a time, in a kingdom far away, there lived a brave knight who sought to protect the realm from all dangers.",    "voice": "Kore"  }}'
```

* [ Output ](#tab-panel-556)
* [ Raw response ](#tab-panel-557)

```
{  "audio": "data:audio/l16;base64,...",  "gatewayMetadata": {    "keySource": "Unified"  }}
```

## Parameters

* [ Input ](#tab-panel-562)
* [ Output ](#tab-panel-563)

maxOutputTokens

`integer`exclusiveMinimum: 0maximum: 9007199254740991Maximum number of tokens to generate

▶stopSequences\[\]

`array`Sequences where the model will stop generating further tokens

temperature

`number`maximum: 2minimum: 0Controls randomness in generation (0-2)

text

`string`requiredmaxLength: 10000The text to convert to speech. Maximum 10,000 characters.

topK

`integer`exclusiveMinimum: 0maximum: 9007199254740991Only sample from the top K tokens. Smaller K = more focused, larger K = more diverse

topP

`number`maximum: 1minimum: 0Nucleus sampling threshold (0-1). Tokens with cumulative probability up to topP are considered

voice

`string`enum: Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede, Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba, Despina, Erinome, Algenib, Rasalgethi, Laomedeia, Achernar, Alnilam, Schedar, Gacrux, Pulcherrima, Achird, Zubenelgenubi, Vindemiatrix, Sadachbia, Sadaltager, SulafatThe voice to use for speech synthesis

audio

`string`Base64-encoded audio data (WAV format)

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/#page","headline":"Gemini 3.1 Flash TTS (Google) · Cloudflare AI docs · Cloudflare AI docs","url":"https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-tts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
