---
title: rtk-chat-search-results
description: API reference for rtk-chat-search-results component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-search-results.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-chat-search-results

@deprecated `rtk-chat-search-results` is deprecated and will be removed soon. Use `rtk-chat-messages-ui-paginated` instead. -

## Properties

| Property  | Type      | Required | Default         | Description    |
| --------- | --------- | -------- | --------------- | -------------- |
| channelId | string    | ✅        | \-              | Channel id     |
| iconPack  | IconPack1 | ❌        | defaultIconPack | Icon pack      |
| meeting   | Meeting   | ✅        | \-              | Meeting object |
| query     | string    | ✅        | \-              | Search query   |
| t         | RtkI18n1  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```

<rtk-chat-search-results></rtk-chat-search-results>


```

### With Properties

```

<rtk-chat-search-results

 channelId="example"

 query="example">

</rtk-chat-search-results>


```

```

<script>

  const el = document.querySelector("rtk-chat-search-results");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-search-results/","name":"rtk-chat-search-results"}}]}
```
