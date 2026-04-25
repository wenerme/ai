---
title: rtk-chat-composer-view
description: API reference for rtk-chat-composer-view component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-chat-composer-view

A component which renders a chat composer

## Properties

| Property             | Type                                        | Required | Default         | Description                             |
| -------------------- | ------------------------------------------- | -------- | --------------- | --------------------------------------- |
| canSendFiles         | boolean                                     | ✅        | \-              | Whether user can send file messages     |
| canSendTextMessage   | boolean                                     | ✅        | \-              | Whether user can send text messages     |
| iconPack             | IconPack1                                   | ❌        | defaultIconPack | Icon pack                               |
| inputTextPlaceholder | string                                      | ✅        | \-              | Placeholder for text input              |
| isEditing            | boolean                                     | ✅        | \-              | Sets composer to edit mode              |
| maxLength            | number                                      | ✅        | \-              | Max length for text input               |
| message              | string                                      | ✅        | \-              | Message to be pre-populated             |
| quotedMessage        | string                                      | ✅        | \-              | Quote message to be displayed           |
| rateLimits           | { period: number; maxInvocations: number; } | ✅        | \-              | Rate limits                             |
| storageKey           | string                                      | ✅        | \-              | Key for storing message in localStorage |
| t                    | RtkI18n1                                    | ❌        | useLanguage()   | Language                                |

## Usage Examples

### Basic Usage

```

<rtk-chat-composer-view></rtk-chat-composer-view>


```

### With Properties

```

<rtk-chat-composer-view

 inputTextPlaceholder="example">

</rtk-chat-composer-view>


```

```

<script>

  const el = document.querySelector("rtk-chat-composer-view");


  el.canSendFiles= true;

  el.canSendTextMessage= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-composer-view/","name":"rtk-chat-composer-view"}}]}
```
