---
description: API reference for RtkAudioButtonControlBar component (iOS Library)
title: RtkAudioButtonControlBar
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkAudioButtonControlBar

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-audio-button-control-bar/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A control bar button that toggles the local microphone on and off. Checks microphone permissions before toggling.

## Initializer parameters

| Parameter  | Type                                  | Required | Default | Description                              |
| ---------- | ------------------------------------- | -------- | ------- | ---------------------------------------- |
| meeting    | RealtimeKitClient                     | ✅        | \-      | The RealtimeKit client instance          |
| onClick    | ((RtkAudioButtonControlBar) -> Void)? | ❌        | nil     | Closure called when the button is tapped |
| appearance | RtkControlBarButtonAppearance         | ❌        | \-      | Appearance configuration for the button  |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let audioButton = RtkAudioButtonControlBar(meeting: rtkClient)
view.addSubview(audioButton)
```

### With tap handler

```swift
import RealtimeKitUI

let audioButton = RtkAudioButtonControlBar(
    meeting: rtkClient,
    onClick: { button in
        print("Audio toggled")
    }
)
view.addSubview(audioButton)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-audio-button-control-bar/#page","headline":"RtkAudioButtonControlBar · Cloudflare Realtime docs","description":"API reference for RtkAudioButtonControlBar component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-audio-button-control-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
