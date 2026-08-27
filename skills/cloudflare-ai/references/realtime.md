---
description: Build scalable real-time applications with Cloudflare Realtime products including RealtimeKit, SFU, and TURN.
title: Cloudflare Realtime
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Realtime

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Build live audio, video, and data applications with managed Realtime products.

### RealtimeKit

[RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/) is a set of SDKs and APIs that lets you add customizable live video and voice to web or mobile applications. It is fully customisable and lets you set up in just a few lines of code.

It sits on top of the Realtime SFU, abstracting away the heavy lifting of media routing, peer management, and other complex WebRTC operations.

### Realtime SFU

The [Realtime SFU (Selective Forwarding Unit)](https://developers.cloudflare.com/realtime/sfu/) routes WebRTC audio, video, and DataChannels between application endpoints.

Use Realtime SFU when your application needs custom media routing, signaling, state, permissions, or user interfaces. Common topologies include custom calls, interactive broadcasts, AI media pipelines, cloud gaming, device control, and media processing.

Your application backend keeps the Realtime SFU credentials and decides which sessions can publish, subscribe, or control resources.

### TURN Service

The [TURN service](https://developers.cloudflare.com/realtime/turn/) is a managed service that acts as a relay for WebRTC traffic. It ensures connectivity for users behind restrictive firewalls or NATs by providing a public relay point for media streams.

## Choose the right Realtime product

Use this comparison table to quickly find the right Realtime product for your needs:

|                              | **RealtimeKit**                                                                  | **Realtime SFU**                                                                                        | **TURN Service**                                                            |
| ---------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Choose it when**           | You want meeting SDKs, participant management, and pre-built UI components.      | You want to compose WebRTC media and data into a custom application topology.                           | You need a relay for peer-to-peer or self-hosted WebRTC connections.        |
| **Provides**                 | Meetings, participants, presets, stage management, and UI components.            | Sessions, media tracks, DataChannels, and programmable publish and subscribe operations.                | TURN allocations and relayed UDP, TCP, or TLS transport.                    |
| **Your application manages** | Product integration, branding, and application-specific behavior.                | Authentication, authorization, signaling, presence, state, and track discovery.                         | Peer connections, signaling, media routing, and application state.          |
| **Example outcomes**         | Meetings, classrooms, webinars, and social video.                                | Custom calls, interactive broadcasts, AI pipelines, cloud gaming, device control, and media processing. | Connectivity through restrictive firewalls and network address translation. |
| **Pricing**                  | Pricing by minute [view details ↗](https://workers.cloudflare.com/pricing#media) | $0.05/GB egress                                                                                         | Free when used with Realtime SFU, otherwise $0.05/GB egress                 |
| **Free tier**                | None                                                                             | First 1,000 GB free each month                                                                          | First 1,000 GB free each month                                              |

## Related products

[Workers AI](https://developers.cloudflare.com/workers-ai/)

Run machine learning models, powered by serverless GPUs, on Cloudflare’s global network.

[Stream](https://developers.cloudflare.com/stream/)

Cloudflare Stream lets you or your end users upload, store, encode, and deliver live and on-demand video with one API, without configuring or maintaining infrastructure.

## More resources

### [Developer Discord](https://discord.cloudflare.com)

Connect with the Realtime community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

### [Build with Realtime SFU](https://developers.cloudflare.com/realtime/sfu/#what-you-can-build)

Explore custom media and data application topologies.

### [@CloudflareDev](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Realtime.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/#page","headline":"Overview · Cloudflare Realtime docs","description":"Build scalable real-time applications with Cloudflare Realtime products including RealtimeKit, SFU, and TURN.","url":"https://developers.cloudflare.com/realtime/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
