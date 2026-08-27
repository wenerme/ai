---
description: Build custom audio, video, and data applications from WebRTC primitives with Cloudflare Realtime SFU.
title: Realtime SFU
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Realtime SFU

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/sfu/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Compose real-time audio, video, and data applications from WebRTC primitives.

Cloudflare Realtime SFU routes WebRTC media tracks and DataChannels between browser, native, server, and external media endpoints. Your application controls who publishes, who subscribes, and how participants discover each other.

Cloudflare Realtime SFU runs on [Cloudflare's global cloud network ↗](https://www.cloudflare.com/network/) in hundreds of cities worldwide.

## What you can build

### [Custom calls and rooms](https://developers.cloudflare.com/realtime/sfu/example-architecture/)

Build your own signaling, presence, permissions, and user interface.

### [Interactive broadcasts](https://developers.cloudflare.com/realtime/sfu/sessions-tracks/)

Publish media once and choose which sessions receive each track.

### [Cloud gaming and device control](https://developers.cloudflare.com/realtime/sfu/datachannels/)

Send media downstream and low-latency control data upstream.

### [AI and media processing](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/)

Connect WebRTC tracks to AI services and external media systems.

## Application architecture

Each client creates a WebRTC PeerConnection. Your backend stores the application secret and uses the Realtime SFU API to create the corresponding session. It also authenticates users, authorizes publish and subscribe operations, and shares session or track identifiers through your application state.

Realtime SFU forwards the selected media or data. It does not define rooms, participants, roles, or presence for your application.

## Explore examples

Use the [Realtime Examples repository ↗](https://github.com/cloudflare/realtime-examples)to choose a starting point for what you want to build. Each example identifies its status, credential boundary, and known limitations.

[Browse Realtime examples](https://github.com/cloudflare/realtime-examples) [Create an SFU application](https://developers.cloudflare.com/realtime/sfu/get-started/) [Realtime dashboard](https://dash.cloudflare.com/?to=/:account/calls)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/sfu/#page","headline":"Overview · Cloudflare Realtime docs","description":"Build custom audio, video, and data applications from WebRTC primitives with Cloudflare Realtime SFU.","url":"https://developers.cloudflare.com/realtime/sfu/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
