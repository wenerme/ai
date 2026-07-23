---
description: API reference for RtkLivestreamIndicator component (Android Library)
title: RtkLivestreamIndicator
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkLivestreamIndicator

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/livestream-indicator/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A visual indicator that shows when a livestream is active.

## Methods

| Method  | Parameters                 | Description                                                |
| ------- | -------------------------- | ---------------------------------------------------------- |
| refresh | meeting: RealtimeKitClient | Update the indicator based on the current livestream state |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkLivestreamIndicator
    android:id="@+id/rtk_livestream_indicator"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val indicator = findViewById<RtkLivestreamIndicator>(R.id.rtk_livestream_indicator)
indicator.refresh(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/livestream-indicator/#page","headline":"RtkLivestreamIndicator · Cloudflare Realtime docs","description":"API reference for RtkLivestreamIndicator component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/livestream-indicator/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
