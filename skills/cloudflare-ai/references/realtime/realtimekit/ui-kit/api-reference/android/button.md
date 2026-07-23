---
description: API reference for RtkButton component (Android Library)
title: RtkButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkButton

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button that follows the RealtimeKit design system.

## Properties

| Property          | Type                 | Required | Default | Description |                |
| ----------------- | -------------------- | -------- | ------- | ----------- | -------------- |
| rtk\_btn\_variant | primary \| secondary | danger   | ❌       | \-          | Button variant |

## Methods

| Method            | Parameters                    | Description                                 |
| ----------------- | ----------------------------- | ------------------------------------------- |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming      |
| refresh           | uiTokens: RtkDesignTokens     | Refresh the button with the provided tokens |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.button.RtkButton
    android:id="@+id/btn_id"
    android:layout_width="200dp"
    android:layout_height="48dp"
    android:text="Text on Button"
    app:rtk_btn_variant="primary" />
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/button/#page","headline":"RtkButton · Cloudflare Realtime docs","description":"API reference for RtkButton component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
