---
title: RtkImageMessage
description: API reference for RtkImageMessage component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkImageMessage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkImageMessage

@deprecated `rtk-image-message` is deprecated and will be removed soon. Use `rtk-image-message-view` instead. A component which renders an image message from chat.

## Properties

| Property    | Type         | Required | Default         | Description                                             |
| ----------- | ------------ | -------- | --------------- | ------------------------------------------------------- |
| iconPack    | IconPack     | ❌        | defaultIconPack | Icon pack                                               |
| isContinued | boolean      | ✅        | \-              | Whether the message is continued by same user           |
| message     | ImageMessage | ✅        | \-              | Text message object                                     |
| now         | Date         | ✅        | \-              | Date object of now, to calculate distance between dates |
| showBubble  | boolean      | ✅        | \-              | show message in bubble                                  |
| t           | RtkI18n      | ❌        | useLanguage()   | Language                                                |

## Usage Examples

### Basic Usage

```

import { RtkImageMessage } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkImageMessage />;

}


```

### With Properties

```

import { RtkImageMessage } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkImageMessage

      isContinued={true}

      message={imagemessage}

      now={date}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkimagemessage/","name":"RtkImageMessage"}}]}
```
