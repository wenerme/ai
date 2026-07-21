---
description: API reference for RtkButton component (iOS Library)
title: RtkButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkButton

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A versatile button that follows the RTK Design System. Supports multiple styles, states, and sizes.

## Initializer parameters

| Parameter      | Type                | Required | Default | Description                                           |
| -------------- | ------------------- | -------- | ------- | ----------------------------------------------------- |
| style          | Style               | ❌        | .solid  | The button style (solid, line, icon-left, and others) |
| rtkButtonState | States              | ❌        | .active | The initial state of the button                       |
| size           | Size                | ❌        | .large  | The size of the button                                |
| appearance     | RtkButtonAppearance | ❌        | \-      | Appearance configuration for colors and fonts         |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let button = RtkButton()
button.setTitle("Join", for: .normal)
view.addSubview(button)
```

### With custom style

```swift
import RealtimeKitUI

let button = RtkButton(
    style: .line,
    rtkButtonState: .active,
    size: .large
)
button.setTitle("Cancel", for: .normal)
view.addSubview(button)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/#page","headline":"RtkButton · Cloudflare Realtime docs","description":"API reference for RtkButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
