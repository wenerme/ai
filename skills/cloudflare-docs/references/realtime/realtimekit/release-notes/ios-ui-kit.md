---
title: iOS UI Kit SDK
description: Release notes and changelog for the RealtimeKit iOS UI Kit SDK.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/release-notes/ios-ui-kit.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# iOS UI Kit SDK

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-ui-kit/index.xml)

## 2026-04-20

**RealtimeKit iOS UI Kit 1.0.0**

**Breaking changes**

* Upgraded to [RealtimeKit Core v2.0.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2026-04-20) which removes support for Dyte APIs and SFU.
* Minimum deployment target is now iOS 15.6

## 2026-01-14

**RealtimeKit iOS UI Kit 0.5.7**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.6.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2026-01-14)

**Fixes**

* Fixed video not resuming when video view returns to foreground

## 2025-12-16

**RealtimeKit iOS UI Kit 0.5.6**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.7](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-12-16)

## 2025-12-12

**RealtimeKit iOS UI Kit 0.5.5**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.6](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-12-12)

**Fixes**

* Raised minimum deployment target to iOS 15.6

## 2025-12-04

**RealtimeKit iOS UI Kit 0.5.4**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.5](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-12-04)

**Fixes**

* Raised iOS deployment target to 15.6

## 2025-11-06

**RealtimeKit iOS UI Kit 0.5.3**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.4](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-11-06)

## 2025-10-23

**RealtimeKit iOS UI Kit 0.5.2**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.3](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-10-23)

**Fixes**

* Fixed a regression that caused self video to not render if meeting was joined with camera disabled

## 2025-10-23

**RealtimeKit iOS UI Kit 0.5.1**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.2](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-10-23)

## 2025-10-06

**RealtimeKit iOS UI Kit 0.5.0**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.1](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-10-06)

**Fixes**

* Audio device selector now dynamically updates the options list when devices are removed or added
* Fixed participant list host actions not working for self

## 2025-09-12

**RealtimeKit iOS UI Kit 0.4.6**

**Fixes**

* Fixed a rare crash during meeting joins in poor network scenarios

## 2025-09-12

**RealtimeKit iOS UI Kit 0.4.5**

**Fixes**

* Fixed pinned peers not being removed from the stage when kicked
* Media consumers are now created in parallel, which significantly improved the speed of when users start seeing other people's audio/video after joining a meeting
* Fixed "Ghost"/Invalid peers that would sometimes show up in long-running meetings
* Fixed an issue in webinar meetings where the SDK would fail to produce media after being removed from the stage once

## 2025-08-13

**RealtimeKit iOS UI Kit 0.4.4**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.3.2](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-08-13)

## 2025-08-13

**RealtimeKit iOS UI Kit 0.4.3**

**Features**

* Upgraded to [RealtimeKit Core v1.3.1](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-08-13)

## 2025-08-12

**RealtimeKit iOS UI Kit 0.4.2**

**Features**

* Upgraded to [RealtimeKit Core v1.3.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-08-12)

## 2025-08-08

**RealtimeKit iOS UI Kit 0.4.1**

**Fixes**

* Fixed multiple errors in the SPM package preventing it from being imported by users

## 2025-08-05

**RealtimeKit iOS UI Kit 0.4.0**

**Features**

* Upgraded to [RealtimeKit Core v1.2.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-08-05)

## 2025-07-02

**RealtimeKit iOS UI Kit 0.3.0**

**Features**

* Upgraded to [RealtimeKit Core v1.1.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/ios-core/#2025-07-02)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/ios-ui-kit/","name":"iOS UI Kit SDK"}}]}
```
