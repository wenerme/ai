---
title: RtkChatComposerUi
description: API reference for RtkChatComposerUi component (React Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkChatComposerUi.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkChatComposerUi

@deprecated . This component is deprecated, please use rtk-chat-composer-view instead.

## Properties

| Property           | Type                                                                                      | Required | Default         | Description                         |
| ------------------ | ----------------------------------------------------------------------------------------- | -------- | --------------- | ----------------------------------- |
| canSendFiles       | boolean                                                                                   | ✅        | \-              | Whether user can send file messages |
| canSendTextMessage | boolean                                                                                   | ✅        | \-              | Whether user can send text messages |
| iconPack           | IconPack1                                                                                 | ❌        | defaultIconPack | Icon pack                           |
| prefill            | { suggestedReplies?: string\[\]; editMessage?: TextMessage; replyMessage?: TextMessage; } | ❌        | \-              | prefill the composer                |
| size               | Size1                                                                                     | ✅        | \-              | Size                                |
| t                  | RtkI18n                                                                                   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```

import { RtkChatComposerUi } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChatComposerUi />;

}


```

### With Properties

```

import { RtkChatComposerUi } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChatComposerUi

      canSendFiles={true}

      canSendTextMessage={true}

      size="md"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerui/","name":"RtkChatComposerUi"}}]}
```
