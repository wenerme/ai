---
title: RtkMoreMenu
description: API reference for RtkMoreMenu component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-menu.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkMoreMenu

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

Swift

```

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

Swift

```

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-menu/","name":"RtkMoreMenu"}}]}
```
