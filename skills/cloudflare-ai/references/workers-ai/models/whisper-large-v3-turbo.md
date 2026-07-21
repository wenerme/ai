---
description: Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation.
title: whisper-large-v3-turbo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  whisper-large-v3-turbo

 Automatic Speech Recognition • OpenAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` @cf/openai/whisper-large-v3-turbo `

* Cloudflare-hosted
* Batch

Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation.

| Model Info   |                           |
| ------------ | ------------------------- |
| Batch        | Yes                       |
| Unit Pricing | $0.00051 per audio minute |

## Parameters

▶audio

`one of`required

task

`string`default: transcribeSupported tasks are 'translate' or 'transcribe'.

language

`string`The language of the audio being transcribed or translated.

vad\_filter

`boolean`default: falsePreprocess the audio with a voice activity detection model.

initial\_prompt

`string`A text prompt to help provide context to the model on the contents of the audio.

prefix

`string`The prefix appended to the beginning of the output of the transcription and can guide the transcription result.

beam\_size

`integer`default: 5The number of beams to use in beam search decoding. Higher values may improve accuracy at the cost of speed.

condition\_on\_previous\_text

`boolean`default: trueWhether to condition on previous text during transcription. Setting to false may help prevent hallucination loops.

no\_speech\_threshold

`number`default: 0.6Threshold for detecting no-speech segments. Segments with no-speech probability above this value are skipped.

compression\_ratio\_threshold

`number`default: 2.4Threshold for filtering out segments with high compression ratio, which often indicate repetitive or hallucinated text.

log\_prob\_threshold

`number`default: \-1Threshold for filtering out segments with low average log probability, indicating low confidence.

hallucination\_silence\_threshold

`number`Optional threshold (in seconds) to skip silent periods that may cause hallucinations.

▶transcription\_info{}

`object`

text

`string`The complete transcription of the audio.

word\_count

`number`The total number of words in the transcription.

▶segments\[\]

`array`

vtt

`string`The transcription in WebVTT format, which includes timing and text information for use in subtitles.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/#page","headline":"whisper-large-v3-turbo (OpenAI) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation.","url":"https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
