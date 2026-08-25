---
description: How processes and terminals get environment variables in the Sandbox SDK 1.0 preview.
title: Environment variables
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Environment variables

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/environment/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page documents environment variables on `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0\. For the current stable package, refer to [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/).

Each `exec()` and `createTerminal()` starts an independent process. Shell `export` in one process does not apply to the next launch. Configure process environment with the container image, `setEnvVars`, and per-launch `env`.

Use environment variables for **non-secret** configuration (paths, feature flags, `NODE_ENV`, and similar). Do not put live API keys or other long-lived credentials into the sandbox. To call external services that need credentials, use [outbound traffic handlers](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) so secrets stay in the Worker.

## How a process gets its environment

When a process starts, the runtime builds its environment from:

1. The **container** environment (image `ENV` and defaults).
2. Names from **`setEnvVars`**, when you use `exec()` (described in the next section).
3. The **`env` option** on that launch, if you pass one.

Later launches do not keep overlays from earlier launches. A command that runs `export FOO=bar` inside one process does not change the next `exec()`.

Worker bindings in your `fetch` handler are not process environment variables. Only values you pass through `setEnvVars` or launch `env` appear inside the process (and those should not be long-lived secrets).

## `setEnvVars()`

```ts
setEnvVars(envVars: Record<string, string | undefined>): Promise<void>
```

| Value     | Effect                                                  |
| --------- | ------------------------------------------------------- |
| string    | Set this environment variable for later exec() launches |
| undefined | Remove a previously stored variable                     |

On each `exec()`, the SDK merges stored names into that process’s environment at launch.

Stored names live in the sandbox Durable Object’s memory. They are not written to the container filesystem and are not part of a backup. After the Durable Object is evicted or replaced, call `setEnvVars` again if you still need those names, or pass `env` on each `exec()`.

```js
const sandbox = getSandbox(env.Sandbox, "user-123");

await sandbox.setEnvVars({
	NODE_ENV: "production",
	APP_HOME: "/workspace/app",
	LOG_LEVEL: "info",
});

const migrate = await sandbox.exec(["python", "migrate.py"], {
	cwd: "/workspace/app",
});
await migrate.output({ encoding: "utf8" });

const seed = await sandbox.exec(["python", "seed.py"], {
	cwd: "/workspace/app",
});
await seed.output({ encoding: "utf8" });

await sandbox.setEnvVars({
	LOG_LEVEL: "debug",
	TEMP_FLAG: undefined,
});
```

```ts
const sandbox = getSandbox(env.Sandbox, "user-123");

await sandbox.setEnvVars({
	NODE_ENV: "production",
	APP_HOME: "/workspace/app",
	LOG_LEVEL: "info",
});

const migrate = await sandbox.exec(["python", "migrate.py"], {
	cwd: "/workspace/app",
});
await migrate.output({ encoding: "utf8" });

const seed = await sandbox.exec(["python", "seed.py"], {
	cwd: "/workspace/app",
});
await seed.output({ encoding: "utf8" });

await sandbox.setEnvVars({
	LOG_LEVEL: "debug",
	TEMP_FLAG: undefined,
});
```

## `env` on `exec()`

```js
const process = await sandbox.exec(["node", "app.js"], {
	cwd: "/workspace/app",
	env: {
		NODE_ENV: "production",
		PORT: "3000",
	},
});
```

```ts
const process = await sandbox.exec(["node", "app.js"], {
	cwd: "/workspace/app",
	env: {
		NODE_ENV: "production",
		PORT: "3000",
	},
});
```

| Behavior     | Detail                                                |
| ------------ | ----------------------------------------------------- |
| Scope        | This launch only                                      |
| Merge order  | Container environment, then setEnvVars, then this env |
| Side effects | Does not update setEnvVars storage                    |

Omit `env` when sandbox-wide names (and the container environment) are enough.

## `env` on `createTerminal()`

```js
const terminal = await sandbox.createTerminal({
	command: ["bash"],
	cwd: "/workspace",
	env: {
		TERM: "xterm-256color",
		APP_HOME: "/workspace/app",
	},
});
```

```ts
const terminal = await sandbox.createTerminal({
	command: ["bash"],
	cwd: "/workspace",
	env: {
		TERM: "xterm-256color",
		APP_HOME: "/workspace/app",
	},
});
```

The terminal’s launch `env` overlays the container environment for that terminal only. Pass the names the terminal needs on `createTerminal`.

Inside an interactive shell, `export` applies for the life of that terminal. It does not apply to later `exec()` calls. Refer to [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/).

## External APIs and credentials

Code inside the sandbox should not hold live provider credentials. Keep secrets in the Worker and intercept outbound HTTP(S) with `outboundByHost` (and related policy such as `enableInternet` / `allowedHosts`). The sandbox can send ordinary requests—or placeholders client libraries require—while the Worker attaches real credentials before the request leaves your account.

Refer to [Handle outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/), including securely injecting credentials. For Workers bindings (KV, R2, and similar) reached by hostname from the sandbox, refer to [Connect to Workers bindings](https://developers.cloudflare.com/sandbox/guides/workers-connections/).

## Related

* [Handle outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/)
* [Connect to Workers bindings](https://developers.cloudflare.com/sandbox/guides/workers-connections/)
* [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/)
* [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/)
* [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/)
* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/environment/#page","headline":"Environment variables · Cloudflare Sandbox SDK docs","description":"How processes and terminals get environment variables in the Sandbox SDK 1.0 preview.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/environment/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
