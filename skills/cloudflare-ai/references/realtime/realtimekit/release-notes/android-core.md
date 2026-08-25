---
description: Release notes and changelog for the RealtimeKit Android Core SDK.
title: Android Core SDK
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Android Core SDK

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/index.xml)

## 2026-07-17

**RealtimeKit Android Core 3.1.0**

**Enhancements**

* Room joins are up to 25% faster under normal network conditions
* Improved the initial quality of video received from mobile participants

**Fixes**

* Fixed a crash when switching between breakout rooms
* When unmuting audio or video, the SDK now requests permission when the corresponding `RtkMeetingInfo.enableAudio` or `RtkMeetingInfo.enableVideo` field is `false`. The UI Kit component is no longer silently disabled.

## 2026-06-24

**RealtimeKit Android Core 3.0.0**

**Breaking changes**

* Plugins are no longer provided by the server. They must now be declared upfront on the client side by passing a `plugins` list to `RtkMeetingInfo`. Any plugin not declared at initialization will not be available in the meeting.
```kotlin
val meetingInfo = RtkMeetingInfo(
  authToken = authToken,
  plugins = listOf(
    RtkClientPluginConfig(
      id = "whiteboard", // Must match the plugin ID used on Web for sync to work
      name = "Whiteboard",
      icon = "https://example.com/logo.png",
      url = "https://example.com",
      permissions = RtkClientPluginPermissions(canActivate = true, canDeactivate = true),
    )
  ),
)
```
* Several internal properties have been removed from `RtkPlugin`: `baseURL`, `config`, `description`, `isPrivate`, and `staggered`. Use the new `icon` and `permissions` properties instead.
* The two-argument `subscribe(key, (key, value) → Unit)` and `unsubscribe(key, (key, value) → Unit)` overloads on `RtkStore` have been removed. Use the single-argument callback variants introduced in 2.1.0.

**Features**

* **AI Transcription** — A new `RtkAi` class (exposed as `client.ai`) provides access to real-time transcripts. Implement `RtkAiEventListener` and register it with `addAiEventListener()` to receive `onTranscript(data: RtkTranscriptionData)` callbacks. A `transcriptionEnabled` permission is available on `MiscellaneousPermissions`.
* **Connected Meetings (Breakout Rooms)** — A new `RtkConnectedMeetings` class (exposed as `client.connectedMeetings`) enables breakout room workflows. Register an `RtkConnectedMeetingsEventListener` to handle room transitions and state updates. See the [Breakout Rooms](https://developers.cloudflare.com/realtime/realtimekit/core/breakout-rooms/) documentation for a full guide.
* **Chat: Edit and Delete** — Messages can now be edited and deleted. New methods on `RtkChat`: `editTextMessage()`, `editImageMessage()`, `editFileMessage()`, and `deleteMessage()`. `RtkChatEventListener` gains `onMessageEdited()` and `onMessageDeleted()` callbacks. `ChatMessage` now includes an `isEdited` flag.
* **Chat: Fetch and Pagination** — New methods on `RtkChat` — `fetchPublicMessages()`, `fetchPrivateMessages()`, `fetchPinnedMessages()`, and `getMessages()` — allow fetching historical messages with cursor-based pagination via `FetchMessagesResult(messages, hasMore)`.
* **Client-Declared Plugins** — Plugins are now configured entirely on the client via `RtkClientPluginConfig` and `RtkClientPluginPermissions`. `RtkPlugin` exposes the new `icon` and `permissions` properties accordingly.
* **Targeted Broadcast Messages** — `RtkParticipants.broadcastMessage()` now accepts an optional `targetParticipantIds: List<String>` parameter to send a message to a specific subset of participants.
* **Nullable Store Values** — `RtkStore.set()` now accepts a nullable `value: Any?`, allowing keys to be cleared by setting them to `null`.
* **Logging Control** — `RealtimeKitClient` gains `enableLogging(enabled: Boolean)` and `enableLogging(enabled: Boolean, minSeverity: LogSeverity)` to control SDK log output at runtime.
* **Result<S, F> Utility Type** — A new `sealed class Result<S, F>` with `Success` and `Failure` variants is used consistently across new async APIs.

**Fixes**

* Improved reconnection handling to ensure media recovers gracefully in more scenarios
* Improved simulcast tiers to broadcast at a wider range of qualities on higher tiers
* Fixed some races in media handling causing mute/unmute operations to rarely result in a crash
* Optimized API calls in the room join flow to speed up first join durations
* Fixed file and image uploads in chat failing under some conditions

## 2026-05-08

**RealtimeKit Android Core 2.1.0**

**Breaking changes**

* `RtkParticipants.activeSpeaker` → `RtkParticipants.lastActiveSpeaker`. The old `activeSpeaker` property is deprecated and will be removed in a future release.
* `RtkSelfParticipant.enableScreenShare()` → `enableScreenShare(onResult:)`. The old no-callback version is deprecated and will be removed in a future release.
* `RtkSelfParticipant.disableScreenShare()` → `disableScreenShare(onResult:)`. The old no-callback version is deprecated and will be removed in a future release.
* `RtkStore.subscribe(key, (key, value) → Unit)` → `subscribe(key, (value) → Unit)`. The old two-argument callback signature is deprecated but remains functional via a backward-compatible shim.
* `RtkStore.unsubscribe(key, (key, value) → Unit)` → `unsubscribe(key, (value) → Unit)`. The old two-argument callback signature is deprecated but remains functional via a backward-compatible shim.

**Features**

* Added `RtkChat.pin()` and `RtkChat.unpin()` methods to pin and unpin chat messages
* Added `RtkChat.getMessagesByUser()` to filter messages by sender and `RtkChat.getMessagesByType()` to filter messages by type
* Added `SelfPermissions.canPinMessage()` to check whether the local participant has permission to pin messages

**Fixes**

* Fixed a memory leak in video rendering caused by `SurfaceViewRenderer` instances not being released
* Fixed recording state getting stuck as "recording" when stopping a recording that was started by another participant
* Fixed "ghost" participants appearing on the grid when a user was on the setup screen but had not yet joined the socket room
* Fixed webinar host being invisible to other participants when joining late
* Fixed recording bots and other hidden participants incorrectly appearing on the participant grid
* Fixed waitlisted participants appearing in the participant list before being admitted to the meeting

## 2026-04-20

**RealtimeKit Android Core 2.0.0**

**Breaking changes**

* Removed Hive SFU support. Only the Cloudflare SFU is supported going forward.
* The default base URI is now `realtime.cloudflare.com`. Calling `init()` with a `dyte.io` base domain now fails immediately with `MeetingError.InvalidBaseUrl`

**Fixes**

* Added compatibility with new backend plugins API field naming
* Fixed a crash that could occur when accessing the socket controller before `init()` was called
* Fixed auth token not being sent to the callstats collector endpoint
* Removed custom ping-pong keepalive logic that was only required for the previous infrastructure

## 2026-03-06

**RealtimeKit Android Core 1.6.2**

**Fixes**

* Avoid crash when using Ktor versions 3.4.0 and above

## 2026-02-06

**RealtimeKit Android Core 1.6.1**

**Fixes**

* Fixed media issues when connection took longer to establish

## 2026-01-14

**RealtimeKit Android Core 1.6.0**

**Fixes**

* Improved grid transitions by activating consumers in batches for better performance
* Moved consumer toggle requests off main thread to prevent UI blocking
* Improved video rendering stability with better lifecycle management
* Prevented race conditions by canceling reconnection attempts during initialization

## 2025-12-16

**RealtimeKit Android Core 1.5.7**

**Fixes**

* Fixed rare crash when toggling audio mute
* Off-stage webinar hosts no longer show up on the grid

## 2025-12-12

**RealtimeKit Android Core 1.5.6**

**Fixes**

* Fixed deadlocks in webinar join and screenshare enable flows
* Fixed an issue with camera not working when moving to settings screen and back
* Fixed a rare crash in voice activity detection

## 2025-12-04

**RealtimeKit Android Core 1.5.5**

**Fixes**

* Fixed participant tiles not being removed properly when peers left the meeting

## 2025-11-06

**RealtimeKit Android Core 1.5.4**

**Fixes**

* Internal fixes to reduce telemetry verbosity

## 2025-10-23

**RealtimeKit Android Core 1.5.3**

**Fixes**

* Fixed a regression that caused self video to not render if meeting was joined with camera disabled

## 2025-10-23

**RealtimeKit Android Core 1.5.2**

**Fixes**

* Fixed unreliable grid behavior with improved refresh logic

## 2025-10-06

**RealtimeKit Android Core 1.5.1**

**Fixes**

* Internal fixes to resolve issues for Flutter platform

## 2025-09-23

**RealtimeKit Android Core 1.5.0**

**Features**

* Added `RtkSelfEventListener#onAudioDeviceChanged` method that is invoked when the current audio route is updated

## 2025-09-18

**RealtimeKit Android Core 1.4.1**

**Fixes**

* Speakerphone is now preferred over earpiece as the default audio output

## 2025-09-18

**RealtimeKit Android Core 1.4.0**

**Breaking changes**

* Updated `RtkSelfEventListener#onAudioDevicesUpdated` method to provide the list of available devices

**Fixes**

* Fixed not being able to route audio to Bluetooth devices

## 2025-09-12

**RealtimeKit Android Core 1.3.4**

**Fixes**

* Fixed a rare crash during meeting joins in poor network scenarios

## 2025-09-12

**RealtimeKit Android Core 1.3.3**

**Fixes**

* Fixed pinned peers not being removed from the stage when kicked
* Media consumers are now created in parallel, which significantly improved the speed of when users start seeing other people's audio/video after joining a meeting
* Native libraries are now 16KB aligned to comply with [Google Play requirements](https://android-developers.googleblog.com/2025/05/prepare-play-apps-for-devices-with-16kb-page-size.html)
* Fixed "Ghost"/Invalid peers that would sometimes show up in long-running meetings
* Fixed an issue in webinar meetings where the SDK would fail to produce media after being removed from the stage once

## 2025-08-13

**RealtimeKit Android Core 1.3.2**

**Enhancements**

* Fixed microphone not working when joining the stage in a webinar

## 2025-08-13

**RealtimeKit Android Core 1.3.1**

**Enhancements**

* Fixed a potential crash in poor network scenarios

## 2025-08-12

**RealtimeKit Android Core 1.3.0**

**Features**

* Added `RtkSelfParticipant#canJoinStage` and `RtkSelfParticipant#canRequestToJoinStage` APIs

**Fixes**

* Fixed viewer unable to join stage in a Livestream
* Fixed user unable to see existing pinned participant after joining meeting

## 2025-08-05

**RealtimeKit Android Core 1.2.0**

**Breaking changes**

* Renamed `RtkLivestreamData.roomName` to `RtkLivestreamData.meetingId` to match existing API convention
* Removed obsolete `WaitingRoomPermissions` abstraction — all the relevant functionality here is available through `HostPermissions`
* VideoDevice gained a `cameraType: CameraType` parameter
* `VideoDeviceType#displayName` is now deprecated, and it's recommended to call `VideoDevice#toString` instead to get user-facing names for individual `VideoDevice` instances
* Existing APIs related to middlewares were removed and replaced with equivalent counterparts from WebRTC: `RtkSelfParticipant#addVideoMiddleware`, `RtkSelfParticipant#getVideoMiddlewares` and `RtkSelfParticipant#removeVideoMiddleware` were replaced with `RealtimeKitMeetingBuilder#setVideoProcessor`
* `RtkVideoFrame` was removed in favor of WebRTC's own `VideoFrame` class, available as `realtimekit.org.webrtc.VideoFrame`

**Features**

* Reimplemented middlewares using WebRTC-native primitives to resolve intermittent crashes and other issues, check out the new [Video Processing](https://docs.realtime.cloudflare.com/android-core/video-processing/introduction) docs section to learn more
* `VideoDevice` now properly labels multiple cameras based on their camera characteristics such as wide-angle and telephoto

**Fixes**

* Fixed screen share failing to stop
* Silenced log spam from our callstats library

## 2025-07-02

**RealtimeKit Android Core 1.1.0**

**Enhancements**

* Meeting initialization (`meeting.init()`) is now \~60% faster
* Switched to an updated and **RTK** namespaced WebRTC
* Improved Active speaker detection with the updated WebRTC

## 2025-06-20

**RealtimeKit Android Core 1.0.1**

**Breaking changes**

* Renamed RtkMessageType to ChatMessageType

**Fixes**

* Silenced logspam from audio activity reporter
* Improved speed of joining calls
* Auth tokens now automatically trim invalid spaces and newlines

## 2025-05-26

**RealtimeKit Android Core 1.0.0**

**Breaking changes**

* Removed deprecated `channelId` field from `TextMessage`
* Moved listener types to their respective feature package
* Moved public listeners to their respective feature packages
* Renamed plugin add-remove listener methods for RtkPluginsEventListener
* Moved chat extensions to the `chat` package
* Moved `RtkParticipant` to the root package
* Moved `RtkMeetingParticipant` to the root package
* Moved `RtkPluginFile` to the plugins package
* Moved middlewares to their own package
* Moved `VideoScaleType` to top level `media` package
* Dropped `Rtk` prefix from audio and video device types
* Moved device types to the top level `media` package
* Dropped `Rtk` prefix from polls types
* Replaced all LiveStream references with Livestream
* Moved `RtkMeetingParticipant` to root package
* Stripped `Rtk` prefix from `RtkRecordingState`
* Stripped `Rtk` prefix from chat message types
* Removed deprecated RtkLivestream#roomName field
* Moved `RtkMediaPermission` to media package and renamed to `MediaPermission`
* Redistributed `feat` package members
* Moved `StageStatus` class to stage package
* Renamed all event listeners to be of the singular `*EventListener` form

## 2025-05-16

**RealtimeKit Android Core 0.2.1**

**Fixes**

* Internal fixes to release pipeline

## 2025-05-16

**RealtimeKit Android Core 0.2.0**

**Fixes**

* Added audio activity detection for active speaker signaling

## 2025-05-14

**RealtimeKit Android Core 0.1.0**

**New APIs**

* Initial alpha release

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#page","headline":"Android Core SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit Android Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
