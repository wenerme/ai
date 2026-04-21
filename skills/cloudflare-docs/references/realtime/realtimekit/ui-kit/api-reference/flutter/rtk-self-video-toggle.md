---
title: RtkSelfVideoToggleButton
description: API reference for RtkSelfVideoToggleButton component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-video-toggle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkSelfVideoToggleButton

A toggle button widget for controlling video state during a meeting. Allows users to turn their video on or off.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property              | Type              | Required | Default              | Description                            |
| --------------------- | ----------------- | -------- | -------------------- | -------------------------------------- |
| meeting               | RealtimekitClient | ✅        | \-                   | Meeting client instance                |
| individualDesignToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization        |
| onVideoToggle         | VoidCallback?     | ❌        | \-                   | Callback invoked when video is toggled |
| iconSize              | double?           | ❌        | \-                   | Size of the icon                       |
| iconColor             | Color?            | ❌        | \-                   | Color of the icon                      |
| showLabel             | bool              | ❌        | false                | Whether to show label text             |

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkSelfVideoToggleButton(

  meeting: yourMeetingInstance,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkSelfVideoToggleButton(

  meeting: yourMeetingInstance,

  onVideoToggle: () {

    // Handle video toggle

  },

  iconSize: 24.0,

  iconColor: Colors.red,

  showLabel: true,

)


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-video-toggle/","name":"RtkSelfVideoToggleButton"}}]}
```
