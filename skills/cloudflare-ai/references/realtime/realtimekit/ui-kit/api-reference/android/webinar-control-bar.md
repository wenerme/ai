---
description: API reference for RtkWebinarControlBarView component (Android Library)
title: RtkWebinarControlBarView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkWebinarControlBarView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/webinar-control-bar/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A pre-built control bar for webinar meetings. Contains mic toggle, camera toggle, webinar stage toggle, more toggle, and leave button.

## Methods

| Method                   | Parameters                 | Description                                       |
| ------------------------ | -------------------------- | ------------------------------------------------- |
| activate                 | meeting: RealtimeKitClient | Bind the control bar to the meeting state         |
| deactivate               | \-                         | Unbind the control bar and remove event listeners |
| refreshStageToggleButton | \-                         | Force a refresh of the stage toggle button state  |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.controlbars.RtkWebinarControlBarView
    android:id="@+id/rtk_webinar_control_bar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val controlBar = findViewById<RtkWebinarControlBarView>(R.id.rtk_webinar_control_bar)
controlBar.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/webinar-control-bar/#page","headline":"RtkWebinarControlBarView · Cloudflare Realtime docs","description":"API reference for RtkWebinarControlBarView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/webinar-control-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
