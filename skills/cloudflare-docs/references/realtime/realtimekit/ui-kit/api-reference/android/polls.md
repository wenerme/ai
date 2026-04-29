---
title: RtkPollsBottomSheet
description: API reference for RtkPollsBottomSheet component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkPollsBottomSheet

A component which lists all available polls a user can access.

## Methods

| Method | Parameters                                     | Description                    |
| ------ | ---------------------------------------------- | ------------------------------ |
| show   | fragmentManager: FragmentManager, tag: String? | Display the polls bottom sheet |

## Usage Examples

### Basic Usage

Kotlin

```

val rtkPollsBottomSheet = RtkPollsBottomSheet()

rtkPollsBottomSheet.show(fragmentManager, "POLLS_TAG")


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/polls/","name":"RtkPollsBottomSheet"}}]}
```
