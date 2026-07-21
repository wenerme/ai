---
title: RTKAi
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RTKAi

Last updated Jul 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkai/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This module consists of the `ai` object which is used to interface with product's AI features. You can obtain the live meeting transcript and use other meeting AI features such as summary, and agenda using this object.

* [RTKAi](#module%5FRTKAi)
  * _instance_
    * [.telemetry](#module%5FRTKAi+telemetry)
    * [.onTranscript(transcript)](#module%5FRTKAi+onTranscript)
  * _static_
    * [.parseTranscript(transcriptData, \[isPartialTranscript\])](#module%5FRTKAi.parseTranscript)
    * [.parseTranscripts(transcriptData)](#module%5FRTKAi.parseTranscripts)

### meeting.ai.telemetry

**Kind**: instance property of [RTKAi](#module%5FRTKAi)

### meeting.ai.onTranscript(transcript)

**Kind**: instance method of [RTKAi](#module%5FRTKAi)

| Param      | Type              | Description                                 |
| ---------- | ----------------- | ------------------------------------------- |
| transcript | TranscriptionData | Transcript data received for a participant. |

### meeting.ai.parseTranscript(transcriptData, \[isPartialTranscript\])

Parse a single line transcript

**Kind**: static method of [RTKAi](#module%5FRTKAi)

| Param                   | Type    | Default | Description                       |
| ----------------------- | ------- | ------- | --------------------------------- |
| transcriptData          | string  |         | The transcript data to parse      |
| \[isPartialTranscript\] | boolean | false   | Whether the transcript is partial |

### meeting.ai.parseTranscripts(transcriptData)

Parse a multi-line transcript

**Kind**: static method of [RTKAi](#module%5FRTKAi)

| Param          | Type   | Description                  |
| -------------- | ------ | ---------------------------- |
| transcriptData | string | The transcript data to parse |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkai/#page","headline":"RTKAi · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkai/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
