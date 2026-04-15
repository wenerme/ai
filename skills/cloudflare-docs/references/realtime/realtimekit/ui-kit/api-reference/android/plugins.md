---
title: RtkPluginsBottomSheet
description: API reference for RtkPluginsBottomSheet component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/plugins.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkPluginsBottomSheet

A component which lists all available plugins from their preset, with the ability to enable or disable plugins.

## Methods

| Method | Parameters                                     | Description                      |
| ------ | ---------------------------------------------- | -------------------------------- |
| show   | fragmentManager: FragmentManager, tag: String? | Display the plugins bottom sheet |

## Usage Examples

### Basic Usage

Kotlin

```

val rtkPluginsBottomSheet = RtkPluginsBottomSheet()

rtkPluginsBottomSheet.show(fragmentManager, "PLUGINS_TAG")


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/plugins/","name":"RtkPluginsBottomSheet"}}]}
```
