---
title: Meeting Object Explained
description: Explore the RealtimeKit meeting object and its namespaces for participants, chat, polls, and media.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Meeting Object Explained

The meeting object is the core interface for interacting with a RealtimeKit session. It provides access to participants, local user controls, chat, polls, plugins, and more. This object is returned when you initialize the SDK.

Prerequisites

This page assumes you've already initialized the SDK as described in the [Initialize SDK](https://developers.cloudflare.com/realtime/realtimekit/core/) guide.

This guide covers the core namespaces on the meeting object along with the most commonly used properties, methods, and events. Individual namespace references have been linked for more details.

WebMobile

ReactWeb ComponentsAngular

## Meeting Object Structure

The meeting object contains several properties that organize different aspects of the meeting:

### Self/Local Participant

The [meeting.self ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKSelf) represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

JavaScript

```
// Participant identifiersmeeting.self.id; // Peer ID (unique per session)meeting.self.userId; // Participant ID (persistent across sessions)meeting.self.name; // Participant display name
// Media statemeeting.self.audioEnabled; // Boolean: Is audio enabled?meeting.self.videoEnabled; // Boolean: Is video enabled?meeting.self.screenShareEnabled; // Boolean: Is screen share active?
// Media tracksmeeting.self.audioTrack; // Audio MediaStreamTrack, if audio is enabledmeeting.self.videoTrack; // Video MediaStreamTrack, if video is enabledmeeting.self.screenShareTracks; // Structure: { audio: MediaStreamTrack, video: MediaStreamTrack }, if screen share is enabled
// Room statemeeting.self.roomJoined; // Boolean: Has joined the meeting?meeting.self.roomState; // Current room state
```

**Common Methods:**

JavaScript

```
// Media controlsawait meeting.self.enableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.disableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.enableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.disableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.enableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.await meeting.self.disableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.
// Update Nameawait meeting.self.setName("New Name"); // setName works only works before joining the meeting
// List Devicesawait meeting.self.getAllDevices(); // Returns all available devicesawait meeting.self.getAudioDevices(); // Returns all available audio devicesawait meeting.self.getVideoDevices(); // Returns all available video devicesawait meeting.self.getSpeakerDevices(); // Returns all available speaker devicesawait meeting.self.getCurrentDevices(); // {audio: MediaDevice, video: MediaDevice, speaker: MediaDevice} Returns the current device configuration
// Change a deviceawait meeting.self.setDevice((await meeting.self.getAllDevices())[0]);
```

The [meeting.self ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKSelf) represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

JavaScript

```
// Participant identifiersmeeting.self.id; // Peer ID (unique per session)meeting.self.userId; // Participant ID (persistent across sessions)meeting.self.name; // Participant display name
// Media statemeeting.self.audioEnabled; // Boolean: Is audio enabled?meeting.self.videoEnabled; // Boolean: Is video enabled?meeting.self.screenShareEnabled; // Boolean: Is screen share active?
// Media tracksmeeting.self.audioTrack; // Audio MediaStreamTrack, if audio is enabledmeeting.self.videoTrack; // Video MediaStreamTrack, if video is enabledmeeting.self.screenShareTracks; // Structure: { audio: MediaStreamTrack, video: MediaStreamTrack }, if screen share is enabled
// Room statemeeting.self.roomJoined; // Boolean: Has joined the meeting?meeting.self.roomState; // Current room state
```

**Common Methods:**

JavaScript

```
// Media controlsawait meeting.self.enableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.disableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.enableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.disableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.enableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.await meeting.self.disableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.
// Update Nameawait meeting.self.setName("New Name"); // setName works only works before joining the meeting
// List Devicesawait meeting.self.getAllDevices(); // Returns all available devicesawait meeting.self.getAudioDevices(); // Returns all available audio devicesawait meeting.self.getVideoDevices(); // Returns all available video devicesawait meeting.self.getSpeakerDevices(); // Returns all available speaker devicesawait meeting.self.getCurrentDevices(); // {audio: MediaDevice, video: MediaDevice, speaker: MediaDevice} Returns the current device configuration
// Change a deviceawait meeting.self.setDevice((await meeting.self.getAllDevices())[0]);
```

The [meeting.self ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKSelf) represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

JavaScript

```
// Participant identifiersmeeting.self.id; // Peer ID (unique per session)meeting.self.userId; // Participant ID (persistent across sessions)meeting.self.name; // Participant display name
// Media statemeeting.self.audioEnabled; // Boolean: Is audio enabled?meeting.self.videoEnabled; // Boolean: Is video enabled?meeting.self.screenShareEnabled; // Boolean: Is screen share active?
// Media tracksmeeting.self.audioTrack; // Audio MediaStreamTrack, if audio is enabledmeeting.self.videoTrack; // Video MediaStreamTrack, if video is enabledmeeting.self.screenShareTracks; // Structure: { audio: MediaStreamTrack, video: MediaStreamTrack }, if screen share is enabled
// Room statemeeting.self.roomJoined; // Boolean: Has joined the meeting?meeting.self.roomState; // Current room state
```

**Common Methods:**

JavaScript

```
// Media controlsawait meeting.self.enableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.disableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.enableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.disableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.enableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.await meeting.self.disableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.
// Update Nameawait meeting.self.setName("New Name"); // setName works only works before joining the meeting
// List Devicesawait meeting.self.getAllDevices(); // Returns all available devicesawait meeting.self.getAudioDevices(); // Returns all available audio devicesawait meeting.self.getVideoDevices(); // Returns all available video devicesawait meeting.self.getSpeakerDevices(); // Returns all available speaker devicesawait meeting.self.getCurrentDevices(); // {audio: MediaDevice, video: MediaDevice, speaker: MediaDevice} Returns the current device configuration
// Change a deviceawait meeting.self.setDevice((await meeting.self.getAllDevices())[0]);
```

The `meeting.localUser` represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

Kotlin

```
// Participant identifiersmeeting.localUser.id // ID of the local user participantmeeting.localUser.userId // Persistent user ID across sessionsmeeting.localUser.name // Name of the local usermeeting.localUser.picture // URL to the picture of the local user (optional)meeting.localUser.customParticipantId // User provided participant ID (optional)meeting.localUser.permissions // Permissions related to various capabilities within a meeting context for the local user
// Media statemeeting.localUser.audioEnabled // Boolean: Is audio currently enabled for the local usermeeting.localUser.videoEnabled // Boolean: Is video currently enabled for the local usermeeting.localUser.screenShareEnabled // Boolean: Is screenshare currently enabled for the local usermeeting.localUser.isCameraPermissionGranted // Boolean: Does local user have access to device Camera permissionmeeting.localUser.isMicrophonePermissionGranted // Boolean: Does local user have access to device Microphone permission
// Participant metadatameeting.localUser.isHost // Boolean: Is the local user the hostmeeting.localUser.isPinned // Boolean: Is the local user pinnedmeeting.localUser.flags // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
// Preset Infomeeting.localUser.presetName // String value representing name of preset for local usermeeting.localUser.presetInfo // Typed object representing the preset information for local usermeeting.localUser.designToken // Design token for UI customization
// Stage and room statemeeting.localUser.stageStatus // Stage status of the local usermeeting.localUser.roomJoined // Boolean: Has local user joined the roommeeting.localUser.waitListStatus // Waitlist status of the local user (NONE, WAITING, ACCEPTED, or REJECTED)
```

**Common Methods:**

Kotlin

```
// Get local user video viewmeeting.localUser.getSelfPreview() // Returns a VideoView that can be added to any ViewGroup in Android
// Update Namemeeting.localUser.setDisplayName("New Name") // Name change is visible only if it occurs before joinRoom() and after init()
// Mute/Unmute Audiomeeting.localUser.disableAudio { error: AudioError? -> }meeting.localUser.enableAudio { error: AudioError? -> }
// Enable/Disable Videomeeting.localUser.disableVideo { error: VideoError? -> }meeting.localUser.enableVideo { error: VideoError? -> }
// Enable/Disable Screensharemeeting.localUser.canEnableScreenShare() // Check if screenshare can be enabledval error: ScreenShareError? = meeting.localUser.enableScreenShare() // Returns error if fails, null if successfulmeeting.localUser.disableScreenShare()
// Device managementval audioDevices = meeting.localUser.getAudioDevices() // Get all available audio devicesval videoDevices = meeting.localUser.getVideoDevices() // Get all available video devices
meeting.localUser.setAudioDevice(audioDevices[0]) // Switch audio devicemeeting.localUser.setVideoDevice(videoDevices[0]) // Switch video device
val selectedAudio = meeting.localUser.getSelectedAudioDevice() // Get currently selected audio deviceval selectedVideo = meeting.localUser.getSelectedVideoDevice() // Get currently selected video device
meeting.localUser.switchCamera() // Switch between front and back camera
// Stage permissionsmeeting.localUser.canJoinStage() // Check if local user can join stagemeeting.localUser.canRequestToJoinStage() // Check if local user can request to join stage
// Host controlsmeeting.localUser.canDoParticipantHostControls() // Check if local user can perform host controls
// Setup screenmeeting.localUser.shouldShowSetupScreen() // Check if setup screen should be shownmeeting.localUser.shouldJoinMediaRoom() // Check if local user should join media room
```

The `meeting.localUser` represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

Swift

```
// Participant identifiersmeeting.localUser.id // ID of the local user participantmeeting.localUser.userId // Persistent user ID across sessionsmeeting.localUser.name // Name of the local usermeeting.localUser.picture // URL to the picture of the local user (optional)meeting.localUser.customParticipantId // User provided participant ID (optional)meeting.localUser.permissions // Permissions related to various capabilities within a meeting context for the local user
// Media statemeeting.localUser.audioEnabled // Boolean: Is audio currently enabled for the local usermeeting.localUser.videoEnabled // Boolean: Is video currently enabled for the local usermeeting.localUser.screenShareEnabled // Boolean: Is screenshare currently enabled for the local usermeeting.localUser.isCameraPermissionGranted // Boolean: Does local user have access to device Camera permissionmeeting.localUser.isMicrophonePermissionGranted // Boolean: Does local user have access to device Microphone permission
// Participant metadatameeting.localUser.isHost // Boolean: Is the local user the hostmeeting.localUser.isPinned // Boolean: Is the local user pinnedmeeting.localUser.flags // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
// Preset Infomeeting.localUser.presetName // String value representing name of preset for local usermeeting.localUser.presetInfo // Typed object representing the preset information for local usermeeting.localUser.designToken // Design token for UI customization
// Stage and room statemeeting.localUser.stageStatus // Stage status of the local usermeeting.localUser.roomJoined // Boolean: Has local user joined the roommeeting.localUser.waitListStatus // Waitlist status of the local user (.none, .waiting, .accepted, or .rejected)
```

**Common Methods:**

Swift

```
// Get local user video viewmeeting.localUser.getSelfPreview() // Returns a VideoView (UIView) for iOS
// Update Namemeeting.localUser.setDisplayName("New Name") // Name change is visible only if it occurs before joinRoom() and after init()
// Mute/Unmute Audiomeeting.localUser.disableAudio { error in }meeting.localUser.enableAudio { error in }
// Enable/Disable Videomeeting.localUser.disableVideo { error in }meeting.localUser.enableVideo { error in }
// Enable/Disable Screensharemeeting.localUser.canEnableScreenShare() // Check if screenshare can be enabledlet error: ScreenShareError? = meeting.localUser.enableScreenShare() // Returns error if fails, nil if successfulmeeting.localUser.disableScreenShare()
// Device managementlet audioDevices = meeting.localUser.getAudioDevices() // Get all available audio deviceslet videoDevices = meeting.localUser.getVideoDevices() // Get all available video devices
meeting.localUser.setAudioDevice(audioDevices[0]) // Switch audio devicemeeting.localUser.setVideoDevice(videoDevices[0]) // Switch video device
let selectedAudio = meeting.localUser.getSelectedAudioDevice() // Get currently selected audio devicelet selectedVideo = meeting.localUser.getSelectedVideoDevice() // Get currently selected video device
meeting.localUser.switchCamera() // Switch between front and back camera
// Stage permissionsmeeting.localUser.canJoinStage() // Check if local user can join stagemeeting.localUser.canRequestToJoinStage() // Check if local user can request to join stage
// Host controlsmeeting.localUser.canDoParticipantHostControls() // Check if local user can perform host controls
// Setup screenmeeting.localUser.shouldShowSetupScreen() // Check if setup screen should be shownmeeting.localUser.shouldJoinMediaRoom() // Check if local user should join media room
```

The `meeting.localUser` represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

Dart

```
// Participant identifiersmeeting.localUser.id; // ID of the local user participantmeeting.localUser.userId; // Persistent user ID across sessionsmeeting.localUser.name; // Name of the local usermeeting.localUser.picture; // URL to the picture of the local user (optional)meeting.localUser.customParticipantId; // User provided participant ID (optional)meeting.localUser.permissions; // Permissions related to various capabilities within a meeting context for the local user
// Media statemeeting.localUser.audioEnabled; // Boolean: Is audio currently enabled for the local usermeeting.localUser.videoEnabled; // Boolean: Is video currently enabled for the local usermeeting.localUser.screenShareEnabled; // Boolean: Is screenshare currently enabled for the local usermeeting.localUser.isCameraPermissionGranted; // Boolean: Does local user have access to device Camera permissionmeeting.localUser.isMicrophonePermissionGranted; // Boolean: Does local user have access to device Microphone permission
// Participant metadatameeting.localUser.isHost; // Boolean: Is the local user the hostmeeting.localUser.isPinned; // Boolean: Is the local user pinnedmeeting.localUser.flags; // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
// Preset Infomeeting.localUser.presetName; // String value representing name of preset for local usermeeting.localUser.presetInfo; // Typed object representing the preset information for local user
// Stage and room statemeeting.localUser.stageStatus; // Stage status of the local usermeeting.localUser.roomJoined; // Boolean: Has local user joined the roommeeting.localUser.waitListStatus; // Waitlist status of the local user (None, Waiting, Accepted, or Rejected)
```

**Common Methods:**

Dart

```
// Update Nameawait meeting.localUser.setDisplayName("New Name"); // Name change is visible only if it occurs before joinRoom() and after init()
// Mute/Unmute Audiomeeting.localUser.disableAudio(onResult: (error) {});meeting.localUser.enableAudio(onResult: (error) {});
// Enable/Disable Videomeeting.localUser.disableVideo(onResult: (error) {});meeting.localUser.enableVideo(onResult: (error) {});
// Enable/Disable Screensharemeeting.localUser.enableScreenShare();meeting.localUser.disableScreenShare();
// Device managementfinal audioDevices = await meeting.localUser.getAudioDevices(); // Get all available audio devicesfinal videoDevices = await meeting.localUser.getVideoDevices(); // Get all available video devices
await meeting.localUser.setAudioDevice(audioDevices[0]); // Switch audio deviceawait meeting.localUser.setVideoDevice(videoDevices[0]); // Switch video device
final selectedAudio = await meeting.localUser.getSelectedAudioDevice(); // Get currently selected audio devicefinal selectedVideo = await meeting.localUser.getSelectedVideoDevice(); // Get currently selected video device
meeting.localUser.switchCamera(); // Switch between front and back camera
```

The [meeting.self ↗](https://docs.realtime.cloudflare.com/mobile-core/reference/RTKSelf) represents the local user (you) in the meeting. It provides properties and methods to control your own audio, video, and screen sharing.

**Key Properties:**

JavaScript

```
// Participant identifiersmeeting.self.id; // Peer ID (unique per session)meeting.self.userId; // Participant ID (persistent across sessions)meeting.self.name; // Participant display name
// Media statemeeting.self.audioEnabled; // Boolean: Is audio enabled?meeting.self.videoEnabled; // Boolean: Is video enabled?meeting.self.screenShareEnabled; // Boolean: Is screen share active?
// Media tracksmeeting.self.audioTrack; // Audio MediaStreamTrack, if audio is enabledmeeting.self.videoTrack; // Video MediaStreamTrack, if video is enabledmeeting.self.screenShareTracks; // Structure: { audio: MediaStreamTrack, video: MediaStreamTrack }, if screen share is enabled
// Room statemeeting.self.roomJoined; // Boolean: Has joined the meeting?meeting.self.roomState; // Current room state
```

**Common Methods:**

JavaScript

```
// Media controlsawait meeting.self.enableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.disableAudio(); // Emits a `audioUpdate` event on `meeting.self` when successful.await meeting.self.enableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.disableVideo(); // Emits a `videoUpdate` event on `meeting.self` when successful.await meeting.self.enableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.await meeting.self.disableScreenShare(); // Emits a `screenShareUpdate` event on `meeting.self` when successful.
// Update Nameawait meeting.self.setName("New Name"); // setName works only works before joining the meeting
// List Devicesawait meeting.self.getAllDevices(); // Returns all available devicesawait meeting.self.getAudioDevices(); // Returns all available audio devicesawait meeting.self.getVideoDevices(); // Returns all available video devicesawait meeting.self.getSpeakerDevices(); // Returns all available speaker devicesawait meeting.self.getCurrentDevices(); // {audio: MediaDevice, video: MediaDevice, speaker: MediaDevice} Returns the current device configuration
// Change a deviceawait meeting.self.setDevice((await meeting.self.getAllDevices())[0]);
```

## Remote participants

### `meeting.participants` \- All Remote Participants

The [meeting.participants ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKParticipants) contains maps of all remote participants in the meeting, organized by their state.

Note

`meeting.participants` only contains remote participants. It does not include the local participant. Local participant is available in `meeting.self`.

**Participant Maps:**

JavaScript

```
// All participants who have joinedmeeting.participants.joined; // Map of joined participantsmeeting.participants.joined.toArray(); // Array of joined participants
// Participants with active mediameeting.participants.active; // Map of participants with active audio/videomeeting.participants.active.toArray(); // Array of participants with active audio/video
// Participants in waiting roommeeting.participants.waitlisted; // Map of waitlisted participantsmeeting.participants.waitlisted.toArray(); // Array of waitlisted participants
// Pinned participantsmeeting.participants.pinned; // Map of pinned participantsmeeting.participants.pinned.toArray(); // Array of pinned participants
```

**Accessing Participant Data:**

JavaScript

```
// Get all joined participants as an arrayconst joinedParticipants = meeting.participants.joined.toArray();
// Access first participant's IDsconst firstParticipant = joinedParticipants[0];console.log("First Participant Peer ID:", firstParticipant?.id); // Peer ID (unique per session)console.log("First Participant User ID:", firstParticipant?.userId); // Participant ID (persistent)console.log("First Participant Name:", firstParticipant?.name); // Display nameconsole.log("First Participant Audio Enabled:", firstParticipant?.audioEnabled); // Audio stateconsole.log("First Participant Video Enabled:", firstParticipant?.videoEnabled); // Video stateconsole.log(  "First Participant Screen Share Enabled:",  firstParticipant?.screenShareEnabled,); // Screen share stateconsole.log("First Participant Audio Track:", firstParticipant?.audioTrack); // Audio MediaStreamTrackconsole.log("First Participant Video Track:", firstParticipant?.videoTrack); // Video MediaStreamTrackconsole.log(  "First Participant Screen Share Track:",  firstParticipant?.screenShareTracks,); // Screen share MediaStreamTrack
// Access participant by peer IDconst participant = meeting.participants.joined.get("peer-id");
// Get count of joined participantsconst count = meeting.participants.joined.size();
```

**Participant Properties:**

Each participant object has similar properties to `meeting.self`:

JavaScript

```
participant.id; // Peer IDparticipant.userId; // Participant IDparticipant.name; // Display nameparticipant.audioEnabled; // Audio stateparticipant.videoEnabled; // Video stateparticipant.screenShareEnabled; // Screen share stateparticipant.audioTrack; // Audio MediaStreamTrackparticipant.videoTrack; // Video MediaStreamTrackparticipant.screenShareTrack; // Screen share MediaStreamTrack
```

The `meeting.participants` contains maps of all remote participants in the meeting, organized by their state.

Note

`meeting.participants` only contains remote participants. It does not include the local participant. Local participant is available in `meeting.self`.

**Participant Maps:**

JavaScript

```
// All participants who have joinedmeeting.participants.joined; // Map of joined participantsmeeting.participants.joined.toArray(); // Array of joined participants
// Participants with active mediameeting.participants.active; // Map of participants with active audio/videomeeting.participants.active.toArray(); // Array of participants with active audio/video
// Participants in waiting roommeeting.participants.waitlisted; // Map of waitlisted participantsmeeting.participants.waitlisted.toArray(); // Array of waitlisted participants
// Pinned participantsmeeting.participants.pinned; // Map of pinned participantsmeeting.participants.pinned.toArray(); // Array of pinned participants
```

**Accessing Participant Data:**

JavaScript

```
// Get all joined participants as an arrayconst joinedParticipants = meeting.participants.joined.toArray();
// Access first participant's IDsconst firstParticipant = joinedParticipants[0];console.log("First Participant Peer ID:", firstParticipant?.id); // Peer ID (unique per session)console.log("First Participant User ID:", firstParticipant?.userId); // Participant ID (persistent)console.log("First Participant Name:", firstParticipant?.name); // Display nameconsole.log("First Participant Audio Enabled:", firstParticipant?.audioEnabled); // Audio stateconsole.log("First Participant Video Enabled:", firstParticipant?.videoEnabled); // Video stateconsole.log(  "First Participant Screen Share Enabled:",  firstParticipant?.screenShareEnabled,); // Screen share stateconsole.log("First Participant Audio Track:", firstParticipant?.audioTrack); // Audio MediaStreamTrackconsole.log("First Participant Video Track:", firstParticipant?.videoTrack); // Video MediaStreamTrackconsole.log(  "First Participant Screen Share Track:",  firstParticipant?.screenShareTracks,); // Screen share MediaStreamTrack
// Access participant by peer IDconst participant = meeting.participants.joined.get("peer-id");
// Get count of joined participantsconst count = meeting.participants.joined.size();
```

**Participant Properties:**

Each participant object has similar properties to `meeting.self`:

JavaScript

```
participant.id; // Peer IDparticipant.userId; // Participant IDparticipant.name; // Display nameparticipant.audioEnabled; // Audio stateparticipant.videoEnabled; // Video stateparticipant.screenShareEnabled; // Screen share stateparticipant.audioTrack; // Audio MediaStreamTrackparticipant.videoTrack; // Video MediaStreamTrackparticipant.screenShareTrack; // Screen share MediaStreamTrack
```

The `meeting.participants` contains maps of all remote participants in the meeting, organized by their state.

Note

`meeting.participants` only contains remote participants. It does not include the local participant. Local participant is available in `meeting.self`.

**Participant Maps:**

JavaScript

```
// All participants who have joinedmeeting.participants.joined; // Map of joined participantsmeeting.participants.joined.toArray(); // Array of joined participants
// Participants with active mediameeting.participants.active; // Map of participants with active audio/videomeeting.participants.active.toArray(); // Array of participants with active audio/video
// Participants in waiting roommeeting.participants.waitlisted; // Map of waitlisted participantsmeeting.participants.waitlisted.toArray(); // Array of waitlisted participants
// Pinned participantsmeeting.participants.pinned; // Map of pinned participantsmeeting.participants.pinned.toArray(); // Array of pinned participants
```

**Accessing Participant Data:**

JavaScript

```
// Get all joined participants as an arrayconst joinedParticipants = meeting.participants.joined.toArray();
// Access first participant's IDsconst firstParticipant = joinedParticipants[0];console.log("First Participant Peer ID:", firstParticipant?.id); // Peer ID (unique per session)console.log("First Participant User ID:", firstParticipant?.userId); // Participant ID (persistent)console.log("First Participant Name:", firstParticipant?.name); // Display nameconsole.log("First Participant Audio Enabled:", firstParticipant?.audioEnabled); // Audio stateconsole.log("First Participant Video Enabled:", firstParticipant?.videoEnabled); // Video stateconsole.log(  "First Participant Screen Share Enabled:",  firstParticipant?.screenShareEnabled,); // Screen share stateconsole.log("First Participant Audio Track:", firstParticipant?.audioTrack); // Audio MediaStreamTrackconsole.log("First Participant Video Track:", firstParticipant?.videoTrack); // Video MediaStreamTrackconsole.log(  "First Participant Screen Share Track:",  firstParticipant?.screenShareTracks,); // Screen share MediaStreamTrack
// Access participant by peer IDconst participant = meeting.participants.joined.get("peer-id");
// Get count of joined participantsconst count = meeting.participants.joined.size();
```

**Participant Properties:**

Each participant object has similar properties to `meeting.self`:

JavaScript

```
participant.id; // Peer IDparticipant.userId; // Participant IDparticipant.name; // Display nameparticipant.audioEnabled; // Audio stateparticipant.videoEnabled; // Video stateparticipant.screenShareEnabled; // Screen share stateparticipant.audioTrack; // Audio MediaStreamTrackparticipant.videoTrack; // Video MediaStreamTrackparticipant.screenShareTrack; // Screen share MediaStreamTrack
```

The `meeting.participants` contains lists of all remote participants in the meeting, organized by their state.

**Participant Lists:**

Kotlin

```
// All participants who have joinedval joined: List<RtkRemoteParticipant> = meeting.participants.joined
// Participants with active mediaval active: List<RtkRemoteParticipant> = meeting.participants.active
// Participants in waiting roomval waitlisted: List<RtkRemoteParticipant> = meeting.participants.waitlisted
// Pinned participantval pinned: RtkRemoteParticipant? = meeting.participants.pinned
// Participants sharing screenval screenShares: List<RtkRemoteParticipant> = meeting.participants.screenShares
// Active speakerval activeSpeaker: RtkRemoteParticipant? = meeting.participants.activeSpeaker
// Total count of participants (including local user if joined)val totalCount: Int = meeting.participants.totalCount
```

**Accessing Participant Data:**

Kotlin

```
// Get all joined participantsval joinedParticipants = meeting.participants.joined
// Access first participantval firstParticipant = joinedParticipants.firstOrNull()firstParticipant?.id // Participant ID (aka peerId)firstParticipant?.userId // User IDfirstParticipant?.name // Display namefirstParticipant?.picture // Participant picture (if any)firstParticipant?.customParticipantId // Custom participant IDfirstParticipant?.audioEnabled // Audio statefirstParticipant?.videoEnabled // Video statefirstParticipant?.screenShareEnabled // Screen share statefirstParticipant?.isPinned // Pin statefirstParticipant?.isHost // Host statefirstParticipant?.presetName // Preset namefirstParticipant?.stageStatus // Stage statusfirstParticipant?.flags // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
// Get participant video viewfirstParticipant?.getVideoView() // Returns a View that renders video streamfirstParticipant?.getScreenShareVideoView() // Returns a View that renders screenshare stream
// Access paginationval maxNumberOnScreen = meeting.participants.maxNumberOnScreen // Max participants per pageval currentPageNumber = meeting.participants.currentPageNumber // Current page numberval pageCount = meeting.participants.pageCount // Total number of pagesval canGoNextPage = meeting.participants.canGoNextPage // Can navigate to next pageval canGoPreviousPage = meeting.participants.canGoPreviousPage // Can navigate to previous pagemeeting.participants.setPage(1) // Switch to specific page
```

**Participant Control Methods:**

Kotlin

```
// Individual participant controls (host only)firstParticipant?.disableAudio { error -> } // Disable participant's audiofirstParticipant?.disableVideo { error -> } // Disable participant's videofirstParticipant?.kick { error -> } // Remove participant from meeting
// Pin/Unpin participantsval error: HostError? = firstParticipant?.pin() // Pin participantval error: HostError? = firstParticipant?.unpin() // Unpin participant
// Waiting room managementmeeting.participants.acceptWaitingRoomRequest(participantId) // Accept from waiting roommeeting.participants.rejectWaitingRoomRequest(participantId) // Reject from waiting roommeeting.participants.acceptAllWaitingRoomRequests() // Accept all waiting participants
// Bulk operations (host only)val error: HostError? = meeting.participants.disableAllAudio() // Disable all participants' audioval error: HostError? = meeting.participants.disableAllVideo() // Disable all participants' videoval error: HostError? = meeting.participants.kickAll() // Remove all participants
// Broadcast custom messagemeeting.participants.broadcastMessage("custom-event", mapOf("key" to "value"))
// Cache managementmeeting.participants.enableCache() // Enable participant cachingmeeting.participants.disableCache() // Disable participant caching
```

**Participant Properties:**

Kotlin

```
participant.id // Participant ID (aka peerId, unique per session)participant.userId // User ID (persistent across sessions)participant.name // Display nameparticipant.picture // Participant picture URLparticipant.customParticipantId // Custom participant IDparticipant.audioEnabled // Audio stateparticipant.videoEnabled // Video stateparticipant.screenShareEnabled // Screen share stateparticipant.isPinned // Pin stateparticipant.isHost // Host stateparticipant.presetName // Preset nameparticipant.stageStatus // Stage statusparticipant.flags // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
```

The `meeting.participants` contains lists of all remote participants in the meeting, organized by their state.

**Participant Lists:**

Swift

```
// All participants who have joinedlet joined: [RtkRemoteParticipant] = meeting.participants.joined
// Participants with active medialet active: [RtkRemoteParticipant] = meeting.participants.active
// Participants in waiting roomlet waitlisted: [RtkRemoteParticipant] = meeting.participants.waitlisted
// Pinned participantlet pinned: RtkRemoteParticipant? = meeting.participants.pinned
// Participants sharing screenlet screenShares: [RtkRemoteParticipant] = meeting.participants.screenShares
// Active speakerlet activeSpeaker: RtkRemoteParticipant? = meeting.participants.activeSpeaker
// Total count of participants (including local user if joined)let totalCount: Int = meeting.participants.totalCount
```

**Accessing Participant Data:**

Swift

```
// Get all joined participantslet joinedParticipants = meeting.participants.joined
// Access first participantlet firstParticipant = joinedParticipants.firstfirstParticipant?.id // Participant ID (aka peerId)firstParticipant?.userId // User IDfirstParticipant?.name // Display namefirstParticipant?.picture // Participant picture (if any)firstParticipant?.customParticipantId // Custom participant IDfirstParticipant?.audioEnabled // Audio statefirstParticipant?.videoEnabled // Video statefirstParticipant?.screenShareEnabled // Screen share statefirstParticipant?.isPinned // Pin statefirstParticipant?.isHost // Host statefirstParticipant?.presetName // Preset namefirstParticipant?.stageStatus // Stage statusfirstParticipant?.flags // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
// Get participant video viewfirstParticipant?.getVideoView() // Returns a UIView that renders video streamfirstParticipant?.getScreenShareVideoView() // Returns a UIView that renders screenshare stream
// Access paginationlet maxNumberOnScreen = meeting.participants.maxNumberOnScreen // Max participants per pagelet currentPageNumber = meeting.participants.currentPageNumber // Current page numberlet pageCount = meeting.participants.pageCount // Total number of pageslet canGoNextPage = meeting.participants.canGoNextPage // Can navigate to next pagelet canGoPreviousPage = meeting.participants.canGoPreviousPage // Can navigate to previous pagemeeting.participants.setPage(1) // Switch to specific page
```

**Participant Control Methods:**

Swift

```
// Individual participant controls (host only)firstParticipant?.disableAudio { error in } // Disable participant's audiofirstParticipant?.disableVideo { error in } // Disable participant's videofirstParticipant?.kick { error in } // Remove participant from meeting
// Pin/Unpin participantslet error: HostError? = firstParticipant?.pin() // Pin participantlet error: HostError? = firstParticipant?.unpin() // Unpin participant
// Waiting room managementmeeting.participants.acceptWaitingRoomRequest(participantId) // Accept from waiting roommeeting.participants.rejectWaitingRoomRequest(participantId) // Reject from waiting roommeeting.participants.acceptAllWaitingRoomRequests() // Accept all waiting participants
// Bulk operations (host only)let error: HostError? = meeting.participants.disableAllAudio() // Disable all participants' audiolet error: HostError? = meeting.participants.disableAllVideo() // Disable all participants' videolet error: HostError? = meeting.participants.kickAll() // Remove all participants
// Broadcast custom messagemeeting.participants.broadcastMessage("custom-event", ["key": "value"])
// Cache managementmeeting.participants.enableCache() // Enable participant cachingmeeting.participants.disableCache() // Disable participant caching
```

**Participant Properties:**

Swift

```
participant.id // Participant ID (aka peerId, unique per session)participant.userId // User ID (persistent across sessions)participant.name // Display nameparticipant.picture // Participant picture URLparticipant.customParticipantId // Custom participant IDparticipant.audioEnabled // Audio stateparticipant.videoEnabled // Video stateparticipant.screenShareEnabled // Screen share stateparticipant.isPinned // Pin stateparticipant.isHost // Host stateparticipant.presetName // Preset nameparticipant.stageStatus // Stage statusparticipant.flags // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
```

The `meeting.participants` contains lists of all remote participants in the meeting, organized by their state.

**Participant Lists:**

Dart

```
// All participants who have joinedfinal joined = meeting.participants.joined; // List<RtkRemoteParticipant>
// Participants with active mediafinal active = meeting.participants.active; // List<RtkRemoteParticipant>
// Participants in waiting roomfinal waitlisted = meeting.participants.waitlisted; // List<RtkRemoteParticipant>
// Pinned participantfinal pinned = meeting.participants.pinned; // RtkRemoteParticipant?
// Participants sharing screenfinal screenshares = meeting.participants.screenshares; // List<RtkRemoteParticipant>
```

**Accessing Participant Data:**

Dart

```
// Get all joined participantsfinal joinedParticipants = meeting.participants.joined;
// Access first participantfinal firstParticipant = joinedParticipants.firstOrNull;firstParticipant?.id; // Participant ID (aka peerId)firstParticipant?.userId; // User IDfirstParticipant?.name; // Display namefirstParticipant?.picture; // Participant picture (if any)firstParticipant?.customParticipantId; // Custom participant IDfirstParticipant?.audioEnabled; // Audio statefirstParticipant?.videoEnabled; // Video statefirstParticipant?.screenShareEnabled; // Screen share statefirstParticipant?.isPinned; // Pin statefirstParticipant?.isHost; // Host statefirstParticipant?.presetName; // Preset namefirstParticipant?.stageStatus; // Stage statusfirstParticipant?.flags; // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
// Get participant video viewfirstParticipant?.videoView; // Returns a Widget that renders video stream
// Access pagination infofinal grid = meeting.participants.grid;grid.pageCount; // Total number of pagesgrid.currentPageNumber; // Current page numbergrid.shouldShowPaginator; // Whether to show paginatorgrid.isNextPagePossible; // Can navigate to next pagegrid.isPreviousPagePossible; // Can navigate to previous pagemeeting.participants.setPage(1); // Switch to specific page
```

**Participant Control Methods:**

Dart

```
// Individual participant controls (host only)firstParticipant?.disableAudio(onResult: (error) {}); // Disable participant's audiofirstParticipant?.disableVideo(onResult: (error) {}); // Disable participant's videofirstParticipant?.kick(onResult: (error) {}); // Remove participant from meeting
// Pin/Unpin participantsfinal error: HostError? = firstParticipant?.pin(); // Pin participantfinal error: HostError? = firstParticipant?.unpin(); // Unpin participant
// Waiting room managementfirstParticipant?.acceptWaitListedRequest(participantId); // Accept from waiting roomfirstParticipant?.rejectWaitListedRequest(participantId); // Reject from waiting room
// Bulk operations (host only)meeting.participants.disableAllAudio(onResult: (error) {}); // Disable all participants' audiomeeting.participants.disableAllVideo(onResult: (error) {}); // Disable all participants' videomeeting.participants.kickAll(onResult: (error) {}); // Remove all participants
// Waiting room bulk operationsmeeting.participants.acceptWaitlistedParticipant(participant); // Accept specific participantmeeting.participants.rejectWaitlistedParticipant(participant); // Reject specific participantmeeting.participants.acceptAllWaitingRoomRequests(); // Accept all waiting participants
// Broadcast custom messagemeeting.participants.broadcastMessage("custom-event", {"key": "value"});
```

**Participant Properties:**

Dart

```
participant.id; // Participant ID (aka peerId, unique per session)participant.userId; // User ID (persistent across sessions)participant.name; // Display nameparticipant.picture; // Participant picture URLparticipant.customParticipantId; // Custom participant IDparticipant.audioEnabled; // Audio stateparticipant.videoEnabled; // Video stateparticipant.screenShareEnabled; // Screen share stateparticipant.isPinned; // Pin stateparticipant.isHost; // Host stateparticipant.presetName; // Preset nameparticipant.stageStatus; // Stage statusparticipant.flags; // Participant flags (recorder, hiddenParticipant, webinarHiddenParticipant)
```

The [meeting.participants ↗](https://docs.realtime.cloudflare.com/mobile-core/reference/RTKParticipants) contains maps of all remote participants in the meeting, organized by their state.

Note

`meeting.participants` only contains remote participants. It does not include the local participant. Local participant is available in `meeting.self`.

**Participant Maps:**

JavaScript

```
// All participants who have joinedmeeting.participants.joined; // Map of joined participantsmeeting.participants.joined.toArray(); // Array of joined participants
// Participants with active mediameeting.participants.active; // Map of participants with active audio/videomeeting.participants.active.toArray(); // Array of participants with active audio/video
// Participants in waiting roommeeting.participants.waitlisted; // Map of waitlisted participantsmeeting.participants.waitlisted.toArray(); // Array of waitlisted participants
// Pinned participantsmeeting.participants.pinned; // Map of pinned participantsmeeting.participants.pinned.toArray(); // Array of pinned participants
```

**Accessing Participant Data:**

JavaScript

```
// Get all joined participants as an arrayconst joinedParticipants = meeting.participants.joined.toArray();
// Access first participant's IDsconst firstParticipant = joinedParticipants[0];console.log("First Participant Peer ID:", firstParticipant?.id); // Peer ID (unique per session)console.log("First Participant User ID:", firstParticipant?.userId); // Participant ID (persistent)console.log("First Participant Name:", firstParticipant?.name); // Display nameconsole.log("First Participant Audio Enabled:", firstParticipant?.audioEnabled); // Audio stateconsole.log("First Participant Video Enabled:", firstParticipant?.videoEnabled); // Video stateconsole.log(  "First Participant Screen Share Enabled:",  firstParticipant?.screenShareEnabled,); // Screen share stateconsole.log("First Participant Audio Track:", firstParticipant?.audioTrack); // Audio MediaStreamTrackconsole.log("First Participant Video Track:", firstParticipant?.videoTrack); // Video MediaStreamTrackconsole.log(  "First Participant Screen Share Track:",  firstParticipant?.screenShareTracks,); // Screen share MediaStreamTrack
// Access participant by peer IDconst participant = meeting.participants.joined.get("peer-id");
// Get count of joined participantsconst count = meeting.participants.joined.size();
```

**Participant Properties:**

Each participant object has similar properties to `meeting.self`:

JavaScript

```
participant.id; // Peer IDparticipant.userId; // Participant IDparticipant.name; // Display nameparticipant.audioEnabled; // Audio stateparticipant.videoEnabled; // Video stateparticipant.screenShareEnabled; // Screen share stateparticipant.audioTrack; // Audio MediaStreamTrackparticipant.videoTrack; // Video MediaStreamTrackparticipant.screenShareTrack; // Screen share MediaStreamTrack
```

## Meeting metadata

### `meeting.meta` \- Meeting Metadata

The [meeting.meta ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKMeta) contains information about the meeting room itself.

JavaScript

```
meeting.meta.meetingId; // Meeting identifiermeeting.meta.meetingTitle; // Meeting Titlemeeting.meta.meetingStartedTimestamp; // Meeting start time
```

The [meeting.meta ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKMeta) contains information about the meeting room itself.

JavaScript

```
meeting.meta.meetingId; // Meeting identifiermeeting.meta.meetingTitle; // Meeting Titlemeeting.meta.meetingStartedTimestamp; // Meeting start time
```

The [meeting.meta ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKMeta) contains information about the meeting room itself.

JavaScript

```
meeting.meta.meetingId; // Meeting identifiermeeting.meta.meetingTitle; // Meeting Titlemeeting.meta.meetingStartedTimestamp; // Meeting start time
```

The `meeting.meta` contains information about the meeting room itself.

**Properties:**

Kotlin

```
meeting.meta.meetingId // Meeting identifiermeeting.meta.meetingTitle // Meeting titlemeeting.meta.meetingStartedTimestamp // Meeting start timemeeting.meta.meetingType // Meeting type (GROUP_CALL, WEBINAR, or LIVESTREAM)meeting.meta.meetingConfig // Meeting configuration containing audio and video settingsmeeting.meta.meetingState // State of the meeting (RtkMeetingState)meeting.meta.authToken // User's authentication token for the meetingmeeting.meta.selfActiveTab // Currently active tab for the local participant (ActiveTab?)meeting.meta.mediaConnectionState // Current state of the media connection (MediaConnectionState)meeting.meta.socketConnectionState // Current state of the socket connection (SocketConnectionState)
```

**Methods:**

Kotlin

```
// Sync active tab (for plugins or screen share)meeting.meta.syncTab(  id = "plugin-id-or-screenshare-id", // Identifier for unique plugin/screen share  tabType = ActiveTabType.PLUGIN // or ActiveTabType.SCREENSHARE)
```

The `meeting.meta` contains information about the meeting room itself.

**Properties:**

Swift

```
meeting.meta.meetingId // Meeting identifiermeeting.meta.meetingTitle // Meeting titlemeeting.meta.meetingStartedTimestamp // Meeting start timemeeting.meta.meetingType // Meeting type (.groupCall, .webinar, or .livestream)meeting.meta.meetingConfig // Meeting configuration containing audio and video settingsmeeting.meta.meetingState // State of the meeting (RtkMeetingState)meeting.meta.authToken // User's authentication token for the meetingmeeting.meta.selfActiveTab // Currently active tab for the local participant (ActiveTab?)meeting.meta.mediaConnectionState // Current state of the media connection (MediaConnectionState)meeting.meta.socketConnectionState // Current state of the socket connection (SocketConnectionState)
```

**Methods:**

Swift

```
// Sync active tab (for plugins or screen share)meeting.meta.syncTab(  id: "plugin-id-or-screenshare-id", // Identifier for unique plugin/screen share  tabType: .plugin // or .screenshare)
```

The `meeting.meta` contains information about the meeting room itself.

**Properties:**

Dart

```
meeting.meta.meetingId; // Meeting identifiermeeting.meta.meetingTitle; // Meeting titlemeeting.meta.meetingStartedTimeStamp; // Meeting start timemeeting.meta.meetingType; // Meeting type (groupCall, webinar, or livestream)meeting.meta.activeTab; // Currently active tab for the local participant (ActiveTab?)meeting.meta.designToken; // Design tokens for UI customization (RtkDesignTokens)
```

**Methods:**

Dart

```
// Sync active tab (for plugins or screen share)meeting.meta.syncTab(  "plugin-id-or-screenshare-id", // Identifier for unique plugin/screen share  RtkActiveTabType.plugin // or RtkActiveTabType.screenshare);
```

The [meeting.meta ↗](https://docs.realtime.cloudflare.com/mobile-core/reference/RTKMeta) contains information about the meeting room itself.

JavaScript

```
meeting.meta.meetingId; // Meeting identifiermeeting.meta.meetingTitle; // Meeting Titlemeeting.meta.meetingStartedTimestamp; // Meeting start time
```

## Chat

### `meeting.chat` \- Chat Messages

The [meeting.chat ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKChat) manages text messages, images, and files shared in the meeting.

JavaScript

```
// Get all chat messagesconst messages = meeting.chat.messages;
// Send a text messageawait meeting.chat.sendTextMessage("Hello everyone!");
// Send an imageawait meeting.chat.sendImageMessage(imageFile);
// Listen to chat messagesconsole.log("First message:", meeting.chat.messages[0]);
meeting.chat.on("chatUpdate", ({ message, messages }) => {  console.log(`Received message ${message}`);  console.log(`All messages in chat: ${messages.join(", ")}`);});
```

The [meeting.chat ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKChat) manages text messages, images, and files shared in the meeting.

JavaScript

```
// Get all chat messagesconst messages = meeting.chat.messages;
// Send a text messageawait meeting.chat.sendTextMessage("Hello everyone!");
// Send an imageawait meeting.chat.sendImageMessage(imageFile);
// Listen to chat messagesconsole.log("First message:", meeting.chat.messages[0]);
meeting.chat.on("chatUpdate", ({ message, messages }) => {  console.log(`Received message ${message}`);  console.log(`All messages in chat: ${messages.join(", ")}`);});
```

The [meeting.chat ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKChat) manages text messages, images, and files shared in the meeting.

JavaScript

```
// Get all chat messagesconst messages = meeting.chat.messages;
// Send a text messageawait meeting.chat.sendTextMessage("Hello everyone!");
// Send an imageawait meeting.chat.sendImageMessage(imageFile);
// Listen to chat messagesconsole.log("First message:", meeting.chat.messages[0]);
meeting.chat.on("chatUpdate", ({ message, messages }) => {  console.log(`Received message ${message}`);  console.log(`All messages in chat: ${messages.join(", ")}`);});
```

The `meeting.chat` manages text messages, images, and files shared in the meeting.

Kotlin

```
// Get all chat messagesval messages = meeting.chat.messages
// Send a text messageval message = "Hello everyone!"meeting.chat.sendTextMessage(message) // Returns ChatTextError if fails, null if successful
// Send an imagemeeting.chat.sendImageMessage(imageUri) { err ->  // Handle ChatFileError if any}
// Send a filemeeting.chat.sendFileMessage(fileUri) { err ->  // Handle ChatFileError if any}
// Listen to chat messagesmeeting.addChatEventListener(object : RtkChatEventListener {    override fun onChatUpdates(messages: List<ChatMessage>) {      // Called whenever there is a change in chat messages    }
    override fun onNewChatMessage(message: ChatMessage) {      // Called when a new chat message is shared    }
    override fun onMessageRateLimitReset() {      // Called when rate limit for sending messages is reset    }})
// Handle errorswhen (err) {  is ChatFileError.FileFormatNotAllowed -> {} // File format not allowed  is ChatFileError.PermissionDenied -> {} // No permission to send file  is ChatFileError.RateLimitBreached -> {} // Rate limit breached  is ChatFileError.ReadFailed -> {} // File could not be read  is ChatFileError.UploadFailed -> {} // File could not be uploaded  else -> {}}
```

The `meeting.chat` manages text messages, images, and files shared in the meeting.

Swift

```
// Get all chat messageslet messages = meeting.chat.messages
// Send a text messagelet message = "Hello everyone!"meeting.chat.sendTextMessage(message) // Returns ChatTextError if fails, nil if successful
// Send an imagemeeting.chat.sendImageMessage(imageUri) { err in  // Handle ChatFileError if any}
// Send a filemeeting.chat.sendFileMessage(fileUri) { err in  // Handle ChatFileError if any}
// Listen to chat messagesextension MeetingViewModel: RtkChatEventListener {    func onChatUpdates(messages: [ChatMessage]) {        // Called whenever there is a change in chat messages    }
    func onNewChatMessage(message: ChatMessage) {        // Called when a new chat message is shared    }
    func onMessageRateLimitReset() {        // Called when rate limit for sending messages is reset    }}
// Add listenermeeting.addChatEventListener(self)
// Handle errorsswitch err {case .fileFormatNotAllowed:    // File format not allowedcase .permissionDenied:    // No permission to send filecase .rateLimitBreached:    // Rate limit breachedcase .readFailed:    // File could not be readcase .uploadFailed:    // File could not be uploadeddefault:    break}
```

The `meeting.chat` manages text messages, images, and files shared in the meeting.

Dart

```
// Get all chat messagesfinal messages = meeting.chat.messages;
// Send a text messagefinal message = "Hello everyone!";meeting.chat.sendTextMessage(message); // Returns ChatTextError if fails, null if successful
// Send an imagemeeting.chat.sendImageMessage(imageUri, (err) {  // Handle ChatFileError if any});
// Send a filemeeting.chat.sendFileMessage(fileUri, (err) {  // Handle ChatFileError if any});
// Listen to chat messagesclass ChatListener extends RtkChatEventListener {  @override  void onChatUpdates(List<ChatMessage> messages) {    // Called whenever there is a change in chat messages  }
  @override  void onNewChatMessage(ChatMessage message) {    // Called when a new chat message is shared  }
  @override  void onMessageRateLimitReset() {    // Called when rate limit for sending messages is reset  }}
// Add listenerfinal chatListener = ChatListener();meeting.addChatEventListener(chatListener);
// Handle errorsswitch (err.runtimeType) {  case ChatFileError.FileFormatNotAllowed:    // File format not allowed    break;  case ChatFileError.PermissionDenied:    // No permission to send file    break;  case ChatFileError.RateLimitBreached:    // Rate limit breached    break;  case ChatFileError.ReadFailed:    // File could not be read    break;  case ChatFileError.UploadFailed:    // File could not be uploaded    break;  default:    break;}
```

The [meeting.chat ↗](https://docs.realtime.cloudflare.com/mobile-core/reference/RTKChat) manages text messages, images, and files shared in the meeting.

JavaScript

```
// Get all chat messagesconst messages = meeting.chat.messages;
// Send a text messageawait meeting.chat.sendTextMessage("Hello everyone!");
// Send an imageawait meeting.chat.sendImageMessage(imageFile);
// Listen to chat messagesconsole.log("First message:", meeting.chat.messages[0]);
meeting.chat.on("chatUpdate", ({ message, messages }) => {  console.log(`Received message ${message}`);  console.log(`All messages in chat: ${messages.join(", ")}`);});
```

## Polls

### `meeting.polls` \- Polls

The [meeting.polls ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKPolls) manages polls in the meeting.

JavaScript

```
// Get all pollsconst polls = meeting.polls.items;
// Create a pollawait meeting.polls.create(  "What time works best?", //question  ["9 AM", "2 PM", "5 PM"], // options  false, // anonymous  false, // hideVotes);
// Vote on a pollawait meeting.polls.vote(pollId, optionIndex); // Retrieve pollId from meeting.polls.items
```

The [meeting.polls ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKPolls) manages polls in the meeting.

JavaScript

```
// Get all pollsconst polls = meeting.polls.items;
// Create a pollawait meeting.polls.create(  "What time works best?", //question  ["9 AM", "2 PM", "5 PM"], // options  false, // anonymous  false, // hideVotes);
// Vote on a pollawait meeting.polls.vote(pollId, optionIndex); // Retrieve pollId from meeting.polls.items
```

The [meeting.polls ↗](https://docs.realtime.cloudflare.com/web-core/reference/RTKPolls) manages polls in the meeting.

JavaScript

```
// Get all pollsconst polls = meeting.polls.items;
// Create a pollawait meeting.polls.create(  "What time works best?", //question  ["9 AM", "2 PM", "5 PM"], // options  false, // anonymous  false, // hideVotes);
// Vote on a pollawait meeting.polls.vote(pollId, optionIndex); // Retrieve pollId from meeting.polls.items
```

The `meeting.polls` manages polls in the meeting.

Kotlin

```
// Get all pollsval polls = meeting.polls.items
// Create a pollval pollsCreateError: PollsError? = meeting.polls.create(  question = "What time works best?",  options = listOf("9 AM", "2 PM", "5 PM"),  anonymous = false,  hideVotes = false)
// Vote on a pollval poll: Poll = meeting.polls.items.first()val selectedPollOption: PollOption = poll.options.first()val pollsError: PollsError? = meeting.polls.vote(poll.id, selectedPollOption)
// Listen to poll updatesmeeting.addPollsEventListener(object : RtkPollsEventListener {    override fun onNewPoll(poll: Poll) {      // Called when a new poll is created    }
    override fun onPollUpdate(poll: Poll) {      // Called when a poll is updated (votes, details changed)    }
    override fun onPollUpdates(pollItems: List<Poll>) {      // Called when there are updates to the list of polls    }})
```

The `meeting.polls` manages polls in the meeting.

Swift

```
// Get all pollslet polls = meeting.polls.items
// Create a polllet pollsCreateError: PollsError? = meeting.polls.create(  question: "What time works best?",  options: ["9 AM", "2 PM", "5 PM"],  anonymous: false,  hideVotes: false)
// Vote on a polllet poll: Poll = meeting.polls.items.firstlet selectedPollOption: PollOption = poll.options.firstlet pollsError: PollsError? = meeting.polls.vote(poll.id, selectedPollOption)
// Listen to poll updatesextension MeetingViewModel: RtkPollsEventListener {    func onNewPoll(poll: Poll) {        // Called when a new poll is created    }
    func onPollUpdate(poll: Poll) {        // Called when a poll is updated (votes, details changed)    }
    func onPollUpdates(pollItems: [Poll]) {        // Called when there are updates to the list of polls    }}
// Add listenermeeting.addPollsEventListener(self)
```

The `meeting.polls` manages polls in the meeting.

Dart

```
// Get all pollsfinal polls = meeting.polls.items;
// Create a pollfinal pollsCreateError = meeting.polls.create(  question: "What time works best?",  options: ["9 AM", "2 PM", "5 PM"],  anonymous: false,  hideVotes: false);
// Vote on a pollfinal poll = meeting.polls.items.first;final selectedPollOption = poll.options.first;final pollsError = meeting.polls.vote(poll.id, selectedPollOption);
// Listen to poll updatesclass PollsListener extends RtkPollsEventListener {  @override  void onNewPoll(Poll poll) {    // Called when a new poll is created  }
  @override  void onPollUpdate(Poll poll) {    // Called when a poll is updated (votes, details changed)  }
  @override  void onPollUpdates(List<Poll> pollItems) {    // Called when there are updates to the list of polls  }}
// Add listenerfinal pollsListener = PollsListener();meeting.addPollsEventListener(pollsListener);
```

The [meeting.polls ↗](https://docs.realtime.cloudflare.com/mobile-core/reference/RTKPolls) manages polls in the meeting.

JavaScript

```
// Get all pollsconst polls = meeting.polls.items;
// Create a pollawait meeting.polls.create(  "What time works best?", //question  ["9 AM", "2 PM", "5 PM"], // options  false, // anonymous  false, // hideVotes);
// Vote on a pollawait meeting.polls.vote(pollId, optionIndex); // Retrieve pollId from meeting.polls.items
```

## Plugins

### `meeting.plugins` \- Plugins

The [meeting.plugins](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/) manages meeting plugins (collaborative apps). Activation lives on the `Plugin` object.

JavaScript

```
// Get all available pluginsconst allPlugins = meeting.plugins.all.toArray();
// Get active pluginsconst activePlugins = meeting.plugins.active.toArray();
// Activate a plugin for all participantsawait meeting.plugins.all.get(pluginId).activate();
// Deactivate a plugin for all participantsawait meeting.plugins.all.get(pluginId).deactivate();
```

The [meeting.plugins](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/) manages meeting plugins (collaborative apps). Activation lives on the `Plugin` object.

JavaScript

```
// Get all available pluginsconst allPlugins = meeting.plugins.all.toArray();
// Get active pluginsconst activePlugins = meeting.plugins.active.toArray();
// Activate a plugin for all participantsawait meeting.plugins.all.get(pluginId).activate();
// Deactivate a plugin for all participantsawait meeting.plugins.all.get(pluginId).deactivate();
```

The [meeting.plugins](https://developers.cloudflare.com/realtime/realtimekit/core/plugins/) manages meeting plugins (collaborative apps). Activation lives on the `Plugin` object.

JavaScript

```
// Get all available pluginsconst allPlugins = meeting.plugins.all.toArray();
// Get active pluginsconst activePlugins = meeting.plugins.active.toArray();
// Activate a plugin for all participantsawait meeting.plugins.all.get(pluginId).activate();
// Deactivate a plugin for all participantsawait meeting.plugins.all.get(pluginId).deactivate();
```

The `meeting.plugins` manages meeting plugins (collaborative apps).

Kotlin

```
// Get all available pluginsval plugins = meeting.plugins.all
// Get active pluginsval activePlugins = meeting.plugins.active
// Activate a pluginmeeting.plugins.all.first().activate()
// Deactivate a pluginmeeting.plugins.active.first().deactivate()
// Get plugin viewval pluginView = meeting.plugins.active.first().getPluginView() // Returns a WebView
// Send data to a pluginval pluginId = ""val plugin = meeting.plugins.active.firstOrNull { it.id == pluginId }plugin?.sendData(  eventName = "my-custom-event",  data = "Hello world")
// Upload file to a pluginplugin?.uploadFile(  RtkPluginFile(    resultCode = <activity-resultCode>,    data = Intent() // Intent with the file data  ))
// Listen to plugin eventsval pluginsEventListener = object : RtkPluginsEventListener {  override fun onPluginActivated(plugin: RtkPlugin) {    // Called when a plugin is activated  }
  override fun onPluginDeactivated(plugin: RtkPlugin) {    // Called when a plugin is deactivated  }
  override fun onPluginMessage(plugin: RtkPlugin, eventName: String, data: Any?) {    // Called when a plugin sends a message  }
  override fun onPluginFileRequest(plugin: RtkPlugin) {    // Called when a plugin requests a file  }}
meeting.addPluginsEventListener(pluginsEventListener)
```

The `meeting.plugins` manages meeting plugins (collaborative apps).

Swift

```
// Get all available pluginslet plugins = meeting.plugins.all
// Get active pluginslet activePlugins = meeting.plugins.active
// Activate a pluginmeeting.plugins.all.first?.activate()
// Deactivate a pluginmeeting.plugins.active.first?.deactivate()
// Get plugin viewlet pluginView = meeting.plugins.active.first?.getPluginView() // Returns a WKWebView
// Send data to a pluginlet pluginId = ""let plugin = meeting.plugins.active.first { $0.id == pluginId }plugin?.sendData(  eventName: "my-custom-event",  data: "Hello world")
// Listen to plugin eventsextension MeetingViewModel: RtkPluginsEventListener {    func onPluginActivated(plugin: RtkPlugin) {        // Called when a plugin is activated    }
    func onPluginDeactivated(plugin: RtkPlugin) {        // Called when a plugin is deactivated    }
    func onPluginMessage(plugin: RtkPlugin, eventName: String, data: Any?) {        // Called when a plugin sends a message    }
    func onPluginFileRequest(plugin: RtkPlugin) {        // Called when a plugin requests a file    }}
// Add listenermeeting.addPluginsEventListener(self)
```

The `meeting.plugins` manages meeting plugins (collaborative apps).

Dart

```
// Get all available pluginsfinal plugins = meeting.plugins.all;
// Get active pluginsfinal activePlugins = meeting.plugins.active;
// Activate a pluginmeeting.plugins.all.first.activate();
// Deactivate a pluginmeeting.plugins.active.first.deactivate();
// Get plugin viewfinal pluginView = meeting.plugins.active.first.getPluginView(); // Returns a Widget
// Send data to a pluginfinal pluginId = "";final plugin = meeting.plugins.active.firstWhere((p) => p.id == pluginId, orElse: () => null);plugin?.sendData(  eventName: "my-custom-event",  data: "Hello world");
// Listen to plugin eventsclass PluginsListener extends RtkPluginsEventListener {  @override  void onPluginActivated(RtkPlugin plugin) {    // Called when a plugin is activated  }
  @override  void onPluginDeactivated(RtkPlugin plugin) {    // Called when a plugin is deactivated  }
  @override  void onPluginMessage(RtkPlugin plugin, String eventName, dynamic data) {    // Called when a plugin sends a message  }
  @override  void onPluginFileRequest(RtkPlugin plugin) {    // Called when a plugin requests a file  }}
// Add listenerfinal pluginsListener = PluginsListener();meeting.addPluginsEventListener(pluginsListener);
```

The [meeting.plugins ↗](https://docs.realtime.cloudflare.com/mobile-core/reference/RTKPlugins) manages meeting plugins (collaborative apps).

JavaScript

```
// Get all available pluginsconst plugins = meeting.plugins.all;
// Activate a pluginawait meeting.plugins.activate(pluginId);
// Deactivate a pluginawait meeting.plugins.deactivate();
```

## AI features

### `meeting.ai` \- AI Features

The `meeting.ai` provides access to AI-powered features like live transcription.

JavaScript

```
// Access live transcriptionsmeeting.ai.transcripts; // Shows only when transcription is enabled in Preset
```

The `meeting.ai` provides access to AI-powered features like live transcription.

JavaScript

```
// Access live transcriptionsmeeting.ai.transcripts; // Shows only when transcription is enabled in Preset
```

The `meeting.ai` provides access to AI-powered features like live transcription.

JavaScript

```
// Access live transcriptionsmeeting.ai.transcripts; // Shows only when transcription is enabled in Preset
```

The `meeting.ai` provides access to AI-powered features like live transcription.

JavaScript

```
// Access live transcriptionsmeeting.ai.transcripts; // Shows only when transcription is enabled in Preset
```

`meeting.ai` is not supported on this mobile platform.

`meeting.ai` is not supported on this mobile platform.

`meeting.ai` is not supported on this mobile platform.

## Methods

Join or leave a meeting room:

JavaScript

```
// Join the meeting roomawait meeting.join(); // Emits a `roomJoined` event on `meeting.self` when successful
// Leave the meeting roomawait meeting.leave();
```

JavaScript

```
// Join the meeting roomawait meeting.join(); // Emits a `roomJoined` event on `meeting.self` when successful
// Leave the meeting roomawait meeting.leave();
```

JavaScript

```
// Join the meeting roomawait meeting.join(); // Emits a `roomJoined` event on `meeting.self` when successful
// Leave the meeting roomawait meeting.leave();
```

Kotlin

```
// Join the meeting roommeeting.joinRoom(  onSuccess = {    // Room Joined  },  onFailure = { err ->    // Handle error  })
// Leave the meeting roommeeting.leave(  onSuccess = {    // Room Left  },  onFailure = { err ->    // Handle error  })
```

Swift

```
// Join the meeting roommeeting.joinRoom(  onSuccess: {    // Room Joined  },  onFailure: { err in    // Handle error  })
// Leave the meeting roommeeting.leave(  onSuccess: {    // Room Left  },  onFailure: { err in    // Handle error  })
```

Dart

```
// Join the meeting roommeeting.joinRoom(  onSuccess: () {    // Room Joined  },  onFailure: (err) {    // Handle error  });
// Leave the meeting roommeeting.leave(  onSuccess: () {    // Room Left  },  onFailure: (err) {    // Handle error  });
```

JavaScript

```
// Join the meeting roomawait meeting.join(); // Emits a `roomJoined` event on `meeting.self` when successful
// Leave the meeting roomawait meeting.leave();
```

## Understanding IDs

RealtimeKit uses two types of identifiers for participants:

* **Session ID (`id`)**: Unique identifier for each connection to a meeting. Changes every time a participant joins a new session. On Web platforms, this is called "Peer ID" and stored in `meeting.self.id` or `participant.id`. On mobile platforms, this is called "Participant ID" and stored in `meeting.localUser.id` or `participant.id`.
* **User ID (`userId`)**: Persistent identifier for a participant across multiple sessions. Remains the same when a user reconnects. This is stored in `meeting.self.userId` (Web) or `meeting.localUser.userId` (Mobile), and `participant.userId` for remote participants.

**When to use each:**

* Use `userId` when you need to track the same user across different sessions or reconnections (for example, saving user preferences or permissions)
* Use `id` when working with the current session's connections (for example, managing active video streams or real-time participant states)

## Best Practices

* **Listen to events instead of polling**: The meeting object emits events when state changes occur. Subscribe to these events rather than continuously checking property values.
* **Work with participant collections**: On Web platforms, use `toArray()` to convert participant maps to arrays. On mobile platforms, participant collections are already lists that you can iterate through directly.
* **Check connection state**: Always check `roomJoined` (or `meeting.localUser.roomJoined` on mobile) before accessing properties or calling methods that require an active session.
* **Handle errors gracefully**: Many methods accept error callbacks. Always implement proper error handling to provide a good user experience.

## Next Steps

Now that you understand the meeting object structure, you can use it to build custom meeting experiences. The UI Kit components internally use this same meeting object to provide ready-to-use interfaces. In the next guide, we'll show you how to combine UI Kit components with direct meeting object access to create your own custom UI.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/#page","headline":"Meeting Object Explained · Cloudflare Realtime docs","description":"Explore the RealtimeKit meeting object and its namespaces for participants, chat, polls, and media.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/meeting-object-explained/","name":"Meeting Object Explained"}}]}
```
