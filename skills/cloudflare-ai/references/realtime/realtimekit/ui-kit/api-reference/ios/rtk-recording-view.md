---
description: API reference for RtkRecordingView component (iOS Library)
title: RtkRecordingView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkRecordingView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-recording-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A blinking recording indicator displayed when the meeting is being recorded. Shows a red dot with configurable text and image.

## Initializer parameters

| Parameter  | Type                       | Required | Default | Description                                            |
| ---------- | -------------------------- | -------- | ------- | ------------------------------------------------------ |
| meeting    | RealtimeKitClient          | ✅        | \-      | The RealtimeKit client instance for the active meeting |
| title      | String                     | ❌        | "Rec"   | Text label displayed next to the recording indicator   |
| image      | RtkImage?                  | ❌        | nil     | Custom image for the recording indicator               |
| appearance | RtkRecordingViewAppearance | ❌        | \-      | Appearance configuration for the recording indicator   |

## Methods

| Method                | Return Type | Description                                                       |
| --------------------- | ----------- | ----------------------------------------------------------------- |
| blinking(start: Bool) | Void        | Starts or stops the blinking animation on the recording indicator |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let recordingView = RtkRecordingView(meeting: rtkClient)
view.addSubview(recordingView)
```

### With custom title

```swift
import RealtimeKitUI

let recordingView = RtkRecordingView(
    meeting: rtkClient,
    title: "Recording"
)
view.addSubview(recordingView)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-recording-view/#page","headline":"RtkRecordingView · Cloudflare Realtime docs","description":"API reference for RtkRecordingView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-recording-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
