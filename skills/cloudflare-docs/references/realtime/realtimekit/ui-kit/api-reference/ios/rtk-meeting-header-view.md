---
title: RtkMeetingHeaderView
description: API reference for RtkMeetingHeaderView component (iOS Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-header-view.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkMeetingHeaderView

Meeting header view that displays the meeting title, participant count, elapsed time clock, recording indicator, and camera switch button.

## Initializer parameters

| Parameter | Type              | Required | Default | Description                                            |
| --------- | ----------------- | -------- | ------- | ------------------------------------------------------ |
| meeting   | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance for the active meeting |

## Methods

| Method                                | Return Type | Description                                                   |
| ------------------------------------- | ----------- | ------------------------------------------------------------- |
| setContentTop(offset: CGFloat)        | Void        | Sets the top content offset for the header layout             |
| refreshNextPreviousButtonState()      | Void        | Refreshes the enabled state of next and previous page buttons |
| setClicks(nextButton:previousButton:) | Void        | Assigns tap handlers for the next and previous page buttons   |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let headerView = RtkMeetingHeaderView(meeting: rtkClient)

view.addSubview(headerView)


```

### With page navigation

Swift

```

import RealtimeKitUI


let headerView = RtkMeetingHeaderView(meeting: rtkClient)

headerView.setClicks(

    nextButton: { print("Next page") },

    previousButton: { print("Previous page") }

)

headerView.refreshNextPreviousButtonState()

view.addSubview(headerView)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-header-view/","name":"RtkMeetingHeaderView"}}]}
```
