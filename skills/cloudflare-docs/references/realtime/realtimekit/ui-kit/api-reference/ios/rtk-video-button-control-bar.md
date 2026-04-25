---
title: RtkVideoButtonControlBar
description: API reference for RtkVideoButtonControlBar component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkVideoButtonControlBar

A control bar button that toggles the local camera on and off. Checks camera permissions before toggling.

## Initializer parameters

| Parameter | Type              | Required | Default | Description                     |
| --------- | ----------------- | -------- | ------- | ------------------------------- |
| rtkClient | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let videoButton = RtkVideoButtonControlBar(rtkClient: rtkClient)

view.addSubview(videoButton)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-video-button-control-bar/","name":"RtkVideoButtonControlBar"}}]}
```
