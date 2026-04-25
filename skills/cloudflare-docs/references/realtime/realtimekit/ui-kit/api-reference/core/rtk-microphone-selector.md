---
title: rtk-microphone-selector
description: API reference for rtk-microphone-selector component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-microphone-selector

A component which lets to manage your audio devices and audio preferences. Emits `rtkStateUpdate` event with data for muting notification sounds:

TypeScript

```

{

 prefs: {

   muteNotificationSounds: boolean

 }

}


```

## Properties

| Property | Type               | Required | Default         | Description    |
| -------- | ------------------ | -------- | --------------- | -------------- |
| iconPack | IconPack           | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting            | ✅        | \-              | Meeting object |
| size     | Size               | ✅        | \-              | Size           |
| t        | RtkI18n            | ❌        | useLanguage()   | Language       |
| variant  | 'full' \| 'inline' | ✅        | \-              | variant        |

## Usage Examples

### Basic Usage

```

<rtk-microphone-selector></rtk-microphone-selector>


```

### With Properties

```

<rtk-microphone-selector

 size="md">

</rtk-microphone-selector>


```

```

<script>

  const el = document.querySelector("rtk-microphone-selector");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-microphone-selector/","name":"rtk-microphone-selector"}}]}
```
