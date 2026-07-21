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

* [  wrangler.jsonc ](#tab-panel-6955)
* [  wrangler.toml ](#tab-panel-6956)

**JSONC**

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-agent-app",
  "main": "src/server.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-20",
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


  // Provision storage for each agent class
  "exports": {
    "MyAgent": {
      "type": "durable-object",
      "storage": "sqlite",
    },
    "ChatAgent": {
      "type": "durable-object",
      "storage": "sqlite",
    },
  },


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
compatibility_date = "2026-07-20"
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


[exports.MyAgent]
type = "durable-object"
storage = "sqlite"


[exports.ChatAgent]
type = "durable-object"
storage = "sqlite"


[ai]
binding = "AI"


[observability]
enabled = true
```

### Key fields

#### `compatibility_flags`

The `nodejs_compat` flag is required for agents:

* [  wrangler.jsonc ](#tab-panel-6929)
* [  wrangler.toml ](#tab-panel-6930)

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

* [  wrangler.jsonc ](#tab-panel-6931)
* [  wrangler.toml ](#tab-panel-6932)

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

* [  wrangler.jsonc ](#tab-panel-6933)
* [  wrangler.toml ](#tab-panel-6934)

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

#### `exports`

The `exports` field declares each Agent class your Worker exports and the storage backend Cloudflare should use for it:

* [  wrangler.jsonc ](#tab-panel-6935)
* [  wrangler.toml ](#tab-panel-6936)

**JSONC**

```jsonc
{
  "exports": {
    "MyAgent": {
      "type": "durable-object",
      "storage": "sqlite",
    },
  },
}
```

**TOML**

```toml
[exports.MyAgent]
type = "durable-object"
storage = "sqlite"
```

| Field   | Description                                                     |
| ------- | --------------------------------------------------------------- |
| type    | The kind of export. Always "durable-object" for an Agent.       |
| storage | The storage backend. Use "sqlite" for new Agents (recommended). |

For details on renaming, deleting, or transferring Agent classes, refer to [Durable Object class exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/). Existing Workers using the legacy `migrations` array continue to work — refer to [Durable Object class migrations (legacy)](https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/).

#### `assets`

For serving static files (HTML, CSS, JS):

* [  wrangler.jsonc ](#tab-panel-6937)
* [  wrangler.toml ](#tab-panel-6938)

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

* [  JavaScript ](#tab-panel-6967)
* [  TypeScript ](#tab-panel-6968)

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

* [  wrangler.jsonc ](#tab-panel-6939)
* [  wrangler.toml ](#tab-panel-6940)

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

* [  JavaScript ](#tab-panel-6965)
* [  TypeScript ](#tab-panel-6966)

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

* [  JavaScript ](#tab-panel-6969)
* [  TypeScript ](#tab-panel-6970)

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

* [  JavaScript ](#tab-panel-6977)
* [  TypeScript ](#tab-panel-6978)

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

* [  JavaScript ](#tab-panel-6973)
* [  TypeScript ](#tab-panel-6974)

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

* [  wrangler.jsonc ](#tab-panel-6941)
* [  wrangler.toml ](#tab-panel-6942)

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

* [  JavaScript ](#tab-panel-6971)
* [  TypeScript ](#tab-panel-6972)

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

* [  wrangler.jsonc ](#tab-panel-6949)
* [  wrangler.toml ](#tab-panel-6950)

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
3. Provisions the Agent's Durable Object namespace storage
4. Makes it live on `*.workers.dev`

### Custom domain

Add a route in the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-6943)
* [  wrangler.toml ](#tab-panel-6944)

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

* [  wrangler.jsonc ](#tab-panel-6945)
* [  wrangler.toml ](#tab-panel-6946)

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

* [  wrangler.jsonc ](#tab-panel-6975)
* [  wrangler.toml ](#tab-panel-6976)

**JSONC**

```jsonc
{
  "name": "my-agent",
  "main": "src/server.ts",


  // Base configuration (shared)
  // Set this to today's date
  "compatibility_date": "2026-07-20",
  "compatibility_flags": ["nodejs_compat"],
  "durable_objects": {
    "bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }],
  },
  "exports": {
    "MyAgent": { "type": "durable-object", "storage": "sqlite" },
  },


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
compatibility_date = "2026-07-20"
compatibility_flags = [ "nodejs_compat" ]


[[durable_objects.bindings]]
name = "MyAgent"
class_name = "MyAgent"


[exports.MyAgent]
type = "durable-object"
storage = "sqlite"


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

* [  wrangler.jsonc ](#tab-panel-6959)
* [  wrangler.toml ](#tab-panel-6960)

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

## Agent class lifecycle

Each Agent maps to a Durable Object class. You manage the lifecycle of those classes (create, rename, delete, transfer) through the [exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) field of your Wrangler configuration file.

### Adding a new agent

Declare the new class in the `exports`:

* [  wrangler.jsonc ](#tab-panel-6947)
* [  wrangler.toml ](#tab-panel-6948)

**JSONC**

```jsonc
{
  "exports": {
    "NewAgent": { "type": "durable-object", "storage": "sqlite" },
  },
}
```

**TOML**

```toml
[exports.NewAgent]
type = "durable-object"
storage = "sqlite"
```

### Renaming an agent class

Replace the entry for the old name with a `renamed` tombstone and add a live entry for the new name:

* [  wrangler.jsonc ](#tab-panel-6957)
* [  wrangler.toml ](#tab-panel-6958)

**JSONC**

```jsonc
{
  "exports": {
    "OldName": {
      "type": "durable-object",
      "state": "renamed",
      "renamed_to": "NewName",
    },
    "NewName": { "type": "durable-object", "storage": "sqlite" },
  },
}
```

**TOML**

```toml
[exports.OldName]
type = "durable-object"
state = "renamed"
renamed_to = "NewName"


[exports.NewName]
type = "durable-object"
storage = "sqlite"
```

Also update:

1. The class name in code.
2. The `class_name` in bindings.
3. Export statements.

### Deleting an agent class

Replace the entry with a `deleted` tombstone:

* [  wrangler.jsonc ](#tab-panel-6951)
* [  wrangler.toml ](#tab-panel-6952)

**JSONC**

```jsonc
{
  "exports": {
    "AgentToKeep": { "type": "durable-object", "storage": "sqlite" },
    "AgentToDelete": { "type": "durable-object", "state": "deleted" },
  },
}
```

**TOML**

```toml
[exports.AgentToKeep]
type = "durable-object"
storage = "sqlite"


[exports.AgentToDelete]
type = "durable-object"
state = "deleted"
```

Warning

This permanently deletes all data for that class.

### Class lifecycle best practices

1. **Keep `exports` in sync with your code.** Every Agent class your Worker exports needs an entry.
2. **Use tombstones, not silent removal.** When retiring a class, leave a `deleted` / `renamed` / `transferred` tombstone in `exports` so Cloudflare reconciles the change explicitly.
3. **Test locally first.** Lifecycle changes apply on `wrangler deploy`.
4. **Back up production data** before renaming or deleting.

Existing Workers using the legacy `migrations` array continue to work — refer to [Durable Object class migrations (legacy)](https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/) for the legacy reference, or [Migrate from the legacy migrations flow](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#migrate-from-the-legacy-migrations-flow) to move to `exports`.

## Troubleshooting

### No such Durable Object class

The class is missing from `exports`. Declare the class and its storage:

* [  wrangler.jsonc ](#tab-panel-6953)
* [  wrangler.toml ](#tab-panel-6954)

**JSONC**

```jsonc
{
  "exports": {
    "MissingClassName": { "type": "durable-object", "storage": "sqlite" },
  },
}
```

**TOML**

```toml
[exports.MissingClassName]
type = "durable-object"
storage = "sqlite"
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

### Migration tag conflict (legacy `migrations` only)

If your Worker uses the legacy [migrations](https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/) array, each entry must have a unique `tag`:

* [  wrangler.jsonc ](#tab-panel-6961)
* [  wrangler.toml ](#tab-panel-6962)

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

* [  wrangler.jsonc ](#tab-panel-6963)
* [  wrangler.toml ](#tab-panel-6964)

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

Consider converting to the declarative [exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) field.

## Next steps

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK.

[ Routing ](https://developers.cloudflare.com/agents/runtime/communication/routing/) Route requests to your agent instances.

[ Schedule tasks ](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) Background processing with delayed and cron-based tasks.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/operations/configuration/#page","headline":"Configuration · Cloudflare Agents docs","description":"Configure Wrangler bindings, environment variables, and type generation for a project using the Agents SDK.","url":"https://developers.cloudflare.com/agents/runtime/operations/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/operations/","name":"Operations"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/operations/configuration/","name":"Configuration"}}]}
```
