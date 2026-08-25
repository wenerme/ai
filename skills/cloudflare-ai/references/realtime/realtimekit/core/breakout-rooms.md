---
description: Create and manage breakout rooms to split participants into smaller groups in RealtimeKit.
title: Breakout Rooms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Breakout Rooms

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/breakout-rooms/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

WebMobile

ReactWeb ComponentsAngular

Note

The breakout rooms feature, also known as connected meetings, is currently in beta, which means it is still being tested and evaluated, and may undergo some changes.

Breakout rooms allow participants of a meeting to split into smaller groups for targeted discussions and collaboration. With the rise of remote work and online learning, breakout rooms have become an essential tool for enhancing engagement and building community in virtual settings. They are an ideal choice for workshops, online classrooms, or when you need to speak privately with select participants outside the main meeting.

In RealtimeKit, breakout rooms are created as a separate meeting. Each breakout room is an independent meeting and can be managed like any other RealtimeKit meeting. RealtimeKit provides a set of SDK APIs to create, manage, and switch between breakout rooms.

## Key features

The following are some of the key features of RealtimeKit's breakout rooms:

* Manage permissions and privileges of hosts and participants using presets
* Hosts can create breakout rooms, assign participants, start and close the breakout rooms, and switch between rooms
* Participants can start and stop video, interact with other participants using chat and polls, and mute/unmute audio
* Record all breakout sessions individually like any other RealtimeKit meeting

## Roles in a breakout room

Roles in the breakout room are managed by presets.

### Host

Hosts can create breakout rooms, assign participants, start and close the breakout rooms, and switch between rooms.

### Participants

As a participant in a breakout room, you can:

* **Switch to Parent Meeting** \- Switch back to the main meeting (if you have the required permissions)
* **Switch Connected Meetings** \- Move from the main meeting to smaller, focused discussion groups (breakout rooms) for collaboration
* **Collaborate** \- Use tools such as chat and polls during breakout sessions

## Audio and video

Each breakout room functions as an independent meeting. When you switch to a breakout room from the main meeting, it automatically switches to the audio and video of the breakout session. You can mute or unmute your audio and start or stop your video at any time during the breakout session, just as you can in the main meeting.

When the breakout session ends, your audio and video automatically switch back to the main meeting.

* If your video was turned on during a breakout session, it will remain on when you return to the main session
* If your microphone was on during a breakout session, it will stay on when you return to the main session

## Recording breakout sessions

Each breakout session is a separate session. Each breakout session's recording is stored and managed separately, just like any other RealtimeKit meeting. For more information, refer to [Recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/).

## Breakout rooms management

Breakout rooms allow the participants to split into separate sessions. The host can create breakout rooms, assign participants, start and close the breakout rooms.

### Create presets

A preset is a set of permissions and UI configurations that are applied to hosts and participants. They determine the look, feel, and behavior of the breakout room.

For breakout rooms, you must provide the following permissions for hosts and participants in Connected Meetings:

#### Host

The host preset should have **Full Access** permission in Connected Meetings. This allows the host to:

* Create breakout rooms
* Assign participants to rooms
* Start and close breakout rooms
* Switch between rooms

#### Participants

You can choose to provide the following permissions to participants:

* **Switch Connected Meetings** \- Allows participants to move between breakout rooms
* **Switch to Parent Meeting** \- Allows participants to return to the main meeting

### Save the preset

1. Once you have made all the changes to your preset, click **Save**
2. Enter a name for your preset and click **Save**
3. Your preset is listed - click **Edit** to make any changes

### Create a meeting

Create a RealtimeKit meeting using the [Create meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/). This API returns a unique identifier for your meeting.

### Add participants

After creating the meeting, add each participant using the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/). The `presetName` created earlier must be passed in the body of the Add Participant API request.

### Validate permissions

Before creating breakout rooms, validate the permissions of the current participant to ensure that the participant has the required permissions to create breakout rooms. Incorrect permissions can lead to errors being thrown.

```js
// Check if breakout rooms are supported
const areBreakoutRoomsSupported = meeting.connectedMeetings.supportsConnectedMeetings;

// Check if any breakout rooms are already created
const areBreakoutRoomsActive = meeting.connectedMeetings.isActive;

// Check if the current participant has permission to create breakout rooms
const hasPermissionToCreateBreakoutRooms = meeting.self.permissions.connectedMeetings.canAlterConnectedMeetings;

// Check if the current participant has permission to switch to parent meeting
const hasPermissionToSwitchToParentMeeting = meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;

// Check if the current participant has permission to switch to connected meeting
const hasPermissionToSwitchToConnectedMeeting = meeting.self.permissions.connectedMeetings.canSwitchConnectedMeetings;
```

```js
// Check if breakout rooms are supported
const areBreakoutRoomsSupported = meeting.connectedMeetings.supportsConnectedMeetings;

// Check if any breakout rooms are already created
const areBreakoutRoomsActive = meeting.connectedMeetings.isActive;

// Check if the current participant has permission to create breakout rooms
const hasPermissionToCreateBreakoutRooms = meeting.self.permissions.connectedMeetings.canAlterConnectedMeetings;

// Check if the current participant has permission to switch to parent meeting
const hasPermissionToSwitchToParentMeeting = meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;

// Check if the current participant has permission to switch to connected meeting
const hasPermissionToSwitchToConnectedMeeting = meeting.self.permissions.connectedMeetings.canSwitchConnectedMeetings;
```

```js
// Check if breakout rooms are supported
const areBreakoutRoomsSupported = meeting.connectedMeetings.supportsConnectedMeetings;

// Check if any breakout rooms are already created
const areBreakoutRoomsActive = meeting.connectedMeetings.isActive;

// Check if the current participant has permission to create breakout rooms
const hasPermissionToCreateBreakoutRooms = meeting.self.permissions.connectedMeetings.canAlterConnectedMeetings;

// Check if the current participant has permission to switch to parent meeting
const hasPermissionToSwitchToParentMeeting = meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;

// Check if the current participant has permission to switch to connected meeting
const hasPermissionToSwitchToConnectedMeeting = meeting.self.permissions.connectedMeetings.canSwitchConnectedMeetings;
```

```kotlin
val connectedMeetings = meeting.connectedMeetings

// Check if breakout rooms are active
val areBreakoutRoomsActive = connectedMeetings.isActive

// Check permissions on the local participant
val permissions = meeting.self.permissions.connectedMeetings

// Check if the current participant has permission to create/alter breakout rooms
val hasPermissionToAlterBreakoutRooms = permissions.canAlterConnectedMeetings

// Check if the current participant has permission to switch between breakout rooms
val hasPermissionToSwitchConnectedMeetings = permissions.canSwitchConnectedMeetings

// Check if the current participant has permission to switch back to the parent meeting
val hasPermissionToSwitchToParentMeeting = permissions.canSwitchToParentMeeting
```

```swift
let connectedMeetings = meeting.connectedMeetings

// Check if breakout rooms are active
let areBreakoutRoomsActive = connectedMeetings.isActive

// Check permissions on the local participant
let permissions = meeting.self.permissions.connectedMeetings

// Check if the current participant has permission to create/alter breakout rooms
let hasPermissionToAlterBreakoutRooms = permissions.canAlterConnectedMeetings

// Check if the current participant has permission to switch between breakout rooms
let hasPermissionToSwitchConnectedMeetings = permissions.canSwitchConnectedMeetings

// Check if the current participant has permission to switch back to the parent meeting
let hasPermissionToSwitchToParentMeeting = permissions.canSwitchToParentMeeting
```

```tsx
const [meeting] = useRealtimeKitClient();

// Check if any breakout rooms are currently active
const areBreakoutRoomsActive = meeting?.connectedMeetings.isActive;

// Check whether the local participant can create, rename, or delete rooms and move any participant
const canAlterBreakoutRooms = meeting?.self.permissions.connectedMeetings.canAlterConnectedMeetings;

// Check whether the local participant can move themselves to any breakout room
const canSwitchRooms = meeting?.self.permissions.connectedMeetings.canSwitchConnectedMeetings;

// Check whether the local participant can return to the parent meeting
const canReturnToParent = meeting?.self.permissions.connectedMeetings.canSwitchToParentMeeting;
```

### Create breakout rooms

```js
const breakoutRooms = await meeting.connectedMeetings.createMeetings([
  { title: "Breakout Room 1" },
  { title: "Breakout Room 2" },
  { title: "Breakout Room 3" },
]);

console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

```js
const breakoutRooms = await meeting.connectedMeetings.createMeetings([
  { title: "Breakout Room 1" },
  { title: "Breakout Room 2" },
  { title: "Breakout Room 3" },
]);

console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

```js
const breakoutRooms = await meeting.connectedMeetings.createMeetings([
  { title: "Breakout Room 1" },
  { title: "Breakout Room 2" },
  { title: "Breakout Room 3" },
]);

console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

```kotlin
meeting.connectedMeetings.createMeetings(
    titles = listOf("Breakout Room 1", "Breakout Room 2", "Breakout Room 3")
) { result ->
    result.onSuccess { breakoutRooms ->
        val roomInfo = breakoutRooms.joinToString("\n") { "Id:: ${it.id} --- Title:: ${it.title}" }
        println("Created Breakout Rooms: $roomInfo")
    }.onFailure { error ->
        println("Failed to create breakout rooms: ${error.value.message}")
    }
}
```

`breakoutRooms` is a list of basic meeting information such as `id` and `title`. You can use the `id` of these objects to move participants to the breakout room.

```swift
meeting.connectedMeetings.createMeetings(titles: ["Breakout Room 1", "Breakout Room 2", "Breakout Room 3"]) { result in
    switch result {
    case .success(let breakoutRooms):
        let roomInfo = breakoutRooms.map { "Id:: \($0.id) --- Title:: \($0.title)" }.joined(separator: "\n")
        print("Created Breakout Rooms: \(roomInfo)")
    case .failure(let error):
        print("Failed to create breakout rooms: \(error.value.message)")
    }
}
```

`breakoutRooms` is an array of basic meeting information such as `id` and `title`. You can use the `id` of these objects to move participants to the breakout room.

```js
const breakoutRooms = await meeting.connectedMeetings.createMeetings([
  { title: "Breakout Room 1" },
  { title: "Breakout Room 2" },
  { title: "Breakout Room 3" },
]);

console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

### Retrieve list of breakout rooms and their participants

If there are more than one host in the room creating breakouts, you can retrieve consolidated list of breakout rooms using the following API.

```js
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms & participants in the UI. This API refetches the list of breakout rooms & participants, therefore can be considered the source of truth for breakout rooms & participants. It is advised to call this API, to get the latest list of breakout rooms & participants, if a lot of changes are in progress.

You can also listen to `stateUpdate` event to get the latest list of breakout rooms & participants, as they are updated in real-time.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});

  // Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
  console.log("Meetings List", meeting.connectedMeetings.meetings);
  console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
});
```

```js
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms & participants in the UI. This API refetches the list of breakout rooms & participants, therefore can be considered the source of truth for breakout rooms & participants. It is advised to call this API, to get the latest list of breakout rooms & participants, if a lot of changes are in progress.

You can also listen to `stateUpdate` event to get the latest list of breakout rooms & participants, as they are updated in real-time.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});

  // Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
  console.log("Meetings List", meeting.connectedMeetings.meetings);
  console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
});
```

```js
const breakoutRooms = await meeting.connectedMeetings.createMeetings([
  { title: "Breakout Room 1" },
  { title: "Breakout Room 2" },
  { title: "Breakout Room 3" },
]);

console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

```kotlin
meeting.connectedMeetings.getConnectedMeetings { result ->
    result.onSuccess { breakoutRoomsInfo ->
        println("Parent Meeting: ${breakoutRoomsInfo.parentMeeting}")
        println("Breakout Rooms: ${breakoutRoomsInfo.meetings}")
    }.onFailure { error ->
        println("Failed to fetch breakout rooms: ${error.value.message}")
    }
}
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms and participants in the UI. This API refetches the list of breakout rooms and participants, and can therefore be considered the source of truth. It is advised to call this API to get the latest state if a lot of changes are in progress.

You can also listen to the `onStateUpdate` event to receive real-time updates to the list of breakout rooms and participants.

```kotlin
meeting.addConnectedMeetingsEventListener(object : RtkConnectedMeetingsEventListener {
    override fun onStateUpdate(meetings: List<RtkConnectedMeeting>, parentMeeting: RtkConnectedMeeting?) {
        println("State updated. Meetings: $meetings, Parent: $parentMeeting")

        // Alternatively, access state directly from the connectedMeetings object
        println("Meetings List: ${meeting.connectedMeetings.meetings}")
        println("Parent Meeting: ${meeting.connectedMeetings.parentMeeting}")
    }

    override fun onChangingMeeting(meetingId: String) {}
    override fun onMeetingChanged(error: MeetingError?) {}
})
```

```swift
meeting.connectedMeetings.getConnectedMeetings { result in
    switch result {
    case .success(let breakoutRoomsInfo):
        print("Parent Meeting: \(String(describing: breakoutRoomsInfo.parentMeeting))")
        print("Breakout Rooms: \(breakoutRoomsInfo.meetings)")
    case .failure(let error):
        print("Failed to fetch breakout rooms: \(error.value.message)")
    }
}
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms and participants in the UI. This API refetches the list of breakout rooms and participants, and can therefore be considered the source of truth. It is advised to call this API to get the latest state if a lot of changes are in progress.

You can also listen to the `onStateUpdate` event to receive real-time updates to the list of breakout rooms and participants.

```swift
class MyListener: RtkConnectedMeetingsEventListener {
    func onStateUpdate(meetings: [RtkConnectedMeeting], parentMeeting: RtkConnectedMeeting?) {
        print("State updated. Meetings: \(meetings), Parent: \(String(describing: parentMeeting))")

        // Alternatively, access state directly from the connectedMeetings object
        print("Meetings List: \(meeting.connectedMeetings.meetings)")
        print("Parent Meeting: \(String(describing: meeting.connectedMeetings.parentMeeting))")
    }

    func onChangingMeeting(meetingId: String) {}
    func onMeetingChanged(error: MeetingError?) {}
}

meeting.addConnectedMeetingsEventListener(MyListener())
```

```js
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms & participants in the UI. This API refetches the list of breakout rooms & participants, therefore can be considered the source of truth for breakout rooms & participants. It is advised to call this API, to get the latest list of breakout rooms & participants, if a lot of changes are in progress.

You can also listen to `stateUpdate` event to get the latest list of breakout rooms & participants, as they are updated in real-time.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});

  // Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
  console.log("Meetings List", meeting.connectedMeetings.meetings);
  console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
});
```

### Move participants to breakout rooms

Once you have created breakout rooms, assign participants to the rooms.

```js
// Retrieve list of breakout rooms & participants
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();

/*
* You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.
* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.
*/

// Move participants to breakout rooms
const response = await meeting.connectedMeetings.moveParticipants(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved
);
```

```js
// Retrieve list of breakout rooms & participants
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();

/*
* You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.
* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.
*/

// Move participants to breakout rooms
const response = await meeting.connectedMeetings.moveParticipants(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved
);
```

```js
// Retrieve list of breakout rooms & participants
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();

/*
* You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.
* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.
*/

// Move participants to breakout rooms
const response = await meeting.connectedMeetings.moveParticipants(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved
);
```

```kotlin
// Retrieve list of breakout rooms & participants
meeting.connectedMeetings.getConnectedMeetings { result ->
    result.onSuccess { breakoutRoomsInfo ->
        /*
         * You can retrieve meetingIds and participantIds from breakoutRoomsInfo.
         * Based on where the participant currently is, decide the sourceMeetingId and targetMeetingId.
         */

        // Move participants to a breakout room
        meeting.connectedMeetings.moveParticipants(
            sourceMeetingId = "SOURCE_MEETING_ID",
            destinationMeetingId = "TARGET_MEETING_ID",
            participantIds = listOf("PARTICIPANT_ID_1", "PARTICIPANT_ID_2")
        ) { error ->
            if (error != null) {
                println("Failed to move participants: $error")
            } else {
                println("Participants moved successfully")
            }
        }
    }
}
```

```swift
// Retrieve list of breakout rooms & participants
meeting.connectedMeetings.getConnectedMeetings { result in
    switch result {
    case .success(let breakoutRoomsInfo):
        /*
         * You can retrieve meetingIds and participantIds from breakoutRoomsInfo.
         * Based on where the participant currently is, decide the fromMeetingId and toMeetingId.
         */

        // Move participants to a breakout room
        meeting.connectedMeetings.moveParticipants(
            sourceMeetingId: "SOURCE_MEETING_ID",
            destinationMeetingId: "TARGET_MEETING_ID",
            participantIds: ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"]
        ) { error in
            if let error = error {
                print("Failed to move participants: \(error)")
            } else {
                print("Participants moved successfully")
            }
        }
    case .failure(let error):
        print("Failed to fetch breakout rooms: \(error.value.message)")
    }
}
```

```js
// Retrieve list of breakout rooms & participants
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();

/*
* You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.
* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.
*/

// Move participants to breakout rooms
const response = await meeting.connectedMeetings.moveParticipants(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved
);
```

### Move participants, with a specific preset, to breakout rooms

Once you have created breakout rooms, assign participants to the rooms.

```js
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field
);
```

```js
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field
);
```

```js
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field
);
```

```kotlin
meeting.connectedMeetings.moveParticipantsWithCustomPreset(
    sourceMeetingId = "SOURCE_MEETING_ID",
    destinationMeetingId = "TARGET_MEETING_ID",
    participants = listOf(
        MoveParticipantPayload(id = "PARTICIPANT_ID_1", presetId = "PRESET_ID_1"),
        MoveParticipantPayload(id = "PARTICIPANT_ID_2", presetId = "PRESET_ID_2")
    )
) { error ->
    if (error != null) {
        println("Failed to move participants: $error")
    } else {
        println("Participants moved with custom preset successfully")
    }
}
```

```swift
meeting.connectedMeetings.moveParticipantsWithCustomPreset(
    sourceMeetingId: "SOURCE_MEETING_ID",
    destinationMeetingId: "TARGET_MEETING_ID",
    participants: [
        MoveParticipantPayload(id: "PARTICIPANT_ID_1", presetId: "PRESET_ID_1"),
        MoveParticipantPayload(id: "PARTICIPANT_ID_2", presetId: "PRESET_ID_2")
    ]
) { error in
    if let error = error {
        print("Failed to move participants: \(error)")
    } else {
        print("Participants moved with custom preset successfully")
    }
}
```

```js
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(
  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in
  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved
  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field
);
```

### Move local participant to breakout room

To move the local participant to a different breakout room or back to the parent meeting, use the same API as for moving other participants, but pass the local participant's ID. The local participant must have the appropriate permissions: `canSwitchConnectedMeetings` to switch between breakout rooms, or `canSwitchToParentMeeting` to return to the parent meeting, if the request was originated by the non-host local participant.

### Handle breakout room events

If a participant has been moved to a breakout room, the `changingMeeting` event is triggered, followed by the `meetingChanged` event. These events are also triggered when a participant switches between the main meeting and breakout rooms. Participants will autojoin the breakout room if they are assigned to it. You won't have to join meeting explicitly.

```js
// Listen to changingMeeting event to show a custom UI to indicate that a meeting switch is happening
meeting.connectedMeetings.on("changingMeeting", (meetingId) => {
	console.log("Switching to breakout room or main meeting with id: " + meetingId);
	console.log("Show a Custom UI to indicate that a meeting switch is happening");
});

// Listen to meetingChanged event to update the meeting object reference
meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
	console.log("Switched to breakout room or main meeting");
	console.log("Every action now should be performed on this meeting");
});
```

```js
// Listen to changingMeeting event to show a custom UI to indicate that a meeting switch is happening
meeting.connectedMeetings.on("changingMeeting", (meetingId) => {
	console.log("Switching to breakout room or main meeting with id: " + meetingId);
	console.log("Show a Custom UI to indicate that a meeting switch is happening");
});

// Listen to meetingChanged event to update the meeting object reference
meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
	console.log("Switched to breakout room or main meeting");
	console.log("Every action now should be performed on this meeting");
});
```

```js
// Listen to changingMeeting event to show a custom UI to indicate that a meeting switch is happening
meeting.connectedMeetings.on("changingMeeting", (meetingId) => {
	console.log("Switching to breakout room or main meeting with id: " + meetingId);
	console.log("Show a Custom UI to indicate that a meeting switch is happening");
});

// Listen to meetingChanged event to update the meeting object reference
meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
	console.log("Switched to breakout room or main meeting");
	console.log("Every action now should be performed on this meeting");
});
```

```kotlin
meeting.addConnectedMeetingsEventListener(object : RtkConnectedMeetingsEventListener {
    // Triggered when a meeting switch is initiated — use this to show a loading UI
    override fun onChangingMeeting(meetingId: String) {
        println("Switching to breakout room or main meeting with id: $meetingId")
        println("Show a custom UI to indicate that a meeting switch is happening")
    }

    // Triggered when the meeting switch is complete
    override fun onMeetingChanged(error: MeetingError?) {
        if (error != null) {
            println("Failed to switch meeting: $error")
        } else {
            println("Switched to breakout room or main meeting successfully")
        }
    }

    override fun onStateUpdate(meetings: List<RtkConnectedMeeting>, parentMeeting: RtkConnectedMeeting?) {}
})
```

```swift
class MyListener: RtkConnectedMeetingsEventListener {
    // Triggered when a meeting switch is initiated — use this to show a loading UI
    func onChangingMeeting(meetingId: String) {
        print("Switching to breakout room or main meeting with id: \(meetingId)")
        print("Show a custom UI to indicate that a meeting switch is happening")
    }

    // Triggered when the meeting switch is complete
    func onMeetingChanged(error: MeetingError?) {
        if let error = error {
            print("Failed to switch meeting: \(error)")
        } else {
            print("Switched to breakout room or main meeting successfully")
        }
    }

    func onStateUpdate(meetings: [RtkConnectedMeeting], parentMeeting: RtkConnectedMeeting?) {}
}

meeting.addConnectedMeetingsEventListener(MyListener())
```

The `useRealtimeKitClient` hook automatically handles the `meetingChanged` event and swaps the active client reference when the local participant is moved to a breakout room or back to the main meeting. No additional setup is needed.

If you are using the `RtkMeeting` UI Kit component, the transition UI (the "Joining…" screen) is also handled automatically.

To show a custom loading screen during the switch, listen to the `changingMeeting` event:

```tsx
useEffect(() => {
  if (!meeting) return;

  const onChangingMeeting = (meetingId: string) => {
    console.log("Switching to meeting:", meetingId);
    // Show a loading indicator
  };

  meeting.connectedMeetings.on("changingMeeting", onChangingMeeting);
  return () => meeting.connectedMeetings.removeListener("changingMeeting", onChangingMeeting);
}, [meeting]);
```

### Close breakout rooms

You can close/delete the breakout rooms. This will force participants in those meetings to come to the main room.

```js
await meeting.connectedMeetings.deleteMeetings([
  "MEETING_ID_TO_CLOSE_1",
  "MEETING_ID_TO_CLOSE_2",
]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});
});

// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
console.log("Meetings List", meeting.connectedMeetings.meetings);
console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

```js
await meeting.connectedMeetings.deleteMeetings([
  "MEETING_ID_TO_CLOSE_1",
  "MEETING_ID_TO_CLOSE_2",
]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});
});

// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
console.log("Meetings List", meeting.connectedMeetings.meetings);
console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

```js
await meeting.connectedMeetings.deleteMeetings([
  "MEETING_ID_TO_CLOSE_1",
  "MEETING_ID_TO_CLOSE_2",
]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});
});

// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
console.log("Meetings List", meeting.connectedMeetings.meetings);
console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

```kotlin
meeting.connectedMeetings.deleteMeetings(
    meetingIds = listOf("MEETING_ID_TO_CLOSE_1", "MEETING_ID_TO_CLOSE_2")
) { error ->
    if (error != null) {
        println("Failed to close breakout rooms: $error")
    } else {
        println("Breakout rooms closed successfully")
    }
}
```

This will also trigger the `onStateUpdate` event, updating the list of breakout rooms and participants.

```kotlin
meeting.addConnectedMeetingsEventListener(object : RtkConnectedMeetingsEventListener {
    override fun onStateUpdate(meetings: List<RtkConnectedMeeting>, parentMeeting: RtkConnectedMeeting?) {
        println("State updated. Meetings: $meetings, Parent: $parentMeeting")

        // Alternatively, access state directly from the connectedMeetings object
        println("Meetings List: ${meeting.connectedMeetings.meetings}")
        println("Parent Meeting: ${meeting.connectedMeetings.parentMeeting}")
    }

    override fun onChangingMeeting(meetingId: String) {}
    override fun onMeetingChanged(error: MeetingError?) {}
})
```

```swift
meeting.connectedMeetings.deleteMeetings(meetingIds: ["MEETING_ID_TO_CLOSE_1", "MEETING_ID_TO_CLOSE_2"]) { error in
    if let error = error {
        print("Failed to close breakout rooms: \(error)")
    } else {
        print("Breakout rooms closed successfully")
    }
}
```

This will also trigger the `onStateUpdate` event, updating the list of breakout rooms and participants.

```swift
class MyListener: RtkConnectedMeetingsEventListener {
    func onStateUpdate(meetings: [RtkConnectedMeeting], parentMeeting: RtkConnectedMeeting?) {
        print("State updated. Meetings: \(meetings), Parent: \(String(describing: parentMeeting))")

        // Alternatively, access state directly from the connectedMeetings object
        print("Meetings List: \(meeting.connectedMeetings.meetings)")
        print("Parent Meeting: \(String(describing: meeting.connectedMeetings.parentMeeting))")
    }

    func onChangingMeeting(meetingId: String) {}
    func onMeetingChanged(error: MeetingError?) {}
}

meeting.addConnectedMeetingsEventListener(MyListener())
```

```js
await meeting.connectedMeetings.deleteMeetings([
  "MEETING_ID_TO_CLOSE_1",
  "MEETING_ID_TO_CLOSE_2",
]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

```js
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {
  console.log("stateUpdate", {meetings, parentMeeting});
});

// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object
console.log("Meetings List", meeting.connectedMeetings.meetings);
console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

## Next steps

You have successfully integrated breakout rooms into your RealtimeKit application. Participants can now:

* Join the main meeting
* Be assigned to breakout rooms by the host
* Switch between the main meeting and breakout rooms
* Collaborate in smaller focused groups

For more advanced customization, explore the following:

* [UI Kit Components Library](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/) \- Browse available components
* [UI Kit States](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/state-management/) \- Learn how components synchronize
* [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/) \- Create custom meeting interfaces

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/breakout-rooms/#page","headline":"Breakout Rooms · Cloudflare Realtime docs","description":"Create and manage breakout rooms to split participants into smaller groups in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/breakout-rooms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
