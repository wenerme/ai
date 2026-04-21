---
title: RtkSpotlightGrid
description: API reference for RtkSpotlightGrid component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkSpotlightGrid.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkSpotlightGrid

A grid layout that highlights pinned participants in a larger view with other participants in a smaller strip. Handles livestream player display for off-stage viewers.

## Properties

| Property           | Type              | Required | Default         | Description                               |      |              |
| ------------------ | ----------------- | -------- | --------------- | ----------------------------------------- | ---- | ------------ |
| meeting            | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance          |      |              |
| participants       | Peer\[\]          | ✅        | \-              | Array of active participants              |      |              |
| pinnedParticipants | Peer\[\]          | ✅        | \-              | Array of pinned participants to spotlight |      |              |
| aspectRatio        | string            | ❌        | '3:4'           | Aspect ratio for grid tiles               |      |              |
| config             | UIConfig          | ❌        | defaultConfig   | UI configuration object                   |      |              |
| gap                | number            | ❌        | 4               | Gap between grid tiles in pixels          |      |              |
| iconPack           | IconPack          | ❌        | defaultIconPack | Custom icon pack                          |      |              |
| size               | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                         | 'sm' | Size variant |
| states             | States            | ❌        | \-              | UI state object                           |      |              |
| t                  | RtkI18n           | ❌        | \-              | i18n translation function                 |      |              |

## Usage Examples

### Basic Usage

```

import { RtkSpotlightGrid } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkSpotlightGrid

      meeting={meeting}

      participants={participants}

      pinnedParticipants={pinned}

    />

  );

}


```

Explain Code

### With Properties

```

import { RtkSpotlightGrid } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkSpotlightGrid

      meeting={meeting}

      participants={participants}

      pinnedParticipants={pinned}

      aspectRatio="16:9"

      gap={8}

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkspotlightgrid/","name":"RtkSpotlightGrid"}}]}
```
