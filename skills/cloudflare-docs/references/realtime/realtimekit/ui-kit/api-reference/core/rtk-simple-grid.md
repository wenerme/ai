---
title: rtk-simple-grid
description: API reference for rtk-simple-grid component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-simple-grid.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-simple-grid

A grid component which renders only the participants in a simple grid.

## Properties

| Property     | Type     | Required | Default               | Description                                           |
| ------------ | -------- | -------- | --------------------- | ----------------------------------------------------- |
| aspectRatio  | string   | ✅        | \-                    | Aspect Ratio of participant tile Format: width:height |
| config       | UIConfig | ❌        | createDefaultConfig() | UI Config                                             |
| gap          | number   | ✅        | \-                    | Gap between participant tiles                         |
| iconPack     | IconPack | ❌        | defaultIconPack       | Icon Pack                                             |
| meeting      | Meeting  | ✅        | \-                    | Meeting object                                        |
| participants | Peer\[\] | ✅        | \-                    | Participants                                          |
| size         | Size     | ✅        | \-                    | Size                                                  |
| states       | States   | ✅        | \-                    | States object                                         |
| t            | RtkI18n  | ❌        | useLanguage()         | Language                                              |

## Usage Examples

### Basic Usage

```

<rtk-simple-grid></rtk-simple-grid>


```

### With Properties

```

<rtk-simple-grid

 aspectRatio="example">

</rtk-simple-grid>


```

```

<script>

  const el = document.querySelector("rtk-simple-grid");


  el.gap= 42;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-simple-grid/","name":"rtk-simple-grid"}}]}
```
