---
title: RtkMenuList
description: API reference for RtkMenuList component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkMenuList

A menu list component.

## Properties

| Property    | Type                     | Required | Default         | Description |
| ----------- | ------------------------ | -------- | --------------- | ----------- |
| iconPack    | IconPack                 | ❌        | defaultIconPack | Icon pack   |
| menuVariant | 'primary' \| 'secondary' | ✅        | \-              | Variant     |
| t           | RtkI18n                  | ❌        | useLanguage()   | Language    |

## Usage Examples

### Basic Usage

```

import { RtkMenuList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkMenuList />;

}


```

### With Properties

```

import { RtkMenuList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkMenuList

      menuVariant={'primary' | 'secondary'}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkmenulist/","name":"RtkMenuList"}}]}
```
