---
title: rtk-ai-transcriptions
description: API reference for rtk-ai-transcriptions component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-ai-transcriptions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-ai-transcriptions

## Properties

| Property              | Type           | Required | Default       | Description            |
| --------------------- | -------------- | -------- | ------------- | ---------------------- |
| initialTranscriptions | Transcript\[\] | ✅        | \-            | Initial transcriptions |
| meeting               | Meeting        | ✅        | \-            | Meeting object         |
| t                     | RtkI18n        | ❌        | useLanguage() | Language               |

## Usage Examples

### Basic Usage

```

<rtk-ai-transcriptions></rtk-ai-transcriptions>


```

### With Properties

```

<rtk-ai-transcriptions>

</rtk-ai-transcriptions>


```

```

<script>

  const el = document.querySelector("rtk-ai-transcriptions");


  el.initialTranscriptions= [];

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-ai-transcriptions/","name":"rtk-ai-transcriptions"}}]}
```
