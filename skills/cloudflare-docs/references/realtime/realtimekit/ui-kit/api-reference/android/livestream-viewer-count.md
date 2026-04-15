---
title: RtkLivestreamViewerCount
description: API reference for RtkLivestreamViewerCount component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/livestream-viewer-count.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkLivestreamViewerCount

Displays the current viewer count for a livestream.

## Methods

| Method  | Parameters                 | Description                                                |
| ------- | -------------------------- | ---------------------------------------------------------- |
| refresh | meeting: RealtimeKitClient | Update the viewer count based on the current meeting state |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkLivestreamViewerCount

    android:id="@+id/rtk_viewer_count"

    android:layout_width="wrap_content"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val viewerCount = findViewById<RtkLivestreamViewerCount>(R.id.rtk_viewer_count)

viewerCount.refresh(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/livestream-viewer-count/","name":"RtkLivestreamViewerCount"}}]}
```
