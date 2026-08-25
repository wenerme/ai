---
description: API reference for RtkNotificationBadgeView component (iOS Library)
title: RtkNotificationBadgeView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkNotificationBadgeView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-badge-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A small circular badge view that displays a notification count. Hides automatically when the count is zero and shows "99+" for counts over 99.

## Methods

| Method             | Return Type | Description                                                                          |
| ------------------ | ----------- | ------------------------------------------------------------------------------------ |
| setBadgeCount(\_:) | Void        | Sets the badge count. Hides the badge at zero and displays "99+" for values over 99. |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let badge = RtkNotificationBadgeView()
badge.setBadgeCount(5)
view.addSubview(badge)
```

### Reset badge

```swift
import RealtimeKitUI

let badge = RtkNotificationBadgeView()
badge.setBadgeCount(3)
view.addSubview(badge)

// Hide the badge by setting count to zero
badge.setBadgeCount(0)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-badge-view/#page","headline":"RtkNotificationBadgeView · Cloudflare Realtime docs","description":"API reference for RtkNotificationBadgeView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-badge-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
