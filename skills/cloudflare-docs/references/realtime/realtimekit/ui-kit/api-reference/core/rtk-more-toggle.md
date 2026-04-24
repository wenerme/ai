---
title: rtk-more-toggle
description: API reference for rtk-more-toggle component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-more-toggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-more-toggle

A button which toggles visibility of a more menu. When clicked it emits a `rtkStateUpdate` event with the data:

TypeScript

```

{ activeMoreMenu: boolean; }


```

## Properties

| Property | Type     | Required | Default         | Description   |
| -------- | -------- | -------- | --------------- | ------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack     |
| size     | Size     | ✅        | \-              | Size          |
| states   | States   | ✅        | \-              | States object |
| t        | RtkI18n  | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```

<rtk-more-toggle></rtk-more-toggle>


```

### With Properties

```

<rtk-more-toggle

 size="md">

</rtk-more-toggle>


```

```

<script>

  const el = document.querySelector("rtk-more-toggle");


</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-more-toggle/","name":"rtk-more-toggle"}}]}
```
