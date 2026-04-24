---
title: RtkParticipantWaiting
description: API reference for RtkParticipantWaiting component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkParticipantWaiting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkParticipantWaiting

A waiting participant card with accept/reject buttons for waitlist and stage request management.

## Properties

| Property    | Type              | Required | Default         | Description                      |
| ----------- | ----------------- | -------- | --------------- | -------------------------------- |
| participant | Peer              | ✅        | \-              | The waiting participant          |
| meeting     | RealtimeKitClient | ❌        | \-              | The RealtimeKit meeting instance |
| iconPack    | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |
| t           | RtkI18n           | ❌        | \-              | i18n translation function        |

## Usage Examples

### Basic Usage

```

import { RtkParticipantWaiting } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkParticipantWaiting participant={waitingParticipant} />;

}


```

### With Properties

```

import { RtkParticipantWaiting } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkParticipantWaiting

      participant={waitingParticipant}

      meeting={meeting}

      iconPack={customIconPack}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipantwaiting/","name":"RtkParticipantWaiting"}}]}
```
