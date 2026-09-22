---
title: RTKSelf
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKSelf

Last updated Jul 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkself/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The RTKSelf module represents the current user, and allows to modify the state of the user in the meeting. The audio and video streams of the user can be retrieved from this module.

- [RTKSelf](#module_RTKSelf)
  - [.peerId](#module_RTKSelf+peerId)
  - [.roomState](#module_RTKSelf+roomState)
  - [.permissions](#module_RTKSelf+permissions)
  - [.config](#module_RTKSelf+config)
  - [.roomJoined](#module_RTKSelf+roomJoined)
  - [.isPinned](#module_RTKSelf+isPinned)
  - [.cleanupEvents()](#module_RTKSelf+cleanupEvents)
  - [.setName(name)](#module_RTKSelf+setName)
  - [.setupTracks(options)](#module_RTKSelf+setupTracks)
  - [.enableAudio()](#module_RTKSelf+enableAudio)
  - [.enableVideo()](#module_RTKSelf+enableVideo)
  - [.updateVideoConstraints()](#module_RTKSelf+updateVideoConstraints)
  - [.enableScreenShare()](#module_RTKSelf+enableScreenShare)
  - [.updateScreenshareConstraints()](#module_RTKSelf+updateScreenshareConstraints)
  - [.disableAudio()](#module_RTKSelf+disableAudio)
  - [.disableVideo()](#module_RTKSelf+disableVideo)
  - [.disableScreenShare()](#module_RTKSelf+disableScreenShare)
  - [.getAllDevices()](#module_RTKSelf+getAllDevices)
  - [.pin()](#module_RTKSelf+pin)
  - [.unpin()](#module_RTKSelf+unpin)
  - [.hide()](#module_RTKSelf+hide)
  - [.show()](#module_RTKSelf+show)
  - [.setDevice(device)](#module_RTKSelf+setDevice)

### meeting.self.peerId

NOTE(ishita1805): Discussed with Ravindra, added a duplicate for consistency when using identifiers in Locker. We might want to look at deprecating the `id` sometime later.

**Kind**: instance property of [`RTKSelf`](#module_RTKSelf)

### meeting.self.roomState

Returns the current state of room init - Initial State joined - User is in the meeting waitlisted - User is in the waitlist state rejected - User's was in the waiting room, but the entry was rejected kicked - A privileged user removed the user from the meeting left - User left the meeting ended - The meeting was ended

**Kind**: instance property of [`RTKSelf`](#module_RTKSelf)

### meeting.self.permissions

Returns the current permission given to the user for the meeting.

**Kind**: instance property of [`RTKSelf`](#module_RTKSelf)

### meeting.self.config

Returns configuration for the meeting.

**Kind**: instance property of [`RTKSelf`](#module_RTKSelf)

### meeting.self.roomJoined

Returns true if the local participant has joined the meeting.

**Kind**: instance property of [`RTKSelf`](#module_RTKSelf)

### meeting.self.isPinned

Returns true if the current user is pinned.

**Kind**: instance property of [`RTKSelf`](#module_RTKSelf)

### meeting.self.cleanupEvents()

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.setName(name)

The name of the user can be set by calling this method. This will get reflected to other participants ONLY if this method is called before the room is joined.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

| Param | Type | Description |
| --- | --- | --- |
| name | `string` | Name of the user. |

### meeting.self.setupTracks(options)

Sets up the local media tracks.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

| Param | Type | Description |
| --- | --- | --- |
| options | `Object` | The audio and video options. |
| \[options.video] | `boolean` | If true, the video stream is fetched. |
| \[options.audio] | `boolean` | If true, the audio stream is fetched. |
| \[options.forceReset] | `boolean` | If true, force resets tracks before re-acquiring. |

### meeting.self.enableAudio()

This method is used to unmute the local participant's audio.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.enableVideo()

This method is used to start streaming the local participant's video to the meeting.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.updateVideoConstraints()

This method is used to apply constraints to the current video stream.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.enableScreenShare()

This method is used to start sharing the local participant's screen to the meeting.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.updateScreenshareConstraints()

This method is used to apply constraints to the current screenshare stream.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.disableAudio()

This method is used to mute the local participant's audio.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.disableVideo()

This participant is used to disable the local participant's video.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.disableScreenShare()

This method is used to stop sharing the local participant's screen.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.getAllDevices()

Returns all media devices accessible by the local participant.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.pin()

Returns `self.id` if user has permission to pin participants.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.unpin()

Returns `self.id` if user has permission to unpin participants.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.hide()

Hide's user's tile in the UI (locally)

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.show()

Show's user's tile in the UI if hidden (locally)

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

### meeting.self.setDevice(device)

Change the current media device that is being used by the local participant.

**Kind**: instance method of [`RTKSelf`](#module_RTKSelf)

| Param | Type | Description |
| --- | --- | --- |
| device | `MediaDeviceInfo` | The device that is to be used. A device of the same `kind` will be replaced. the primary stream. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkself/#page","headline":"RTKSelf","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkself/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
