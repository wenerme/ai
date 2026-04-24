---
title: RtkButton
description: API reference for RtkButton component (React Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkButton.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkButton

A button that follows RTK Design System.

## Properties

| Property | Type                        | Required | Default | Description                          |
| -------- | --------------------------- | -------- | ------- | ------------------------------------ |
| disabled | boolean                     | ✅        | \-      | Where the button is disabled or not  |
| kind     | ButtonKind                  | ✅        | \-      | Button type                          |
| reverse  | boolean                     | ✅        | \-      | Whether to reverse order of children |
| size     | Size                        | ✅        | \-      | Size                                 |
| type     | HTMLButtonElement\['type'\] | ✅        | \-      | Button type                          |
| variant  | ButtonVariant               | ✅        | \-      | Button variant                       |

## Usage Examples

### Basic Usage

```

import { RtkButton } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkButton />;

}


```

### With Properties

```

import { RtkButton } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkButton

      disabled={true}

      kind={buttonkind}

      reverse={true}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkbutton/","name":"RtkButton"}}]}
```
