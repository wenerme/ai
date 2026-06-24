---
title: Breakout Rooms
description: Create and manage breakout rooms to split participants into smaller groups in RealtimeKit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Breakout Rooms

WebMobile

ReactWeb ComponentsAngular

Note

The breakout rooms feature, also known as connected meetings, is currently in beta, which means it is still being tested and evaluated, and may undergo some changes.

Breakout rooms allow participants of a meeting to split into smaller groups for targeted discussions and collaboration. With the rise of remote work and online learning, breakout rooms have become an essential tool for enhancing engagement and building community in virtual settings. They are an ideal choice for workshops, online classrooms, or when you need to speak privately with select participants outside the main meeting.

Note

Breakout rooms are currently supported on web only.

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

JavaScript

```
// Check if breakout rooms are supportedconst areBreakoutRoomsSupported = meeting.connectedMeetings.supportsConnectedMeetings;
// Check if any breakout rooms are already createdconst areBreakoutRoomsActive = meeting.connectedMeetings.isActive;
// Check if the current participant has permission to create breakout roomsconst hasPermissionToCreateBreakoutRooms = meeting.self.permissions.connectedMeetings.canAlterConnectedMeetings;
// Check if the current participant has permission to switch to parent meetingconst hasPermissionToSwitchToParentMeeting = meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;
// Check if the current participant has permission to switch to connected meetingconst hasPermissionToSwitchToConnectedMeeting = meeting.self.permissions.connectedMeetings.canSwitchConnectedMeetings;
```

JavaScript

```
// Check if breakout rooms are supportedconst areBreakoutRoomsSupported = meeting.connectedMeetings.supportsConnectedMeetings;
// Check if any breakout rooms are already createdconst areBreakoutRoomsActive = meeting.connectedMeetings.isActive;
// Check if the current participant has permission to create breakout roomsconst hasPermissionToCreateBreakoutRooms = meeting.self.permissions.connectedMeetings.canAlterConnectedMeetings;
// Check if the current participant has permission to switch to parent meetingconst hasPermissionToSwitchToParentMeeting = meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;
// Check if the current participant has permission to switch to connected meetingconst hasPermissionToSwitchToConnectedMeeting = meeting.self.permissions.connectedMeetings.canSwitchConnectedMeetings;
```

JavaScript

```
// Check if breakout rooms are supportedconst areBreakoutRoomsSupported = meeting.connectedMeetings.supportsConnectedMeetings;
// Check if any breakout rooms are already createdconst areBreakoutRoomsActive = meeting.connectedMeetings.isActive;
// Check if the current participant has permission to create breakout roomsconst hasPermissionToCreateBreakoutRooms = meeting.self.permissions.connectedMeetings.canAlterConnectedMeetings;
// Check if the current participant has permission to switch to parent meetingconst hasPermissionToSwitchToParentMeeting = meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;
// Check if the current participant has permission to switch to connected meetingconst hasPermissionToSwitchToConnectedMeeting = meeting.self.permissions.connectedMeetings.canSwitchConnectedMeetings;
```

Kotlin

```
val connectedMeetings = meeting.connectedMeetings
// Check if breakout rooms are activeval areBreakoutRoomsActive = connectedMeetings.isActive
// Check permissions on the local participantval permissions = meeting.self.permissions.connectedMeetings
// Check if the current participant has permission to create/alter breakout roomsval hasPermissionToAlterBreakoutRooms = permissions.canAlterConnectedMeetings
// Check if the current participant has permission to switch between breakout roomsval hasPermissionToSwitchConnectedMeetings = permissions.canSwitchConnectedMeetings
// Check if the current participant has permission to switch back to the parent meetingval hasPermissionToSwitchToParentMeeting = permissions.canSwitchToParentMeeting
```

Swift

```
let connectedMeetings = meeting.connectedMeetings
// Check if breakout rooms are activelet areBreakoutRoomsActive = connectedMeetings.isActive
// Check permissions on the local participantlet permissions = meeting.self.permissions.connectedMeetings
// Check if the current participant has permission to create/alter breakout roomslet hasPermissionToAlterBreakoutRooms = permissions.canAlterConnectedMeetings
// Check if the current participant has permission to switch between breakout roomslet hasPermissionToSwitchConnectedMeetings = permissions.canSwitchConnectedMeetings
// Check if the current participant has permission to switch back to the parent meetinglet hasPermissionToSwitchToParentMeeting = permissions.canSwitchToParentMeeting
```

### Create breakout rooms

JavaScript

```
const breakoutRooms = await meeting.connectedMeetings.createMeetings([  { title: "Breakout Room 1" },  { title: "Breakout Room 2" },  { title: "Breakout Room 3" },]);
console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

JavaScript

```
const breakoutRooms = await meeting.connectedMeetings.createMeetings([  { title: "Breakout Room 1" },  { title: "Breakout Room 2" },  { title: "Breakout Room 3" },]);
console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

JavaScript

```
const breakoutRooms = await meeting.connectedMeetings.createMeetings([  { title: "Breakout Room 1" },  { title: "Breakout Room 2" },  { title: "Breakout Room 3" },]);
console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

Kotlin

```
meeting.connectedMeetings.createMeetings(    titles = listOf("Breakout Room 1", "Breakout Room 2", "Breakout Room 3")) { result ->    result.onSuccess { breakoutRooms ->        val roomInfo = breakoutRooms.joinToString("\n") { "Id:: ${it.id} --- Title:: ${it.title}" }        println("Created Breakout Rooms: $roomInfo")    }.onFailure { error ->        println("Failed to create breakout rooms: ${error.value.message}")    }}
```

`breakoutRooms` is a list of basic meeting information such as `id` and `title`. You can use the `id` of these objects to move participants to the breakout room.

Swift

```
meeting.connectedMeetings.createMeetings(titles: ["Breakout Room 1", "Breakout Room 2", "Breakout Room 3"]) { result in    switch result {    case .success(let breakoutRooms):        let roomInfo = breakoutRooms.map { "Id:: \($0.id) --- Title:: \($0.title)" }.joined(separator: "\n")        print("Created Breakout Rooms: \(roomInfo)")    case .failure(let error):        print("Failed to create breakout rooms: \(error.value.message)")    }}
```

`breakoutRooms` is an array of basic meeting information such as `id` and `title`. You can use the `id` of these objects to move participants to the breakout room.

### Retrieve list of breakout rooms and their participants

If there are more than one host in the room creating breakouts, you can retrieve consolidated list of breakout rooms using the following API.

JavaScript

```
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms & participants in the UI. This API refetches the list of breakout rooms & participants, therefore can be considered the source of truth for breakout rooms & participants. It is advised to call this API, to get the latest list of breakout rooms & participants, if a lot of changes are in progress.

You can also listen to `stateUpdate` event to get the latest list of breakout rooms & participants, as they are updated in real-time.

JavaScript

```
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {  console.log("stateUpdate", {meetings, parentMeeting});
  // Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object  console.log("Meetings List", meeting.connectedMeetings.meetings);  console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);});
```

JavaScript

```
const breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms & participants in the UI. This API refetches the list of breakout rooms & participants, therefore can be considered the source of truth for breakout rooms & participants. It is advised to call this API, to get the latest list of breakout rooms & participants, if a lot of changes are in progress.

You can also listen to `stateUpdate` event to get the latest list of breakout rooms & participants, as they are updated in real-time.

JavaScript

```
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {  console.log("stateUpdate", {meetings, parentMeeting});
  // Alternatively, you can access the meetings and parentMeeting from the connectedMeetings object  console.log("Meetings List", meeting.connectedMeetings.meetings);  console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);});
```

JavaScript

```
const breakoutRooms = await meeting.connectedMeetings.createMeetings([  { title: "Breakout Room 1" },  { title: "Breakout Room 2" },  { title: "Breakout Room 3" },]);
console.log("Created Breakout Rooms: ", breakoutRooms.map((room) => "Id:: " + room.id + " --- Title:: " + room.title).join("\n"));
```

`breakoutRooms` is an array of basic meeting information such as id and title. You can use the `id` of these objects to move participants to the breakout room.

Kotlin

```
meeting.connectedMeetings.getConnectedMeetings { result ->    result.onSuccess { breakoutRoomsInfo ->        println("Parent Meeting: ${breakoutRoomsInfo.parentMeeting}")        println("Breakout Rooms: ${breakoutRoomsInfo.meetings}")    }.onFailure { error ->        println("Failed to fetch breakout rooms: ${error.value.message}")    }}
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms and participants in the UI. This API refetches the list of breakout rooms and participants, and can therefore be considered the source of truth. It is advised to call this API to get the latest state if a lot of changes are in progress.

You can also listen to the `onStateUpdate` event to receive real-time updates to the list of breakout rooms and participants.

Kotlin

```
meeting.addConnectedMeetingsEventListener(object : RtkConnectedMeetingsEventListener {    override fun onStateUpdate(meetings: List<RtkConnectedMeeting>, parentMeeting: RtkConnectedMeeting?) {        println("State updated. Meetings: $meetings, Parent: $parentMeeting")
        // Alternatively, access state directly from the connectedMeetings object        println("Meetings List: ${meeting.connectedMeetings.meetings}")        println("Parent Meeting: ${meeting.connectedMeetings.parentMeeting}")    }
    override fun onChangingMeeting(meetingId: String) {}    override fun onMeetingChanged(error: MeetingError?) {}})
```

Swift

```
meeting.connectedMeetings.getConnectedMeetings { result in    switch result {    case .success(let breakoutRoomsInfo):        print("Parent Meeting: \(String(describing: breakoutRoomsInfo.parentMeeting))")        print("Breakout Rooms: \(breakoutRoomsInfo.meetings)")    case .failure(let error):        print("Failed to fetch breakout rooms: \(error.value.message)")    }}
```

`breakoutRoomsInfo` is an object containing the list of breakout rooms and their participants, along with details of the parent meeting.

This data can be used to display the list of breakout rooms and participants in the UI. This API refetches the list of breakout rooms and participants, and can therefore be considered the source of truth. It is advised to call this API to get the latest state if a lot of changes are in progress.

You can also listen to the `onStateUpdate` event to receive real-time updates to the list of breakout rooms and participants.

Swift

```
class MyListener: RtkConnectedMeetingsEventListener {    func onStateUpdate(meetings: [RtkConnectedMeeting], parentMeeting: RtkConnectedMeeting?) {        print("State updated. Meetings: \(meetings), Parent: \(String(describing: parentMeeting))")
        // Alternatively, access state directly from the connectedMeetings object        print("Meetings List: \(meeting.connectedMeetings.meetings)")        print("Parent Meeting: \(String(describing: meeting.connectedMeetings.parentMeeting))")    }
    func onChangingMeeting(meetingId: String) {}    func onMeetingChanged(error: MeetingError?) {}}
meeting.addConnectedMeetingsEventListener(MyListener())
```

### Move participants to breakout rooms

Once you have created breakout rooms, assign participants to the rooms.

JavaScript

```
// Retrieve list of breakout rooms & participantsconst breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
/** You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.*/
// Move participants to breakout roomsconst response = await meeting.connectedMeetings.moveParticipants(  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved);
```

JavaScript

```
// Retrieve list of breakout rooms & participantsconst breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
/** You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.*/
// Move participants to breakout roomsconst response = await meeting.connectedMeetings.moveParticipants(  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved);
```

JavaScript

```
// Retrieve list of breakout rooms & participantsconst breakoutRoomsInfo = await meeting.connectedMeetings.getConnectedMeetings();
/** You can retrieve meetingIds and participantIds from the breakoutRoomsInfo object.* Based on where the participant currently is, you can decide the sourceMeetingId and targetMeetingId.*/
// Move participants to breakout roomsconst response = await meeting.connectedMeetings.moveParticipants(  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved  ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"], // participantIds, array of participant ids to be moved);
```

Kotlin

```
// Retrieve list of breakout rooms & participantsmeeting.connectedMeetings.getConnectedMeetings { result ->    result.onSuccess { breakoutRoomsInfo ->        /*         * You can retrieve meetingIds and participantIds from breakoutRoomsInfo.         * Based on where the participant currently is, decide the sourceMeetingId and targetMeetingId.         */
        // Move participants to a breakout room        meeting.connectedMeetings.moveParticipants(            sourceMeetingId = "SOURCE_MEETING_ID",            destinationMeetingId = "TARGET_MEETING_ID",            participantIds = listOf("PARTICIPANT_ID_1", "PARTICIPANT_ID_2")        ) { error ->            if (error != null) {                println("Failed to move participants: $error")            } else {                println("Participants moved successfully")            }        }    }}
```

Swift

```
// Retrieve list of breakout rooms & participantsmeeting.connectedMeetings.getConnectedMeetings { result in    switch result {    case .success(let breakoutRoomsInfo):        /*         * You can retrieve meetingIds and participantIds from breakoutRoomsInfo.         * Based on where the participant currently is, decide the fromMeetingId and toMeetingId.         */
        // Move participants to a breakout room        meeting.connectedMeetings.moveParticipants(            sourceMeetingId: "SOURCE_MEETING_ID",            destinationMeetingId: "TARGET_MEETING_ID",            participantIds: ["PARTICIPANT_ID_1", "PARTICIPANT_ID_2"]        ) { error in            if let error = error {                print("Failed to move participants: \(error)")            } else {                print("Participants moved successfully")            }        }    case .failure(let error):        print("Failed to fetch breakout rooms: \(error.value.message)")    }}
```

### Move participants, with a specific preset, to breakout rooms

Once you have created breakout rooms, assign participants to the rooms.

JavaScript

```
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field);
```

JavaScript

```
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field);
```

JavaScript

```
const response = await meeting.connectedMeetings.moveParticipantsWithCustomPreset(  "SOURCE_MEETING_ID", // sourceMeetingId, meeting id where participants are currently in  "TARGET_MEETING_ID", // targetMeetingId, meeting id where participants are to be moved  [{ presetId: "PRESET_ID_1" }, { presetId: "PRESET_ID_2" }], // array of objects with presetId field);
```

Kotlin

```
meeting.connectedMeetings.moveParticipantsWithCustomPreset(    sourceMeetingId = "SOURCE_MEETING_ID",    destinationMeetingId = "TARGET_MEETING_ID",    participants = listOf(        MoveParticipantPayload(id = "PARTICIPANT_ID_1", presetId = "PRESET_ID_1"),        MoveParticipantPayload(id = "PARTICIPANT_ID_2", presetId = "PRESET_ID_2")    )) { error ->    if (error != null) {        println("Failed to move participants: $error")    } else {        println("Participants moved with custom preset successfully")    }}
```

Swift

```
meeting.connectedMeetings.moveParticipantsWithCustomPreset(    sourceMeetingId: "SOURCE_MEETING_ID",    destinationMeetingId: "TARGET_MEETING_ID",    participants: [        MoveParticipantPayload(id: "PARTICIPANT_ID_1", presetId: "PRESET_ID_1"),        MoveParticipantPayload(id: "PARTICIPANT_ID_2", presetId: "PRESET_ID_2")    ]) { error in    if let error = error {        print("Failed to move participants: \(error)")    } else {        print("Participants moved with custom preset successfully")    }}
```

### Move local participant to breakout room

To move the local participant to a different breakout room or back to the parent meeting, use the same API as for moving other participants, but pass the local participant's ID. The local participant must have the appropriate permissions: `canSwitchConnectedMeetings` to switch between breakout rooms, or `canSwitchToParentMeeting` to return to the parent meeting, if the request was originated by the non-host local participant.

### Handle breakout room events

If a participant has been moved to a breakout room, the `changingMeeting` event is triggered, followed by the `meetingChanged` event. These events are also triggered when a participant switches between the main meeting and breakout rooms. Participants will autojoin the breakout room if they are assigned to it. You won't have to join meeting explicitly.

JavaScript

```
// Listen to changingMeeting event to show a custom UI to indicate that a meeting switch is happeningmeeting.connectedMeetings.on("changingMeeting", (meetingId) => {  console.log("Switching to breakout room or main meeting with id: " + meetingId);  console.log("Show a Custom UI to indicate that a meeting switch is happening");});
// Listen to meetingChanged event to update the meeting object referencemeeting.connectedMeetings.on("meetingChanged", (newMeeting) => {  console.log("Switched to breakout room or main meeting");  console.log("Every action now should be performed on this meeting");});
```

JavaScript

```
// Listen to changingMeeting event to show a custom UI to indicate that a meeting switch is happeningmeeting.connectedMeetings.on("changingMeeting", (meetingId) => {  console.log("Switching to breakout room or main meeting with id: " + meetingId);  console.log("Show a Custom UI to indicate that a meeting switch is happening");});
// Listen to meetingChanged event to update the meeting object referencemeeting.connectedMeetings.on("meetingChanged", (newMeeting) => {  console.log("Switched to breakout room or main meeting");  console.log("Every action now should be performed on this meeting");});
```

JavaScript

```
// Listen to changingMeeting event to show a custom UI to indicate that a meeting switch is happeningmeeting.connectedMeetings.on("changingMeeting", (meetingId) => {  console.log("Switching to breakout room or main meeting with id: " + meetingId);  console.log("Show a Custom UI to indicate that a meeting switch is happening");});
// Listen to meetingChanged event to update the meeting object referencemeeting.connectedMeetings.on("meetingChanged", (newMeeting) => {  console.log("Switched to breakout room or main meeting");  console.log("Every action now should be performed on this meeting");});
```

Kotlin

```
meeting.addConnectedMeetingsEventListener(object : RtkConnectedMeetingsEventListener {    // Triggered when a meeting switch is initiated — use this to show a loading UI    override fun onChangingMeeting(meetingId: String) {        println("Switching to breakout room or main meeting with id: $meetingId")        println("Show a custom UI to indicate that a meeting switch is happening")    }
    // Triggered when the meeting switch is complete    override fun onMeetingChanged(error: MeetingError?) {        if (error != null) {            println("Failed to switch meeting: $error")        } else {            println("Switched to breakout room or main meeting successfully")        }    }
    override fun onStateUpdate(meetings: List<RtkConnectedMeeting>, parentMeeting: RtkConnectedMeeting?) {}})
```

Swift

```
class MyListener: RtkConnectedMeetingsEventListener {    // Triggered when a meeting switch is initiated — use this to show a loading UI    func onChangingMeeting(meetingId: String) {        print("Switching to breakout room or main meeting with id: \(meetingId)")        print("Show a custom UI to indicate that a meeting switch is happening")    }
    // Triggered when the meeting switch is complete    func onMeetingChanged(error: MeetingError?) {        if let error = error {            print("Failed to switch meeting: \(error)")        } else {            print("Switched to breakout room or main meeting successfully")        }    }
    func onStateUpdate(meetings: [RtkConnectedMeeting], parentMeeting: RtkConnectedMeeting?) {}}
meeting.addConnectedMeetingsEventListener(MyListener())
```

### Close breakout rooms

You can close/delete the breakout rooms. This will force participants in those meetings to come to the main room.

JavaScript

```
await meeting.connectedMeetings.deleteMeetings([  "MEETING_ID_TO_CLOSE_1",  "MEETING_ID_TO_CLOSE_2",]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

JavaScript

```
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {  console.log("stateUpdate", {meetings, parentMeeting});});
// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings objectconsole.log("Meetings List", meeting.connectedMeetings.meetings);console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

JavaScript

```
await meeting.connectedMeetings.deleteMeetings([  "MEETING_ID_TO_CLOSE_1",  "MEETING_ID_TO_CLOSE_2",]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

JavaScript

```
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {  console.log("stateUpdate", {meetings, parentMeeting});});
// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings objectconsole.log("Meetings List", meeting.connectedMeetings.meetings);console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

JavaScript

```
await meeting.connectedMeetings.deleteMeetings([  "MEETING_ID_TO_CLOSE_1",  "MEETING_ID_TO_CLOSE_2",]);
```

This would also trigger `stateUpdate` event updating the list of breakout rooms & participants.

JavaScript

```
meeting.connectedMeetings.on("stateUpdate", ({meetings, parentMeeting}) => {  console.log("stateUpdate", {meetings, parentMeeting});});
// Alternatively, you can access the meetings and parentMeeting from the connectedMeetings objectconsole.log("Meetings List", meeting.connectedMeetings.meetings);console.log("Parent Meeting", meeting.connectedMeetings.parentMeeting);
```

Kotlin

```
meeting.connectedMeetings.deleteMeetings(    meetingIds = listOf("MEETING_ID_TO_CLOSE_1", "MEETING_ID_TO_CLOSE_2")) { error ->    if (error != null) {        println("Failed to close breakout rooms: $error")    } else {        println("Breakout rooms closed successfully")    }}
```

This will also trigger the `onStateUpdate` event, updating the list of breakout rooms and participants.

Kotlin

```
meeting.addConnectedMeetingsEventListener(object : RtkConnectedMeetingsEventListener {    override fun onStateUpdate(meetings: List<RtkConnectedMeeting>, parentMeeting: RtkConnectedMeeting?) {        println("State updated. Meetings: $meetings, Parent: $parentMeeting")
        // Alternatively, access state directly from the connectedMeetings object        println("Meetings List: ${meeting.connectedMeetings.meetings}")        println("Parent Meeting: ${meeting.connectedMeetings.parentMeeting}")    }
    override fun onChangingMeeting(meetingId: String) {}    override fun onMeetingChanged(error: MeetingError?) {}})
```

Swift

```
meeting.connectedMeetings.deleteMeetings(meetingIds: ["MEETING_ID_TO_CLOSE_1", "MEETING_ID_TO_CLOSE_2"]) { error in    if let error = error {        print("Failed to close breakout rooms: \(error)")    } else {        print("Breakout rooms closed successfully")    }}
```

This will also trigger the `onStateUpdate` event, updating the list of breakout rooms and participants.

Swift

```
class MyListener: RtkConnectedMeetingsEventListener {    func onStateUpdate(meetings: [RtkConnectedMeeting], parentMeeting: RtkConnectedMeeting?) {        print("State updated. Meetings: \(meetings), Parent: \(String(describing: parentMeeting))")
        // Alternatively, access state directly from the connectedMeetings object        print("Meetings List: \(meeting.connectedMeetings.meetings)")        print("Parent Meeting: \(String(describing: meeting.connectedMeetings.parentMeeting))")    }
    func onChangingMeeting(meetingId: String) {}    func onMeetingChanged(error: MeetingError?) {}}
meeting.addConnectedMeetingsEventListener(MyListener())
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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/breakout-rooms/#page","headline":"Breakout Rooms · Cloudflare Realtime docs","description":"Create and manage breakout rooms to split participants into smaller groups in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/breakout-rooms/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/breakout-rooms/","name":"Breakout Rooms"}}]}
```
