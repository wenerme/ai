---
description: Connect to WebSocket servers running in sandboxes.
title: WebSocket connections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

#  WebSocket connections

Last updated May 26, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/sandbox/guides/websocket-connections/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This guide shows you how to work with WebSocket servers running in your sandboxes.

## Choose your approach

**Expose via preview URL** \- Get a public URL for external clients to connect to. Best for public chat rooms, multiplayer games, or real-time dashboards.

**Connect with wsConnect()** \- Your Worker establishes the WebSocket connection. Best for custom routing logic, authentication gates, or when your Worker needs real-time data from sandbox services.

## Connect to WebSocket echo server

**Create the echo server:**

```typescript
Bun.serve({
	port: 8080,
	hostname: "0.0.0.0",
	fetch(req, server) {
		if (server.upgrade(req)) {
			return;
		}
		return new Response("WebSocket echo server");
	},
	websocket: {
		message(ws, message) {
			ws.send(`Echo: ${message}`);
		},
		open(ws) {
			console.log("Client connected");
		},
		close(ws) {
			console.log("Client disconnected");
		},
	},
});

console.log("WebSocket server listening on port 8080");
```

**Extend the Dockerfile:**

```dockerfile
FROM docker.io/cloudflare/sandbox:0.3.3

# Copy echo server into the container
COPY echo-server.ts /workspace/echo-server.ts

# Create custom startup script
COPY startup.sh /container-server/startup.sh
RUN chmod +x /container-server/startup.sh
```

**Create startup script:**

```bash
#!/bin/bash
# Start your WebSocket server in the background
bun /workspace/echo-server.ts &
# Start SDK's control plane (needed for the SDK to work)
exec bun dist/index.js
```

**Connect from your Worker:**

```js
import { getSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

export default {
	async fetch(request, env) {
		if (request.headers.get("Upgrade")?.toLowerCase() === "websocket") {
			const sandbox = getSandbox(env.Sandbox, "echo-service");
			return await sandbox.wsConnect(request, 8080);
		}

		return new Response("WebSocket endpoint");
	},
};
```

```ts
import { getSandbox } from '@cloudflare/sandbox';

export { Sandbox } from "@cloudflare/sandbox";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
      const sandbox = getSandbox(env.Sandbox, 'echo-service');
      return await sandbox.wsConnect(request, 8080);
    }

    return new Response('WebSocket endpoint');

}
};
```

**Client connects:**

```javascript
const ws = new WebSocket('wss://your-worker.com');
ws.onmessage = (event) => console.log(event.data);
ws.send('Hello!'); // Receives: "Echo: Hello!"
```

## Expose WebSocket service via preview URL

Get a public URL for your WebSocket server:

```js
import { getSandbox, proxyToSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

export default {
	async fetch(request, env) {
		// Auto-route all requests via proxyToSandbox first
		const proxyResponse = await proxyToSandbox(request, env);
		if (proxyResponse) return proxyResponse;

		// Extract hostname from request
		const { hostname } = new URL(request.url);
		const sandbox = getSandbox(env.Sandbox, "echo-service");

		// Expose the port to get preview URL
		const { url } = await sandbox.exposePort(8080, { hostname });

		// Return URL to clients
		if (request.url.includes("/ws-url")) {
			return Response.json({ url: url.replace("https", "wss") });
		}

		return new Response("Not found", { status: 404 });
	},
};
```

```ts
import { getSandbox, proxyToSandbox } from '@cloudflare/sandbox';

export { Sandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Auto-route all requests via proxyToSandbox first
    const proxyResponse = await proxyToSandbox(request, env);
    if (proxyResponse) return proxyResponse;

    // Extract hostname from request
    const { hostname } = new URL(request.url);
    const sandbox = getSandbox(env.Sandbox, 'echo-service');

    // Expose the port to get preview URL
    const { url } = await sandbox.exposePort(8080, { hostname });

    // Return URL to clients
    if (request.url.includes('/ws-url')) {
      return Response.json({ url: url.replace('https', 'wss') });
    }

    return new Response('Not found', { status: 404 });

}
};
```

Alternative: quick tunnels

Quick tunnels also handle WebSocket upgrades and do not require a custom domain, so they work on `.workers.dev`. Swap `sandbox.exposePort(8080, { hostname })` for `sandbox.tunnels.get(8080)` to get a `*.trycloudflare.com` URL.

**Client connects to preview URL:**

```javascript
// Get the preview URL
const response = await fetch('https://your-worker.com/ws-url');
const { url } = await response.json();

// Connect
const ws = new WebSocket(url);
ws.onmessage = (event) => console.log(event.data);
ws.send('Hello!'); // Receives: "Echo: Hello!"
```

## Connect from Worker to get real-time data

Your Worker can connect to a WebSocket service to get real-time data, even when the incoming request isn't a WebSocket:

```js
import { getSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

let initialized = false;

export default {
	async fetch(request, env) {
		// Get or create a sandbox instance
		const sandbox = getSandbox(env.Sandbox, "data-processor");

		// Check for WebSocket upgrade
		const upgrade = request.headers.get("Upgrade")?.toLowerCase();

		if (upgrade === "websocket") {
			// Initialize server on first connection
			if (!initialized) {
				await sandbox.writeFile(
					"/workspace/server.js",
					`Bun.serve({
            port: 8080,
            fetch(req, server) {
              server.upgrade(req);
            },
            websocket: {
              message(ws, msg) {
                ws.send(\`Echo: \${msg}\`);
              }
            }
          });`,
				);
				await sandbox.startProcess("bun /workspace/server.js");
				initialized = true;
			}
			// Connect to WebSocket server
			return await sandbox.wsConnect(request, 8080);
		}

		return new Response("Processed real-time data");
	},
};
```

```ts
import { getSandbox } from '@cloudflare/sandbox';

export { Sandbox } from '@cloudflare/sandbox';

let initialized = false;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

     // Get or create a sandbox instance
    const sandbox = getSandbox(env.Sandbox, 'data-processor');


    // Check for WebSocket upgrade
    const upgrade = request.headers.get('Upgrade')?.toLowerCase();

    if (upgrade === 'websocket') {
      // Initialize server on first connection
      if (!initialized) {
        await sandbox.writeFile(
          '/workspace/server.js',
          `Bun.serve({
            port: 8080,
            fetch(req, server) {
              server.upgrade(req);
            },
            websocket: {
              message(ws, msg) {
                ws.send(\`Echo: \${msg}\`);
              }
            }
          });`
        );
        await sandbox.startProcess(
          'bun /workspace/server.js'
        );
        initialized = true;
      }
      // Connect to WebSocket server
      return await sandbox.wsConnect(request, 8080);
    }

    return new Response('Processed real-time data');

}
};
```

This pattern is useful when you need streaming data from sandbox services but want to return HTTP responses to clients.

## Troubleshooting

### Upgrade failed

Verify request has WebSocket headers:

```js
console.log(request.headers.get("Upgrade")); // 'websocket'
console.log(request.headers.get("Connection")); // 'Upgrade'
```

```ts
console.log(request.headers.get('Upgrade'));    // 'websocket'
console.log(request.headers.get('Connection')); // 'Upgrade'
```

### Local development

Expose ports in Dockerfile for `wrangler dev`:

```dockerfile
FROM docker.io/cloudflare/sandbox:0.3.3

COPY echo-server.ts /workspace/echo-server.ts
COPY startup.sh /container-server/startup.sh
RUN chmod +x /container-server/startup.sh

# Required for local development
EXPOSE 8080
```

Note

Port exposure in Dockerfile is only required for local development. In production, all ports are automatically accessible.

## Related resources

* [Ports API reference](https://developers.cloudflare.com/sandbox/api/ports/) \- Complete API documentation
* [Preview URLs concept](https://developers.cloudflare.com/sandbox/concepts/preview-urls/) \- How preview URLs work
* [Tunnels API](https://developers.cloudflare.com/sandbox/api/tunnels/) \- Zero-config `*.trycloudflare.com` URLs for WebSocket services in development
* [Background processes guide](https://developers.cloudflare.com/sandbox/guides/background-processes/) \- Managing long-running services

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/websocket-connections/#page","headline":"WebSocket connections · Cloudflare Sandbox SDK docs","description":"Connect to WebSocket servers running in sandboxes.","url":"https://developers.cloudflare.com/sandbox/guides/websocket-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
