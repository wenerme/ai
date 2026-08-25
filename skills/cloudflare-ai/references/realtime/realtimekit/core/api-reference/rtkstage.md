---
title: RTKStage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKStage

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The RTKStage module represents a class to mange the RTKStage of the meeting RTKStage refers to a virtual area, where participants stream are visible to other participants. When a participant is off stage, they are not producing media but only consuming media from participants who are on RTKStage

* [RTKStage](#module%5FRTKStage)
  * [.peerId](#module%5FRTKStage+peerId)
  * [.getAccessRequests()](#module%5FRTKStage+getAccessRequests)
  * [.requestAccess()](#module%5FRTKStage+requestAccess)
  * [.cancelRequestAccess()](#module%5FRTKStage+cancelRequestAccess)
  * [.grantAccess()](#module%5FRTKStage+grantAccess)
  * [.denyAccess()](#module%5FRTKStage+denyAccess)
  * [.join()](#module%5FRTKStage+join)
  * [.leave()](#module%5FRTKStage+leave)
  * [.kick(userIds)](#module%5FRTKStage+kick)

### meeting.stage.peerId

Returns the peerId of the current user

**Kind**: instance property of [RTKStage](#module%5FRTKStage)

### meeting.stage.getAccessRequests()

Method to fetch all RTKStage access requests from viewers

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.requestAccess()

Method to send a request to privileged users to join the stage

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.cancelRequestAccess()

Method to cancel a previous RTKStage join request

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.grantAccess()

Method to grant access to RTKStage. This can be in response to a RTKStage Join request but it can be called on other users as well

`permissions.acceptStageRequests` privilege required

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.denyAccess()

Method to deny access to RTKStage. This should be called in response to a RTKStage Join request

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.join()

Method to join the stage Users either need to have the permission in the preset or must be accepted by a privileged user to call this method

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.leave()

Method to leave the stage Users must either be on the stage already or be accepted to join the stage to call this method

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

### meeting.stage.kick(userIds)

Method to kick a user off the stage

`permissions.acceptStageRequests` privilege required

**Kind**: instance method of [RTKStage](#module%5FRTKStage)

| Param   | Type           |
| ------- | -------------- |
| userIds | Array.<string> |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstage/#page","headline":"RTKStage · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
