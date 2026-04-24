---
title: RtkLogo
description: API reference for RtkLogo component (React Native Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react-native/RtkLogo.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkLogo

Displays a logo from a URL (SVG format) in the meeting header.

## Properties

| Property | Type       | Required | Default | Description                                 |
| -------- | ---------- | -------- | ------- | ------------------------------------------- |
| meeting  | any        | ❌        | \-      | The RealtimeKit meeting instance            |
| config   | UIConfig   | ❌        | \-      | UI configuration object                     |
| logoUrl  | string     | ❌        | \-      | URL of the logo SVG to display              |
| style    | StyleProps | ❌        | \-      | Style object with width/height for the logo |
| t        | RtkI18n    | ❌        | \-      | i18n translation function                   |

## Usage Examples

### Basic Usage

```

import { RtkLogo } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLogo logoUrl="https://example.com/logo.svg" />;

}


```

### With Properties

```

import { RtkLogo } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkLogo

      logoUrl="https://example.com/logo.svg"

      style={{ width: 120, height: 40 }}

      config={customConfig}

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtklogo/","name":"RtkLogo"}}]}
```
