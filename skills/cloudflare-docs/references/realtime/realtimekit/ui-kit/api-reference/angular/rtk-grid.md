---
title: rtk-grid
description: API reference for rtk-grid component (Angular Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-grid

The main grid component which abstracts all the grid handling logic and renders it for you.

## Properties

| Property    | Type       | Required | Default               | Description                          |
| ----------- | ---------- | -------- | --------------------- | ------------------------------------ |
| aspectRatio | string     | ✅        | \-                    | The aspect ratio of each participant |
| config      | UIConfig   | ❌        | createDefaultConfig() | Config object                        |
| gap         | number     | ✅        | \-                    | Gap between participants             |
| gridSize    | GridSize   | ✅        | \-                    | Grid size                            |
| iconPack    | IconPack   | ❌        | defaultIconPack       | Icon pack                            |
| layout      | GridLayout | ✅        | \-                    | Grid Layout                          |
| meeting     | Meeting    | ✅        | \-                    | Meeting object                       |
| overrides   | any        | ✅        | \-                    | @deprecated                          |
| size        | Size       | ✅        | \-                    | Size                                 |
| states      | States     | ✅        | \-                    | States                               |
| t           | RtkI18n    | ❌        | useLanguage()         | Language                             |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-grid></rtk-grid>


```

### With Properties

```

<!-- component.html -->

<rtk-grid

 aspectRatio="example"

 gap="42"

 gridSize="md">

</rtk-grid>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid/","name":"rtk-grid"}}]}
```
