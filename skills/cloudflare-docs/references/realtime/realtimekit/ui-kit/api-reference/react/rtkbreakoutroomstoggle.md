---
title: RtkBreakoutRoomsToggle
description: API reference for RtkBreakoutRoomsToggle component (React Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkBreakoutRoomsToggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkBreakoutRoomsToggle

A button which toggles visibility of breakout rooms. You need to pass the `meeting` object to it.

## Properties

| Property | Type              | Required | Default | Description    |
| -------- | ----------------- | -------- | ------- | -------------- |
| iconPack | IconPack          | ✅        | \-      | Icon pack      |
| meeting  | Meeting           | ✅        | \-      | Meeting object |
| size     | Size              | ✅        | \-      | Size           |
| states   | States            | ✅        | \-      | States object  |
| t        | RtkI18n           | ✅        | \-      | Language       |
| variant  | ControlBarVariant | ✅        | \-      | Variant        |

## Usage Examples

### Basic Usage

```

import { RtkBreakoutRoomsToggle } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkBreakoutRoomsToggle />;

}


```

### With Properties

```

import { RtkBreakoutRoomsToggle } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkBreakoutRoomsToggle

      iconPack={defaultIconPack}

      meeting={meeting}

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomstoggle/","name":"RtkBreakoutRoomsToggle"}}]}
```
