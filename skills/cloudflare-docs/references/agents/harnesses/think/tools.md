---
title: Tools
description: Built-in workspace tools (including bash), custom tools, approvals, MCP tools, code execution, browser tools, and extensions for Think agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tools

Think provides built-in workspace file tools on every turn, plus integration points for custom tools, code execution, and dynamic extensions.

## Tool merge order

On every turn, Think merges tools from multiple sources. Later sources override earlier ones if names collide:

1. **Workspace tools** — `read`, `write`, `edit`, `list`, `find`, `grep`, `delete`, `bash` (built-in)
2. **`getTools()`** — your custom server-side tools
3. **Extension tools** — tools from loaded extensions (prefixed by extension name)
4. **Session tools** — `set_context`, `load_context`, `search_context` (from `configureSession`)
5. **Skill tools** — `activate_skill`, `read_skill_resource`, `run_skill_script` (from `getSkills()`, refer to [Agent Skills](https://developers.cloudflare.com/agents/runtime/execution/agent-skills/))
6. **MCP tools** — from connected MCP servers
7. **Client tools** — from the browser (refer to [Client tools](https://developers.cloudflare.com/agents/harnesses/think/client-tools/))

Tools belong to the agent running the turn. For parent-child orchestration, use [Agent tools](https://developers.cloudflare.com/agents/runtime/execution/agent-tools/) instead of passing one-off tools through `chat()`.

## Built-in workspace tools

Every Think agent gets `this.workspace` — a virtual filesystem backed by Durable Object SQLite. Workspace tools are automatically available to the model with no configuration.

| Tool   | Description                                                                 |
| ------ | --------------------------------------------------------------------------- |
| read   | Read text with line numbers; pass images and PDFs to multimodal models      |
| write  | Write content to a file (creates parent directories)                        |
| edit   | Apply a find-and-replace edit to an existing file (supports fuzzy matching) |
| list   | List files and directories in a path                                        |
| find   | Find files matching a glob pattern                                          |
| grep   | Search file contents by regex or fixed string                               |
| delete | Delete a file or directory                                                  |
| bash   | Run a sandboxed Bash script against workspace files                         |

The `bash` tool is enabled by default. It mounts workspace files into a `just-bash` virtual filesystem, runs with network access disabled, and writes created, updated, and deleted files and empty directories back to the workspace. Use it for shell-style workflows that combine multiple file operations; use the narrower tools for simple reads, writes, and edits.

To keep tool calls bounded, the Bash tool snapshots up to 1,000 workspace files by default and skips files larger than 1 MB. Skipped files are reported in the tool result and are treated as protected during write-back so the script cannot accidentally overwrite or delete content that was not mounted. You can tune `maxWorkspaceFiles`, `maxWorkspaceFileBytes`, `maxOutputBytes`, `timeout`, and `network` through `workspaceBash`.

Disable the default Bash tool for conservative deployments:

* [  JavaScript ](#tab-panel-5052)
* [  TypeScript ](#tab-panel-5053)

JavaScript

```

export class MyAgent extends Think {

  workspaceBash = false;


  getModel() {

    /* ... */

  }

}


```

TypeScript

```

export class MyAgent extends Think<Env> {

  workspaceBash = false;


  getModel() {

    /* ... */

  }

}


```

### R2 spillover

By default, the workspace stores everything in SQLite. For large files, override `workspace` to add R2 spillover:

* [  JavaScript ](#tab-panel-5058)
* [  TypeScript ](#tab-panel-5059)

JavaScript

```

import { Think } from "@cloudflare/think";

import { Workspace } from "@cloudflare/shell";


export class MyAgent extends Think {

  workspace = new Workspace({

    sql: this.ctx.storage.sql,

    r2: this.env.R2,

    name: () => this.name,

  });


  getModel() {

    /* ... */

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { Workspace } from "@cloudflare/shell";


export class MyAgent extends Think<Env> {

  override workspace = new Workspace({

    sql: this.ctx.storage.sql,

    r2: this.env.R2,

    name: () => this.name,

  });


  getModel() {

    /* ... */

  }

}


```

This requires an R2 bucket binding:

* [  wrangler.jsonc ](#tab-panel-5048)
* [  wrangler.toml ](#tab-panel-5049)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "r2_buckets": [

    {

      "binding": "R2",

      "bucket_name": "agent-files"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "R2"

bucket_name = "agent-files"


```

## Custom tools

Override `getTools()` to add your own tools. These are standard AI SDK `tool()` definitions with Zod schemas:

* [  JavaScript ](#tab-panel-5070)
* [  TypeScript ](#tab-panel-5071)

JavaScript

```

import { Think } from "@cloudflare/think";

import { tool } from "ai";


import { z } from "zod";


export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  getTools() {

    return {

      getWeather: tool({

        description: "Get the current weather for a city",

        inputSchema: z.object({

          city: z.string().describe("City name"),

        }),

        execute: async ({ city }) => {

          const res = await fetch(

            `https://api.weather.com/v1/current?q=${city}&key=${this.env.WEATHER_KEY}`,

          );

          return res.json();

        },

      }),

    };

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { tool } from "ai";

import type { ToolSet } from "ai";

import { z } from "zod";


export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  getTools(): ToolSet {

    return {

      getWeather: tool({

        description: "Get the current weather for a city",

        inputSchema: z.object({

          city: z.string().describe("City name"),

        }),

        execute: async ({ city }) => {

          const res = await fetch(

            `https://api.weather.com/v1/current?q=${city}&key=${this.env.WEATHER_KEY}`,

          );

          return res.json();

        },

      }),

    };

  }

}


```

Custom tools are merged with workspace tools automatically. If a custom tool has the same name as a workspace tool, the custom tool wins.

## Tool approval

Tools can require user approval before execution using the `needsApproval` option:

TypeScript

```

getTools(): ToolSet {

  return {

    deleteFile: tool({

      description: "Delete a file from the system",

      inputSchema: z.object({ path: z.string() }),

      needsApproval: async ({ path }) => path.startsWith("/important/"),

      execute: async ({ path }) => {

        await this.workspace.rm(path);

        return { deleted: path };

      },

    }),

  };

}


```

When `needsApproval` returns `true`, the tool call is sent to the client for approval. The conversation pauses until the client responds with `CF_AGENT_TOOL_APPROVAL`.

## Per-turn tool overrides

The `beforeTurn` hook can restrict or add tools for a specific turn:

TypeScript

```

beforeTurn(ctx: TurnContext) {

  return {

    activeTools: ["read", "write", "getWeather"],

    tools: { emergencyTool: this.createEmergencyTool() },

  };

}


```

`activeTools` limits which tools the model can call. `tools` adds extra tools for this turn only (merged on top of existing tools).

## MCP tools

Think inherits MCP client support from the `Agent` base class. MCP tools from connected servers are automatically merged into every turn.

Set `waitForMcpConnections` to ensure MCP servers are connected before inference runs:

* [  JavaScript ](#tab-panel-5056)
* [  TypeScript ](#tab-panel-5057)

JavaScript

```

export class MyAgent extends Think {

  waitForMcpConnections = true; // default 10s timeout

  // or: waitForMcpConnections = { timeout: 5000 };


  getModel() {

    /* ... */

  }

}


```

TypeScript

```

export class MyAgent extends Think<Env> {

  waitForMcpConnections = true; // default 10s timeout

  // or: waitForMcpConnections = { timeout: 5000 };


  getModel() {

    /* ... */

  }

}


```

Add MCP servers programmatically or via `@callable` methods:

* [  JavaScript ](#tab-panel-5064)
* [  TypeScript ](#tab-panel-5065)

JavaScript

```

import { callable } from "agents";


export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  @callable()

  async addServer(name, url) {

    return await this.addMcpServer(name, url);

  }


  @callable()

  async removeServer(serverId) {

    await this.removeMcpServer(serverId);

  }

}


```

TypeScript

```

import { callable } from "agents";


export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  @callable()

  async addServer(name: string, url: string) {

    return await this.addMcpServer(name, url);

  }


  @callable()

  async removeServer(serverId: string) {

    await this.removeMcpServer(serverId);

  }

}


```

## Code execution tool

Let the LLM write and run JavaScript in a sandboxed Worker. Requires `@cloudflare/codemode` and a `worker_loaders` binding.

Terminal window

```

npm install @cloudflare/codemode


```

* [  JavaScript ](#tab-panel-5068)
* [  TypeScript ](#tab-panel-5069)

JavaScript

```

import { Think } from "@cloudflare/think";

import { createExecuteTool } from "@cloudflare/think/tools/execute";

import { createWorkspaceTools } from "@cloudflare/think/tools/workspace";


export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  getTools() {

    return {

      execute: createExecuteTool({

        tools: createWorkspaceTools(this.workspace),

        loader: this.env.LOADER,

      }),

    };

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { createExecuteTool } from "@cloudflare/think/tools/execute";

import { createWorkspaceTools } from "@cloudflare/think/tools/workspace";


export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  getTools() {

    return {

      execute: createExecuteTool({

        tools: createWorkspaceTools(this.workspace),

        loader: this.env.LOADER,

      }),

    };

  }

}


```

* [  wrangler.jsonc ](#tab-panel-5050)
* [  wrangler.toml ](#tab-panel-5051)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "worker_loaders": [

    {

      "binding": "LOADER"

    }

  ]

}


```

TOML

```

[[worker_loaders]]

binding = "LOADER"


```

For richer filesystem access, pass a `state` backend:

* [  JavaScript ](#tab-panel-5060)
* [  TypeScript ](#tab-panel-5061)

JavaScript

```

import { createWorkspaceStateBackend } from "@cloudflare/shell";


createExecuteTool({

  tools: myDomainTools,

  state: createWorkspaceStateBackend(this.workspace),

  loader: this.env.LOADER,

});


```

TypeScript

```

import { createWorkspaceStateBackend } from "@cloudflare/shell";


createExecuteTool({

  tools: myDomainTools,

  state: createWorkspaceStateBackend(this.workspace),

  loader: this.env.LOADER,

});


```

## Browser tools

Give your agent access to the Chrome DevTools Protocol (CDP) for web page inspection, scraping, screenshots, and debugging. Requires `@cloudflare/codemode` and a Browser Run binding.

* [  JavaScript ](#tab-panel-5072)
* [  TypeScript ](#tab-panel-5073)

JavaScript

```

import { Think } from "@cloudflare/think";

import { createBrowserTools } from "@cloudflare/think/tools/browser";


export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  getTools() {

    return {

      ...createBrowserTools({

        browser: this.env.BROWSER,

        loader: this.env.LOADER,

      }),

    };

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { createBrowserTools } from "@cloudflare/think/tools/browser";


export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  getTools() {

    return {

      ...createBrowserTools({

        browser: this.env.BROWSER,

        loader: this.env.LOADER,

      }),

    };

  }

}


```

* [  wrangler.jsonc ](#tab-panel-5054)
* [  wrangler.toml ](#tab-panel-5055)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "browser": {

    "binding": "BROWSER"

  },

  "worker_loaders": [

    {

      "binding": "LOADER"

    }

  ]

}


```

TOML

```

[browser]

binding = "BROWSER"


[[worker_loaders]]

binding = "LOADER"


```

This adds two tools:

| Tool             | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| browser\_search  | Query the CDP protocol spec to discover commands, events, and types                     |
| browser\_execute | Run CDP commands against a live browser session (screenshots, DOM reads, JS evaluation) |

For a custom Chrome endpoint, pass `cdpUrl` instead of `browser`:

* [  JavaScript ](#tab-panel-5062)
* [  TypeScript ](#tab-panel-5063)

JavaScript

```

createBrowserTools({

  cdpUrl: "http://localhost:9222",

  loader: this.env.LOADER,

});


```

TypeScript

```

createBrowserTools({

  cdpUrl: "http://localhost:9222",

  loader: this.env.LOADER,

});


```

For the full CDP helper API, refer to [Browse the web](https://developers.cloudflare.com/agents/tools/browser/).

## Extensions

Extensions are dynamically loaded sandboxed Workers that add tools at runtime. The LLM can write extension source code, load it, and use the new tools on the next turn.

Extensions require a `worker_loaders` binding:

* [  JavaScript ](#tab-panel-5066)
* [  TypeScript ](#tab-panel-5067)

JavaScript

```

import { Think } from "@cloudflare/think";


export class MyAgent extends Think {

  extensionLoader = this.env.LOADER;


  getModel() {

    /* ... */

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";


export class MyAgent extends Think<Env> {

  extensionLoader = this.env.LOADER;


  getModel() {

    /* ... */

  }

}


```

### Static extensions

Define extensions that load at startup:

* [  JavaScript ](#tab-panel-5082)
* [  TypeScript ](#tab-panel-5083)

JavaScript

```

export class MyAgent extends Think {

  extensionLoader = this.env.LOADER;


  getModel() {

    /* ... */

  }


  getExtensions() {

    return [

      {

        manifest: {

          name: "math",

          version: "1.0.0",

          permissions: { network: false },

        },

        source: `({

          tools: {

            add: {

              description: "Add two numbers",

              parameters: { a: { type: "number" }, b: { type: "number" } },

              execute: async ({ a, b }) => ({ result: a + b })

            }

          }

        })`,

      },

    ];

  }

}


```

TypeScript

```

export class MyAgent extends Think<Env> {

  extensionLoader = this.env.LOADER;


  getModel() {

    /* ... */

  }


  getExtensions() {

    return [

      {

        manifest: {

          name: "math",

          version: "1.0.0",

          permissions: { network: false },

        },

        source: `({

          tools: {

            add: {

              description: "Add two numbers",

              parameters: { a: { type: "number" }, b: { type: "number" } },

              execute: async ({ a, b }) => ({ result: a + b })

            }

          }

        })`,

      },

    ];

  }

}


```

Extension tools are namespaced — a `math` extension with an `add` tool becomes `math_add` in the model's tool set.

### LLM-driven extensions

Give the model `createExtensionTools` so it can load extensions dynamically:

* [  JavaScript ](#tab-panel-5080)
* [  TypeScript ](#tab-panel-5081)

JavaScript

```

import { createExtensionTools } from "@cloudflare/think/tools/extensions";


export class MyAgent extends Think {

  extensionLoader = this.env.LOADER;


  getModel() {

    /* ... */

  }


  getTools() {

    return {

      ...createExtensionTools({ manager: this.extensionManager }),

      ...this.extensionManager.getTools(),

    };

  }

}


```

TypeScript

```

import { createExtensionTools } from "@cloudflare/think/tools/extensions";


export class MyAgent extends Think<Env> {

  extensionLoader = this.env.LOADER;


  getModel() {

    /* ... */

  }


  getTools() {

    return {

      ...createExtensionTools({ manager: this.extensionManager! }),

      ...this.extensionManager!.getTools(),

    };

  }

}


```

This gives the model two tools:

* `load_extension` — load a new extension from JavaScript source
* `list_extensions` — list currently loaded extensions

### Extension context blocks

Extensions can declare context blocks in their manifest. These are automatically registered with the Session:

TypeScript

```

getExtensions() {

  return [{

    manifest: {

      name: "notes",

      version: "1.0.0",

      permissions: { network: false },

      context: [

        { label: "scratchpad", description: "Extension scratch space", maxTokens: 500 },

      ],

    },

    source: `({ tools: { /* ... */ } })`,

  }];

}


```

The context block is registered as `notes_scratchpad` (namespaced by extension name).

## Custom workspace backends

The individual tool factories are exported for use with custom storage backends:

* [  JavaScript ](#tab-panel-5074)
* [  TypeScript ](#tab-panel-5075)

JavaScript

```

import {

  createReadTool,

  createWriteTool,

  createEditTool,

  createListTool,

  createFindTool,

  createGrepTool,

  createDeleteTool,

  createWorkspaceTools,

} from "@cloudflare/think/tools/workspace";


```

TypeScript

```

import {

  createReadTool,

  createWriteTool,

  createEditTool,

  createListTool,

  createFindTool,

  createGrepTool,

  createDeleteTool,

  createWorkspaceTools,

} from "@cloudflare/think/tools/workspace";


```

Implement the operations interface for your storage backend:

* [  JavaScript ](#tab-panel-5076)
* [  TypeScript ](#tab-panel-5077)

JavaScript

```

const myReadOps = {

  readFile: async (path) => fetchFromMyStorage(path),

  stat: async (path) => getFileInfo(path),

};


const readTool = createReadTool({ ops: myReadOps });


```

TypeScript

```

import type { ReadOperations } from "@cloudflare/think/tools/workspace";


const myReadOps: ReadOperations = {

  readFile: async (path) => fetchFromMyStorage(path),

  stat: async (path) => getFileInfo(path),

};


const readTool = createReadTool({ ops: myReadOps });


```

Or create the full set from a `Workspace`, optionally disabling the Bash tool:

* [  JavaScript ](#tab-panel-5078)
* [  TypeScript ](#tab-panel-5079)

JavaScript

```

import { createWorkspaceTools } from "@cloudflare/think/tools/workspace";


const tools = createWorkspaceTools(myCustomWorkspace);

const toolsWithoutBash = createWorkspaceTools(myCustomWorkspace, {

  bash: false,

});


```

TypeScript

```

import { createWorkspaceTools } from "@cloudflare/think/tools/workspace";


const tools = createWorkspaceTools(myCustomWorkspace);

const toolsWithoutBash = createWorkspaceTools(myCustomWorkspace, {

  bash: false,

});


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/harnesses/think/","name":"Think"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/harnesses/think/tools/","name":"Tools"}}]}
```
