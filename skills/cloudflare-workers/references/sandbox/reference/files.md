---
description: Reference for the Files class in @cloudflare/sandbox, which reads and writes files in a running container.
title: Files API
image: https://developers.cloudflare.com/sandbox/reference/files/og.png?v=41b41c52787424c4
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Files API

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/reference/files/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`Files` reads and changes files and directories in a running container. It does not start or stop the container.

Each method runs the `sandbox-shim` helper binary in the container through [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec) and waits for it to finish. Paths follow Linux rules, and `Files` does not restrict which paths a caller can open.

```js
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	files;

	constructor(ctx, env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("The container binding is not configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.files = new Files(ctx.container);
	}

	// The container must already be running.
	async readInput() {
		await this.files.mkdir("/workspace", { recursive: true });
		await this.files.writeFile("/workspace/input.txt", "hello\n");
		return this.files.readFile("/workspace/input.txt");
	}
}
```

```ts
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject<Env> {
	private readonly files: Files;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("The container binding is not configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.files = new Files(ctx.container);
	}

	// The container must already be running.
	async readInput(): Promise<Response> {
		await this.files.mkdir("/workspace", { recursive: true });
		await this.files.writeFile("/workspace/input.txt", "hello\n");
		return this.files.readFile("/workspace/input.txt");
	}
}
```

For a complete Worker, refer to [Move files in and out of a sandbox](https://developers.cloudflare.com/sandbox/files/manage-files/).

## Requirements

Before you use `Files`, meet the [package requirements](https://developers.cloudflare.com/sandbox/reference/#requirements): the helper binary in the image, the `nodejs_compat` flag, and a running container. `Files` has no other requirements.

## `Files`

```ts
new Files(container: Pick<Container, "exec">)
```

- `container` — the container from `this.ctx.container`, or any object with a compatible `exec()` method.

## Paths

- A path is absolute, or relative to the `cwd` option.
- A relative path requires `cwd`. `cwd` must be absolute.
- A path cannot be empty or contain a null character.
- An invalid path or `cwd` throws `TypeError` before the helper process starts.
- A relative path is joined onto `cwd`, and Linux resolves the joined path. An absolute path ignores `cwd`. A `cwd` that does not exist rejects with `SandboxFileError` `ENOENT`. So does a missing directory anywhere in a path.
- Paths resolve through symbolic links as they do in Linux, except where a method states otherwise.

## Options

Every method accepts `FileOperationOptions`:

```ts
interface FileOperationOptions {
	cwd?: string;
	user?: string;
	signal?: AbortSignal;
}
```

| Option | Type | Description |
| --- | --- | --- |
| `cwd` | `string` | Absolute directory that resolves a relative path. For `rename()`, it resolves both paths. |
| `user` | `string` | Numeric Linux user and group IDs as `uid:gid`, such as `"1000:1000"`. Passed to `exec()`. When omitted, the helper runs as the image user. A user ID alone, or a user or group name, throws `TypeError`. |
| `signal` | `AbortSignal` | Cancels the operation and kills its helper process. A signal that fires after the operation finishes has no effect, including an `AbortSignal.timeout()` that outlives the call. The call rejects with the abort reason: `AbortError` from `abort()` without a reason, or `TimeoutError` from `AbortSignal.timeout()`. Cancellation can leave the partial effects that each method lists. |

`mkdir()` also accepts `recursive`. `remove()` also accepts `recursive` and `force`. An option a method does not accept, or an option of the wrong type, throws `TypeError` before the helper process starts. Of these options, only `user` and `signal` reach `exec()`.

## Methods

### `readFile`

```ts
readFile(path: string, options?: FileOperationOptions): Promise<Response>
```

Reads the contents of a file as bytes.

- Returns a `Response` with status `200` and no `Content-Type` header. The body applies backpressure to the helper process.
- Rejects with `SandboxFileError` when the file cannot be opened, such as `ENOENT` for a missing file or `EISDIR` for a directory.
- An error after the file opens errors the response body instead of rejecting the call.

Read the `Response` like any HTTP response. `text()`, `json()`, `arrayBuffer()`, and `blob()` load the whole file into memory. For a large file or a file of unknown size, stream `body` instead.

### `writeFile`

```ts
writeFile(
	path: string,
	content:
		| string
		| ArrayBuffer
		| ArrayBufferView
		| Blob
		| ReadableStream<Uint8Array>,
	options?: FileOperationOptions,
): Promise<void>
```

Creates a file, or truncates an existing file, then streams `content` into it.

- `content` is a [`FileContent`](#filecontent) value, such as a `string`, a `Uint8Array`, or a `ReadableStream<Uint8Array>`.
- The parent directory must exist. A missing parent rejects with `ENOENT`. A directory at `path` rejects with `EISDIR`.
- The file opens before a `ReadableStream` is consumed. A later failure can leave the file created, truncated, or partially written.
- If the `content` stream errors, the call rejects with the error from the stream instead of a `SandboxFileError`.

`rename()` replaces an existing destination in one step. To keep other processes from reading a partially written file, write the file to a temporary path and then rename it:

```ts
await files.writeFile(`${path}.partial`, content, { cwd });
await files.rename(`${path}.partial`, path, { cwd });
```

### `stat`

```ts
stat(path: string, options?: FileOperationOptions): Promise<SandboxFileStat>
```

Returns [`SandboxFileStat`](#sandboxfilestat) metadata for a path. Follows a symbolic link at the end of the path.

### `lstat`

```ts
lstat(path: string, options?: FileOperationOptions): Promise<SandboxFileStat>
```

Returns [`SandboxFileStat`](#sandboxfilestat) metadata for a path without following a symbolic link at the end of the path. For a symbolic link, `type` is `"symlink"` and `size` is the length of the link target.

### `readDirectory`

```ts
readDirectory(
	path: string,
	options?: FileOperationOptions,
): Promise<SandboxDirectoryEntry[]>
```

Returns the immediate entries of a directory as [`SandboxDirectoryEntry`](#sandboxdirectoryentry) values.

- The list is not sorted. The filesystem decides the order. The list does not include `.` or `..`.
- `path` can be a symbolic link to a directory. The method follows no other symbolic link.
- The method does not recurse or return metadata for each entry.
- A file at `path` rejects with `ENOTDIR`.
- An entry name that is not valid UTF-8 rejects the whole call with `EILSEQ`.

To list a directory tree, walk it with `readDirectory()`. This walk does not follow symbolic links to directories:

```ts
import type { Files } from "@cloudflare/sandbox";

async function* walk(files: Files, directory: string): AsyncGenerator<string> {
	for (const entry of await files.readDirectory(directory)) {
		const path = `${directory}/${entry.name}`;
		yield path;

		if (entry.type === "directory") {
			yield* walk(files, path);
		}
	}
}
```

Each call to `readDirectory()` starts one process in the container. For a large tree, one `container.exec(["find", directory])` call is faster. To cancel it, pass `signal` to `exec()`.

### `mkdir`

```ts
mkdir(path: string, options?: MkdirOptions): Promise<void>

type MkdirOptions = FileOperationOptions & {
	recursive?: boolean;
};
```

Creates a directory.

- With `recursive: true`, the method creates missing parent directories. Without it, a missing parent rejects with `ENOENT`. `recursive` defaults to `false`.
- An existing file at `path` rejects with `EEXIST`. An existing directory at `path` also rejects with `EEXIST`, unless `recursive` is `true`.
- A file in place of a parent directory rejects with `ENOTDIR`.
- A failed recursive call can leave the parents it created.

### `rename`

```ts
rename(
	source: string,
	destination: string,
	options?: FileOperationOptions,
): Promise<void>
```

Renames a file, directory, or symbolic link with Linux `rename` rules.

- An existing file at `destination` is replaced.
- Renaming a directory onto a non-empty directory rejects with `ENOTEMPTY`.
- Renaming across filesystems rejects with `EXDEV`.
- The method does not fall back to copying and deleting.
- `SandboxFileError` from this method sets both `path` and `destination`.

### `remove`

```ts
remove(path: string, options?: RemoveOptions): Promise<void>

type RemoveOptions = FileOperationOptions & {
	recursive?: boolean;
	force?: boolean;
};
```

Removes a file or symbolic link. A symbolic link is removed, not its target.

- A directory requires `recursive: true`. Without it, a directory rejects with `EISDIR`, even when `force` is `true`.
- With `recursive: true`, the method removes the directory tree without following symbolic links inside it.
- With `force: true`, a missing target resolves instead of rejecting with `ENOENT`.
- A failed recursive call can leave part of the tree.

## Types

### `FileContent`

```ts
type FileContent =
	string | ArrayBuffer | ArrayBufferView | Blob | ReadableStream<Uint8Array>;
```

A string is written as UTF-8.

### `SandboxFileStat`

| Field | Type | Description |
| --- | --- | --- |
| `type` | `SandboxFileType` | File type |
| `size` | `bigint` | Size in bytes |
| `mode` | `number` | Linux mode, including the file type bits. A regular file with permissions `644` has mode `0o100644`. |
| `uid` | `number` | Owner user ID |
| `gid` | `number` | Owner group ID |
| `accessedAt` | `Date` | Last access time |
| `modifiedAt` | `Date` | Last content modification time |
| `changedAt` | `Date` | Last metadata change time |

`JSON.stringify()` and `Response.json()` throw `TypeError` for a `bigint`. Convert `size` with `Number()` or `String()` before serializing a `SandboxFileStat`. `bigint` and `Date` values pass through Durable Object RPC unchanged.

### `SandboxDirectoryEntry`

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Entry name |
| `type` | `SandboxFileType` | Entry type. A symbolic link has type `"symlink"`. |

### `SandboxFileType`

```ts
type SandboxFileType =
	| "file"
	| "directory"
	| "symlink"
	| "blockDevice"
	| "characterDevice"
	| "fifo"
	| "socket";
```

## Errors

### `SandboxFileError`

Linux rejected a file operation.

| Field | Type | Description |
| --- | --- | --- |
| `name` | `"SandboxFileError"` | Error name |
| `code` | `string` | Linux error name, such as `ENOENT`. `UNKNOWN` when the runtime has no name for the error. |
| `operation` | `string` | Method that failed: `readFile`, `writeFile`, `stat`, `lstat`, `readDirectory`, `mkdir`, `rename`, or `remove` |
| `path` | `string` | Path passed to the method. For `rename()`, the source path. |
| `destination` | `string` | Destination path. Set only by `rename()`. `undefined` for every other method. |
| `detail` | `string` | Error description from the helper |

The `message` has the form `<operation> '<path>': <detail>`, for example `readFile 'notes.txt': No such file or directory (os error 2)`.

`SandboxFileError` is not a class. Use `SandboxFileError.is(error)` instead of `instanceof`. It recognizes errors thrown in the same Worker and errors returned through Durable Object RPC.

### `SandboxProtocolError`

`Files` could not complete its exchange with the helper binary. A `cloudflare/sandbox` image tag that does not match the installed package version can cause this error.

| Field | Type | Description |
| --- | --- | --- |
| `name` | `"SandboxProtocolError"` | Error name |
| `code` | `"SANDBOX_PROTOCOL_ERROR"` | Error code |
| `detail` | `string` | Error description |

Use `SandboxProtocolError.is(error)` to recognize the error.

### Other errors

`Files` does not wrap errors from the runtime or from its inputs.

| Condition | Error |
| --- | --- |
| Invalid path, `cwd`, or other option | `TypeError` |
| The container is not running | `Error` from `exec()` |
| The image does not contain the helper binary | `Error` from `exec()` that names `/usr/local/bin/sandbox-shim` |
| `signal` is aborted | The abort reason |
| The `content` stream of `writeFile()` errors | The error from the stream |

## Related resources

- [Move files in and out of a sandbox](https://developers.cloudflare.com/sandbox/files/manage-files/)
- [Durable Object Container](https://developers.cloudflare.com/containers/api/durable-object-container/)
- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/reference/files/#page","headline":"Files API","description":"Reference for the Files class in @cloudflare/sandbox, which reads and writes files in a running container.","url":"https://developers.cloudflare.com/sandbox/reference/files/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/reference/files/og.png?v=41b41c52787424c4","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
