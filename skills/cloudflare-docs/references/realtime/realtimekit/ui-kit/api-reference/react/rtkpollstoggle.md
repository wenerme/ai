---
title: RtkPollsToggle
description: API reference for RtkPollsToggle component (React Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkPollsToggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkPollsToggle

A button which toggles visibility of polls. You need to pass the `meeting` object to it to see the unread polls count badge. When clicked it emits a `rtkStateUpdate` event with the data:

TypeScript

```

{ activeSidebar: boolean; sidebar: 'polls' }


```

## Properties

| Property | Type              | Required | Default         | Description    |
| -------- | ----------------- | -------- | --------------- | -------------- |
| iconPack | IconPack          | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting           | ✅        | \-              | Meeting object |
| size     | Size              | ✅        | \-              | Size           |
| states   | States            | ✅        | \-              | States object  |
| t        | RtkI18n           | ❌        | useLanguage()   | Language       |
| variant  | ControlBarVariant | ✅        | \-              | Variant        |

## Usage Examples

### Basic Usage

```

import { RtkPollsToggle } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkPollsToggle />;

}


```

### With Properties

```

import { RtkPollsToggle } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkPollsToggle

      meeting={meeting}

      size="md"

      variant="button"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkpollstoggle/","name":"RtkPollsToggle"}}]}
```
