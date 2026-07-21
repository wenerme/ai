---
description: API reference for RtkLabel component (iOS Library)
title: RtkLabel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkLabel

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-label/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A themed label that uses design token colors and fonts from the RTK Design System.

## Initializer parameters

| Parameter  | Type              | Required | Default | Description                                      |
| ---------- | ----------------- | -------- | ------- | ------------------------------------------------ |
| appearance | RtkTextAppearance | ❌        | \-      | Text appearance configuration for font and color |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let label = RtkLabel()
label.text = "Meeting Room"
view.addSubview(label)
```

### With custom appearance

```swift
import RealtimeKitUI

let appearance = RtkTextAppearance(
    font: UIFont.systemFont(ofSize: 16, weight: .semibold),
    textColor: .white
)
let label = RtkLabel(appearance: appearance)
label.text = "Meeting Room"
view.addSubview(label)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-label/#page","headline":"RtkLabel · Cloudflare Realtime docs","description":"API reference for RtkLabel component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-label/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
