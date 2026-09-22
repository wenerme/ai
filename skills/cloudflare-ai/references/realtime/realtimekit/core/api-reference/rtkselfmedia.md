---
title: RTKSelfMedia
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKSelfMedia

Last updated Jul 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkselfmedia/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The RTKSelfMedia class provides methods to manage the local participant's media.

- [RTKSelfMedia](#module_RTKSelfMedia)
  - [.audioTrack](#module_RTKSelfMedia+audioTrack)
  - [.rawAudioTrack](#module_RTKSelfMedia+rawAudioTrack)
  - [.mediaPermissions](#module_RTKSelfMedia+mediaPermissions)
  - [.videoTrack](#module_RTKSelfMedia+videoTrack)
  - [.rawVideoTrack](#module_RTKSelfMedia+rawVideoTrack)
  - [.screenShareTracks](#module_RTKSelfMedia+screenShareTracks)
  - [.audioEnabled](#module_RTKSelfMedia+audioEnabled)
  - [.videoEnabled](#module_RTKSelfMedia+videoEnabled)
  - [.screenShareEnabled](#module_RTKSelfMedia+screenShareEnabled)
  - [.addAudioMiddleware(audioMiddleware)](#module_RTKSelfMedia+addAudioMiddleware)
  - [.removeAudioMiddleware(audioMiddleware)](#module_RTKSelfMedia+removeAudioMiddleware)
  - [.removeAllAudioMiddlewares()](#module_RTKSelfMedia+removeAllAudioMiddlewares)
  - [.addVideoMiddleware(videoMiddleware)](#module_RTKSelfMedia+addVideoMiddleware)
  - [.setVideoMiddlewareGlobalConfig(config)](#module_RTKSelfMedia+setVideoMiddlewareGlobalConfig)
  - [.removeVideoMiddleware(videoMiddleware)](#module_RTKSelfMedia+removeVideoMiddleware)
  - [.removeAllVideoMiddlewares()](#module_RTKSelfMedia+removeAllVideoMiddlewares)
  - [.getCurrentDevices()](#module_RTKSelfMedia+getCurrentDevices)
  - [.getAudioDevices()](#module_RTKSelfMedia+getAudioDevices)
  - [.getVideoDevices()](#module_RTKSelfMedia+getVideoDevices)
  - [.getSpeakerDevices()](#module_RTKSelfMedia+getSpeakerDevices)
  - [.getDeviceById(deviceId, kind)](#module_RTKSelfMedia+getDeviceById)
  - [.setDevice(device)](#module_RTKSelfMedia+setDevice)

### meeting.self.audioTrack

Returns the `audioTrack`.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.rawAudioTrack

Returns the `rawAudioTrack` having no middleware executed on it.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.mediaPermissions

Returns the current audio and video permissions given by the user. 'ACCEPTED' if the user has given permission to use the media. 'CANCELED' if the user has canceled the screenshare. 'DENIED' if the user has denied permission to use the media. 'SYS\_DENIED' if the user's system has denied permission to use the media. 'UNAVAILABLE' if the media is not available (or being used by a different application).

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.videoTrack

Returns the `videoTrack`.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.rawVideoTrack

Returns the `videoTrack` having no middleware executed on it.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.screenShareTracks

Returns the screen share tracks.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.audioEnabled

Returns true if audio is enabled.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.videoEnabled

Returns true if video is enabled.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.screenShareEnabled

Returns true if screen share is enabled.

**Kind**: instance property of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.addAudioMiddleware(audioMiddleware)

Adds the audio middleware to be executed on the raw audio stream. If there are more than 1 audio middlewares, they will be executed in the sequence they were added in. If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type |
| --- | --- |
| audioMiddleware | `AudioMiddleware` |

### meeting.self.removeAudioMiddleware(audioMiddleware)

Removes the audio middleware, if it is there.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type |
| --- | --- |
| audioMiddleware | `AudioMiddleware` |

### meeting.self.removeAllAudioMiddlewares()

Removes all audio middlewares, if they are there.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.addVideoMiddleware(videoMiddleware)

Adds the video middleware to be executed on the raw video stream. If there are more than 1 video middlewares, they will be executed in the sequence they were added in. If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type |
| --- | --- |
| videoMiddleware | `VideoMiddleware` |

### meeting.self.setVideoMiddlewareGlobalConfig(config)

Sets global config to be used by video middlewares.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type | Description |
| --- | --- | --- |
| config | `VideoMiddlewareGlobalConfig` | config |
| config.disablePerFrameCanvasRendering | `boolean` | If set to true, Instead of calling Middleware for every frame, Middleware will only be called once that too with empty canvas, it is the responsibility of the middleware author to keep updating this canvas. `meeting.self.rawVideoTrack` can be used to retrieve video track for the periodic updates. |

### meeting.self.removeVideoMiddleware(videoMiddleware)

Removes the video middleware, if it is there.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type |
| --- | --- |
| videoMiddleware | `VideoMiddleware` |

### meeting.self.removeAllVideoMiddlewares()

Removes all video middlewares, if they are there.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.getCurrentDevices()

Returns the media devices currently being used.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.getAudioDevices()

Returns the local participant's audio devices.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.getVideoDevices()

Returns the local participant's video devices.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.getSpeakerDevices()

Returns the local participant's speaker devices.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

### meeting.self.getDeviceById(deviceId, kind)

Returns the local participant's device, indexed by ID and kind.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `string` | The ID of the device. |
| kind | `'audio'` \| `'video'` \| `'speaker'` | The kind of the device: audio, video, or speaker. |

### meeting.self.setDevice(device)

Change the current media device that is being used by the local participant.

**Kind**: instance method of [`RTKSelfMedia`](#module_RTKSelfMedia)

| Param | Type | Description |
| --- | --- | --- |
| device | `MediaDeviceInfo` | The device that is to be used. A device of the same `kind` will be replaced. the primary stream. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkselfmedia/#page","headline":"RTKSelfMedia","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkselfmedia/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
