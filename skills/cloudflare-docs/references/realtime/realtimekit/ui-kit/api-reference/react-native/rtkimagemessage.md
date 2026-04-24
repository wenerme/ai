---
title: RtkImageMessage
description: API reference for RtkImageMessage component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkImageMessage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkImageMessage

Renders an image message in chat with loading indicator and fullscreen support.

## Properties

| Property    | Type     | Required | Default         | Description                                         |
| ----------- | -------- | -------- | --------------- | --------------------------------------------------- |
| message     | any      | ✅        | \-              | The image message object with link property         |
| iconPack    | IconPack | ❌        | defaultIconPack | Custom icon pack                                    |
| isContinued | boolean  | ❌        | false           | Whether this message continues from the same sender |
| now         | Date     | ❌        | new Date()      | Current time for relative timestamps                |
| t           | RtkI18n  | ❌        | \-              | i18n translation function                           |

## Usage Examples

### Basic Usage

```

import { RtkImageMessage } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkImageMessage message={imageMessage} />;

}


```

### With Properties

```

import { RtkImageMessage } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkImageMessage

      message={imageMessage}

      isContinued={false}

      now={new Date()}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkimagemessage/","name":"RtkImageMessage"}}]}
```
