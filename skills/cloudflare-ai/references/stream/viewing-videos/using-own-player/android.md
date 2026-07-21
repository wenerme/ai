---
description: Stream on-demand and live Cloudflare Stream video in native Android apps using ExoPlayer.
title: Android
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

#  Android

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/stream/viewing-videos/using-own-player/android/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can stream both on-demand and live video to native Android apps using [ExoPlayer ↗](https://exoplayer.dev/).

Note

Before you can play videos, you must first [upload a video to Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/) or be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live)

## Example Apps

* [Android](https://developers.cloudflare.com/stream/examples/android/)

## Using ExoPlayer

Play a video from Cloudflare Stream using ExoPlayer:

```kotlin
implementation 'com.google.android.exoplayer:exoplayer-hls:2.X.X'

SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).build();

// Set the media item to the Cloudflare Stream HLS Manifest URL:
player.setMediaItem(MediaItem.fromUri("https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8"));

player.prepare();
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/viewing-videos/using-own-player/android/#page","headline":"Android · Cloudflare Stream docs","description":"Stream on-demand and live Cloudflare Stream video in native Android apps using ExoPlayer.","url":"https://developers.cloudflare.com/stream/viewing-videos/using-own-player/android/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
