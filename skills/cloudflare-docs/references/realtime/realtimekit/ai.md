---
title: AI
description: Add AI-powered transcription and summarization to RealtimeKit meetings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI

RealtimeKit provides AI-powered features using Cloudflare's AI infrastructure to enhance your meetings with transcription and summarization capabilities.

* [ Transcription ](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/)
* [ Summary ](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/)

## Available features

| Feature                                                                                   | Description                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------- |
| [Transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/) | Real-time and post-meeting speech-to-text |
| [Summary](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/)             | AI-generated meeting summaries            |

## Quick start

Enable AI features when creating a meeting:

```

{

  "title": "Team Standup",

  "ai_config": {

    "transcription": {

      "language": "en-US"

    },

    "summarization": {

      "summary_type": "team_meeting"

    }

  },

  "summarize_on_end": true

}


```

Explain Code

Ensure participants have `transcription_enabled: true` in their [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

## Storage and retention

* Transcripts and summaries are stored for **7 days** from meeting start
* Files are stored in R2 with presigned URLs for secure access
* Delivered via [webhooks](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/webhooks/) or REST API

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ai/","name":"AI"}}]}
```
