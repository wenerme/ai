---
description: Update an existing Sandbox SDK application from the stable package to @cloudflare/sandbox@next.
title: Migrate
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This guide moves a project onto `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0\. Migrate when you can so you are ready when 1.0 becomes the stable release. For the full preview section, refer to [1.0 preview](https://developers.cloudflare.com/sandbox/1-0-preview/).

## Before you start

1. Work on a branch or staging deployment. Finish the code migration steps in this guide, then cut production over in one deploy.
2. Expect a short cutover window. Live processes, terminals, and other container work stop when the new image replaces the old one.
3. Inventory call sites in the Worker:
  * Commands: `exec`, `execStream`, `startProcess`, string kill signals, process stdin
  * Sessions and transport: `createSession`, `enableDefaultSession`, `SANDBOX_TRANSPORT`, `setTransport`
  * Terminals: `sandbox.terminal`, session `terminal()`, xterm `sessionId`
  * Interpreter: `createCodeContext` / `runCode` on bare `Sandbox`
  * Git: `gitCheckout`

If you still need stable-line cleanup first (RPC transport, `exposePort`, stream helpers), complete the [2026 deprecation migration](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/), then return here.

## What you will change

| Stable surface                                                | Preview action                                                                                                                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SANDBOX\_TRANSPORT, transport on getSandbox(), setTransport() | Remove. The preview uses RPC automatically; no transport setting.                                                                                                                                       |
| await sandbox.exec(string) → buffered result                  | await sandbox.exec(argv) then await process.output(...).                                                                                                                                                |
| execStream, startProcess, process log helpers                 | Process handle: logs, kill, waitFor\*.                                                                                                                                                                  |
| Default session / enableDefaultSession                        | Gone. Each exec is independent.                                                                                                                                                                         |
| createSession / ExecutionSession                              | Gone from the core public surface. Pass cwd/env per exec, or one shell argv script.                                                                                                                     |
| Interpreter methods on Sandbox                                | Same method names on sandbox.interpreter after withInterpreter. runCode returns plain ExecutionResult. Refer to [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/). |
| String kill signals                                           | Numeric signals on process.kill.                                                                                                                                                                        |
| waitForPort default mode                                      | Preview default is **tcp**. Pass mode: "http" for HTTP checks.                                                                                                                                          |
| Process / stream **stdin**                                    | No process stdin on the handle. Non-interactive: argv/cwd/env. Interactive PTY: [terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/).                                          |
| sandbox.terminal(request) / session terminal()                | createTerminal, then terminal.connect(request).                                                                                                                                                         |
| xterm sessionId                                               | terminalId (and optional cursor).                                                                                                                                                                       |
| sandbox.gitCheckout(...)                                      | Removed. Run git with argv exec, for example \['git', 'clone', '--', url, dir\], then output() / waits as needed.                                                                                       |

Files, mounts, backups, ports, tunnels, `proxyToSandbox`, and most lifecycle options stay available. Use the main Sandbox docs for those signatures. Where a stable page still describes sessions, transport selection, string `exec` helpers, or `sandbox.terminal`, follow this preview section instead.

## Install the preview package and image

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

Confirm the lockfile resolves `@cloudflare/sandbox` to a preview build. Point your Dockerfile at the matching preview image, for example `cloudflare/sandbox:next` (or the `-python` / other variant you use).

Do not mix a preview Worker package with a stable container image, or the reverse. Both sides must come from the same `@next` line.

## Remove transport selection

Delete `SANDBOX_TRANSPORT`, the `transport` option on `getSandbox()`, `SandboxTransport` types, and `sandbox.setTransport()`. No replacement setting is required.

## Migrate command execution

### Buffered commands

Stable:

```txt
const result = await sandbox.exec("npm test");
console.log(result.stdout, result.exitCode);
```

Preview:

```js
const process = await sandbox.exec(["/bin/bash", "-lc", "npm test"]);
const result = await process.output({ encoding: "utf8" });
console.log(result.stdout, result.exitCode);
```

```ts
const process = await sandbox.exec(["/bin/bash", "-lc", "npm test"]);
const result = await process.output({ encoding: "utf8" });
console.log(result.stdout, result.exitCode);
```

Rules:

* `await sandbox.exec(...)` means **launch succeeded**, not **command finished**.
* Prefer argv without a shell when you run a single binary: `['npm', 'test']` with `cwd` set.
* `output()` defaults to **byte** streams (`Uint8Array`). Pass `{ encoding: "utf8" }` for strings.
* There is no `sandbox.run()` compatibility helper on the current preview tip.

### Background processes and streaming

```js
const server = await sandbox.exec(["/bin/bash", "-lc", "npm run dev"], {
	cwd: "/workspace/app",
});

// Default readiness mode is TCP. Use mode: "http" when you need an HTTP check.
await server.waitForPort(3000, { timeout: 60_000 });
// await server.waitForPort(3000, { mode: "http", path: "/health", timeout: 60_000 });

const stream = await server.logs({ follow: true, replay: true });
// consume stream...

await server.kill(); // numeric signal; default 15
```

```ts
const server = await sandbox.exec(["/bin/bash", "-lc", "npm run dev"], {
	cwd: "/workspace/app",
});

// Default readiness mode is TCP. Use mode: "http" when you need an HTTP check.
await server.waitForPort(3000, { timeout: 60_000 });
// await server.waitForPort(3000, { mode: "http", path: "/health", timeout: 60_000 });

const stream = await server.logs({ follow: true, replay: true });
// consume stream...

await server.kill(); // numeric signal; default 15
```

Process handle details (waits, log events, `kill`, no stdin): [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/).

Across Worker requests, keep `server.id` and resume with `getProcess(id)` only while that process may still be running in the current container. If the container stopped, `getProcess` may return `null`. If you still hold a handle from a previous container, expect a stale-handle error. In both cases, start a new `exec` from the work you still need to run. Refer to [How long a process lives](https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives).

### Working directory and environment

| Stable                               | Preview                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| exec("cd /app"); exec("npm test");   | exec(\['/bin/bash', '-lc', 'cd /app && npm test'\]) or exec(\['npm', 'test'\], { cwd: '/app' }) |
| Exported vars in the default session | setEnvVars and/or env on each exec                                                              |
| createSession({ env })               | setEnvVars and/or env on each exec / createTerminal                                             |

Details: [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/).

Do not put live API keys or long-lived provider credentials into `setEnvVars` or launch `env`. Keep secrets in the Worker and inject them with [outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) handlers when the process must call an external API.

### Timeouts and cancellation

| Goal                    | API                                                                             |
| ----------------------- | ------------------------------------------------------------------------------- |
| Limit process lifetime  | exec(argv, { timeout }) — may finish with timedOut: true                        |
| Limit how long you wait | Options or AbortSignal on output / waits / logs — does **not** kill the process |

## Drop session APIs

Remove `createSession`, `getSession`, `deleteSession`, and `sessionId` options on core calls.

User isolation remains **one sandbox per user** (or per trust boundary), not sessions inside one sandbox.

## Attach the interpreter

Refer to [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/). Minimum:

```js
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox {
	interpreter = withInterpreter(this);
}
```

```ts
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox<Env> {
	interpreter = withInterpreter(this);
}
```

Use the **`-python`** image variant when you run Python. Keep the Worker package and container image on the same `@next` line.

## Git

`sandbox.gitCheckout` is removed. Clone or fetch with argv `exec`, for example:

```js
const clone = await sandbox.exec(
	["git", "clone", "--depth", "1", "--", repoUrl, "/workspace/repo"],
	{ cwd: "/workspace" },
);
const result = await clone.output({ encoding: "utf8" });
```

```ts
const clone = await sandbox.exec(
	["git", "clone", "--depth", "1", "--", repoUrl, "/workspace/repo"],
	{ cwd: "/workspace" },
);
const result = await clone.output({ encoding: "utf8" });
```

## Terminals

Replace stable `sandbox.terminal(request)` (and session-scoped `terminal()`) with the preview terminal resource API:

1. `const terminal = await sandbox.createTerminal({ command: ['bash'], ... })`
2. Store `terminal.id` with the sandbox id.
3. On WebSocket upgrade: `getTerminal(id)` then `terminal.connect(request, { cursor?, cols?, rows? })`.
4. In the browser, `@cloudflare/sandbox/xterm` uses `terminalId`.

Details: [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/), [Terminals API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/).

## Self-deployed bridge

This guide covers Worker SDK applications on `@next`.

The self-deployed [Sandbox bridge](https://developers.cloudflare.com/sandbox/bridge/) stays on the stable release line. Keep its Worker package, container image, and HTTP clients on matching stable versions. Do not pair a bridge deployment with `@cloudflare/sandbox@next`.

## Handle lifecycle the preview way

On `@next`, a **sandbox ID** stays stable, but the **container** behind it can be replaced. Processes and terminals live only in the current container. After replacement, old handles fail and you start the work again.

That is normal after idle time, restarts, and this migration cutover. Full model: [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/) and [How long a process lives](https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives). Recovery patterns: [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/). Catalog: [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/).

When you migrate long-running work:

1. Do not treat a stored `process.id` or `terminal.id` as enough to resume after an arbitrary delay or after deploy.
2. Persist the command, `cwd`, `env`, and any app checkpoint you need to relaunch.
3. On a later request, call `getProcess(id)` / `getTerminal(id)` only if that resource might still be running in the current container. If you get `null` or a stale-handle error, start again from the stored work.

Handle at least these errors as follows:

| Error                                                      | What to do                                                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ContainerUnavailableError                                  | Container did not start the work — back off (retryAfterMs when set), then try the work again       |
| StaleProcessHandleError / StaleTerminalHandleError         | Previous container — start again from stored work state                                            |
| OperationInterruptedError                                  | Work may have started — read reason / retryable; check state before repeating                      |
| RPCTransportError                                          | Lost contact during the call — a later call may work; this call may already have run               |
| ProcessWaitTimeoutError / ProcessAbortedError              | Wait ended only — process may still be running                                                     |
| RuntimeControlProtocolError or unusable image after deploy | Worker package and container image must match on the same @next line; do not treat as a slow start |

`getProcess` / `getTerminal` / `list*` do not start a container. They return `null` or `[]` when none is running (not an exception).

## Deploy the cutover

Finish the code migration steps in this guide on a branch first. Production cutover is one deploy of the preview Worker package and the matching container image.

Stable Sandbox and `@next` use different control protocols. A mixed pair does not work in either direction: new Worker code against an old container image fails, and old Worker code against a new container image fails.

On a normal `wrangler deploy`, Worker code becomes active immediately while container instances can still update gradually. That leaves a window where new Worker code can reach old containers. For this migration, roll containers out in one step:

```sh
npx wrangler deploy --containers-rollout=immediate
```

`--containers-rollout=immediate` does not override [rollout\_active\_grace\_period](https://developers.cloudflare.com/workers/wrangler/configuration/#containers). Leave that setting at its default of `0` for the cutover (or set it to `0` if you raised it earlier). A nonzero grace period keeps active old containers eligible longer while the new Worker is already live.

Before production:

1. Finish or stop work you need to keep through the cutover.
2. Deploy with the immediate container rollout command from the previous section.
3. Wait until the new container image is serving traffic.
4. Treat process and terminal IDs from before the deploy as invalid. Start that work again and keep the new IDs.
5. Run the checks in [Verify](#verify).

For routine deploys after migration, refer to [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/). For rollout options, refer to [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/).

## Verify

1. Confirm the lockfile and Dockerfile are both on the same `@next` line, then deploy with `--containers-rollout=immediate`.
2. Run one argv `exec` and `output({ encoding: "utf8" })`.
3. Run one long-lived process with `waitForPort` or `logs`.
4. If the app uses a browser terminal: create, connect, and resume with `getTerminal` while the container still has it.
5. Exercise the interpreter only if your app uses that extension (Python needs `-python`).
6. Confirm error handling distinguishes unavailable, interrupted/RPC, stale handle, and local wait timeouts — [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/).
7. Confirm secrets are not stored in sandbox env. Use outbound handlers where needed.
8. Grep again for removed APIs (transport, sessions, `execStream`, `startProcess`, `sandbox.terminal`, `gitCheckout`, xterm `sessionId`).

## Coding agents

Install [Cloudflare Skills ↗](https://github.com/cloudflare/skills) for your agent ([Agent setup](https://developers.cloudflare.com/agent-setup/)). The **`sandbox-migrate-to-next`** skill performs this migration. For new apps on `@next`, use **`sandbox-next`**. For day-to-day work on the current stable package, use **`sandbox-stable`**. Deprecated-API cleanup while staying on stable is in the [2026 deprecation guide](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/) (and **`sandbox-stable`**) before or instead of this guide.

## Related

* [1.0 preview overview](https://developers.cloudflare.com/sandbox/1-0-preview/)
* [Get started](https://developers.cloudflare.com/sandbox/1-0-preview/get-started/)
* [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/)
* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/)
* [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) (including [how long a process lives](https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives))
* [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/)
* [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/)
* [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/)
* [API reference](https://developers.cloudflare.com/sandbox/1-0-preview/api/)
* [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/)
* [Terminals API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/)
* [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/)
* [Extensions](https://developers.cloudflare.com/sandbox/1-0-preview/extensions/)
* [Troubleshooting](https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/)
* [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/)
* [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/)
* [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/migrate/#page","headline":"Migrate · Cloudflare Sandbox SDK docs","description":"Update an existing Sandbox SDK application from the stable package to @cloudflare/sandbox@next.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/migrate/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
