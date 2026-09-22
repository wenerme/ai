---
description: Review RealtimeKit API and SDK limits.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

RealtimeKit applies limits to API requests and SDK operations. Use these values when designing your application.

## API rate limits

RealtimeKit API requests count toward the global Cloudflare API limit, which applies across all `api.cloudflare.com` API requests. Recording APIs are subject to a separate limit.

| API | Limit |
| --- | --- |
| All RealtimeKit APIs | 3,500 requests per five minutes |
| Recording APIs | 1,000 requests per 50 seconds |

## SDK rate limits

Each participant has a separate limit for SDK operations during an active session. Limits are not shared across participants or applied to your app as a whole. For example, in a two-participant meeting, each participant can send up to 180 text messages per minute.

| Operation | Limit |
| --- | --- |
| Write to a [Collaborative Store](https://developers.cloudflare.com/realtime/realtimekit/collaborative-stores/) (`set()`, `update()`, `delete()`, `bulkSet()`, `bulkDelete()`) | 5 invocations per second |
| Broadcast a message (`broadcastMessage()`) | 5 invocations per second |
| Send a text message (`sendTextMessage()`) | 180 invocations per minute |
| Send a message (`sendMessage()`) | 180 invocations per minute |
| Send an image (`sendImageMessage()`) | 20 invocations per minute |
| Send a file (`sendFileMessage()`) | 20 invocations per minute |
| Fetch connected meetings (`getConnectedMeetings()`) | 60 invocations per minute |
| Fetch meeting participants (`getAllJoinedPeers()`) | 10 invocations per minute |
| Update participant permissions (`updatePermissions()`) | 1,000 invocations per minute |

## Data retention

For the retention periods for recordings, chat, transcripts, analytics, and webhook logs, refer to [Data retention](https://developers.cloudflare.com/realtime/realtimekit/data-retention/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/limits/#page","headline":"Limits","description":"Review RealtimeKit API and SDK limits.","url":"https://developers.cloudflare.com/realtime/realtimekit/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
