---
title: rtk-tab-bar
description: API reference for rtk-tab-bar component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tab-bar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-tab-bar

## Properties

| Property  | Type        | Required | Default               | Description    |
| --------- | ----------- | -------- | --------------------- | -------------- |
| activeTab | Tab         | ✅        | \-                    | Active tab     |
| config    | UIConfig    | ❌        | createDefaultConfig() | UI Config      |
| iconPack  | IconPack    | ❌        | defaultIconPack       | Icon Pack      |
| layout    | GridLayout1 | ✅        | \-                    | Grid Layout    |
| meeting   | Meeting     | ✅        | \-                    | Meeting object |
| size      | Size        | ✅        | \-                    | Size           |
| states    | States      | ✅        | \-                    | States object  |
| t         | RtkI18n     | ❌        | useLanguage()         | Language       |
| tabs      | Tab\[\]     | ✅        | \-                    | Tabs           |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-tab-bar></rtk-tab-bar>


```

### With Properties

```

<!-- component.html -->

<rtk-tab-bar

 [activeTab]="tab"

 [layout]="gridlayout1"

 [meeting]="meeting">

</rtk-tab-bar>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-tab-bar/","name":"rtk-tab-bar"}}]}
```
