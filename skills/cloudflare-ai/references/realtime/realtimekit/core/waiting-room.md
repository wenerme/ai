---
description: Control meeting access with a waiting room that requires host approval in RealtimeKit.
title: Waiting Room
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  Waiting Room

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/core/waiting-room/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Prerequisites

This page assumes you've already initialized the SDK and understand the meeting object structure. Refer to [Initialize SDK](https://developers.cloudflare.com/realtime/realtimekit/core/) and [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) if needed.

The waiting room feature allows hosts to control who can join a meeting. When enabled, participants must wait for approval before entering the meeting.

WebMobile

ReactWeb ComponentsAngular

## How the Waiting Room Works

After you call `meeting.join()`, one of two events will occur:

* **`roomJoined`** \- You are allowed to join the meeting immediately
* **`waitlisted`** \- You are placed in the waiting room and must wait for host approval

Use `meeting.self.roomState` to track the user's state in the meeting.

Note

The diagram below represents only waiting room-related states. The `roomState` property also transitions through other states like `'disconnected'`, `'left'`, `'kicked'`, and `'ended'`.

## Waiting Room States

### State Flow

```plaintext
        join()
          ↓
    [waitlisted]  ←------ (host rejects)
          ↓                     ↓
   (host accepts)           [rejected]
          ↓
      [joined]
```

## Listening to State Changes

### Joined Event

Triggered when the local user successfully joins the meeting.

Monitor when the local user joins the meeting:

```jsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";
import { useEffect } from "react";

function MeetingStatus() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);
	const joined = roomState === "joined";

	useEffect(() => {
		if (joined) {
			console.log("Successfully joined the meeting");
		}
	}, [joined]);

	return joined ? <div>You are in the meeting</div> : null;
}
```

Alternatively, use event listeners:

```jsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

useEffect(() => {
	if (!meeting) return;

	const handleRoomJoined = () => {
		console.log("Successfully joined the meeting");
	};

	meeting.self.on("roomJoined", handleRoomJoined);

	return () => {
		meeting.self.off("roomJoined", handleRoomJoined);
	};
}, [meeting]);
```

```js
meeting.self.on("roomJoined", () => {
	// Local user is in the meeting
	console.log("Successfully joined the meeting");
});
```

```kotlin
meeting.addMeetingRoomEventListener(object : RtkMeetingRoomEventListener {
	override fun onMeetingRoomJoinCompleted(meeting: RealtimeKitClient) {
		// Local user is in the meeting
	}
})
```

```swift
extension MeetingViewModel: RtkMeetingRoomEventListener {
	func onMeetingRoomJoinCompleted(meeting: RealtimeKitClient) {
		// Local user is in the meeting
	}
}
```

```dart
class MeetingRoomNotifier extends RtkMeetingRoomEventListener {
	@override
	void onMeetingRoomJoinCompleted() {
		// Local user is in the meeting
	}
}

meeting.addMeetingRoomEventListener(MeetingRoomNotifier());
```

Monitor when the local user joins the meeting:

```tsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";
import { useEffect } from "react";

function MeetingStatus() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);
	const joined = roomState === "joined";

	useEffect(() => {
		if (joined) {
			console.log("Successfully joined the meeting");
		}
	}, [joined]);

	return joined ? <Text>You are in the meeting</Text> : null;
}
```

Alternatively, use event listeners:

```tsx
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react-native";

useEffect(() => {
	if (!meeting) return;

	const handleRoomJoined = () => {
		console.log("Successfully joined the meeting");
	};

	meeting.self.on("roomJoined", handleRoomJoined);

	return () => {
		meeting.self.off("roomJoined", handleRoomJoined);
	};
}, [meeting]);
```

### Waitlisted Event

Triggered when the local user is placed in the waiting room.

Monitor when the local user is in the waiting room:

```jsx
function WaitingRoomStatus() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);
	const isWaitlisted = roomState === "waitlisted";

	useEffect(() => {
		if (isWaitlisted) {
			console.log("You are in the waiting room");
		}
	}, [isWaitlisted]);

	return isWaitlisted ? <div>Waiting for host approval...</div> : null;
}
```

Alternatively, use event listeners:

```jsx
useEffect(() => {
	if (!meeting) return;

	const handleWaitlisted = () => {
		console.log("You are in the waiting room");
	};

	meeting.self.on("waitlisted", handleWaitlisted);

	return () => {
		meeting.self.off("waitlisted", handleWaitlisted);
	};
}, [meeting]);
```

```js
meeting.self.on("waitlisted", () => {
	// Local user is waitlisted
	console.log("You are in the waiting room. Waiting for host approval...");
});
```

```kotlin
meeting.addSelfEventListener(object : RtkSelfEventListener {
	override fun onWaitListStatusUpdate(waitListStatus: WaitListStatus) {
		when (waitListStatus) {
			WAITING -> {
				// Local user is in the waiting room
			}
			REJECTED -> {
				// Local user's join room request was rejected by the host
			}
			NONE, ACCEPTED -> {
				// Local user is not in the wait list or was already accepted
			}
		}
	}
})
```

```swift
extension MeetingViewModel: RtkSelfEventListener {
	func onWaitListStatusUpdate(waitListStatus: WaitListStatus) {
		switch waitListStatus {
		case .accepted:
			// Local user's join room request was accepted by the host
		case .waiting:
			// Local user is in the waiting room
		case .rejected:
			// Local user's join room request was rejected by the host
		default:
			return .none
		}
	}
}
```

```dart
class WaitingRoomNotifier extends RtkSelfEventListener {
	@override
	void onWaitListStatusUpdate(WaitlistStatus waitListStatus) {
		switch (waitListStatus) {
			case WaitlistStatus.waiting:
			// Local user is in the waiting room
			case WaitlistStatus.rejected:
			// Local user's join room request was rejected by the host
			case WaitlistStatus.accepted:
			// Local user's join room request was accepted by the host
			default:
				break;
		}
	}
}

meeting.addSelfEventListener(WaitingRoomNotifier());
```

Monitor when the local user is in the waiting room:

```tsx
function WaitingRoomStatus() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);
	const isWaitlisted = roomState === "waitlisted";

	useEffect(() => {
		if (isWaitlisted) {
			console.log("You are in the waiting room");
		}
	}, [isWaitlisted]);

	return isWaitlisted ? <Text>Waiting for host approval...</Text> : null;
}
```

Alternatively, use event listeners:

```tsx
useEffect(() => {
	if (!meeting) return;

	const handleWaitlisted = () => {
		console.log("You are in the waiting room");
	};

	meeting.self.on("waitlisted", handleWaitlisted);

	return () => {
		meeting.self.off("waitlisted", handleWaitlisted);
	};
}, [meeting]);
```

### Rejected Event

Triggered when the host rejects the entry request.

Monitor when the host rejects the entry request:

```jsx
function RejectionStatus() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);
	const rejected = roomState === "rejected";

	useEffect(() => {
		if (rejected) {
			console.log("Your entry request was rejected");
		}
	}, [rejected]);

	return rejected ? <div>Your entry was rejected by the host</div> : null;
}
```

Alternatively, use event listeners:

```jsx
useEffect(() => {
	if (!meeting) return;

	const handleRoomLeft = ({ state }) => {
		if (state === "rejected") {
			console.log("Your entry request was rejected");
		}
	};

	meeting.self.on("roomLeft", handleRoomLeft);

	return () => {
		meeting.self.off("roomLeft", handleRoomLeft);
	};
}, [meeting]);
```

```js
meeting.self.on("roomLeft", ({ state }) => {
	if (state === "rejected") {
		// Host rejected the entry
		console.log("Your entry request was rejected");
	}
});
```

When the host rejects the entry request, the `onWaitListStatusUpdate` callback is triggered with `WaitListStatus.REJECTED`:

```kotlin
meeting.addSelfEventListener(object : RtkSelfEventListener {
	override fun onWaitListStatusUpdate(waitListStatus: WaitListStatus) {
		when (waitListStatus) {
			WaitListStatus.REJECTED -> {
				// Local user's join room request was rejected by the host
				Log.d("WaitingRoom", "Your entry request was rejected")
			}
			WaitListStatus.WAITING -> {
				// Local user is in the waiting room
			}
			WaitListStatus.ACCEPTED, WaitListStatus.NONE -> {
				// Local user was accepted or not in waitlist
			}
		}
	}
})
```

When the host rejects the entry request, the `onWaitListStatusUpdate` callback is triggered with `WaitListStatus.rejected`:

```swift
extension MeetingViewModel: RtkSelfEventListener {
	func onWaitListStatusUpdate(waitListStatus: WaitListStatus) {
		switch waitListStatus {
		case .rejected:
			// Local user's join room request was rejected by the host
			print("Your entry request was rejected")
		case .waiting:
			// Local user is in the waiting room
			break
		case .accepted:
			// Local user's join room request was accepted by the host
			break
		default:
			break
		}
	}
}
```

When the host rejects the entry request, the `onWaitListStatusUpdate` callback is triggered with `WaitlistStatus.rejected`:

```dart
class WaitingRoomNotifier extends RtkSelfEventListener {
	@override
	void onWaitListStatusUpdate(WaitlistStatus waitListStatus) {
		switch (waitListStatus) {
			case WaitlistStatus.rejected:
				// Local user's join room request was rejected by the host
				print("Your entry request was rejected");
			case WaitlistStatus.waiting:
				// Local user is in the waiting room
				break;
			case WaitlistStatus.accepted:
				// Local user's join room request was accepted by the host
				break;
			default:
				break;
		}
	}
}

meeting.addSelfEventListener(WaitingRoomNotifier());
```

Monitor when the host rejects the entry request:

```tsx
function RejectionStatus() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);
	const rejected = roomState === "rejected";

	useEffect(() => {
		if (rejected) {
			console.log("Your entry request was rejected");
		}
	}, [rejected]);

	return rejected ? <Text>Your entry was rejected by the host</Text> : null;
}
```

Alternatively, use event listeners:

```tsx
useEffect(() => {
	if (!meeting) return;

	const handleRoomLeft = ({ state }) => {
		if (state === "rejected") {
			console.log("Your entry request was rejected");
		}
	};

	meeting.self.on("roomLeft", handleRoomLeft);

	return () => {
		meeting.self.off("roomLeft", handleRoomLeft);
	};
}, [meeting]);
```

### Monitor State with roomState

You can also directly check the current room state.

Handle all waiting room states in one component:

```jsx
function WaitingRoomManager() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);

	switch (roomState) {
		case "init":
			return <div>Connecting...</div>;
		case "waitlisted":
			return <div>Waiting for host approval...</div>;
		case "joined":
			return <div>You are in the meeting</div>;
		case "rejected":
			return <div>Your entry was rejected</div>;
		case "left":
			return <div>You left the meeting</div>;
		case "kicked":
			return <div>You were removed from the meeting</div>;
		case "ended":
			return <div>The meeting has ended</div>;
		case "disconnected":
			return <div>Connection lost</div>;
		default:
			return null;
	}
}
```

```js
const currentState = meeting.self.roomState;

if (currentState === "waitlisted") {
	console.log("Waiting for approval");
} else if (currentState === "joined") {
	console.log("In the meeting");
} else if (currentState === "rejected") {
	console.log("Entry was rejected");
}
```

Use the event listeners shown above to monitor state changes.

Use the event listeners shown above to monitor state changes.

Use the event listeners shown above to monitor state changes.

Handle all waiting room states in one component:

```tsx
function WaitingRoomManager() {
	const roomState = useRealtimeKitSelector((m) => m.self.roomState);

	switch (roomState) {
		case "init":
			return <Text>Connecting...</Text>;
		case "waitlisted":
			return <Text>Waiting for host approval...</Text>;
		case "joined":
			return <Text>You are in the meeting</Text>;
		case "rejected":
			return <Text>Your entry was rejected</Text>;
		case "left":
			return <Text>You left the meeting</Text>;
		case "kicked":
			return <Text>You were removed from the meeting</Text>;
		case "ended":
			return <Text>The meeting has ended</Text>;
		case "disconnected":
			return <Text>Connection lost</Text>;
		default:
			return null;
	}
}
```

## Host Actions

Hosts can manage waiting room requests using participant management methods. See [Remote Participants](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/) for details on:

* **`acceptWaitingRoomRequest(participantId)`** \- Accept a participant from the waiting room
* **`rejectWaitingRoomRequest(participantId)`** \- Reject a participant's entry request

### Example: Host Accepting Participants

```jsx
import {
	useRealtimeKitClient,
	useRealtimeKitSelector,
} from "@cloudflare/realtimekit-react";

function WaitingRoomHost() {
	const [meeting] = useRealtimeKitClient();
	const waitlistedParticipants = useRealtimeKitSelector((m) =>
		m.participants.waitlisted.toArray(),
	);

	const acceptParticipant = async (participantId) => {
		await meeting.participants.acceptWaitingRoomRequest(participantId);
	};

	const rejectParticipant = async (participantId) => {
		await meeting.participants.rejectWaitingRoomRequest(participantId);
	};

	return (
		<div>
			<h3>Waiting Room ({waitlistedParticipants.length})</h3>
			{waitlistedParticipants.map((participant) => (
				<div key={participant.id}>
					<span>{participant.name}</span>
					<button onClick={() => acceptParticipant(participant.id)}>
						Accept
					</button>
					<button onClick={() => rejectParticipant(participant.id)}>
						Reject
					</button>
				</div>
			))}
		</div>
	);
}
```

```js
// Get waitlisted participants
const waitlistedParticipants = meeting.participants.waitlisted.toArray();

// Accept the first waitlisted participant
if (waitlistedParticipants.length > 0) {
	const participantId = waitlistedParticipants[0].id;
	await meeting.participants.acceptWaitingRoomRequest(participantId);
}
```

```kotlin
// Get waitlisted participants
val waitlistedParticipants = meeting.participants.waitlisted

// Accept a participant from the waiting room
if (waitlistedParticipants.isNotEmpty()) {
	val participant = waitlistedParticipants[0]
	meeting.participants.acceptWaitingRoomRequest(participant.id)
}

// Reject a participant's entry request
if (waitlistedParticipants.isNotEmpty()) {
	val participant = waitlistedParticipants[0]
	meeting.participants.rejectWaitingRoomRequest(participant.id)
}

// Listen for waiting room events
meeting.addWaitlistEventListener(object : RtkWaitlistEventListener {
	override fun onWaitListParticipantJoined(participant: RtkRemoteParticipant) {
		// Called when a new participant joins the waiting room
	}

	override fun onWaitListParticipantAccepted(participant: RtkRemoteParticipant) {
		// Called when a waitlisted participant is accepted into the meeting
	}

	override fun onWaitListParticipantRejected(participant: RtkRemoteParticipant) {
		// Called when a waitlisted participant is denied entry
	}

	override fun onWaitListParticipantClosed(participant: RtkRemoteParticipant) {
		// Called when a waitlisted participant leaves the waiting room
	}
})
```

```swift
// Get waitlisted participants
let waitlistedParticipants = meeting.participants.waitlisted

// Accept a participant from the waiting room
if let participant = waitlistedParticipants.first {
	meeting.participants.acceptWaitingRoomRequest(id: participant.id)
}

// Reject a participant's entry request
if let participant = waitlistedParticipants.first {
	meeting.participants.rejectWaitingRoomRequest(participant.id)
}

// Listen for waiting room events
extension MeetingViewModel: RtkWaitlistEventListener {
	func onWaitListParticipantJoined(participant: RtkRemoteParticipant) {
		// Called when a new participant joins the waiting room
	}

	func onWaitListParticipantAccepted(participant: RtkRemoteParticipant) {
		// Called when a waitlisted participant is accepted into the meeting
	}

	func onWaitListParticipantRejected(participant: RtkRemoteParticipant) {
		// Called when a waitlisted participant is denied entry
	}

	func onWaitListParticipantClosed(participant: RtkRemoteParticipant) {
		// Called when a waitlisted participant leaves the waiting room
	}
}
```

```dart
// Get waitlisted participants
final waitlistedParticipants = meeting.participants.waitlisted;

// Accept a participant from the waiting room
if (waitlistedParticipants.isNotEmpty) {
	final participant = waitlistedParticipants[0];
	meeting.participants.acceptWaitlistedParticipant(participant);
}

// Reject a participant's entry request
if (waitlistedParticipants.isNotEmpty) {
	final participant = waitlistedParticipants[0];
	meeting.participants.rejectWaitlistedParticipant(participant);
}

// Accept all waitlisted participants at once
meeting.participants.acceptAllWaitingRoomRequests();

// Listen for waiting room events
class WaitlistStatusNotifier extends RtkWaitlistEventListener {
	@override
	void onWaitListParticipantJoined(RtkRemoteParticipant participant) {
		// Called when a new participant joins the waiting room
	}

	@override
	void onWaitListParticipantAccepted(RtkRemoteParticipant participant) {
		// Called when a waitlisted participant is accepted into the meeting
	}

	@override
	void onWaitListParticipantRejected(RtkRemoteParticipant participant) {
		// Called when a waitlisted participant is denied entry
	}

	@override
	void onWaitListParticipantClosed(RtkRemoteParticipant participant) {
		// Called when a waitlisted participant leaves the waiting room
	}
}

meeting.addWaitlistEventListener(WaitlistStatusNotifier());
```

```tsx
import {
	useRealtimeKitClient,
	useRealtimeKitSelector,
} from "@cloudflare/realtimekit-react-native";
import { View, Text, Button } from "react-native";

function WaitingRoomHost() {
	const [meeting] = useRealtimeKitClient();
	const waitlistedParticipants = useRealtimeKitSelector((m) =>
		m.participants.waitlisted.toArray(),
	);

	const acceptParticipant = async (participantId) => {
		await meeting.participants.acceptWaitingRoomRequest(participantId);
	};

	const rejectParticipant = async (participantId) => {
		await meeting.participants.rejectWaitingRoomRequest(participantId);
	};

	return (
		<View>
			<Text>Waiting Room ({waitlistedParticipants.length})</Text>
			{waitlistedParticipants.map((participant) => (
				<View key={participant.id}>
					<Text>{participant.name}</Text>
					<Button
						title="Accept"
						onPress={() => acceptParticipant(participant.id)}
					/>
					<Button
						title="Reject"
						onPress={() => rejectParticipant(participant.id)}
					/>
				</View>
			))}
		</View>
	);
}
```

## Best Practices

* **Provide Clear Feedback** \- Show users when they're in the waiting room and that they're waiting for approval
* **Set Expectations** \- Let users know their request is being reviewed
* **Handle Rejection Gracefully** \- Provide a friendly message if entry is rejected
* **Monitor State Changes** \- Subscribe to room state changes to update your UI accordingly
* **Check Permissions** \- Ensure your app has appropriate permissions configured in the preset to use waiting room features

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/waiting-room/#page","headline":"Waiting Room · Cloudflare Realtime docs","description":"Control meeting access with a waiting room that requires host approval in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/waiting-room/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
