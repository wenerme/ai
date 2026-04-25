---
title: RtkMoreToggleButton
description: API reference for RtkMoreToggleButton component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkMoreToggleButton

A button which toggles visibility of a more menu.

## Methods

| Method   | Parameters                 | Description                          |
| -------- | -------------------------- | ------------------------------------ |
| activate | meeting: RealtimeKitClient | Bind the button to the meeting state |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.controlbarbuttons.RtkMoreToggleButton

    android:id="@+id/rtk_more_toggle"

    android:layout_width="50dp"

    android:layout_height="50dp" />


```

### With Methods

Kotlin

```

val moreToggleButton = findViewById<RtkMoreToggleButton>(R.id.rtk_more_toggle)

moreToggleButton.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/more-toggle-button/","name":"RtkMoreToggleButton"}}]}
```
