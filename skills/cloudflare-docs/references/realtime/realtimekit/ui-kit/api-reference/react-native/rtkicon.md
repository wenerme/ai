---
title: RtkIcon
description: API reference for RtkIcon component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkIcon.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkIcon

Renders an SVG icon from an icon string, applying the current theme text color.

## Properties

| Property | Type   | Required | Default | Description               |
| -------- | ------ | -------- | ------- | ------------------------- |
| icon     | string | ✅        | \-      | SVG icon string to render |

## Usage Examples

### Basic Usage

```

import { RtkIcon } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkIcon icon={svgIconString} />;

}


```

### With Properties

```

import {

  RtkIcon,

  defaultIconPack,

} from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkIcon icon={defaultIconPack.mic_on} />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkicon/","name":"RtkIcon"}}]}
```
