---
description: Reference Realtime SFU API limits, resource timeouts, DataChannel constraints, and supported media codecs.
title: Limits, timeouts, and quotas
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits, timeouts, and quotas

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/platform/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

These limits apply to Realtime SFU resources. Application limits such as room admission or a device's viewer cap are separate policies.

## API and resource limits

The API limits are:

| Resource or operation | Limit |
| --- | --- |
| API requests per session | 50 requests per second. The rate limit is per session rather than per app |
| Tracks added in one API request | Up to 64 |
| Tracks in a session | No fixed upper bound. Endpoint and connection capacity impose practical limits |
| WebSocket adapters created or closed in one request | One to four track entries |
| Reply access to a publisher DataChannel | At most one subscriber with `canReply` |
| WebSocket audio ingest message | 32 KB including serialized packet overhead |

Distribute larger track batches across multiple calls and serialize mutations on each session. Inspect per-item results before retrying a partially successful batch.

## Inactivity timeout

Apply each timeout to its resource and condition:

| Condition | Timeout | Result |
| --- | --- | --- |
| A media track receives no incoming media packets | 30 seconds | The track is garbage-collected. Restore an expired publication and rebuild its subscriptions. |
| A session loses WebRTC connectivity | 30-second session/track reuse window | Reuse requires a viable connection and resources. Replace failed or closed connections immediately, or reconnect with a new session after the window. |
| A remote DataChannel uses `waitForAck: true` | First subscriber message within 30 seconds of allocation | Without it, the gated channel closes. Create a new subscription. Refer to [subscriber readiness](https://developers.cloudflare.com/realtime/sfu/features/datachannels/#wait-for-subscriber-readiness-waitforack). |

For expiry before a session's first connection, follow [session setup guidance](https://developers.cloudflare.com/realtime/sfu/concepts/sessions-tracks/#session-setup). The media inactivity timeout does not define the lifetime of a connected session without media or a DataChannel-only connection. Close resources when finished.

Application heartbeat expiry does not mean WebRTC disconnected. Media that keeps arriving does not meet the inactivity condition. Use [close results](https://developers.cloudflare.com/realtime/sfu/observability/error-codes/#interpret-close-results) and [recovery guidance](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#retry-and-reconnect) to decide whether cleanup is complete or a resource can be reused.

## PeerConnection requirements

Operations that require an established transport wait up to five seconds for connectivity before timing out. Complete initial transport negotiation before those operations. The [connection recipes](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/) show where to apply SDP and wait for connectivity.

## Adapter recovery

For WebRTC-to-WebSocket streaming, the SFU retries the same endpoint for up to five seconds after a temporary disconnect. An exhausted reconnect window closes the adapter. Ingest adapters do not automatically reconnect.

Refer to [WebSocket adapter reconnect](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/#automatic-reconnection-for-streaming) for buffering, delivery behavior, and application recovery.

## Supported codecs

Realtime SFU supports these media-track codecs:

| Media | Codecs |
| --- | --- |
| Video | H.264, H.265, VP8, VP9, AV1 |
| Audio | Opus, G.711 A-law, G.711 µ-law |

Endpoint support varies by WebRTC implementation. WebSocket adapters have their own [format and direction constraints](https://developers.cloudflare.com/realtime/sfu/features/media-transport-adapters/websocket-adapter/#supported-media-and-directions), including PCM audio and JPEG video output.

## Usage allowance

Refer to [pricing](https://developers.cloudflare.com/realtime/sfu/platform/pricing/) for egress charging and the shared monthly free tier.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/platform/limits/#page","headline":"Limits, timeouts, and quotas","description":"Reference Realtime SFU API limits, resource timeouts, DataChannel constraints, and supported media codecs.","url":"https://developers.cloudflare.com/realtime/sfu/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
