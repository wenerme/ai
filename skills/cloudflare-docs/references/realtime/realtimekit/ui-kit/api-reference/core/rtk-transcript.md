---
title: rtk-transcript
description: API reference for rtk-transcript component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-transcript.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-transcript

A component which shows a transcript. You need to remove the element after you receive the`rtkTranscriptDismiss` event.

## Properties

| Property   | Type                                 | Required | Default       | Description |
| ---------- | ------------------------------------ | -------- | ------------- | ----------- |
| t          | RtkI18n                              | ❌        | useLanguage() | Language    |
| transcript | Transcript & { renderedId?: string } | ❌        | \-            | Message     |

## Usage Examples

### Basic Usage

```

<rtk-transcript></rtk-transcript>


```

### With Properties

```

<rtk-transcript

 transcript="example">

</rtk-transcript>


```

```

<script>

  const el = document.querySelector("rtk-transcript");


  el.transcript= {};

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-transcript/","name":"rtk-transcript"}}]}
```
