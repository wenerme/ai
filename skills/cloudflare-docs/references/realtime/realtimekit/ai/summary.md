---
title: Summary
description: Generate AI-powered meeting summaries from transcript data in RealtimeKit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ai/summary.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Summary

RealtimeKit generates AI-powered meeting summaries from transcript data.

Note

[Transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/) must be enabled to use summarization.

## Enable summarization

Set `summarize_on_end: true` when [creating a meeting](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting/):

```

{

  "title": "Product Review",

  "ai_config": {

    "transcription": {

      "language": "en-US"

    },

    "summarization": {

      "word_limit": 500,

      "text_format": "markdown",

      "summary_type": "team_meeting"

    }

  },

  "summarize_on_end": true

}


```

Explain Code

## Configuration

| Option        | Type   | Default     | Description                            |
| ------------- | ------ | ----------- | -------------------------------------- |
| word\_limit   | number | 300         | Summary length (150-1000 words)        |
| text\_format  | string | plain\_text | Output format: plain\_text or markdown |
| summary\_type | string | general     | Meeting context for tailored summaries |

### Summary types

Choose a type that matches your meeting for better results:

| Type                  | Best for                     |
| --------------------- | ---------------------------- |
| general               | Any meeting (default)        |
| team\_meeting         | Regular team syncs           |
| daily\_standup        | Agile standups               |
| one\_on\_one\_meeting | 1:1 meetings                 |
| sales\_call           | Customer sales conversations |
| client\_check\_in     | Client status updates        |
| interview             | Job interviews               |
| lecture               | Educational content          |
| code\_review          | Technical code reviews       |

## Consume summaries

### Webhook

Configure `meeting.summary` event in [webhooks](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/webhooks/):

```

{

  "event": "meeting.summary",

  "meetingId": "meeting-123",

  "sessionId": "session-456",

  "summaryDownloadUrl": "https://...",

  "summaryDownloadUrlExpiry": "2024-08-14T10:15:30.000Z"

}


```

### REST API

#### Fetch summary

Refer to [Fetch summary of transcripts for a session](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/sessions/methods/get%5Fsession%5Fsummary/).

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary" \

  -H "Authorization: Bearer {api_token}"


```

#### Trigger manually

Generate a summary after the meeting if `summarize_on_end` was not set. Refer to [Generate summary of transcripts for the session](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/sessions/methods/generate%5Fsummary%5Fof%5Ftranscripts/).

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary" \

  -H "Authorization: Bearer {api_token}"


```

## Example output

With `text_format: "markdown"` and `summary_type: "team_meeting"`:

```

## Meeting Summary


### Key Discussion Points

- Reviewed Q4 roadmap priorities

- Discussed deployment timeline for v2.0

- Identified blockers for the auth migration


### Action Items

- @alice: Update design specs by Friday

- @bob: Schedule security review

- @charlie: Create migration runbook


### Decisions Made

- Approved moving forward with Kubernetes migration

- Delayed analytics dashboard to next sprint


```

Explain Code

## Retention

Summaries are stored for **7 days** from meeting ends.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ai/","name":"AI"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ai/summary/","name":"Summary"}}]}
```
