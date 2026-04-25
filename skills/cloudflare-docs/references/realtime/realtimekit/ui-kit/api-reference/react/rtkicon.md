---
title: RtkIcon
description: API reference for RtkIcon component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkIcon

An icon component which accepts an svg string and renders it.

## Properties

| Property | Type        | Required | Default | Description  |
| -------- | ----------- | -------- | ------- | ------------ |
| icon     | string      | ✅        | \-      | Icon         |
| size     | Size1       | ✅        | \-      | Size         |
| variant  | IconVariant | ✅        | \-      | Icon variant |

## Usage Examples

### Basic Usage

```

import { RtkIcon } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkIcon />;

}


```

### With Properties

```

import { RtkIcon } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkIcon

      icon="example"

      size="md"

      variant="primary"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkicon/","name":"RtkIcon"}}]}
```
