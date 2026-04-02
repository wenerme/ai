---
title: RtkChat
description: API reference for RtkChat component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkChat.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkChat

Fully featured chat component with image & file upload, emoji picker and auto-scroll.

## Properties

| Property  | Type      | Required | Default               | Description    |
| --------- | --------- | -------- | --------------------- | -------------- |
| config    | UIConfig1 | ❌        | createDefaultConfig() | Config         |
| iconPack  | IconPack  | ❌        | defaultIconPack       | Icon pack      |
| meeting   | Meeting   | ✅        | \-                    | Meeting object |
| overrides | Overrides | ❌        | defaultOverrides      | UI Overrides   |
| size      | Size      | ✅        | \-                    | Size           |
| t         | RtkI18n   | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```

import { RtkChat } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChat />;

}


```

### With Properties

```

import { RtkChat } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChat

      meeting={meeting}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchat/","name":"RtkChat"}}]}
```
