---
title: RtkImageViewer
description: API reference for RtkImageViewer component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkImageViewer.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkImageViewer

A component which shows an image sent via chat.

## Properties

| Property | Type         | Required | Default         | Description   |
| -------- | ------------ | -------- | --------------- | ------------- |
| iconPack | IconPack     | ❌        | defaultIconPack | Icon pack     |
| image    | ImageMessage | ✅        | \-              | Image message |
| size     | Size         | ✅        | \-              | Size          |
| t        | RtkI18n      | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```

import { RtkImageViewer } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkImageViewer />;

}


```

### With Properties

```

import { RtkImageViewer } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkImageViewer

      image={imagemessage}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkimageviewer/","name":"RtkImageViewer"}}]}
```
