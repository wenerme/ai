---
title: RtkChatSelectorUi
description: API reference for RtkChatSelectorUi component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkChatSelectorUi.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkChatSelectorUi

## Properties

| Property        | Type                   | Required | Default         | Description          |
| --------------- | ---------------------- | -------- | --------------- | -------------------- |
| groups          | ChatGroup\[\]          | ✅        | \-              | Participants         |
| iconPack        | IconPack1              | ❌        | defaultIconPack | Icon pack            |
| selectedGroupId | string                 | ✅        | \-              | Selected participant |
| selfUserId      | string                 | ✅        | \-              | Self User ID         |
| t               | RtkI18n                | ❌        | useLanguage()   | Language             |
| unreadCounts    | Record<string, number> | ✅        | \-              | Unread counts        |

## Usage Examples

### Basic Usage

```

import { RtkChatSelectorUi } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChatSelectorUi />;

}


```

### With Properties

```

import { RtkChatSelectorUi } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChatSelectorUi

      groups={[]}

      selectedGroupId="example"

      selfUserId="example"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselectorui/","name":"RtkChatSelectorUi"}}]}
```
