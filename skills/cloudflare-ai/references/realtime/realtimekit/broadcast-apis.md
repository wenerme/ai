---
description: Send custom broadcast messages to all participants in a RealtimeKit meeting.
title: Message Broadcast APIs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Message Broadcast APIs

Last updated Sep 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/broadcast-apis/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The broadcast APIs allow a user to send custom messages to all other users in a meeting.

WebMobile

ReactWeb ComponentsAngular

### Broadcasting a Message

The Participants module on the meeting object allows you to broadcast messages to all other users in a meeting (or to other meetings in case of connected meetings) over the signaling channel.

| Param   | Type                         | Description                                                                          | Required |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- |
| type    | Exclude<string, 'spotlight'> | Message type identifier used to distinguish different kinds of broadcasts.           | Yes      |
| payload | BroadcastMessagePayload      | Data sent with the message. Keys map to boolean, number, string, Date, or ActiveTab. | Yes      |
| target  | BroadcastMessageTarget       | Optional target filter for which participants or meetings receive the message.       | No       |

* If target is omitted, the message is broadcast to all participants in the current meeting, including the local participant.
* If `target.participantIds` is provided, the message is sent only to those participants in the current meeting.
* If `target.presetNames` is provided, the message is sent to all participants whose preset name is in the list.
* If `target.meetingIds` is provided, the message is broadcast to all specified meetings (multi‑meeting broadcast).

```ts
const participants = useRealtimeKitSelector((m) => m.participants);
participants.broadcastMessage(
  type: Exclude<string, 'spotlight'>,
  payload: BroadcastMessagePayload,
  target?: BroadcastMessageTarget,
): Promise<void>
```

```ts
type BroadcastMessagePayload = {
	[key: string]: boolean | number | string | Date | ActiveTab;
};

type BroadcastMessageTarget =
	| { participantIds: string[] }
	| { presetNames: string[] }
	| { meetingIds: string[] };
```

| Param   | Type                         | Description                                                                          | Required |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- |
| type    | Exclude<string, 'spotlight'> | Message type identifier used to distinguish different kinds of broadcasts.           | Yes      |
| payload | BroadcastMessagePayload      | Data sent with the message. Keys map to boolean, number, string, Date, or ActiveTab. | Yes      |
| target  | BroadcastMessageTarget       | Optional target filter for which participants or meetings receive the message.       | No       |

* If target is omitted, the message is broadcast to all participants in the current meeting, including the local participant.
* If `target.participantIds` is provided, the message is sent only to those participants in the current meeting.
* If `target.presetNames` is provided, the message is sent to all participants whose preset name is in the list.
* If `target.meetingIds` is provided, the message is broadcast to all specified meetings (multi‑meeting broadcast).

```ts
meeting.participants.broadcastMessage(
  type: Exclude<string, 'spotlight'>,
  payload: BroadcastMessagePayload,
  target?: BroadcastMessageTarget,
): Promise<void>
```

```ts
type BroadcastMessagePayload = {
	[key: string]: boolean | number | string | Date | ActiveTab;
};

type BroadcastMessageTarget =
	| { participantIds: string[] }
	| { presetNames: string[] }
	| { meetingIds: string[] };
```

| Param   | Type                         | Description                                                                          | Required |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- |
| type    | Exclude<string, 'spotlight'> | Message type identifier used to distinguish different kinds of broadcasts.           | Yes      |
| payload | BroadcastMessagePayload      | Data sent with the message. Keys map to boolean, number, string, Date, or ActiveTab. | Yes      |
| target  | BroadcastMessageTarget       | Optional target filter for which participants or meetings receive the message.       | No       |

* If target is omitted, the message is broadcast to all participants in the current meeting, including the local participant.
* If `target.participantIds` is provided, the message is sent only to those participants in the current meeting.
* If `target.presetNames` is provided, the message is sent to all participants whose preset name is in the list.
* If `target.meetingIds` is provided, the message is broadcast to all specified meetings (multi‑meeting broadcast).

```ts
meeting.participants.broadcastMessage(
  type: Exclude<string, 'spotlight'>,
  payload: BroadcastMessagePayload,
  target?: BroadcastMessageTarget,
): Promise<void>
```

```ts
type BroadcastMessagePayload = {
	[key: string]: boolean | number | string | Date | ActiveTab;
};

type BroadcastMessageTarget =
	| { participantIds: string[] }
	| { presetNames: string[] }
	| { meetingIds: string[] };
```

### Subscribe to Messages

Use the `broadcastedMessage` event to listen for messages sent via `broadcastMessage` and handle them in your application.

```ts
const participants = useRealtimeKitSelector((m) => m.participants);
participants.on("broadcastedMessage", ({ type, payload, timestamp }) => {
	// handle message
});
```

```ts
meeting.participants.on(
	"broadcastedMessage",
	({ type, payload, timestamp }) => {
		// handle message
	},
);
```

```ts
meeting.participants.on(
	"broadcastedMessage",
	({ type, payload, timestamp }) => {
		// handle message
	},
);
```

### Rate Limiting & Constraints

* The method is rate‑limited (server‑side + client‑side) to prevent abuse.
* Default client‑side config in the deprecated module: maxInvocations = 5 per period = 1s.
* The Participants module exposes a `rateLimitConfig` and `updateRateLimits(maxInvocations, period)` for tuning on the client, but server‑side limits may still apply.
* The event type cannot be `spotlight`. This is reserved for internal use by the SDK.

### Examples

#### Broadcast to everyone in the meeting

```ts
const participants = useRealtimeKitSelector((m) => m.participants);
await participants.broadcastMessage("HAND_RAISE", {
	raised: true,
	userId: meeting.self.userId,
	sentAt: new Date(),
});

participants.on(
"broadcastedMessage",
({ type, payload, timestamp }) => {
if (type === "HAND_RAISE") {
// payload.raised, payload.userId, payload.sentAt
}
},
);
```

```ts
await meeting.participants.broadcastMessage("HAND_RAISE", {
	raised: true,
	userId: meeting.self.userId,
	sentAt: new Date(),
});

meeting.participants.on(
"broadcastedMessage",
({ type, payload, timestamp }) => {
if (type === "HAND_RAISE") {
// payload.raised, payload.userId, payload.sentAt
}
},
);
```

```ts
await meeting.participants.broadcastMessage("HAND_RAISE", {
	raised: true,
	userId: meeting.self.userId,
	sentAt: new Date(),
});

meeting.participants.on(
"broadcastedMessage",
({ type, payload, timestamp }) => {
if (type === "HAND_RAISE") {
// payload.raised, payload.userId, payload.sentAt
}
},
);
```

#### Broadcast to a specific set of participants.

Only the participants with those participantIds receive the message.

```ts
const participants = useRealtimeKitSelector((m) => m.participants);
await participants.broadcastMessage(
	"PRIVATE_NOTE",
	{ message: "You are on stage in 30 seconds" },
	{
		participantIds: ["peer-id-1", "peer-id-2"],
	},
);
```

```ts
await meeting.participants.broadcastMessage(
	"PRIVATE_NOTE",
	{ message: "You are on stage in 30 seconds" },
	{
		participantIds: ["peer-id-1", "peer-id-2"],
	},
);
```

```ts
await meeting.participants.broadcastMessage(
	"PRIVATE_NOTE",
	{ message: "You are on stage in 30 seconds" },
	{
		participantIds: ["peer-id-1", "peer-id-2"],
	},
);
```

#### Broadcast to a preset

All participants whose preset name is `speaker` receive the message.

```ts
const participants = useRealtimeKitSelector((m) => m.participants);
await participants.broadcastMessage(
	"STAGE_INSTRUCTION",
	{ text: "Prepare for Q&A" },
	{
		presetNames: ["speaker"],
	},
);
```

```ts
await meeting.participants.broadcastMessage(
	"STAGE_INSTRUCTION",
	{ text: "Prepare for Q&A" },
	{
		presetNames: ["speaker"],
	},
);
```

```ts
await meeting.participants.broadcastMessage(
	"STAGE_INSTRUCTION",
	{ text: "Prepare for Q&A" },
	{
		presetNames: ["speaker"],
	},
);
```

#### Broadcast across multiple meetings

All participants in the specified meetings receive the message.

```ts
const participants = useRealtimeKitSelector((m) => m.participants);
await participants.broadcastMessage(
	"GLOBAL_ANNOUNCEMENT",
	{ text: "The event will end in 5 minutes." },
	{
		meetingIds: ["meeting-1", "meeting-2"],
	},
);
```

```ts
await meeting.participants.broadcastMessage(
	"GLOBAL_ANNOUNCEMENT",
	{ text: "The event will end in 5 minutes." },
	{
		meetingIds: ["meeting-1", "meeting-2"],
	},
);
```

```ts
await meeting.participants.broadcastMessage(
	"GLOBAL_ANNOUNCEMENT",
	{ text: "The event will end in 5 minutes." },
	{
		meetingIds: ["meeting-1", "meeting-2"],
	},
);
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/broadcast-apis/#page","headline":"Message Broadcast APIs · Cloudflare Realtime docs","description":"Send custom broadcast messages to all participants in a RealtimeKit meeting.","url":"https://developers.cloudflare.com/realtime/realtimekit/broadcast-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
