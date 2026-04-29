---
title: RtkLeaveMeetingView
description: API reference for RtkLeaveMeetingView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkLeaveMeetingView

A component which allows you to leave a meeting or end meeting for all, if you have the permission.

## Methods

| Method  | Parameters | Description        |
| ------- | ---------- | ------------------ |
| show    | \-         | Display the dialog |
| dismiss | \-         | Dismiss the dialog |

## Usage Examples

### Basic Usage

Kotlin

```

val endCallDialog = RtkLeaveMeetingView(context, meeting)

endCallDialog.show()


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/leave-meeting-dialog/","name":"RtkLeaveMeetingView"}}]}
```
