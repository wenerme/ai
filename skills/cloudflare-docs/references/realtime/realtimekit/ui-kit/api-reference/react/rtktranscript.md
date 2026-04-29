---
title: RtkTranscript
description: API reference for RtkTranscript component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkTranscript

A component which shows a transcript. You need to remove the element after you receive the`rtkTranscriptDismiss` event.

## Properties

| Property   | Type                                 | Required | Default       | Description |
| ---------- | ------------------------------------ | -------- | ------------- | ----------- |
| t          | RtkI18n                              | ❌        | useLanguage() | Language    |
| transcript | Transcript & { renderedId?: string } | ❌        | \-            | Message     |

## Usage Examples

### Basic Usage

```

import { RtkTranscript } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkTranscript />;

}


```

### With Properties

```

import { RtkTranscript } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkTranscript

      t={rtki18n}

      transcript="example"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtktranscript/","name":"RtkTranscript"}}]}
```
