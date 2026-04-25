---
title: RtkMenuItem
description: API reference for RtkMenuItem component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkMenuItem

A pressable menu item within a menu.

## Properties

| Property | Type         | Required | Default | Description            |    |              |
| -------- | ------------ | -------- | ------- | ---------------------- | -- | ------------ |
| children | ReactNode    | ✅        | \-      | Menu item content      |    |              |
| onClick  | (ev) => {}   | ❌        | \-      | Press handler callback |    |              |
| size     | 'lg' \| 'md' | 'sm'     | 'xl'    | ❌                      | \- | Size variant |

## Usage Examples

### Basic Usage

```

import { RtkMenuItem } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMenuItem onClick={() => ({})}>

      <Text>Option 1</Text>

    </RtkMenuItem>

  );

}


```

### With Properties

```

import { RtkMenuItem } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMenuItem onClick={(ev) => ({})} size="md">

      <Text>Option 1</Text>

    </RtkMenuItem>

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenuitem/","name":"RtkMenuItem"}}]}
```
