---
title: RtkLogo
description: API reference for RtkLogo component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkLogo.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkLogo

A component which loads the logo from your config, or via the `logo-url` attribute.

## Properties

| Property | Type     | Required | Default               | Description    |
| -------- | -------- | -------- | --------------------- | -------------- |
| config   | UIConfig | ❌        | createDefaultConfig() | Config object  |
| logoUrl  | string   | ✅        | \-                    | Logo URL       |
| meeting  | Meeting  | ✅        | \-                    | Meeting object |
| t        | RtkI18n  | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```

import { RtkLogo } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkLogo />;

}


```

### With Properties

```

import { RtkLogo } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkLogo

      logoUrl="example"

      meeting={meeting}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtklogo/","name":"RtkLogo"}}]}
```
