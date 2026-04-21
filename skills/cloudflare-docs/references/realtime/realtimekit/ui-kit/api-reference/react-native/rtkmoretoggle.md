---
title: RtkMoreToggle
description: API reference for RtkMoreToggle component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkMoreToggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkMoreToggle

Toggle button for the "more options" overflow menu in the control bar. Shows a notification badge for pending requests.

## Properties

| Property | Type                     | Required | Default         | Description                      |    |           |
| -------- | ------------------------ | -------- | --------------- | -------------------------------- | -- | --------- |
| meeting  | RealtimeKitClient        | ✅        | \-              | The RealtimeKit meeting instance |    |           |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                                | \- | Icon size |
| variant  | 'button' \| 'horizontal' | ❌        | \-              | Layout variant                   |    |           |
| iconPack | IconPack                 | ❌        | defaultIconPack | Custom icon pack                 |    |           |
| states   | States                   | ❌        | \-              | UI state object                  |    |           |
| t        | RtkI18n                  | ❌        | \-              | i18n translation function        |    |           |
| children | ReactNode                | ❌        | \-              | Additional content to render     |    |           |

## Usage Examples

### Basic Usage

```

import { RtkMoreToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkMoreToggle meeting={meeting} />;

}


```

### With Properties

```

import { RtkMoreToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMoreToggle

      meeting={meeting}

      size="md"

      variant="button"

      states={states}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmoretoggle/","name":"RtkMoreToggle"}}]}
```
