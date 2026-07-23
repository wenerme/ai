---
description: API reference for RtkRecordingIndicator component (Android Library)
title: RtkRecordingIndicator
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkRecordingIndicator

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/recording-indicator/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which indicates the recording status of a meeting. It does not render anything if no recording is taking place.

## Methods

| Method            | Parameters                    | Description                             |
| ----------------- | ----------------------------- | --------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the indicator to the meeting state |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming  |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkRecordingIndicator
    android:id="@+id/rtk_recording_indicator"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val recordingIndicator = findViewById<RtkRecordingIndicator>(R.id.rtk_recording_indicator)
recordingIndicator.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/recording-indicator/#page","headline":"RtkRecordingIndicator · Cloudflare Realtime docs","description":"API reference for RtkRecordingIndicator component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/recording-indicator/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
