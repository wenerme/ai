---
title: rtk-switch
description: API reference for rtk-switch component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-switch

A switch component which follows RTK Design System.

## Properties

| Property | Type     | Required | Default         | Description                           |
| -------- | -------- | -------- | --------------- | ------------------------------------- |
| checked  | boolean  | ✅        | \-              | Whether the switch is enabled/checked |
| disabled | boolean  | ✅        | \-              | Whether switch is readonly            |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack                             |
| readonly | boolean  | ✅        | \-              | Whether switch is readonly            |
| t        | RtkI18n  | ❌        | useLanguage()   | Language                              |

## Usage Examples

### Basic Usage

```

<rtk-switch></rtk-switch>


```

### With Properties

```

<rtk-switch>

</rtk-switch>


```

```

<script>

  const el = document.querySelector("rtk-switch");


  el.checked= true;

  el.disabled= true;

  el.readonly= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-switch/","name":"rtk-switch"}}]}
```
