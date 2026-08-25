---
description: API reference for RtkButton component (iOS Library)
title: RtkButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkButton

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/#page","headline":"RtkButton · Cloudflare Realtime docs","description":"API reference for RtkButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
