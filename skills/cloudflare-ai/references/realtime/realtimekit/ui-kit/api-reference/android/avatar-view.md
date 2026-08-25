---
description: API reference for RtkAvatarView component (Android Library)
title: RtkAvatarView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkAvatarView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Avatar component which renders a participant's profile picture or their initials.

## Methods

| Method            | Parameters                         | Description                                        |
| ----------------- | ---------------------------------- | -------------------------------------------------- |
| activate          | participant: RtkMeetingParticipant | Bind the avatar to a participant                   |
| refresh           | \-                                 | Refresh the avatar based on the participant's name |
| applyDesignTokens | designTokens: RtkDesignTokens      | Apply custom design tokens for theming             |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.avatarview.RtkAvatarView
    android:id="@+id/rtk_avatar"
    android:layout_width="48dp"
    android:layout_height="48dp" />
```

### With Methods

```kotlin
val avatar = findViewById<RtkAvatarView>(R.id.rtk_avatar)
avatar.activate(participant)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/#page","headline":"RtkAvatarView · Cloudflare Realtime docs","description":"API reference for RtkAvatarView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
