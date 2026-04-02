---
title: rtk-file-picker-button
description: API reference for rtk-file-picker-button component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-file-picker-button.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-file-picker-button

## Properties

| Property | Type            | Required | Default         | Description                               |
| -------- | --------------- | -------- | --------------- | ----------------------------------------- |
| filter   | string          | ✅        | \-              | File type filter to open file picker with |
| icon     | keyof IconPack1 | ✅        | \-              | Icon                                      |
| iconPack | IconPack1       | ❌        | defaultIconPack | Icon pack                                 |
| label    | string          | ✅        | \-              | Label for tooltip                         |
| t        | RtkI18n1        | ❌        | useLanguage()   | Language                                  |

## Usage Examples

### Basic Usage

```

<rtk-file-picker-button></rtk-file-picker-button>


```

### With Properties

```

<rtk-file-picker-button

 filter="example"

 label="example">

</rtk-file-picker-button>


```

```

<script>

  const el = document.querySelector("rtk-file-picker-button");


  el.icon= defaultIconPack

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-file-picker-button/","name":"rtk-file-picker-button"}}]}
```
