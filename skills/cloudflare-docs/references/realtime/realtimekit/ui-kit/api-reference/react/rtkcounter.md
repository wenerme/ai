---
title: RtkCounter
description: API reference for RtkCounter component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkCounter

A number picker with increment and decrement buttons.

## Properties

| Property | Type      | Required | Default         | Description   |
| -------- | --------- | -------- | --------------- | ------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack     |
| minValue | number    | ✅        | \-              | Minimum value |
| size     | Size1     | ✅        | \-              | Size          |
| t        | RtkI18n   | ❌        | useLanguage()   | Language      |
| value    | number    | ✅        | \-              | Initial value |

## Usage Examples

### Basic Usage

```

import { RtkCounter } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkCounter />;

}


```

### With Properties

```

import { RtkCounter } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkCounter

      minValue={42}

      size="md"

      value={42}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkcounter/","name":"RtkCounter"}}]}
```
