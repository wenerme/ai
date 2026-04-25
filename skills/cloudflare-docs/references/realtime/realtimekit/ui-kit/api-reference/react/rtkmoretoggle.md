---
title: RtkMoreToggle
description: API reference for RtkMoreToggle component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkMoreToggle

A button which toggles visibility of a more menu. When clicked it emits a `rtkStateUpdate` event with the data:

TypeScript

```

{ activeMoreMenu: boolean; }


```

## Properties

| Property | Type     | Required | Default         | Description   |
| -------- | -------- | -------- | --------------- | ------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack     |
| size     | Size     | ✅        | \-              | Size          |
| states   | States   | ✅        | \-              | States object |
| t        | RtkI18n  | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```

import { RtkMoreToggle } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkMoreToggle />;

}


```

### With Properties

```

import { RtkMoreToggle } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkMoreToggle

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkmoretoggle/","name":"RtkMoreToggle"}}]}
```
