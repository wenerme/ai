---
title: RtkSettingsToggle
description: API reference for RtkSettingsToggle component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSettingsToggle

Toggle button to open the settings dialog. Hides if no audio or video permissions are available.

## Properties

| Property | Type                     | Required | Default         | Description               |    |           |
| -------- | ------------------------ | -------- | --------------- | ------------------------- | -- | --------- |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                         | \- | Icon size |
| states   | States                   | ❌        | \-              | UI state object           |    |           |
| variant  | 'button' \| 'horizontal' | ❌        | \-              | Layout variant            |    |           |
| iconPack | IconPack                 | ❌        | defaultIconPack | Custom icon pack          |    |           |
| t        | RtkI18n                  | ❌        | \-              | i18n translation function |    |           |

## Usage Examples

### Basic Usage

```

import { RtkSettingsToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkSettingsToggle />;

}


```

### With Properties

```

import { RtkSettingsToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkSettingsToggle size="md" variant="button" states={states} />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtksettingstoggle/","name":"RtkSettingsToggle"}}]}
```
