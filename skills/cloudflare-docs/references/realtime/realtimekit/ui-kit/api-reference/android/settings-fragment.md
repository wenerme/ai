---
title: RtkSettingsFragment
description: API reference for RtkSettingsFragment component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSettingsFragment

A settings dialog that contains audio and video device selectors and a self-preview tile. Used in landscape orientation.

## Methods

| Method                | Parameters                                     | Description                                        |
| --------------------- | ---------------------------------------------- | -------------------------------------------------- |
| show                  | fragmentManager: FragmentManager, tag: String? | Display the settings dialog                        |
| setBottomSheetEnabled | onClick: () -> Unit                            | Enable a button to switch to the bottom sheet view |

## Usage Examples

### Basic Usage

Kotlin

```

val settingsFragment = RtkSettingsFragment()

settingsFragment.show(fragmentManager, "SETTINGS_TAG")


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/settings-fragment/","name":"RtkSettingsFragment"}}]}
```
