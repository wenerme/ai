---
title: rtk-emoji-picker-button
description: API reference for rtk-emoji-picker-button component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-emoji-picker-button

## Properties

| Property | Type      | Required | Default         | Description            |
| -------- | --------- | -------- | --------------- | ---------------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack              |
| isActive | boolean   | ✅        | \-              | Active state indicator |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language               |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-emoji-picker-button></rtk-emoji-picker-button>


```

### With Properties

```

<!-- component.html -->

<rtk-emoji-picker-button

 [isActive]="true">

</rtk-emoji-picker-button>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-emoji-picker-button/","name":"rtk-emoji-picker-button"}}]}
```
