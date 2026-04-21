---
title: RtkWebinarStageToggle
description: API reference for RtkWebinarStageToggle component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkWebinarStageToggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkWebinarStageToggle

Toggle button for requesting to join or leave the webinar stage. Only visible in webinar mode for participants with stage access permissions.

## Properties

| Property | Type                     | Required | Default  | Description                      |      |              |
| -------- | ------------------------ | -------- | -------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient        | ✅        | \-       | The RealtimeKit meeting instance |      |              |
| iconPack | IconPack                 | ❌        | \-       | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'     | ❌                                | 'sm' | Size variant |
| variant  | 'button' \| 'horizontal' | ❌        | 'button' | Layout variant                   |      |              |
| t        | RtkI18n                  | ❌        | \-       | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```

import { RtkWebinarStageToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkWebinarStageToggle meeting={meeting} />;

}


```

### With Properties

```

import { RtkWebinarStageToggle } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkWebinarStageToggle meeting={meeting} size="md" variant="button" />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkwebinarstagetoggle/","name":"RtkWebinarStageToggle"}}]}
```
