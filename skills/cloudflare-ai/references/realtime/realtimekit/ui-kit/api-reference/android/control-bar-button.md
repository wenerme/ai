---
description: API reference for RtkControlBarButton component (Android Library)
title: RtkControlBarButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkControlBarButton

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/control-bar-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A skeleton component used for composing custom controlbar buttons.

## Properties

| Property              | Type                 | Required | Default | Description                           |
| --------------------- | -------------------- | -------- | ------- | ------------------------------------- |
| rtk\_cbb\_icon        | reference            | ❌        | \-      | Drawable resource for the button icon |
| rtk\_cbb\_variant     | button \| horizontal | ❌        | button  | Layout variant                        |
| rtk\_cbb\_showText    | boolean              | ❌        | true    | Whether to show the label text        |
| rtk\_cbb\_iconSize    | dimension            | ❌        | \-      | Size of the icon                      |
| rtk\_cbb\_iconPadding | dimension            | ❌        | \-      | Padding between icon and label        |

## Methods

| Method             | Parameters                    | Description                            |
| ------------------ | ----------------------------- | -------------------------------------- |
| applyDesignTokens  | designTokens: RtkDesignTokens | Apply custom design tokens for theming |
| setIconDrawable    | drawable: Drawable?           | Set the button icon                    |
| setIconTint        | color: Int                    | Set the icon tint color                |
| setText            | text: String?                 | Set the button label text              |
| setProcessingState | processing: Boolean           | Show or hide a loading spinner         |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.controlbarbuttons.RtkControlBarButton
    android:id="@+id/rtk_control_bar_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:rtk_cbb_showText="true"
    app:rtk_cbb_variant="button" />
```

### With Methods

```kotlin
val buttonView = findViewById<RtkControlBarButton>(R.id.rtk_control_bar_button)
buttonView.setOnClickListener { }
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/control-bar-button/#page","headline":"RtkControlBarButton · Cloudflare Realtime docs","description":"API reference for RtkControlBarButton component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/control-bar-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
