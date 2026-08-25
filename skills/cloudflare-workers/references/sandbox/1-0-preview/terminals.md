---
description: Interactive PTY terminals in the Sandbox SDK 1.0 preview — resource model and browser connect.
title: Terminals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Terminals

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page documents terminals on `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0\. For the current stable terminal helpers, refer to [Terminal connections](https://developers.cloudflare.com/sandbox/concepts/terminal/) and [Terminal API](https://developers.cloudflare.com/sandbox/api/terminal/).

A **terminal** is an interactive PTY in the current container for a sandbox. Use it for full-duplex terminal I/O: a browser shell, resize, interrupt, and reconnect.

Command execution uses [exec](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) and process handles. Terminals are a separate resource type. API reference: [Terminals API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/).

## Processes and terminals

|        | Process (exec)                                               | Terminal                                   |
| ------ | ------------------------------------------------------------ | ------------------------------------------ |
| Role   | Supervised argv process                                      | Interactive PTY                            |
| Input  | Launch-time argv (and whatever the program reads on its own) | PTY input via write() or browser connect() |
| Output | logs(), output(), waits                                      | output(), snapshot, waitForExit()          |
| Stop   | kill(signal?)                                                | interrupt() / terminate()                  |
| Lookup | getProcess / listProcesses                                   | getTerminal / listTerminals                |

Both kinds of resource live only in the current container for a sandbox ID. Lookup methods do not start a container. Refer to [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/) and [How long a process lives](https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives).

## Create a terminal

```js
const terminal = await sandbox.createTerminal({
	command: ["bash"],
	cwd: "/workspace",
	cols: 120,
	rows: 40,
});

console.log(terminal.id);
```

```ts
const terminal = await sandbox.createTerminal({
	command: ["bash"],
	cwd: "/workspace",
	cols: 120,
	rows: 40,
});

console.log(terminal.id);
```

You can write to the PTY from the Worker, resize it, stream output, or end it:

```js
await terminal.write(new TextEncoder().encode("uname -a\n"));
await terminal.resize(100, 30);
await terminal.terminate();
```

```ts
await terminal.write(new TextEncoder().encode("uname -a\n"));
await terminal.resize(100, 30);
await terminal.terminate();
```

## Lifetime

* A terminal exists only in the **current container** for that sandbox ID.
* `getTerminal` / `listTerminals` return `null` / `[]` when no container is running. They do not start one.
* After the container stops or is replaced, old terminal IDs are invalid. Create a new terminal if you need one again.
* An active terminal can keep the container alive across Worker requests, as an active process can.

Store `terminal.id` to resume the same PTY while that container is still up.

## Browser connect

1. Create a terminal and keep `terminal.id` with the sandbox id.
2. On each WebSocket upgrade, resolve the terminal with `getTerminal`, then return `terminal.connect(request)`.
3. In the browser, use `@cloudflare/sandbox/xterm` with **`terminalId`**.

### Worker

```js
import { getSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (
			url.pathname === "/ws/terminal" &&
			request.headers.get("Upgrade")?.toLowerCase() === "websocket"
		) {
			const sandboxId = url.searchParams.get("sandboxId");
			const terminalId = url.searchParams.get("terminalId");
			if (!sandboxId || !terminalId) {
				return new Response("sandboxId and terminalId are required", {
					status: 400,
				});
			}

			const sandbox = getSandbox(env.Sandbox, sandboxId);
			const terminal = await sandbox.getTerminal(terminalId);
			if (!terminal) {
				return new Response("Terminal not found", { status: 404 });
			}

			return terminal.connect(request, {
				cursor: url.searchParams.get("cursor") ?? undefined,
			});
		}

		return new Response("Not found", { status: 404 });
	},
};
```

```ts
import { getSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (
			url.pathname === "/ws/terminal" &&
			request.headers.get("Upgrade")?.toLowerCase() === "websocket"
		) {
			const sandboxId = url.searchParams.get("sandboxId");
			const terminalId = url.searchParams.get("terminalId");
			if (!sandboxId || !terminalId) {
				return new Response("sandboxId and terminalId are required", {
					status: 400,
				});
			}

			const sandbox = getSandbox(env.Sandbox, sandboxId);
			const terminal = await sandbox.getTerminal(terminalId);
			if (!terminal) {
				return new Response("Terminal not found", { status: 404 });
			}

			return terminal.connect(request, {
				cursor: url.searchParams.get("cursor") ?? undefined,
			});
		}

		return new Response("Not found", { status: 404 });
	},
};
```

Create the terminal from an application route when the UI needs one:

```js
const sandboxId = "user-123";
const sandbox = getSandbox(env.Sandbox, sandboxId);
const terminal = await sandbox.createTerminal({ command: ["bash"] });
return Response.json({ sandboxId, terminalId: terminal.id });
```

```ts
const sandboxId = "user-123";
const sandbox = getSandbox(env.Sandbox, sandboxId);
const terminal = await sandbox.createTerminal({ command: ["bash"] });
return Response.json({ sandboxId, terminalId: terminal.id });
```

### Browser (xterm.js)

npmyarnpnpmbun

```
npm install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox@next
```

```
yarn install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox@next
```

```
pnpm install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox@next
```

```
bun install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox@next
```

```js
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { SandboxAddon } from "@cloudflare/sandbox/xterm";
import "@xterm/xterm/css/xterm.css";

const term = new Terminal({ cursorBlink: true });
const fitAddon = new FitAddon();
const sandboxAddon = new SandboxAddon({
	// `origin` is already a WebSocket origin (`wss://` or `ws://`).
	getWebSocketUrl: ({ sandboxId, terminalId, cursor, origin }) => {
		const params = new URLSearchParams({ sandboxId });
		if (terminalId) params.set("terminalId", terminalId);
		if (cursor) params.set("cursor", cursor);
		return `${origin}/ws/terminal?${params}`;
	},
	reconnect: true,
});

term.loadAddon(fitAddon);
term.loadAddon(sandboxAddon);
term.open(document.getElementById("terminal"));
fitAddon.fit();

// Values returned by your create-terminal route
const sandboxId = "user-123";
const terminalId = "term_...";
sandboxAddon.connect({ sandboxId, terminalId });
```

```ts
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { SandboxAddon } from "@cloudflare/sandbox/xterm";
import "@xterm/xterm/css/xterm.css";

const term = new Terminal({ cursorBlink: true });
const fitAddon = new FitAddon();
const sandboxAddon = new SandboxAddon({
	// `origin` is already a WebSocket origin (`wss://` or `ws://`).
	getWebSocketUrl: ({ sandboxId, terminalId, cursor, origin }) => {
		const params = new URLSearchParams({ sandboxId });
		if (terminalId) params.set("terminalId", terminalId);
		if (cursor) params.set("cursor", cursor);
		return `${origin}/ws/terminal?${params}`;
	},
	reconnect: true,
});

term.loadAddon(fitAddon);
term.loadAddon(sandboxAddon);
term.open(document.getElementById("terminal")!);
fitAddon.fit();

// Values returned by your create-terminal route
const sandboxId = "user-123";
const terminalId = "term_...";
sandboxAddon.connect({ sandboxId, terminalId });
```

| Stable package            | Preview                                  |
| ------------------------- | ---------------------------------------- |
| sandbox.terminal(request) | createTerminal \+ getTerminal \+ connect |
| xterm / URL sessionId     | terminalId (and optional cursor)         |

## Related

* [Terminals API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/)
* [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/)
* [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/)
* [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/)
* [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/terminals/#page","headline":"Terminals · Cloudflare Sandbox SDK docs","description":"Interactive PTY terminals in the Sandbox SDK 1.0 preview — resource model and browser connect.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/terminals/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
