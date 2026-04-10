---
title: RtkLeaveButton
description: API reference for RtkLeaveButton component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkLeaveButton.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkLeaveButton

A button which toggles visilibility of the leave confirmation dialog.

## Properties

| Property | Type              | Required | Default         | Description |
| -------- | ----------------- | -------- | --------------- | ----------- |
| iconPack | IconPack          | ❌        | defaultIconPack | Icon pack   |
| size     | Size              | ✅        | \-              | Size        |
| t        | RtkI18n           | ❌        | useLanguage()   | Language    |
| variant  | ControlBarVariant | ✅        | \-              | Variant     |

## Usage Examples

### Basic Usage

```

import { RtkLeaveButton } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkLeaveButton />;

}


```

### With Properties

```

import { RtkLeaveButton } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkLeaveButton

      size="md"

      variant="button"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkleavebutton/","name":"RtkLeaveButton"}}]}
```
