---
title: RtkDialogManager
description: API reference for RtkDialogManager component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkDialogManager

Manages and renders modal dialogs for leave confirmation, settings, join stage confirmation, and permissions messages.

## Properties

| Property         | Type              | Required | Default         | Description                      |    |              |
| ---------------- | ----------------- | -------- | --------------- | -------------------------------- | -- | ------------ |
| meeting          | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |    |              |
| config           | UIConfig          | ❌        | defaultConfig   | UI configuration object          |    |              |
| iconPack         | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |    |              |
| size             | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | \- | Size variant |
| states           | States            | ❌        | \-              | UI state object                  |    |              |
| t                | RtkI18n           | ❌        | \-              | i18n translation function        |    |              |
| onRtkStateUpdate | (e) => void       | ❌        | () => \\{\\}    | Callback when UI state changes   |    |              |

## Usage Examples

### Basic Usage

```

import { RtkDialogManager } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkDialogManager meeting={meeting} />;

}


```

### With Properties

```

import { RtkDialogManager } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkDialogManager

      meeting={meeting}

      config={customConfig}

      size="md"

      onRtkStateUpdate={(e) => handleStateUpdate(e)}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialogmanager/","name":"RtkDialogManager"}}]}
```
