---
title: RtkChatBottomSheet
description: API reference for RtkChatBottomSheet component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkChatBottomSheet

Fully featured chat screen with image and file upload and auto-scroll.

## Methods

| Method | Parameters                                     | Description                   |
| ------ | ---------------------------------------------- | ----------------------------- |
| show   | fragmentManager: FragmentManager, tag: String? | Display the chat bottom sheet |

## Usage Examples

### Basic Usage

Kotlin

```

val rtkChatBottomSheet = RtkChatBottomSheet()

rtkChatBottomSheet.show(fragmentManager, "CHAT_TAG")


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/chat/","name":"RtkChatBottomSheet"}}]}
```
