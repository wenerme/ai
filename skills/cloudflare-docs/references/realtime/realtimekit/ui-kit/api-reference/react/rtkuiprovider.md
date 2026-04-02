---
title: RtkUiProvider
description: API reference for RtkUiProvider component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkUiProvider.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkUiProvider

## Properties

| Property        | Type            | Required | Default          | Description                         |
| --------------- | --------------- | -------- | ---------------- | ----------------------------------- |
| config          | UIConfig1       | ✅        | \-               | Config                              |
| iconPack        | IconPack1       | ❌        | defaultIconPack  | Icon pack                           |
| meeting         | Meeting \| null | ❌        | null             | Meeting                             |
| mode            | MeetingMode1    | ✅        | \-               | Fill type                           |
| overrides       | Overrides1      | ❌        | defaultOverrides | UI Kit Overrides                    |
| showSetupScreen | boolean         | ✅        | \-               | Whether to show setup screen or not |
| t               | RtkI18n1        | ❌        | useLanguage()    | Language utility                    |

## Usage Examples

### Basic Usage

```

import { RtkUiProvider } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkUiProvider />;

}


```

### With Properties

```

import { RtkUiProvider } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkUiProvider

      config={defaultUiConfig}

      mode={meeting}

      showSetupScreen={true}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkuiprovider/","name":"RtkUiProvider"}}]}
```
