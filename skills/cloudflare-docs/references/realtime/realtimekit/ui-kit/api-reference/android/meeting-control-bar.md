---
title: RtkMeetingControlBarView
description: API reference for RtkMeetingControlBarView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/meeting-control-bar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkMeetingControlBarView

A pre-built control bar for group call meetings. Contains mic toggle, camera toggle, more toggle, and leave button.

## Methods

| Method   | Parameters                 | Description                               |
| -------- | -------------------------- | ----------------------------------------- |
| activate | meeting: RealtimeKitClient | Bind the control bar to the meeting state |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.controlbars.RtkMeetingControlBarView

    android:id="@+id/rtk_meeting_control_bar"

    android:layout_width="match_parent"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val controlBar = findViewById<RtkMeetingControlBarView>(R.id.rtk_meeting_control_bar)

controlBar.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/meeting-control-bar/","name":"RtkMeetingControlBarView"}}]}
```
