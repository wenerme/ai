---
title: rtk-menu
description: API reference for rtk-menu component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-menu

A menu component.

## Properties

| Property  | Type      | Required | Default         | Description       |
| --------- | --------- | -------- | --------------- | ----------------- |
| iconPack  | IconPack  | ❌        | defaultIconPack | Icon pack         |
| offset    | number    | ✅        | \-              | Offset in px      |
| placement | Placement | ✅        | \-              | Placement of menu |
| size      | Size      | ✅        | \-              | Size              |
| t         | RtkI18n   | ❌        | useLanguage()   | Language          |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-menu></rtk-menu>


```

### With Properties

```

<!-- component.html -->

<rtk-menu

 offset="42"

 [placement]="placement"

 size="md">

</rtk-menu>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-menu/","name":"rtk-menu"}}]}
```
