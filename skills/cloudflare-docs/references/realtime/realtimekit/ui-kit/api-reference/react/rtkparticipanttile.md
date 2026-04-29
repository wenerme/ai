---
title: RtkParticipantTile
description: API reference for RtkParticipantTile component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkParticipantTile

A component which plays a participants video and allows for placement of components like `rtk-name-tag`, `rtk-audio-visualizer` or any other component.

## Properties

| Property        | Type                  | Required       | Default               | Description                      |             |              |   |    |                      |
| --------------- | --------------------- | -------------- | --------------------- | -------------------------------- | ----------- | ------------ | - | -- | -------------------- |
| config          | UIConfig              | ❌              | createDefaultConfig() | Config object                    |             |              |   |    |                      |
| iconPack        | IconPack              | ❌              | defaultIconPack       | Icon pack                        |             |              |   |    |                      |
| isPreview       | boolean               | ✅              | \-                    | Whether tile is used for preview |             |              |   |    |                      |
| meeting         | Meeting               | ✅              | \-                    | Meeting object                   |             |              |   |    |                      |
| nameTagPosition | \| 'bottom-left'      | 'bottom-right' | 'bottom-center'       | 'top-left'                       | 'top-right' | 'top-center' | ✅ | \- | Position of name tag |
| participant     | Peer                  | ✅              | \-                    | Participant object               |             |              |   |    |                      |
| size            | Size                  | ✅              | \-                    | Size                             |             |              |   |    |                      |
| states          | States                | ✅              | \-                    | States object                    |             |              |   |    |                      |
| t               | RtkI18n               | ❌              | useLanguage()         | Language                         |             |              |   |    |                      |
| variant         | 'solid' \| 'gradient' | ✅              | \-                    | Variant                          |             |              |   |    |                      |

## Usage Examples

### Basic Usage

```

import { RtkParticipantTile } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkParticipantTile />;

}


```

### With Properties

```

import { RtkParticipantTile } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkParticipantTile

      isPreview={true}

      meeting={meeting}

      nameTagPosition={| 'bottom-left'

    | 'bottom-right'

    | 'bottom-center'

    | 'top-left'

    | 'top-right'

    | 'top-center'}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipanttile/","name":"RtkParticipantTile"}}]}
```
