---
title: RtkPoll
description: API reference for RtkPoll component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkPoll.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkPoll

Renders a single poll with question, votable options, vote counts, and voter avatars.

## Properties

| Property      | Type              | Required | Default         | Description                                          |
| ------------- | ----------------- | -------- | --------------- | ---------------------------------------------------- |
| poll          | Poll              | ✅        | \-              | The poll object to display                           |
| meeting       | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance                     |
| onRtkVotePoll | any               | ❌        | \-              | Callback when a vote is cast (receives option index) |
| self          | string            | ❌        | \-              | Self user ID                                         |
| iconPack      | IconPack          | ❌        | defaultIconPack | Custom icon pack                                     |
| t             | RtkI18n           | ❌        | \-              | i18n translation function                            |

## Usage Examples

### Basic Usage

```

import { RtkPoll } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkPoll poll={poll} meeting={meeting} />;

}


```

### With Properties

```

import { RtkPoll } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkPoll

      poll={poll}

      meeting={meeting}

      onRtkVotePoll={(index) => handleVote(index)}

      self={selfUserId}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpoll/","name":"RtkPoll"}}]}
```
