---
description: Diagnose Realtime SFU setup, negotiation, media, DataChannel, and adapter problems using endpoint and backend observations.
title: Observability
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Observability

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/observability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Separate application requests, WebRTC connection state, and media delivery when diagnosing an SFU integration. A successful backend response does not by itself prove that media is arriving.

For a returned API error, use the [Error codes reference](https://developers.cloudflare.com/realtime/sfu/observability/error-codes/) to interpret the response and choose the next action.

## Record useful context

Record the operation, time, application resource ID, SFU session or adapter ID, HTTP status, and per-item error codes. On the endpoint, record signaling, connection, and DataChannel state transitions.

Keep App Secrets, endpoint tokens, SDP, ICE credentials, and media payloads out of logs. Sanitize errors before returning them to untrusted clients.

## Check the failing layer

Use the symptom to choose the next observation:

| Symptom | Check |
| --- | --- |
| Application request is denied | Identity, membership, ownership, and the deployed backend's authentication configuration |
| SFU request fails | HTTP status, top-level error, per-item results, and required fields in the [API schema](https://developers.cloudflare.com/realtime/static/realtime-api-2024-05-21.yaml) |
| HTTP `200` but a track is missing | Per-track error fields, publication discovery, publisher session ID, and track name |
| Negotiation remains unstable, or overlapping pulls return `406` | Public errors, outstanding offers, and [per-session ordering](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#serialize-mutations-per-session) |
| Connected but no incoming media | Source publication, subscribed tracks, receiver statistics, and browser playback state |
| Video works but audio is silent | Microphone permission, mute state, audio track statistics, and autoplay requirements |
| Publisher messages do not reach a subscriber | Check that each endpoint uses its own [allocated channel ID](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#add-an-application-channel), matching [delivery settings](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#configure-message-delivery), and any required [readiness message](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#wait-for-subscriber-readiness-waitforack). |
| Subscriber controls do not reach the publisher | Check that this subscriber holds [reply access](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#return-to-publisher-canreply). With `waitForAck`, its first message is consumed as readiness; send commands afterward. |
| An adapter cannot connect | Check the service's [WebSocket upgrade, reachability, and authentication](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/#troubleshooting). |

## Inspect browser media statistics

Use `RTCPeerConnection.getStats()` to observe inbound traffic. Compare samples over time; a single cumulative byte count cannot establish that media is still flowing.

In this browser snippet, `pc` is the receiving PeerConnection:

```ts
const report = await pc.getStats();
for (const stat of report.values()) {
  if (stat.type === "inbound-rtp") {
    console.log({
      id: stat.id,
      kind: stat.kind,
      bytesReceived: stat.bytesReceived,
      packetsLost: stat.packetsLost,
      jitter: stat.jitter,
    });
  }
}
```

Check increasing received bytes alongside the application's visible playback state. If packets arrive but the element stays silent, inspect playback permissions and audio output. If packets stop, inspect publication, subscriptions, and connection state.

## Handle lifecycle failures

Use application state and resource results to distinguish these failures:

| Symptom | Check and next action |
| --- | --- |
| Membership remains after media fails | Compare application membership with the PeerConnection state. Use the application's [connection recovery policy](https://developers.cloudflare.com/realtime/sfu/best-practices/#define-recovery-explicitly). |
| An API response is lost or times out | Record the interrupted operation and known resource identifiers. Follow [operation-specific recovery](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#retry-and-reconnect) before another mutation. |
| Reconnect restores the wrong tracks | Compare the current session IDs and connection attempt ID with the response being applied. Refer to [replacement connections](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#retry-and-reconnect). |
| Leave or stop never finishes | Inspect pending track, channel, and adapter closures and their item errors. [Retain cleanup state](https://developers.cloudflare.com/realtime/sfu/best-practices/#retain-cleanup-state) while retrying failed items. |
| A track disappears after inactivity | Check the source's last incoming media and the [inactivity timeout](https://developers.cloudflare.com/realtime/sfu/platform/limits/#inactivity-timeout). |
| An adapter stops delivering after a disconnect | Check its direction and whether the [stream reconnect window](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/#automatic-reconnection-for-streaming) expired. Recreate terminally closed adapters. |

## Learn with an example

The [video-room troubleshooting guide ↗](https://github.com/cloudflare/realtime-examples/blob/main/video-room/TROUBLESHOOTING.md) connects authentication, media, and room lifecycle symptoms to checks. The [cloud-gaming guide ↗](https://github.com/cloudflare/realtime-examples/blob/main/cloud-gaming/TROUBLESHOOTING.md) distinguishes Container startup, publisher readiness, media, and control ownership.

For device setup and browser recovery, use [Pocket Radio troubleshooting ↗](https://github.com/cloudflare/realtime-examples/blob/main/esp32-radio/TROUBLESHOOTING.md). The [WebSocket adapter reference](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/#troubleshooting) explains its public errors and media-format checks.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/observability/#page","headline":"Observability","description":"Diagnose Realtime SFU setup, negotiation, media, DataChannel, and adapter problems using endpoint and backend observations.","url":"https://developers.cloudflare.com/realtime/sfu/observability/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
