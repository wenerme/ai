---
description: Start a server in a Linux sandbox once for each container, wait until it answers, and stop it from later requests.
title: Run a server in the background
image: https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/og.png?v=4e85cc5d09cf583f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a server in the background

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Start a server that runs until the container stops, such as a development server, a tunnel, or a code kernel. The server has no exit code to wait for. Your Durable Object starts it on first use, waits until it answers, and starts it again in each new container.

For a process that runs until it finishes, such as a build or an agent task, refer to [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/). If the sandbox runs one server and keeps no files that you need, you can make the server the main process instead, as in [Preview a web application](https://developers.cloudflare.com/sandbox/previews/). When the main process exits, the instance stops, and its files end with it.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

## Run a server

1. Add shell scripts and functions that start a server, check it, and stop it:

   *src/index.jsjs*



   ```js
   const SERVERS = "/var/lib/servers";
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   // Defines current(), which reads the process ID in a directory into $pid
   // when the process started in this instance.
   const CURRENT = `current() {
   	read -r pid boot 2>/dev/null <"$1/pid" &&
   		[ "$boot" = "$(cat /proc/sys/kernel/random/boot_id)" ]
   }`;

   // Starts the server unless it already runs. The server runs in its own
   // process group, and writes its process ID and output to its directory.
   const SERVE = `${CURRENT}
   dir=$1; shift
   current "$dir" && kill -0 "$pid" 2>/dev/null && exit 0
   mkdir -p "$dir" && rm -f "$dir/pid"
   setsid sh -c 'echo "$$ $(cat /proc/sys/kernel/random/boot_id)" >"$0/pid"; exec "$@"' \\
   	"$dir" "$@" >"$dir/log" 2>&1`;

   // Prints the end of the log and exits with 0 when the server has exited.
   const EXITED = `${CURRENT}
   current "$1" || exit 1
   kill -0 "$pid" 2>/dev/null && exit 1
   tail -n 20 "$1/log"`;

   // Stops the process group. Once the server exits, within 10 seconds,
   // removes its process ID.
   const STOP = `${CURRENT}
   current "$1" || exit 0
   kill -s TERM -- "-$pid" 2>/dev/null
   timeout 10 sh -c 'while kill -0 "$0" 2>/dev/null; do sleep 0.1; done' "$pid" &&
   	rm -f "$1/pid"`;

   async function startServer(container, dir, argv, options = {}) {
   	// Ignoring the output lets the server outlive this request.
   	await container.exec(["sh", "-c", SERVE, "sh", dir, ...argv], {
   		...options,
   		stdout: "ignore",
   		stderr: "ignore",
   	});
   }

   async function serverExited(container, dir) {
   	const check = await container.exec(["sh", "-c", EXITED, "sh", dir]);
   	const output = await check.output();

   	return output.exitCode === 0
   		? new TextDecoder().decode(output.stdout)
   		: undefined;
   }

   async function waitForServer(container, dir, port, timeoutMs) {
   	const server = container.getTcpPort(port);
   	const deadline = Date.now() + timeoutMs;

   	while (Date.now() < deadline) {
   		try {
   			const response = await server.fetch("http://server/", {
   				signal: AbortSignal.timeout(1_000),
   			});
   			await response.body?.cancel();
   			return server;
   		} catch {
   			const log = await serverExited(container, dir);

   			if (log !== undefined) {
   				throw new Error(`The server exited: ${log}`);
   			}

   			await scheduler.wait(500);
   		}
   	}

   	throw new Error("The server did not answer in time");
   }

   async function stopServer(container, dir) {
   	const stop = await container.exec(["sh", "-c", STOP, "sh", dir]);
   	await stop.exitCode;
   }
   ```

   *src/index.tsts*



   ```ts
   const SERVERS = "/var/lib/servers";
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   // Defines current(), which reads the process ID in a directory into $pid
   // when the process started in this instance.
   const CURRENT = `current() {
   	read -r pid boot 2>/dev/null <"$1/pid" &&
   		[ "$boot" = "$(cat /proc/sys/kernel/random/boot_id)" ]
   }`;

   // Starts the server unless it already runs. The server runs in its own
   // process group, and writes its process ID and output to its directory.
   const SERVE = `${CURRENT}
   dir=$1; shift
   current "$dir" && kill -0 "$pid" 2>/dev/null && exit 0
   mkdir -p "$dir" && rm -f "$dir/pid"
   setsid sh -c 'echo "$$ $(cat /proc/sys/kernel/random/boot_id)" >"$0/pid"; exec "$@"' \\
   	"$dir" "$@" >"$dir/log" 2>&1`;

   // Prints the end of the log and exits with 0 when the server has exited.
   const EXITED = `${CURRENT}
   current "$1" || exit 1
   kill -0 "$pid" 2>/dev/null && exit 1
   tail -n 20 "$1/log"`;

   // Stops the process group. Once the server exits, within 10 seconds,
   // removes its process ID.
   const STOP = `${CURRENT}
   current "$1" || exit 0
   kill -s TERM -- "-$pid" 2>/dev/null
   timeout 10 sh -c 'while kill -0 "$0" 2>/dev/null; do sleep 0.1; done' "$pid" &&
   	rm -f "$1/pid"`;

   type ServerOptions = { cwd?: string; env?: Record<string, string> };

   async function startServer(
   	container: Container,
   	dir: string,
   	argv: string[],
   	options: ServerOptions = {},
   ): Promise<void> {
   	// Ignoring the output lets the server outlive this request.
   	await container.exec(["sh", "-c", SERVE, "sh", dir, ...argv], {
   		...options,
   		stdout: "ignore",
   		stderr: "ignore",
   	});
   }

   async function serverExited(
   	container: Container,
   	dir: string,
   ): Promise<string | undefined> {
   	const check = await container.exec(["sh", "-c", EXITED, "sh", dir]);
   	const output = await check.output();

   	return output.exitCode === 0
   		? new TextDecoder().decode(output.stdout)
   		: undefined;
   }

   async function waitForServer(
   	container: Container,
   	dir: string,
   	port: number,
   	timeoutMs: number,
   ): Promise<Fetcher> {
   	const server = container.getTcpPort(port);
   	const deadline = Date.now() + timeoutMs;

   	while (Date.now() < deadline) {
   		try {
   			const response = await server.fetch("http://server/", {
   				signal: AbortSignal.timeout(1_000),
   			});
   			await response.body?.cancel();
   			return server;
   		} catch {
   			const log = await serverExited(container, dir);

   			if (log !== undefined) {
   				throw new Error(`The server exited: ${log}`);
   			}

   			await scheduler.wait(500);
   		}
   	}

   	throw new Error("The server did not answer in time");
   }

   async function stopServer(container: Container, dir: string): Promise<void> {
   	const stop = await container.exec(["sh", "-c", STOP, "sh", dir]);
   	await stop.exitCode;
   }
   ```

   `SERVE` starts nothing when the server in the directory already runs. Every request can call `startServer()`, and a new container, which has no server, gets one. This also covers a Durable Object that restarts while its container keeps running.

   The process ID file also records the boot ID, which changes in every instance. A [snapshot](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/) restores the file, and a new instance reuses the same process IDs, so a restored process ID can belong to an unrelated process. `current()` ignores a process ID from another instance.

   `setsid` starts the server in a new process group, so `STOP` also stops the processes that the server starts. The shell that runs `SERVE` stays in the container until the server exits. Do not start the server with `&` instead: a shell starts background jobs with `SIGINT` ignored.

   `STOP` removes the process ID once the server exits, so a server started in the same directory right after it never reads as exited. A server that ignores `SIGTERM` keeps running, and `STOP` exits with `124` after 10 seconds.

   `waitForServer()` treats any HTTP response as ready. If the server exits first, it throws with the end of the log. The log grows until the server stops, so keep the output of a busy server small, or send it to a [mounted bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/).
2. Add a constructor to your Durable Object. It sets the inactivity timeout again when a restarted Durable Object finds the container running:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;
   		if (container?.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}
   }
   ```

   Then add methods that send a request to the server, starting it first, and stop it:

   *src/index.tsts*



   ```ts
   const WEB = `${SERVERS}/web`;
   const WEB_PORT = 8080;
   const WEB_SERVER = [
   	"node",
   	"--eval",
   	`require("node:http")
   		.createServer((req, res) => res.end("hello from the server\\n"))
   		.listen(${WEB_PORT})`,
   ];

   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async fetchServer(request: Request): Promise<Response> {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		if (!container.running) {
   			container.start({
   				image: "cloudflare/debian-trixie",
   				entrypoint: ["sleep", "infinity"],
   				enableInternet: false,
   			});
   			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}

   		await startServer(container, WEB, WEB_SERVER);
   		const server = await waitForServer(container, WEB, WEB_PORT, 30_000);
   		return server.fetch(request);
   	}

   	async stopWeb(): Promise<void> {
   		const container = this.ctx.container;

   		if (container?.running) {
   			await stopServer(container, WEB);
   		}
   	}
   }
   ```

   `fetchServer()` runs `SERVE` on every request. To skip it once the server answers, keep a flag in memory, and clear it when you start a new container.

   A running server does not keep the container running. Requests that reach the server through your Durable Object keep it running, as other requests do. When the inactivity timeout ends, the container stops, and the server stops with it. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#activity-keeps-an-instance-running).
3. Add routes to your Worker that call these methods:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);

   		if (url.pathname !== "/server") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName("sandbox");

   		if (request.method === "DELETE") {
   			await sandbox.stopWeb();
   			return new Response(null, { status: 202 });
   		}

   		// getTcpPort() accepts only http:// URLs.
   		const forward = new Request("http://container/", request);
   		return sandbox.fetchServer(forward);
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);

   		if (url.pathname !== "/server") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName("sandbox");

   		if (request.method === "DELETE") {
   			await sandbox.stopWeb();
   			return new Response(null, { status: 202 });
   		}

   		// getTcpPort() accepts only http:// URLs.
   		const forward = new Request("http://container/", request);
   		return sandbox.fetchServer(forward);
   	},
   } satisfies ExportedHandler<Env>;
   ```

4. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

5. Send a request to the server. Replace the example hostname with the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/server
   ```

   The first request starts the container and the server, and waits until the server answers:

   ```txt
   hello from the server
   ```

6. Stop the server, then send another request:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/server --request DELETE
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/server
   ```

   The `DELETE` request responds with `202`. The next request starts the server again and prints the same response.

## Related resources

- [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/): processes that run until they finish.
- [Preview a web application](https://developers.cloudflare.com/sandbox/previews/): a web server as the main process.
- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)
- [`getTcpPort()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/#page","headline":"Run a server in the background","description":"Start a server in a Linux sandbox once for each container, wait until it answers, and stop it from later requests.","url":"https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/og.png?v=4e85cc5d09cf583f","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
