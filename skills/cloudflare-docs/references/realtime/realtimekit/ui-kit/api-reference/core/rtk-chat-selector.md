---
title: rtk-chat-selector
description: API reference for rtk-chat-selector component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-selector.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-chat-selector

## Properties

| Property  | Type       | Required | Default               | Description    |
| --------- | ---------- | -------- | --------------------- | -------------- |
| config    | UIConfig1  | ❌        | createDefaultConfig() | Config         |
| iconPack  | IconPack   | ❌        | defaultIconPack       | Icon pack      |
| meeting   | Meeting    | ✅        | \-                    | Meeting object |
| overrides | Overrides1 | ❌        | defaultOverrides      | UI Overrides   |
| size      | Size       | ✅        | \-                    | Size           |
| states    | States1    | ✅        | \-                    | States object  |
| t         | RtkI18n    | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```

<rtk-chat-selector></rtk-chat-selector>


```

### With Properties

```

<rtk-chat-selector

 size="md">

</rtk-chat-selector>


```

```

<script>

  const el = document.querySelector("rtk-chat-selector");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-selector/","name":"rtk-chat-selector"}}]}
```
