---
description: API reference for RtkAvatarView component (iOS Library)
title: RtkAvatarView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkAvatarView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-avatar-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A circular avatar view that displays a participant's profile image or name initials as a fallback.

## Initializer parameters

| Parameter   | Type                  | Required | Default | Description                             |
| ----------- | --------------------- | -------- | ------- | --------------------------------------- |
| participant | RtkMeetingParticipant | ✅        | \-      | The participant whose avatar to display |

## Methods

| Method                | Return Type | Description                                           |
| --------------------- | ----------- | ----------------------------------------------------- |
| set(participant:)     | Void        | Updates the avatar to display a different participant |
| refresh()             | Void        | Refreshes the avatar image or initials                |
| setInitialName(font:) | Void        | Sets the font used for rendering name initials        |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let avatarView = RtkAvatarView(participant: participant)
view.addSubview(avatarView)
```

### Update participant

```swift
import RealtimeKitUI

let avatarView = RtkAvatarView(participant: participant)
view.addSubview(avatarView)

// Update to a different participant
avatarView.set(participant: newParticipant)
avatarView.refresh()
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-avatar-view/#page","headline":"RtkAvatarView · Cloudflare Realtime docs","description":"API reference for RtkAvatarView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-avatar-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
