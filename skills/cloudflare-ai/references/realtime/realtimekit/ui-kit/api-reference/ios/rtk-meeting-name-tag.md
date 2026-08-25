---
description: API reference for RtkMeetingNameTag component (iOS Library)
title: RtkMeetingNameTag
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMeetingNameTag

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/#page","headline":"RtkMeetingNameTag · Cloudflare Realtime docs","description":"API reference for RtkMeetingNameTag component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
