---
title: rtk-ended-screen
description: API reference for rtk-ended-screen component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-ended-screen

A screen which shows a meeting has ended.

## Properties

| Property | Type     | Required | Default               | Description   |
| -------- | -------- | -------- | --------------------- | ------------- |
| config   | UIConfig | ❌        | createDefaultConfig() | Config object |
| iconPack | IconPack | ❌        | defaultIconPack       | Icon pack     |
| meeting  | Meeting  | ✅        | \-                    | Global states |
| size     | Size     | ✅        | \-                    | Size          |
| states   | States   | ✅        | \-                    | Global states |
| t        | RtkI18n  | ❌        | useLanguage()         | Language      |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-ended-screen></rtk-ended-screen>


```

### With Properties

```

<!-- component.html -->

<rtk-ended-screen

 [meeting]="meeting"

 size="md">

</rtk-ended-screen>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-ended-screen/","name":"rtk-ended-screen"}}]}
```
