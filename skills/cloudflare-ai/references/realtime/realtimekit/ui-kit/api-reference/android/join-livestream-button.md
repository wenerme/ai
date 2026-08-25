---
description: API reference for RtkJoinLivestreamButton component (Android Library)
title: RtkJoinLivestreamButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkJoinLivestreamButton

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-livestream-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button for joining or leaving the livestream stage.

## Methods

| Method   | Parameters                 | Description                          |
| -------- | -------------------------- | ------------------------------------ |
| activate | meeting: RealtimeKitClient | Bind the button to the meeting state |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.RtkJoinLivestreamButton
    android:id="@+id/rtk_join_livestream"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### With Methods

```kotlin
val joinLivestreamButton = findViewById<RtkJoinLivestreamButton>(R.id.rtk_join_livestream)
joinLivestreamButton.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-livestream-button/#page","headline":"RtkJoinLivestreamButton · Cloudflare Realtime docs","description":"API reference for RtkJoinLivestreamButton component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-livestream-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
