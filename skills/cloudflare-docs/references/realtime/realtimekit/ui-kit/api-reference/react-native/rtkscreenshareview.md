---
title: RtkScreenshareView
description: API reference for RtkScreenshareView component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkScreenshareView.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkScreenshareView

Renders a participant's screen share with fullscreen toggle, name tag, and audio indicator.

## Properties

| Property             | Type                             | Required       | Default         | Description                          |             |              |               |                                  |
| -------------------- | -------------------------------- | -------------- | --------------- | ------------------------------------ | ----------- | ------------ | ------------- | -------------------------------- |
| participant          | RTKParticipant                   | ✅              | \-              | The participant sharing their screen |             |              |               |                                  |
| meeting              | RealtimeKitClient                | ✅              | \-              | The RealtimeKit meeting instance     |             |              |               |                                  |
| hideFullScreenButton | boolean                          | ❌              | false           | Hide the fullscreen toggle button    |             |              |               |                                  |
| iconPack             | IconPack                         | ❌              | defaultIconPack | Custom icon pack                     |             |              |               |                                  |
| nameTagPosition      | 'bottom-center' \| 'bottom-left' | 'bottom-right' | 'top-center'    | 'top-left'                           | 'top-right' | ❌            | 'bottom-left' | Position of the name tag overlay |
| size                 | 'lg' \| 'md'                     | 'sm'           | 'xl'            | ❌                                    | 'sm'        | Size variant |               |                                  |
| variant              | 'gradient' \| 'solid'            | ❌              | 'solid'         | Visual style variant                 |             |              |               |                                  |
| t                    | RtkI18n                          | ❌              | \-              | i18n translation function            |             |              |               |                                  |

## Usage Examples

### Basic Usage

```

import { RtkScreenshareView } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkScreenshareView participant={participant} meeting={meeting} />;

}


```

### With Properties

```

import { RtkScreenshareView } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkScreenshareView

      participant={participant}

      meeting={meeting}

      nameTagPosition="bottom-left"

      variant="solid"

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkscreenshareview/","name":"RtkScreenshareView"}}]}
```
