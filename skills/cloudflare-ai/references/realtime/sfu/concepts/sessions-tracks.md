---
description: Understand Realtime SFU applications, PeerConnection sessions, track names, and publication and subscription.
title: Sessions and tracks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Sessions and tracks

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Applications group your SFU resources. Sessions represent WebRTC connections. Media tracks carry audio or video, and DataChannels carry application messages.

## Applications

An SFU application has an App ID and App Secret. Its sessions can publish and subscribe to resources within that application. Use separate applications for development, staging, or other environments that need isolation.

Your backend uses the App Secret to authorize SFU API calls. Your application's own authentication and permission checks determine which end users can request those calls.

## Sessions

A session represents one endpoint's WebRTC connection to the SFU. In a browser, an `RTCPeerConnection` object manages that connection. Native applications use the equivalent peer in their WebRTC library. One connection can send and receive multiple media tracks and DataChannels.

A participant does not have to correspond to exactly one session. The [video-room example](https://developers.cloudflare.com/realtime/sfu/examples/video-room/) uses separate publishing and receiving sessions. [Cloud gaming](https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/) uses one session per browser for incoming media and outgoing controls.

### Session setup

Calling `POST /sessions/new` with no request body returns a `sessionId`, but does not establish the WebRTC connection. Follow a [connection recipe](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/) to complete the offer/answer exchange, then wait for the endpoint's connection state to become `connected`.

Create each session when ready to begin negotiation. An unconnected session can expire before its first track or DataChannel operation. Activity on another session does not keep it alive.

If setup expires, later operations can return HTTP `410` with `session_error`. Create a new session and repeat connection setup.

Follow [per-session mutation ordering](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#serialize-mutations-per-session) during setup and later updates.

## Media tracks

A media track carries audio or video. Publishing sends that media into the SFU. Subscribing requests a copy of another endpoint's publication. A browser supplies a `MediaStreamTrack`, while a native endpoint supplies the corresponding encoded media through its WebRTC implementation.

To publish a track, call `tracks/new` with `location: "local"` and give the publication a `trackName`. To subscribe, call `tracks/new` on the receiving session with `location: "remote"`, the publisher's `sessionId`, and the same `trackName`.

The main identifiers have distinct purposes:

| Identifier | Purpose |
| --- | --- |
| `appId` | Selects the SFU application |
| `sessionId` | In the URL, selects the target session. In a remote track entry, identifies the publisher |
| `trackName` | Names the publication within its publishing session |
| `mid` | Identifies a media section/transceiver in a particular PeerConnection's session description |
| Application member or device ID | Identifies an entity in your own state and permission model |

Use the publisher's session ID together with the track name to locate remote media. A track's `mid` belongs to its connection. A subscriber can receive that publication on a different `mid`.

## Discovery and subscriptions

Your application maintains a list of available publications and shares it with authorized subscribers. Each subscriber chooses which tracks to request.

For a room, that state might contain members and their camera/microphone publications. For a device, it might contain its active publisher session and telemetry channel names. Keep discovery state current when publications end or sessions are replaced.

A successful HTTP response can contain errors for individual tracks. Check each result before recording a publication or subscription as ready.

## DataChannels

DataChannels carry application messages such as telemetry, text, and control events. They have negotiated channel IDs and delivery settings, and use separate [DataChannel API operations](https://developers.cloudflare.com/realtime/sfu/features/datachannels/). They are not browser `MediaStreamTrack` objects.

## Resource lifetime

Remove a publication from discovery when your application stops offering it. This does not close existing subscriptions. Retain its SFU identifiers privately while cleanup remains outstanding.

Follow the [media-close sequence](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/#close-media-tracks) or [DataChannel closure](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#close-channels) when resources are no longer needed. Refer to [limits](https://developers.cloudflare.com/realtime/sfu/platform/limits/#inactivity-timeout) for expiration and reuse, and [Best practices](https://developers.cloudflare.com/realtime/sfu/best-practices/#retain-cleanup-state) for cleanup ownership.

## Learn with an example

[Run the video room](https://developers.cloudflare.com/realtime/sfu/get-started/) to publish camera and microphone tracks, discover another participant, and pull remote media. Its [architecture guide ↗︎](https://github.com/cloudflare/realtime-examples/blob/main/video-room/ARCHITECTURE.md#identifier-ownership) maps each identifier to the component that owns it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/#page","headline":"Sessions and tracks","description":"Understand Realtime SFU applications, PeerConnection sessions, track names, and publication and subscription.","url":"https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
