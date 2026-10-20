---
description: Compare what a human participant using the RealtimeKit SDKs and an agent participant using the Agent WebSocket can do in a meeting.
title: Capability matrix
image: https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/og.png?v=69cb3f3a8d594a57
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Capability matrix

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A human participant joins a meeting with the [RealtimeKit SDKs](https://developers.cloudflare.com/realtime/realtimekit/humans/sdk-selection/). An agent joins with the [Agent WebSocket](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/). The table compares what each can do once it is in the meeting.

Note

Agents can only receive meeting events today. Sending is planned, and those capabilities are marked as planned in the capability table.

| Capability | Human | Agent |
| --- | --- | --- |
| Receive live transcripts | ✅ | ✅ |
| Receive participant joins and leaves | ✅ | ✅ |
| Receive [broadcasts](https://developers.cloudflare.com/realtime/realtimekit/collaboration/message-broadcast/) | ✅ | ✅ |
| Send broadcasts | ✅ | No (Planned) |
| Send or receive audio, video, and screen share | ✅ | No (Planned) |
| Send or receive chat and polls | ✅ | No (Planned) |
| Use plugins and the [meeting key-value store](https://developers.cloudflare.com/realtime/realtimekit/collaboration/meeting-key-value-store/) | ✅ | No |
| Meeting controls, such as stage, removing participants, and recording | ✅ | No |

For what the agent receives, refer to [Events](https://developers.cloudflare.com/realtime/realtimekit/agents/events/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/#page","headline":"Capability matrix","description":"Compare what a human participant using the RealtimeKit SDKs and an agent participant using the Agent WebSocket can do in a meeting.","url":"https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/og.png?v=69cb3f3a8d594a57","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
