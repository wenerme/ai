---
title: RtkWebinarStageToggleButton
description: API reference for RtkWebinarStageToggleButton component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkWebinarStageToggleButton

Component that lets you add provision for the local user to join the webinar stage.

## Methods

| Method     | Parameters                 | Description                                  |
| ---------- | -------------------------- | -------------------------------------------- |
| activate   | meeting: RealtimeKitClient | Bind the button to the meeting state         |
| deactivate | \-                         | Unbind the button and remove event listeners |
| refresh    | \-                         | Force a refresh of the button state          |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.controlbarbuttons.webinarstagetogglebutton.RtkWebinarStageToggleButton

    android:id="@+id/rtk_webinar_stage_toggle"

    android:layout_width="wrap_content"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val stageToggleButton = findViewById<RtkWebinarStageToggleButton>(R.id.rtk_webinar_stage_toggle)

stageToggleButton.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/webinar-stage-toggle/","name":"RtkWebinarStageToggleButton"}}]}
```
