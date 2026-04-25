---
title: RtkAiTranscriptions
description: API reference for RtkAiTranscriptions component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkAiTranscriptions

## Properties

| Property              | Type           | Required | Default       | Description            |
| --------------------- | -------------- | -------- | ------------- | ---------------------- |
| initialTranscriptions | Transcript\[\] | ✅        | \-            | Initial transcriptions |
| meeting               | Meeting        | ✅        | \-            | Meeting object         |
| t                     | RtkI18n        | ❌        | useLanguage() | Language               |

## Usage Examples

### Basic Usage

```

import { RtkAiTranscriptions } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkAiTranscriptions />;

}


```

### With Properties

```

import { RtkAiTranscriptions } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkAiTranscriptions

      initialTranscriptions={[]}

      meeting={meeting}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkaitranscriptions/","name":"RtkAiTranscriptions"}}]}
```
