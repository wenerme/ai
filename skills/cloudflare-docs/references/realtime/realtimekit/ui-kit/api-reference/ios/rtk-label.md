---
title: RtkLabel
description: API reference for RtkLabel component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/ios/rtk-label.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkLabel

A themed label that uses design token colors and fonts from the RTK Design System.

## Initializer parameters

| Parameter  | Type              | Required | Default | Description                                      |
| ---------- | ----------------- | -------- | ------- | ------------------------------------------------ |
| appearance | RtkTextAppearance | ❌        | \-      | Text appearance configuration for font and color |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let label = RtkLabel()

label.text = "Meeting Room"

view.addSubview(label)


```

### With custom appearance

Swift

```

import RealtimeKitUI


let appearance = RtkTextAppearance(

    font: UIFont.systemFont(ofSize: 16, weight: .semibold),

    textColor: .white

)

let label = RtkLabel(appearance: appearance)

label.text = "Meeting Room"

view.addSubview(label)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-label/","name":"RtkLabel"}}]}
```
