---
title: rtk-menu-item
description: API reference for rtk-menu-item component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-menu-item

A menu item component.

## Properties

| Property    | Type                     | Required | Default         | Description |
| ----------- | ------------------------ | -------- | --------------- | ----------- |
| iconPack    | IconPack                 | ❌        | defaultIconPack | Icon pack   |
| menuVariant | 'primary' \| 'secondary' | ✅        | \-              | Variant     |
| size        | Size                     | ✅        | \-              | Size        |
| t           | RtkI18n                  | ❌        | useLanguage()   | Language    |

## Usage Examples

### Basic Usage

```

<rtk-menu-item></rtk-menu-item>


```

### With Properties

```

<rtk-menu-item

 size="md">

</rtk-menu-item>


```

```

<script>

  const el = document.querySelector("rtk-menu-item");


</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-menu-item/","name":"rtk-menu-item"}}]}
```
