---
description: API reference for RtkGridView component (Android Library)
title: RtkGridView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkGridView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/grid-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The main grid component which handles the participant grid layout, pagination, and focus modes.

## Methods

| Method            | Parameters                    | Description                                                                                                                                |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| activate          | meeting: RealtimeKitClient    | Bind the grid to the meeting state                                                                                                         |
| refresh           | force: Boolean                | Force a refresh of the grid layout and participants                                                                                        |
| enableFocusMode   | \-                            | Enable focus mode, which hides the horizontal peer strip and full-screen toggle to keep attention on the primary speaker or shared content |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming                                                                                                     |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.grid.RtkGridView
    android:id="@+id/rtk_grid"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### With Methods

```kotlin
val grid = findViewById<RtkGridView>(R.id.rtk_grid)
grid.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/grid-view/#page","headline":"RtkGridView · Cloudflare Realtime docs","description":"API reference for RtkGridView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/grid-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
