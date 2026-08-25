---
description: Monitor sandbox filesystem changes in real-time using the Sandbox SDK watch API.
title: File watching
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# File watching

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/api/file-watching/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Coming soon: Sandbox SDK 1.0

This page documents file watching on today's stable `@cloudflare/sandbox` package, including `sessionId` and session helpers.

On the **1.0 preview** (`@next`), `watch` remains available without sessions. Refer to [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) for the sessionless execution model.

Monitor filesystem changes in real-time using Linux's native inotify system. The `watch()` method returns a Server-Sent Events (SSE) stream of file change events that you consume with `parseSSEStream()`.

## Methods

### `watch()`

Watch a directory for filesystem changes. Returns an SSE stream of events.

```ts
const stream = await sandbox.watch(path: string, options?: WatchOptions): Promise<ReadableStream<Uint8Array>>
```

**Parameters**:

* `path` \- Absolute path or relative to `/workspace` (for example, `/app/src` or `src`)
* `options` (optional):
  * `recursive` \- Watch subdirectories recursively (default: `true`)
  * `include` \- Glob patterns to include (for example, `['*.ts', '*.js']`). Cannot be used together with `exclude`.
  * `exclude` \- Glob patterns to exclude (default: `['.git', 'node_modules', '.DS_Store']`). Cannot be used together with `include`.
  * `sessionId` \- Session to run the watch in (if omittied, will use the default session unless `enableDefaultSession` is set to false)

**Returns**: `Promise<ReadableStream<Uint8Array>>` — an SSE stream of `FileWatchSSEEvent` objects

```js
import { parseSSEStream } from "@cloudflare/sandbox";

const stream = await sandbox.watch("/workspace/src", {
	recursive: true,
	include: ["*.ts", "*.js"],
});

const controller = new AbortController();

for await (const event of parseSSEStream(stream, controller.signal)) {
	switch (event.type) {
		case "watching":
			console.log(`Watch established on ${event.path} (id: ${event.watchId})`);
			break;
		case "event":
			console.log(`${event.eventType}: ${event.path}`);
			break;
		case "error":
			console.error(`Watch error: ${event.error}`);
			break;
		case "stopped":
			console.log(`Watch stopped: ${event.reason}`);
			break;
	}
}

// Cancel the watch by aborting — cleans up the watcher server-side
controller.abort();
```

```ts
import { parseSSEStream } from "@cloudflare/sandbox";
import type { FileWatchSSEEvent } from "@cloudflare/sandbox";

const stream = await sandbox.watch("/workspace/src", {
	recursive: true,
	include: ["*.ts", "*.js"],
});

const controller = new AbortController();

for await (const event of parseSSEStream<FileWatchSSEEvent>(
	stream,
	controller.signal,
)) {
	switch (event.type) {
		case "watching":
			console.log(`Watch established on ${event.path} (id: ${event.watchId})`);
			break;
		case "event":
			console.log(`${event.eventType}: ${event.path}`);
			break;
		case "error":
			console.error(`Watch error: ${event.error}`);
			break;
		case "stopped":
			console.log(`Watch stopped: ${event.reason}`);
			break;
	}
}

// Cancel the watch by aborting — cleans up the watcher server-side
controller.abort();
```

Note

The `watch()` method is also available on sessions. When called on a session, the `sessionId` is set automatically:

```ts
const session = await sandbox.createSession();
const stream = await session.watch("/workspace/src", {
	include: ["*.ts"],
});
```

## Types

### `FileWatchSSEEvent`

Union type of all SSE events emitted by the watch stream.

```ts
type FileWatchSSEEvent =
	| { type: "watching"; path: string; watchId: string }
	| {
			type: "event";
			eventType: FileWatchEventType;
			path: string;
			isDirectory: boolean;
			timestamp: string;
	  }
	| { type: "error"; error: string }
	| { type: "stopped"; reason: string };
```

* **`watching`** — Emitted once when the watch is established. Contains the `watchId` and the `path` being watched.
* **`event`** — Emitted for each filesystem change. Contains the `eventType`, the `path` that changed, and whether it `isDirectory`.
* **`error`** — Emitted when the watch encounters an error.
* **`stopped`** — Emitted when the watch is stopped, with a `reason`.

### `FileWatchEventType`

Types of filesystem changes that can be detected.

```ts
type FileWatchEventType =
	| "create"
	| "modify"
	| "delete"
	| "move_from"
	| "move_to"
	| "attrib";
```

* **`create`** — File or directory was created
* **`modify`** — File content changed
* **`delete`** — File or directory was deleted
* **`move_from`** — File or directory was moved away (source of a rename/move)
* **`move_to`** — File or directory was moved here (destination of a rename/move)
* **`attrib`** — File or directory attributes changed (permissions, timestamps)

### `WatchOptions`

Configuration options for watching directories.

```ts
interface WatchOptions {
	/** Watch subdirectories recursively (default: true) */
	recursive?: boolean;
	/** Glob patterns to include. Cannot be used together with `exclude`. */
	include?: string[];
	/** Glob patterns to exclude. Cannot be used together with `include`. Default: ['.git', 'node_modules', '.DS_Store'] */
	exclude?: string[];
	/** Session to run the watch in. If omitted, the sandbox's implicit execution mode is used. */
	sessionId?: string;
}
```

Mutual exclusivity

`include` and `exclude` cannot be used together. Use `include` to allowlist patterns, or `exclude` to blocklist patterns. Requests that specify both are rejected with a validation error.

### `parseSSEStream()`

Converts a `ReadableStream<Uint8Array>` into a typed `AsyncGenerator` of events. Accepts an optional `AbortSignal` to cancel the stream.

```ts
function parseSSEStream<T>(
	stream: ReadableStream<Uint8Array>,
	signal?: AbortSignal,
): AsyncGenerator<T>;
```

**Parameters**:

* `stream` — The SSE stream returned by `watch()`
* `signal` (optional) — An `AbortSignal` to cancel the stream. When aborted, the reader is cancelled which propagates cleanup to the server.

Aborting the signal is the recommended way to stop a watch from outside the consuming loop:

```ts
const controller = new AbortController();

// Cancel after 60 seconds
setTimeout(() => controller.abort(), 60_000);

for await (const event of parseSSEStream<FileWatchSSEEvent>(
	stream,
	controller.signal,
)) {
	// process events
}
```

## Glob pattern support

The `include` and `exclude` options accept a limited set of glob tokens for predictable matching:

| Token | Meaning                                    | Example                |
| ----- | ------------------------------------------ | ---------------------- |
| \*    | Match any characters within a path segment | \*.ts matches index.ts |
| \*\*  | Match across directory boundaries          | \*\*/\*.test.ts        |
| ?     | Match a single character                   | ?.js matches a.js      |

Character classes (`[abc]`), brace expansion (`{a,b}`), and backslash escapes are not supported. Patterns containing these tokens are rejected with a validation error.

## Notes

Deterministic readiness

`watch()` blocks until the filesystem watcher is established on the server. When the promise resolves, the watcher is active and you can immediately perform filesystem actions that depend on the watch being in place.

Container lifecycle

File watchers are automatically stopped when the sandbox container sleeps or is destroyed. You do not need to manually cancel the stream on container shutdown.

Path requirements

All paths must exist when starting a watch. Watching non-existent paths returns an error. Create directories before watching them. All paths must resolve to within `/workspace`.

## Related resources

* [Watch filesystem changes guide](https://developers.cloudflare.com/sandbox/guides/file-watching/) — Patterns, best practices, and real-world examples
* [Manage files guide](https://developers.cloudflare.com/sandbox/guides/manage-files/) — File operations

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/file-watching/#page","headline":"File watching · Cloudflare Sandbox SDK docs","description":"Monitor sandbox filesystem changes in real-time using the Sandbox SDK watch API.","url":"https://developers.cloudflare.com/sandbox/api/file-watching/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
