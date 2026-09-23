---
description: Separate media transport from application signaling, state, and permissions when building with Realtime SFU.
title: Application architecture
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Application architecture

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/concepts/architecture/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Realtime SFU forwards media tracks and DataChannels between endpoints. Your application supplies the signaling, state, and permissions around those connections.

An endpoint can be a browser, embedded device, native process, or server with a WebRTC implementation. Endpoints publish media, subscribe to media, or do both.

## Media and signaling

Media and DataChannels flow over WebRTC between the endpoint and SFU. Signaling exchanges setup information through your backend, including [SDP offers and answers](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/).

Your backend coordinates which publications an endpoint can send or receive. The SFU carries the selected media:

**Publishing endpoint**

**Application backend**

**Realtime SFU**

**Receiving endpoint**

Authenticate and request publication

Set up the publishing session and tracks

Complete connection setup

WebRTC media

Share authorized publication identifiers

Request those publications

Set up the receiving session and subscriptions

Complete connection setup

Forward the selected media

The [connection patterns](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/) guide gives complete media and DataChannel setup sequences. The backend can use HTTPS, WebSockets, or another application protocol to communicate with endpoints. Its SFU API calls use HTTPS. Workers is one backend option; containers and conventional servers use the same interfaces.

A [WebSocket media adapter](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/) connects an external service that exchanges media over WebSockets instead of implementing WebRTC.

## Managed SFU infrastructure

With Realtime SFU, your application does not deploy SFU servers or select an SFU region. It creates connections through the HTTPS API and identifies remote publications by their publisher session ID and track name.

Cloudflare operates the SFU infrastructure. Your application still supplies its signaling backend, identity, discovery, and permissions. A room, broadcast, or device group is application state; the Connection API exposes sessions and publications that you compose into that topology.

## Responsibilities

Each layer owns a different part of the application:

| Layer | Responsibilities |
| --- | --- |
| Endpoint | Capture or generate media, own PeerConnections, apply session descriptions, and present connection state |
| Application backend | Authenticate users and devices, authorize operations, hold SFU credentials, and call the SFU API |
| Application state | Track membership, published media, subscriptions, operator roles, and resource cleanup |
| Realtime SFU | Establish WebRTC sessions and forward the media tracks and DataChannels selected by your application |

Rooms, participants, robot names, and controller roles are application concepts. For example, a Durable Object can hold one room's membership or one device's controller lease. Another backend can store the same state using its own services.

## Choose a topology

The publish and subscribe operations support several application shapes:

| Application | Publication and subscription pattern |
| --- | --- |
| Video room | Participants publish their media and subscribe to other participants |
| Broadcast | One publisher sends tracks that multiple viewers subscribe to |
| Device monitoring | A device publishes media and telemetry; an authorized operator can reply with controls |
| Cloud gaming | A native process publishes audio/video; viewers receive media and one viewer sends input |
| AI audio | A WebSocket adapter moves media between WebRTC endpoints and an audio-processing service |

An endpoint may use one bidirectional session or separate publishing and receiving sessions. Each session has one PeerConnection and one negotiation state machine. Refer to [negotiation](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/) before sharing a session across concurrent operations.

## Credentials and discovery

Create an SFU application through the dashboard or API. Keep its App Secret on trusted backend infrastructure. In Workers, store the app values as Worker secrets.

An endpoint authenticates to your backend using your application's identity mechanism. The backend checks which resources it can access before making an SFU request. A room name, session ID, or track name does not establish permission.

After publication, your application distributes the publisher's session ID and track name to authorized subscribers. The SFU does not supply a room-presence protocol. Refer to [sessions and tracks](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/) for identifier ownership.

## Learn with an example

The [video room](https://developers.cloudflare.com/realtime/sfu/examples/video-room/) uses a Worker and one Durable Object per room for membership and track discovery. [Pocket Radio](https://developers.cloudflare.com/realtime/sfu/examples/embedded-devices/) applies the same separation to a device, browser listeners, and an exclusive controller.

Explore the [SFU network visualization ↗](https://realtime-sfu.dev-demos.workers.dev) for an illustration of endpoint connections and media routing.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/concepts/architecture/#page","headline":"Application architecture","description":"Separate media transport from application signaling, state, and permissions when building with Realtime SFU.","url":"https://developers.cloudflare.com/realtime/sfu/concepts/architecture/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
