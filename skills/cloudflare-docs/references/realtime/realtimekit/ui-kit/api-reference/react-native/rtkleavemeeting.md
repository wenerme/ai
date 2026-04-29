---
title: RtkLeaveMeeting
description: API reference for RtkLeaveMeeting component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkLeaveMeeting

Leave meeting confirmation dialog with options to leave or end the meeting for all (if host).

## Properties

| Property | Type              | Required | Default         | Description                      |
| -------- | ----------------- | -------- | --------------- | -------------------------------- |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |
| onClose  | any               | ✅        | \-              | Callback to close the dialog     |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |
| states   | States            | ❌        | \-              | UI state object                  |
| t        | RtkI18n           | ❌        | \-              | i18n translation function        |

## Usage Examples

### Basic Usage

```

import { RtkLeaveMeeting } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLeaveMeeting meeting={meeting} onClose={() => setOpen(false)} />;

}


```

### With Properties

```

import { RtkLeaveMeeting } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkLeaveMeeting

      meeting={meeting}

      onClose={() => setOpen(false)}

      states={states}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkleavemeeting/","name":"RtkLeaveMeeting"}}]}
```
