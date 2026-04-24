---
title: rtk-sidebar
description: API reference for rtk-sidebar component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-sidebar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-sidebar

A component which handles the sidebar and you can customize which sections you want, and which section you want as the default.

## Properties

| Property        | Type              | Required | Default               | Description                 |
| --------------- | ----------------- | -------- | --------------------- | --------------------------- |
| config          | UIConfig          | ❌        | createDefaultConfig() | Config                      |
| defaultSection  | RtkSidebarSection | ✅        | \-                    | Default section             |
| enabledSections | RtkSidebarTab\[\] | ✅        | \-                    | Enabled sections in sidebar |
| iconPack        | IconPack          | ❌        | defaultIconPack       | Icon pack                   |
| meeting         | Meeting           | ✅        | \-                    | Meeting object              |
| size            | Size              | ✅        | \-                    | Size                        |
| states          | States            | ✅        | \-                    | States object               |
| t               | RtkI18n           | ❌        | useLanguage()         | Language                    |
| view            | RtkSidebarView    | ✅        | \-                    | View type                   |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-sidebar></rtk-sidebar>


```

### With Properties

```

<!-- component.html -->

<rtk-sidebar

 [defaultSection]="rtksidebarsection"

 [enabledSections]="[]"

 [meeting]="meeting">

</rtk-sidebar>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-sidebar/","name":"rtk-sidebar"}}]}
```
