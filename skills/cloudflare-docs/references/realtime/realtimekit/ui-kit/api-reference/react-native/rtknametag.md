---
title: RtkNameTag
description: API reference for RtkNameTag component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkNameTag.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkNameTag

Displays a participant's name with optional child content (such as an audio visualizer icon). Used as an overlay on participant tiles.

## Properties

| Property      | Type              | Required | Default | Description                                              |      |           |
| ------------- | ----------------- | -------- | ------- | -------------------------------------------------------- | ---- | --------- |
| participant   | Peer              | ✅        | \-      | The participant to display the name for                  |      |           |
| meeting       | RealtimeKitClient | ❌        | \-      | The RealtimeKit meeting instance (used to identify self) |      |           |
| isScreenshare | boolean           | ❌        | false   | Whether this is a screenshare name tag                   |      |           |
| maxLength     | number            | ❌        | 20      | Maximum width offset for the name tag                    |      |           |
| size          | 'lg' \| 'md'      | 'sm'     | 'xl'    | ❌                                                        | 'sm' | Text size |
| t             | RtkI18n           | ❌        | \-      | i18n translation function                                |      |           |
| children      | ReactNode         | ❌        | \-      | Content to render before the name                        |      |           |

## Usage Examples

### Basic Usage

```

import { RtkNameTag } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkNameTag participant={participant} />;

}


```

### With Properties

```

import { RtkNameTag } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkNameTag

      participant={participant}

      meeting={meeting}

      size="md"

      maxLength={25}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtknametag/","name":"RtkNameTag"}}]}
```
