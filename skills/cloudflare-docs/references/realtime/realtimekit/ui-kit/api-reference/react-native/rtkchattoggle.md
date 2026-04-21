---
title: RtkChatToggle
description: API reference for RtkChatToggle component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkChatToggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkChatToggle

Toggle button to open the chat sidebar panel. Hides if chat permissions are not available.

## Properties

| Property | Type                     | Required | Default | Description                      |    |           |
| -------- | ------------------------ | -------- | ------- | -------------------------------- | -- | --------- |
| meeting  | RealtimeKitClient        | ✅        | \-      | The RealtimeKit meeting instance |    |           |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'    | ❌                                | \- | Icon size |
| states   | States                   | ❌        | \-      | UI state object                  |    |           |
| variant  | 'button' \| 'horizontal' | ❌        | \-      | Layout variant                   |    |           |
| iconPack | IconPack                 | ❌        | \-      | Custom icon pack                 |    |           |
| t        | RtkI18n                  | ❌        | \-      | i18n translation function        |    |           |

## Usage Examples

### Basic Usage

```

import { RtkChatToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkChatToggle meeting={meeting} />;

}


```

### With Properties

```

import { RtkChatToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkChatToggle meeting={meeting} size="md" variant="button" />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkchattoggle/","name":"RtkChatToggle"}}]}
```
