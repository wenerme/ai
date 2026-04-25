---
title: RtkNotification
description: API reference for RtkNotification component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkNotification

A component which shows a notification. You need to remove the element after you receive the`rtkNotificationDismiss` event.

## Properties

| Property     | Type         | Required | Default         | Description             |
| ------------ | ------------ | -------- | --------------- | ----------------------- |
| iconPack     | IconPack     | ❌        | defaultIconPack | Icon pack               |
| notification | Notification | ✅        | \-              | Message                 |
| paused       | boolean      | ✅        | \-              | Stops timeout when true |
| size         | Size         | ✅        | \-              | Size                    |
| t            | RtkI18n      | ❌        | useLanguage()   | Language                |

## Usage Examples

### Basic Usage

```

import { RtkNotification } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkNotification />;

}


```

### With Properties

```

import { RtkNotification } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkNotification

      notification={notification}

      paused={true}

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtknotification/","name":"RtkNotification"}}]}
```
