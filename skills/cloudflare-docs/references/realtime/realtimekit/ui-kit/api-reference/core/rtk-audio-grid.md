---
title: rtk-audio-grid
description: API reference for rtk-audio-grid component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-grid.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-audio-grid

## Properties

| Property | Type      | Required | Default         | Description                      |
| -------- | --------- | -------- | --------------- | -------------------------------- |
| config   | UIConfig1 | ✅        | \-              | Config                           |
| hideSelf | boolean   | ✅        | \-              | Whether to hide self in the grid |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon Pack                        |
| meeting  | Meeting   | ✅        | \-              | Meeting                          |
| size     | Size1     | ✅        | \-              | Size                             |
| states   | States1   | ✅        | \-              | States                           |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language                         |

## Usage Examples

### Basic Usage

```

<rtk-audio-grid></rtk-audio-grid>


```

### With Properties

```

<rtk-audio-grid>

</rtk-audio-grid>


```

```

<script>

  const el = document.querySelector("rtk-audio-grid");


  el.config= defaultUiConfig

  el.hideSelf= true;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-grid/","name":"rtk-audio-grid"}}]}
```
