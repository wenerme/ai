---
description: Aura-2 is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.
title: aura-2-es
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.BYzW8KfF.svg)

# aura-2-es

Text-to-Speech • Deepgram

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/%40cf/deepgram/aura-2-es/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/deepgram/aura-2-es`

* Cloudflare-hosted
* Batch
* Partner
* Real-time

Aura-2 is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://deepgram.com/terms) |
| Batch             | Yes                                  |
| Partner           | Yes                                  |
| Real-time         | Yes                                  |
| Unit Pricing      | $0.03 per 1k characters              |

## Parameters

speaker

`string`default: aquilaenum: sirio, nestor, carina, celeste, alvaro, diana, aquila, selena, estrella, javierSpeaker used to produce the audio.

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/deepgram/aura-2-es/#page","headline":"aura-2-es (Deepgram) · Cloudflare AI docs · Cloudflare AI docs","description":"Aura-2 is a context-aware text-to-speech (TTS) model that applies natural pacing, expressiveness, and fillers based on the context of the provided text. The quality of your text input directly impacts the naturalness of the audio output.","url":"https://developers.cloudflare.com/ai/models/%40cf/deepgram/aura-2-es/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
