---
description: API reference for RtkMeetingHeaderView component (iOS Library)
title: RtkMeetingHeaderView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMeetingHeaderView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-header-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Meeting header view that displays the meeting title, participant count, elapsed time clock, recording indicator, and camera switch button.

## Initializer parameters

| Parameter | Type              | Required | Default | Description                                            |
| --------- | ----------------- | -------- | ------- | ------------------------------------------------------ |
| meeting   | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance for the active meeting |

## Methods

| Method                                | Return Type | Description                                                   |
| ------------------------------------- | ----------- | ------------------------------------------------------------- |
| setContentTop(offset: CGFloat)        | Void        | Sets the top content offset for the header layout             |
| refreshNextPreviousButtonState()      | Void        | Refreshes the enabled state of next and previous page buttons |
| setClicks(nextButton:previousButton:) | Void        | Assigns tap handlers for the next and previous page buttons   |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let headerView = RtkMeetingHeaderView(meeting: rtkClient)
view.addSubview(headerView)
```

### With page navigation

```swift
import RealtimeKitUI

let headerView = RtkMeetingHeaderView(meeting: rtkClient)
headerView.setClicks(
    nextButton: { print("Next page") },
    previousButton: { print("Previous page") }
)
headerView.refreshNextPreviousButtonState()
view.addSubview(headerView)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-header-view/#page","headline":"RtkMeetingHeaderView · Cloudflare Realtime docs","description":"API reference for RtkMeetingHeaderView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-header-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
