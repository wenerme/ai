---
title: RtkEndedScreen
description: API reference for RtkEndedScreen component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkEndedScreen.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkEndedScreen

Screen displayed when the meeting has ended.

## Properties

| Property | Type              | Required | Default       | Description                      |    |              |
| -------- | ----------------- | -------- | ------------- | -------------------------------- | -- | ------------ |
| meeting  | RealtimeKitClient | ❌        | \-            | The RealtimeKit meeting instance |    |              |
| config   | UIConfig          | ❌        | defaultConfig | UI configuration object          |    |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'          | ❌                                | \- | Size variant |
| states   | States            | ❌        | \-            | UI state object                  |    |              |
| t        | RtkI18n           | ❌        | \-            | i18n translation function        |    |              |

## Usage Examples

### Basic Usage

```

import { RtkEndedScreen } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkEndedScreen />;

}


```

### With Properties

```

import { RtkEndedScreen } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkEndedScreen meeting={meeting} config={customConfig} size="md" />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkendedscreen/","name":"RtkEndedScreen"}}]}
```
