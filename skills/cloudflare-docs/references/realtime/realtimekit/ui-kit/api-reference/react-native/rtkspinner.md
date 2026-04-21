---
title: RtkSpinner
description: API reference for RtkSpinner component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkSpinner.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkSpinner

An animated loading spinner component.

## Properties

| Property | Type   | Required | Default | Description                                  |
| -------- | ------ | -------- | ------- | -------------------------------------------- |
| style    | object | ❌        | \-      | Custom styles to override spinner appearance |

## Usage Examples

### Basic Usage

```

import { RtkSpinner } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkSpinner />;

}


```

### With Properties

```

import { RtkSpinner } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkSpinner style={{ width: 48, height: 48 }} />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkspinner/","name":"RtkSpinner"}}]}
```
