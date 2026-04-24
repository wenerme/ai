---
title: RtkMeetingControlBar
description: API reference for RtkMeetingControlBar component (iOS Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-control-bar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkMeetingControlBar

Control bar for group calls that extends `RtkControlBar` with microphone and video toggle buttons.

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

| Property   | Type                            | Required | Default | Description                                     |
| ---------- | ------------------------------- | -------- | ------- | ----------------------------------------------- |
| dataSource | RtkMeetingControlBarDataSource? | ❌        | nil     | Data source for customizing control bar buttons |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let controlBar = RtkMeetingControlBar(

    meeting: rtkClient,

    delegate: self,

    presentingViewController: self

)

view.addSubview(controlBar)


```

### With leave meeting handler

Swift

```

import RealtimeKitUI


let controlBar = RtkMeetingControlBar(

    meeting: rtkClient,

    delegate: self,

    presentingViewController: self,

    onLeaveMeetingCompletion: {

        self.navigationController?.popViewController(animated: true)

    }

)

view.addSubview(controlBar)


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-control-bar/","name":"RtkMeetingControlBar"}}]}
```
