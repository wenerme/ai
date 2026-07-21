---
description: API reference for RtkMeetingNameTag component (iOS Library)
title: RtkMeetingNameTag
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkMeetingNameTag

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A name tag view that displays the participant name and a microphone status icon. Automatically updates when the participant's audio state changes.

## Initializer parameters

| Parameter   | Type                  | Required | Default | Description                                          |
| ----------- | --------------------- | -------- | ------- | ---------------------------------------------------- |
| meeting     | RealtimeKitClient     | ✅        | \-      | The RealtimeKit client instance                      |
| participant | RtkMeetingParticipant | ✅        | \-      | The participant whose name and mic status to display |
| appearance  | RtkNameTagAppearance  | ❌        | \-      | Appearance configuration for the name tag            |

## Methods

| Method            | Return Type | Description                                             |
| ----------------- | ----------- | ------------------------------------------------------- |
| set(participant:) | Void        | Updates the name tag to display a different participant |
| refresh()         | Void        | Refreshes the name and microphone status display        |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let nameTag = RtkMeetingNameTag(
    meeting: rtkClient,
    participant: participant
)
view.addSubview(nameTag)
```

### Update participant

```swift
import RealtimeKitUI

let nameTag = RtkMeetingNameTag(
    meeting: rtkClient,
    participant: participant
)
view.addSubview(nameTag)

// Switch to a different participant
nameTag.set(participant: newParticipant)
nameTag.refresh()
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/#page","headline":"RtkMeetingNameTag · Cloudflare Realtime docs","description":"API reference for RtkMeetingNameTag component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
