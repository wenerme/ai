---
description: Aura is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.
title: aura-1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.BYzW8KfF.svg)

# aura-1

Text-to-Speech • Deepgram

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/aura-1/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/deepgram/aura-1`

* Cloudflare-hosted
* Batch
* Partner
* Real-time

Aura is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://deepgram.com/terms) |
| Batch             | Yes                                  |
| Partner           | Yes                                  |
| Real-time         | Yes                                  |
| Unit Pricing      | $0.015 per 1k characters             |

## Usage

```ts

export default {
  async fetch(request, env, ctx): Promise<Response> {
      const resp = await env.AI.run("@cf/deepgram/aura-1", {
        "text":"Hello World!"
      }, {
        returnRawResponse: true
      });

      return resp;
  },
} satisfies ExportedHandler<Env>;
```

```sh

curl --request POST   --url 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/deepgram/aura-1'   --header 'Authorization: Bearer {TOKEN}'   --header 'Content-Type: application/json'   --data '{
    "text":"Hello world!"
}'
```

## Parameters

speaker

`string`default: angusenum: angus, asteria, arcas, orion, orpheus, athena, luna, zeus, perseus, helios, hera, stellaSpeaker used to produce the audio.

encoding

`string`enum: linear16, flac, mulaw, alaw, mp3, opus, aacEncoding of the output audio.

container

`string`enum: none, wav, oggContainer specifies the file format wrapper for the output audio. The available options depend on the encoding type..

text

`string`requiredThe text content to be converted to speech

sample\_rate

`number`Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable

bit\_rate

`number`The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type.

The binding returns a `ReadableStream` with the audio in MPEG format (check the model's output schema).

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/aura-1/#page","headline":"aura-1 (Deepgram) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Aura is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.","url":"https://developers.cloudflare.com/workers-ai/models/aura-1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
