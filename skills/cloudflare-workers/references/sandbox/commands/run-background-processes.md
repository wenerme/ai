---
description: Start a background process in a Linux sandbox, then check it, read its output, and stop it from later requests.
title: Run background processes
image: https://developers.cloudflare.com/sandbox/commands/run-background-processes/og.png?v=e231bc0f3fb59dce
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run background processes

Last updated Oct 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/commands/run-background-processes/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Start a process that keeps running after the request ends, such as a build, a test suite, or an agent task. The process object that `exec()` returns belongs to the request that started it, so later requests manage the process through files in the sandbox. The process writes its process ID, output, and exit code to those files.

For a process that runs until the container stops, such as a development server or a tunnel, refer to [Run a server in the background](https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/).

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

## Run a process in the background

1. Add shell scripts that run a process and report its state:

   *src/index.jsjs*



   ```js
   const ROOT = "/var/lib/processes";
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   // Runs the command in its own process group. Records its process ID when
   // it starts and its exit code when it ends.
   const RUN = `dir=$1; shift
   setsid sh -c 'echo "$$ $(cat /proc/sys/kernel/random/boot_id)" >"$0/pid"; exec "$@"' \\
   	"$dir" "$@" >"$dir/stdout.log" 2>"$dir/stderr.log"
   echo "$?" >"$dir/exit-code.tmp" && mv "$dir/exit-code.tmp" "$dir/exit-code"`;

   // Defines current(), which reads the process ID in a directory into $pid
   // when the process started in this instance.
   const CURRENT = `current() {
   	read -r pid boot 2>/dev/null <"$1/pid" &&
   		[ "$boot" = "$(cat /proc/sys/kernel/random/boot_id)" ]
   }`;

   // Prints the state of the process that owns the directory.
   const STATUS = `${CURRENT}
   dir=$1
   if [ ! -d "$dir" ]; then echo missing
   elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
   elif [ ! -e "$dir/pid" ]; then echo starting
   elif current "$dir" && kill -0 "$pid" 2>/dev/null; then echo "running $pid"
   elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
   else echo lost
   fi`;

   async function run(container, argv) {
   	const process = await container.exec(argv);
   	const output = await process.output();

   	return {
   		exitCode: output.exitCode,
   		stdout: new TextDecoder().decode(output.stdout),
   	};
   }
   ```

   *src/index.tsts*



   ```ts
   const ROOT = "/var/lib/processes";
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   // Runs the command in its own process group. Records its process ID when
   // it starts and its exit code when it ends.
   const RUN = `dir=$1; shift
   setsid sh -c 'echo "$$ $(cat /proc/sys/kernel/random/boot_id)" >"$0/pid"; exec "$@"' \\
   	"$dir" "$@" >"$dir/stdout.log" 2>"$dir/stderr.log"
   echo "$?" >"$dir/exit-code.tmp" && mv "$dir/exit-code.tmp" "$dir/exit-code"`;

   // Defines current(), which reads the process ID in a directory into $pid
   // when the process started in this instance.
   const CURRENT = `current() {
   	read -r pid boot 2>/dev/null <"$1/pid" &&
   		[ "$boot" = "$(cat /proc/sys/kernel/random/boot_id)" ]
   }`;

   // Prints the state of the process that owns the directory.
   const STATUS = `${CURRENT}
   dir=$1
   if [ ! -d "$dir" ]; then echo missing
   elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
   elif [ ! -e "$dir/pid" ]; then echo starting
   elif current "$dir" && kill -0 "$pid" 2>/dev/null; then echo "running $pid"
   elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
   else echo lost
   fi`;

   type Status =
   	| { state: "starting" | "lost" }
   	| { state: "running"; pid: number }
   	| { state: "exited"; exitCode: number };

   async function run(container: Container, argv: string[]) {
   	const process = await container.exec(argv);
   	const output = await process.output();

   	return {
   		exitCode: output.exitCode,
   		stdout: new TextDecoder().decode(output.stdout),
   	};
   }
   ```

   `setsid` starts the command in a new process group. Stopping the group also stops the processes the command starts, such as the `node` process behind `npm run dev`, unless a process moves to its own group. The script writes the exit code to a temporary file and then renames it, so a reader never sees a partial file. Do not start the command with `&` instead: a shell starts background jobs with `SIGINT` ignored.

   Each process keeps its files in its own directory under `/var/lib/processes` on the instance disk. The logs grow until the process ends. When the disk fills, writes from the process fail, so delete old process directories, or send output that you want to keep to a [mounted bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/).
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

   Then add a method that starts a process:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async startProcess(id: string, argv: string[]): Promise<boolean> {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error("No container is configured");
   		}

   		if (!container.running) {
   			container.start({
   				image: "cloudflare/debian-trixie",
   				entrypoint: ["sleep", "infinity"],
   				enableInternet: false,
   			});
   			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}

   		// mkdir fails when another process already uses the ID.
   		const dir = `${ROOT}/${id}`;
   		await run(container, ["mkdir", "-p", ROOT]);
   		const created = await run(container, ["mkdir", dir]);

   		if (created.exitCode !== 0) {
   			return false;
   		}

   		// Ignoring the output lets the process outlive this request.
   		await container.exec(["sh", "-c", RUN, "sh", dir, ...argv], {
   			stdout: "ignore",
   			stderr: "ignore",
   		});

   		// exec() returns before the process records its ID. Wait for it, so
   		// a request that follows the output right away finds it running.
   		for (let i = 0; i < 50; i++) {
   			if ((await this.status(id))?.state !== "starting") break;
   			await scheduler.wait(100);
   		}

   		await this.ctx.storage.put(`process:${id}`, argv);
   		await this.ctx.storage.setAlarm(Date.now() + 60_000);
   		return true;
   	}
   }
   ```

3. Add a method that reports the state of a process:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async status(id: string): Promise<Status | undefined> {
   		const container = this.ctx.container;

   		if (!container?.running) {
   			return undefined;
   		}

   		const { stdout } = await run(container, [
   			"sh",
   			"-c",
   			STATUS,
   			"sh",
   			`${ROOT}/${id}`,
   		]);
   		const [state, value] = stdout.trim().split(" ");

   		if (state === "running") {
   			return { state, pid: Number(value) };
   		}

   		if (state === "exited") {
   			return { state, exitCode: Number(value) };
   		}

   		if (state === "starting" || state === "lost") {
   			return { state };
   		}

   		return undefined;
   	}
   }
   ```

   `kill -0` checks that the process exists without sending it a signal. A process is `lost` when it ended without recording an exit code, for example because something sent `SIGKILL` to the script that records it.

   The process ID file also records the boot ID, which changes in every instance. A [snapshot](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/) restores the file, and a new instance reuses the same process IDs, so a restored process ID can belong to an unrelated process. `current()` ignores a process ID from another instance, so a process that was running when the snapshot was taken is `lost`.
4. Add a method that returns the output of a process so far:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async logs(id: string, stream: "stdout" | "stderr"): Promise<string | undefined> {
   		if (!(await this.status(id))) {
   			return undefined;
   		}

   		const path = `${ROOT}/${id}/${stream}.log`;
   		return (await run(this.ctx.container!, ["cat", path])).stdout;
   	}
   }
   ```

   To stream the output while the process runs, or to wait until it prints a line, refer to [Follow a background process](https://developers.cloudflare.com/sandbox/commands/follow-a-background-process/).
5. Add a method that stops a process:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async stop(id: string): Promise<boolean> {
   		const status = await this.status(id);

   		if (status?.state !== "running") {
   			return false;
   		}

   		// `kill` is a shell built-in. A negative ID signals the process group.
   		const { exitCode } = await run(this.ctx.container!, [
   			"sh",
   			"-c",
   			'kill -s TERM -- "$1"',
   			"sh",
   			`-${status.pid}`,
   		]);
   		return exitCode === 0;
   	}
   }
   ```

   A process stopped by a signal exits with `128` plus the signal number, such as `143` for `SIGTERM`.
6. Add an alarm handler that keeps the sandbox running while any process runs:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async alarm(): Promise<void> {
   		let running = false;

   		for (const [key, argv] of await this.ctx.storage.list<string[]>({
   			prefix: "process:",
   		})) {
   			const id = key.slice("process:".length);
   			const status = await this.status(id);

   			if (status?.state === "running" || status?.state === "starting") {
   				running = true;
   			} else {
   				console.log({ event: "process.ended", id, argv, status });
   				await this.ctx.storage.delete(key);
   			}
   		}

   		if (running) {
   			await this.ctx.storage.setAlarm(Date.now() + 60_000);
   		}
   	}
   }
   ```

   A running process does not keep the container running. The alarm checks every process each minute, and each alarm keeps the container running. A Durable Object that restarted between alarms sets the 10-minute inactivity timeout again in its constructor. The container stops 10 minutes after the alarm finds that the last process has ended. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#activity-keeps-an-instance-running).

   A Durable Object has one alarm. If your class already has an `alarm()` handler, merge the process checks into it, and set the alarm to the earliest time that any check needs. For more information, refer to [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/).

   When a process ends, the alarm writes a `process.ended` log to [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) within a minute. Replace the `console.log()` call with what your application does next, such as sending a notification.
7. Add routes to your Worker that call these methods:

   *src/index.jsjs*



   ```js
   const command = [
   	"sh",
   	"-c",
   	"echo ready; for i in $(seq 1 300); do echo tick $i; sleep 1; done",
   ];

   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match = /^\/processes\/([a-z0-9-]{1,63})(\/logs)?$/.exec(
   			url.pathname,
   		);

   		if (!match) {
   			return new Response("Not found", { status: 404 });
   		}

   		const [, id, logs] = match;
   		const sandbox = env.MY_CONTAINER.getByName("sandbox");

   		if (logs) {
   			const stream =
   				url.searchParams.get("stream") === "stderr" ? "stderr" : "stdout";
   			const output = await sandbox.logs(id, stream);
   			return output === undefined
   				? new Response("Not found", { status: 404 })
   				: new Response(output);
   		}

   		if (request.method === "POST") {
   			return (await sandbox.startProcess(id, command))
   				? new Response(null, { status: 201 })
   				: new Response("The process ID is in use", { status: 409 });
   		}

   		if (request.method === "DELETE") {
   			return (await sandbox.stop(id))
   				? new Response(null, { status: 202 })
   				: new Response("The process is not running", { status: 409 });
   		}

   		const status = await sandbox.status(id);
   		return status
   			? Response.json(status)
   			: new Response("Not found", { status: 404 });
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   const command = [
   	"sh",
   	"-c",
   	"echo ready; for i in $(seq 1 300); do echo tick $i; sleep 1; done",
   ];

   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const match = /^\/processes\/([a-z0-9-]{1,63})(\/logs)?$/.exec(
   			url.pathname,
   		);

   		if (!match) {
   			return new Response("Not found", { status: 404 });
   		}

   		const [, id, logs] = match;
   		const sandbox = env.MY_CONTAINER.getByName("sandbox");

   		if (logs) {
   			const stream =
   				url.searchParams.get("stream") === "stderr" ? "stderr" : "stdout";
   			const output = await sandbox.logs(id, stream);
   			return output === undefined
   				? new Response("Not found", { status: 404 })
   				: new Response(output);
   		}

   		if (request.method === "POST") {
   			return (await sandbox.startProcess(id, command))
   				? new Response(null, { status: 201 })
   				: new Response("The process ID is in use", { status: 409 });
   		}

   		if (request.method === "DELETE") {
   			return (await sandbox.stop(id))
   				? new Response(null, { status: 202 })
   				: new Response("The process is not running", { status: 409 });
   		}

   		const status = await sandbox.status(id);
   		return status
   			? Response.json(status)
   			: new Response("Not found", { status: 404 });
   	},
   } satisfies ExportedHandler<Env>;
   ```

   This example command prints `ready`, then prints a line each second for five minutes. Replace it with your own command. The route accepts only process IDs that are safe in a path, because each ID becomes a directory name.
8. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

9. Start a process named `ticker`, then check it. Replace the example hostname with the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/processes/ticker --request POST
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/processes/ticker
   ```

   The first request responds with `201`, and a second `POST` with the same ID responds with `409`. The status includes the process ID:

   ```json
   { "state": "running", "pid": 354 }
   ```

10. Read the output so far:

    ```sh
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/processes/ticker/logs
    ```

    The request prints the lines so far and ends:

    ```txt
    ready
    tick 1
    tick 2
    tick 3
    ```

    Add `stream=stderr` to the query to read standard error.
11. Stop the process, then check it again:

    ```sh
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/processes/ticker --request DELETE
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/processes/ticker
    ```

    The `DELETE` request responds with `202`. The status shows the exit code:

    ```json
    { "state": "exited", "exitCode": 143 }
    ```

## Related resources

- [Follow a background process](https://developers.cloudflare.com/sandbox/commands/follow-a-background-process/): stream the output of a process while it runs, or wait until it prints a line.
- [Stream command output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/): commands that finish while the request is open.
- [Run a server in the background](https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/): processes that run until the container stops.
- [Preview a web application](https://developers.cloudflare.com/sandbox/previews/): a web server as the main process.
- [Process workspace example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/process-workspace): a deployable Worker that runs processes with the same approach, plus routes that list processes and wait for one to exit. Its scripts do not record the boot ID.
- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)
- [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/commands/run-background-processes/#page","headline":"Run background processes","description":"Start a background process in a Linux sandbox, then check it, read its output, and stop it from later requests.","url":"https://developers.cloudflare.com/sandbox/commands/run-background-processes/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/commands/run-background-processes/og.png?v=e231bc0f3fb59dce","dateModified":"2026-10-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
