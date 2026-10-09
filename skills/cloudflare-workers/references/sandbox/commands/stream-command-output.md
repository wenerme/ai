---
description: Send stdout and stderr from a command in a Linux sandbox to a browser as server-sent events while the command runs.
title: Stream command output
image: https://developers.cloudflare.com/sandbox/commands/stream-command-output/og.png?v=fe20e7beac184376
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream command output

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/commands/stream-command-output/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Show the output of a command in a browser while the command runs. The Durable Object sends standard output and standard error as [server-sent events ↗︎](https://html.spec.whatwg.org/multipage/server-sent-events.html), reports the exit code, and stops the command when the client disconnects.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

## Stream a command

1. Add a method to your Durable Object that runs a command and returns its output as an event stream:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async stream(argv: string[]): Promise<Response> {
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
   		}

   		const process = await container.exec(argv);
   		const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
   		const writer = writable.getWriter();
   		const encoder = new TextEncoder();

   		const send = (event: string, data: unknown) =>
   			writer.write(
   				encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
   			);

   		const forward = async (
   			stream: ReadableStream<Uint8Array>,
   			event: "stdout" | "stderr",
   		) => {
   			for await (const text of stream.pipeThrough(new TextDecoderStream())) {
   				await send(event, text);
   			}
   		};

   		let exited = false;
   		const markExited = () => {
   			exited = true;
   		};
   		process.exitCode.then(markExited, markExited);

   		// Signaling a process that has exited records an internal error.
   		const stop = () => {
   			if (!exited) process.kill();
   		};

   		// Stop the process when the client disconnects.
   		writer.closed.catch(stop);

   		// Detect a disconnected client while the process writes nothing.
   		const heartbeat = setInterval(() => {
   			writer.write(encoder.encode(": keep-alive\n\n")).catch(() => {});
   		}, 5_000);

   		const pump = async () => {
   			try {
   				await Promise.all([
   					forward(process.stdout!, "stdout"),
   					forward(process.stderr!, "stderr"),
   				]);
   				await send("exit", { exitCode: await process.exitCode });
   				await writer.close();
   			} catch {
   				stop();
   			} finally {
   				clearInterval(heartbeat);
   			}
   		};

   		// Keep streaming after this method returns the response.
   		void pump();

   		return new Response(readable, {
   			headers: {
   				"Content-Type": "text/event-stream",
   				"Cache-Control": "no-cache",
   			},
   		});
   	}
   }
   ```

   The method returns the response before the command finishes. `pump()` then writes each chunk as the process produces it. `pump()` reads standard output and standard error at the same time, because a stream that nobody reads can block a process that keeps writing to it. `TextDecoderStream` keeps characters that span two chunks intact.

   When the client disconnects, the next write fails and the method calls `kill()`, which sends `SIGTERM` to the command. The keep-alive comment every five seconds makes that write happen while the command is silent.
2. Add a route to your Worker that streams a command your application chooses:

   *src/index.jsjs*



   ```js
   const build = [
   	"sh",
   	"-c",
   	'for i in 1 2 3; do echo "step $i"; sleep 1; done; echo "warning: almost done" >&2; exit 3',
   ];

   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match =
   			/^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/build$/.exec(
   				url.pathname,
   			);

   		if (!match || request.method !== "GET") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(match[1]);
   		return sandbox.stream(build);
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   const build = [
   	"sh",
   	"-c",
   	'for i in 1 2 3; do echo "step $i"; sleep 1; done; echo "warning: almost done" >&2; exit 3',
   ];

   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/build$/.exec(url.pathname);

   		if (!match || request.method !== "GET") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(match[1]);
   		return sandbox.stream(build);
   	},
   } satisfies ExportedHandler<Env>;
   ```

   The example command writes a line each second, writes a warning to standard error, and exits with code `3`. Replace it with your build or test command. The Worker chooses the command instead of reading one from the request. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/).
3. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

4. Stream the command in the sandbox named `ada`. Replace the example hostname with the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/build --no-buffer
   ```

   The events arrive about one second apart:

   ```txt
   event: stdout
   data: "step 1\n"

   event: stdout
   data: "step 2\n"

   event: stdout
   data: "step 3\n"

   event: stderr
   data: "warning: almost done\n"

   event: exit
   data: {"exitCode":3}
   ```

## Read the stream in a browser

Each event has a type and a JSON-encoded `data` value. A `stdout` or `stderr` event can hold part of a line or several lines, so append the text instead of treating each event as a line. The `exit` event comes last. Lines that start with `:` are comments, which clients ignore.

The route answers `GET` requests, so a page can read it with `EventSource`:

```js
const output = document.querySelector("pre");
const events = new EventSource("/sandboxes/ada/build");

for (const type of ["stdout", "stderr"]) {
	events.addEventListener(type, (event) => {
		output.textContent += JSON.parse(event.data);
	});
}

events.addEventListener("exit", (event) => {
	output.textContent += `\nExit code ${JSON.parse(event.data).exitCode}\n`;
	events.close();
});
```

`EventSource` reconnects when a stream ends, which would run the command again. The page calls `close()` on the `exit` event to prevent that.

## Stop a command after a time limit

A disconnect stops only the process that `exec()` started. Processes that the command starts, such as the commands in an `sh -c` script, keep the output streams open until they exit. To stop a command and every process it starts after a time limit, run it under GNU coreutils `timeout`:

```ts
const build = ["timeout", "--kill-after=5", "60", "sh", "-c", "npm test"];
```

The command exits with code `124` when it runs longer than 60 seconds. For more information, refer to [Stop the processes a command starts](https://developers.cloudflare.com/containers/guides/execute-commands/#stop-the-processes-a-command-starts).

## Related resources

- [Execute commands](https://developers.cloudflare.com/containers/guides/execute-commands/): combine standard error with standard output, send standard input, and handle exit codes.
- [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/): commands that outlive the request.
- [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/commands/stream-command-output/#page","headline":"Stream command output","description":"Send stdout and stderr from a command in a Linux sandbox to a browser as server-sent events while the command runs.","url":"https://developers.cloudflare.com/sandbox/commands/stream-command-output/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/commands/stream-command-output/og.png?v=fe20e7beac184376","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
