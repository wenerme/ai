---
description: Persist Agent state with initialState and setState(), validate client changes, react to updates, and sync state to useAgent clients.
title: Store and sync state
image: https://developers.cloudflare.com/agents/agent-class/state/og.png?v=886569493f00f3d5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Store and sync state

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/agent-class/state/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `Agent` class installs the [`State` capability](https://developers.cloudflare.com/agents/runtime/capabilities/state/) and wires it to its WebSocket connections. State is one value per Agent: it is stored in SQLite, survives restarts and hibernation, and syncs to every connected client. This page covers the `Agent` API. For how state is stored and synced, refer to the [`State` capability](https://developers.cloudflare.com/agents/runtime/capabilities/state/).

## Initial state

```js
import { Agent } from "agents";

export class GameAgent extends Agent {
	initialState = { players: [], status: "waiting" };

	// Runs before a change is stored. Throw to reject it.
	validateStateChange(next, source) {
		if (source !== "server" && next.status !== this.state.status) {
			throw new Error("Only the server can change the game status");
		}
	}

	// Runs after a change is stored and broadcast.
	onStateChanged(state, source) {
		if (source !== "server" && state.players.length >= 2) {
			this.setState({ ...state, status: "playing" });
		}
	}

	addPlayer(name) {
		this.setState({ ...this.state, players: [...this.state.players, name] });
	}
}
```

```ts
import { Agent, type Connection } from "agents";

type GameState = {
	players: string[];
	status: "waiting" | "playing";
};

export class GameAgent extends Agent<Env, GameState> {
	initialState: GameState = { players: [], status: "waiting" };

	// Runs before a change is stored. Throw to reject it.
	validateStateChange(next: GameState, source: Connection | "server") {
		if (source !== "server" && next.status !== this.state.status) {
			throw new Error("Only the server can change the game status");
		}
	}

	// Runs after a change is stored and broadcast.
	onStateChanged(state: GameState, source: Connection | "server") {
		if (source !== "server" && state.players.length >= 2) {
			this.setState({ ...state, status: "playing" });
		}
	}

	addPlayer(name: string) {
		this.setState({ ...this.state, players: [...this.state.players, name] });
	}
}
```

`initialState` applies the first time an Agent reads its state. After that, `this.state` returns the stored value. State must be JSON-serializable.

## Sync with clients

`useAgent` receives every change and can push its own with `setState()`. A client change goes through `validateStateChange()` before it is stored:

```tsx
import { useAgent } from "agents/react";

export function Lobby() {
	const agent = useAgent<{ players: string[]; status: string }>({
		agent: "GameAgent",
		name: "game-1",
	});
	return <p>{agent.state?.players.length ?? 0} players</p>;
}
```

## API

| Member | Description |
| --- | --- |
| `initialState` | Default value for a new Agent |
| `this.state` | The current value |
| `this.setState(state)` | Stores the value and broadcasts it to clients |
| `validateStateChange(next, source)` | Synchronous check before a change is stored. Throw to reject it |
| `onStateChanged(state, source)` | Runs after a change. `source` is `"server"` or the client's `Connection` |

In `onStateChanged()`, ignore changes whose `source` is `"server"` when you call `setState()` from inside it, or you will loop.

For data that does not need to reach clients, use SQLite with `this.sql`. For values a client should only read, make its connection [readonly](https://developers.cloudflare.com/agents/agent-class/readonly-connections/).

## Update state from a Workflow

A [Workflow](https://developers.cloudflare.com/agents/agent-class/run-workflows/) step can change its Agent's state. These calls are durable, so they are not repeated when the Workflow retries:

| Method | Description |
| --- | --- |
| `step.updateAgentState(state)` | Replaces the state |
| `step.mergeAgentState(partial)` | Merges fields into the state |
| `step.resetAgentState()` | Resets the state to `initialState` |

## Next steps

### [State capability](https://developers.cloudflare.com/agents/runtime/capabilities/state/)

How state is validated, stored, and synced on any Durable Object.

### [WebSockets](https://developers.cloudflare.com/agents/agent-class/websockets/)

Handle connections and messages on an Agent.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/agent-class/state/#page","headline":"Store and sync state","description":"Persist Agent state with initialState and setState(), validate client changes, react to updates, and sync state to useAgent clients.","url":"https://developers.cloudflare.com/agents/agent-class/state/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/agent-class/state/og.png?v=886569493f00f3d5","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
