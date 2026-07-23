---
description: API reference for GridView component (iOS Library)
title: GridView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# GridView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/grid-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A generic grid layout view that arranges child views in a responsive grid. Supports both portrait and landscape orientations with configurable maximum item count.

## Initializer parameters

| Parameter        | Type                              | Required | Default | Description                                                      |
| ---------------- | --------------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| maxItems         | UInt                              | ❌        | 9       | Maximum number of items the grid can display                     |
| showingCurrently | UInt                              | ✅        | \-      | Number of items currently visible in the grid                    |
| getChildView     | @escaping () -> CellContainerView | ✅        | \-      | Factory closure that creates a new child view for each grid cell |

## Methods

| Method                                                            | Return Type        | Description                                                           |
| ----------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| settingFrames(visibleItemCount:animation:completion:)             | Void               | Lays out child views in portrait orientation with optional animation  |
| settingFramesForLandScape(visibleItemCount:animation:completion:) | Void               | Lays out child views in landscape orientation with optional animation |
| childView(index:)                                                 | CellContainerView? | Returns the child view at the specified index                         |
| prepareForReuse(childView:)                                       | Void               | Prepares a child view for reuse                                       |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let gridView = GridView(
    maxItems: 6,
    showingCurrently: 4,
    getChildView: {
        return CellContainerView()
    }
)
view.addSubview(gridView)
```

### Update layout

```swift
import RealtimeKitUI

let gridView = GridView(
    maxItems: 9,
    showingCurrently: 3,
    getChildView: {
        return CellContainerView()
    }
)
view.addSubview(gridView)

// Update layout with animation
gridView.settingFrames(
    visibleItemCount: 4,
    animation: true,
    completion: {
        print("Layout updated")
    }
)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/grid-view/#page","headline":"GridView · Cloudflare Realtime docs","description":"API reference for GridView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/grid-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
