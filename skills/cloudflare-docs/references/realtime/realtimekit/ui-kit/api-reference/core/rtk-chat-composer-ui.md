---
title: rtk-chat-composer-ui
description: API reference for rtk-chat-composer-ui component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-composer-ui.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-chat-composer-ui

@deprecated . This component is deprecated, please use rtk-chat-composer-view instead.

## Properties

| Property           | Type                                                                                      | Required | Default         | Description                         |
| ------------------ | ----------------------------------------------------------------------------------------- | -------- | --------------- | ----------------------------------- |
| canSendFiles       | boolean                                                                                   | ✅        | \-              | Whether user can send file messages |
| canSendTextMessage | boolean                                                                                   | ✅        | \-              | Whether user can send text messages |
| iconPack           | IconPack1                                                                                 | ❌        | defaultIconPack | Icon pack                           |
| prefill            | { suggestedReplies?: string\[\]; editMessage?: TextMessage; replyMessage?: TextMessage; } | ❌        | \-              | prefill the composer                |
| size               | Size1                                                                                     | ✅        | \-              | Size                                |
| t                  | RtkI18n                                                                                   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```

<rtk-chat-composer-ui></rtk-chat-composer-ui>


```

### With Properties

```

<rtk-chat-composer-ui

 size="md">

</rtk-chat-composer-ui>


```

```

<script>

  const el = document.querySelector("rtk-chat-composer-ui");


  el.canSendFiles= true;

  el.canSendTextMessage= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-composer-ui/","name":"rtk-chat-composer-ui"}}]}
```
