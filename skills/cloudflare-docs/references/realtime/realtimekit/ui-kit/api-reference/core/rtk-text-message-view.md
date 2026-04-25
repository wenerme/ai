---
title: rtk-text-message-view
description: API reference for rtk-text-message-view component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# rtk-text-message-view

A component which renders a text message from chat.

## Properties

| Property   | Type    | Required | Default | Description                               |
| ---------- | ------- | -------- | ------- | ----------------------------------------- |
| isMarkdown | boolean | ✅        | \-      | Renders text as markdown (default = true) |
| text       | string  | ✅        | \-      | Text message                              |

## Usage Examples

### Basic Usage

```

<rtk-text-message-view></rtk-text-message-view>


```

### With Properties

```

<rtk-text-message-view

 text="example">

</rtk-text-message-view>


```

```

<script>

  const el = document.querySelector("rtk-text-message-view");


  el.isMarkdown= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-text-message-view/","name":"rtk-text-message-view"}}]}
```
