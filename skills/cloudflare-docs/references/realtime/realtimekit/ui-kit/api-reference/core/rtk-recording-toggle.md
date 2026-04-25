---
title: rtk-recording-toggle
description: API reference for rtk-recording-toggle component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-recording-toggle

A button which toggles recording state of a meeting. Only a privileged user can perform this action, thus the button will not be visible for participants who don't have the permission to record a meeting.

## Properties

| Property | Type              | Required | Default         | Description        |
| -------- | ----------------- | -------- | --------------- | ------------------ |
| disabled | boolean           | ✅        | \-              | Disable the button |
| iconPack | IconPack          | ❌        | defaultIconPack | Icon pack          |
| meeting  | Meeting           | ✅        | \-              | Meeting object     |
| size     | Size              | ✅        | \-              | Size               |
| t        | RtkI18n           | ❌        | useLanguage()   | Language           |
| variant  | ControlBarVariant | ✅        | \-              | Variant            |

## Usage Examples

### Basic Usage

```

<rtk-recording-toggle></rtk-recording-toggle>


```

### With Properties

```

<rtk-recording-toggle

 size="md">

</rtk-recording-toggle>


```

```

<script>

  const el = document.querySelector("rtk-recording-toggle");


  el.disabled= true;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-recording-toggle/","name":"rtk-recording-toggle"}}]}
```
