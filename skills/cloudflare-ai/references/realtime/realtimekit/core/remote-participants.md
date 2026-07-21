---
description: Access participant data, display videos, and handle events for remote participants in RealtimeKit.
title: Remote Participants
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  Remote Participants

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This guide explains how to access participant data, display videos, handle events, and manage participant permissions in your RealtimeKit meetings.

Prerequisites

This page assumes you've already initialized the SDK and understand the meeting object structure. Refer to [Initialize SDK](https://developers.cloudflare.com/realtime/realtimekit/core/) and [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) if needed.

WebMobile

ReactWeb ComponentsAngular

The participant object contains all information related to a particular participants, including information about the grid and each participants media streams, name, and state variables. It is accessible via `meeting.participants`.

### Properties

#### Metadata properties

* `id` \- The `participantId` of the participant (aka `peerId`)
* `userId` \- The `userId` of the participant
* `name` \- The participant's name
* `picture` \- The participant's picture (if any)
* `customParticipantId` \- An arbitrary ID that can be set to identify the participant
* `isPinned` \- Set to `true` if the participant is pinned
* `presetName` \- Name of the preset associated with the participant

#### Metadata properties

* `id` \- Session-specific identifier generated when the participant joins meeting session (also known as `peerId`)
* `userId` \- Permanent identifier of the participant generated when adding the participant to a meeting
* `name` \- Display name of the participant
* `picture` \- String URL to the participant's display picture (if any)
* `customParticipantId` \- Custom identifier that can be set while adding participant to a meeting by customer
* `isHost` \- Boolean value whether this participant has host privileges
* `isPinned` \- Whether this participant is currently pinned in the meeting
* `presetName` \- Name of the preset applied to this participant while adding to meeting
* `stageStatus` \- Indicates the participant's current stage status (applicable only in stage-enabled meetings)

#### Metadata properties

* `id` \- Session-specific identifier generated when the participant joins meeting session (also known as `peerId`)
* `userId` \- Permanent identifier of the participant generated when adding the participant to a meeting
* `name` \- Display name of the participant
* `picture` \- String URL to the participant's display picture (if any)
* `customParticipantId` \- Custom identifier that can be set while adding participant to a meeting by customer
* `isHost` \- Boolean value whether this participant has host privileges
* `isPinned` \- Whether this participant is currently pinned in the meeting
* `presetName` \- Name of the preset applied to this participant while adding to meeting
* `stageStatus` \- Indicates the participant's current stage status (applicable only in stage-enabled meetings)

#### Metadata properties

* `id` \- Session-specific identifier generated when the participant joins meeting session (also known as `peerId`)
* `userId` \- Permanent identifier of the participant generated when adding the participant to a meeting
* `name` \- Display name of the participant
* `picture` \- String URL to the participant's display picture (if any)
* `isHost` \- Boolean value whether this participant has host privileges
* `customParticipantId` \- Custom identifier that can be set while adding participant to a meeting by customer
* `stageStatus` \- Indicates the participant's current stage status (applicable only in stage-enabled meetings)
* `isPinned` \- Whether this participant is currently pinned in the meeting
* `presetName` \- Name of the preset applied to this participant while adding to meeting

#### Media properties

* `videoEnabled` \- Set to `true` if the participant's camera is on
* `audioEnabled` \- Set to `true` if the participant is unmuted
* `screenShareEnabled` \- Set to `true` if the participant is sharing their screen
* `videoTrack` \- The video track of the participant
* `audioTrack` \- The audio track of the participant
* `screenShareTracks` \- The video and audio tracks of the participant's screen share

#### Media properties

* `videoEnabled` \- Whether the participant's camera is currently enabled
* `audioEnabled` \- Whether the participant's microphone is currently unmuted
* `screenshareEnabled` \- Whether the participant is currently sharing their screen

### Access participant properties

```js
// Number of participants joined in the meeting
console.log(meeting.participants.count);

// Number of pages available in paginated mode
console.log(meeting.participants.pageCount);

// Maximum number of participants in active state
console.log(meeting.participants.maxActiveParticipantsCount);

// ParticipantId of the last participant who spoke
console.log(meeting.participants.lastActiveSpeaker);
```

Use the `useRealtimeKitSelector` hook to access properties:

```jsx
// Number of participants joined in the meeting
const participantCount = useRealtimeKitSelector((m) => m.participants.count);

// Number of pages available in paginated mode
const pageCount = useRealtimeKitSelector((m) => m.participants.pageCount);

// Maximum number of participants in active state
const maxActiveCount = useRealtimeKitSelector(
	(m) => m.participants.maxActiveParticipantsCount,
);

// ParticipantId of the last participant who spoke
const lastActiveSpeaker = useRealtimeKitSelector(
	(m) => m.participants.lastActiveSpeaker,
);
```

```kotlin
// Number of participants joined in the meeting
val participantCount = meeting.participants.joined.size

// Access pagination properties
val maxNumberOnScreen = meeting.participants.maxNumberOnScreen
val currentPageNumber = meeting.participants.currentPageNumber
val pageCount = meeting.participants.pageCount
val canGoNextPage = meeting.participants.canGoNextPage
val canGoPreviousPage = meeting.participants.canGoPreviousPage
```

```swift
// Number of participants joined in the meeting
let participantCount = meeting.participants.joined.count

// Access pagination properties
let maxNumberOnScreen = meeting.participants.maxNumberOnScreen
let currentPageNumber = meeting.participants.currentPageNumber
let pageCount = meeting.participants.pageCount
let canGoNextPage = meeting.participants.canGoNextPage
let canGoPreviousPage = meeting.participants.canGoPreviousPage
```

```dart
// Number of participants joined in the meeting
final participantCount = meeting.participants.joined.length;

// Access pagination properties
final currentPageNumber = meeting.participants.currentPageNumber;
final pageCount = meeting.participants.pageCount;
final canGoNextPage = meeting.participants.isNextPagePossible;
final canGoPreviousPage = meeting.participants.isPreviousPagePossible;
```

Use the `useRealtimeKitSelector` hook to access properties:

```tsx
// Number of participants joined in the meeting
const participantCount = useRealtimeKitSelector((m) => m.participants.count);

// Number of pages available in paginated mode
const pageCount = useRealtimeKitSelector((m) => m.participants.pageCount);

// Maximum number of participants in active state
const maxActiveCount = useRealtimeKitSelector(
	(m) => m.participants.maxActiveParticipantsCount,
);

// ParticipantId of the last participant who spoke
const lastActiveSpeaker = useRealtimeKitSelector(
	(m) => m.participants.lastActiveSpeaker,
);
```

### Access participant object

You can fetch a participant from the [participant maps](#participant-maps).

```js
const participant = meeting.participants.joined.get(participantId);

// Access participant properties
console.log(participant.name);
console.log(participant.videoEnabled);
console.log(participant.audioEnabled);
```

```jsx
// Get a specific participant
const participant = useRealtimeKitSelector((m) =>
	m.participants.joined.get(participantId),
);

// Access participant properties
const participantName = participant?.name;
const isVideoEnabled = participant?.videoEnabled;
const isAudioEnabled = participant?.audioEnabled;
```

```kotlin
// Find a participant by peer ID
val participant = meeting.participants.joined.firstOrNull { it.id == participantId }

// Access participant properties
participant?.let {
	println("Participant: ${it.name}")
	println("Video: ${it.videoEnabled}")
	println("Audio: ${it.audioEnabled}")
}
```

```swift
// Find a participant by peer ID
if let participant = meeting.participants.joined.first(where: { $0.id == participantId }) {
	// Access participant properties
	print("Participant: \(participant.name)")
	print("Video: \(participant.videoEnabled)")
	print("Audio: \(participant.audioEnabled)")
}
```

```dart
// Find a participant by peer ID
final participant = meeting.participants.joined
	.where((p) => p.id == "<peerId>")
	.firstOrNull;

// Access participant properties
if (participant != null) {
	print('Participant: ${participant.name} (ID: ${participant.id})');
	print('Audio: ${participant.audioEnabled ? "On" : "Off"}');
	print('Video: ${participant.videoEnabled ? "On" : "Off"}');
}
```

```tsx
// Get a specific participant
const participant = useRealtimeKitSelector((m) =>
	m.participants.joined.get(participantId),
);

// Access participant properties
const participantName = participant?.name;
const isVideoEnabled = participant?.videoEnabled;
const isAudioEnabled = participant?.audioEnabled;
```

## Participant Maps

All participants are stored under `meeting.participants`. These do not include the local user.

The `meeting.participants` object contains the following maps:

* **`joined`** \- All participants currently in the meeting (excluding the local user)
* **`waitlisted`** \- All participants waiting to join the meeting
* **`active`** \- All participants whose media is subscribed to (participants that should be displayed on screen)
* **`pinned`** \- All pinned participants in the meeting

If you are building a video/audio grid, use the `active` map. To display a list of all participants, use the `joined` map.

Each participant in these maps is of type `RTKParticipant`.

All participants are stored under `meeting.participants`. These do not include the local user.

The `meeting.participants` object contains the following lists:

* **`joined`** \- All participants currently in the meeting (excluding the local user)
* **`waitlisted`** \- All participants waiting to join the meeting
* **`active`** \- All participants whose media is subscribed to (participants that should be displayed on screen)
* **`pinned`** \- All pinned participants in the meeting
* **`screenShares`** \- All participants who are sharing their screen

If you are building a video/audio grid, use the `active` list. To display a list of all participants, use the `joined` list.

All participants are stored under `meeting.participants`. These do not include the local user.

The `meeting.participants` object contains the following lists:

* **`joined`** \- All participants currently in the meeting (excluding the local user)
* **`waitlisted`** \- All participants waiting to join the meeting
* **`active`** \- All participants whose media is subscribed to (participants that should be displayed on screen)
* **`pinned`** \- All pinned participants in the meeting

If you are building a video/audio grid, use the `active` list. To display a list of all participants, use the `joined` list.

Each participant in these lists is of type `RtkRemoteParticipant`.

```js
// Get all joined participants
const joinedParticipants = meeting.participants.joined;

// Get active participants (those on screen)
const activeParticipants = meeting.participants.active;

// Get pinned participants
const pinnedParticipants = meeting.participants.pinned;

// Get waitlisted participants
const waitlistedParticipants = meeting.participants.waitlisted;
```

Use the `useRealtimeKitSelector` hook to access participant maps:

```jsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";

// Get all joined participants
const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);

// Get active participants (those on screen)
const activeParticipants = useRealtimeKitSelector((m) => m.participants.active);

// Get pinned participants
const pinnedParticipants = useRealtimeKitSelector((m) => m.participants.pinned);

// Get waitlisted participants
const waitlistedParticipants = useRealtimeKitSelector(
	(m) => m.participants.waitlisted,
);
```

```kotlin
// Get all joined participants
val joinedParticipants: List<RtkRemoteParticipant> = meeting.participants.joined

// Get active participants (those on screen)
val activeParticipants: List<RtkRemoteParticipant> = meeting.participants.active

// Get pinned participants
val pinnedParticipants: List<RtkRemoteParticipant> = meeting.participants.pinned

// Get waitlisted participants
val waitlistedParticipants: List<RtkRemoteParticipant> = meeting.participants.waitlisted

// Get screen sharing participants
val screenShareParticipants: List<RtkRemoteParticipant> = meeting.participants.screenShares
```

```swift
// Get all joined participants
let joinedParticipants: [RtkRemoteParticipant] = meeting.participants.joined

// Get active participants (those on screen)
let activeParticipants: [RtkRemoteParticipant] = meeting.participants.active

// Get pinned participants
let pinnedParticipants: [RtkRemoteParticipant] = meeting.participants.pinned

// Get waitlisted participants
let waitlistedParticipants: [RtkRemoteParticipant] = meeting.participants.waitlisted

// Get screen sharing participants
let screenShareParticipants: [RtkRemoteParticipant] = meeting.participants.screenShares
```

```dart
// Get all joined participants
final joinedParticipants = meeting.participants.joined;

// Get active participants (those on screen)
final activeParticipants = meeting.participants.active;

// Get pinned participants
final pinnedParticipants = meeting.participants.pinned;

// Get waitlisted participants
final waitlistedParticipants = meeting.participants.waitlisted;
```

Use the `useRealtimeKitSelector` hook to access participant maps:

```tsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";

// Get all joined participants
const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);

// Get active participants (those on screen)
const activeParticipants = useRealtimeKitSelector((m) => m.participants.active);

// Get pinned participants
const pinnedParticipants = useRealtimeKitSelector((m) => m.participants.pinned);

// Get waitlisted participants
const waitlistedParticipants = useRealtimeKitSelector(
	(m) => m.participants.waitlisted,
);
```

## View Modes

The view mode indicates whether participants are populated in `ACTIVE_GRID` mode or `PAGINATED` mode.

* **`ACTIVE_GRID` mode** \- Participants are automatically replaced in `meeting.participants.active` based on who is speaking or who has their video turned on
* **`PAGINATED` mode** \- Participants in `meeting.participants.active` are fixed. Use `setPage()` to change the active participants

### Set view mode

```js
// Set the view mode to paginated
await meeting.participants.setViewMode("PAGINATED");

// Set the view mode to active grid
await meeting.participants.setViewMode("ACTIVE_GRID");
```

Use the `useRealtimeKitClient` hook to access the meeting object:

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();

// Set the view mode to paginated
await meeting.participants.setViewMode("PAGINATED");

// Set the view mode to active grid
await meeting.participants.setViewMode("ACTIVE_GRID");
```

Android SDK uses active grid mode by default on page 0\. If you switch to the next page, it automatically switches to paginated mode.

iOS SDK uses active grid mode by default on page 0\. If you switch to the next page, it automatically switches to paginated mode.

Flutter SDK uses active grid mode by default on page 0\. If you switch to the next page, it automatically switches to paginated mode.

```tsx
// Set the view mode to paginated
await meeting.participants.setViewMode("PAGINATED");

// Set the view mode to active grid
await meeting.participants.setViewMode("ACTIVE_GRID");
```

### Set page in paginated mode

```js
// Switch to second page
await meeting.participants.setPage(2);
```

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();

// Switch to second page
await meeting.participants.setPage(2);
```

```kotlin
// Switch to first page
meeting.participants.setPage(1)
```

```swift
// Switch to first page
meeting.participants.setPage(1)
```

Flutter SDK automatically manages participant pagination.

```tsx
// Switch to second page
await meeting.participants.setPage(2);
```

### Monitor view mode

```js
const viewMode = meeting.participants.viewMode;
const currentPage = meeting.participants.currentPage;
```

```jsx
const viewMode = useRealtimeKitSelector((m) => m.participants.viewMode);
const currentPage = useRealtimeKitSelector((m) => m.participants.currentPage);
```

Monitoring view mode is not available on this platform.

```tsx
const viewMode = useRealtimeKitSelector((m) => m.participants.viewMode);
const currentPage = useRealtimeKitSelector((m) => m.participants.currentPage);
```

## Host Controls

The participant object allows the host several controls. These can be selected while creating the host [preset](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/create/).

### Media controls

With the correct permissions, the host can disable media for remote participants.

```js
const participant = meeting.participants.joined.get(participantId);

// Disable a participant's video stream
participant.disableVideo();

// Disable a participant's audio stream
participant.disableAudio();

// Kick a participant from the meeting
participant.kick();
```

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();
const participant = meeting.participants.joined.get(participantId);

// Disable a participant's video stream
participant.disableVideo();

// Disable a participant's audio stream
participant.disableAudio();

// Kick a participant from the meeting
participant.kick();
```

```kotlin
val participant = meeting.participants.joined.firstOrNull { it.id == participantId }

participant?.let { pcpt ->
	// Disable a participant's video stream
	val videoError = pcpt.disableVideo()

	// Disable a participant's audio stream
	val audioError = pcpt.disableAudio()

	// Kick a participant from the meeting
	val kickError = pcpt.kick()
}
```

```swift
if let participant = meeting.participants.joined.first(where: { $0.id == participantId }) {
	// Disable a participant's video stream
	let videoError: HostError? = participant.disableVideo()

	// Disable a participant's audio stream
	let audioError: HostError? = participant.disableAudio()

	// Kick a participant from the meeting
	let kickError: HostError? = participant.kick()
}
```

```dart
// Disable a remote participant's video
participant.disableVideo(onResult: (e) {
	// handle error if any
});

// Disable a remote participant's audio
participant.disableAudio(onResult: (e) {
	// handle error if any
});

// Remove the participant from the meeting
participant.kick();
```

**Required Permission**: `permissions.host.canDisableVideo`, `permissions.host.canDisableAudio` must be `true`

```tsx
const participant = meeting.participants.joined.get(participantId);

// Disable a participant's video stream
participant.disableVideo();

// Disable a participant's audio stream
participant.disableAudio();

// Kick a participant from the meeting
participant.kick();
```

### Waiting room controls

The waiting room allows the host to control which users can join your meeting and when. They can either choose to accept or reject the request.

You can also automate this flow so that users join the meeting automatically when the host joins the meeting, using [presets](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/create/).

#### Accept waiting room request

```js
await meeting.participants.acceptWaitingRoomRequest(participantId);
```

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();

await meeting.participants.acceptWaitingRoomRequest(participantId);
```

```kotlin
meeting.participants.acceptWaitingRoomRequest(participantId)
```

```swift
meeting.participants.acceptWaitingRoomRequest(id: participantId)
```

```dart
final participant = meeting.participants.waitlisted[0];
meeting.participants.acceptWaitlistedParticipant(participant);
```

```tsx
await meeting.participants.acceptWaitingRoomRequest(participantId);
```

#### Reject waiting room request

```js
await meeting.participants.rejectWaitingRoomRequest(participantId);
```

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();

await meeting.participants.rejectWaitingRoomRequest(participantId);
```

```kotlin
meeting.participants.rejectWaitingRoomRequest(participantId)
```

```swift
meeting.participants.rejectWaitingRoomRequest(participantId)
```

```dart
final participant = meeting.participants.waitlisted[0];
meeting.participants.rejectWaitlistedParticipant(participant);
```

```tsx
await meeting.participants.rejectWaitingRoomRequest(participantId);
```

### Pin participants

The host can choose to pin or unpin participants to the grid.

```js
const participant = meeting.participants.joined.get(participantId);

// Pin a participant
await participant.pin();

// Unpin a participant
await participant.unpin();
```

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();
const participant = meeting.participants.joined.get(participantId);

// Pin a participant
await participant.pin();

// Unpin a participant
await participant.unpin();
```

```kotlin
val participant = meeting.participants.joined.firstOrNull { it.id == participantId }

participant?.let { pcpt ->
	// Pin a participant
	val pinError = pcpt.pin()

	// Unpin a participant
	val unpinError = pcpt.unpin()
}
```

```swift
if let participant = meeting.participants.joined.first(where: { $0.id == participantId }) {
	// Pin a participant
	let pinError: HostError? = participant.pin()

	// Unpin a participant
	let unpinError: HostError? = participant.unpin()
}
```

```dart
// Pin a remote participant
participant.pin();

// Unpin a previously pinned participant
participant.unpin();
```

**Required Permission**: `permissions.host.canPinParticipant` must be `true`

```tsx
const participant = meeting.participants.joined.get(participantId);

// Pin a participant
await participant.pin();

// Unpin a participant
await participant.unpin();
```

### Update participant permissions

The host can modify the permissions for a participant. Permissions for a participant are defined by their preset.

Note

When the host updates the permissions for a participant, the preset is not modified and the permission changes are limited to the duration of the meeting.

Updating participant permissions is not available on this platform.

First, find the participant(s) you want to update.

```js
const participantIds = meeting.participants.joined
	.toArray()
	.filter((e) => e.name.startsWith("John"))
	.map((p) => p.id);
```

Use the `updatePermissions` method to modify the permissions for the participant.

```js
// Allow file upload permissions in public chat
const newPermissions = {
	chat: {
		public: {
			files: true,
		},
	},
};

meeting.participants.updatePermissions(participantIds, newPermissions);
```

The following permissions can be modified:

```typescript
interface UpdatedPermissions {
	polls?: {
		canCreate?: boolean;
		canVote?: boolean;
	};
	plugins?: {
		canClose?: boolean;
		canStart?: boolean;
	};
	chat?: {
		public?: {
			canSend?: boolean;
			text?: boolean;
			files?: boolean;
		};
		private?: {
			canSend?: boolean;
			text?: boolean;
			files?: boolean;
		};
	};
}
```

## Display participant videos

To play a participant's video track on a `<video>` element:

```html
<video class="participant-video" id="participant-video"></video>
```

```js
// Get the video element
const videoElement = document.getElementById("participant-video");

// Get the participant
const participant = meeting.participants.joined.get(participantId);

// Register the video element
participant.registerVideoElement(videoElement);
```

For local user preview (video not sent to other users):

```js
meeting.self.registerVideoElement(videoElement, true);
```

Clean up when the video element is no longer needed:

```js
participant.deregisterVideoElement(videoElement);
```

To play a participant's video track on a `<video>` element:

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

const [meeting] = useRealtimeKitClient();

// Get the video element
const videoElement = document.getElementById("participant-video");

// Get the participant
const participant = meeting.participants.joined.get(participantId);

// Register the video element
participant.registerVideoElement(videoElement);

// Clean up when the video element is no longer needed
participant.deregisterVideoElement(videoElement);
```

For local user preview (video not sent to other users):

```jsx
meeting.self.registerVideoElement(videoElement, true);
```

Call `participant.getVideoView()` which returns a `View` that renders the participant's video stream:

```kotlin
// Get video view of a given participant
val videoView = participant.getVideoView()

// Get screen share video view
val screenShareView = participant.getScreenShareVideoView()
```

Call `participant.getVideoView()` which returns a `UIView` that renders the participant's video stream:

```swift
// Get video view of a given participant
let videoView = participant.getVideoView()

// Get screen share video view
let screenShareView = participant.getScreenShareVideoView()
```

Use the video view methods which return a `Widget` that you can place directly in your UI hierarchy:

```dart
// Create a widget to display the participant's camera video
final cameraView = VideoView(meetingParticipant: participant);

// Create a widget to display the participant's screen share
final screenShareView = ScreenshareView(meetingParticipant: participant);
```

Use `useRealtimeKitSelector` to get the video track and render it with `RTCView`:

```tsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";
import { MediaStream, RTCView } from "@cloudflare/react-native-webrtc";

function VideoView() {
	const { videoTrack } = useRealtimeKitSelector((m) =>
		m.participants.active.toArray(),
	)[0];

	const stream = new MediaStream(undefined);
	stream.addTrack(videoTrack);

	return (
		<RTCView
			objectFit="cover"
			style={{ flex: 1 }}
			streamURL={stream.toURL()}
			mirror={true}
			zOrder={1}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#page","headline":"Remote Participants · Cloudflare Realtime docs","description":"Access participant data, display videos, and handle events for remote participants in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
