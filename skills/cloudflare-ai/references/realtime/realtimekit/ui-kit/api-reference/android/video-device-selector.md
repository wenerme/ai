---
description: API reference for RtkVideoDeviceSelector component (Android Library)
title: RtkVideoDeviceSelector
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkVideoDeviceSelector

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-device-selector/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A video device selector component which can be used to select video devices.

## Properties

| Property       | Type   | Required | Default | Description       |
| -------------- | ------ | -------- | ------- | ----------------- |
| rtk\_ds\_label | string | ❌        | Video   | Custom label text |

## Methods

| Method            | Parameters                    | Description                               |
| ----------------- | ----------------------------- | ----------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the selector to the meeting state    |
| disableLabel      | \-                            | Disable the label text above the dropdown |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming    |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkVideoDeviceSelector
    android:id="@+id/videoSelector"
    app:rtk_ds_label="Camera"
    android:layout_width="0dp"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val videoSelector = findViewById<RtkVideoDeviceSelector>(R.id.videoSelector)
videoSelector.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-device-selector/#page","headline":"RtkVideoDeviceSelector · Cloudflare Realtime docs","description":"API reference for RtkVideoDeviceSelector component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-device-selector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
