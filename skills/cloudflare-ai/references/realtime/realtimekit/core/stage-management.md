---
description: Manage webinar stage access and publish permissions in RealtimeKit meetings.
title: Stage Management
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Stage Management

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide explains how to use stage management APIs for Webinar (WebRTC) use cases in Cloudflare RealtimeKit.

WebMobile

ReactWeb ComponentsAngular

Instead of a traditional publish-subscribe model, where a user can publish their media and others can choose to subscribe, RealtimeKit comes with an optional managed configuration. In this managed configuration, a less privileged user can be configured with a default behavior to not publish media. The user can then request permission to be allowed to publish their media, where a privileged user can choose to grant or deny access.

Using RealtimeKit's stage management APIs, a user can perform actions such as:

* Leave and join stage
* Manage stage requests and permissions
* Kick participants

## Access the Stage APIs

The stage module can be accessed under the `meeting.stage` namespace.

```jsx
console.log("Stage object:", meeting.stage);
```

```typescript
console.log("Stage object:", meeting.stage);
```

```js
console.log("Stage object:", meeting.stage);
```

```kotlin
Log.d("Stage", "Stage object: ${meeting.stage}")
```

```swift
print("Stage object: \(meeting.stage)")
```

```dart
print("Stage object: ${meeting.stage}");
```

```tsx
console.log("Stage object:", meeting.stage);
```

## Properties

### Status

The `meeting.stage.status` property returns the current stage status of the local user.

```jsx
console.log("Stage status:", meeting.stage.status);
```

```typescript
console.log("Stage status:", meeting.stage.status);
```

```js
console.log("Stage status:", meeting.stage.status);
```

```kotlin
Log.d("Stage", "Stage status: ${meeting.stage.stageStatus}")
```

```swift
print("Stage status: \(meeting.stage.stageStatus)")
```

```dart
print("Stage status: ${meeting.stage.status}");
```

```tsx
console.log("Stage status:", meeting.stage.status);
```

**Possible status values:**

* **`ON_STAGE`** \- The user is currently on the stage and sharing audio and video.
* **`OFF_STAGE`** \- The user is viewing the session but is not on the stage and is not sharing audio or video.
* **`REQUESTED_TO_JOIN_STAGE`** \- The user has a pending request to join the stage and share audio and video. This status remains until the host accepts or rejects the request.
* **`ACCEPTED_TO_JOIN_STAGE`** \- The host has accepted the user's request to join the stage.

Note

A user with permission to join stage directly can only assume `ON_STAGE` and `ACCEPTED_TO_JOIN_STAGE` status values.

## Host Controls

RealtimeKit's stage management APIs allow hosts to receive and manage stage requests as well as leave and join the stage.

### Join Stage

This method connects the user to the media room, enabling them to interact with other peers in the meeting.

```jsx
await meeting.stage.join();
```

```typescript
await meeting.stage.join();
```

```js
await meeting.stage.join();
```

```kotlin
meeting.stage.join()
```

```swift
meeting.stage.join()
```

```dart
meeting.stage.join();
```

```tsx
await meeting.stage.join();
```

### Leave Stage

By employing this method, the user will be disconnected from the media room and subsequently unable to communicate with their peers. Additionally, their audio and video will no longer be visible to others in the room.

```jsx
await meeting.stage.leave();
```

```typescript
await meeting.stage.leave();
```

```js
await meeting.stage.leave();
```

```kotlin
meeting.stage.leave()
```

```swift
meeting.stage.leave()
```

```dart
meeting.stage.leave();
```

```tsx
await meeting.stage.leave();
```

### Grant Access

A privileged user can grant access to stage for a set of users with the `grantAccess` method.

```jsx
await meeting.stage.grantAccess(userIds);
```

```typescript
await meeting.stage.grantAccess(userIds);
```

```js
await meeting.stage.grantAccess(userIds);
```

```kotlin
meeting.stage.grantAccess(userIds)
```

```swift
meeting.stage.grantAccess(userIds: userIds)
```

```dart
meeting.stage.grantAccess(userIds);
```

```tsx
await meeting.stage.grantAccess(userIds);
```

**Parameters:**

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`List<String>`) - List of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.map { it.userId }`

* `userIds` (`[String]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.map { $0.userId }`

* `userIds` (`List<String>`) - List of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.map((p) => p.userId).toList()`

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

### Deny Access

A privileged user can deny access to stage for a set of users with the `denyAccess` method.

```jsx
await meeting.stage.denyAccess(userIds);
```

```typescript
await meeting.stage.denyAccess(userIds);
```

```js
await meeting.stage.denyAccess(userIds);
```

```kotlin
meeting.stage.denyAccess(userIds)
```

```swift
meeting.stage.denyAccess(userIds: userIds)
```

```dart
meeting.stage.denyAccess(userIds);
```

```tsx
await meeting.stage.denyAccess(userIds);
```

**Parameters:**

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`List<String>`) - List of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.map { it.userId }`

* `userIds` (`[String]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.map { $0.userId }`

* `userIds` (`List<String>`) - List of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.map((p) => p.userId).toList()`

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

### Kick Users

A privileged user can remove a set of users from stage using the `kick` method.

```jsx
await meeting.stage.kick(userIds);
```

```typescript
await meeting.stage.kick(userIds);
```

```js
await meeting.stage.kick(userIds);
```

```kotlin
meeting.stage.kick(userIds)
```

```swift
meeting.stage.kick(userIds: userIds)
```

```dart
meeting.stage.kick(userIds);
```

```tsx
await meeting.stage.kick(userIds);
```

**Parameters:**

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`List<String>`) - List of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.map { it.userId }`

* `userIds` (`[String]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.map { $0.userId }`

* `userIds` (`List<String>`) - List of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.map((p) => p.userId).toList()`

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

## Participant Controls

RealtimeKit's stage management APIs allow participants to request and manage stage access.

### Request Access

This method is used to create a new stage request which can be approved by the host. Each user (viewer or host) must call this method in order to join the stage.

When the host calls this method, their status will be updated to `ACCEPTED_TO_JOIN_STAGE`.

```jsx
await meeting.stage.requestAccess();
```

```typescript
await meeting.stage.requestAccess();
```

```js
await meeting.stage.requestAccess();
```

```kotlin
meeting.stage.requestAccess()
```

```swift
meeting.stage.requestAccess()
```

```dart
meeting.stage.requestAccess();
```

```tsx
await meeting.stage.requestAccess();
```

### Cancel Access Request

You can call this method to cancel your stage request.

```jsx
await meeting.stage.cancelRequestAccess();
```

```typescript
await meeting.stage.cancelRequestAccess();
```

```js
await meeting.stage.cancelRequestAccess();
```

```kotlin
meeting.stage.cancelRequestAccess()
```

```swift
meeting.stage.cancelRequestAccess()
```

```dart
meeting.stage.cancelRequestAccess();
```

```tsx
await meeting.stage.cancelRequestAccess();
```

## Events

The `meeting.stage` module emits the following events:

### Stage Access Requests Updated

Emitted when there is an update to stage access requests.

```jsx
meeting.stage.on("stageAccessRequestUpdate", (data) => {
	console.log("Stage access request updated:", data);
});
```

Alternatively, you can use React hooks to listen for stage updates:

```jsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";

// useRealtimeKitSelector hook only works when `RealtimeKitProvider` is used.
const stageStatus = useRealtimeKitSelector((m) => m.stage.status);
```

```typescript
meeting.stage.on("stageAccessRequestUpdate", (data) => {
	console.log("Stage access request updated:", data);
});
```

```js
meeting.stage.on("stageAccessRequestUpdate", (data) => {
	console.log("Stage access request updated:", data);
});
```

```kotlin
meeting.addStageEventListener(object : RtkStageEventListener {
	override fun onStageAccessRequestsUpdated(accessRequests: List<RtkRemoteParticipant>) {
		// Stage access requests list updated
		Log.d("Stage", "Access requests updated: ${accessRequests.size}")
	}
})
```

```swift
extension WebinarViewModel: RtkStageEventListener {
	func onStageAccessRequestsUpdated(accessRequests: [RtkRemoteParticipant]) {
		// Stage access requests list updated
		print("Access requests updated: \(accessRequests.count)")
	}
}
```

```dart
class StageEventListener extends RtkStageEventListener {
	@override
	void onStageAccessRequestsUpdated(List<RtkRemoteParticipant> accessRequests) {
		// Stage access requests list updated
		print("Access requests updated: ${accessRequests.length}");
	}
}

meeting.addStageEventListener(StageEventListener());
```

```tsx
meeting.stage.on("stageAccessRequestUpdate", (data) => {
	console.log("Stage access request updated:", data);
});
```

Alternatively, you can use React hooks to listen for stage updates:

```tsx
import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";

// useRealtimeKitSelector hook only works when `RealtimeKitProvider` is used.
const stageStatus = useRealtimeKitSelector((m) => m.stage.status);
```

### Stage Access Request Accepted

Emitted when the host accepts the join stage request or invites a user directly to stage.

```jsx
meeting.stage.on("acceptPresentRequests", (data) => {
	console.log("Present requests accepted:", data);
});
```

```typescript
meeting.stage.on("acceptPresentRequests", (data) => {
	console.log("Present requests accepted:", data);
});
```

```js
meeting.stage.on("acceptPresentRequests", (data) => {
	console.log("Present requests accepted:", data);
});
```

```kotlin
meeting.addStageEventListener(object : RtkStageEventListener {
	override fun onStageAccessRequestAccepted() {
		// Host accepted the join stage request or invited user directly to stage
		Log.d("Stage", "Access request accepted")
	}
})
```

```swift
extension WebinarViewModel: RtkStageEventListener {
	func onStageAccessRequestAccepted() {
		// Host accepted the join stage request or invited user directly to stage
		print("Access request accepted")
	}
}
```

```dart
class StageEventListener extends RtkStageEventListener {
	@override
	void onStageAccessRequestAccepted() {
		// Host accepted the join stage request or invited user directly to stage
		print("Access request accepted");
	}
}

meeting.addStageEventListener(StageEventListener());
```

```tsx
meeting.stage.on("acceptPresentRequests", (data) => {
	console.log("Present requests accepted:", data);
});
```

### Stage Status Updated

Emitted when the local user's stage status changes.

```jsx
meeting.stage.on("stageStatusUpdate", (status) => {
	console.log("Stage status updated:", status);
});
```

```typescript
meeting.stage.on("stageStatusUpdate", (status) => {
	console.log("Stage status updated:", status);
});
```

```js
meeting.stage.on("stageStatusUpdate", (status) => {
	console.log("Stage status updated:", status);
});
```

```kotlin
meeting.addStageEventListener(object : RtkStageEventListener {
	override fun onStageStatusUpdated(oldStatus: StageStatus, newStatus: StageStatus) {
		// Local user's stage status changed
		Log.d("Stage", "Status updated from $oldStatus to $newStatus")
	}
})
```

```swift
extension WebinarViewModel: RtkStageEventListener {
	func onStageStatusUpdated(oldStatus: StageStatus, newStatus: StageStatus) {
		// Local user's stage status changed
		print("Status updated from \(oldStatus) to \(newStatus)")
	}
}
```

```dart
class StageEventListener extends RtkStageEventListener {
	@override
	void onStageStatusUpdated(StageStatus oldStatus, StageStatus newStatus) {
		// Local user's stage status changed
		print("Status updated from $oldStatus to $newStatus");
	}
}

meeting.addStageEventListener(StageEventListener());
```

```tsx
meeting.stage.on("stageStatusUpdate", (status) => {
	console.log("Stage status updated:", status);
});
```

### New Stage Request

Emitted when a new participant requests to join the stage.

```jsx
meeting.stage.on("newStageRequest", (request) => {
	console.log("New stage request:", request);
});
```

```typescript
meeting.stage.on("newStageRequest", (request) => {
	console.log("New stage request:", request);
});
```

```js
meeting.stage.on("newStageRequest", (request) => {
	console.log("New stage request:", request);
});
```

```kotlin
meeting.addStageEventListener(object : RtkStageEventListener {
	override fun onNewStageAccessRequest(participant: RtkRemoteParticipant) {
		// New participant requested to join the stage
		Log.d("Stage", "New stage request from: ${participant.name}")
	}
})
```

```swift
extension WebinarViewModel: RtkStageEventListener {
	func onNewStageAccessRequest(participant: RtkRemoteParticipant) {
		// New participant requested to join the stage
		print("New stage request from: \(participant.name)")
	}
}
```

```dart
class StageEventListener extends RtkStageEventListener {
	@override
	void onNewStageAccessRequest(RtkRemoteParticipant participant) {
		// New participant requested to join the stage
		print("New stage request from: ${participant.name}");
	}
}

meeting.addStageEventListener(StageEventListener());
```

```tsx
meeting.stage.on("newStageRequest", (request) => {
	console.log("New stage request:", request);
});
```

### Stage Request Approved

Emitted when a stage request is approved by the host.

```jsx
meeting.stage.on("stageRequestApproved", (data) => {
	console.log("Stage request approved:", data);
});
```

```typescript
meeting.stage.on("stageRequestApproved", (data) => {
	console.log("Stage request approved:", data);
});
```

```js
meeting.stage.on("stageRequestApproved", (data) => {
	console.log("Stage request approved:", data);
});
```

```kotlin
meeting.addStageEventListener(object : RtkStageEventListener {
	override fun onStageAccessRequestAccepted() {
		// Host accepted the join stage request or invited user directly to stage
		Log.d("Stage", "Stage request approved")
	}
})
```

```swift
extension WebinarViewModel: RtkStageEventListener {
	func onStageAccessRequestAccepted() {
		// Host accepted the join stage request or invited user directly to stage
		print("Stage request approved")
	}
}
```

```dart
class StageEventListener extends RtkStageEventListener {
	@override
	void onStageAccessRequestAccepted() {
		// Host accepted the join stage request or invited user directly to stage
		print("Stage request approved");
	}
}

meeting.addStageEventListener(StageEventListener());
```

```tsx
meeting.stage.on("stageRequestApproved", (data) => {
	console.log("Stage request approved:", data);
});
```

### Stage Request Rejected

Emitted when the host rejects a stage request.

```jsx
meeting.stage.on("stageRequestRejected", (data) => {
	console.log("Stage request rejected:", data);
});
```

```typescript
meeting.stage.on("stageRequestRejected", (data) => {
	console.log("Stage request rejected:", data);
});
```

```js
meeting.stage.on("stageRequestRejected", (data) => {
	console.log("Stage request rejected:", data);
});
```

```kotlin
meeting.addStageEventListener(object : RtkStageEventListener {
	override fun onStageAccessRequestRejected() {
		// Host rejected the join stage request
		Log.d("Stage", "Stage request rejected")
	}
})
```

```swift
extension WebinarViewModel: RtkStageEventListener {
	func onStageAccessRequestRejected() {
		// Host rejected the join stage request
		print("Stage request rejected")
	}
}
```

```dart
class StageEventListener extends RtkStageEventListener {
	@override
	void onStageAccessRequestRejected() {
		// Host rejected the join stage request
		print("Stage request rejected");
	}
}

meeting.addStageEventListener(StageEventListener());
```

```tsx
meeting.stage.on("stageRequestRejected", (data) => {
	console.log("Stage request rejected:", data);
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/#page","headline":"Stage Management · Cloudflare Realtime docs","description":"Manage webinar stage access and publish permissions in RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
