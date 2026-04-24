---
title: RTKAi
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/core/api-reference/RTKAi.md) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RTKAi

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

| Param                   | Type    | Default                      | Description                       |
| ----------------------- | ------- | ---------------------------- | --------------------------------- |
| transcriptData          | string  | The transcript data to parse |                                   |
| \[isPartialTranscript\] | boolean | false                        | Whether the transcript is partial |

### meeting.ai.parseTranscripts(transcriptData)

Parse a multi-line transcript

**Kind**: static method of [RTKAi](#module%5FRTKAi)

| Param          | Type   | Description                  |
| -------------- | ------ | ---------------------------- |
| transcriptData | string | The transcript data to parse |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkai/","name":"RTKAi"}}]}
```
