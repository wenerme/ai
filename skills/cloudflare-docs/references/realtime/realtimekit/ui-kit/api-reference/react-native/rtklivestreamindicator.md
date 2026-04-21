---
title: RtkLiveStreamIndicator
description: API reference for RtkLiveStreamIndicator component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkLiveStreamIndicator.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkLiveStreamIndicator

Displays a "Live" indicator when a livestream is active. Only visible in livestream mode for off-stage viewers.

## Properties

| Property | Type              | Required | Default         | Description                      |      |              |
| -------- | ----------------- | -------- | --------------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |      |              |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | 'sm' | Size variant |
| t        | RtkI18n           | ❌        | useLanguage()   | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```

import { RtkLiveStreamIndicator } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLiveStreamIndicator meeting={meeting} />;

}


```

### With Properties

```

import { RtkLiveStreamIndicator } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLiveStreamIndicator meeting={meeting} size="md" />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtklivestreamindicator/","name":"RtkLiveStreamIndicator"}}]}
```
