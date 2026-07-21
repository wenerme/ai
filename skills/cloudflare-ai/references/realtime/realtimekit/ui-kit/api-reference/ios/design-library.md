---
description: API reference for DesignLibrary component (iOS Library)
title: DesignLibrary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  DesignLibrary

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/design-library/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The central design token library providing color, spacing, border width, and border radius tokens. Access through the `DesignLibrary.shared` singleton.

## Access

```swift
let designLibrary = DesignLibrary.shared
```

## Properties

| Property     | Type              | Required | Default | Description                                          |
| ------------ | ----------------- | -------- | ------- | ---------------------------------------------------- |
| color        | ColorTokens       | \-       | \-      | Color tokens for backgrounds, text, and brand colors |
| space        | SpaceToken        | \-       | \-      | Spacing tokens for margins and padding               |
| borderSize   | BorderWidthToken  | \-       | \-      | Border width tokens                                  |
| borderRadius | BorderRadiusToken | \-       | \-      | Border radius tokens for corner rounding             |

## Usage Examples

### Access design tokens

```swift
import RealtimeKitUI

let designLibrary = DesignLibrary.shared

// Access color tokens
let backgroundColor = designLibrary.color.background
let textColor = designLibrary.color.text

// Access spacing tokens
let padding = designLibrary.space.space4

// Access border tokens
let borderWidth = designLibrary.borderSize.thin
let cornerRadius = designLibrary.borderRadius.rounded
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/design-library/#page","headline":"DesignLibrary · Cloudflare Realtime docs","description":"API reference for DesignLibrary component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/design-library/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
