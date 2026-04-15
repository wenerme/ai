---
title: RtkGridView
description: API reference for RtkGridView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/grid-view.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkGridView

The main grid component which handles the participant grid layout, pagination, and focus modes.

## Methods

| Method            | Parameters                    | Description                                                                                                                                |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| activate          | meeting: RealtimeKitClient    | Bind the grid to the meeting state                                                                                                         |
| refresh           | force: Boolean                | Force a refresh of the grid layout and participants                                                                                        |
| enableFocusMode   | \-                            | Enable focus mode, which hides the horizontal peer strip and full-screen toggle to keep attention on the primary speaker or shared content |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming                                                                                                     |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.grid.RtkGridView

    android:id="@+id/rtk_grid"

    android:layout_width="match_parent"

    android:layout_height="match_parent" />


```

### With Methods

Kotlin

```

val grid = findViewById<RtkGridView>(R.id.rtk_grid)

grid.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/grid-view/","name":"RtkGridView"}}]}
```
