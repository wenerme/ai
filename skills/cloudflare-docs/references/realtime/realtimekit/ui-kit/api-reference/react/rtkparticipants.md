---
title: RtkParticipants
description: API reference for RtkParticipants component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkParticipants.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkParticipants

A component which lists all participants, with ability to run privileged actions on each participant according to your permissions.

## Properties

| Property                 | Type              | Required | Default               | Description     |
| ------------------------ | ----------------- | -------- | --------------------- | --------------- |
| config                   | UIConfig          | ❌        | createDefaultConfig() | Config          |
| defaultParticipantsTabId | ParticipantsTabId | ✅        | \-                    | Default section |
| iconPack                 | IconPack          | ❌        | defaultIconPack       | Icon pack       |
| meeting                  | Meeting           | ✅        | \-                    | Meeting object  |
| size                     | Size              | ✅        | \-                    | Size            |
| states                   | States            | ✅        | \-                    | States object   |
| t                        | RtkI18n           | ❌        | useLanguage()         | Language        |

## Usage Examples

### Basic Usage

```

import { RtkParticipants } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkParticipants />;

}


```

### With Properties

```

import { RtkParticipants } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkParticipants

      defaultParticipantsTabId={participantstabid}

      meeting={meeting}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipants/","name":"RtkParticipants"}}]}
```
