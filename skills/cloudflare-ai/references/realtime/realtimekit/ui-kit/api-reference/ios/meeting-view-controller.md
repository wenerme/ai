---
description: API reference for MeetingViewController component (iOS Library)
title: MeetingViewController
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# MeetingViewController

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/meeting-view-controller/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The main meeting screen view controller. Displays the participant grid, plugins, screen share, header, and control bar.

## Initializer parameters

| Parameter  | Type                 | Required | Default | Description                                            |
| ---------- | -------------------- | -------- | ------- | ------------------------------------------------------ |
| meeting    | RealtimeKitClient    | ✅        | \-      | The RealtimeKit client instance for the active meeting |
| completion | @escaping () -> Void | ✅        | \-      | Closure called when the meeting ends                   |

## Properties

| Property   | Type                             | Required | Default | Description                                                          |
| ---------- | -------------------------------- | -------- | ------- | -------------------------------------------------------------------- |
| dataSource | MeetingViewControllerDataSource? | ❌        | nil     | Data source for providing custom topbar, middle view, and bottom bar |

## MeetingViewControllerDataSource protocol

Implement this protocol to provide custom UI sections within the meeting screen.

| Method                           | Return Type           | Description                                                     |
| -------------------------------- | --------------------- | --------------------------------------------------------------- |
| getTopbar(viewController:)       | RtkMeetingHeaderView? | Returns a custom header view for the meeting screen             |
| getMiddleView(viewController:)   | UIView?               | Returns a custom middle view between the header and control bar |
| getBottomTabbar(viewController:) | RtkMeetingControlBar? | Returns a custom control bar for the meeting screen             |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let meetingVC = MeetingViewController(
    meeting: rtkClient,
    completion: {
        self.dismiss(animated: true)
    }
)
meetingVC.modalPresentationStyle = .fullScreen
self.present(meetingVC, animated: true)
```

### With custom data source

```swift
import RealtimeKitUI

class CustomDataSource: MeetingViewControllerDataSource {
    func getTopbar(viewController: MeetingViewController) -> RtkMeetingHeaderView? {
        return RtkMeetingHeaderView(meeting: rtkClient)
    }

    func getMiddleView(viewController: MeetingViewController) -> UIView? {
        return nil
    }

    func getBottomTabbar(viewController: MeetingViewController) -> RtkMeetingControlBar? {
        return nil
    }
}

let meetingVC = MeetingViewController(
    meeting: rtkClient,
    completion: {
        self.dismiss(animated: true)
    }
)
meetingVC.dataSource = CustomDataSource()
self.present(meetingVC, animated: true)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/meeting-view-controller/#page","headline":"MeetingViewController · Cloudflare Realtime docs","description":"API reference for MeetingViewController component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/meeting-view-controller/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
