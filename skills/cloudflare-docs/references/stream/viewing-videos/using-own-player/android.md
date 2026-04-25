---
title: Android
description: Stream on-demand and live Cloudflare Stream video in native Android apps using ExoPlayer.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Android

You can stream both on-demand and live video to native Android apps using [ExoPlayer ↗](https://exoplayer.dev/).

Note

Before you can play videos, you must first [upload a video to Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/) or be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live)

## Example Apps

* [Android](https://developers.cloudflare.com/stream/examples/android/)

## Using ExoPlayer

Play a video from Cloudflare Stream using ExoPlayer:

Kotlin

```

implementation 'com.google.android.exoplayer:exoplayer-hls:2.X.X'


SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).build();


// Set the media item to the Cloudflare Stream HLS Manifest URL:

player.setMediaItem(MediaItem.fromUri("https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8"));


player.prepare();


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/viewing-videos/","name":"Play video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/viewing-videos/using-own-player/","name":"Use your own player"}},{"@type":"ListItem","position":5,"item":{"@id":"/stream/viewing-videos/using-own-player/android/","name":"Android"}}]}
```
