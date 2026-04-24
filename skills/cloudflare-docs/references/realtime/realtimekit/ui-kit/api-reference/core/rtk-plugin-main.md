---
title: rtk-plugin-main
description: API reference for rtk-plugin-main component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-plugin-main.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-plugin-main

A component which loads a plugin.

## Properties

| Property | Type      | Required | Default         | Description |
| -------- | --------- | -------- | --------------- | ----------- |
| iconPack | IconPack  | ❌        | defaultIconPack | Icon pack   |
| meeting  | Meeting   | ✅        | \-              | Meeting     |
| plugin   | RTKPlugin | ✅        | \-              | Plugin      |
| t        | RtkI18n   | ❌        | useLanguage()   | Language    |

## Usage Examples

### Basic Usage

```

<rtk-plugin-main></rtk-plugin-main>


```

### With Properties

```

<rtk-plugin-main>

</rtk-plugin-main>


```

```

<script>

  const el = document.querySelector("rtk-plugin-main");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-plugin-main/","name":"rtk-plugin-main"}}]}
```
