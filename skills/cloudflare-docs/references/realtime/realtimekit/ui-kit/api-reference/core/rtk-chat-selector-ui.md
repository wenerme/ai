---
title: rtk-chat-selector-ui
description: API reference for rtk-chat-selector-ui component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-chat-selector-ui

## Properties

| Property        | Type                   | Required | Default         | Description          |
| --------------- | ---------------------- | -------- | --------------- | -------------------- |
| groups          | ChatGroup\[\]          | ✅        | \-              | Participants         |
| iconPack        | IconPack1              | ❌        | defaultIconPack | Icon pack            |
| selectedGroupId | string                 | ✅        | \-              | Selected participant |
| selfUserId      | string                 | ✅        | \-              | Self User ID         |
| t               | RtkI18n                | ❌        | useLanguage()   | Language             |
| unreadCounts    | Record<string, number> | ✅        | \-              | Unread counts        |

## Usage Examples

### Basic Usage

```

<rtk-chat-selector-ui></rtk-chat-selector-ui>


```

### With Properties

```

<rtk-chat-selector-ui

 selectedGroupId="example"

 selfUserId="example">

</rtk-chat-selector-ui>


```

```

<script>

  const el = document.querySelector("rtk-chat-selector-ui");


  el.groups= [];

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-selector-ui/","name":"rtk-chat-selector-ui"}}]}
```
