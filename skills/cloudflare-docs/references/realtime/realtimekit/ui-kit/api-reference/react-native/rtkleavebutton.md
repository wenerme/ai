---
title: RtkLeaveButton
description: API reference for RtkLeaveButton component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkLeaveButton.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkLeaveButton

Button to trigger the leave meeting confirmation dialog.

## Properties

| Property | Type                     | Required | Default         | Description               |    |             |
| -------- | ------------------------ | -------- | --------------- | ------------------------- | -- | ----------- |
| variant  | 'button' \| 'horizontal' | ❌        | \-              | Layout variant            |    |             |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                         | \- | Button size |
| iconPack | IconPack                 | ❌        | defaultIconPack | Custom icon pack          |    |             |
| t        | RtkI18n                  | ❌        | \-              | i18n translation function |    |             |

## Usage Examples

### Basic Usage

```

import { RtkLeaveButton } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLeaveButton />;

}


```

### With Properties

```

import { RtkLeaveButton } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLeaveButton variant="button" size="md" />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkleavebutton/","name":"RtkLeaveButton"}}]}
```
