---
description: Retry and recover from Sandbox SDK 1.0 preview failures when containers start, stop, or interrupt work.
title: Errors and recovery
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors and recovery

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/errors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page documents error handling on `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0\. Class names, codes, and context fields: [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/).

Some failures mean the container never started your work. Others mean the work may already have started. Those cases need different recovery.

The same **sandbox ID** can later use a **new container**. Processes, terminals, and local files from the previous container do not return on their own. Refer to [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/) and [How long a process lives](https://developers.cloudflare.com/sandbox/1-0-preview/processes/#how-long-a-process-lives).

Class catalog: [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/). Symptom table: [Troubleshooting](https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/).

## Before the container starts the work

If the container is not ready, the SDK may throw `ContainerUnavailableError` (`CONTAINER_UNAVAILABLE`). The operation did not run inside the container.

That often happens on cold start, after idle stop, or during a deploy.

The error context includes `retryable: true`, a `reason` (for example `container_starting`), and optional `retryAfterMs`. Back off (use `retryAfterMs` when present), then try the same kind of work again.

Do not use that same “always retry” rule for failures that occur after the container may already have started the work.

```js
import { ContainerUnavailableError } from "@cloudflare/sandbox";

try {
	const process = await sandbox.exec(["npm", "install"], {
		cwd: "/workspace/app",
	});
	await process.waitForExit();
} catch (error) {
	if (error instanceof ContainerUnavailableError) {
		// Safe to retry the whole operation after backoff.
	}
}
```

```ts
import { ContainerUnavailableError } from "@cloudflare/sandbox";

try {
	const process = await sandbox.exec(["npm", "install"], {
		cwd: "/workspace/app",
	});
	await process.waitForExit();
} catch (error) {
	if (error instanceof ContainerUnavailableError) {
		// Safe to retry the whole operation after backoff.
	}
}
```

## After the container may have started the work

Once the container has accepted an operation, a failure can leave partial results: a process may be running, a file may exist, a backup may have begun.

### Container replaced or sandbox ended during a call

`OperationInterruptedError` means the container or sandbox changed while the call was already underway. The work may have started.

Use `reason` and `retryable` on the error (refer to [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/) for fields). If the steps change state, check the sandbox or your own records before running the same steps again.

### SDK lost contact during a call

`RPCTransportError` means the SDK lost contact with the current container during a call. A later call can succeed against the container again.

That does **not** mean the interrupted call did nothing. Prefer checkpoints and steps that are safe to run twice, or inspect state, before repeating the same work. Diagnostic `kind` values are listed on the [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/).

### Stale process or terminal handles

Process and terminal IDs belong to the **current** container for a sandbox ID. After stop or replace, calls on an old handle throw `StaleProcessHandleError` or `StaleTerminalHandleError`. `getProcess`, `getTerminal`, `listProcesses`, and `listTerminals` do not start a container. They return `null` or `[]` when no container is running, or when the ID is unknown in the current container. That is not an exception.

Store the job (command, `cwd`, `env`, checkpoint), not only the resource ID. Then start a new `exec` or `createTerminal` when the old handle is gone.

### Local waits and aborts

Timeouts and `AbortSignal` on `output()`, `waitForExit()`, `waitForLog()`, `waitForPort()`, and `logs()` end **that wait or stream only**. They do not kill the process. Canceling terminal output does not terminate the PTY.

Use `process.kill()` or `terminal.interrupt()` / `terminal.terminate()` when you intend to stop the resource. Typical errors: `ProcessWaitTimeoutError`, `ProcessAbortedError`.

### Invalid arguments

Invalid `cwd` or environment variables, a missing executable, or similar request problems fail until you change those values. Do not retry the same invalid request. Typical classes: `InvalidProcessCwdError`, `InvalidProcessEnvironmentError`, `ProcessSpawnFailedError`.

### Worker and container image mismatch

Some failures mean the Worker package and container image do not match, the image cannot start, or setup between Worker and container failed.

| Signal                                                                                                | Response                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| RuntimeControlProtocolError (for example unsupported-protocol-version, missing or malformed metadata) | Deploy the Worker package and container image from the same @cloudflare/sandbox@next line. Do not mix preview and stable packages. |
| Wrong or missing image, or the container exits before it is ready                                     | Fix wrangler, the image, or the entrypoint. Retrying the same application call will not help.                                      |
| Account or location capacity limits                                                                   | Lower concurrency or raise limits. Refer to [Platform limits](https://developers.cloudflare.com/sandbox/platform/limits/).         |

Catalog detail: [Worker and container image mismatch](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/#worker-and-container-image-mismatch).

These are not the same as a slow start (`ContainerUnavailableError`). Do not use the same backoff-and-retry loop for both.

## Common recovery paths

### First use or wake after idle

**Error:** `ContainerUnavailableError`

Back off, then run the full unit of work again (for example setup plus `exec`), not an arbitrary middle step without a checkpoint.

### Long job across Worker requests

1. Persist the job and checkpoint (and a process or terminal ID while it is useful).
2. On a later request, call `getProcess` or `getTerminal` if you still have an ID.
3. If you get a handle, continue (logs, connect, wait).
4. If you get `null` or a stale-handle error, start again from the checkpoint.
5. If you get `ContainerUnavailableError`, backoff and continue with a new operation.

### Deploy or replace while a call is in flight

**Error:** `OperationInterruptedError`

Read `reason` and `retryable`. If the call may have changed something, inspect before repeating it.

### Lost contact during a call

**Error:** `RPCTransportError`

Log `kind` if you need diagnostics. Assume in-flight work may have run. Continue from checkpoints or inspection, then start a new operation if the job still needs it.

### You only stopped waiting

**Errors:** `ProcessWaitTimeoutError`, `ProcessAbortedError`

Either keep observing (`getProcess` and `logs({ since })`) or stop the process with `kill`. Do not assume the process exited because the wait ended.

### Invalid arguments

**Errors:** `InvalidProcessCwdError`, `InvalidProcessEnvironmentError`, `ProcessSpawnFailedError`, and similar

Correct the path, environment, or command (or the files in the image if the binary is missing). Do not retry unchanged values.

### Worker and container image mismatch

**Situation:** After a deploy, calls fail with protocol or setup errors, or the container never becomes usable.

**Errors / signals:** `RuntimeControlProtocolError`; wrong image; container exits before it is ready

**Do:** Redeploy the Worker package and container image from the same `@cloudflare/sandbox@next` line. Confirm the image name and entrypoint.

**Do not:** Treat this like a slow container start and only back off.

## Example

```js
import {
	ContainerUnavailableError,
	OperationInterruptedError,
	RPCTransportError,
	StaleProcessHandleError,
	ProcessWaitTimeoutError,
	ProcessAbortedError,
} from "@cloudflare/sandbox";

try {
	const process = await sandbox.exec(["npm", "test"], {
		cwd: "/workspace/app",
	});
	const result = await process.output({ encoding: "utf8" });
	console.log(result.exitCode, result.stdout);
} catch (error) {
	if (error instanceof ContainerUnavailableError) {
		// Container never started the work — back off, then try the work again.
	} else if (error instanceof StaleProcessHandleError) {
		// Previous container — start again from what you stored about the work.
	} else if (error instanceof OperationInterruptedError) {
		// Work may have started — read reason/retryable and check state before repeating.
	} else if (error instanceof RPCTransportError) {
		// Lost contact during the call — a later call may work; this call may already have run.
	} else if (
		error instanceof ProcessWaitTimeoutError ||
		error instanceof ProcessAbortedError
	) {
		// Wait ended only — process may still be running.
	} else {
		throw error;
	}
}
```

```ts
import {
	ContainerUnavailableError,
	OperationInterruptedError,
	RPCTransportError,
	StaleProcessHandleError,
	ProcessWaitTimeoutError,
	ProcessAbortedError,
} from "@cloudflare/sandbox";

try {
	const process = await sandbox.exec(["npm", "test"], {
		cwd: "/workspace/app",
	});
	const result = await process.output({ encoding: "utf8" });
	console.log(result.exitCode, result.stdout);
} catch (error) {
	if (error instanceof ContainerUnavailableError) {
		// Container never started the work — back off, then try the work again.
	} else if (error instanceof StaleProcessHandleError) {
		// Previous container — start again from what you stored about the work.
	} else if (error instanceof OperationInterruptedError) {
		// Work may have started — read reason/retryable and check state before repeating.
	} else if (error instanceof RPCTransportError) {
		// Lost contact during the call — a later call may work; this call may already have run.
	} else if (
		error instanceof ProcessWaitTimeoutError ||
		error instanceof ProcessAbortedError
	) {
		// Wait ended only — process may still be running.
	} else {
		throw error;
	}
}
```

Prefer `instanceof` with classes from `@cloudflare/sandbox`. Full tables: [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/).

## Related

* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/)
* [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/)
* [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/)
* [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)
* [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/) · [Terminals API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/errors/#page","headline":"Errors and recovery · Cloudflare Sandbox SDK docs","description":"Retry and recover from Sandbox SDK 1.0 preview failures when containers start, stop, or interrupt work.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
