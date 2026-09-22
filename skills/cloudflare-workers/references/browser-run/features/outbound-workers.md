---
description: Route selected Browser Run requests through another Worker for private services, authentication, or response processing.
title: Outbound Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Outbound Workers

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/features/outbound-workers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `outboundByHost` to send browser requests for selected hostnames through another Worker. The outbound Worker can reach a private service, add authentication, or transform the response before it reaches the browser.

This feature is useful when the browser should request a hostname that has no public DNS record. Browser Run matches the hostname and sends the request to the Worker Fetcher instead of requiring public DNS resolution.

## Configure the bindings

Declare a Browser Run binding and a service binding for the outbound Worker:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "browser-runner",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-09-22",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "browser": {
    "binding": "BROWSER"
  },
  "services": [
    {
      "binding": "OUTBOUND",
      "service": "outbound-worker"
    }
  ]
}
```

```toml
name = "browser-runner"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-09-22"
compatibility_flags = ["nodejs_compat"]

[browser]
binding = "BROWSER"

[[services]]
binding = "OUTBOUND"
service = "outbound-worker"
```

The service binding gives the browser Worker a `Fetcher` for the outbound Worker. The outbound Worker does not need a public route.

## Route requests by hostname

Pass the service binding to `launch()` or `acquire()` in the `outboundByHost` map. The map key must exactly match the hostname in the browser request.

The following example uses raw CDP commands. It opens a Browser Run session, routes `private.example.test` through the outbound Worker, and sends a `Page.navigate` command:

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
	async fetch(_request, env) {
		const connection = await env.BROWSER.launch({
			outboundByHost: {
				"private.example.test": env.OUTBOUND,
			},
		});
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
				url: "http://private.example.test",
			});
			return new Response("Navigation sent through the outbound Worker");
		} finally {
			socket.close();
			await env.BROWSER.closeSession(connection.sessionId);
		}
	},
};
```

*src/index.tsts*

```ts
interface Env {
	BROWSER: Fetcher;
	OUTBOUND: Fetcher;
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
	async fetch(_request: Request, env: Env): Promise<Response> {
		const connection = await env.BROWSER.launch({
			outboundByHost: {
				"private.example.test": env.OUTBOUND,
			},
		});
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
				url: "http://private.example.test",
			});
			return new Response("Navigation sent through the outbound Worker");
		} finally {
			socket.close();
			await env.BROWSER.closeSession(connection.sessionId);
		}
	},
};
```

The `.test` top-level domain is reserved for testing. Use a hostname that does not resolve on public DNS for a virtual outbound route. The hostname must still match the key in `outboundByHost`.

Outbound Worker routing supports HTTP requests only. Use an `http://` URL for the routed hostname. HTTPS requests do not use the outbound Worker.

## Constraints

- Use `outboundByHost` with Browser Run binding methods only. It is not supported by REST endpoints or legacy HTTP-only bindings.
- Create the Fetcher and call `acquire()` or `launch()` in the same Worker invocation.
- The Fetcher is not persisted with the browser session and cannot be reused by a later invocation.
- Outbound routing applies to the hostnames in the map. Requests to other hostnames use the browser's normal network path.

## Next steps

- Review the [Browser binding API](https://developers.cloudflare.com/browser-run/reference/browser-binding-api/).
- Learn how to use the [Chrome DevTools Protocol](https://developers.cloudflare.com/browser-run/cdp/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/features/outbound-workers/#page","headline":"Outbound Workers","description":"Route selected Browser Run requests through another Worker for private services, authentication, or response processing.","url":"https://developers.cloudflare.com/browser-run/features/outbound-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
