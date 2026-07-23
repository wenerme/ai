---
description: API reference for RtkMeetingHeaderView component (Android Library)
title: RtkMeetingHeaderView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMeetingHeaderView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-header/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A pre-built meeting header that contains meeting title, clock, recording indicator, participant count, grid paginator, and switch camera button.

## Methods

| Method            | Parameters                    | Description                            |
| ----------------- | ----------------------------- | -------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the header to the meeting state   |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.headers.RtkMeetingHeaderView
    android:id="@+id/rtk_meeting_header"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val header = findViewById<RtkMeetingHeaderView>(R.id.rtk_meeting_header)
header.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-header/#page","headline":"RtkMeetingHeaderView · Cloudflare Realtime docs","description":"API reference for RtkMeetingHeaderView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
