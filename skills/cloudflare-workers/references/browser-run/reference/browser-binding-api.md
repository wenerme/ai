---
description: Acquire, connect to, inspect, and manage Browser Run sessions from a Cloudflare Worker with typed browser binding methods.
title: Browser binding API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser binding API

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/reference/browser-binding-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Browser Run binding provides typed methods for browser session management from a [Cloudflare Worker](https://developers.cloudflare.com/workers/). Use these methods to acquire a session, connect a browser client, route browser requests through another Worker, and manage DevTools targets.

Configure a [browser binding](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings) in your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "browser-binding-example",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-09-22",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "browser": {
    "binding": "BROWSER"
  }
}
```

```toml
name = "browser-binding-example"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-09-22"
compatibility_flags = ["nodejs_compat"]

[browser]
binding = "BROWSER"
```

## Session methods

| Method | Description |
| --- | --- |
| `acquire(options?)` | Creates a browser session and returns its session ID. Set `targets: true` to include the session's current targets. |
| `connectSession(sessionId, options?)` | Returns a connection object with a session-pinned `webSocket` Fetcher for connecting a CDP client to an existing session. |
| `launch(options?)` | Acquires a session and returns the same connection result as `connectSession()`. |
| `getLiveView(sessionId, options?)` | Creates a Live View URL for a session or target. |
| `listSessions(options?)` | Lists active sessions in the account. |
| `history(options?)` | Lists recent active and closed sessions. |
| `limits()` | Returns the current session limits and usage values. |
| `getSession(sessionId)` | Returns session details or `null` when the session does not exist. |
| `closeSession(sessionId)` | Closes a session and returns `closing` or `closed`. |
| `devtools` | Provides typed methods for the DevTools JSON endpoints. |

## Acquire and connect to a session

`acquire()` returns session metadata. Use `connectSession()` to get a session-pinned Fetcher, then open a WebSocket upgrade and send Chrome DevTools Protocol (CDP) commands.

*src/index.jsjs*

```js
let nextCdpCommandId = 0;

function sendCdpCommand(socket, method, params = {}) {
	return new Promise((resolve, reject) => {
		const id = ++nextCdpCommandId;
		const timeout = setTimeout(() => {
			cleanup();
			reject(new Error(`CDP command "${method}" timed out`));
		}, 30_000);

		const cleanup = () => {
			clearTimeout(timeout);
			socket.removeEventListener("message", onMessage);
			socket.removeEventListener("close", onClose);
		};

		const onClose = () => {
			cleanup();
			reject(new Error("CDP connection closed before the command completed"));
		};

		const onMessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.id !== id) return;

			cleanup();
			if (message.error) {
				reject(new Error(message.error.message));
			} else {
				resolve(message.result);
			}
		};

		socket.addEventListener("message", onMessage);
		socket.addEventListener("close", onClose);
		try {
			socket.send(JSON.stringify({ id, method, params }));
		} catch (error) {
			cleanup();
			reject(error);
		}
	});
}

export default {
	async fetch(request, env) {
		const session = await env.BROWSER.acquire({ targets: true });
		const connection = await env.BROWSER.connectSession(session.sessionId);
		const response = await connection.webSocket.fetch(
			"https://browser-binding.invalid",
			{ headers: { Upgrade: "websocket" } },
		);
		if (!response.webSocket) {
			throw new Error("Browser Run did not return a WebSocket");
		}

		const socket = response.webSocket;
		socket.accept();

		try {
			await sendCdpCommand(socket, "Page.navigate", {
				url: "https://example.com",
			});
			const version = await sendCdpCommand(socket, "Browser.getVersion");
			return Response.json(version);
		} finally {
			socket.close();
			await env.BROWSER.closeSession(session.sessionId);
		}
	},
};
```

*src/index.tsts*

```ts
interface Env {
	BROWSER: Fetcher;
}

type CdpResponse = {
	id: number;
	result?: unknown;
	error?: { message: string };
};

let nextCdpCommandId = 0;

function sendCdpCommand(
	socket: WebSocket,
	method: string,
	params: Record<string, unknown> = {},
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const id = ++nextCdpCommandId;
		const timeout = setTimeout(() => {
			cleanup();
			reject(new Error(`CDP command "${method}" timed out`));
		}, 30_000);

		const cleanup = () => {
			clearTimeout(timeout);
			socket.removeEventListener("message", onMessage);
			socket.removeEventListener("close", onClose);
		};

		const onClose = () => {
			cleanup();
			reject(new Error("CDP connection closed before the command completed"));
		};

		const onMessage = (event: MessageEvent<string>) => {
			const message = JSON.parse(event.data) as CdpResponse;
			if (message.id !== id) return;

			cleanup();
			if (message.error) {
				reject(new Error(message.error.message));
			} else {
				resolve(message.result);
			}
		};

		socket.addEventListener("message", onMessage);
		socket.addEventListener("close", onClose);
		try {
			socket.send(JSON.stringify({ id, method, params }));
		} catch (error) {
			cleanup();
			reject(error);
		}
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const session = await env.BROWSER.acquire({ targets: true });
		const connection = await env.BROWSER.connectSession(session.sessionId);
		const response = await connection.webSocket.fetch(
			"https://browser-binding.invalid",
			{ headers: { Upgrade: "websocket" } },
		);
		if (!response.webSocket) {
			throw new Error("Browser Run did not return a WebSocket");
		}

		const socket = response.webSocket;
		socket.accept();

		try {
			await sendCdpCommand(socket, "Page.navigate", {
				url: "https://example.com",
			});
			const version = await sendCdpCommand(socket, "Browser.getVersion");
			return Response.json(version);
		} finally {
			socket.close();
			await env.BROWSER.closeSession(session.sessionId);
		}
	},
};
```

Use `launch()` when you do not need to separate acquisition from connection:

```js
async function useLaunch(env) {
	const session = await env.BROWSER.launch();
	const response = await session.webSocket.fetch(
		"https://browser-binding.invalid",
		{ headers: { Upgrade: "websocket" } },
	);
	if (!response.webSocket) {
		throw new Error("Browser Run did not return a WebSocket");
	}

	const socket = response.webSocket;
	socket.accept();

	try {
		return await sendCdpCommand(socket, "Browser.getVersion");
	} finally {
		socket.close();
		await env.BROWSER.closeSession(session.sessionId);
	}
}
```

```ts
interface Env {
	BROWSER: Fetcher;
}

async function useLaunch(env: Env): Promise<unknown> {
	const session = await env.BROWSER.launch();
	const response = await session.webSocket.fetch(
		"https://browser-binding.invalid",
		{ headers: { Upgrade: "websocket" } },
	);
	if (!response.webSocket) {
		throw new Error("Browser Run did not return a WebSocket");
	}

	const socket = response.webSocket;
	socket.accept();

	try {
		return await sendCdpCommand(socket, "Browser.getVersion");
	} finally {
		socket.close();
		await env.BROWSER.closeSession(session.sessionId);
	}
}
```

`launch()` performs the acquire and connection-capability steps in one call. Both methods return a connection object with this shape:

| Property | Description |
| --- | --- |
| `sessionId` | The Browser Run session ID. |
| `webSocket` | A session-pinned `Fetcher` used to open a CDP connection. |
| `targets` | The target list when requested with `targets: true`. |

### Session options

`acquire()` and `launch()` accept these options:

| Option | Type | Description |
| --- | --- | --- |
| `keepAlive` | `number` | Session inactivity timeout in milliseconds. The value must be between 10 seconds and 20 minutes. |
| `recording` | `boolean` | Records the session for later inspection. |
| `location` | `string` | ISO 3166-1 alpha-2 country code for the browser location. |
| `outboundByHost` | `Record<string, Fetcher>` | Routes requests for each hostname through a Worker Fetcher. Refer to [Route requests through an outbound Worker](https://developers.cloudflare.com/browser-run/features/outbound-workers/). |
| `guardrails` | `object` | Restricts the hostnames that the browser session can access. Refer to [Guardrails](https://developers.cloudflare.com/browser-run/features/guardrails/). |
| `targets` | `boolean` | Includes the session's DevTools targets in the result. |
| `liveViewUrlExpiresInMs` | `number` | Sets the expiry for target Live View URLs when `targets` is `true`. |

The binding uses `keepAlive` in its options object.

## DevTools methods

The `devtools` property exposes the DevTools JSON endpoints as typed methods. It is one nested binding target, so you can call the methods from the same Browser Run binding:

| Method | Description |
| --- | --- |
| `getVersion(sessionId)` | Returns browser version information. |
| `getProtocol(sessionId)` | Returns the browser's DevTools protocol description. |
| `listTargets(sessionId, options?)` | Lists the browser's targets. Set `liveViewUrlExpiresInMs` to control generated Live View URL expiry. |
| `getTarget(sessionId, targetId)` | Returns one target. |
| `newTarget(sessionId, url?, options?)` | Opens a new target. If `url` is omitted, the target opens at `about:blank`. |
| `activateTarget(sessionId, targetId)` | Activates a target. |
| `closeTarget(sessionId, targetId)` | Closes a target. |

Target objects include the target ID, type, URL, title, and, when available, a `devtoolsFrontendUrl`.

```js
const targets = await env.BROWSER.devtools.listTargets(sessionId, {
	liveViewUrlExpiresInMs: 300_000,
});

const page = targets.find((target) => target.type === "page");
if (!page) {
	throw new Error("No page target found");
}

const liveView = await env.BROWSER.getLiveView(sessionId, {
	targetId: page.id,
	mode: "devtools",
});

console.log(liveView.devtoolsFrontendUrl);
```

```ts
const targets = await env.BROWSER.devtools.listTargets(sessionId, {
	liveViewUrlExpiresInMs: 300_000,
});

const page = targets.find((target) => target.type === "page");
if (!page) {
	throw new Error("No page target found");
}

const liveView = await env.BROWSER.getLiveView(sessionId, {
	targetId: page.id,
	mode: "devtools",
});

console.log(liveView.devtoolsFrontendUrl);
```

Use the returned `devtoolsFrontendUrl` to open Live View. To connect a CDP client to a specific target, pass its ID to `connectSession(sessionId, { targetId })`. Treat Live View URLs as credentials because they contain access tokens.

## Next steps

- Learn about [Live View](https://developers.cloudflare.com/browser-run/features/live-view/).
- Review [session management with HTTP](https://developers.cloudflare.com/browser-run/cdp/session-management/).
- Use the [Chrome DevTools Protocol](https://developers.cloudflare.com/browser-run/cdp/) for direct browser control.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/browser-binding-api/#page","headline":"Browser binding API","description":"Acquire, connect to, inspect, and manage Browser Run sessions from a Cloudflare Worker with typed browser binding methods.","url":"https://developers.cloudflare.com/browser-run/reference/browser-binding-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
