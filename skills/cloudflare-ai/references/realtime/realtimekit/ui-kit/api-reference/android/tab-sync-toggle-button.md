---
description: API reference for RtkTabSyncToggleButton component (Android Library)
title: RtkTabSyncToggleButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkTabSyncToggleButton

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/tab-sync-toggle-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A toggle button for syncing plugin tabs.

## Methods

| Method            | Parameters                    | Description                            |
| ----------------- | ----------------------------- | -------------------------------------- |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkTabSyncToggleButton
    android:id="@+id/rtk_tab_sync"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val tabSyncButton = findViewById<RtkTabSyncToggleButton>(R.id.rtk_tab_sync)
tabSyncButton.isActivated = true
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/tab-sync-toggle-button/#page","headline":"RtkTabSyncToggleButton · Cloudflare Realtime docs","description":"API reference for RtkTabSyncToggleButton component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/tab-sync-toggle-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
