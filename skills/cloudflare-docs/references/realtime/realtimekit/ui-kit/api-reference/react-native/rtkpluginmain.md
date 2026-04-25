---
title: RtkPluginMain
description: API reference for RtkPluginMain component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkPluginMain

Renders an active plugin in a WebView with fullscreen toggle and close button. Handles plugin iframe communication.

## Properties

| Property | Type              | Required | Default         | Description                      |
| -------- | ----------------- | -------- | --------------- | -------------------------------- |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |
| plugin   | RTKPlugin         | ✅        | \-              | The plugin to render             |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |

## Usage Examples

### Basic Usage

```

import { RtkPluginMain } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkPluginMain meeting={meeting} plugin={activePlugin} />;

}


```

### With Properties

```

import { RtkPluginMain } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkPluginMain

      meeting={meeting}

      plugin={activePlugin}

      iconPack={customIconPack}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpluginmain/","name":"RtkPluginMain"}}]}
```
