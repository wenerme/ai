---
title: rtk-text-composer-view
description: API reference for rtk-text-composer-view component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-text-composer-view.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-text-composer-view

A component which renders a text composer

## Properties

| Property          | Type                            | Required | Default         | Description                                   |
| ----------------- | ------------------------------- | -------- | --------------- | --------------------------------------------- |
| disabled          | boolean                         | ✅        | \-              | Disable the text input (default = false)      |
| iconPack          | IconPack1                       | ❌        | defaultIconPack | Icon pack                                     |
| keyDownHandler    | (e: KeyboardEvent)              | ✅        | \-              | Keydown event handler function                |
| maxLength         | number                          | ✅        | \-              | Max length for text input                     |
| placeholder       | string                          | ✅        | \-              | Placeholder text                              |
| rateLimitBreached | boolean                         | ✅        | \-              | Boolean to indicate if rate limit is breached |
| setText           | (text: string, focus?: boolean) | ❌        | \-              | Sets value of the text input                  |
| t                 | RtkI18n1                        | ❌        | useLanguage()   | Language                                      |
| value             | string                          | ✅        | \-              | Default value for text input                  |

## Usage Examples

### Basic Usage

```

<rtk-text-composer-view></rtk-text-composer-view>


```

### With Properties

```

<rtk-text-composer-view>

</rtk-text-composer-view>


```

```

<script>

  const el = document.querySelector("rtk-text-composer-view");


  el.disabled= true;

  el.maxLength= 42;

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-text-composer-view/","name":"rtk-text-composer-view"}}]}
```
