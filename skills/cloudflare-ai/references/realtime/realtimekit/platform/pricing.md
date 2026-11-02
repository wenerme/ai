---
description: RealtimeKit pricing for audio, video, recording, and transcription features.
title: Pricing
image: https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/og.png?v=f5bc4f021a13c132
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Nov 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

RealtimeKit usage is charged according to the pricing model below:

Note

RealtimeKit participant and export usage is measured in minutes. In contrast, Realtime SFU, MoQ Relay, and TURN usage is measured in GB of egress. RealtimeKit transcription uses Workers AI pricing.

To estimate your RealtimeKit costs, refer to the [RealtimeKit pricing calculator ↗︎](https://realtime.cloudflare.com/#pricing-calculator).

The included usage applies to all accounts, including Free and Enterprise accounts.

| Feature | Included per month | Price after included usage |
| --- | --- | --- |
| Audio/Video Participant | 10,000 minutes | $0.002 / minute |
| Audio-Only Participant | 10,000 minutes | $0.0005 / minute |
| Export (recording, RTMP or HLS streaming) | 100 minutes | $0.010 / minute |
| Export (recording, RTMP or HLS streaming, audio only) | 100 minutes | $0.003 / minute |
| Export (Raw RTP) into R2 | 100 minutes | $0.0005 / minute |
| Transcription (Real-time) | See [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) | Standard model pricing via Workers AI |

Whether a participant is an audio-only participant or an audio/video participant is determined by the `Meeting Type` of their [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/#page","headline":"Pricing","description":"RealtimeKit pricing for audio, video, recording, and transcription features.","url":"https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/og.png?v=f5bc4f021a13c132","dateModified":"2026-11-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
