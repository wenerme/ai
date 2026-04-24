---
title: rtk-mixed-grid
description: API reference for rtk-mixed-grid component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-mixed-grid.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-mixed-grid

A grid component which handles screenshares, plugins and participants.

## Properties

| Property                | Type          | Required | Default               | Description                                           |
| ----------------------- | ------------- | -------- | --------------------- | ----------------------------------------------------- |
| aspectRatio             | string        | ✅        | \-                    | Aspect Ratio of participant tile Format: width:height |
| config                  | UIConfig      | ❌        | createDefaultConfig() | UI Config                                             |
| gap                     | number        | ✅        | \-                    | Gap between participant tiles                         |
| gridSize                | GridSize1     | ✅        | \-                    | Grid size                                             |
| iconPack                | IconPack      | ❌        | defaultIconPack       | Icon Pack                                             |
| layout                  | GridLayout1   | ✅        | \-                    | Grid Layout                                           |
| meeting                 | Meeting       | ✅        | \-                    | Meeting object                                        |
| participants            | Peer\[\]      | ✅        | \-                    | Participants                                          |
| pinnedParticipants      | Peer\[\]      | ✅        | \-                    | Pinned Participants                                   |
| plugins                 | RTKPlugin\[\] | ✅        | \-                    | Active Plugins                                        |
| screenShareParticipants | Peer\[\]      | ✅        | \-                    | Screenshare Participants                              |
| size                    | Size          | ✅        | \-                    | Size                                                  |
| states                  | States        | ✅        | \-                    | States object                                         |
| t                       | RtkI18n       | ❌        | useLanguage()         | Language                                              |

## Usage Examples

### Basic Usage

```

<rtk-mixed-grid></rtk-mixed-grid>


```

### With Properties

```

<rtk-mixed-grid

 aspectRatio="example"

 gridSize="md">

</rtk-mixed-grid>


```

```

<script>

  const el = document.querySelector("rtk-mixed-grid");


  el.gap= 42;

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-mixed-grid/","name":"rtk-mixed-grid"}}]}
```
