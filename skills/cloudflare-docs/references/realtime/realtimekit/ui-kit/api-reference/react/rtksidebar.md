---
title: RtkSidebar
description: API reference for RtkSidebar component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkSidebar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkSidebar

A component which handles the sidebar and you can customize which sections you want, and which section you want as the default.

## Properties

| Property        | Type              | Required | Default               | Description                 |
| --------------- | ----------------- | -------- | --------------------- | --------------------------- |
| config          | UIConfig          | ❌        | createDefaultConfig() | Config                      |
| defaultSection  | RtkSidebarSection | ✅        | \-                    | Default section             |
| enabledSections | RtkSidebarTab\[\] | ✅        | \-                    | Enabled sections in sidebar |
| iconPack        | IconPack          | ❌        | defaultIconPack       | Icon pack                   |
| meeting         | Meeting           | ✅        | \-                    | Meeting object              |
| size            | Size              | ✅        | \-                    | Size                        |
| states          | States            | ✅        | \-                    | States object               |
| t               | RtkI18n           | ❌        | useLanguage()         | Language                    |
| view            | RtkSidebarView    | ✅        | \-                    | View type                   |

## Usage Examples

### Basic Usage

```

import { RtkSidebar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkSidebar />;

}


```

### With Properties

```

import { RtkSidebar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkSidebar

      defaultSection={rtksidebarsection}

      enabledSections={[]}

      meeting={meeting}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtksidebar/","name":"RtkSidebar"}}]}
```
