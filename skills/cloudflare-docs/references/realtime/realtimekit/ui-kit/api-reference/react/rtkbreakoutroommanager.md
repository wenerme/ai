---
title: RtkBreakoutRoomManager
description: API reference for RtkBreakoutRoomManager component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkBreakoutRoomManager.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkBreakoutRoomManager

## Properties

| Property              | Type               | Required | Default         | Description                      |
| --------------------- | ------------------ | -------- | --------------- | -------------------------------- |
| allowDelete           | boolean            | ✅        | \-              | allow room delete                |
| assigningParticipants | boolean            | ✅        | \-              | Enable updating participants     |
| defaultExpanded       | boolean            | ✅        | \-              | display expanded card by default |
| iconPack              | IconPack           | ❌        | defaultIconPack | Icon pack                        |
| isDragMode            | boolean            | ✅        | \-              | Drag mode                        |
| meeting               | Meeting            | ✅        | \-              | Meeting object                   |
| mode                  | 'edit' \| 'create' | ✅        | \-              | Mode in which selector is used   |
| room                  | DraftMeeting       | ✅        | \-              | Connected Room Config Object     |
| states                | States             | ✅        | \-              | States object                    |
| t                     | RtkI18n            | ❌        | useLanguage()   | Language                         |

## Usage Examples

### Basic Usage

```

import { RtkBreakoutRoomManager } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkBreakoutRoomManager />;

}


```

### With Properties

```

import { RtkBreakoutRoomManager } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkBreakoutRoomManager

      allowDelete={true}

      assigningParticipants={true}

      defaultExpanded={true}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/","name":"RtkBreakoutRoomManager"}}]}
```
