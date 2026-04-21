---
title: RtkFileMessage
description: API reference for RtkFileMessage component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkFileMessage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkFileMessage

Renders a file message in chat with file name, size, extension, and download button.

## Properties

| Property    | Type     | Required | Default         | Description                                         |
| ----------- | -------- | -------- | --------------- | --------------------------------------------------- |
| message     | Message  | ✅        | \-              | The chat message object                             |
| isContinued | boolean  | ❌        | false           | Whether this message continues from the same sender |
| now         | Date     | ❌        | new Date()      | Current time for relative timestamps                |
| iconPack    | IconPack | ❌        | defaultIconPack | Custom icon pack                                    |

## Usage Examples

### Basic Usage

```

import { RtkFileMessage } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkFileMessage message={message} />;

}


```

### With Properties

```

import { RtkFileMessage } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkFileMessage message={message} isContinued={true} now={new Date()} />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkfilemessage/","name":"RtkFileMessage"}}]}
```
