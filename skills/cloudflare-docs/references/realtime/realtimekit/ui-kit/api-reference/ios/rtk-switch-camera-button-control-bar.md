---
title: RtkSwitchCameraButtonControlBar
description: API reference for RtkSwitchCameraButtonControlBar component (iOS Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/ios/rtk-switch-camera-button-control-bar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkSwitchCameraButtonControlBar

A control bar button that switches between the front and rear cameras.

## Initializer parameters

| Parameter | Type              | Required | Default | Description                     |
| --------- | ----------------- | -------- | ------- | ------------------------------- |
| meeting   | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let switchCameraButton = RtkSwitchCameraButtonControlBar(meeting: rtkClient)

view.addSubview(switchCameraButton)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-switch-camera-button-control-bar/","name":"RtkSwitchCameraButtonControlBar"}}]}
```
