---
title: RtkSettings
description: API reference for RtkSettings component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkSettings

Settings dialog with audio device selection, video device selection, and network connection status.

## Properties

| Property | Type              | Required | Default         | Description                           |      |              |
| -------- | ----------------- | -------- | --------------- | ------------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance      |      |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                     | 'sm' | Size variant |
| states   | States            | ❌        | \-              | UI state object                       |      |              |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                      |      |              |
| t        | RtkI18n           | ❌        | \-              | i18n translation function             |      |              |
| onClose  | any               | ❌        | \-              | Callback to close the settings dialog |      |              |

## Usage Examples

### Basic Usage

```

import { RtkSettings } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkSettings meeting={meeting} />;

}


```

### With Properties

```

import { RtkSettings } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkSettings

      meeting={meeting}

      size="md"

      onClose={() => setSettingsOpen(false)}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtksettings/","name":"RtkSettings"}}]}
```
