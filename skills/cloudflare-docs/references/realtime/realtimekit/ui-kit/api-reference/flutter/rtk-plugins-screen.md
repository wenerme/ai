---
title: RtkPluginsScreen
description: API reference for RtkPluginsScreen component (Flutter Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-plugins-screen.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkPluginsScreen

A pre-built plugins screen that lists available plugins with the ability to turn them on or off.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

Warning

`RtkPluginsScreen` is not exported from the barrel file. Use a direct import path instead of the standard `realtimekit_ui.dart` import.

## Properties

This component does not accept any properties. It uses the `RealtimekitClient` from the nearest [RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) ancestor.

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/src/pages/plugins/plugin_page.dart';


RtkPluginsScreen()


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-plugins-screen/","name":"RtkPluginsScreen"}}]}
```
