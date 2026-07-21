---
description: API reference for RtkNameTagView component (Android Library)
title: RtkNameTagView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkNameTagView

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/name-tag-view/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Displays a participant's name and an audio indicator.

## Methods

| Method            | Parameters                                                 | Description                                   |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------- |
| activate          | participant: RtkMeetingParticipant, isScreenShare: Boolean | Bind the name tag to a participant            |
| setMaxLength      | length: Int                                                | Set the maximum length for the displayed name |
| refresh           | \-                                                         | Refresh the name and audio indicator          |
| applyDesignTokens | designTokens: RtkDesignTokens                              | Apply custom design tokens for theming        |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.nametagview.RtkNameTagView
    android:id="@+id/rtk_name_tag"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val nameTag = findViewById<RtkNameTagView>(R.id.rtk_name_tag)
nameTag.activate(participant)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/name-tag-view/#page","headline":"RtkNameTagView · Cloudflare Realtime docs","description":"API reference for RtkNameTagView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/name-tag-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
