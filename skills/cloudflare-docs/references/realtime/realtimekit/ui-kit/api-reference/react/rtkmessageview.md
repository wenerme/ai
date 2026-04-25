---
title: RtkMessageView
description: API reference for RtkMessageView component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkMessageView

## Properties

| Property       | Type                     | Required | Default         | Description                             |
| -------------- | ------------------------ | -------- | --------------- | --------------------------------------- |
| actions        | MessageAction\[\]        | ✅        | \-              | List of actions to show in menu         |
| authorName     | string                   | ✅        | \-              | Author display label                    |
| avatarUrl      | string                   | ✅        | \-              | Avatar image url                        |
| hideAuthorName | boolean                  | ✅        | \-              | Hides author display label              |
| hideAvatar     | boolean                  | ✅        | \-              | Hides avatar                            |
| hideMetadata   | boolean                  | ✅        | \-              | Hides metadata (time)                   |
| iconPack       | IconPack1                | ❌        | defaultIconPack | Icon pack                               |
| isEdited       | boolean                  | ✅        | \-              | Has the message been edited             |
| isSelf         | boolean                  | ✅        | \-              | Is the message sent by the current user |
| messageType    | Message\['type'\]        | ✅        | \-              | Type of message                         |
| pinned         | boolean                  | ✅        | \-              | Is message pinned                       |
| time           | Date                     | ✅        | \-              | Time when message was sent              |
| variant        | 'plain' \| 'bubble'      | ✅        | \-              | Appearance                              |
| viewType       | 'incoming' \| 'outgoing' | ✅        | \-              | Render                                  |

## Usage Examples

### Basic Usage

```

import { RtkMessageView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkMessageView />;

}


```

### With Properties

```

import { RtkMessageView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkMessageView

      actions={[]}

      authorName="example"

      avatarUrl="example"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkmessageview/","name":"RtkMessageView"}}]}
```
