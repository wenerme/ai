---
title: RtkDebuggerScreenshare
description: API reference for RtkDebuggerScreenshare component (React Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkDebuggerScreenshare.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkDebuggerScreenshare

## Properties

| Property | Type      | Required | Default         | Description    |
| -------- | --------- | -------- | --------------- | -------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting   | ✅        | \-              | Meeting object |
| size     | Size1     | ✅        | \-              | Size           |
| states   | States1   | ✅        | \-              | States object  |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```

import { RtkDebuggerScreenshare } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkDebuggerScreenshare />;

}


```

### With Properties

```

import { RtkDebuggerScreenshare } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkDebuggerScreenshare

      meeting={meeting}

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkdebuggerscreenshare/","name":"RtkDebuggerScreenshare"}}]}
```
