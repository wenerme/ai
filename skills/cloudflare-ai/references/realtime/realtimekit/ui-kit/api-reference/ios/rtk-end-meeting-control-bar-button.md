---
description: API reference for RtkEndMeetingControlBarButton component (iOS Library)
title: RtkEndMeetingControlBarButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkEndMeetingControlBarButton

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-end-meeting-control-bar-button/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A control bar button that ends or leaves the meeting. Optionally displays a confirmation dialog before ending the meeting.

## Initializer parameters

| Parameter           | Type                                                                                     | Required | Default | Description                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| meeting             | RealtimeKitClient                                                                        | ✅        | \-      | The RealtimeKit client instance                                                                                         |
| alertViewController | UIViewController                                                                         | ✅        | \-      | View controller used to present the confirmation alert                                                                  |
| onClick             | ((RtkEndMeetingControlBarButton, RtkLeaveDialog.RtkLeaveDialogAlertButtonType) -> Void)? | ❌        | nil     | Closure called after the user confirms leaving or ending the meeting, receiving the button and the selected action type |
| appearance          | RtkControlBarButtonAppearance                                                            | ❌        | \-      | Appearance configuration for the button                                                                                 |

## Properties

| Property               | Type | Required | Default | Description                                                    |
| ---------------------- | ---- | -------- | ------- | -------------------------------------------------------------- |
| shouldShowAlertOnClick | Bool | ❌        | true    | Whether to show a confirmation alert before ending the meeting |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let endButton = RtkEndMeetingControlBarButton(
    meeting: rtkClient,
    alertViewController: self
)
view.addSubview(endButton)
```

### Without confirmation dialog

```swift
import RealtimeKitUI

let endButton = RtkEndMeetingControlBarButton(
    meeting: rtkClient,
    alertViewController: self,
    onClick: { button, actionType in
        print("Action: \(actionType)")
    }
)
endButton.shouldShowAlertOnClick = false
view.addSubview(endButton)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-end-meeting-control-bar-button/#page","headline":"RtkEndMeetingControlBarButton · Cloudflare Realtime docs","description":"API reference for RtkEndMeetingControlBarButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-end-meeting-control-bar-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
