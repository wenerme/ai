---
description: Apply per-channel policy, select a channel on a turn, and deliver out-of-band notices across web, messenger, voice, and custom surfaces.
title: Channels
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Channels

Last updated Jun 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/harnesses/think/channels/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Experimental

The Channels API surface may evolve before Think graduates out of experimental.

A channel is a surface a Think agent talks over: the browser WebSocket, a messenger webhook (Telegram, Slack, and so on), voice, or your own custom transport. Channels generalize [messengers](https://developers.cloudflare.com/agents/harnesses/think/messengers/) into one vocabulary so you can apply per-channel policy (a different system prompt, a narrowed tool set, a step cap) and deliver out-of-band notices, regardless of the surface a turn arrived on.

Every Think agent always has an implicit `web` channel (the WebSocket chat your browser clients use). You declare additional channels — and override the `web` policy — with `configureChannels()`. Messengers returned from `getMessengers()` are automatically absorbed as `messenger` channels, so existing messenger apps keep working unchanged.

## Configure channels

Override `configureChannels()` to return a map of channel id to `ChannelDefinition`. The id is how you select the channel on a turn:

```js
import { Think, messengerChannel } from "@cloudflare/think";
import { telegram } from "@chat-adapter/telegram";

export class Assistant extends Think {
	configureChannels() {
		return {
			// Override policy for the built-in web channel.
			web: {
				kind: "web",
				ingress: { transport: "websocket" },
				instructions: "You are chatting in a web app. Use markdown freely.",
			},
			// A voice channel with tighter limits.
			voice: {
				kind: "voice",
				ingress: { transport: "voice" },
				instructions: "Keep replies short and speakable. No markdown.",
				maxTurns: 3,
			},
			// A messenger channel (Chat SDK webhook).
			telegram: messengerChannel(telegram({/* adapter config */})),
		};
	}
}
```

```ts
import { Think, messengerChannel } from "@cloudflare/think";
import { telegram } from "@chat-adapter/telegram";

export class Assistant extends Think<Env> {
	configureChannels() {
		return {
			// Override policy for the built-in web channel.
			web: {
				kind: "web",
				ingress: { transport: "websocket" },
				instructions: "You are chatting in a web app. Use markdown freely.",
			},
			// A voice channel with tighter limits.
			voice: {
				kind: "voice",
				ingress: { transport: "voice" },
				instructions: "Keep replies short and speakable. No markdown.",
				maxTurns: 3,
			},
			// A messenger channel (Chat SDK webhook).
			telegram: messengerChannel(
				telegram({
					/* adapter config */
				}),
			),
		};
	}
}
```

A `ChannelDefinition` has these fields:

| Field        | Type                                                              | Description                                                                                                        |                                                           |                       |
| ------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | --------------------- |
| kind         | "web" \| "messenger"                                              | "voice"                                                                                                            | "custom"                                                  | The surface category. |
| ingress      | { transport: "websocket" \| "voice" } or a webhook messenger spec | How turns arrive. messengerChannel() builds the webhook form for you.                                              |                                                           |                       |
| instructions | string \| (ctx: ChannelContext) => string                         | Promise<string>                                                                                                    | Prepended to the system prompt for turns on this channel. |                       |
| tools        | (all: ToolSet) => ToolSet                                         | Narrow the assembled tool set for this channel (filter only — it cannot add tools).                                |                                                           |                       |
| maxTurns     | number                                                            | Per-channel cap on model steps for a turn.                                                                         |                                                           |                       |
| capabilities | ChannelCapabilities                                               | Surface capabilities (streaming, message editing). Defaulted for web.                                              |                                                           |                       |
| conversation | messenger conversation mode or resolver                           | Messenger thread routing (see [Messengers](https://developers.cloudflare.com/agents/harnesses/think/messengers/)). |                                                           |                       |
| delivery     | channel delivery policy                                           | Messenger delivery policy.                                                                                         |                                                           |                       |

Use the `defineChannels()` helper for type inference, and `messengerChannel()` to wrap a Chat SDK adapter definition as a `kind: "messenger"` channel.

### Channel kinds

| Kind      | Ingress                         | Notes                                                                                       |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| web       | { transport: "websocket" }      | Always present. Declare it in configureChannels() only to set policy; you cannot remove it. |
| messenger | webhook (messengerChannel(...)) | Fed into the messenger runtime. Equivalent to a getMessengers() entry.                      |
| voice     | { transport: "voice" }          | Applies policy and turn context; out-of-band delivery is not yet wired.                     |
| custom    | app-defined                     | For your own transport. Same delivery limitations as voice today.                           |

## Per-channel policy

Channel policy is applied as an **overridable default** before [beforeTurn](https://developers.cloudflare.com/agents/harnesses/think/lifecycle-hooks/) runs, so a `beforeTurn` override still wins:

* `instructions` is prepended to the base system prompt for the turn.
* `tools` filters the assembled tool set (it can only remove tools — the `getTools()` seam adds them).
* `maxTurns` caps model steps: `beforeTurn`'s `maxSteps` wins, then the channel `maxTurns`, then the instance `maxSteps` default.

## Select a channel on a turn

Pass `channel` to [runTurn()](https://developers.cloudflare.com/agents/harnesses/think/#runturn) (or `chat()`) to run a turn on a specific channel. The channel id is stamped onto the user message, so a continued or recovered turn re-resolves the same channel and re-applies its policy:

```js
export class Assistant extends Think {
	async speak() {
		await this.runTurn({ input: "Read this out loud", channel: "voice" });
	}
}
```

```ts
export class Assistant extends Think<Env> {
	async speak() {
		await this.runTurn({ input: "Read this out loud", channel: "voice" });
	}
}
```

Inside a turn, the active channel is available as `this.activeChannel` (a `ChannelContext` with `channelId`, `kind`, and messenger details when relevant). A turn with no `channel` runs without a channel context and applies no channel policy.

## Deliver out of band

`deliverNotice()` sends a message to a channel **without** starting a model turn. Use it for status updates ("your import finished") or to surface an action's [reply attachment](https://developers.cloudflare.com/agents/harnesses/think/actions/#reply-attachments) — it does not run inference, does not enter the turn queue, and is therefore safe to call from inside a tool's `execute`:

```js
export class Assistant extends Think {
	async notify() {
		await this.deliverNotice("Your export is ready to download.");

		await this.deliverNotice("Background research finished.", {
			informModel: true, // also record it in the transcript so the next turn knows
		});
	}
}
```

```ts
export class Assistant extends Think<Env> {
	async notify() {
		await this.deliverNotice("Your export is ready to download.");

		await this.deliverNotice("Background research finished.", {
			informModel: true, // also record it in the transcript so the next turn knows
		});
	}
}
```

```ts
type DeliverNoticeOptions = {
	channel?: string; // defaults to the active turn's channel, else "web"
	informModel?: boolean; // also write to the model-visible transcript (default false)
	kind?: "final" | "interim" | "notice" | "command"; // wire tag (default "notice")
	thread?: string; // required for out-of-turn delivery to a multi-thread messenger
};
```

Behavior depends on the target channel:

* **`web`** — the notice is always appended to the transcript (that is its only render path). `informModel` then only controls the phrasing.
* **`messenger`** — the notice is posted to the provider. Out of turn, pass `thread` to target a conversation. With `informModel: true`, it is also written to the transcript.
* **`voice` / `custom`** — out-of-turn delivery throws, because these surfaces have no delivery target yet.

Override `renderAttachment(attachment)` to turn an action reply attachment into a notice; Think calls it at the end of a turn and delivers the rendered text as a trailing `interim` notice. Return `undefined` to skip an attachment type.

## Relationship to messengers

`configureChannels()` wraps `getMessengers()` — it does not replace it. Each `getMessengers()` entry becomes a `kind: "messenger"` channel, and everything in the [Messengers](https://developers.cloudflare.com/agents/harnesses/think/messengers/) guide (Telegram setup, webhook routing, conversation targets, delivery and recovery) continues to apply. A channel id in `configureChannels()` that collides with a `getMessengers()` id is an error. Keep using `getMessengers()` for messenger-only apps; reach for `configureChannels()` when you also want `web`/`voice`/`custom` policy or out-of-band notices.

## Observability

Channel activity is reported on the `channel` observability channel:

```js
import { subscribe } from "agents/observability";

const unsubscribe = subscribe("channel", (event) => {
	// event.type is one of:
	//   "channel:resolved"  — a turn resolved a registered channel
	//   "channel:delivered" — a turn's final reply was delivered
	//   "notice:delivered"  — deliverNotice() succeeded
	//   "notice:failed"     — deliverNotice() threw
});
```

```ts
import { subscribe } from "agents/observability";

const unsubscribe = subscribe("channel", (event) => {
	// event.type is one of:
	//   "channel:resolved"  — a turn resolved a registered channel
	//   "channel:delivered" — a turn's final reply was delivered
	//   "notice:delivered"  — deliverNotice() succeeded
	//   "notice:failed"     — deliverNotice() threw
});
```

## Reference

| Member                        | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| configureChannels()           | Return the channel map. Defaults to {} (the implicit web channel only). |
| deliverNotice(text, options?) | Send an out-of-band message to a channel with no model turn.            |
| activeChannel                 | The ChannelContext for the in-flight turn, or undefined.                |
| renderAttachment(attachment)  | Map a reply attachment to channel notice text (or undefined to skip).   |
| defineChannels(channels)      | Identity helper for channel-map type inference.                         |
| messengerChannel(definition)  | Wrap a Chat SDK adapter as a kind: "messenger" channel.                 |

## Related

* [Messengers](https://developers.cloudflare.com/agents/harnesses/think/messengers/) — Chat SDK webhook setup and delivery in depth.
* [Actions](https://developers.cloudflare.com/agents/harnesses/think/actions/) — record reply attachments for `renderAttachment()`.
* [Voice](https://developers.cloudflare.com/agents/communication-channels/voice/) — real-time speech surfaces.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/channels/#page","headline":"Channels · Cloudflare Agents docs","description":"Apply per-channel policy, select a channel on a turn, and deliver out-of-band notices across web, messenger, voice, and custom surfaces.","url":"https://developers.cloudflare.com/agents/harnesses/think/channels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
