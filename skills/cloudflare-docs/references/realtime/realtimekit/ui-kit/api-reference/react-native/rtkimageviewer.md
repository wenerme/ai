---
title: RtkImageViewer
description: API reference for RtkImageViewer component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkImageViewer.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkImageViewer

Image viewer with fullscreen toggle and download functionality for chat images.

## Properties

| Property    | Type             | Required | Default         | Description                                         |    |              |
| ----------- | ---------------- | -------- | --------------- | --------------------------------------------------- | -- | ------------ |
| image       | any              | ✅        | \-              | The image message object                            |    |              |
| size        | 'lg' \| 'md'     | 'sm'     | 'xl'            | ❌                                                   | \- | Size variant |
| iconPack    | IconPack         | ❌        | defaultIconPack | Custom icon pack                                    |    |              |
| t           | RtkI18n          | ❌        | \-              | i18n translation function                           |    |              |
| isContinued | boolean          | ❌        | false           | Whether this message continues from the same sender |    |              |
| \_id        | string \| number | ❌        | \-              | Unique identifier for fullscreen tracking           |    |              |

## Usage Examples

### Basic Usage

```

import { RtkImageViewer } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkImageViewer image={imageMessage} />;

}


```

### With Properties

```

import { RtkImageViewer } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkImageViewer image={imageMessage} size="md" _id="viewer-1" />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkimageviewer/","name":"RtkImageViewer"}}]}
```
