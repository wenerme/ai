---
title: rtk-chat-messages-ui-paginated
description: API reference for rtk-chat-messages-ui-paginated component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-chat-messages-ui-paginated

## Properties

| Property             | Type                | Required | Default         | Description                                                                                      |
| -------------------- | ------------------- | -------- | --------------- | ------------------------------------------------------------------------------------------------ |
| iconPack             | IconPack            | ❌        | defaultIconPack | Icon pack                                                                                        |
| meeting              | Meeting             | ✅        | \-              | Meeting object                                                                                   |
| privateChatRecipient | Participant \| null | ✅        | \-              | Selected recipient for private chat; when unset, messages are loaded for public chat (Everyone). |
| size                 | Size                | ✅        | \-              | Size                                                                                             |
| t                    | RtkI18n             | ❌        | useLanguage()   | Language                                                                                         |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-chat-messages-ui-paginated></rtk-chat-messages-ui-paginated>


```

### With Properties

```

<!-- component.html -->

<rtk-chat-messages-ui-paginated

 [meeting]="meeting"

 [privateChatRecipient]="participant | null"

 size="md">

</rtk-chat-messages-ui-paginated>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-messages-ui-paginated/","name":"rtk-chat-messages-ui-paginated"}}]}
```
