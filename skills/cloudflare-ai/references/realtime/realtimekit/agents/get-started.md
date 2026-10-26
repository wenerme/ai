---
description: Configure an agent preset, add the agent to a RealtimeKit meeting, connect to the Agent's WebSocket URL, and run the agent in a Durable Object.
title: Build an agent
image: https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/og.png?v=c4851f25d2c6bd78
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Build an agent

Last updated Oct 26, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

An agent is a meeting participant that your backend controls over a WebSocket. To add one, configure a preset, add the agent as a participant, and connect to the Websocket endpoint with the agent's participant token.

**My Worker**

**My Durable Object**

**Agent Participant**

**RealtimeKit Meeting**

Add participant with the agent preset

start(token)

Upgrade with token + subscriptions

Join as visible or hidden participant

session.started

Transcripts, joins, broadcasts

Subscribed events as JSON

## Choose an agent pattern

Decide whether people in the meeting should see the agent. Both patterns use the same steps on this page and receive the same events. Only the preset changes.

| Pattern | Preset | Use it for |
| --- | --- | --- |
| [Hidden agent](#hidden-agent) | `hidden_participant: true` | Compliance monitoring, live analytics |
| [Visible agent](#visible-agent) | `hidden_participant: false` | A note-taker people can see in the meeting |

### Hidden agent

Use a hidden agent when people should not see it, for example to monitor for compliance, review call quality, or collect live meeting analytics.

**People**Browser or app with the RealtimeKit SDKs

Audio, video, chat

RealtimeKit meeting

What people see

Alice

Bob

Hidden agent**Monitor**Filtered out of the list and grid

Transcripts, joins, broadcasts

My code**Durable Object**WebSocket ↔ JSON

PeopleAudio, video, chat ↔RealtimeKit meeting

MonitorHidden from peopleRealtimeKit meeting

MonitorTranscripts, joins, broadcasts →Durable Object

- **Not shown to people.** The RealtimeKit SDKs filter the agent out of the participant list and the video grid.
- **Join and leave events still go out.** Every client connected to the meeting receives them, and the SDKs choose not to show them. Do not rely on `hidden_participant` to keep the agent secret from someone inspecting their own client.
- **Same events and billing.** A hidden agent receives every event it subscribes to, is billed as a participant, and keeps the session active while connected.
- **No one removes it for you.** People cannot see the agent, so your backend must [end it](#billing-and-ending-the-session).
- **Disclosure is up to you.** Hiding the agent does not hide that the meeting is transcribed. Tell participants if your policy requires it.

### Visible agent

Use a visible agent when people should know it is there, for example a note-taker named "Notes bot" that starts taking notes as soon as it joins.

**People**Browser or app with the RealtimeKit SDKs

Audio, video, chat

RealtimeKit meeting

What people see

Alice

Bob

Notes bot

Visible agent**Notes bot**Shows as a tile, with no audio or video

Transcripts, joins, broadcasts

My code**Durable Object**WebSocket ↔ JSON

PeopleAudio, video, chat ↔RealtimeKit meeting

Notes botTile in the gridRealtimeKit meeting

Notes botTranscripts, joins, broadcasts →Durable Object

- **Shown by name.** The `name` you pass when you [add the agent as a participant](#2-create-a-meeting-and-a-participant-token-for-your-agent) is what people see.
- **Takes a tile in the grid.** The agent appears in the video grid even though it sends no audio or video. In a custom Core SDK grid, filter it out by `participant.presetName`.
- **Starts when it joins.** Anything said before the agent joins is not captured. Add the agent before the meeting starts to capture the whole session.

## Requirements

- A RealtimeKit app and meeting. Refer to the [quickstart](https://developers.cloudflare.com/realtime/realtimekit/quickstart/).
- A Cloudflare API token with RealtimeKit access.
- To receive live transcripts, [real-time transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/#turn-on-real-time-transcription) turned on in the presets of the participants you want transcribed. Without it, the agent receives no `transcript.received` events.

## 1. Configure an agent preset

The agent joins the meeting with a [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/), like any other participant. You can use an existing preset, but a dedicated agent preset keeps agent settings separate from human participants. Create one in the [RealtimeKit dashboard ↗︎](https://dash.cloudflare.com/?to=/:account/realtime/kit) or with the [Create a preset API](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/create/).

To hide the agent from other participants, set `hidden_participant` with the [Update a preset API](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/update/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Realtime Admin</code>
- <code>Realtime</code>

</details>

*Update a presetbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets/$PRESET_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"permissions": {
				"hidden_participant": true
		}
	}'
```

`hidden_participant` changes only what other participants see. The agent receives the same events either way. For what a hidden agent looks like to others, refer to [Hidden agent](#hidden-agent).

## 2. Create a meeting and a participant token for your agent

If you do not have a meeting yet, create one with the [Create a meeting API](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/create/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Realtime Admin</code>
- <code>Realtime</code>

</details>

*Create a meetingbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"title": "Weekly product review"
	}'
```

The response `data.id` is the meeting ID. Use it as `$MEETING_ID` in the next request.

Then [add a participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/) to the meeting with the agent preset:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Realtime Admin</code>
- <code>Realtime</code>

</details>

*Add a participantbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Notes bot",
		"preset_name": "agent",
		"custom_participant_id": "notes-bot"
	}'
```

The response `data.token` is the agent's participant token. Reuse the same participant for every session of the meeting. A [participant token](https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#participant-tokens) is valid for 100 days by default.

## 3. Connect to the Agent's WebSocket URL

Open a WebSocket to the endpoint with the participant token and the `realtimekit.v1` subprotocol:

```txt
GET wss://api.realtime.cloudflare.com/agent-ws/v1?subscriptions=transcript,participant,broadcast
Authorization: Bearer <PARTICIPANT_TOKEN>
Sec-WebSocket-Protocol: realtimekit.v1
```

The token selects the meeting. HTTP `101` means the connection is ready. The agent then joins the meeting and sends `session.started`.

## 4. Set connection parameters

| Parameter | Value |
| --- | --- |
| `subscriptions` | Optional. Any of `transcript`, `participant`, `broadcast`, comma-separated. |
| `connection_id` | Optional. Resumes an earlier connection. Refer to [Reconnect](#reconnect). |

`subscriptions` decides which events the agent receives. Session events are always sent.

| Category | Events | Needs |
| --- | --- | --- |
| `transcript` | `transcript.received` | [Real-time transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/#turn-on-real-time-transcription) on the speakers' presets |
| `participant` | `participant.join`, `participant.leave` | Nothing |
| `broadcast` | `broadcast.received` | Your app [sends broadcasts](https://developers.cloudflare.com/realtime/realtimekit/collaboration/message-broadcast/) |

Note

The `transcript` subscription only delivers events if real-time transcription is on. Set `permissions.transcription_enabled: true` in the presets of the participants whose speech you want transcribed. Refer to [Turn on real-time transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/#turn-on-real-time-transcription).

Subscribe only to what you use. Fewer events means less queueing during reconnects. For payloads and delivery rules, refer to [Events](https://developers.cloudflare.com/realtime/realtimekit/agents/events/).

## 5. Run the agent in a Durable Object

This example puts steps 1 to 4 together. A Worker adds the agent to a meeting, and a Durable Object holds the agent's WebSocket and logs final transcripts and participant joins.

A Durable Object fits the agent: one instance per meeting, a long-lived outbound WebSocket, and storage for the resume `connection_id`.

1. **Configure the Worker.** Bind the Durable Object and set the app details:

   ```jsonc
   {
   	"name": "meeting-agent",
   	"main": "src/index.ts",
   	// Set this to today's date
   	"compatibility_date": "2026-10-26",
   	"vars": {
   		"ACCOUNT_ID": "<ACCOUNT_ID>",
   		"APP_ID": "<APP_ID>",
   		"AGENT_PRESET": "agent",
   	},
   	"durable_objects": {
   		"bindings": [{ "name": "MEETING_AGENT", "class_name": "MeetingAgent" }],
   	},
   	"exports": {
   		"MeetingAgent": {
   			"type": "durable-object",
   			"storage": "sqlite",
   		},
   	},
   }
   ```

   ```toml
   name = "meeting-agent"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-10-26"

   [vars]
   ACCOUNT_ID = "<ACCOUNT_ID>"
   APP_ID = "<APP_ID>"
   AGENT_PRESET = "agent"

   [[durable_objects.bindings]]
   name = "MEETING_AGENT"
   class_name = "MeetingAgent"

   [exports.MeetingAgent]
   type = "durable-object"
   storage = "sqlite"
   ```

   Store the API token as a secret:npmyarnpnpm

   ```
   npx wrangler secret put CLOUDFLARE_API_TOKEN
   ```

   ```
   yarn wrangler secret put CLOUDFLARE_API_TOKEN
   ```

   ```
   pnpm wrangler secret put CLOUDFLARE_API_TOKEN
   ```

2. **Add and remove the agent.** `POST` adds a participant with the agent preset and starts the meeting's Durable Object. `DELETE` removes the agent from the meeting:

   *src/index.jsjs*



   ```js
   export { MeetingAgent } from "./agent";

   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match = url.pathname.match(/^\/meetings\/([^/]+)\/agent$/);
   		if (!match) return new Response("Not found", { status: 404 });
   		const meetingId = match[1];
   		const agent = env.MEETING_AGENT.getByName(meetingId);

   		// Authenticate the caller before adding or removing an agent.

   		if (request.method === "DELETE") {
   			await agent.stop();
   			return new Response("Agent stopped", { status: 200 });
   		}
   		if (request.method !== "POST") {
   			return new Response("Method not allowed", { status: 405 });
   		}

   		const res = await fetch(
   			`https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/realtime/kit/${env.APP_ID}/meetings/${meetingId}/participants`,
   			{
   				method: "POST",
   				headers: {
   					Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
   					"Content-Type": "application/json",
   				},
   				body: JSON.stringify({
   					name: "Notes bot",
   					preset_name: env.AGENT_PRESET,
   					custom_participant_id: `agent-${meetingId}`,
   				}),
   			},
   		);
   		if (!res.ok) return new Response("Add participant failed", { status: 502 });
   		const { data } = await res.json();

   		await agent.start(data.token);
   		return new Response("Agent started", { status: 202 });
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export { MeetingAgent } from "./agent";

   export default {
   	async fetch(request, env): Promise<Response> {
   		const url = new URL(request.url);
   		const match = url.pathname.match(/^\/meetings\/([^/]+)\/agent$/);
   		if (!match) return new Response("Not found", { status: 404 });
   		const meetingId = match[1];
   		const agent = env.MEETING_AGENT.getByName(meetingId);

   		// Authenticate the caller before adding or removing an agent.

   		if (request.method === "DELETE") {
   			await agent.stop();
   			return new Response("Agent stopped", { status: 200 });
   		}
   		if (request.method !== "POST") {
   			return new Response("Method not allowed", { status: 405 });
   		}

   		const res = await fetch(
   			`https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/realtime/kit/${env.APP_ID}/meetings/${meetingId}/participants`,
   			{
   				method: "POST",
   				headers: {
   					Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
   					"Content-Type": "application/json",
   				},
   				body: JSON.stringify({
   					name: "Notes bot",
   					preset_name: env.AGENT_PRESET,
   					custom_participant_id: `agent-${meetingId}`,
   				}),
   			},
   		);
   		if (!res.ok) return new Response("Add participant failed", { status: 502 });
   		const { data } = await res.json<{ data: { token: string } }>();

   		await agent.start(data.token);
   		return new Response("Agent started", { status: 202 });
   	},
   } satisfies ExportedHandler<Env>;
   ```

3. **Establish the WebSocket in a Durable Object.** The Durable Object connects, stores `connection_id`, handles events, reconnects, and leaves the meeting on `stop()`:

   *src/agent.jsjs*



   ```js
   import { DurableObject } from "cloudflare:workers";

   const AGENT_WS = "https://api.realtime.cloudflare.com/agent-ws/v1";
   const SUBSCRIPTIONS = "transcript,participant";

   export class MeetingAgent extends DurableObject {
   	ws;

   	async start(token) {
   		await this.ctx.storage.put("token", token);
   		await this.ctx.storage.delete("connectionId");
   		await this.connect();
   	}

   	async stop() {
   		// Closing with 1000 makes the agent leave the meeting immediately.
   		await this.ctx.storage.deleteAll();
   		await this.ctx.storage.deleteAlarm();
   		this.ws?.close(1000, "agent_stopped");
   		this.ws = undefined;
   	}

   	async connect() {
   		const token = await this.ctx.storage.get("token");
   		if (!token || this.ws) return;

   		const url = new URL(AGENT_WS);
   		url.searchParams.set("subscriptions", SUBSCRIPTIONS);
   		const connectionId = await this.ctx.storage.get("connectionId");
   		if (connectionId) url.searchParams.set("connection_id", connectionId);

   		// Workers open outbound WebSockets with fetch and an Upgrade header.
   		const res = await fetch(url, {
   			headers: {
   				Upgrade: "websocket",
   				Authorization: `Bearer ${token}`,
   				"Sec-WebSocket-Protocol": "realtimekit.v1",
   			},
   		});
   		const ws = res.webSocket;
   		if (!ws) {
   			console.error("upgrade failed", res.status, await res.text());
   			if (res.status === 404) await this.ctx.storage.delete("connectionId");
   			if (res.status >= 500 || res.status === 404) this.retry();
   			return;
   		}

   		ws.accept();
   		this.ws = ws;
   		ws.addEventListener("message", (e) => this.onFrame(JSON.parse(e.data)));
   		ws.addEventListener("close", (e) => this.onClose(e.code, e.reason));
   		ws.send(
   			JSON.stringify({
   				category: "request",
   				request_id: "connection",
   				name: "connection.get",
   				data: {},
   			}),
   		);
   	}

   	async onFrame(frame) {
   		if (
   			frame.category === "result" &&
   			frame.request_id === "connection" &&
   			frame.data
   		) {
   			await this.ctx.storage.put("connectionId", frame.data.connection.id);
   			return;
   		}
   		if (frame.category !== "message") return;

   		switch (frame.name) {
   			case "transcript.received":
   				if (frame.data.is_final) {
   					console.log(`${frame.data.speaker.display_name}: ${frame.data.text}`);
   				}
   				break;
   			case "participant.join":
   				console.log("joined", frame.data.participant.display_name);
   				break;
   			case "session.ended":
   				console.log("session ended", frame.data.reason);
   				break;
   		}
   	}

   	async onClose(code, reason) {
   		this.ws = undefined;
   		if (code === 4409 || code === 4403) return; // replaced, or fix the token
   		if (code === 1000 || reason === "queue_overflow") {
   			// Start fresh next time. Call start() again for the next session.
   			await this.ctx.storage.delete("connectionId");
   			if (code === 1000) return;
   		}
   		this.retry();
   	}

   	retry() {
   		// Resume within 5 seconds to avoid a gap.
   		this.ctx.storage.setAlarm(Date.now() + 1000);
   	}

   	async alarm() {
   		await this.connect();
   	}
   }
   ```

   *src/agent.tsts*



   ```ts
   import { DurableObject } from "cloudflare:workers";

   const AGENT_WS = "https://api.realtime.cloudflare.com/agent-ws/v1";
   const SUBSCRIPTIONS = "transcript,participant";

   export class MeetingAgent extends DurableObject<Env> {
   	ws?: WebSocket;

   	async start(token: string) {
   		await this.ctx.storage.put("token", token);
   		await this.ctx.storage.delete("connectionId");
   		await this.connect();
   	}

   	async stop() {
   		// Closing with 1000 makes the agent leave the meeting immediately.
   		await this.ctx.storage.deleteAll();
   		await this.ctx.storage.deleteAlarm();
   		this.ws?.close(1000, "agent_stopped");
   		this.ws = undefined;
   	}

   	async connect() {
   		const token = await this.ctx.storage.get<string>("token");
   		if (!token || this.ws) return;

   		const url = new URL(AGENT_WS);
   		url.searchParams.set("subscriptions", SUBSCRIPTIONS);
   		const connectionId = await this.ctx.storage.get<string>("connectionId");
   		if (connectionId) url.searchParams.set("connection_id", connectionId);

   		// Workers open outbound WebSockets with fetch and an Upgrade header.
   		const res = await fetch(url, {
   			headers: {
   				Upgrade: "websocket",
   				Authorization: `Bearer ${token}`,
   				"Sec-WebSocket-Protocol": "realtimekit.v1",
   			},
   		});
   		const ws = res.webSocket;
   		if (!ws) {
   			console.error("upgrade failed", res.status, await res.text());
   			if (res.status === 404) await this.ctx.storage.delete("connectionId");
   			if (res.status >= 500 || res.status === 404) this.retry();
   			return;
   		}

   		ws.accept();
   		this.ws = ws;
   		ws.addEventListener("message", (e) => this.onFrame(JSON.parse(e.data as string)));
   		ws.addEventListener("close", (e) => this.onClose(e.code, e.reason));
   		ws.send(
   			JSON.stringify({
   				category: "request",
   				request_id: "connection",
   				name: "connection.get",
   				data: {},
   			}),
   		);
   	}

   	async onFrame(frame: any) {
   		if (frame.category === "result" && frame.request_id === "connection" && frame.data) {
   			await this.ctx.storage.put("connectionId", frame.data.connection.id);
   			return;
   		}
   		if (frame.category !== "message") return;

   		switch (frame.name) {
   			case "transcript.received":
   				if (frame.data.is_final) {
   					console.log(`${frame.data.speaker.display_name}: ${frame.data.text}`);
   				}
   				break;
   			case "participant.join":
   				console.log("joined", frame.data.participant.display_name);
   				break;
   			case "session.ended":
   				console.log("session ended", frame.data.reason);
   				break;
   		}
   	}

   	async onClose(code: number, reason: string) {
   		this.ws = undefined;
   		if (code === 4409 || code === 4403) return; // replaced, or fix the token
   		if (code === 1000 || reason === "queue_overflow") {
   			// Start fresh next time. Call start() again for the next session.
   			await this.ctx.storage.delete("connectionId");
   			if (code === 1000) return;
   		}
   		this.retry();
   	}

   	retry() {
   		// Resume within 5 seconds to avoid a gap.
   		this.ctx.storage.setAlarm(Date.now() + 1000);
   	}

   	async alarm() {
   		await this.connect();
   	}
   }
   ```

4. **Deploy and start the agent.**

   ```sh
   npx wrangler deploy
   curl -X POST https://meeting-agent.<SUBDOMAIN>.workers.dev/meetings/<MEETING_ID>/agent
   ```

   Join the meeting from a browser and speak. Run `npx wrangler tail` to see transcripts and joins.

   When the meeting is over, remove the agent:

   ```sh
   curl -X DELETE https://meeting-agent.<SUBDOMAIN>.workers.dev/meetings/<MEETING_ID>/agent
   ```

## Billing and ending the session

The agent is a meeting participant, so it is billed like one. RealtimeKit charges participant minutes for the agent from when it joins a session until it leaves. Refer to [RealtimeKit pricing](https://developers.cloudflare.com/realtime/realtimekit/platform/pricing/) for rates and to the [billing FAQ](https://developers.cloudflare.com/realtime/realtimekit/faq/#billing) for how participant minutes are counted.

A session stays active while any participant is connected, and that includes the agent. If everyone else leaves but the agent stays connected, the session does not end. RealtimeKit keeps billing participant minutes for the agent, and for any [recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/) in progress, until the agent leaves or someone ends the session.

Use one of these to end a session:

| Method | Effect |
| --- | --- |
| Close the WebSocket with code `1000` | The agent leaves immediately. The session ends when no other participants remain. |
| Call the [Kick all participants API](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_all_participants/) | Removes every participant, including the agent, and ends the session. The agent receives `participant.kick_all` and `session.ended`. |

To end the session for everyone, for example when the scheduled meeting time is over, call the Kick all participants API:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Realtime Admin</code>
- <code>Realtime</code>

</details>

*Kick all participantsbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick-all" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Connection reference

### Requests

Send `{ "category": "request", "request_id", "name", "data": {} }`. Each request gets one `result` with the same `request_id`, and either `data` or `error`.

| Name | Returns |
| --- | --- |
| `connection.get` | `{ connection: { id, subscriptions } }` |
| `connection.ping` | `{}` |

```json
{
	"category": "result",
	"request_id": "r1",
	"name": "connection.get",
	"data": {
		"connection": {
			"id": "conn_6f1c2a7e",
			"subscriptions": ["transcript", "participant"]
		}
	},
	"error": null
}
```

Failed results have `data: null` and `error.code` set to `INVALID_REQUEST`, `UNSUPPORTED_REQUEST`, or `INTERNAL_ERROR`. The connection stays open.

### Reconnect

**Agent Durable Object**

**Agent Participant**

**Meeting**

connection.get

connection.id

WebSocket drops with a code other than 1000

Agent stays joined for 5 s and queues events

Upgrade with ?connection\_id=

Queued events, in order

Live events

Store `connection.id` and pass it as `connection_id` to resume. It identifies the WebSocket connection, not the participant or session.

- Closing with `1000` makes the agent leave the meeting immediately.
- Any other close starts a 5-second grace period. The agent stays joined and queues events.
- Events sent while the agent was out of the meeting are lost. A second `session.started` marks the gap.

| Close code | Reason | Action |
| --- | --- | --- |
| `1000` | `session_ended` | Open a new connection for the next session |
| `1013` | `queue_overflow` | Open a new connection without `connection_id` |
| `1013` | `upstream_lost` | Resume with `connection_id` |
| `1013` | `upstream_unavailable` | Resume with `connection_id` and backoff |
| `4403` | `upstream_rejected` | Fix the token or participant |
| `4409` | `replaced` | Do not reconnect |

<details>

<summary>

What a resume does

</summary>

Unsent events are always delivered first, in order.

| State | Result |
| --- | --- |
| Within the grace period, or previous WebSocket still open | Same connection continues with no gap. A previous WebSocket closes with <code>4409</code>. |
| Agent already left, or closed with <code>upstream_lost</code> or <code>upstream_unavailable</code> | Agent joins again. You get a new <code>session.started</code>, then live events. |
| Closed with <code>session_ended</code>, <code>queue_overflow</code>, or <code>upstream_rejected</code> | HTTP <code>101</code>, then the same close again. Open a new connection without <code>connection_id</code>. |

- If you include <code>subscriptions</code> on resume, it replaces the stored list. Already-queued events are not re-filtered.
- A fresh token for the same participant is accepted. A <code>connection_id</code> does not expire.
- For a heartbeat, send <code>connection.ping</code> every 20 seconds. Reconnect if no result arrives within 10 seconds.

</details>

### Errors

A rejected upgrade returns an HTTP error instead of `101`:

```json
{
	"success": false,
	"error": {
		"code": "UNAUTHENTICATED",
		"message": "Invalid participant token.",
		"retryable": false
	}
}
```

| Status | Code | Cause |
| --- | --- | --- |
| `400` | `BAD_REQUEST` | `realtimekit.v1` subprotocol missing |
| `400` | `INVALID_QUERY` | Unknown parameter or subscription, or empty `connection_id` |
| `401` | `UNAUTHENTICATED` | Missing, invalid, or expired token |
| `404` | `CONNECTION_NOT_FOUND` | Unknown `connection_id`, or another participant's |

### Limits

| Limit | Value |
| --- | --- |
| Unsent events per connection | 10,000 |
| Resume grace period | 5 seconds |
| `request_id` length | 1–128 characters |

## Send events

Sending chat messages and broadcasts from the agent is planned. Today, the agent is receive-only. To act on the meeting now, call the [RealtimeKit REST API](https://developers.cloudflare.com/api/resources/realtime_kit/) from your Worker, for example to [kick participants](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_participants/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/#page","headline":"Build an agent","description":"Configure an agent preset, add the agent to a RealtimeKit meeting, connect to the Agent's WebSocket URL, and run the agent in a Durable Object.","url":"https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/og.png?v=c4851f25d2c6bd78","dateModified":"2026-10-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
