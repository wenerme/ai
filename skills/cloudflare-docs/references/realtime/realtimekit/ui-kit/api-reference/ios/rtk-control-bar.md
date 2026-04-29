---
title: RtkControlBar
description: API reference for RtkControlBar component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkControlBar

Base control bar view with a More menu button and an End Call button. Serves as the foundation for `RtkMeetingControlBar` and `RtkWebinarControlBar`.

## Initializer parameters

| Parameter                       | Type                    | Required | Default                        | Description                                                |
| ------------------------------- | ----------------------- | -------- | ------------------------------ | ---------------------------------------------------------- |
| meeting                         | RealtimeKitClient       | ✅        | \-                             | The RealtimeKit client instance                            |
| delegate                        | RtkTabBarDelegate?      | ✅        | \-                             | Delegate for handling tab bar interactions                 |
| presentingViewController        | UIViewController        | ✅        | \-                             | View controller used for presenting modal screens          |
| appearance                      | RtkControlBarAppearance | ❌        | RtkControlBarAppearanceModel() | Appearance configuration for the control bar               |
| settingViewControllerCompletion | (() -> Void)?           | ❌        | nil                            | Closure called when the settings view controller dismisses |
| onLeaveMeetingCompletion        | (() -> Void)?           | ❌        | nil                            | Closure called when the participant leaves the meeting     |

## Properties

| Property      | Type                          | Required | Default | Description                      |
| ------------- | ----------------------------- | -------- | ------- | -------------------------------- |
| moreButton    | RtkMoreButtonControlBar       | \-       | \-      | The More menu button (read-only) |
| endCallButton | RtkEndMeetingControlBarButton | \-       | \-      | The End Call button              |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let controlBar = RtkControlBar(

    meeting: rtkClient,

    delegate: self,

    presentingViewController: self

)

view.addSubview(controlBar)


```

### With completion handlers

Swift

```

import RealtimeKitUI


let controlBar = RtkControlBar(

    meeting: rtkClient,

    delegate: self,

    presentingViewController: self,

    onLeaveMeetingCompletion: {

        self.dismiss(animated: true)

    }

)

view.addSubview(controlBar)


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-control-bar/","name":"RtkControlBar"}}]}
```
