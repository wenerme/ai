---
title: RtkMessageListView
description: API reference for RtkMessageListView component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMessageListView

A component which renders list of messages.

## Properties

| Property          | Type                              | Required | Default         | Description                                                                   |
| ----------------- | --------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------- |
| estimateItemSize  | number                            | ✅        | \-              | Estimated height of an item                                                   |
| iconPack          | IconPack1                         | ❌        | defaultIconPack | Icon pack                                                                     |
| loadMore          | (lastMessage: Message)            | ✅        | \-              | Function to load more messages. Messages returned from this will be prepended |
| messages          | Message\[\]                       | ✅        | \-              | Messages to render                                                            |
| renderer          | (message: Message, index: number) | ✅        | \-              | Render function of the message                                                |
| visibleItemsCount | number                            | ✅        | \-              | Maximum visible messages                                                      |

## Usage Examples

### Basic Usage

```

import { RtkMessageListView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkMessageListView />;

}


```

### With Properties

```

import { RtkMessageListView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkMessageListView

      estimateItemSize={42}

      loadMore={(lastmessage: message)}

      messages={[]}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkmessagelistview/","name":"RtkMessageListView"}}]}
```
