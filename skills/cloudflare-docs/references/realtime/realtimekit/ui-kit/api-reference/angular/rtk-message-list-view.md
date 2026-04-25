---
title: rtk-message-list-view
description: API reference for rtk-message-list-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-message-list-view

A component which renders list of messages.

## Properties

| Property          | Type                              | Required | Default         | Description                                                                   |
| ----------------- | --------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------- |
| estimateItemSize  | number                            | ✅        | \-              | Estimated height of an item                                                   |
| iconPack          | IconPack1                         | ❌        | defaultIconPack | Icon pack                                                                     |
| loadMore          | (lastMessage: Message)            | ✅        | \-              | Function to load more messages. Messages returned from this will be prepended |
| messages          | Message\[\]                       | ✅        | \-              | Messages to render                                                            |
| renderer          | (message: Message, index: number) | ✅        | \-              | Render function of the message                                                |
| visibleItemsCount | number                            | ✅        | \-              | Maximum visible messages                                                      |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-message-list-view></rtk-message-list-view>


```

### With Properties

```

<!-- component.html -->

<rtk-message-list-view

 estimateItemSize="42"

 [loadMore]="(lastmessage: message)"

 [messages]="[]">

</rtk-message-list-view>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-message-list-view/","name":"rtk-message-list-view"}}]}
```
