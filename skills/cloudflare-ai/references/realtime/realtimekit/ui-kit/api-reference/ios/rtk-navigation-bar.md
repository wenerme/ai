---
description: API reference for RtkNavigationBar component (iOS Library)
title: RtkNavigationBar
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkNavigationBar

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-navigation-bar/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A navigation bar with a title label and a close or back button. Used for modal screens such as chat, polls, and participant lists.

## Initializer parameters

| Parameter | Type   | Required | Default | Description                                    |
| --------- | ------ | -------- | ------- | ---------------------------------------------- |
| title     | String | ✅        | \-      | The title text displayed in the navigation bar |

## Properties

| Property   | Type                | Required | Default | Description                                               |
| ---------- | ------------------- | -------- | ------- | --------------------------------------------------------- |
| titleLabel | RtkLabel            | \-       | \-      | The label displaying the navigation bar title (read-only) |
| leftButton | RtkControlBarButton | \-       | \-      | The close or back button on the left side (read-only)     |

## Methods

| Method                        | Return Type | Description                                       |
| ----------------------------- | ----------- | ------------------------------------------------- |
| setBackButtonClick(callBack:) | Void        | Sets the tap handler for the back or close button |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let navBar = RtkNavigationBar(title: "Participants")
view.addSubview(navBar)
```

### With back button handler

```swift
import RealtimeKitUI

let navBar = RtkNavigationBar(title: "Chat")
navBar.setBackButtonClick {
    self.dismiss(animated: true)
}
view.addSubview(navBar)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-navigation-bar/#page","headline":"RtkNavigationBar · Cloudflare Realtime docs","description":"API reference for RtkNavigationBar component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-navigation-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
