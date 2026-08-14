---
description: Install @cloudflare/sandbox@next — a thinner Sandbox SDK on Cloudflare Containers — and migrate when you are ready for Sandbox SDK 1.0.
title: 1.0 preview
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# 1.0 preview

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

**Sandbox SDK 1.0** is the next major release of the SDK. It is available now as a preview on the npm `@next` tag. The current stable package remains published for existing apps.

Sandbox still runs isolated work on [Cloudflare Containers](https://developers.cloudflare.com/containers/). The 1.0 preview is a **thinner** SDK on that foundation: one process handle for short and long-running work, no session-based command state, no transport picker, terminals as first-class PTYs, and the code interpreter as an opt-in extension.

We recommend that **new projects** start on `@cloudflare/sandbox@next` and follow this section. **Existing apps** should migrate when you can, so you are ready when 1.0 becomes the stable release. Follow [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/).

The main [Sandbox documentation](https://developers.cloudflare.com/sandbox/) still documents today's stable package. Use **this** section for preview APIs and the migration path.

Self-deployed bridge

The self-deployed Sandbox bridge is not part of the 1.0 preview. Use the [stable bridge](https://developers.cloudflare.com/sandbox/bridge/) with the matching stable package and container image.

## Install the preview

npmyarnpnpmbun

```
npm i @cloudflare/sandbox@next
```

```
yarn add @cloudflare/sandbox@next
```

```
pnpm add @cloudflare/sandbox@next
```

```
bun add @cloudflare/sandbox@next
```

Deploy the Worker package and the sandbox container image from the **same** preview line. Do not mix a preview Worker package with a stable container image (or the reverse). For ongoing deploys, refer to [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/). For a breaking cutover, refer to [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/).

## What 1.0 is aiming at

The stable package grew several ways to run commands (`exec`, `startProcess`, `execStream`), optional session state across launches, and selectable transports between the Durable Object and the container. That surface worked, but it duplicated ideas and hid how sandboxes actually behave on containers.

The preview collapses that toward a smaller contract:

| You want…                                      | In the preview                                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Run a program                                  | exec(argv) → process handle when **launch** succeeds                                                                      |
| See output or wait for readiness               | output(), logs(), waitForExit(), waitForLog(), waitForPort() on the handle                                                |
| Stop a process                                 | kill(signal?) (numeric signal; default 15)                                                                                |
| Keep shell state across many interactive steps | A [terminal](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/) (PTY), not a hidden default session        |
| Run Python / JS cells                          | [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/) extension on your Sandbox subclass |
| Talk to the container control plane            | Always RPC — no transport setting                                                                                         |

Procedures: [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/). Mental model: [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) and [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/).

## What changes from the stable package

### Command execution

**Stable:** `sandbox.exec(string)` resolves when the command **finishes** with buffered output. Long-running services and streaming use separate APIs (`startProcess`, `execStream`).

**Preview:** `sandbox.exec()` takes **argv** and resolves when the process **starts**. The same handle covers short commands and long-running services.

```js
// Current stable package
const result = await sandbox.exec("npm test");
console.log(result.stdout, result.exitCode);

// 1.0 preview
const process = await sandbox.exec(["npm", "test"]);
const result = await process.output({ encoding: "utf8" });
console.log(result.stdout, result.exitCode);
```

```ts
// Current stable package
const result = await sandbox.exec("npm test");
console.log(result.stdout, result.exitCode);

// 1.0 preview
const process = await sandbox.exec(["npm", "test"]);
const result = await process.output({ encoding: "utf8" });
console.log(result.stdout, result.exitCode);
```

Shell features such as pipes and `&&` need an explicit shell, for example `['/bin/bash', '-lc', 'cd app && npm test']`. Pass `cwd` and `env` on each `exec()` when the process needs them. Details: [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/), [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/).

### Sessions

**Stable:** a default session can preserve working directory and environment variables across `exec()` calls. Apps can also create named sessions with `createSession()`.

**Preview:** no session execution on the SDK. Each `exec()` is independent. Pass `cwd` and `env` on each launch, or put multi-step shell syntax in one explicit shell argv. Isolate end users with **separate sandboxes**, not sessions inside one sandbox. Environment model: [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/).

### Terminals

**Stable:** browser shells often use `sandbox.terminal(request)` with session helpers and xterm `sessionId`.

**Preview:** terminals are PTY resources — `createTerminal`, `getTerminal`, `listTerminals`, and `terminal.connect(request)`. The xterm helper uses `terminalId`. Refer to [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/).

### Code interpreter

**Stable:** interpreter methods live on `Sandbox`.

**Preview:** attach the interpreter on your subclass, then call `sandbox.interpreter.*`. Refer to [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/).

### Transport configuration

**Stable:** apps can select HTTP, WebSocket, or RPC between the Durable Object and the container.

**Preview:** the SDK always uses RPC. Remove `SANDBOX_TRANSPORT`, the `transport` option on `getSandbox()`, and `setTransport()`. No replacement setting is required.

## Same platform model, clearer handles

This is **not** a new container product. You still address a sandbox with a stable **sandbox ID**:

```js
const sandbox = getSandbox(env.Sandbox, "user-123");
```

```ts
const sandbox = getSandbox(env.Sandbox, "user-123");
```

That sandbox runs in a **container**. The ID is stable. The container instance behind it is not always the same one. Processes and terminals you start exist only in the **current** container. When that container stops or is replaced, those processes and terminals are gone — old handles fail closed instead of quietly attaching to a new container for the same sandbox ID.

Container stop and replace already happened on the stable line. The preview makes process and terminal APIs honest about that lifetime. Full model: [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/). Process detail: [How long a process lives](https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives). Recovery: [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/).

## What usually stays the same

These remain available. Use the main Sandbox documentation for signatures, and ignore session or transport options where those pages still mention them:

* [Files](https://developers.cloudflare.com/sandbox/api/files/) and [file watching](https://developers.cloudflare.com/sandbox/api/file-watching/)
* [Storage](https://developers.cloudflare.com/sandbox/api/storage/) and [backups](https://developers.cloudflare.com/sandbox/api/backups/)
* [Ports](https://developers.cloudflare.com/sandbox/api/ports/) and [tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/)
* [Lifecycle options](https://developers.cloudflare.com/sandbox/api/lifecycle/) and [sandbox options](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) (except removed session/transport fields)
* [Outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) (credential injection and egress policy)

For process environment on `@next`, use [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/) in this section.

## Start here

### [Get started](https://developers.cloudflare.com/sandbox/1-0-preview/get-started/)

Install `@next` and run your first process handle.

### [Migrate from stable](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Update an existing app, including deploy cutover on `@next`.

### [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/)

Sandbox ID, container, stop, replace, and what your app should store.

### [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/)

How `exec()` works, process handles, and how long processes live.

### [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/)

Interactive PTYs, lifetime, and browser connect.

### [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/)

How to retry, inspect, and relaunch after common failures.

### [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/)

`setEnvVars`, per-launch `env`, and how processes get their environment.

### [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/)

Attach the interpreter extension and run Python or JS/TS.

### [API reference](https://developers.cloudflare.com/sandbox/1-0-preview/api/)

Process, terminal, error, and interpreter signatures for `@next`.

### [Extensions](https://developers.cloudflare.com/sandbox/1-0-preview/extensions/)

Attach the code interpreter and other optional capabilities.

### [Troubleshooting](https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/)

Common `@next` failures and where to fix them.

## Coding agents

Install [Cloudflare Skills ↗](https://github.com/cloudflare/skills) for your agent ([Agent setup](https://developers.cloudflare.com/agent-setup/)). Use **`sandbox-next`** for work on `@next` (recommended for new projects). Existing apps on the current stable package should use **`sandbox-stable`** until you are ready to move, then **`sandbox-migrate-to-next`**. Deprecated-API cleanup while staying on stable is covered in the [2026 deprecation guide](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/) and **`sandbox-stable`**.

## Stable documentation

While you remain on the current stable package, use the main docs:

* [Get started](https://developers.cloudflare.com/sandbox/get-started/)
* [Commands](https://developers.cloudflare.com/sandbox/api/commands/)
* [Sessions](https://developers.cloudflare.com/sandbox/concepts/sessions/)
* [2026 deprecation migration](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/#page","headline":"Overview · Cloudflare Sandbox SDK docs","description":"Install @cloudflare/sandbox@next — a thinner Sandbox SDK on Cloudflare Containers — and migrate when you are ready for Sandbox SDK 1.0.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
