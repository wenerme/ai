---
description: API reference for RtkParticipantCountView component (iOS Library)
title: RtkParticipantCountView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkParticipantCountView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-participant-count-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A label that displays the current participant count. Automatically updates when participants join or leave the meeting.

## Initializer parameters

| Parameter  | Type              | Required | Default                                    | Description                                            |
| ---------- | ----------------- | -------- | ------------------------------------------ | ------------------------------------------------------ |
| meeting    | RealtimeKitClient | ✅        | \-                                         | The RealtimeKit client instance for the active meeting |
| appearance | RtkTextAppearance | ❌        | AppTheme.shared.participantCountAppearance | Text appearance configuration for font and color       |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let countView = RtkParticipantCountView(meeting: rtkClient)
view.addSubview(countView)
```

### With custom appearance

```swift
import RealtimeKitUI

let appearance = RtkTextAppearance(
    font: UIFont.systemFont(ofSize: 14, weight: .medium),
    textColor: .lightGray
)
let countView = RtkParticipantCountView(
    meeting: rtkClient,
    appearance: appearance
)
view.addSubview(countView)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-participant-count-view/#page","headline":"RtkParticipantCountView · Cloudflare Realtime docs","description":"API reference for RtkParticipantCountView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-participant-count-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
