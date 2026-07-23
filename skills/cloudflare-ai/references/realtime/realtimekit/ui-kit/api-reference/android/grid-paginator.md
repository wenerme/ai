---
description: API reference for RtkGridPaginatorView component (Android Library)
title: RtkGridPaginatorView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkGridPaginatorView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/grid-paginator/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which allows you to change the current page of the active participants grid.

## Methods

| Method   | Parameters                                                     | Description                             |
| -------- | -------------------------------------------------------------- | --------------------------------------- |
| activate | rtkAndroidClient: RealtimeKitClient, uiTokens: RtkDesignTokens | Bind the paginator to the meeting state |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkGridPaginatorView
    android:id="@+id/rtk_grid_paginator"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val paginatorView = findViewById<RtkGridPaginatorView>(R.id.rtk_grid_paginator)
paginatorView.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/grid-paginator/#page","headline":"RtkGridPaginatorView · Cloudflare Realtime docs","description":"API reference for RtkGridPaginatorView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/grid-paginator/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
