---
title: RtkNotifications
description: API reference for RtkNotifications component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkNotifications

Container that manages and displays meeting notifications (participant join/leave, chat messages, polls, network status) with sound effects.

## Properties

| Property | Type              | Required | Default         | Description                      |      |              |
| -------- | ----------------- | -------- | --------------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |      |              |
| config   | UIConfig          | ✅        | defaultConfig   | UI configuration object          |      |              |
| iconPack | IconPack          | ✅        | defaultIconPack | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ✅                                | 'sm' | Size variant |
| states   | States            | ✅        | \-              | UI state object                  |      |              |
| t        | RtkI18n           | ✅        | \-              | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```

import {

  RtkNotifications,

  useLanguage,

} from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  const t = useLanguage();

  return (

    <RtkNotifications

      meeting={meeting}

      config={config}

      iconPack={iconPack}

      size="sm"

      states={states}

      t={t}

    />

  );

}


```

Explain Code

### With Properties

```

import {

  RtkNotifications,

  defaultConfig,

  defaultIconPack,

  useLanguage,

} from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  const t = useLanguage();

  return (

    <RtkNotifications

      meeting={meeting}

      config={defaultConfig}

      iconPack={defaultIconPack}

      size="md"

      states={states}

      t={t}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtknotifications/","name":"RtkNotifications"}}]}
```
