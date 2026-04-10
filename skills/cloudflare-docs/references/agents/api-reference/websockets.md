---
title: WebSockets
description: Agents support WebSocket connections for real-time, bi-directional communication. This page covers server-side WebSocket handling. For client-side connection, refer to the Client SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/websockets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# WebSockets

Agents support WebSocket connections for real-time, bi-directional communication. This page covers server-side WebSocket handling. For client-side connection, refer to the [Client SDK](https://developers.cloudflare.com/agents/api-reference/client-sdk/).

## Lifecycle hooks

Agents have several lifecycle hooks that fire at different points:

| Hook                                        | When called                                               |
| ------------------------------------------- | --------------------------------------------------------- |
| onStart(props?)                             | Once when the agent first starts (before any connections) |
| onRequest(request)                          | When an HTTP request is received (non-WebSocket)          |
| onConnect(connection, ctx)                  | When a new WebSocket connection is established            |
| onMessage(connection, message)              | When a WebSocket message is received                      |
| onClose(connection, code, reason, wasClean) | When a WebSocket connection closes                        |
| onError(connection, error)                  | When a WebSocket error occurs                             |

### `onStart`

`onStart()` is called once when the agent first starts, before any connections are established:

* [  JavaScript ](#tab-panel-2826)
* [  TypeScript ](#tab-panel-2827)

JavaScript

```

export class MyAgent extends Agent {

  async onStart() {

    // Initialize resources

    console.log(`Agent ${this.name} starting...`);


    // Load data from storage

    const savedData = this.sql`SELECT * FROM cache`;

    for (const row of savedData) {

      // Rebuild in-memory state from persistent storage

    }

  }


  onConnect(connection) {

    // By the time connections arrive, onStart has completed

  }

}


```

Explain Code

TypeScript

```

export class MyAgent extends Agent {

  async onStart() {

    // Initialize resources

    console.log(`Agent ${this.name} starting...`);


    // Load data from storage

    const savedData = this.sql`SELECT * FROM cache`;

    for (const row of savedData) {

      // Rebuild in-memory state from persistent storage

    }

  }


  onConnect(connection: Connection) {

    // By the time connections arrive, onStart has completed

  }

}


```

Explain Code

## Handling connections

Define `onConnect` and `onMessage` methods on your Agent to accept WebSocket connections:

* [  JavaScript ](#tab-panel-2832)
* [  TypeScript ](#tab-panel-2833)

JavaScript

```

import { Agent, Connection, ConnectionContext, WSMessage } from "agents";


export class ChatAgent extends Agent {

  async onConnect(connection, ctx) {

    // Connections are automatically accepted

    // Access the original request for auth, headers, cookies

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");


    if (!token) {

      connection.close(4001, "Unauthorized");

      return;

    }


    // Store user info on this connection

    connection.setState({ authenticated: true });

  }


  async onMessage(connection, message) {

    if (typeof message === "string") {

      // Handle text message

      const data = JSON.parse(message);

      connection.send(JSON.stringify({ received: data }));

    }

  }

}


```

Explain Code

TypeScript

```

import { Agent, Connection, ConnectionContext, WSMessage } from "agents";


export class ChatAgent extends Agent {

  async onConnect(connection: Connection, ctx: ConnectionContext) {

    // Connections are automatically accepted

    // Access the original request for auth, headers, cookies

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");


    if (!token) {

      connection.close(4001, "Unauthorized");

      return;

    }


    // Store user info on this connection

    connection.setState({ authenticated: true });

  }


  async onMessage(connection: Connection, message: WSMessage) {

    if (typeof message === "string") {

      // Handle text message

      const data = JSON.parse(message);

      connection.send(JSON.stringify({ received: data }));

    }

  }

}


```

Explain Code

## Connection object

Each connected client has a unique `Connection` object:

| Property/Method       | Type   | Description                           |
| --------------------- | ------ | ------------------------------------- |
| id                    | string | Unique identifier for this connection |
| state                 | State  | Per-connection state object           |
| setState(state)       | void   | Update connection state               |
| send(message)         | void   | Send message to this client           |
| close(code?, reason?) | void   | Close the connection                  |

### Per-connection state

Store data specific to each connection (user info, preferences, etc.):

* [  JavaScript ](#tab-panel-2836)
* [  TypeScript ](#tab-panel-2837)

JavaScript

```

export class ChatAgent extends Agent {

  async onConnect(connection, ctx) {

    const userId = new URL(ctx.request.url).searchParams.get("userId");


    connection.setState({

      userId: userId || "anonymous",

      role: "user",

      joinedAt: Date.now(),

    });

  }


  async onMessage(connection, message) {

    // Access connection-specific state

    console.log(`Message from ${connection.state.userId}`);

  }

}


```

Explain Code

TypeScript

```

interface ConnectionState {

  userId: string;

  role: "admin" | "user";

  joinedAt: number;

}


export class ChatAgent extends Agent {

  async onConnect(

    connection: Connection<ConnectionState>,

    ctx: ConnectionContext,

  ) {

    const userId = new URL(ctx.request.url).searchParams.get("userId");


    connection.setState({

      userId: userId || "anonymous",

      role: "user",

      joinedAt: Date.now(),

    });

  }


  async onMessage(connection: Connection<ConnectionState>, message: WSMessage) {

    // Access connection-specific state

    console.log(`Message from ${connection.state.userId}`);

  }

}


```

Explain Code

## Broadcasting to all clients

Use `this.broadcast()` to send a message to all connected clients:

* [  JavaScript ](#tab-panel-2830)
* [  TypeScript ](#tab-panel-2831)

JavaScript

```

export class ChatAgent extends Agent {

  async onMessage(connection, message) {

    // Broadcast to all connected clients

    this.broadcast(

      JSON.stringify({

        from: connection.id,

        message: message,

        timestamp: Date.now(),

      }),

    );

  }


  // Broadcast from any method

  async notifyAll(event, data) {

    this.broadcast(JSON.stringify({ event, data }));

  }

}


```

Explain Code

TypeScript

```

export class ChatAgent extends Agent {

  async onMessage(connection: Connection, message: WSMessage) {

    // Broadcast to all connected clients

    this.broadcast(

      JSON.stringify({

        from: connection.id,

        message: message,

        timestamp: Date.now(),

      }),

    );

  }


  // Broadcast from any method

  async notifyAll(event: string, data: unknown) {

    this.broadcast(JSON.stringify({ event, data }));

  }

}


```

Explain Code

### Excluding connections

Pass an array of connection IDs to exclude from the broadcast:

* [  JavaScript ](#tab-panel-2824)
* [  TypeScript ](#tab-panel-2825)

JavaScript

```

// Broadcast to everyone except the sender

this.broadcast(

  JSON.stringify({ type: "user-typing", userId: "123" }),

  [connection.id], // Do not send to the originator

);


```

TypeScript

```

// Broadcast to everyone except the sender

this.broadcast(

  JSON.stringify({ type: "user-typing", userId: "123" }),

  [connection.id], // Do not send to the originator

);


```

## Connection tags

Tag connections for easy filtering. Override `getConnectionTags()` to assign tags when a connection is established:

* [  JavaScript ](#tab-panel-2838)
* [  TypeScript ](#tab-panel-2839)

JavaScript

```

export class ChatAgent extends Agent {

  getConnectionTags(connection, ctx) {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");


    const tags = [];

    if (role === "admin") tags.push("admin");

    if (role === "moderator") tags.push("moderator");


    return tags; // Up to 9 tags, max 256 chars each

  }


  // Later, broadcast only to admins

  notifyAdmins(message) {

    for (const conn of this.getConnections("admin")) {

      conn.send(message);

    }

  }

}


```

Explain Code

TypeScript

```

export class ChatAgent extends Agent {

  getConnectionTags(connection: Connection, ctx: ConnectionContext): string[] {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");


    const tags: string[] = [];

    if (role === "admin") tags.push("admin");

    if (role === "moderator") tags.push("moderator");


    return tags; // Up to 9 tags, max 256 chars each

  }


  // Later, broadcast only to admins

  notifyAdmins(message: string) {

    for (const conn of this.getConnections("admin")) {

      conn.send(message);

    }

  }

}


```

Explain Code

### Connection management methods

| Method            | Signature                               | Description                            |
| ----------------- | --------------------------------------- | -------------------------------------- |
| getConnections    | (tag?: string) => Iterable<Connection>  | Get all connections, optionally by tag |
| getConnection     | (id: string) => Connection \| undefined | Get connection by ID                   |
| getConnectionTags | (connection, ctx) => string\[\]         | Override to tag connections            |
| broadcast         | (message, without?: string\[\]) => void | Send to all connections                |

## Handling binary data

Messages can be strings or binary (`ArrayBuffer` / `ArrayBufferView`):

* [  JavaScript ](#tab-panel-2834)
* [  TypeScript ](#tab-panel-2835)

JavaScript

```

export class FileAgent extends Agent {

  async onMessage(connection, message) {

    if (message instanceof ArrayBuffer) {

      // Handle binary upload

      const bytes = new Uint8Array(message);

      await this.processFile(bytes);

      connection.send(

        JSON.stringify({ status: "received", size: bytes.length }),

      );

    } else if (typeof message === "string") {

      // Handle text command

      const command = JSON.parse(message);

      // ...

    }

  }

}


```

Explain Code

TypeScript

```

export class FileAgent extends Agent {

  async onMessage(connection: Connection, message: WSMessage) {

    if (message instanceof ArrayBuffer) {

      // Handle binary upload

      const bytes = new Uint8Array(message);

      await this.processFile(bytes);

      connection.send(

        JSON.stringify({ status: "received", size: bytes.length }),

      );

    } else if (typeof message === "string") {

      // Handle text command

      const command = JSON.parse(message);

      // ...

    }

  }

}


```

Explain Code

Note

Agents automatically send JSON text frames (identity, state, MCP servers) to every connection. If your client only handles binary data and cannot process these frames, use [shouldSendProtocolMessages](https://developers.cloudflare.com/agents/api-reference/protocol-messages/) to suppress them.

## Error and close handling

Handle connection errors and disconnections:

* [  JavaScript ](#tab-panel-2842)
* [  TypeScript ](#tab-panel-2843)

JavaScript

```

export class ChatAgent extends Agent {

  async onError(connection, error) {

    console.error(`Connection ${connection.id} error:`, error);

    // Clean up any resources for this connection

  }


  async onClose(connection, code, reason, wasClean) {

    console.log(`Connection ${connection.id} closed: ${code} ${reason}`);


    // Notify other clients

    this.broadcast(

      JSON.stringify({

        event: "user-left",

        userId: connection.state?.userId,

      }),

    );

  }

}


```

Explain Code

TypeScript

```

export class ChatAgent extends Agent {

  async onError(connection: Connection, error: unknown) {

    console.error(`Connection ${connection.id} error:`, error);

    // Clean up any resources for this connection

  }


  async onClose(

    connection: Connection,

    code: number,

    reason: string,

    wasClean: boolean,

  ) {

    console.log(`Connection ${connection.id} closed: ${code} ${reason}`);


    // Notify other clients

    this.broadcast(

      JSON.stringify({

        event: "user-left",

        userId: connection.state?.userId,

      }),

    );

  }

}


```

Explain Code

## Message types

| Type            | Description                     |
| --------------- | ------------------------------- |
| string          | Text message (typically JSON)   |
| ArrayBuffer     | Binary data                     |
| ArrayBufferView | Typed array view of binary data |

## Hibernation

Agents support hibernation — they can sleep when inactive and wake when needed. This saves resources while maintaining WebSocket connections.

### Enabling hibernation

Hibernation is enabled by default. To disable:

* [  JavaScript ](#tab-panel-2828)
* [  TypeScript ](#tab-panel-2829)

JavaScript

```

export class AlwaysOnAgent extends Agent {

  static options = { hibernate: false };

}


```

TypeScript

```

export class AlwaysOnAgent extends Agent {

  static options = { hibernate: false };

}


```

### How hibernation works

1. Agent is active, handling connections
2. After a period of inactivity with no messages, the agent hibernates (sleeps)
3. WebSocket connections remain open (handled by Cloudflare)
4. When a message arrives, the agent wakes up
5. `onMessage` is called as normal

### What persists across hibernation

| Persists                 | Does not persist    |
| ------------------------ | ------------------- |
| this.state (agent state) | In-memory variables |
| connection.state         | Timers/intervals    |
| SQLite data (this.sql)   | Promises in flight  |
| Connection metadata      | Local caches        |

Store important data in `this.state` or SQLite, not in class properties:

* [  JavaScript ](#tab-panel-2840)
* [  TypeScript ](#tab-panel-2841)

JavaScript

```

export class MyAgent extends Agent {

  initialState = { counter: 0 };


  // Do not do this - lost on hibernation

  localCounter = 0;


  onMessage(connection, message) {

    // Persists across hibernation

    this.setState({ counter: this.state.counter + 1 });


    // Lost after hibernation

    this.localCounter++;

  }

}


```

Explain Code

TypeScript

```

export class MyAgent extends Agent<Env, { counter: number }> {

  initialState = { counter: 0 };


  // Do not do this - lost on hibernation

  private localCounter = 0;


  onMessage(connection: Connection, message: WSMessage) {

    // Persists across hibernation

    this.setState({ counter: this.state.counter + 1 });


    // Lost after hibernation

    this.localCounter++;

  }

}


```

Explain Code

## Common patterns

### Presence tracking

Track who is online using per-connection state. Connection state is automatically cleaned up when users disconnect:

* [  JavaScript ](#tab-panel-2846)
* [  TypeScript ](#tab-panel-2847)

JavaScript

```

export class PresenceAgent extends Agent {

  onConnect(connection, ctx) {

    const url = new URL(ctx.request.url);

    const name = url.searchParams.get("name") || "Anonymous";


    connection.setState({

      name,

      joinedAt: Date.now(),

      lastSeen: Date.now(),

    });


    // Send current presence to new user

    connection.send(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );


    // Notify others that someone joined

    this.broadcastPresence();

  }


  onClose(connection) {

    // No manual cleanup needed - connection state is automatically gone

    this.broadcastPresence();

  }


  onMessage(connection, message) {

    if (message === "ping") {

      connection.setState((prev) => ({

        ...prev,

        lastSeen: Date.now(),

      }));

      connection.send("pong");

    }

  }


  getPresence() {

    const users = {};

    for (const conn of this.getConnections()) {

      if (conn.state) {

        users[conn.id] = {

          name: conn.state.name,

          lastSeen: conn.state.lastSeen,

        };

      }

    }

    return users;

  }


  broadcastPresence() {

    this.broadcast(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );

  }

}


```

Explain Code

TypeScript

```

type UserState = {

  name: string;

  joinedAt: number;

  lastSeen: number;

};


export class PresenceAgent extends Agent {

  onConnect(connection: Connection<UserState>, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    const name = url.searchParams.get("name") || "Anonymous";


    connection.setState({

      name,

      joinedAt: Date.now(),

      lastSeen: Date.now(),

    });


    // Send current presence to new user

    connection.send(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );


    // Notify others that someone joined

    this.broadcastPresence();

  }


  onClose(connection: Connection) {

    // No manual cleanup needed - connection state is automatically gone

    this.broadcastPresence();

  }


  onMessage(connection: Connection<UserState>, message: WSMessage) {

    if (message === "ping") {

      connection.setState((prev) => ({

        ...prev!,

        lastSeen: Date.now(),

      }));

      connection.send("pong");

    }

  }


  private getPresence() {

    const users: Record<string, { name: string; lastSeen: number }> = {};

    for (const conn of this.getConnections<UserState>()) {

      if (conn.state) {

        users[conn.id] = {

          name: conn.state.name,

          lastSeen: conn.state.lastSeen,

        };

      }

    }

    return users;

  }


  private broadcastPresence() {

    this.broadcast(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );

  }

}


```

Explain Code

### Chat room with broadcast

* [  JavaScript ](#tab-panel-2844)
* [  TypeScript ](#tab-panel-2845)

JavaScript

```

export class ChatRoom extends Agent {

  onConnect(connection, ctx) {

    const url = new URL(ctx.request.url);

    const username = url.searchParams.get("username") || "Anonymous";


    connection.setState({ username });


    // Notify others

    this.broadcast(

      JSON.stringify({

        type: "join",

        user: username,

        timestamp: Date.now(),

      }),

      [connection.id], // Do not send to the joining user

    );

  }


  onMessage(connection, message) {

    if (typeof message !== "string") return;


    const { username } = connection.state;


    this.broadcast(

      JSON.stringify({

        type: "message",

        user: username,

        text: message,

        timestamp: Date.now(),

      }),

    );

  }


  onClose(connection) {

    const { username } = connection.state || {};

    if (username) {

      this.broadcast(

        JSON.stringify({

          type: "leave",

          user: username,

          timestamp: Date.now(),

        }),

      );

    }

  }

}


```

Explain Code

TypeScript

```

type Message = {

  type: "message" | "join" | "leave";

  user: string;

  text?: string;

  timestamp: number;

};


export class ChatRoom extends Agent {

  onConnect(connection: Connection, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    const username = url.searchParams.get("username") || "Anonymous";


    connection.setState({ username });


    // Notify others

    this.broadcast(

      JSON.stringify({

        type: "join",

        user: username,

        timestamp: Date.now(),

      } satisfies Message),

      [connection.id], // Do not send to the joining user

    );

  }


  onMessage(connection: Connection, message: WSMessage) {

    if (typeof message !== "string") return;


    const { username } = connection.state as { username: string };


    this.broadcast(

      JSON.stringify({

        type: "message",

        user: username,

        text: message,

        timestamp: Date.now(),

      } satisfies Message),

    );

  }


  onClose(connection: Connection) {

    const { username } = (connection.state as { username: string }) || {};

    if (username) {

      this.broadcast(

        JSON.stringify({

          type: "leave",

          user: username,

          timestamp: Date.now(),

        } satisfies Message),

      );

    }

  }

}


```

Explain Code

## Connecting from clients

For browser connections, use the Agents client SDK:

* **Vanilla JS**: `AgentClient` from `agents/client`
* **React**: `useAgent` hook from `agents/react`

Refer to [Client SDK](https://developers.cloudflare.com/agents/api-reference/client-sdk/) for full documentation.

## Next steps

[ State synchronization ](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) Sync state between agents and clients. 

[ Callable methods ](https://developers.cloudflare.com/agents/api-reference/callable-methods/) RPC over WebSockets for method calls. 

[ Cross-domain authentication ](https://developers.cloudflare.com/agents/guides/cross-domain-authentication/) Secure WebSocket connections across domains. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/websockets/","name":"WebSockets"}}]}
```
