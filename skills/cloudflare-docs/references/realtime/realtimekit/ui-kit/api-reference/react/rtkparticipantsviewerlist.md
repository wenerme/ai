---
title: RtkParticipantsViewerList
description: API reference for RtkParticipantsViewerList component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkParticipantsViewerList.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkParticipantsViewerList

## Properties

| Property   | Type                 | Required | Default               | Description                     |
| ---------- | -------------------- | -------- | --------------------- | ------------------------------- |
| config     | UIConfig1            | ❌        | createDefaultConfig() | Config                          |
| hideHeader | boolean              | ✅        | \-                    | Hide Viewer Count Header        |
| iconPack   | IconPack1            | ❌        | defaultIconPack       | Icon pack                       |
| meeting    | Meeting              | ✅        | \-                    | Meeting object                  |
| search     | string               | ✅        | \-                    | Search                          |
| size       | Size1                | ✅        | \-                    | Size                            |
| t          | RtkI18n1             | ❌        | useLanguage()         | Language                        |
| view       | ParticipantsViewMode | ✅        | \-                    | View mode for participants list |

## Usage Examples

### Basic Usage

```

import { RtkParticipantsViewerList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkParticipantsViewerList />;

}


```

### With Properties

```

import { RtkParticipantsViewerList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkParticipantsViewerList

      hideHeader={true}

      meeting={meeting}

      search="example"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipantsviewerlist/","name":"RtkParticipantsViewerList"}}]}
```
