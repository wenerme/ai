---
title: rtk-chat
description: API reference for rtk-chat component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-chat

Fully featured chat component with image & file upload, emoji picker and auto-scroll.

## Properties

| Property  | Type      | Required | Default               | Description    |
| --------- | --------- | -------- | --------------------- | -------------- |
| config    | UIConfig1 | ❌        | createDefaultConfig() | Config         |
| iconPack  | IconPack  | ❌        | defaultIconPack       | Icon pack      |
| meeting   | Meeting   | ✅        | \-                    | Meeting object |
| overrides | Overrides | ❌        | defaultOverrides      | UI Overrides   |
| size      | Size      | ✅        | \-                    | Size           |
| t         | RtkI18n   | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```

<rtk-chat></rtk-chat>


```

### With Properties

```

<rtk-chat

 size="md">

</rtk-chat>


```

```

<script>

  const el = document.querySelector("rtk-chat");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat/","name":"rtk-chat"}}]}
```
