---
description: API reference for RtkMeetingTitleLabel component (iOS Library)
title: RtkMeetingTitleLabel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMeetingTitleLabel

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-title-label/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A label that displays the meeting title from the meeting metadata.

## Initializer parameters

| Parameter  | Type              | Required | Default                                | Description                                            |
| ---------- | ----------------- | -------- | -------------------------------------- | ------------------------------------------------------ |
| meeting    | RealtimeKitClient | ✅        | \-                                     | The RealtimeKit client instance for the active meeting |
| appearance | RtkTextAppearance | ❌        | AppTheme.shared.meetingTitleAppearance | Text appearance configuration for font and color       |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let titleLabel = RtkMeetingTitleLabel(meeting: rtkClient)
view.addSubview(titleLabel)
```

### With custom appearance

```swift
import RealtimeKitUI

let appearance = RtkTextAppearance(
    font: UIFont.systemFont(ofSize: 18, weight: .bold),
    textColor: .white
)
let titleLabel = RtkMeetingTitleLabel(
    meeting: rtkClient,
    appearance: appearance
)
view.addSubview(titleLabel)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-title-label/#page","headline":"RtkMeetingTitleLabel · Cloudflare Realtime docs","description":"API reference for RtkMeetingTitleLabel component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-title-label/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
