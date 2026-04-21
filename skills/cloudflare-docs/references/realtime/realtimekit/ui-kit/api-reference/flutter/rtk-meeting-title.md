---
title: RtkMeetingTitle
description: API reference for RtkMeetingTitle component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-meeting-title.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkMeetingTitle

A widget that displays the title of a RealtimeKit meeting. Integrates with the RealtimeKit design system for consistent styling.

## Properties

| Property              | Type              | Required | Default              | Description                     |
| --------------------- | ----------------- | -------- | -------------------- | ------------------------------- |
| meeting               | RealtimekitClient | ✅        | \-                   | Meeting client instance         |
| individualDesignToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization |

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkMeetingTitle(

  meeting: yourMeetingInstance,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkMeetingTitle(

  meeting: yourMeetingInstance,

  individualDesignToken: yourDesignToken,

)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-meeting-title/","name":"RtkMeetingTitle"}}]}
```
