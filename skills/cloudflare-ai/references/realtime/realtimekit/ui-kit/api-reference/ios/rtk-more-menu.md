---
description: API reference for RtkMoreMenu component (iOS Library)
title: RtkMoreMenu
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMoreMenu

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-menu/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A bottom sheet menu that displays meeting action options such as chat, polls, and participant list.

## Initializer parameters

| Parameter | Type                         | Required | Default | Description                                      |
| --------- | ---------------------------- | -------- | ------- | ------------------------------------------------ |
| title     | String?                      | ❌        | nil     | Optional title displayed at the top of the menu  |
| features  | \[MenuType\]                 | ✅        | \-      | Array of menu items to display                   |
| onSelect  | @escaping (MenuType) -> Void | ✅        | \-      | Closure called when the user selects a menu item |

## Methods

| Method                  | Return Type | Description                                                 |
| ----------------------- | ----------- | ----------------------------------------------------------- |
| show(on:)               | Void        | Presents the menu as a bottom sheet on the specified UIView |
| reload(title:features:) | Void        | Reloads the menu with a new title and set of features       |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let menu = RtkMoreMenu(
    features: [.chat, .polls, .participants],
    onSelect: { menuType in
        print("Selected: \(menuType)")
    }
)
menu.show(on: self.view)
```

### With title

```swift
import RealtimeKitUI

let menu = RtkMoreMenu(
    title: "More Options",
    features: [.chat, .polls, .participants],
    onSelect: { menuType in
        switch menuType {
        case .chat:
            print("Open chat")
        case .polls:
            print("Open polls")
        case .participants:
            print("Open participants")
        default:
            break
        }
    }
)
menu.show(on: self.view)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-menu/#page","headline":"RtkMoreMenu · Cloudflare Realtime docs","description":"API reference for RtkMoreMenu component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-menu/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
