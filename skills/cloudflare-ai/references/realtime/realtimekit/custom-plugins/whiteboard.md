---
description: Add the Cloudflare-hosted Whiteboard plugin to RealtimeKit meetings so participants can draw together in real time.
title: Add the Whiteboard plugin
image: https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/whiteboard/og.png?v=e39f58941c97ac7f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Add the Whiteboard plugin

Last updated Oct 26, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/whiteboard/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Whiteboard plugin is a collaborative whiteboard that Cloudflare hosts and operates. Participants draw, write, and diagram together on a shared board inside the meeting, and see each other's cursors and names as they work.

You add the Whiteboard plugin with the same [plugins API](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/) you use for your own plugins. There is nothing to deploy or operate.

## What participants can do

- Draw shapes, arrows, lines, freehand strokes, and text on a shared board.
- See every participant's cursor and RealtimeKit display name in real time.
- Join late or reconnect and continue with the current board.
- Export the board as an image.

Each meeting has one board. The board stays the same across all sessions of that meeting, so participants continue where they left off when the meeting starts again. For details, refer to [Board data](#board-data).

The Whiteboard plugin does not support images, frames, embedded web content, or importing board files. Participants who try to add these see a message that they are not available.

## Prerequisites

- Read the [Plugins](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/) guide. This guide builds on it.
- Get the participant's auth token: the `token` returned when you [add a participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/) to a meeting. This is the same token you pass to the SDK when you initialize it.

Each participant loads the Whiteboard plugin from the following URL, with their auth token in the URL fragment after `#`:

```txt
https://whiteboard-v2.plugins.realtime.cloudflare.com/#authToken=<auth_token>
```

The Whiteboard plugin verifies the token with RealtimeKit, then opens the board for the token's meeting with the participant's display name. You do not pass a meeting ID or participant name.

Browsers do not send the URL fragment to servers or include it in `Referer` headers, so the token stays out of request logs. The plugin also removes the token from its address as soon as it loads.

Use the fragment, not a query parameter

Pass the auth token only after `#`, not as a query parameter such as `?authToken=`. The auth token lets anyone who has it join the meeting as that participant, and browsers send query parameters to servers, where they can appear in logs. The plugin does not use a token in a query parameter, and shows **Whiteboard link needs updating** instead.

## Integration steps

Select your platform to see the code for each step.

WebMobile

ReactWeb ComponentsAngular

### 1. Create the plugin component

Create an `iframe` that loads the plugin URL. Create it once, before you initialize the SDK, and reuse the same element for the life of the meeting.

*whiteboard-plugin.tsts*

```ts
const WHITEBOARD_URL = "https://whiteboard-v2.plugins.realtime.cloudflare.com/";

function createWhiteboard(authToken: string): HTMLIFrameElement {
	const iframe = document.createElement("iframe");
	iframe.style.width = "100%";
	iframe.style.height = "100%";
	iframe.style.border = "none";
	// Lets participants copy and paste on the board.
	iframe.allow = "clipboard-read; clipboard-write";
	// The plugin does not need your page's address.
	iframe.referrerPolicy = "no-referrer";
	iframe.src = `${WHITEBOARD_URL}#authToken=${encodeURIComponent(authToken)}`;
	return iframe;
}

const whiteboardElement = createWhiteboard("<auth_token>");
```

Allow clipboard access

The plugin `iframe` must set `allow="clipboard-read; clipboard-write"`. The Whiteboard plugin loads from a different origin than your app, so browsers block the Clipboard API inside it unless the `iframe` allows it. Without this attribute, the board's context-menu **Paste** does not work, and the browser console shows a permissions policy error on every copy or paste.

Set `allow` before the `iframe` first loads its `src`. The browser applies the permissions policy when the frame loads, so changing it later has no effect until the frame reloads.

The mobile SDKs create the WebView that hosts the plugin, so there is no component to create. In the next step, you pass the plugin URL with the participant's auth token when you register the plugin.

### 2. Register the plugin

Register the Whiteboard plugin when you initialize the SDK.

Note

Use the same plugin `id` on every platform your participants use. Activation only syncs across participants who registered the plugin with the same `id`.

Pass the `whiteboardElement` from step 1 as the `component`.

```ts
RealtimeKitClient.init({
	authToken: "<auth_token>",
	defaults: {
		plugins: [
			{
				id: "whiteboard",
				name: "Whiteboard",
				icon: "https://example.com/whiteboard.png",
				permissions: {
					canActivate: true,
					canDeactivate: true,
				},
				component: whiteboardElement,
			},
		],
	},
});
```

```kotlin
val authToken = "<auth_token>"

val meetingInfo = RtkMeetingInfo(
	authToken = authToken,
	plugins = listOf(
		RtkClientPluginConfig(
			id = "whiteboard",
			name = "Whiteboard",
			icon = "https://example.com/whiteboard.png",
			url = "https://whiteboard-v2.plugins.realtime.cloudflare.com/#authToken=$authToken",
			permissions = RtkClientPluginPermissions(
				canActivate = true,
				canDeactivate = true,
			),
		),
	),
)
```

```swift
let authToken = "<auth_token>"

let meetingInfo = RtkMeetingInfo(
	authToken: authToken,
	plugins: [
		RtkClientPluginConfig(
			id: "whiteboard",
			name: "Whiteboard",
			icon: "https://example.com/whiteboard.png",
			url: "https://whiteboard-v2.plugins.realtime.cloudflare.com/#authToken=\(authToken)",
			permissions: RtkClientPluginPermissions(
				canActivate: true,
				canDeactivate: true
			)
		)
	]
)
```

```tsx
const authToken = "<auth_token>";
const [meeting, initMeeting] = useRealtimeKitClient();

await initMeeting({
	authToken,
	defaults: {
		plugins: [
			{
				id: "whiteboard",
				name: "Whiteboard",
				icon: "https://example.com/whiteboard.png",
				permissions: {
					canActivate: true,
					canDeactivate: true,
				},
				component: {
					src: `https://whiteboard-v2.plugins.realtime.cloudflare.com/#authToken=${authToken}`,
				},
			},
		],
	},
});
```

For a description of every configuration field, refer to [Register a plugin](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/#register-a-plugin).

### 3. Open the whiteboard

If you use the UI Kit, the Whiteboard plugin appears in the plugins panel, and participants open and close it from there.

To control the whiteboard from your own UI, activate or deactivate the plugin. Both apply to every participant in the session. For examples, refer to [Activate and deactivate a plugin](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/#activate-and-deactivate-a-plugin).

## Access and permissions

- **Who can open the board:** Only participants with a valid auth token for the meeting can open its board. The token's meeting decides which board opens, so a participant cannot open another meeting's board.
- **Who can edit:** Every participant who has the board open can edit it. Presets do not control whiteboard editing.
- **Who can open or close the plugin:** Use the plugin's `permissions` to control who can activate or deactivate it for the session.
- **Where you can embed it:** The Whiteboard plugin works on any domain. You do not need to register your app's origin.

A participant's auth token stays valid until it expires, even after you remove them from the meeting, so they can still open the board until then.

## Board data

To restore a board when a new session of the same meeting starts, Cloudflare stores all board content for the meeting on Cloudflare infrastructure. Board content includes every shape, line, freehand stroke, and piece of text that participants add.

- Board content is kept indefinitely and is not deleted when a session ends.
- There is currently no API to clear or delete a board.
- Participant cursors and display names are shared only with participants who have the board open. They are not stored with the board.

Content on the board

Participants can type any text on the board, including personal or sensitive information. You are responsible for the content your participants add, for informing participants that board content is stored, and for meeting any legal or regulatory obligations that apply to your use of the Whiteboard plugin. Your use of the Whiteboard plugin is subject to your agreement with Cloudflare.

For retention periods of other RealtimeKit data, refer to [Data retention](https://developers.cloudflare.com/realtime/realtimekit/platform/data-retention/).

## Limits

The Whiteboard plugin is designed for collaborative meetings, not large broadcasts. Keep the following limits in mind when you plan its use:

- **Participants on a board:** A board supports a limited number of participants connected at the same time. Participants who join a full board cannot connect and see a **Reconnect** button. For webinars and other large audiences, let a small group edit the board, and share it with everyone else through [screen sharing](https://developers.cloudflare.com/realtime/realtimekit/humans/core/local-participant/#screen-share-control).
- **Board size:** Each board has a maximum size. Boards with many elements or very long freehand strokes can reach it. When a board is full, new changes are not saved and participants see a message.
- **Element size:** A single element, such as a very long continuous freehand stroke or a large block of text, can be too large to share. Participants see a message, and the change is not saved.
- **Connection attempts:** Repeated connection attempts from the same network in a short time are rate limited. Participants see **Too many attempts** and can try again after a minute.

## Troubleshooting

When the board cannot load, the plugin shows a message instead of the board. Use the following table to resolve these messages and other common problems.

| Message or symptom | Cause | Resolution |
| --- | --- | --- |
| Rejoin the meeting | The auth token is invalid, has expired, or belongs to a different meeting. | Pass the participant's current auth token in the plugin URL. |
| Open the whiteboard from your meeting | The plugin URL has no auth token. | Add `#authToken=<auth_token>` to the plugin URL. |
| Whiteboard link needs updating | The auth token is in a query parameter, such as `?authToken=`. | Pass the token after `#` instead: `#authToken=<auth_token>`. The plugin does not use a token in a query parameter. |
| Cannot verify your meeting | The Whiteboard plugin could not reach RealtimeKit to verify the token. | Select **Try again**. |
| Too many attempts | Too many connection attempts came from the same network in a short time. | Wait a minute, then select **Try again**. |
| Cannot load the whiteboard | The participant's browser could not download the whiteboard. | Check the participant's network connection, then select **Try again**. |
| Copy and paste fail, or **Paste** in the board's context menu does nothing (web) | The plugin `iframe` does not allow clipboard access. | Set `allow="clipboard-read; clipboard-write"` on the `iframe` before it loads. Refer to [Allow clipboard access](#1-create-the-plugin-component). |

## Next steps

- Review the [Plugins](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/) API for the complete `Plugin` and `Plugins` reference.
- Listen to [plugin events](https://developers.cloudflare.com/realtime/realtimekit/humans/core/plugins/#listen-to-plugin-events) to react when participants open or close the whiteboard.
- [Build your own plugin](https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/build-your-own-plugins/) for other collaborative experiences.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/whiteboard/#page","headline":"Add the Whiteboard plugin","description":"Add the Cloudflare-hosted Whiteboard plugin to RealtimeKit meetings so participants can draw together in real time.","url":"https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/whiteboard/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/custom-plugins/whiteboard/og.png?v=e39f58941c97ac7f","dateModified":"2026-10-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
