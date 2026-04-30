---
title: RtkGridPagination
description: API reference for RtkGridPagination component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkGridPagination

A component which allows you to change current page and view mode of active participants list. This is reflected in the `rtk-grid` component.

## Properties

| Property | Type                   | Required | Default         | Description    |
| -------- | ---------------------- | -------- | --------------- | -------------- |
| iconPack | IconPack               | ❌        | defaultIconPack | Icon Pack      |
| meeting  | Meeting                | ✅        | \-              | Meeting object |
| size     | Size                   | ✅        | \-              | Size Prop      |
| states   | States                 | ✅        | \-              | States         |
| t        | RtkI18n                | ❌        | useLanguage()   | Language       |
| variant  | GridPaginationVariants | ✅        | \-              | Variant        |

## Usage Examples

### Basic Usage

```

import { RtkGridPagination } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkGridPagination />;

}


```

### With Properties

```

import { RtkGridPagination } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkGridPagination

      meeting={meeting}

      size="md"

      variant={gridpaginationvariants}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkgridpagination/","name":"RtkGridPagination"}}]}
```
