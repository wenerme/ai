---
title: RtkParticipantsStageList
description: API reference for RtkParticipantsStageList component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkParticipantsStageList.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkParticipantsStageList

A component which lists all participants, with ability to run privileged actions on each participant according to your permissions.

## Properties

| Property   | Type                 | Required | Default               | Description                          |
| ---------- | -------------------- | -------- | --------------------- | ------------------------------------ |
| config     | UIConfig             | ❌        | createDefaultConfig() | Config                               |
| hideHeader | boolean              | ✅        | \-                    | Hide Stage Participants Count Header |
| iconPack   | IconPack             | ❌        | defaultIconPack       | Icon pack                            |
| meeting    | Meeting              | ✅        | \-                    | Meeting object                       |
| search     | string               | ✅        | \-                    | Search                               |
| size       | Size                 | ✅        | \-                    | Size                                 |
| states     | States1              | ✅        | \-                    | Meeting object                       |
| t          | RtkI18n              | ❌        | useLanguage()         | Language                             |
| view       | ParticipantsViewMode | ✅        | \-                    | View mode for participants list      |

## Usage Examples

### Basic Usage

```

import { RtkParticipantsStageList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkParticipantsStageList />;

}


```

### With Properties

```

import { RtkParticipantsStageList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkParticipantsStageList

      hideHeader={true}

      meeting={meeting}

      search="example"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipantsstagelist/","name":"RtkParticipantsStageList"}}]}
```
