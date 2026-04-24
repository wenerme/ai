---
title: Sub-agents
description: Spawn child agents with isolated storage and typed RPC using subAgent(), abortSubAgent(), and deleteSubAgent().
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/sub-agents.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Sub-agents

Spawn child agents as co-located Durable Objects with their own isolated SQLite storage. The parent gets a typed RPC stub for calling methods on the child — every public method on the child class is callable as a remote procedure call with Promise-wrapped return types.

## Quick start

* [  JavaScript ](#tab-panel-4844)
* [  TypeScript ](#tab-panel-4845)

JavaScript

```

import { Agent } from "agents";


export class Orchestrator extends Agent {

  async delegateWork() {

    const researcher = await this.subAgent(Researcher, "research-1");

    const findings = await researcher.search("cloudflare agents sdk");

    return findings;

  }

}


export class Researcher extends Agent {

  async search(query) {

    const results = await fetch(`https://api.example.com/search?q=${query}`);

    return results.json();

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";


export class Orchestrator extends Agent {

  async delegateWork() {

    const researcher = await this.subAgent(Researcher, "research-1");

    const findings = await researcher.search("cloudflare agents sdk");

    return findings;

  }

}


export class Researcher extends Agent {

  async search(query: string) {

    const results = await fetch(`https://api.example.com/search?q=${query}`);

    return results.json();

  }

}


```

Explain Code

Both classes must be exported from the worker entry point. No separate Durable Object bindings are needed — child classes are discovered automatically via `ctx.exports`.

* [  wrangler.jsonc ](#tab-panel-4834)
* [  wrangler.toml ](#tab-panel-4835)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Set this to today's date

  "compatibility_date": "2026-04-24",

  "compatibility_flags": [

    "nodejs_compat",

    "experimental"

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "Orchestrator",

        "name": "Orchestrator"

      }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": [

        "Orchestrator"

      ],

      "tag": "v1"

    }

  ]

}


```

Explain Code

TOML

```

# Set this to today's date

compatibility_date = "2026-04-24"

compatibility_flags = ["nodejs_compat", "experimental"]


[[durable_objects.bindings]]

class_name = "Orchestrator"

name = "Orchestrator"


[[migrations]]

new_sqlite_classes = ["Orchestrator"]

tag = "v1"


```

Explain Code

Only the parent agent needs a Durable Object binding and migration. Child agents are created as facets of the parent — they share the same machine but have fully isolated SQLite storage.

## subAgent

Get or create a named sub-agent. The first call for a given name triggers the child's `onStart()`. Subsequent calls return the existing instance.

* [  JavaScript ](#tab-panel-4836)
* [  TypeScript ](#tab-panel-4837)

JavaScript

```

class Agent {}


```

TypeScript

```

class Agent {

  async subAgent<T extends Agent>(

    cls: SubAgentClass<T>,

    name: string,

  ): Promise<SubAgentStub<T>>;

}


```

| Parameter | Type             | Description                                                                                                      |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| cls       | SubAgentClass<T> | The Agent subclass. Must be exported from the worker entry point, and the export name must match the class name. |
| name      | string           | Unique name for this child instance. The same name always returns the same child.                                |

Returns a `SubAgentStub<T>` — a typed RPC stub where every user-defined method on `T` is available as a Promise-returning remote call.

### SubAgentStub

The stub exposes all public instance methods you define on the child class. Methods inherited from `Agent` (lifecycle hooks, `setState`, `broadcast`, `sql`, and so on) are excluded — only your custom methods appear on the stub.

Return types are automatically wrapped in `Promise` if they are not already:

* [  JavaScript ](#tab-panel-4846)
* [  TypeScript ](#tab-panel-4847)

JavaScript

```

class MyChild extends Agent {

  greet(name) {

    return `Hello, ${name}`;

  }

  async fetchData(url) {

    return fetch(url).then((r) => r.json());

  }

}


// On the stub:

// greet(name: string) => Promise<string>       (sync → wrapped)

// fetchData(url: string) => Promise<unknown>   (already async → unchanged)


```

Explain Code

TypeScript

```

class MyChild extends Agent {

  greet(name: string): string {

    return `Hello, ${name}`;

  }

  async fetchData(url: string): Promise<unknown> {

    return fetch(url).then((r) => r.json());

  }

}


// On the stub:

// greet(name: string) => Promise<string>       (sync → wrapped)

// fetchData(url: string) => Promise<unknown>   (already async → unchanged)


```

Explain Code

### Requirements

* The child class must extend `Agent`
* The child class must be exported from the worker entry point (`export class MyChild extends Agent`)
* The export name must match the class name — `export { Foo as Bar }` is not supported

## abortSubAgent

Forcefully stop a running sub-agent. The child stops executing immediately and restarts on the next `subAgent()` call. Storage is preserved — only the running instance is killed.

* [  JavaScript ](#tab-panel-4838)
* [  TypeScript ](#tab-panel-4839)

JavaScript

```

class Agent {}


```

TypeScript

```

class Agent {

  abortSubAgent(cls: SubAgentClass, name: string, reason?: unknown): void;

}


```

| Parameter | Type          | Description                                       |
| --------- | ------------- | ------------------------------------------------- |
| cls       | SubAgentClass | The Agent subclass used when creating the child   |
| name      | string        | Name of the child to abort                        |
| reason    | unknown       | Error thrown to any pending or future RPC callers |

Abort is transitive — if the child has its own sub-agents, they are also aborted.

## deleteSubAgent

Abort the child (if running) and permanently wipe its storage. The next `subAgent()` call creates a fresh instance with empty SQLite.

* [  JavaScript ](#tab-panel-4840)
* [  TypeScript ](#tab-panel-4841)

JavaScript

```

class Agent {}


```

TypeScript

```

class Agent {

  deleteSubAgent(cls: SubAgentClass, name: string): void;

}


```

| Parameter | Type          | Description                                     |
| --------- | ------------- | ----------------------------------------------- |
| cls       | SubAgentClass | The Agent subclass used when creating the child |
| name      | string        | Name of the child to delete                     |

Deletion is transitive — the child's own sub-agents are also deleted.

## Storage isolation

Each sub-agent has its own SQLite database, completely isolated from the parent and from other sub-agents. A parent writing to `this.sql` and a child writing to `this.sql` operate on different databases:

* [  JavaScript ](#tab-panel-4852)
* [  TypeScript ](#tab-panel-4853)

JavaScript

```

export class Parent extends Agent {

  async demonstrate() {

    this.sql`INSERT INTO parent_data (key, value) VALUES ('color', 'blue')`;


    const child = await this.subAgent(Child, "child-1");

    await child.increment("clicks");


    // Parent's SQL and child's SQL are completely separate

  }

}


export class Child extends Agent {

  async increment(key) {

    this

      .sql`CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, value INTEGER DEFAULT 0)`;

    this

      .sql`INSERT INTO counters (key, value) VALUES (${key}, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1`;

    const row = this.sql`SELECT value FROM counters WHERE key = ${key}`.one();

    return row?.value ?? 0;

  }

}


```

Explain Code

TypeScript

```

export class Parent extends Agent {

  async demonstrate() {

    this.sql`INSERT INTO parent_data (key, value) VALUES ('color', 'blue')`;


    const child = await this.subAgent(Child, "child-1");

    await child.increment("clicks");


    // Parent's SQL and child's SQL are completely separate

  }

}


export class Child extends Agent {

  async increment(key: string): Promise<number> {

    this

      .sql`CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, value INTEGER DEFAULT 0)`;

    this

      .sql`INSERT INTO counters (key, value) VALUES (${key}, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1`;

    const row = this.sql<{

      value: number;

    }>`SELECT value FROM counters WHERE key = ${key}`.one();

    return row?.value ?? 0;

  }

}


```

Explain Code

## Naming and identity

Two different classes can share the same user-facing name — they are resolved independently. The internal key is a composite of class name and facet name:

* [  JavaScript ](#tab-panel-4842)
* [  TypeScript ](#tab-panel-4843)

JavaScript

```

const counter = await this.subAgent(Counter, "shared-name");

const logger = await this.subAgent(Logger, "shared-name");

// These are two separate sub-agents with separate storage


```

TypeScript

```

const counter = await this.subAgent(Counter, "shared-name");

const logger = await this.subAgent(Logger, "shared-name");

// These are two separate sub-agents with separate storage


```

The child's `this.name` property returns the facet name (not the parent's name):

* [  JavaScript ](#tab-panel-4848)
* [  TypeScript ](#tab-panel-4849)

JavaScript

```

export class Child extends Agent {

  getName() {

    return this.name; // Returns "shared-name", not the parent's ID

  }

}


```

TypeScript

```

export class Child extends Agent {

  getName(): string {

    return this.name; // Returns "shared-name", not the parent's ID

  }

}


```

## Patterns

### Parallel sub-agents

Run multiple sub-agents concurrently:

* [  JavaScript ](#tab-panel-4850)
* [  TypeScript ](#tab-panel-4851)

JavaScript

```

export class Orchestrator extends Agent {

  async runAll(queries) {

    const results = await Promise.all(

      queries.map(async (query, i) => {

        const worker = await this.subAgent(Researcher, `research-${i}`);

        return worker.search(query);

      }),

    );

    return results;

  }

}


```

Explain Code

TypeScript

```

export class Orchestrator extends Agent {

  async runAll(queries: string[]) {

    const results = await Promise.all(

      queries.map(async (query, i) => {

        const worker = await this.subAgent(Researcher, `research-${i}`);

        return worker.search(query);

      }),

    );

    return results;

  }

}


```

Explain Code

### Nested sub-agents

Sub-agents can spawn their own sub-agents, forming a tree:

* [  JavaScript ](#tab-panel-4854)
* [  TypeScript ](#tab-panel-4855)

JavaScript

```

export class Manager extends Agent {

  async delegate(task) {

    const team = await this.subAgent(TeamLead, "team-a");

    return team.assign(task);

  }

}


export class TeamLead extends Agent {

  async assign(task) {

    const worker = await this.subAgent(Worker, "worker-1");

    return worker.execute(task);

  }

}


export class Worker extends Agent {

  async execute(task) {

    return { completed: task };

  }

}


```

Explain Code

TypeScript

```

export class Manager extends Agent {

  async delegate(task: string) {

    const team = await this.subAgent(TeamLead, "team-a");

    return team.assign(task);

  }

}


export class TeamLead extends Agent {

  async assign(task: string) {

    const worker = await this.subAgent(Worker, "worker-1");

    return worker.execute(task);

  }

}


export class Worker extends Agent {

  async execute(task: string) {

    return { completed: task };

  }

}


```

Explain Code

### Callback streaming

Pass an `RpcTarget` callback to stream results from a sub-agent back to the parent:

* [  JavaScript ](#tab-panel-4856)
* [  TypeScript ](#tab-panel-4857)

JavaScript

```

import { RpcTarget } from "cloudflare:workers";


class StreamCollector extends RpcTarget {

  chunks = [];

  onChunk(text) {

    this.chunks.push(text);

  }

}


export class Parent extends Agent {

  async streamFromChild() {

    const child = await this.subAgent(Streamer, "streamer-1");

    const collector = new StreamCollector();

    await child.generate("Write a poem", collector);

    return collector.chunks;

  }

}


export class Streamer extends Agent {

  async generate(prompt, callback) {

    const chunks = ["Once ", "upon ", "a ", "time..."];

    for (const chunk of chunks) {

      callback.onChunk(chunk);

    }

  }

}


```

Explain Code

TypeScript

```

import { RpcTarget } from "cloudflare:workers";


class StreamCollector extends RpcTarget {

  chunks: string[] = [];

  onChunk(text: string) {

    this.chunks.push(text);

  }

}


export class Parent extends Agent {

  async streamFromChild() {

    const child = await this.subAgent(Streamer, "streamer-1");

    const collector = new StreamCollector();

    await child.generate("Write a poem", collector);

    return collector.chunks;

  }

}


export class Streamer extends Agent {

  async generate(prompt: string, callback: StreamCollector) {

    const chunks = ["Once ", "upon ", "a ", "time..."];

    for (const chunk of chunks) {

      callback.onChunk(chunk);

    }

  }

}


```

Explain Code

## Limitations

Sub-agents run as facets of the parent Durable Object. Some `Agent` methods are not available in sub-agents:

| Method           | Behavior in sub-agent                              |
| ---------------- | -------------------------------------------------- |
| schedule()       | Throws "not supported in sub-agents"               |
| cancelSchedule() | Throws "not supported in sub-agents"               |
| keepAlive()      | Throws "not supported in sub-agents"               |
| setState()       | Works normally (writes to the child's own storage) |
| this.sql         | Works normally (child's own SQLite)                |
| subAgent()       | Works — sub-agents can spawn their own children    |

For scheduled work, have the parent schedule the task and delegate to the sub-agent when the schedule fires.

## Related

* [Think](https://developers.cloudflare.com/agents/api-reference/think/) — `chat()` method for streaming AI turns through sub-agents
* [Long-running agents](https://developers.cloudflare.com/agents/concepts/long-running-agents/) — sub-agent delegation in the context of multi-week agent lifetimes
* [Callable methods](https://developers.cloudflare.com/agents/api-reference/callable-methods/) — RPC via `@callable` and service bindings
* [Chat agents](https://developers.cloudflare.com/agents/api-reference/chat-agents/) — `ToolLoopAgent` for in-process AI SDK sub-calls

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/sub-agents/","name":"Sub-agents"}}]}
```
