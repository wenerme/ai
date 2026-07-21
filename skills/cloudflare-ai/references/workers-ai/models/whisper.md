---
title: whisper
description: Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  whisper

Automatic Speech Recognition • OpenAI

`@cf/openai/whisper`

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.

| Model Info       |                                               |
| ---------------- | --------------------------------------------- |
| More information | [link ↗](https://openai.com/research/whisper) |
| Unit Pricing     | $0.00045 per audio minute                     |

## Usage

* [  TypeScript ](#tab-panel-5582)
* [  curl ](#tab-panel-5583)

```ts
export interface Env {
  AI: Ai;
}


export default {
  async fetch(request, env): Promise<Response> {
    const res = await fetch(
      "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
    );
    const blob = await res.arrayBuffer();


    const input = {
      audio: [...new Uint8Array(blob)],
    };


    const response = await env.AI.run(
      "@cf/openai/whisper",
      input
    );


    return Response.json({ input: { audio: [] }, response });
  },
} satisfies ExportedHandler<Env>;
```

```sh
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/openai/whisper  \
  -X POST  \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
  --data-binary "@talking-llama.mp3"
```

## Parameters

* [ Input ](#tab-panel-5584)
* [ Output ](#tab-panel-5585)

Option 1

stringformat: binary

▶Option 2{}

object

text

`string`The transcription

word\_count

`number`

▶words\[\]

`array`

vtt

`string`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/workers-ai/models/whisper/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/whisper/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/whisper/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/whisper/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/whisper/#page","headline":"whisper (OpenAI) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.","url":"https://developers.cloudflare.com/workers-ai/models/whisper/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
