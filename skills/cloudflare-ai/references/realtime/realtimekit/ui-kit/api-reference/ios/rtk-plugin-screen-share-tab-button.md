---
description: API reference for RtkPluginScreenShareTabButton component (iOS Library)
title: RtkPluginScreenShareTabButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkPluginScreenShareTabButton

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugin-screen-share-tab-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A tab button used in the plugin and screen share tab selector. Represents a single tab in the `RtkActiveTabSelectorView`.

## Initializer parameters

| Parameter  | Type                                    | Required | Default | Description                                 |
| ---------- | --------------------------------------- | -------- | ------- | ------------------------------------------- |
| image      | RtkImage?                               | ✅        | \-      | The icon image for the tab button           |
| title      | String                                  | ❌        | ""      | The title text for the tab button           |
| id         | String                                  | ❌        | ""      | A unique identifier for the tab button      |
| appearance | RtkPluginScreenShareTabButtonAppearance | ❌        | \-      | Appearance configuration for the tab button |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let tabButton = RtkPluginScreenShareTabButton(
    image: RtkImage(image: UIImage(systemName: "square.and.arrow.up")),
    title: "Screen Share"
)
```

### With identifier

```swift
import RealtimeKitUI

let tabButton = RtkPluginScreenShareTabButton(
    image: RtkImage(image: UIImage(systemName: "pencil.tip")),
    title: "Whiteboard",
    id: "whiteboard-plugin"
)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugin-screen-share-tab-button/#page","headline":"RtkPluginScreenShareTabButton · Cloudflare Realtime docs","description":"API reference for RtkPluginScreenShareTabButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugin-screen-share-tab-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
