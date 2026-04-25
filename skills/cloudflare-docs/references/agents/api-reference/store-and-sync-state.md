---
title: Store and sync state
description: Persist and sync Agent state across clients in real time using setState, SQL storage, and bidirectional updates.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Store and sync state

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

**State** is persistent data that survives restarts and syncs across clients. **[Props](https://developers.cloudflare.com/agents/api-reference/routing/#props)** are one-time initialization arguments passed when an agent is instantiated - use props for configuration that does not need to persist.

* [  JavaScript ](#tab-panel-4818)
* [  TypeScript ](#tab-panel-4819)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Defining initial state

Use the `initialState` property to define default values for new agent instances:

* [  JavaScript ](#tab-panel-4808)
* [  TypeScript ](#tab-panel-4809)

JavaScript

```

export class ChatAgent extends Agent {

  initialState = {

    messages: [],

    settings: { theme: "dark", notifications: true },

    lastActive: null,

  };

}


```

TypeScript

```

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

Explain Code

### Type safety

The second generic parameter to `Agent` defines your state type:

* [  JavaScript ](#tab-panel-4804)
* [  TypeScript ](#tab-panel-4805)

JavaScript

```

// State is fully typed

export class MyAgent extends Agent {

  initialState = { count: 0 };


  increment() {

    // TypeScript knows this.state is MyState

    this.setState({ count: this.state.count + 1 });

  }

}


```

TypeScript

```

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

* [  JavaScript ](#tab-panel-4806)
* [  TypeScript ](#tab-panel-4807)

JavaScript

```

class MyAgent extends Agent {

  initialState = { count: 0 };

  async onStart() {

    // Safe to access - returns initialState if new, or persisted state

    console.log("Current count:", this.state.count);

  }

}


```

TypeScript

```

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

* [  JavaScript ](#tab-panel-4814)
* [  TypeScript ](#tab-panel-4815)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

### Undefined state

If you do not define `initialState`, `this.state` returns `undefined`:

* [  JavaScript ](#tab-panel-4810)
* [  TypeScript ](#tab-panel-4811)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Updating state

Use `setState()` to update state. This:

1. Saves to SQLite (persistent)
2. Broadcasts to all connected clients (excluding connections where [shouldSendProtocolMessages](https://developers.cloudflare.com/agents/api-reference/protocol-messages/) returned `false`)
3. Triggers `onStateChanged()` (after broadcast; best-effort)

* [  JavaScript ](#tab-panel-4816)
* [  TypeScript ](#tab-panel-4817)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

### State must be serializable

State is stored as JSON, so it must be serializable:

* [  JavaScript ](#tab-panel-4820)
* [  TypeScript ](#tab-panel-4821)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Responding to state changes

Override `onStateChanged()` to react when state changes (notifications/side-effects):

* [  JavaScript ](#tab-panel-4812)
* [  TypeScript ](#tab-panel-4813)

JavaScript

```

class MyAgent extends Agent {

  onStateChanged(state, source) {

    console.log("State updated:", state);

    console.log("Updated by:", source === "server" ? "server" : source.id);

  }

}


```

TypeScript

```

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

* [  JavaScript ](#tab-panel-4824)
* [  TypeScript ](#tab-panel-4825)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

### Common pattern: Client-driven actions

* [  JavaScript ](#tab-panel-4826)
* [  TypeScript ](#tab-panel-4827)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Validating state updates

If you want to validate or reject state updates, override `validateStateChange()`:

* Runs before persistence and broadcast
* Must be synchronous
* Throwing aborts the update

* [  JavaScript ](#tab-panel-4822)
* [  TypeScript ](#tab-panel-4823)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

Note

`onStateChanged()` is not intended for validation; it is a notification hook and should not block broadcasts. Use `validateStateChange()` for validation.

## Client-side state sync

State synchronizes automatically with connected clients.

### React (useAgent)

* [  JavaScript ](#tab-panel-4834)
* [  TypeScript ](#tab-panel-4835)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

### Vanilla JS (AgentClient)

* [  JavaScript ](#tab-panel-4828)
* [  TypeScript ](#tab-panel-4829)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

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

When using [Workflows](https://developers.cloudflare.com/agents/api-reference/run-workflows/), you can update agent state from workflow steps:

* [  JavaScript ](#tab-panel-4832)
* [  TypeScript ](#tab-panel-4833)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

These are durable operations - they persist even if the workflow retries.

## SQL API

Every individual Agent instance has its own SQL (SQLite) database that runs within the same context as the Agent itself. This means that inserting or querying data within your Agent is effectively zero-latency: the Agent does not have to round-trip across a continent or the world to access its own data.

You can access the SQL API within any method on an Agent via `this.sql`. The SQL API accepts template literals:

* [  JavaScript ](#tab-panel-4830)
* [  TypeScript ](#tab-panel-4831)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

You can also supply a TypeScript type argument to the query, which will be used to infer the type of the result:

* [  JavaScript ](#tab-panel-4836)
* [  TypeScript ](#tab-panel-4837)

JavaScript

```

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

TypeScript

```

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

Explain Code

You do not need to specify an array type (`User[]` or `Array<User>`), as `this.sql` will always return an array of the specified type.

Note

Providing a type parameter does not validate that the result matches your type definition. If you need to validate incoming events, we recommend a library such as [zod ↗](https://zod.dev/) or your own validator logic.

The SQL API exposed to an Agent is similar to the one [within Durable Objects](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#sql-api). You can use the same SQL queries with the Agent's database. Create tables and query data, just as you would with Durable Objects or [D1](https://developers.cloudflare.com/d1/).

## Best practices

### Keep state small

State is broadcast to all clients on every change. For large data:

TypeScript

```

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

Explain Code

### Optimistic updates

For responsive UIs, update client state immediately:

* [  JavaScript ](#tab-panel-4840)
* [  TypeScript ](#tab-panel-4841)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

### State vs SQL

| Use State For                      | Use SQL For       |
| ---------------------------------- | ----------------- |
| UI state (loading, selected items) | Historical data   |
| Real-time counters                 | Large collections |
| Active session data                | Relationships     |
| Configuration                      | Queryable data    |

* [  JavaScript ](#tab-panel-4838)
* [  TypeScript ](#tab-panel-4839)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

### Avoid infinite loops

Be careful not to trigger state updates in response to your own updates:

TypeScript

```

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

Explain Code

## Use Agent state as model context

You can combine the state and SQL APIs in your Agent with its ability to [call AI models](https://developers.cloudflare.com/agents/api-reference/using-ai-models/) to include historical context within your prompts to a model. Modern Large Language Models (LLMs) often have very large context windows (up to millions of tokens), which allows you to pull relevant context into your prompt directly.

For example, you can use an Agent's built-in SQL database to pull history, query a model with it, and append to that history ahead of the next call to the model:

* [  JavaScript ](#tab-panel-4842)
* [  TypeScript ](#tab-panel-4843)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

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

[ Agents API ](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK. 

[ Build a chat agent ](https://developers.cloudflare.com/agents/getting-started/build-a-chat-agent/) Build and deploy an AI chat agent. 

[ WebSockets ](https://developers.cloudflare.com/agents/api-reference/websockets/) Build interactive agents with real-time data streaming. 

[ Run Workflows ](https://developers.cloudflare.com/agents/api-reference/run-workflows/) Orchestrate asynchronous workflows from your agent. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/store-and-sync-state/","name":"Store and sync state"}}]}
```
