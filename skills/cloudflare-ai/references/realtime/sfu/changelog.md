---
description: Changelog and release notes for the Cloudflare Realtime SFU platform.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/sfu/changelog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/realtime/sfu/changelog/index.xml)

## 2026-07-23

**DataChannels return-to-publisher (canReply)**

DataChannels now support opt-in reverse traffic from one subscriber back to the publisher on the same channel. When a subscriber pulls a remote DataChannel with `canReply: true` (or is granted it later via `datachannels/update`), the SFU admits that subscriber's messages to the publisher only.

* Opt-in per subscriber; defaults to `false`, so existing publisher-to-subscriber fan-out is unchanged.
* Reverse traffic is not fanned out to other subscribers.
* Exclusive: at most one subscriber holds `canReply` per publisher DataChannel; a new grant replaces the previous holder.
* Grant or revoke without re-pulling via `PUT .../datachannels/update`.
* Docs: [DataChannels](https://developers.cloudflare.com/realtime/sfu/datachannels/), [Limits, timeouts and quotas](https://developers.cloudflare.com/realtime/sfu/limits/)

## 2026-06-10

**DataChannels subscriber acknowledgment gate (waitForAck)**

DataChannels now support an opt-in subscriber acknowledgment gate. When a subscriber pulls a remote DataChannel with `waitForAck: true`, the SFU holds delivery to that subscriber until it sends its first message (the acknowledgment). This avoids losing the first messages before the subscriber is ready to handle them.

* Opt-in per subscriber; defaults to `false`, so existing behavior is unchanged.
* The acknowledgment is consumed by the SFU and is not forwarded, so the channel stays unidirectional.
* Send the acknowledgment within 15 seconds of creating the remote DataChannel.
* Docs: [DataChannels](https://developers.cloudflare.com/realtime/sfu/datachannels/), [Limits, timeouts and quotas](https://developers.cloudflare.com/realtime/sfu/limits/)

## 2025-11-21

**WebSocket adapter video (JPEG) support**

Updated Media Transport Adapters (WebSocket adapter) to support video egress as JPEG frames in addition to audio.

* Stream audio and video between WebRTC tracks and WebSocket endpoints
* Video egress-only as JPEG at approximately 1 FPS for snapshots, thumbnails, and computer vision pipelines
* Clarified media formats for PCM audio and JPEG video over Protocol Buffers
* Updated docs: [Adapters](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/), [WebSocket adapter](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/websocket-adapter/)

## 2025-08-29

**Media Transport Adapters (WebSocket) open beta**

Open beta for Media Transport Adapters (WebSocket adapter) to bridge audio between WebRTC and WebSocket.

* Ingest (WebSocket → WebRTC) and Stream (WebRTC → WebSocket)
* Opus for WebRTC tracks; PCM over WebSocket via Protocol Buffers

Docs: [Adapters](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/), [WebSocket adapter](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/websocket-adapter/)

## 2024-09-25

**TURN service is generally available (GA)**

Cloudflare Realtime TURN service is generally available and helps address common challenges with real-time communication. For more information, refer to the [blog post](https://blog.cloudflare.com/webrtc-turn-using-anycast/) or [TURN documentation](https://developers.cloudflare.com/realtime/turn/).

## 2024-04-04

**Orange Meets availability**

Orange Meets, Cloudflare's internal video conferencing app, is open source and available for use from [Github](https://github.com/cloudflare/orange?cf%5Ftarget%5Fid=40DF7321015C5928F9359DD01303E8C2).

## 2024-04-04

**Cloudflare Realtime open beta**

Cloudflare Realtime is in open beta and available from the Cloudflare Dashboard.

## 2022-09-27

**Cloudflare Realtime closed beta**

Cloudflare Realtime is available as a closed beta for users who request an invitation. Refer to the [blog post](https://blog.cloudflare.com/announcing-cloudflare-calls/) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/sfu/changelog/#page","headline":"Changelog · Cloudflare Realtime docs","description":"Changelog and release notes for the Cloudflare Realtime SFU platform.","url":"https://developers.cloudflare.com/realtime/sfu/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
