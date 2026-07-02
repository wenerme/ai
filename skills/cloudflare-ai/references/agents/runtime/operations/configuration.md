---
title: Configuration
description: Configure Wrangler bindings, environment variables, and type generation for a project using the Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Configuration

This guide covers everything you need to configure agents for local development and production deployment, including Wrangler configuration file setup, type generation, environment variables, and the Cloudflare dashboard.

## Project structure

The typical file structure for an Agent project created from `npm create cloudflare@latest agents-starter -- --template cloudflare/agents-starter` follows:

* Directorysrc/
  * index.ts your Agent definition
* Directorypublic/
  * index.html
* Directorytest/
  * index.spec.ts your tests
* package.json
* tsconfig.json
* vitest.config.mts
* worker-configuration.d.ts
* wrangler.jsonc your Workers and Agent configuration

## Wrangler configuration file

The `wrangler.jsonc` file configures your Cloudflare Worker and its bindings. Here is a complete example for an agents project:

* [  wrangler.jsonc ](#tab-panel-6673)
* [  wrangler.toml ](#tab-panel-6674)

**JSONC**

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-agent-app",
  "main": "src/server.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-01",
  "compatibility_flags": ["nodejs_compat"],


  // Static assets (optional)
  "assets": {
    "directory": "public",
    "binding": "ASSETS",
  },


  // Durable Object bindings for agents
  "durable_objects": {
    "bindings": [
      {
        "name": "MyAgent",
        "class_name": "MyAgent",
      },
      {
        "name": "ChatAgent",
        "class_name": "ChatAgent",
      },
    ],
  },


  // Required: Enable SQLite storage for agents
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["MyAgent", "ChatAgent"],
    },
  ],


  // AI binding (optional, for Workers AI)
  "ai": {
    "binding": "AI",
  },


  // Observability (recommended)
  "observability": {
    "enabled": true,
  },
}
```

**TOML**

```toml
"$schema" = "node_modules/wrangler/config-schema.json"
name = "my-agent-app"
main = "src/server.ts"
# Set this to today's date
compatibility_date = "2026-07-01"
compatibility_flags = [ "nodejs_compat" ]


[assets]
directory = "public"
binding = "ASSETS"


[[durable_objects.bindings]]
name = "MyAgent"
class_name = "MyAgent"


[[durable_objects.bindings]]
name = "ChatAgent"
class_name = "ChatAgent"


[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyAgent", "ChatAgent" ]


[ai]
binding = "AI"


[observability]
enabled = true
```

### Key fields

#### `compatibility_flags`

The `nodejs_compat` flag is required for agents:

* [  wrangler.jsonc ](#tab-panel-6655)
* [  wrangler.toml ](#tab-panel-6656)

**JSONC**

```jsonc
{
  "compatibility_flags": ["nodejs_compat"],
}
```

**TOML**

```toml
compatibility_flags = [ "nodejs_compat" ]
```

This enables Node.js compatibility mode, which agents depend on for crypto, streams, and other Node.js APIs.

#### `durable_objects.bindings`

Each agent class needs a binding:

* [  wrangler.jsonc ](#tab-panel-6657)
* [  wrangler.toml ](#tab-panel-6658)

**JSONC**

```jsonc
{
  "durable_objects": {
    "bindings": [
      {
        "name": "Counter",
        "class_name": "Counter",
      },
    ],
  },
}
```

**TOML**

```toml
[[durable_objects.bindings]]
name = "Counter"
class_name = "Counter"
```

| Field       | Description                                             |
| ----------- | ------------------------------------------------------- |
| name        | The property name on env. Use this in code: env.Counter |
| class\_name | Must match the exported class name exactly              |

When `name` and `class_name` differ

When `name` and `class_name` differ, follow the pattern shown below:

* [  wrangler.jsonc ](#tab-panel-6659)
* [  wrangler.toml ](#tab-panel-6660)

**JSONC**

```jsonc
{
  "durable_objects": {
    "bindings": [
      {
        "name": "COUNTER_DO",
        "class_name": "CounterAgent",
      },
    ],
  },
}
```

**TOML**

```toml
[[durable_objects.bindings]]
name = "COUNTER_DO"
class_name = "CounterAgent"
```

This is useful when you want environment variable-style naming (`COUNTER_DO`) but more descriptive class names (`CounterAgent`).

#### `migrations`

Migrations tell Cloudflare how to set up storage for your Durable Objects:

* [  wrangler.jsonc ](#tab-panel-6661)
* [  wrangler.toml ](#tab-panel-6662)

**JSONC**

```jsonc
{
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["MyAgent"],
    },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyAgent" ]
```

| Field                | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| tag                  | Version identifier (for example, "v1", "v2"). Must be unique |
| new\_sqlite\_classes | Agent classes that use SQLite storage (state persistence)    |
| deleted\_classes     | Classes being removed                                        |
| renamed\_classes     | Classes being renamed                                        |

#### `assets`

For serving static files (HTML, CSS, JS):

* [  wrangler.jsonc ](#tab-panel-6663)
* [  wrangler.toml ](#tab-panel-6664)

**JSONC**

```jsonc
{
  "assets": {
    "directory": "public",
    "binding": "ASSETS",
  },
}
```

**TOML**

```toml
[assets]
directory = "public"
binding = "ASSETS"
```

With a binding, you can serve assets programmatically:

* [  JavaScript ](#tab-panel-6693)
* [  TypeScript ](#tab-panel-6694)

**JavaScript**

```js
export default {
  async fetch(request, env) {
    // Static assets are served by the worker automatically by default


    // Route the request to the appropriate agent
    const agentResponse = await routeAgentRequest(request, env);
    if (agentResponse) return agentResponse;


    // Add your own routing logic here
    return new Response("Not found", { status: 404 });
  },
};
```

**TypeScript**

```ts
export default {
  async fetch(request: Request, env: Env) {
    // Static assets are served by the worker automatically by default


    // Route the request to the appropriate agent
    const agentResponse = await routeAgentRequest(request, env);
    if (agentResponse) return agentResponse;


    // Add your own routing logic here
    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
```

#### `ai`

For Workers AI integration:

* [  wrangler.jsonc ](#tab-panel-6665)
* [  wrangler.toml ](#tab-panel-6666)

**JSONC**

```jsonc
{
  "ai": {
    "binding": "AI",
  },
}
```

**TOML**

```toml
[ai]
binding = "AI"
```

Access in your agent:

* [  JavaScript ](#tab-panel-6689)
* [  TypeScript ](#tab-panel-6690)

**JavaScript**

```js
const response = await this.env.AI.run("@cf/meta/llama-3-8b-instruct", {
  prompt: "Hello!",
});
```

**TypeScript**

```ts
const response = await this.env.AI.run("@cf/meta/llama-3-8b-instruct", {
  prompt: "Hello!",
});
```

## TypeScript configuration

The Agents SDK ships a shared `tsconfig.json` that sets all the compiler options needed for agents projects — including the `ES2021` target required for `@callable()` decorators, strict mode, bundler module resolution, and Workers types.

Extend it in your `tsconfig.json`:

```json
{
  "extends": "agents/tsconfig"
}
```

This is equivalent to:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "types": ["node", "@cloudflare/workers-types", "vite/client"],
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

You can override individual options as needed:

```json
{
  "extends": "agents/tsconfig",
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

Warning

Do not set `"experimentalDecorators": true`. The Agents SDK uses [TC39 standard decorators ↗](https://github.com/tc39/proposal-decorators), not TypeScript legacy decorators. Enabling `experimentalDecorators` applies an incompatible transform that silently breaks `@callable()` at runtime.

## Vite configuration

The Agents SDK provides a Vite plugin that handles TC39 decorator transforms. Vite 8 uses Oxc for transpilation, which does not yet support TC39 decorators — without this plugin, `@callable()` and other decorators will fail at runtime.

Add the plugin to your `vite.config.ts`:

* [  JavaScript ](#tab-panel-6695)
* [  TypeScript ](#tab-panel-6696)

**JavaScript**

```js
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import agents from "agents/vite";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [agents(), react(), cloudflare()],
});
```

**TypeScript**

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import agents from "agents/vite";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [agents(), react(), cloudflare()],
});
```

The `agents()` plugin is safe to include even if your project does not use decorators. It only runs the transform on files that contain `@` syntax.

The starter template and all examples include this plugin by default. If you encounter `SyntaxError: Invalid or unexpected token` with decorators, refer to [Callable methods — Troubleshooting](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/#troubleshooting).

## Generating types

Wrangler can generate TypeScript types for your bindings.

### Automatic generation

Run the types command:

```sh
npx wrangler types
```

This creates or updates `worker-configuration.d.ts` with your `Env` type.

### Custom output path

Specify a custom path:

```sh
npx wrangler types env.d.ts
```

### Without runtime types

For cleaner output (recommended for agents):

```sh
npx wrangler types env.d.ts --include-runtime false
```

This generates just your bindings without Cloudflare runtime types.

### Example generated output

**TypeScript**

```ts
// env.d.ts (generated)
declare namespace Cloudflare {
  interface Env {
    OPENAI_API_KEY: string;
    Counter: DurableObjectNamespace;
    ChatAgent: DurableObjectNamespace;
  }
}
interface Env extends Cloudflare.Env {}
```

### Manual type definition

You can also define types manually:

* [  JavaScript ](#tab-panel-6703)
* [  TypeScript ](#tab-panel-6704)

**JavaScript**

```js
// env.d.ts
```

**TypeScript**

```ts
// env.d.ts
import type { Counter } from "./src/agents/counter";
import type { ChatAgent } from "./src/agents/chat";


interface Env {
  // Secrets
  OPENAI_API_KEY: string;
  WEBHOOK_SECRET: string;


  // Agent bindings
  Counter: DurableObjectNamespace<Counter>;
  ChatAgent: DurableObjectNamespace<ChatAgent>;


  // Other bindings
  AI: Ai;
  ASSETS: Fetcher;
  MY_KV: KVNamespace;
}
```

### Adding to package.json

Add a script for easy regeneration:

```json
{
  "scripts": {
    "types": "wrangler types env.d.ts --include-runtime false"
  }
}
```

## Environment variables and secrets

### Local development (`.env`)

Create a `.env` file for local secrets (add to `.gitignore`):

```sh
# .env
OPENAI_API_KEY=sk-...
GITHUB_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgres://...
```

Access in your agent:

* [  JavaScript ](#tab-panel-6701)
* [  TypeScript ](#tab-panel-6702)

**JavaScript**

```js
class MyAgent extends Agent {
  async onStart() {
    const apiKey = this.env.OPENAI_API_KEY;
  }
}
```

**TypeScript**

```ts
class MyAgent extends Agent {
  async onStart() {
    const apiKey = this.env.OPENAI_API_KEY;
  }
}
```

### Production secrets

Use `wrangler secret` for production:

```sh
# Add a secret
npx wrangler secret put OPENAI_API_KEY
# Enter value when prompted


# List secrets
npx wrangler secret list


# Delete a secret
npx wrangler secret delete OPENAI_API_KEY
```

### Non-secret variables

For non-sensitive configuration, use `vars` in the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-6667)
* [  wrangler.toml ](#tab-panel-6668)

**JSONC**

```jsonc
{
  "vars": {
    "API_BASE_URL": "https://api.example.com",
    "MAX_RETRIES": "3",
    "DEBUG_MODE": "false",
  },
}
```

**TOML**

```toml
[vars]
API_BASE_URL = "https://api.example.com"
MAX_RETRIES = "3"
DEBUG_MODE = "false"
```

All values must be strings. Parse numbers and booleans in code:

* [  JavaScript ](#tab-panel-6697)
* [  TypeScript ](#tab-panel-6698)

**JavaScript**

```js
const maxRetries = parseInt(this.env.MAX_RETRIES, 10);
const debugMode = this.env.DEBUG_MODE === "true";
```

**TypeScript**

```ts
const maxRetries = parseInt(this.env.MAX_RETRIES, 10);
const debugMode = this.env.DEBUG_MODE === "true";
```

### Environment-specific variables

Use `env` sections for different environments (for example, staging, production):

* [  wrangler.jsonc ](#tab-panel-6675)
* [  wrangler.toml ](#tab-panel-6676)

**JSONC**

```jsonc
{
  "name": "my-agent",
  "vars": {
    "API_URL": "https://api.example.com",
  },


  "env": {
    "staging": {
      "vars": {
        "API_URL": "https://staging-api.example.com",
      },
    },
    "production": {
      "vars": {
        "API_URL": "https://api.example.com",
      },
    },
  },
}
```

**TOML**

```toml
name = "my-agent"


[vars]
API_URL = "https://api.example.com"


[env.staging.vars]
API_URL = "https://staging-api.example.com"


[env.production.vars]
API_URL = "https://api.example.com"
```

Deploy to specific environment:

```sh
npx wrangler deploy --env staging
npx wrangler deploy --env production
```

## Local development

### Starting the dev server

With Vite (recommended for full stack apps):

```sh
npx vite dev
```

Without Vite:

```sh
npx wrangler dev
```

### Local state persistence

Durable Object state is persisted locally in `.wrangler/state/`:

* Directory.wrangler/
  * Directorystate/
    * Directoryv3/
      * Directoryd1/
        * Directoryminiflare-D1DatabaseObject/
          * ... (SQLite files)

### Clearing local state

To reset all local Durable Object state:

```sh
rm -rf .wrangler/state
```

Or restart with fresh state:

```sh
npx wrangler dev --persist-to=""
```

### Inspecting local SQLite

You can inspect agent state directly:

```sh
# Find the SQLite file
ls .wrangler/state/v3/d1/


# Open with sqlite3
sqlite3 .wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite
```

## Dashboard setup

### Automatic resources

When you deploy, Cloudflare automatically creates:

* **Worker** \- Your deployed code
* **Durable Object namespaces** \- One per agent class
* **SQLite storage** \- Attached to each namespace

### Viewing Durable Objects

Log in to the Cloudflare dashboard, then go to Durable Objects.

[ Go to **Durable Objects** ](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)

Here you can:

* See all Durable Object namespaces
* View individual object instances
* Inspect storage (keys and values)
* Delete objects

### Real-time logs

View live logs from your agents:

```sh
npx wrangler tail
```

Or in the dashboard:

1. Go to your Worker.
2. Select the **Observability** tab.
3. Enable real-time logs.

Filter by:

* Status (success, error)
* Search text
* Sampling rate

## Production deployment

### Basic deploy

```sh
npx wrangler deploy
```

This:

1. Bundles your code
2. Uploads to Cloudflare
3. Applies migrations
4. Makes it live on `*.workers.dev`

### Custom domain

Add a route in the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-6669)
* [  wrangler.toml ](#tab-panel-6670)

**JSONC**

```jsonc
{
  "routes": [
    {
      "pattern": "agents.example.com/*",
      "zone_name": "example.com",
    },
  ],
}
```

**TOML**

```toml
[[routes]]
pattern = "agents.example.com/*"
zone_name = "example.com"
```

Or use a custom domain (simpler):

* [  wrangler.jsonc ](#tab-panel-6671)
* [  wrangler.toml ](#tab-panel-6672)

**JSONC**

```jsonc
{
  "routes": [
    {
      "pattern": "agents.example.com",
      "custom_domain": true,
    },
  ],
}
```

**TOML**

```toml
[[routes]]
pattern = "agents.example.com"
custom_domain = true
```

### Preview deployments

Deploy without affecting production:

```sh
npx wrangler deploy --dry-run    # See what would be uploaded
npx wrangler versions upload     # Upload new version
npx wrangler versions deploy     # Gradually roll out
```

### Rollbacks

Roll back to a previous version:

```sh
npx wrangler rollback
```

## Multi-environment setup

### Environment configuration

Define environments in the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-6699)
* [  wrangler.toml ](#tab-panel-6700)

**JSONC**

```jsonc
{
  "name": "my-agent",
  "main": "src/server.ts",


  // Base configuration (shared)
  // Set this to today's date
  "compatibility_date": "2026-07-01",
  "compatibility_flags": ["nodejs_compat"],
  "durable_objects": {
    "bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }],
  },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],


  // Environment overrides
  "env": {
    "staging": {
      "name": "my-agent-staging",
      "vars": {
        "ENVIRONMENT": "staging",
      },
    },
    "production": {
      "name": "my-agent-production",
      "vars": {
        "ENVIRONMENT": "production",
      },
    },
  },
}
```

**TOML**

```toml
name = "my-agent"
main = "src/server.ts"
# Set this to today's date
compatibility_date = "2026-07-01"
compatibility_flags = [ "nodejs_compat" ]


[[durable_objects.bindings]]
name = "MyAgent"
class_name = "MyAgent"


[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyAgent" ]


[env.staging]
name = "my-agent-staging"


  [env.staging.vars]
  ENVIRONMENT = "staging"


[env.production]
name = "my-agent-production"


  [env.production.vars]
  ENVIRONMENT = "production"
```

### Deploying to environments

```sh
# Deploy to staging
npx wrangler deploy --env staging


# Deploy to production
npx wrangler deploy --env production


# Set secrets per environment
npx wrangler secret put OPENAI_API_KEY --env staging
npx wrangler secret put OPENAI_API_KEY --env production
```

### Separate Durable Objects

Each environment gets its own Durable Objects. Staging agents do not share state with production agents.

To explicitly separate:

* [  wrangler.jsonc ](#tab-panel-6679)
* [  wrangler.toml ](#tab-panel-6680)

**JSONC**

```jsonc
{
  "env": {
    "staging": {
      "durable_objects": {
        "bindings": [
          {
            "name": "MyAgent",
            "class_name": "MyAgent",
            "script_name": "my-agent-staging",
          },
        ],
      },
    },
  },
}
```

**TOML**

```toml
[[env.staging.durable_objects.bindings]]
name = "MyAgent"
class_name = "MyAgent"
script_name = "my-agent-staging"
```

## Migrations

Migrations manage Durable Object storage schema changes.

### Adding a new agent

Add to `new_sqlite_classes` in a new migration:

* [  wrangler.jsonc ](#tab-panel-6677)
* [  wrangler.toml ](#tab-panel-6678)

**JSONC**

```jsonc
{
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["ExistingAgent"],
    },
    {
      "tag": "v2",
      "new_sqlite_classes": ["NewAgent"],
    },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "ExistingAgent" ]


[[migrations]]
tag = "v2"
new_sqlite_classes = [ "NewAgent" ]
```

### Renaming an agent class

Use `renamed_classes`:

* [  wrangler.jsonc ](#tab-panel-6691)
* [  wrangler.toml ](#tab-panel-6692)

**JSONC**

```jsonc
{
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["OldName"],
    },
    {
      "tag": "v2",
      "renamed_classes": [
        {
          "from": "OldName",
          "to": "NewName",
        },
      ],
    },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "OldName" ]


[[migrations]]
tag = "v2"


  [[migrations.renamed_classes]]
  from = "OldName"
  to = "NewName"
```

Also update:

1. The class name in code
2. The `class_name` in bindings
3. Export statements

### Deleting an agent class

Use `deleted_classes`:

* [  wrangler.jsonc ](#tab-panel-6685)
* [  wrangler.toml ](#tab-panel-6686)

**JSONC**

```jsonc
{
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["AgentToDelete", "AgentToKeep"],
    },
    {
      "tag": "v2",
      "deleted_classes": ["AgentToDelete"],
    },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "AgentToDelete", "AgentToKeep" ]


[[migrations]]
tag = "v2"
deleted_classes = [ "AgentToDelete" ]
```

Warning

This permanently deletes all data for that class.

### Migration best practices

1. **Never modify existing migrations** \- Always add new ones.
2. **Use sequential tags** \- v1, v2, v3 (or use dates: 2025-01-15).
3. **Test locally first** \- Migrations run on deploy.
4. **Back up production data** \- Before renaming or deleting.

## Troubleshooting

### No such Durable Object class

The class is not in migrations:

* [  wrangler.jsonc ](#tab-panel-6681)
* [  wrangler.toml ](#tab-panel-6682)

**JSONC**

```jsonc
{
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["MissingClassName"],
    },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MissingClassName" ]
```

### Cannot find module in types

Regenerate types:

```sh
npx wrangler types env.d.ts --include-runtime false
```

### Secrets not loading locally

Check that `.env` exists and contains the variable:

```sh
cat .env
# Should show: MY_SECRET=value
```

### Migration tag conflict

Migration tags must be unique. If you see conflicts:

* [  wrangler.jsonc ](#tab-panel-6683)
* [  wrangler.toml ](#tab-panel-6684)

**JSONC**

```jsonc
{
  // Wrong - duplicate tags
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["A"] },
    { "tag": "v1", "new_sqlite_classes": ["B"] },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "A" ]


[[migrations]]
tag = "v1"
new_sqlite_classes = [ "B" ]
```

* [  wrangler.jsonc ](#tab-panel-6687)
* [  wrangler.toml ](#tab-panel-6688)

**JSONC**

```jsonc
{
  // Correct - sequential tags
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["A"] },
    { "tag": "v2", "new_sqlite_classes": ["B"] },
  ],
}
```

**TOML**

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "A" ]


[[migrations]]
tag = "v2"
new_sqlite_classes = [ "B" ]
```

## Next steps

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK.

[ Routing ](https://developers.cloudflare.com/agents/runtime/communication/routing/) Route requests to your agent instances.

[ Schedule tasks ](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) Background processing with delayed and cron-based tasks.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/operations/configuration/#page","headline":"Configuration · Cloudflare Agents docs","description":"Configure Wrangler bindings, environment variables, and type generation for a project using the Agents SDK.","url":"https://developers.cloudflare.com/agents/runtime/operations/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/operations/","name":"Operations"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/operations/configuration/","name":"Configuration"}}]}
```
