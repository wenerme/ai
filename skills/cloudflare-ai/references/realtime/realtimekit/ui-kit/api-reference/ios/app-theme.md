---
description: API reference for AppTheme component (iOS Library)
title: AppTheme
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# AppTheme

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/app-theme/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The application theme singleton that provides pre-configured appearance objects for UI components. Use `AppTheme.shared` to access default appearances or call `setUp(theme:)` to apply a custom theme.

## Access

```swift
let theme = AppTheme.shared
```

## Methods

| Method                         | Return Type | Description                                           |
| ------------------------------ | ----------- | ----------------------------------------------------- |
| setUp(theme: AppThemeProtocol) | Void        | Applies a custom theme conforming to AppThemeProtocol |

## Usage Examples

### Access default theme

```swift
import RealtimeKitUI

let theme = AppTheme.shared
let titleAppearance = theme.meetingTitleAppearance
let clockAppearance = theme.clockViewAppearance
```

### Apply a custom theme

```swift
import RealtimeKitUI

class CustomTheme: AppThemeProtocol {
    // Implement required appearance properties
}

let customTheme = CustomTheme()
AppTheme.shared.setUp(theme: customTheme)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/app-theme/#page","headline":"AppTheme · Cloudflare Realtime docs","description":"API reference for AppTheme component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/app-theme/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
