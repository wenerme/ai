---
description: API reference for RtkLivestreamViewerCount component (Android Library)
title: RtkLivestreamViewerCount
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkLivestreamViewerCount

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/livestream-viewer-count/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Displays the current viewer count for a livestream.

## Methods

| Method  | Parameters                 | Description                                                |
| ------- | -------------------------- | ---------------------------------------------------------- |
| refresh | meeting: RealtimeKitClient | Update the viewer count based on the current meeting state |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkLivestreamViewerCount
    android:id="@+id/rtk_viewer_count"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val viewerCount = findViewById<RtkLivestreamViewerCount>(R.id.rtk_viewer_count)
viewerCount.refresh(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/livestream-viewer-count/#page","headline":"RtkLivestreamViewerCount · Cloudflare Realtime docs","description":"API reference for RtkLivestreamViewerCount component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/livestream-viewer-count/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
