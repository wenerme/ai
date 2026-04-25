---
title: RtkLiveStreamStageToggle
description: API reference for RtkLiveStreamStageToggle component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkLiveStreamStageToggle

Toggle button for joining or leaving the livestream stage. Only visible in livestream mode.

## Properties

| Property | Type                     | Required | Default         | Description                      |      |              |
| -------- | ------------------------ | -------- | --------------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient        | ✅        | \-              | The RealtimeKit meeting instance |      |              |
| iconPack | IconPack                 | ❌        | defaultIconPack | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                                | 'sm' | Size variant |
| variant  | 'button' \| 'horizontal' | ❌        | 'button'        | Layout variant                   |      |              |
| t        | RtkI18n                  | ❌        | \-              | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```

import { RtkLiveStreamStageToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLiveStreamStageToggle meeting={meeting} />;

}


```

### With Properties

```

import { RtkLiveStreamStageToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkLiveStreamStageToggle meeting={meeting} size="md" variant="button" />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtklivestreamstagetoggle/","name":"RtkLiveStreamStageToggle"}}]}
```
