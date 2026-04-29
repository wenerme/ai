---
title: RtkControlbar
description: API reference for RtkControlbar component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkControlbar

Controlbar component provides you with various designs as variants.

## Properties

| Property      | Type               | Required | Default               | Description                      |
| ------------- | ------------------ | -------- | --------------------- | -------------------------------- |
| config        | UIConfig1          | ❌        | createDefaultConfig() | Config                           |
| disableRender | boolean            | ✅        | \-                    | Whether to render the default UI |
| iconPack      | IconPack1          | ❌        | defaultIconPack       | Icon Pack                        |
| meeting       | Meeting            | ✅        | \-                    | Meeting                          |
| size          | Size               | ✅        | \-                    | Size                             |
| states        | States             | ✅        | \-                    | States                           |
| t             | RtkI18n            | ❌        | useLanguage()         | Language                         |
| variant       | 'solid' \| 'boxed' | ✅        | \-                    | Variant                          |

## Usage Examples

### Basic Usage

```

import { RtkControlbar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkControlbar />;

}


```

### With Properties

```

import { RtkControlbar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkControlbar

      disableRender={true}

      meeting={meeting}

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkcontrolbar/","name":"RtkControlbar"}}]}
```
