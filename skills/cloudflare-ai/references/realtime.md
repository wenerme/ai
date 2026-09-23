---
description: Build live audio, video, and data applications with Cloudflare Realtime, or broadcast live video with Stream.
title: Cloudflare Realtime
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Realtime

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build live applications where people, AI systems, and devices communicate in real time over [Cloudflare's global network ↗](https://www.cloudflare.com/network/).

![](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1400,height=799,format=webp/_astro/global-web-rtc-network.vo5ylKmC.png)![](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1400,height=799,format=webp/_astro/global-web-rtc-network-dark.DktEEERJ.png)

[RealtimeKit<h2>Add audio or video calls to your app</h2>Use prebuilt meeting UI and SDKs for web and mobile. Add managed recording or transcription if your app needs it.Explore RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/) [Realtime SFU<h2>Build custom WebRTC applications</h2>Use the Realtime SFU API to control which endpoints publish or receive audio, video, and data. Your application handles signaling and permissions.Explore Realtime SFU](https://developers.cloudflare.com/realtime/sfu/)

## What you can build

[RealtimeKit<h3>In-app meetings</h3>Add audio or video calls to your web or mobile app with prebuilt screens and controls.View guide](https://developers.cloudflare.com/realtime/realtimekit/quickstart/) [RealtimeKit<h3>Virtual classrooms</h3>Set instructor and student permissions, then split a class into breakout rooms. Record or transcribe sessions when needed.View guide](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/breakout-rooms/) [RealtimeKit<h3>Live events</h3>Add reactions, chat, and polls to a live event.View guide](https://developers.cloudflare.com/realtime/realtimekit/webinar/) [Realtime SFU<h3>Embedded devices</h3>Send audio and telemetry from an ESP32 to browsers, with controls for one authorized operator. Use the same design for robot gateways.View guide](https://developers.cloudflare.com/realtime/sfu/examples/embedded-devices/) [Realtime SFU<h3>Cloud gaming</h3>Stream a game from a Container to browsers, then send keyboard and pointer input back over DataChannels.View guide](https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/) [Realtime SFU<h3>AI audio pipelines</h3>Transcribe microphone audio with Workers AI, then send generated speech to browsers through WebSocket media adapters.View guide](https://developers.cloudflare.com/realtime/sfu/examples/ai-audio/)

## Realtime primitives

### [Cloudflare TURN](https://developers.cloudflare.com/realtime/turn/)

Relay WebRTC traffic through Cloudflare when a NAT or firewall prevents a direct connection.

### [WebSocket adapter](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/)

In beta. Send PCM audio in either direction between Realtime SFU and a WebSocket service, or send JPEG video to the service.

### [DataChannels](https://developers.cloudflare.com/realtime/sfu/features/datachannels/)

Exchange chat, sensor updates, and control events between WebRTC endpoints.

## Frequently asked questions

### Should I use RealtimeKit or Realtime SFU?

If you are new to [WebRTC ↗](https://www.cloudflare.com/learning/video-streaming/how-webrtc-works/) and want to add audio or video meetings to your app, use [RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/). It includes [web and mobile SDKs](https://developers.cloudflare.com/realtime/realtimekit/sdk-selection/) with [prebuilt UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/). Cloudflare handles signaling and media routing, and you can add managed [recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/) or [transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/).

If you have WebRTC experience and need control over [what each endpoint publishes or receives](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/), use [Realtime SFU](https://developers.cloudflare.com/realtime/sfu/). Your application handles [signaling, permissions, session state, and track discovery](https://developers.cloudflare.com/realtime/sfu/concepts/architecture/). Cloudflare runs the SFU and forwards media to subscribers.

### How does TURN fit into WebRTC?

A [TURN server](https://developers.cloudflare.com/realtime/turn/what-is-turn/) relays traffic when a NAT or firewall prevents two WebRTC endpoints from connecting directly. If a direct connection works, TURN stays out of the path.

RealtimeKit configures [Cloudflare TURN](https://developers.cloudflare.com/realtime/turn/) for you. Realtime SFU includes access to the same service. You can also use Cloudflare TURN with your own SFU or peer-to-peer application by [generating TURN credentials](https://developers.cloudflare.com/realtime/turn/generate-credentials/).

Cloudflare TURN uses [Anycast ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/), so you do not have to deploy regional TURN servers or load balancers.

### For webinars, should I use RealtimeKit or Stream Live?

Use [RealtimeKit webinars](https://developers.cloudflare.com/realtime/realtimekit/webinar/) when attendees join as participants. They might speak, appear on camera, or move into [breakout rooms](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/breakout-rooms/).

Use [Stream Live](https://developers.cloudflare.com/stream/stream-live/) when a small group of presenters broadcasts and the audience mainly watches. For example, a webinar with a few presenters and a large watch-only audience should use Stream Live.

## Next steps

### [Get started with RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/quickstart/)

Create your first meeting and add RealtimeKit to your app.

### [Get started with Realtime SFU](https://developers.cloudflare.com/realtime/sfu/get-started/)

Create an application, open an SFU session, and publish a media track.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/#page","headline":"Cloudflare Realtime","description":"Build live audio, video, and data applications with Cloudflare Realtime, or broadcast live video with Stream.","url":"https://developers.cloudflare.com/realtime/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
