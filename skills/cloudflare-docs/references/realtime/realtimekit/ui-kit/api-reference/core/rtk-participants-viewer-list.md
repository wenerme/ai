---
title: rtk-participants-viewer-list
description: API reference for rtk-participants-viewer-list component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-participants-viewer-list

## Properties

| Property   | Type                 | Required | Default               | Description                     |
| ---------- | -------------------- | -------- | --------------------- | ------------------------------- |
| config     | UIConfig1            | ❌        | createDefaultConfig() | Config                          |
| hideHeader | boolean              | ✅        | \-                    | Hide Viewer Count Header        |
| iconPack   | IconPack1            | ❌        | defaultIconPack       | Icon pack                       |
| meeting    | Meeting              | ✅        | \-                    | Meeting object                  |
| search     | string               | ✅        | \-                    | Search                          |
| size       | Size1                | ✅        | \-                    | Size                            |
| t          | RtkI18n1             | ❌        | useLanguage()         | Language                        |
| view       | ParticipantsViewMode | ✅        | \-                    | View mode for participants list |

## Usage Examples

### Basic Usage

```

<rtk-participants-viewer-list></rtk-participants-viewer-list>


```

### With Properties

```

<rtk-participants-viewer-list

 search="example">

</rtk-participants-viewer-list>


```

```

<script>

  const el = document.querySelector("rtk-participants-viewer-list");


  el.hideHeader= true;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-viewer-list/","name":"rtk-participants-viewer-list"}}]}
```
