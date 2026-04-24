---
title: RtkIdleScreen
description: API reference for RtkIdleScreen component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkIdleScreen.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkIdleScreen

Loading/idle screen displayed while the meeting is initializing, showing a logo and spinner.

## Properties

| Property | Type     | Required | Default | Description                                 |
| -------- | -------- | -------- | ------- | ------------------------------------------- |
| config   | UIConfig | ✅        | \-      | UI configuration object (used for logo URL) |

## Usage Examples

### Basic Usage

```

import { RtkIdleScreen } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkIdleScreen config={config} />;

}


```

### With Properties

```

import {

  RtkIdleScreen,

  defaultConfig,

} from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkIdleScreen config={defaultConfig} />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkidlescreen/","name":"RtkIdleScreen"}}]}
```
