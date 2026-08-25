---
description: Example of video playback on Android using ExoPlayer
title: Android (ExoPlayer)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# Android (ExoPlayer)

Example of video playback on Android using ExoPlayer

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/examples/android/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Before you can play videos, you must first [upload a video to Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/) or be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live)

```kotlin
implementation 'com.google.android.exoplayer:exoplayer-hls:2.X.X'

SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).build();

// Set the media item to the Cloudflare Stream HLS Manifest URL:
player.setMediaItem(MediaItem.fromUri("https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8"));

player.prepare();
```

### Download and run an example app

1. Download [this example app ↗](https://github.com/googlecodelabs/exoplayer-intro.git) from the official Android developer docs, following [this guide ↗](https://developer.android.com/codelabs/exoplayer-intro#4).
2. Open and run the [exoplayer-codelab-04 example app ↗](https://github.com/googlecodelabs/exoplayer-intro/tree/main/exoplayer-codelab-04) using [Android Studio ↗](https://developer.android.com/studio).
3. Replace the `media_url_dash` URL on [this line ↗](https://github.com/googlecodelabs/exoplayer-intro/blob/main/exoplayer-codelab-04/src/main/res/values/strings.xml#L21) with the DASH manifest URL for your video.

For more, see [read the docs](https://developers.cloudflare.com/stream/viewing-videos/using-own-player/ios/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/android/#page","headline":"Android (ExoPlayer) · Cloudflare Stream docs","description":"Example of video playback on Android using ExoPlayer","url":"https://developers.cloudflare.com/stream/examples/android/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
```
