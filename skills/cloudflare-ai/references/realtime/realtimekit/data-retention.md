---
description: Review how long RealtimeKit stores meeting chat, recordings, analytics, and webhook logs.
title: Data retention
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Data retention

Last updated Sep 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/data-retention/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

RealtimeKit retains data for the following periods:

| Data type                                                                                                                                                                                                                                                                                            | Retention period |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Meeting and participant records                                                                                                                                                                                                                                                                      | Indefinitely     |
| Meeting chat with [persist\_chat](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/#%28resource%29%20realtime%5Fkit.meetings%20%3E%20%28method%29%20create%20%3E%20%28params%29%200%20%3E%20%28param%29%20persist%5Fchat%20%3E%20%28schema%29)    | Indefinitely     |
| Meeting chat without [persist\_chat](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/#%28resource%29%20realtime%5Fkit.meetings%20%3E%20%28method%29%20create%20%3E%20%28params%29%200%20%3E%20%28param%29%20persist%5Fchat%20%3E%20%28schema%29) | 7 days           |
| Composite recordings                                                                                                                                                                                                                                                                                 | 7 days           |
| Track recordings                                                                                                                                                                                                                                                                                     | 7 days           |
| Transcripts                                                                                                                                                                                                                                                                                          | 7 days           |
| Call analytics                                                                                                                                                                                                                                                                                       | 6 months         |
| Webhook logs                                                                                                                                                                                                                                                                                         | 1 month          |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/data-retention/#page","headline":"Data retention · Cloudflare Realtime docs","description":"Review how long RealtimeKit stores meeting chat, recordings, analytics, and webhook logs.","url":"https://developers.cloudflare.com/realtime/realtimekit/data-retention/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
