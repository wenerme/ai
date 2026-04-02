---
title: RtkMarkdownView
description: API reference for RtkMarkdownView component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkMarkdownView.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkMarkdownView

## Properties

| Property  | Type   | Required | Default | Description                              |
| --------- | ------ | -------- | ------- | ---------------------------------------- |
| maxLength | number | ✅        | \-      | max length of text to render as markdown |
| text      | string | ✅        | \-      | raw text to render as markdown           |

## Usage Examples

### Basic Usage

```

import { RtkMarkdownView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkMarkdownView />;

}


```

### With Properties

```

import { RtkMarkdownView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkMarkdownView

      maxLength={42}

      text="example"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkmarkdownview/","name":"RtkMarkdownView"}}]}
```
