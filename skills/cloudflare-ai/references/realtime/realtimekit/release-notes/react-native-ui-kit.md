---
description: Release notes and changelog for the RealtimeKit React Native UI Kit SDK.
title: React Native UI Kit SDK
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# React Native UI Kit SDK

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/index.xml)

## 2026-07-08

**RealtimeKit React Native UI Kit 2.0.0**

**Compatibility:** Requires `@cloudflare/realtimekit-react-native` (React Native Core) v2.0.0 or later

This is a major breaking release. Review all breaking changes below before upgrading.

**Breaking changes**

* Upgraded to `@cloudflare/realtimekit-react-native` v2.0.0 and `@cloudflare/realtimekit` v2.0.0\. All [breaking changes from Web Core v2.0.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/#2026-06-18-realtimekit-web-core-200) and [React Native Core v2.0.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-core/) apply.
* Removed the KeepAlive Service from the UI Kit. Background Audio/Video support for Android is now managed by `@cloudflare/realtimekit-react-native` v2.0.0\. Update your integration to use `useRealtimeKitClient({ keepAliveService })` from the Core SDK.
* `RtkPluginMain` now uses `plugin.component` (an `HTMLElement`\-like object) instead of an iframe. This aligns with the plugin API redesign in Web Core 2.0.0.
* RtkMoreMenu is now scrollable rather than a fixed-height container.

**Features**

* `Breakout Rooms` support:
  * New `RtkBreakoutRoomsManager` component: full manager UI for creating, assigning participants, and starting or stopping breakout rooms.
  * New `RtkBreakoutRoomsToggle` component: control-bar button to open or close the breakout rooms manager.
* Connected meeting switching UI: `RtkMeeting` now handles `changingMeeting` events and shows a "Joining…" interstitial screen while switching between connected rooms.
* New exported types: `ConnectedMeeting`, `ConnectedMeetingParticipant`, `ConnectedMeetingState`, `PluginIframe`.
* New state fields in the `States` type:
  * `activeBreakoutRoomsManager` — tracks breakout manager open/close state and room-switch destination.
  * `activeBreakoutConfirmation` — breakout action confirmation dialog state.

**Fixes**

* Fixed an issue where the chat sent notification showed up when a message was edited rather than only when a new message was sent.
* Fixed an issue where video from web participants did not update on mobile devices while screen sharing or a plugin was active.
* Fixed an issue where the screenshare video appeared stretched or distorted in fullscreen when switching between landscape and portrait orientations.
* Fixed an issue where host controls disappeared when the host was off stage.
* Fixed an issue where the screenshare view shook when the device was held in landscape mode on iOS.
* Fixed an issue where the screen orientation did not return to normal after closing a fullscreen plugin on Android.
* Fixed an issue where the More menu could not be scrolled when the device was in landscape mode.
* Fixed an issue where opening the More menu in landscape mode incorrectly locked the screen orientation.
* Fixed inconsistent appearance across button and toggle controls.
* Fixed an issue where participant video tiles occasionally showed outdated or frozen video.
* Fixed an issue where the "Hide Result" option was not enabled by default when creating a poll.

## 2026-05-05

**RealtimeKit React Native UI Kit 1.0.0**

**Breaking changes**

* Removed support for `@cloudflare/realtimekit-react-native` version less than v1.0.0
* The Join Stage Confirmation dialog (i.e `RtkJoinStage`) now opens with Mic/Camera disabled by default.

**Features**

* Added unread counts for chat and polls in `RtkPollsToggle`, `RtkChatToggle`, and `RtkMoreToggle`

**Fixes**

* Fixed an issue where when a meeting host leaves the stage, all plugins and host controls disappear.

## 2026-03-30

**RealtimeKit React Native UI Kit 0.2.1**

**Fixes**

* Fixed an issue where self video is not visible on Setup Screen on initial load (i.e happens with @cloudflare/realtimekit-react-native version v0.3.2)

## 2025-11-20

**RealtimeKit React Native UI Kit 0.2.0**

**Features**

* Added edit, pin, and delete controls to Chat messages in RtkChat
* Added optional background support for audio/video in Android. Refer to the [documentation](https://docs.realtime.cloudflare.com/react-native/quickstart#additional-steps-for-background-audiovideo-support) for implementation details.

**Fixes**

* Fixed image button in RtkChat opening File Manager instead of Gallery
* Fixed app crash on RtkChat auto-scroll when new messages arrive
* Fixed chat message display issues

## 2025-09-14

**RealtimeKit React Native UI Kit 0.1.3**

**Fixes**

* Fixed duplicate stage toggle pop-ups
* Fixed audio switch to earpiece when leaving stage in Webinar

## 2025-07-08

**RealtimeKit React Native UI Kit 0.1.2**

**Fixes**

* Fixed android build failing for New Architecture
* Added delete option feature in Polls
* Fixed screen being blank when kicked from meeting
* Fixed the fullscreen button not clickable in screenshare
* Fixed audio selector not visible for webinar viewer
* Fixed video incorrectly labeled as being off

## 2025-06-05

**RealtimeKit React Native UI Kit 0.1.1**

**Fixes**

* Documentation improvements

## 2025-06-04

**RealtimeKit React Native UI Kit 0.1.0**

**Features**

* Initial release

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/#page","headline":"React Native UI Kit SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit React Native UI Kit SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
