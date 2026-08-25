---
description: Persist and sync Agent state across clients in real time using setState, SQL storage, and bidirectional updates.
title: Store and sync state
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Store and sync state

Last updated Jun 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/runtime/lifecycle/state/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Agents provide built-in state management with automatic persistence and real-time synchronization across all connected clients.

## Overview

State within an Agent is:

* **Persistent** \- Automatically saves to SQLite, survives restarts and hibernation
* **Synchronized** \- Changes are broadcast to all connected WebSocket clients instantly
* **Bidirectional** \- Both server and clients can update state
* **Type-safe** \- Full TypeScript support with generics
* **Immediately consistent** \- Read your own writes
* **Thread-safe** \- Safe for concurrent updates
* **Fast** \- State is colocated wherever the Agent is running

Agent state is stored in a SQL database embedded within each individual Agent instance. You can interact with it using the higher-level `this.setState` API (recommended), which allows you to sync state and trigger events on state changes, or by directly querying the database with `this.sql`.

State vs Props

**State** is persistent data that survives restarts and syncs across clients. **[Props](https://developers.cloudflare.com/agents/runtime/communication/routing/#props)** are one-time initialization arguments passed when an agent is instantiated - use props for configuration that does not need to persist.

```js
import { Agent } from "agents";

export class GameAgent extends Agent {
	// Default state for new agents
	initialState = {
		players: [],
		score: 0,
		status: "waiting",
	};

	// React to state changes
	onStateChanged(state, source) {
		if (source !== "server" && state.players.length >= 2) {
			// Client added a player, start the game
			this.setState({ ...state, status: "playing" });
		}
	}

	addPlayer(name) {
		this.setState({
			...this.state,
			players: [...this.state.players, name],
		});
	}
}
```

```ts
import { Agent } from "agents";

type GameState = {
	players: string[];
	score: number;
	status: "waiting" | "playing" | "finished";
};

export class GameAgent extends Agent<Env, GameState> {
	// Default state for new agents
	initialState: GameState = {
		players: [],
		score: 0,
		status: "waiting",
	};

	// React to state changes
	onStateChanged(state: GameState, source: Connection | "server") {
		if (source !== "server" && state.players.length >= 2) {
			// Client added a player, start the game
			this.setState({ ...state, status: "playing" });
		}
	}

	addPlayer(name: string) {
		this.setState({
			...this.state,
			players: [...this.state.players, name],
		});
	}
}
```

## Defining initial state

Use the `initialState` property to define default values for new agent instances:

```js
export class ChatAgent extends Agent {
	initialState = {
		messages: [],
		settings: { theme: "dark", notifications: true },
		lastActive: null,
	};
}
```

```ts
type State = {
	messages: Message[];
	settings: UserSettings;
	lastActive: string | null;
};

export class ChatAgent extends Agent<Env, State> {
	initialState: State = {
		messages: [],
		settings: { theme: "dark", notifications: true },
		lastActive: null,
	};
}
```

### Type safety

The second generic parameter to `Agent` defines your state type:

```js
// State is fully typed
export class MyAgent extends Agent {
	initialState = { count: 0 };

	increment() {
		// TypeScript knows this.state is MyState
		this.setState({ count: this.state.count + 1 });
	}
}
```

```ts
// State is fully typed
export class MyAgent extends Agent<Env, MyState> {
	initialState: MyState = { count: 0 };

	increment() {
		// TypeScript knows this.state is MyState
		this.setState({ count: this.state.count + 1 });
	}
}
```

### When initial state applies

Initial state is applied lazily on first access, not on every wake:

1. **New agent** \- `initialState` is used and persisted
2. **Existing agent** \- Persisted state is loaded from SQLite
3. **No `initialState` defined** \- `this.state` is `undefined`

```js
class MyAgent extends Agent {
	initialState = { count: 0 };
	async onStart() {
		// Safe to access - returns initialState if new, or persisted state
		console.log("Current count:", this.state.count);
	}
}
```

```ts
class MyAgent extends Agent<Env, { count: number }> {
	initialState = { count: 0 };
	async onStart() {
		// Safe to access - returns initialState if new, or persisted state
		console.log("Current count:", this.state.count);
	}
}
```

## Reading state

Access the current state via the `this.state` getter:

```js
class MyAgent extends Agent {
	async onRequest(request) {
		// Read current state
		const { players, status } = this.state;

		if (status === "waiting" && players.length < 2) {
			return new Response("Waiting for players...");
		}

		return Response.json(this.state);
	}
}
```

```ts
class MyAgent extends Agent<
	Env,
	{ players: string[]; status: "waiting" | "playing" | "finished" }
> {
	async onRequest(request: Request) {
		// Read current state
		const { players, status } = this.state;

		if (status === "waiting" && players.length < 2) {
			return new Response("Waiting for players...");
		}

		return Response.json(this.state);
	}
}
```

### Undefined state

If you do not define `initialState`, `this.state` returns `undefined`:

```js
export class MinimalAgent extends Agent {
	// No initialState defined

	async onConnect(connection) {
		if (!this.state) {
			// First time - initialize state
			this.setState({ initialized: true });
		}
	}
}
```

```ts
export class MinimalAgent extends Agent {
	// No initialState defined

	async onConnect(connection: Connection) {
		if (!this.state) {
			// First time - initialize state
			this.setState({ initialized: true });
		}
	}
}
```

## Updating state

Use `setState()` to update state. This:

1. Saves to SQLite (persistent)
2. Broadcasts to all connected clients (excluding connections where [shouldSendProtocolMessages](https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/) returned `false`)
3. Triggers `onStateChanged()` (after broadcast; best-effort)

```js
// Replace entire state
this.setState({
	players: ["Alice", "Bob"],
	score: 0,
	status: "playing",
});

// Update specific fields (spread existing state)
this.setState({
	...this.state,
	score: this.state.score + 10,
});
```

```ts
// Replace entire state
this.setState({
	players: ["Alice", "Bob"],
	score: 0,
	status: "playing",
});

// Update specific fields (spread existing state)
this.setState({
	...this.state,
	score: this.state.score + 10,
});
```

### State must be serializable

State is stored as JSON, so it must be serializable:

```js
// Good - plain objects, arrays, primitives
this.setState({
	items: ["a", "b", "c"],
	count: 42,
	active: true,
	metadata: { key: "value" },
});

// Bad - functions, classes, circular references
// Functions do not serialize
// Dates become strings, lose methods
// Circular references fail

// For dates, use ISO strings
this.setState({
	createdAt: new Date().toISOString(),
});
```

```ts
// Good - plain objects, arrays, primitives
this.setState({
	items: ["a", "b", "c"],
	count: 42,
	active: true,
	metadata: { key: "value" },
});

// Bad - functions, classes, circular references
// Functions do not serialize
// Dates become strings, lose methods
// Circular references fail

// For dates, use ISO strings
this.setState({
	createdAt: new Date().toISOString(),
});
```

## Responding to state changes

Override `onStateChanged()` to react when state changes (notifications/side-effects):

```js
class MyAgent extends Agent {
	onStateChanged(state, source) {
		console.log("State updated:", state);
		console.log("Updated by:", source === "server" ? "server" : source.id);
	}
}
```

```ts
class MyAgent extends Agent<Env, GameState> {
	onStateChanged(state: GameState, source: Connection | "server") {
		console.log("State updated:", state);
		console.log("Updated by:", source === "server" ? "server" : source.id);
	}
}
```

### The source parameter

The `source` shows who triggered the update:

| Value      | Meaning                             |
| ---------- | ----------------------------------- |
| "server"   | Agent called setState()             |
| Connection | A client pushed state via WebSocket |

This is useful for:

* Avoiding infinite loops (do not react to your own updates)
* Validating client input
* Triggering side effects only on client actions

```js
class MyAgent extends Agent {
	onStateChanged(state, source) {
		// Ignore server-initiated updates
		if (source === "server") return;

		// A client updated state - validate and process
		const connection = source;
		console.log(`Client ${connection.id} updated state`);

		// Maybe trigger something based on the change
		if (state.status === "submitted") {
			this.processSubmission(state);
		}
	}
}
```

```ts
class MyAgent extends Agent<
	Env,
	{ status: "waiting" | "playing" | "finished" }
> {
	onStateChanged(state: GameState, source: Connection | "server") {
		// Ignore server-initiated updates
		if (source === "server") return;

		// A client updated state - validate and process
		const connection = source;
		console.log(`Client ${connection.id} updated state`);

		// Maybe trigger something based on the change
		if (state.status === "submitted") {
			this.processSubmission(state);
		}
	}
}
```

### Common pattern: Client-driven actions

```js
class MyAgent extends Agent {
	onStateChanged(state, source) {
		if (source === "server") return;

		// Client added a message
		const lastMessage = state.messages[state.messages.length - 1];
		if (lastMessage && !lastMessage.processed) {
			// Process and update
			this.setState({
				...state,
				messages: state.messages.map((m) =>
					m.id === lastMessage.id ? { ...m, processed: true } : m,
				),
			});
		}
	}
}
```

```ts
class MyAgent extends Agent<Env, { messages: Message[] }> {
	onStateChanged(state: State, source: Connection | "server") {
		if (source === "server") return;

		// Client added a message
		const lastMessage = state.messages[state.messages.length - 1];
		if (lastMessage && !lastMessage.processed) {
			// Process and update
			this.setState({
				...state,
				messages: state.messages.map((m) =>
					m.id === lastMessage.id ? { ...m, processed: true } : m,
				),
			});
		}
	}
}
```

## Validating state updates

If you want to validate or reject state updates, override `validateStateChange()`:

* Runs before persistence and broadcast
* Must be synchronous
* Throwing aborts the update

```js
class MyAgent extends Agent {
	validateStateChange(nextState, source) {
		// Example: reject negative scores
		if (nextState.score < 0) {
			throw new Error("score cannot be negative");
		}

		// Example: only allow certain status transitions
		if (this.state.status === "finished" && nextState.status !== "finished") {
			throw new Error("Cannot restart a finished game");
		}
	}
}
```

```ts
class MyAgent extends Agent<Env, GameState> {
	validateStateChange(nextState: GameState, source: Connection | "server") {
		// Example: reject negative scores
		if (nextState.score < 0) {
			throw new Error("score cannot be negative");
		}

		// Example: only allow certain status transitions
		if (this.state.status === "finished" && nextState.status !== "finished") {
			throw new Error("Cannot restart a finished game");
		}
	}
}
```

Note

`onStateChanged()` is not intended for validation; it is a notification hook and should not block broadcasts. Use `validateStateChange()` for validation.

## Client-side state sync

State synchronizes automatically with connected clients.

### React (useAgent)

```js
import { useAgent } from "agents/react";

function GameUI() {
	const agent = useAgent({
		agent: "game-agent",
		name: "room-123",
		onStateUpdate: (state, source) => {
			console.log("State updated:", state);
		},
	});

	// Push state to agent
	const addPlayer = (name) => {
		agent.setState({
			...agent.state,
			players: [...agent.state.players, name],
		});
	};

	return <div>Players: {agent.state?.players.join(", ")}</div>;
}
```

```ts
import { useAgent } from "agents/react";

function GameUI() {
  const agent = useAgent({
    agent: "game-agent",
    name: "room-123",
    onStateUpdate: (state, source) => {
      console.log("State updated:", state);
    }
  });

  // Push state to agent
  const addPlayer = (name: string) => {
    agent.setState({
      ...agent.state,
      players: [...agent.state.players, name]
    });
  };

  return <div>Players: {agent.state?.players.join(", ")}</div>;
}
```

### Vanilla JS (AgentClient)

```js
import { AgentClient } from "agents/client";

const client = new AgentClient({
	agent: "game-agent",
	name: "room-123",
	onStateUpdate: (state) => {
		document.getElementById("score").textContent = state.score;
	},
});

// Push state update
client.setState({ ...client.state, score: 100 });
```

```ts
import { AgentClient } from "agents/client";

const client = new AgentClient({
	agent: "game-agent",
	name: "room-123",
	onStateUpdate: (state) => {
		document.getElementById("score").textContent = state.score;
	},
});

// Push state update
client.setState({ ...client.state, score: 100 });
```

### State flow

flowchart TD
    subgraph Agent
        S["this.state<br/>(persisted in SQLite)"]
    end
    subgraph Clients
        C1["Client 1"]
        C2["Client 2"]
        C3["Client 3"]
    end
    C1 & C2 & C3 -->|setState| S
    S -->|broadcast via WebSocket| C1 & C2 & C3

## State from Workflows

When using [Workflows](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/), you can update agent state from workflow steps:

```js
// In your workflow
class MyWorkflow extends Workflow {
	async run(event, step) {
		// Replace entire state
		await step.updateAgentState({ status: "processing", progress: 0 });

		// Merge partial updates (preserves other fields)
		await step.mergeAgentState({ progress: 50 });

		// Reset to initialState
		await step.resetAgentState();

		return result;
	}
}
```

```ts
// In your workflow
class MyWorkflow extends Workflow<Env> {
	async run(event: AgentWorkflowEvent, step: AgentWorkflowStep) {
		// Replace entire state
		await step.updateAgentState({ status: "processing", progress: 0 });

		// Merge partial updates (preserves other fields)
		await step.mergeAgentState({ progress: 50 });

		// Reset to initialState
		await step.resetAgentState();

		return result;
	}
}
```

These are durable operations - they persist even if the workflow retries.

## SQL API

Every individual Agent instance has its own SQL (SQLite) database that runs within the same context as the Agent itself. This means that inserting or querying data within your Agent is effectively zero-latency: the Agent does not have to round-trip across a continent or the world to access its own data.

You can access the SQL API within any method on an Agent via `this.sql`. The SQL API accepts template literals:

```js
export class MyAgent extends Agent {
	async onRequest(request) {
		let userId = new URL(request.url).searchParams.get("userId");

		// 'users' is just an example here: you can create arbitrary tables and define your own schemas
		// within each Agent's database using SQL (SQLite syntax).
		let [user] = this.sql`SELECT * FROM users WHERE id = ${userId}`;
		return Response.json(user);
	}
}
```

```ts
export class MyAgent extends Agent {
	async onRequest(request: Request) {
		let userId = new URL(request.url).searchParams.get("userId");

		// 'users' is just an example here: you can create arbitrary tables and define your own schemas
		// within each Agent's database using SQL (SQLite syntax).
		let [user] = this.sql`SELECT * FROM users WHERE id = ${userId}`;
		return Response.json(user);
	}
}
```

You can also supply a TypeScript type argument to the query, which will be used to infer the type of the result:

```js
export class MyAgent extends Agent {
	async onRequest(request) {
		let userId = new URL(request.url).searchParams.get("userId");
		// Supply the type parameter to the query when calling this.sql
		// This assumes the results returns one or more User rows with "id", "name", and "email" columns
		const [user] = this.sql`SELECT * FROM users WHERE id = ${userId}`;
		return Response.json(user);
	}
}
```

```ts
type User = {
	id: string;
	name: string;
	email: string;
};

export class MyAgent extends Agent {
	async onRequest(request: Request) {
		let userId = new URL(request.url).searchParams.get("userId");
		// Supply the type parameter to the query when calling this.sql
		// This assumes the results returns one or more User rows with "id", "name", and "email" columns
		const [user] = this.sql<User>`SELECT * FROM users WHERE id = ${userId}`;
		return Response.json(user);
	}
}
```

You do not need to specify an array type (`User[]` or `Array<User>`), as `this.sql` will always return an array of the specified type.

Note

Providing a type parameter does not validate that the result matches your type definition. If you need to validate incoming events, we recommend a library such as [zod ↗](https://zod.dev/) or your own validator logic.

The SQL API exposed to an Agent is similar to the one [within Durable Objects](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#sql-api). You can use the same SQL queries with the Agent's database. Create tables and query data, just as you would with Durable Objects or [D1](https://developers.cloudflare.com/d1/).

## Best practices

### Keep state small

State is broadcast to all clients on every change. For large data:

```ts
// Bad - storing large arrays in state
initialState = {
  allMessages: [] // Could grow to thousands of items
};

// Good - store in SQL, keep state light
initialState = {
  messageCount: 0,
  lastMessageId: null
};

// Query SQL for full data
async getMessages(limit = 50) {
  return this.sql`SELECT * FROM messages ORDER BY created_at DESC LIMIT ${limit}`;
}
```

### Optimistic updates

For responsive UIs, update client state immediately:

```js
// Client-side
function sendMessage(text) {
	const optimisticMessage = {
		id: crypto.randomUUID(),
		text,
		pending: true,
	};

	// Update immediately
	agent.setState({
		...agent.state,
		messages: [...agent.state.messages, optimisticMessage],
	});

	// Server will confirm/update
}

// Server-side
class MyAgent extends Agent {
	onStateChanged(state, source) {
		if (source === "server") return;

		const pendingMessages = state.messages.filter((m) => m.pending);
		for (const msg of pendingMessages) {
			// Validate and confirm
			this.setState({
				...state,
				messages: state.messages.map((m) =>
					m.id === msg.id ? { ...m, pending: false, timestamp: Date.now() } : m,
				),
			});
		}
	}
}
```

```ts
// Client-side
function sendMessage(text: string) {
	const optimisticMessage = {
		id: crypto.randomUUID(),
		text,
		pending: true,
	};

	// Update immediately
	agent.setState({
		...agent.state,
		messages: [...agent.state.messages, optimisticMessage],
	});

	// Server will confirm/update
}

// Server-side
class MyAgent extends Agent<Env, { messages: Message[] }> {
	onStateChanged(state: GameState, source: Connection | "server") {
		if (source === "server") return;

		const pendingMessages = state.messages.filter((m) => m.pending);
		for (const msg of pendingMessages) {
			// Validate and confirm
			this.setState({
				...state,
				messages: state.messages.map((m) =>
					m.id === msg.id ? { ...m, pending: false, timestamp: Date.now() } : m,
				),
			});
		}
	}
}
```

### State vs SQL

| Use State For                      | Use SQL For       |
| ---------------------------------- | ----------------- |
| UI state (loading, selected items) | Historical data   |
| Real-time counters                 | Large collections |
| Active session data                | Relationships     |
| Configuration                      | Queryable data    |

```js
export class ChatAgent extends Agent {
	// State: current UI state
	initialState = {
		typing: [],
		unreadCount: 0,
		activeUsers: [],
	};

	// SQL: message history
	async getMessages(limit = 100) {
		return this.sql`
      SELECT * FROM messages
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
	}

	async saveMessage(message) {
		this.sql`
      INSERT INTO messages (id, text, user_id, created_at)
      VALUES (${message.id}, ${message.text}, ${message.userId}, ${Date.now()})
    `;
		// Update state for real-time UI
		this.setState({
			...this.state,
			unreadCount: this.state.unreadCount + 1,
		});
	}
}
```

```ts
export class ChatAgent extends Agent {
	// State: current UI state
	initialState = {
		typing: [],
		unreadCount: 0,
		activeUsers: [],
	};

	// SQL: message history
	async getMessages(limit = 100) {
		return this.sql`
      SELECT * FROM messages
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
	}

	async saveMessage(message: Message) {
		this.sql`
      INSERT INTO messages (id, text, user_id, created_at)
      VALUES (${message.id}, ${message.text}, ${message.userId}, ${Date.now()})
    `;
		// Update state for real-time UI
		this.setState({
			...this.state,
			unreadCount: this.state.unreadCount + 1,
		});
	}
}
```

### Avoid infinite loops

Be careful not to trigger state updates in response to your own updates:

```ts
// Bad - infinite loop
onStateChanged(state: State) {
  this.setState({ ...state, lastUpdated: Date.now() });
}

// Good - check source
onStateChanged(state: State, source: Connection | "server") {
  if (source === "server") return; // Do not react to own updates
  this.setState({ ...state, lastUpdated: Date.now() });
}
```

## Use Agent state as model context

You can combine the state and SQL APIs in your Agent with its ability to [call AI models](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/) to include historical context within your prompts to a model. Modern Large Language Models (LLMs) often have very large context windows (up to millions of tokens), which allows you to pull relevant context into your prompt directly.

For example, you can use an Agent's built-in SQL database to pull history, query a model with it, and append to that history ahead of the next call to the model:

```js
export class ReasoningAgent extends Agent {
	async callReasoningModel(prompt) {
		let result = this
			.sql`SELECT * FROM history WHERE user = ${prompt.userId} ORDER BY timestamp DESC LIMIT 1000`;
		let context = [];
		for (const row of result) {
			context.push(row.entry);
		}

		const systemPrompt = prompt.system || "You are a helpful assistant.";
		const userPrompt = `${prompt.user}\n\nUser history:\n${context.join("\n")}`;

		try {
			const response = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: userPrompt },
				],
			});

			// Store the response in history
			this
				.sql`INSERT INTO history (timestamp, user, entry) VALUES (${new Date()}, ${prompt.userId}, ${response.response})`;

			return response.response;
		} catch (error) {
			console.error("Error calling reasoning model:", error);
			throw error;
		}
	}
}
```

```ts
interface Env {
	AI: Ai;
}

export class ReasoningAgent extends Agent<Env> {
	async callReasoningModel(prompt: Prompt) {
		let result = this
			.sql<History>`SELECT * FROM history WHERE user = ${prompt.userId} ORDER BY timestamp DESC LIMIT 1000`;
		let context = [];
		for (const row of result) {
			context.push(row.entry);
		}

		const systemPrompt = prompt.system || "You are a helpful assistant.";
		const userPrompt = `${prompt.user}\n\nUser history:\n${context.join("\n")}`;

		try {
			const response = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: userPrompt },
				],
			});

			// Store the response in history
			this
				.sql`INSERT INTO history (timestamp, user, entry) VALUES (${new Date()}, ${prompt.userId}, ${response.response})`;

			return response.response;
		} catch (error) {
			console.error("Error calling reasoning model:", error);
			throw error;
		}
	}
}
```

This works because each instance of an Agent has its own database, and the state stored in that database is private to that Agent: whether it is acting on behalf of a single user, a room or channel, or a deep research tool. By default, you do not have to manage contention or reach out over the network to a centralized database to retrieve and store state.

## API reference

### Properties

| Property     | Type  | Description                  |
| ------------ | ----- | ---------------------------- |
| state        | State | Current state (getter)       |
| initialState | State | Default state for new agents |

### Methods

| Method              | Signature                                                  | Description                                   |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------- |
| setState            | (state: State) => void                                     | Update state, persist, and broadcast          |
| onStateChanged      | (state: State, source: Connection \| "server") => void     | Called when state changes                     |
| validateStateChange | (nextState: State, source: Connection \| "server") => void | Validate before persistence (throw to reject) |

### Workflow step methods

| Method                        | Description                         |
| ----------------------------- | ----------------------------------- |
| step.updateAgentState(state)  | Replace agent state from workflow   |
| step.mergeAgentState(partial) | Merge partial state from workflow   |
| step.resetAgentState()        | Reset to initialState from workflow |

## Next steps

### [Agents API](https://developers.cloudflare.com/agents/runtime/agents-api/)

Complete API reference for the Agents SDK.

### [Build a chat agent](https://developers.cloudflare.com/agents/examples/chat-agent/)

Build and deploy an AI chat agent.

### [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/)

Build interactive agents with real-time data streaming.

### [Run Workflows](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/)

Orchestrate asynchronous workflows from your agent.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/lifecycle/state/#page","headline":"Store and sync state · Cloudflare Agents docs","description":"Persist and sync Agent state across clients in real time using setState, SQL storage, and bidirectional updates.","url":"https://developers.cloudflare.com/agents/runtime/lifecycle/state/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
