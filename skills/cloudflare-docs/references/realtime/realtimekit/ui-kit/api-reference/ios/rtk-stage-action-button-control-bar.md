---
title: RtkStageActionButtonControlBar
description: API reference for RtkStageActionButtonControlBar component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkStageActionButtonControlBar

A control bar button for webinar stage actions. Supports requesting to join, joining, leaving, and canceling stage requests based on the current stage status.

## Initializer parameters

| Parameter                | Type               | Required | Default | Description                                                |
| ------------------------ | ------------------ | -------- | ------- | ---------------------------------------------------------- |
| rtkClient                | RealtimeKitClient  | ✅        | \-      | The RealtimeKit client instance                            |
| buttonState              | WebinarStageStatus | ✅        | \-      | The current stage status that determines the button action |
| presentingViewController | UIViewController   | ✅        | \-      | View controller used for presenting confirmation dialogs   |

## Properties

| Property   | Type                                      | Required | Default | Description                                              |
| ---------- | ----------------------------------------- | -------- | ------- | -------------------------------------------------------- |
| dataSource | RtkStageActionButtonControlBarDataSource? | ❌        | nil     | Data source for customizing stage action button behavior |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let stageButton = RtkStageActionButtonControlBar(

    rtkClient: rtkClient,

    buttonState: .requestToJoinStage,

    presentingViewController: self

)

view.addSubview(stageButton)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-stage-action-button-control-bar/","name":"RtkStageActionButtonControlBar"}}]}
```
