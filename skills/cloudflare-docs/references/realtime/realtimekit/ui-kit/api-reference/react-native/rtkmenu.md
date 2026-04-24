---
title: RtkMenu
description: API reference for RtkMenu component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkMenu.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkMenu

A menu container component with placement options.

## Properties

| Property  | Type                     | Required       | Default | Description  |              |              |             |               |       |           |             |   |    |                                    |
| --------- | ------------------------ | -------------- | ------- | ------------ | ------------ | ------------ | ----------- | ------------- | ----- | --------- | ----------- | - | -- | ---------------------------------- |
| children  | ReactNode                | ✅              | \-      | Menu content |              |              |             |               |       |           |             |   |    |                                    |
| size      | 'lg' \| 'md'             | 'sm'           | 'xl'    | ✅            | \-           | Size variant |             |               |       |           |             |   |    |                                    |
| placement | 'bottom' \| 'bottom-end' | 'bottom-start' | 'left'  | 'left-end'   | 'left-start' | 'right'      | 'right-end' | 'right-start' | 'top' | 'top-end' | 'top-start' | ✅ | \- | Menu placement relative to trigger |

## Usage Examples

### Basic Usage

```

import { RtkMenu } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMenu size="md" placement="bottom">

      <Text>Menu content</Text>

    </RtkMenu>

  );

}


```

### With Properties

```

import { RtkMenu } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMenu size="lg" placement="bottom-start">

      <Text>Menu content</Text>

    </RtkMenu>

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/","name":"RtkMenu"}}]}
```
