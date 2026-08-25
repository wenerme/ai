---
description: Detect and display active speakers in RealtimeKit meetings using the Core SDK.
title: Display active speakers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Display active speakers

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/display-active-speakers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

WebMobile

ReactWeb ComponentsAngular

RealtimeKit automatically detects and tracks participants who are actively speaking in a meeting. You can display either a single active speaker or multiple active speakers in your application UI, depending on your design requirements.

An active speaker in RealtimeKit is a remote participant with prominent audio activity at any given moment. The SDK maintains two types of data to help you build your UI:

* **Active speaker** — A single remote participant who is currently speaking most prominently.
* **Active participants** — A set of remote participants with the most prominent audio activity.

The SDK automatically updates these properties and subscribes to participant media as speaking activity changes. It prioritizes prominent audio activity, so a participant not currently visible in your UI can replace a visible participant if their audio becomes more active.

Note

The SDK tracks active speakers only when the local participant is viewing or rendering participants in ACTIVE mode (page 0). Refer to the [Remote participants](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#participant-view-modes) page to learn about participant view modes.

Active speaker properties contain only remote participants. The local participant is available separately.

The maximum number of participants in the `active` map is one less than the grid size configured in the local participant's [Preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/). This reserves space for the local participant in your UI. For example, if the grid size is 6, the `active` map contains a maximum of 5 remote participants.

## Display a single active speaker

Use `lastActiveSpeaker` to show the most recently active participant in your UI. Access the current active speaker with the `useRealtimeKitSelector` hook:

```ts
const activeSpeaker = useRealtimeKitSelector((meeting) => {
	const activeSpeakerId = meeting.participants.lastActiveSpeaker;
	return meeting.participants.joined.get(activeSpeakerId);
});

if (activeSpeaker) {
	// Render the active speaker video
}
```

The `useRealtimeKitSelector` hook automatically updates your component when the active speaker changes.

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK also emits an `activeSpeaker` event on `meeting.participants` when a different participant becomes the active speaker. For imperative updates or side effects, listen to this event:

```ts
meeting.participants.on("activeSpeaker", ({ peerId, volume }) => {
	const activeSpeaker = meeting.participants.joined.get(peerId);
	// Update your UI or trigger side effects
});
```

Use `lastActiveSpeaker` to show the most recently active participant in your UI.

Access the `lastActiveSpeaker` property to get the participant ID, then retrieve the participant object from the joined participants map:

```ts
const activeSpeakerId = meeting.participants.lastActiveSpeaker;
const activeSpeaker = meeting.participants.joined.get(activeSpeakerId);

if (activeSpeaker) {
	// Render the active speaker video
}
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits an `activeSpeaker` event on `meeting.participants` when a different participant becomes the active speaker:

```ts
meeting.participants.on("activeSpeaker", ({ peerId, volume }) => {
	const activeSpeaker = meeting.participants.joined.get(peerId);
	// Update your UI to display the new active speaker
});
```

Use `lastActiveSpeaker` to show the most recently active participant in your UI.

Access the `lastActiveSpeaker` property to get the participant ID, then retrieve the participant object from the joined participants map:

```ts
const activeSpeakerId = meeting.participants.lastActiveSpeaker;
const activeSpeaker = meeting.participants.joined.get(activeSpeakerId);

if (activeSpeaker) {
	// Render the active speaker video
}
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits an `activeSpeaker` event on `meeting.participants` when a different participant becomes the active speaker:

```ts
meeting.participants.on("activeSpeaker", ({ peerId, volume }) => {
	const activeSpeaker = meeting.participants.joined.get(peerId);
	// Update your UI to display the new active speaker
});
```

Use `activeSpeaker` to show the most recently active participant in your UI.

Access the `activeSpeaker` property to get the current active speaker:

```kotlin
val activeSpeaker = meeting.participants.activeSpeaker

if (activeSpeaker != null) {
	// Render the active speaker video
}
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits an event when a different participant becomes the active speaker. Listen to this event using `RtkParticipantsEventListener`:

```kotlin
meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {
	override fun onActiveSpeakerChanged(participant: RtkRemoteParticipant?) {
		// Update your UI to display the new active speaker
	}
})
```

Use `activeSpeaker` to show the most recently active participant in your UI.

Access the `activeSpeaker` property to get the current active speaker:

```swift
let activeSpeaker = meeting.participants.activeSpeaker

if let activeSpeaker = activeSpeaker {
	// Render the active speaker video
}
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits an event when a different participant becomes the active speaker. Listen to this event by implementing `RtkParticipantsEventListener`:

```swift
extension MeetingViewModel: RtkParticipantsEventListener {
	func onActiveSpeakerChanged(participant: RtkRemoteParticipant?) {
		// Update your UI to display the new active speaker
	}
}

meeting.addParticipantsEventListener(self)
```

Use `lastActiveSpeaker` to show the most recently active participant in your UI. Access the current active speaker with the `useRealtimeKitSelector` hook:

```tsx
const activeSpeaker = useRealtimeKitSelector((meeting) => {
	const activeSpeakerId = meeting.participants.lastActiveSpeaker;
	return meeting.participants.joined.get(activeSpeakerId);
});

if (activeSpeaker) {
	// Render the active speaker video
}
```

The `useRealtimeKitSelector` hook automatically updates your component when the active speaker changes.

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK also emits an `activeSpeaker` event on `meeting.participants` when a different participant becomes the active speaker. For imperative updates or side effects, listen to this event:

```tsx
meeting.participants.on("activeSpeaker", (participant) => {
	// Update your UI or trigger side effects
});
```

## Display multiple active speakers

Use the `active` map to show multiple participants with prominent audio activity, typically in a grid layout. Access the current active participants with the `useRealtimeKitSelector` hook:

```ts
const activeMap = useRealtimeKitSelector(
	(meeting) => meeting.participants.active,
);

const activeParticipants = activeMap.toArray();

// Render active participants in your grid
activeParticipants.forEach((participant) => {
	// Render participant video tile
});
```

The `useRealtimeKitSelector` hook automatically updates your component when the set of active speakers changes.

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK also emits a `participantsUpdate` event on the `active` map when the set of active speakers changes. For imperative updates or side effects when the `active` map changes, listen to this event:

```ts
meeting.participants.active.on("participantsUpdate", () => {
	const activeParticipants = meeting.participants.active.toArray();
	// Perform side effects
});
```

(Optional) If your application needs to respond when a specific participant is added to or removed from the active map, listen for `participantJoined` and `participantLeft` on `meeting.participants.active` map.

```ts
meeting.participants.active.on("participantJoined", (participant) => {
	console.log("Participant added to active map:", participant.id);
});

meeting.participants.active.on("participantLeft", (participant) => {
	console.log("Participant removed from active map:", participant.id);
});
```

Use the `active` map to show multiple participants with prominent audio activity, typically in a grid layout.

```ts
const activeParticipants = meeting.participants.active.toArray();

// Render active participants in your grid
activeParticipants.forEach((participant) => {
	// Render participant video tile
});
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits a `participantsUpdate` event on the `active` map when the set of active speakers changes. Listen to this event, retrieve the updated array, and re-render your grid:

```ts
meeting.participants.active.on("participantsUpdate", () => {
	const activeParticipants = meeting.participants.active.toArray();
	// Update your grid UI with the new active participants
});
```

(Optional) If your application needs to respond when a specific participant is added to or removed from the active map, listen for `participantJoined` and `participantLeft` on `meeting.participants.active` map.

```ts
meeting.participants.active.on("participantJoined", (participant) => {
	console.log("Participant added to active map:", participant.id);
});

meeting.participants.active.on("participantLeft", (participant) => {
	console.log("Participant removed from active map:", participant.id);
});
```

Use the `active` map to show multiple participants with prominent audio activity, typically in a grid layout.

```ts
const activeParticipants = meeting.participants.active.toArray();

// Render active participants in your grid
activeParticipants.forEach((participant) => {
	// Render participant video tile
});
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits a `participantsUpdate` event on the `active` map when the set of active speakers changes. Listen to this event, retrieve the updated array, and re-render your grid:

```ts
meeting.participants.active.on("participantsUpdate", () => {
	const activeParticipants = meeting.participants.active.toArray();
	// Update your grid UI with the new active participants
});
```

(Optional) If your application needs to respond when a specific participant is added to or removed from the active map, listen for `participantJoined` and `participantLeft` on `meeting.participants.active` map.

```ts
meeting.participants.active.on("participantJoined", (participant) => {
	console.log("Participant added to active map:", participant.id);
});

meeting.participants.active.on("participantLeft", (participant) => {
	console.log("Participant removed from active map:", participant.id);
});
```

Use the `active` list to show multiple participants with prominent audio activity, in a grid layout:

```kotlin
val activeParticipants = meeting.participants.active

// Render active participants in your grid
activeParticipants.forEach { participant ->
	// Render participant video tile
}
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits an event when the set of active speakers changes. Listen to this event using `RtkParticipantsEventListener`:

```kotlin
meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {
	override fun onActiveParticipantsChanged(active: List<RtkRemoteParticipant>) {
		// Update your grid UI with the new active participants
	}
})
```

Use the `active` list to show multiple participants with prominent audio activity, typically in a grid layout:

```swift
let activeParticipants = meeting.participants.active

// Render active participants in your grid
for participant in activeParticipants {
	// Render participant video tile
}
```

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK emits an event when the set of active speakers changes. Listen to this event by implementing `RtkParticipantsEventListener`:

```swift
extension MeetingViewModel: RtkParticipantsEventListener {
	func onActiveParticipantsChanged(active: [RtkRemoteParticipant]) {
		// Update your grid UI with the new active participants
	}
}

meeting.addParticipantsEventListener(self)
```

Use the `active` map to show multiple participants with prominent audio activity, typically in a grid layout. Access the current active participants with the `useRealtimeKitSelector` hook:

```tsx
const activeMap = useRealtimeKitSelector(
	(meeting) => meeting.participants.active,
);

const activeParticipants = activeMap.toArray();

// Render active participants in your grid
activeParticipants.forEach((participant) => {
	// Render participant video tile
});
```

The `useRealtimeKitSelector` hook automatically updates your component when the set of active speakers changes.

Refer to [Display participant videos](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/#display-participant-videos) to learn how to render the participant video in your UI.

The SDK also emits a `participantsUpdate` event on the `active` map when the set of active speakers changes. For imperative updates or side effects when the `active` map changes, listen to this event:

```tsx
meeting.participants.active.on("participantsUpdate", () => {
	const activeParticipants = meeting.participants.active.toArray();
	// Perform side effects
});
```

(Optional) If your application needs to respond when a specific participant is added to or removed from the active map, listen for `participantJoined` and `participantLeft` on `meeting.participants.active` map:

```tsx
meeting.participants.active.on("participantJoined", (participant) => {
	console.log("Participant added to active map:", participant.id);
});

meeting.participants.active.on("participantLeft", (participant) => {
	console.log("Participant removed from active map:", participant.id);
});
```

## Visualize audio activity

You can create custom audio visualizations using audio data from a participant's audio track. Extract volume information from the audio track to calculate amplitude series. Use this data to render waveforms, speech indicators, or audio level meters in your UI.

You can create custom audio visualizations using audio data from a participant's audio track. Extract volume information from the audio track to calculate amplitude series. Use this data to render waveforms, speech indicators, or audio level meters in your UI.

You can create custom audio visualizations using audio data from a participant's audio track. Extract volume information from the audio track to calculate amplitude series. Use this data to render waveforms, speech indicators, or audio level meters in your UI.

Audio activity visualization is not supported on Android.

Audio activity visualization is not supported on iOS.

Audio activity visualization is not supported on React Native.

## Related resources

* [Meeting object explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) \- Understand the meeting object structure and available properties.
* [Remote participant](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/) \- Learn more about remote participants in a session and how to display their video.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/display-active-speakers/#page","headline":"Display active speakers · Cloudflare Realtime docs","description":"Detect and display active speakers in RealtimeKit meetings using the Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/display-active-speakers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
