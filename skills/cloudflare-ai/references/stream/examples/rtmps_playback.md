---
description: Example of sub 1s latency video playback using RTMPS and ffplay
title: RTMPS playback
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# RTMPS playback

Example of sub 1s latency video playback using RTMPS and ffplay

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/examples/rtmps%5Fplayback/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Before you can play live video, you must first be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live/start-stream-live).

Copy the RTMPS _playback_ key for your live input from either:

* The **Live inputs** page of the Cloudflare dashboard.
[Go to **Live inputs** ↗](https://dash.cloudflare.com/?to=/:account/stream/inputs)
* The [Stream API](https://developers.cloudflare.com/stream/stream-live/start-stream-live/#use-the-api)

Paste it into the URL below, replacing `<RTMPS_PLAYBACK_KEY>`:

```sh
ffplay -analyzeduration 1 -fflags -nobuffer -sync ext 'rtmps://live.cloudflare.com:443/live/<RTMPS_PLAYBACK_KEY>'
```

For more, refer to [Play live video in native apps with less than one second latency](https://developers.cloudflare.com/stream/viewing-videos/using-own-player/#play-live-video-in-native-apps-with-less-than-1-second-latency).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/rtmps_playback/#page","headline":"RTMPS playback · Cloudflare Stream docs","description":"Example of sub 1s latency video playback using RTMPS and ffplay","url":"https://developers.cloudflare.com/stream/examples/rtmps_playback/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
```
