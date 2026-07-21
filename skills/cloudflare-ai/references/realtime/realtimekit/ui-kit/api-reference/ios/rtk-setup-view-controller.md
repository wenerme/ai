---
description: API reference for RtkSetupViewController component (iOS Library)
title: RtkSetupViewController
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkSetupViewController

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-setup-view-controller/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Pre-meeting setup screen view controller. Provides video preview, audio and video toggles, and name entry before joining a meeting.

## Initializer parameters

| Parameter   | Type                 | Required | Default | Description                                              |
| ----------- | -------------------- | -------- | ------- | -------------------------------------------------------- |
| meetingInfo | RtkMeetingInfo       | ✅        | \-      | Meeting configuration with auth token and media settings |
| meeting     | RealtimeKitClient    | ✅        | \-      | The RealtimeKit client instance                          |
| completion  | @escaping () -> Void | ✅        | \-      | Closure called when setup completes                      |

## Properties

| Property | Type                         | Required | Default | Description                                              |
| -------- | ---------------------------- | -------- | ------- | -------------------------------------------------------- |
| delegate | SetupViewControllerDelegate? | ❌        | nil     | Delegate notified when the participant joins the meeting |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let setupVC = RtkSetupViewController(
    meetingInfo: meetingInfo,
    meeting: rtkClient,
    completion: {
        print("Setup complete")
    }
)
self.present(setupVC, animated: true)
```

### With delegate

```swift
import RealtimeKitUI

class ViewController: UIViewController, SetupViewControllerDelegate {
    func showSetupScreen() {
        let setupVC = RtkSetupViewController(
            meetingInfo: meetingInfo,
            meeting: rtkClient,
            completion: {
                self.dismiss(animated: true)
            }
        )
        setupVC.delegate = self
        self.present(setupVC, animated: true)
    }
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-setup-view-controller/#page","headline":"RtkSetupViewController · Cloudflare Realtime docs","description":"API reference for RtkSetupViewController component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-setup-view-controller/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
