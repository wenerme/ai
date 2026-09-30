---
description: Replace @cloudflare/sandbox 0.12 startProcess(), Process objects, process logs, waits, and kills with Durable Object methods that take a process ID.
title: Move background processes
image: https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/og.png?v=05e666288fe97895
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Move background processes

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In Sandbox SDK 0.12, `startProcess()` returns a `Process` object, and the container keeps a table of processes that later requests query. In 1.0, your Durable Object keeps a directory in the container for each process. Each `Process` method becomes a Durable Object method that takes the process ID.

## Before you start

Your 1.0 class replaces the 0.12 `Sandbox` class, and has the `container` getter, the `ensureRunning()` method, and the `ENV` and `INACTIVITY_TIMEOUT_MS` constants from [Replace the Sandbox class](https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/).

This page replaces `startProcess()`, the `Process` methods, `listProcesses()`, `getProcess()`, `getProcessLogs()`, `streamProcessLogs()`, `killProcess()`, `killAllProcesses()`, `cleanupCompletedProcesses()`, and the process callbacks. It does not cover commands that finish while the request is open. For those, refer to [Change command calls](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/).

## Add the process methods

1. Add the scripts and methods from [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/) to your class, including the alarm handler and `waitForLog()` from [Wait for a log line](https://developers.cloudflare.com/sandbox/commands/run-background-processes/#wait-for-a-log-line).

   A Durable Object has one alarm. If your class already has an `alarm()` handler, such as the one from [Move every sandbox in one deploy](https://developers.cloudflare.com/sandbox/sdk/migrate/plan-the-move/#move-every-sandbox-in-one-deploy), merge the process checks into it rather than adding a second.
2. Change `startProcess()` to start the container with `ensureRunning()`, and to run each process with the working directory and environment that 0.12 gave it:

   *src/index.tsts*



   ```ts
   export class MySandbox extends DurableObject<Env> {
   	// ...

   	async startProcess(id: string, argv: string[]): Promise<boolean> {
   		await this.ensureRunning();

   		// mkdir fails when another process already uses the ID.
   		const dir = `${ROOT}/${id}`;
   		await run(this.container, ["mkdir", "-p", ROOT]);
   		const created = await run(this.container, ["mkdir", dir]);

   		if (created.exitCode !== 0) {
   			return false;
   		}

   		// Ignoring the output lets the process outlive this request.
   		const command = ["sh", "-c", RUN, "sh", dir, ...argv];
   		await this.container.exec(command, {
   			cwd: "/workspace",
   			env: ENV,
   			stdout: "ignore",
   			stderr: "ignore",
   		});

   		await this.ctx.storage.put(`process:${id}`, argv);
   		await this.ctx.storage.setAlarm(Date.now() + 60_000);
   		return true;
   	}
   }
   ```

   0.12 ran each process in `/workspace`, with the variables from `envVars`. `exec()` starts in `/`, even when the image sets `WORKDIR`. It does not inherit the variables that `start()` sets, except `PATH`.
3. In `status()`, replace `10 * 60 * 1000` with `INACTIVITY_TIMEOUT_MS`, so that each check keeps your inactivity timeout.

On this page, `sandbox` is the stub that `getByName()` returns.

## Start processes

0.12 ran each command string in `bash`. To keep a string, run it with `["bash", "-c", command]`:

*src/index.ts (0.12)ts*

```ts
const process = await sandbox.startProcess("npm run dev", {
	processId: "dev",
});
```

*src/index.ts (1.0)ts*

```ts
const started = await sandbox.startProcess("dev", [
	"bash",
	"-c",
	"npm run dev",
]);
```

Each process needs an ID. Where 0.12 generated one, such as `proc_1790379992394_6snsuw`, use `crypto.randomUUID()`. The ID becomes a directory name, so use only characters that are safe in a path.

`startProcess()` returns `false` when a process already uses the ID. 0.12 replaced the record instead, and the first process kept running without one. An ended process keeps its directory, so `startProcess()` also returns `false` for its ID. To start that ID again, delete the directory first, as [Stop processes](#stop-processes) describes.

`python3 -m http.server`, which 0.12 ran as a preview server, exits on startup in a 1.0 container. For the cause and a replacement, refer to [The hostname is longer than a DNS label](https://developers.cloudflare.com/containers/guides/local-dev/#the-hostname-is-longer-than-a-dns-label).

Remove the `timeout` option, which did not stop a background process in 0.12. To limit how long a process runs, start it with the `timeout` command, such as `["timeout", "300", "npm", "test"]`. The command exits with code `124` when the time passes.

For the `sessionId` option, refer to [Replace sessions](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/#replace-sessions).

## Check and list processes

Replace `getProcess()` and `Process.getStatus()` with `status()`, which returns `undefined` for an ID that no process uses. Each 0.12 status maps to a 1.0 state:

| 0.12 status | 1.0 state |
| --- | --- |
| `starting` | `starting` |
| `running` | `running`, with `pid` |
| `completed` | `exited`, with `exitCode` `0` |
| `failed` | `exited`, with another `exitCode` |
| `killed` | `exited`, with `exitCode` `143` after `SIGTERM` or `137` after `SIGKILL` |
| `error` | `startProcess()` throws |
| — | `lost`, when the process ended without recording an exit code |

To replace `listProcesses()`, add a method that lists the process directories:

*src/index.tsts*

```ts
export class MySandbox extends DurableObject<Env> {
	// ...

	async listProcesses(): Promise<{ id: string; status: Status }[]> {
		if (!this.container.running) {
			return [];
		}

		const { stdout } = await run(this.container, ["ls", ROOT]);
		const processes = [];

		for (const id of stdout.split("\n").filter((line) => line !== "")) {
			const status = await this.status(id);

			if (status) {
				processes.push({ id, status });
			}
		}

		return processes;
	}
}
```

The directories stay until you delete them, as ended processes stayed in the 0.12 table. The alarm deletes the `process:` key of an ended process within a minute, so list the directories to find ended processes.

## Read logs

Replace `getProcessLogs()` and `Process.getLogs()` with a `logs()` call for each stream:

*src/index.ts (0.12)ts*

```ts
const { stdout, stderr } = await sandbox.getProcessLogs("dev");
```

*src/index.ts (1.0)ts*

```ts
const stdout = await sandbox.logs("dev", "stdout");
const stderr = await sandbox.logs("dev", "stderr");
```

Replace `streamProcessLogs()` with `follow()`. It returns a `Response` that follows one stream until the process exits, then sends an `exit` event with the exit code.

0.12 sent events without a name, each with a `LogEvent` object in its `data` field. `follow()` names each event `stdout`, `stderr`, or `exit`. The `data` field of an output event holds a JSON-encoded chunk of output, and the `data` field of the `exit` event holds `{ "exitCode": <CODE> }`. Replace `parseSSEStream()` with a listener for each event name, or read the `event` line of each event and `JSON.parse()` its `data` field.

## Wait for output or exit

Replace `Process.waitForLog()` with `waitForLog()`. It returns a state, where 0.12 threw an error:

*src/index.ts (0.12)ts*

```ts
const { line } = await process.waitForLog("ready.", 30_000);
```

*src/index.ts (1.0)ts*

```ts
const result = await sandbox.waitForLog(
	"dev",
	literal("ready."),
	30_000,
);

if (result?.state !== "matched") {
	throw new Error(`The server did not start: ${result?.state}`);
}
```

The state is `timed-out` where 0.12 threw `ProcessReadyTimeoutError`, and `exited` where it threw `ProcessExitedBeforeReadyError`.

The pattern is a `grep -E` extended regular expression. 0.12 matched a string pattern as written, so pass each string pattern through a function that escapes it:

*src/index.tsts*

```ts
// Escapes a 0.12 string pattern, so that it matches as written.
function literal(text: string): string {
	return text.replace(/[\\^$.|?*+()[\]{}]/g, "\\$&");
}
```

Without it, the pattern `[ok]` matches any line that contains `o` or `k`. Pass a 0.12 `RegExp` as its `source`, and replace `\d` with `[0-9]`, which `grep` requires.

To replace `Process.waitForExit()`, add a method that checks the status until the process ends:

*src/index.tsts*

```ts
export class MySandbox extends DurableObject<Env> {
	// ...

	async waitForExit(id: string, timeoutMs: number) {
		const deadline = Date.now() + timeoutMs;
		let status = await this.status(id);

		while (
			(status?.state === "running" || status?.state === "starting") &&
			Date.now() < deadline
		) {
			await scheduler.wait(500);
			status = await this.status(id);
		}

		return status;
	}
}
```

When `timeoutMs` passes first, the method returns the state `running` or `starting`.

Replace `Process.waitForPort()` with requests to the port, as in [Preview a web application](https://developers.cloudflare.com/sandbox/previews/#forward-requests-to-the-server).

## Stop processes

Replace `Process.kill()` and `killProcess()` with `stop()`:

*src/index.ts (0.12)ts*

```ts
await sandbox.killProcess("dev");
```

*src/index.ts (1.0)ts*

```ts
await sandbox.stop("dev");
```

`stop()` sends `SIGTERM` to the process group, which reaches the processes that the command started. 0.12 sent `SIGKILL` 5 seconds later to any process still running, and ignored the `signal` argument. To stop a process that ignores `SIGTERM`, change `TERM` to `KILL` in `stop()`.

Replace `killAllProcesses()` with a `stop()` call for each running process that `listProcesses()` returns. Remove `cleanupCompletedProcesses()` and the `autoCleanup` option, which did nothing in 0.12. To delete the directory of an ended process, run `rm -rf` on it.

## Replace callbacks

The alarm from Run background processes checks each process every minute, and keeps the container running while any process runs. Each 0.12 callback moves to your own code:

| 0.12 | 1.0 |
| --- | --- |
| `onStart` | Your code after `startProcess()` returns `true`. |
| `onOutput` | `follow()`, or `logs()` for the output so far. |
| `onExit` | The `process.ended` branch of the alarm, within a minute of the exit. For the exit at once, call `waitForExit()`. |
| `onError` | A `startProcess()` call that throws or returns `false`. |

## Start processes again after the switch

1.0 does not see processes that 0.12 started. `status()` returns `undefined` for their IDs, and `listProcesses()` leaves them out. The 0.12 process table ends with its container. Start each process that your application needs after the switch, such as in the method that first calls `ensureRunning()`.

## Check the processes

After you deploy the switch, start a process with the ID of a 0.12 process, such as `dev`. `startProcess()` returns `true`, and `status("dev")` reports it:

```json
{ "state": "running", "pid": 142 }
```

`logs("dev", "stdout")` returns the output from `/workspace`, with the variables from `ENV`. After `stop("dev")`, `listProcesses()` returns the exit code:

```json
[{ "id": "dev", "status": { "state": "exited", "exitCode": 143 } }]
```

## Related resources

- [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/)
- [Change command calls](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/)
- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)
- [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/#page","headline":"Move background processes","description":"Replace @cloudflare/sandbox 0.12 startProcess(), Process objects, process logs, waits, and kills with Durable Object methods that take a process ID.","url":"https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/og.png?v=05e666288fe97895","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
