---
description: API reference for RtkVideoPeer component (Android Library)
title: RtkVideoPeer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkVideoPeer

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-peer/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A view that renders a participant's video stream with an avatar fallback when video is disabled.

## Methods

| Method  | Parameters                                                 | Description                               |
| ------- | ---------------------------------------------------------- | ----------------------------------------- |
| refresh | participant: RtkMeetingParticipant, isScreenShare: Boolean | Update the view with the participant data |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkVideoPeer
    android:id="@+id/rtk_video_peer"
    android:layout_width="match_parent"
    android:layout_height="200dp" />
```

### With Methods

```kotlin
val videoPeer = findViewById<RtkVideoPeer>(R.id.rtk_video_peer)
videoPeer.refresh(participant, isScreenShare = false)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-peer/#page","headline":"RtkVideoPeer · Cloudflare Realtime docs","description":"API reference for RtkVideoPeer component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-peer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
