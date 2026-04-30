---
title: RtkFileMessageView
description: API reference for RtkFileMessageView component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkFileMessageView

A component which renders a file message.

## Properties

| Property | Type      | Required | Default         | Description      |
| -------- | --------- | -------- | --------------- | ---------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack        |
| name     | string    | ✅        | \-              | Name of the file |
| size     | number    | ✅        | \-              | Size of the file |
| url      | string    | ✅        | \-              | Url of the file  |

## Usage Examples

### Basic Usage

```

import { RtkFileMessageView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkFileMessageView />;

}


```

### With Properties

```

import { RtkFileMessageView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkFileMessageView

      name="example"

      size={42}

      url="example"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkfilemessageview/","name":"RtkFileMessageView"}}]}
```
