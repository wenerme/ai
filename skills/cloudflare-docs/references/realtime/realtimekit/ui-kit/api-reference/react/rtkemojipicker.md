---
title: RtkEmojiPicker
description: API reference for RtkEmojiPicker component (React Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkEmojiPicker.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkEmojiPicker

A very simple emoji picker component.

## Properties

| Property        | Type     | Required | Default         | Description                               |
| --------------- | -------- | -------- | --------------- | ----------------------------------------- |
| focusWhenOpened | boolean  | ✅        | \-              | Controls whether or not to focus on mount |
| iconPack        | IconPack | ❌        | defaultIconPack | Icon pack                                 |
| t               | RtkI18n  | ❌        | useLanguage()   | Language                                  |

## Usage Examples

### Basic Usage

```

import { RtkEmojiPicker } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkEmojiPicker />;

}


```

### With Properties

```

import { RtkEmojiPicker } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkEmojiPicker

      focusWhenOpened={true}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/","name":"RtkEmojiPicker"}}]}
```
