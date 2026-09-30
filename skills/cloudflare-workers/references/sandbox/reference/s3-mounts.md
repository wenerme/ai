---
description: Reference for the S3Mount class in @cloudflare/sandbox, which mounts an S3-compatible bucket or prefix in a running container.
title: S3Mount API
image: https://developers.cloudflare.com/sandbox/reference/s3-mounts/og.png?v=fedc54e102484047
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# S3Mount API

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/reference/s3-mounts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`S3Mount` mounts an S3-compatible bucket, or a prefix in one, at a path in a running container. The container runs `s3fs`, which sends storage requests to `S3Gateway` in your Worker. `S3Gateway` checks each request and signs it with credentials that the container never receives. `S3Mount` does not start or stop the container.

```js
import { S3Mount } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export { S3Gateway } from "@cloudflare/sandbox";

export class MyContainer extends DurableObject {
	mounts;

	constructor(ctx, env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("The container binding is not configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.mounts = new S3Mount(ctx.container, ctx.exports.S3Gateway);
	}

	// The container must already be running.
	async mountModels() {
		await this.mounts.mount({
			mountPath: "/mnt/models",
			source: {
				type: "s3",
				endpoint: `https://${this.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
				region: "auto",
				bucket: "models",
				credentials: {
					type: "static",
					accessKeyId: this.env.R2_ACCESS_KEY_ID,
					secretAccessKey: this.env.R2_SECRET_ACCESS_KEY,
				},
			},
			keyPrefix: "production",
			access: "read-only",
		});
	}
}
```

```ts
import { S3Mount } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export { S3Gateway } from "@cloudflare/sandbox";

export class MyContainer extends DurableObject<Env> {
	private readonly mounts: S3Mount;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("The container binding is not configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.mounts = new S3Mount(ctx.container, ctx.exports.S3Gateway);
	}

	// The container must already be running.
	async mountModels() {
		await this.mounts.mount({
			mountPath: "/mnt/models",
			source: {
				type: "s3",
				endpoint: `https://${this.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
				region: "auto",
				bucket: "models",
				credentials: {
					type: "static",
					accessKeyId: this.env.R2_ACCESS_KEY_ID,
					secretAccessKey: this.env.R2_SECRET_ACCESS_KEY,
				},
			},
			keyPrefix: "production",
			access: "read-only",
		});
	}
}
```

For a complete Worker, refer to [Mount an R2 bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/).

## Requirements

In addition to the [package requirements](https://developers.cloudflare.com/sandbox/reference/#requirements), `S3Mount` has these requirements:

- The container image contains FUSE 3 and `s3fs`. In Debian and Ubuntu images, install the `fuse3` and `s3fs` packages.
- The main module of the Worker re-exports `S3Gateway`, so that `this.ctx.exports.S3Gateway` exists:

  ```ts
  export { S3Gateway } from "@cloudflare/sandbox";
  ```

  Do not route HTTP requests to `S3Gateway`.

## `S3Mount`

```ts
new S3Mount(container: Pick<Container, "exec" | "interceptOutboundHttp">, gateway: S3GatewayBinding)
```

- `container` — the container from `this.ctx.container`.
- `gateway` — `this.ctx.exports.S3Gateway`.

## Methods

### `mount`

```ts
mount(request: S3MountRequest, options?: S3MountOperationOptions): Promise<void>
```

Mounts the source at `request.mountPath`. The result depends on what the path holds:

- Nothing: `mount()` creates the directory and mounts the source.
- A mount with the same settings: `mount()` reuses it.
- Leftover state from a failed or canceled `mount()` with the same settings: `mount()` repairs it.
- Another filesystem, or a mount with different settings: `mount()` throws `SandboxS3MountError` with code `S3_MOUNT_CONFLICT`. To change the settings, call `unmount()` first.

Each new mount adds one outbound intercept target to the container. Reusing a mount does not add one. `unmount()` does not remove one. A container accepts up to [64 intercept targets](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttp), including the targets your own code registers. Once the container reaches the limit, a mount with new settings fails.

If the Durable Object also calls [`interceptAllOutboundHttp()`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptalloutboundhttp), call `mount()` before it, right after you start the container. Otherwise the catch-all receives the storage requests from the container, and `mount()` fails with `cannot verify the new FUSE connection`. A container that registered the catch-all first keeps sending storage requests to it. Restart the container to mount.

`S3Mount` does not retry a failed operation. Call `inspect()` before you retry.

### `inspect`

```ts
inspect(mountPath: string, options?: S3MountOperationOptions): Promise<S3MountInspection>
```

Reports the state of a path without changing it. `inspect()` waits for a `mount()` or `unmount()` in progress on the same path. It then reads the mount state in the container and sends one list request for the prefix through `S3Gateway`.

Reading the mount state can block while the filesystem does not respond. `inspect()` has no timeout. Pass `signal` to set one.

Credentials that can read objects but cannot list the prefix produce a `rejected` upstream status.

### `unmount`

```ts
unmount(mountPath: string, options?: S3MountOperationOptions): Promise<void>
```

Denies further storage requests for the mount, then unmounts the path. On a path with no mount, `unmount()` succeeds without changes. `unmount()` never forces an unmount.

- When a process is using the path, `unmount()` throws `S3_MOUNT_BUSY`. Requests stay denied. Stop the process and call `unmount()` again, or call `mount()` with the same request to restore access.
- After denial, new storage requests for the mount receive HTTP `403`. A request already in progress can complete.
- After denial, a process that still uses the path can read empty files and lose writes without an error. Listing a directory fails.
- A file that a process opened and read before the denial can stay readable through that open file.
- Canceling `unmount()` or `mount()` can leave the filesystem mounted with requests denied. Call `mount()` with the same request, or call `unmount()` again.

## Types

### `S3MountRequest`

- `mountPath` `string` — absolute, normalized path to mount at. Cannot be `/`, and cannot overlap `/proc/self/mountinfo`, `/run/sandbox/s3-mounts`, or `/usr/local/bin/sandbox-shim`.
- `source` `object`:
  - `type` `"s3"` — source kind.
  - `endpoint` `string` — HTTP or HTTPS origin of the S3 API, with no credentials, path, query, or fragment. For R2, use `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.
  - `region` `string` — region used to sign requests. For R2, use `auto`.
  - `bucket` `string` — bucket name. Cannot start with `-` or contain `/` or `:`.
  - `credentials` `object` — static credentials or a credential provider. Refer to [Credentials](#credentials).
- `keyPrefix` `string` optional — object key prefix to mount. The mount shows only keys under the prefix. The prefix cannot start with `/`. `S3Mount` adds a trailing `/`. Omit it to mount the whole bucket.
- `access` `"read-only" | "read-write"` — whether processes in the container can create, change, and delete objects.
- `s3fsOptions` `Readonly<Record<string, string | number | boolean>>` optional — extra `s3fs` options. For the options, refer to the [`s3fs` manual ↗︎](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Fuse-Over-Amazon).
  - A `true` value adds the option as a flag, `false` omits it, and a string or number adds `name=value`.
  - Options that set the endpoint, credentials, access mode, proxy, or filesystem identity throw `TypeError`.
  - `S3Mount` always sets `nomixupload`. Passing `nomixupload` throws `TypeError`.
  - With `nomixupload`, a command that changes part of a large file uploads the whole file in parts of one size, as R2 requires.
  - `S3Mount` sets no cache, retry, or timeout options. The defaults of the `s3fs` version in your image apply.

`S3Mount` does not accept an R2 binding. Use the R2 S3 API endpoint with [R2 API credentials](https://developers.cloudflare.com/r2/api/tokens/).

### Credentials

Static credentials:

- `type` `"static"`
- `accessKeyId` `string`
- `secretAccessKey` `string`
- `sessionToken` `string` optional

Provider credentials:

- `type` `"provider"`
- `fetcher` `Pick<Fetcher, "fetch">` — called for each storage request that `S3Gateway` allows.

`S3Gateway` sends the provider `GET https://credentials.sandbox.internal/` with `Accept: application/json`. The response must be JSON of at most 16 KiB:

```json
{
	"accessKeyId": "<ACCESS_KEY_ID>",
	"secretAccessKey": "<SECRET_ACCESS_KEY>",
	"sessionToken": "<SESSION_TOKEN>",
	"expiresAt": 1790000000000
}
```

`sessionToken` is optional. `expiresAt` is a Unix time in milliseconds and must be in the future. `S3Gateway` does not cache credentials and does not retry a failed provider request.

### `S3MountOperationOptions`

- `signal` `AbortSignal` optional — cancels the operation. The operation throws the abort reason.

### `S3MountInspection`

Every inspection has `mountPath` and `attachment.status`:

| `attachment.status` | Other fields | Meaning |
| --- | --- | --- |
| `absent` | None | No mount at the path |
| `unmanaged` | `attachment.filesystemType` | Another filesystem is mounted at the path |
| `incompatible` | None | The path has state from an unsupported version |
| `stale` | `attachment.configuration`, `gateway` | Mount settings remain, but the filesystem is gone |
| `managed` | `attachment.configuration`, `fuse`, `gateway` | The mount is active |

- `configuration` — the endpoint, region, bucket, key prefix, access mode, and `s3fs` options of the mount.
- `fuse.status` `"connected" | "disconnected" | "indeterminate"`
- `gateway.status` `"unreachable" | "error" | "reachable"`
- `gateway.upstream.status` `"usable" | "unavailable" | "rejected"` — present when `gateway.status` is `reachable`.

## `S3Gateway`

`S3Gateway` is a `WorkerEntrypoint` that handles storage requests from the container. `S3Mount` connects a separate `S3Gateway` to each mount.

- The container receives placeholder credentials, because `s3fs` requires a key pair.
- `S3Gateway` does not forward the `Authorization` header from the container. It signs each allowed request with the credentials of the mount.
- `S3Gateway` allows only the object and list operations that `s3fs` uses, within the bucket and prefix of the mount. Other requests are rejected.
- A read-only mount allows no writes.
- Any process in the container that can reach the mount path can perform every allowed operation on the prefix. Limit the credentials to the bucket and prefix as well.

## Mounted file behavior

A mounted directory maps files to objects in the bucket. It does not behave like a local disk:

- Renaming a file copies the object and deletes the original.
- File locks, hard links, ownership, permissions, and atomic replacement do not work as they do on a local filesystem.
- Directories come from object key prefixes.
- `s3fs` caches file metadata, including the fact that a file does not exist, for 900 seconds by default.
- Until the cache expires, a file that another client adds to the bucket can stay missing in the container.
- Until the cache expires, a file that another client changes can keep its old size, and a read can return the new content cut to that size.
- To shorten the wait, set a lower `stat_cache_expire` in `s3fsOptions`. To stop caching missing files, set `disable_noobj_cache: true`.
- An interrupted write can leave an incomplete upload in the bucket.
- A [snapshot](https://developers.cloudflare.com/containers/api/durable-object-container/#snapshotcontainer) does not include mounted directories.

## Errors

### `SandboxS3MountError`

A mount operation failed.

| Field | Type | Description |
| --- | --- | --- |
| `name` | `"SandboxS3MountError"` | Error name |
| `code` | `SandboxS3MountErrorCode` | Error code |
| `operation` | `S3MountOperation` | Method that failed: `mount`, `inspect`, or `unmount` |
| `path` | `string` | Path passed to the method |
| `detail` | `string` | Error description from the helper |

`code` is one of the following values:

| Code | Meaning |
| --- | --- |
| `S3_MOUNT_CONFLICT` | Another filesystem, or a mount with different settings, owns the path |
| `S3_MOUNT_BUSY` | A process is using the path |
| `S3_MOUNT_FAILED` | `s3fs`, FUSE, or another step of the operation failed |
| `S3_MOUNT_INCOMPATIBLE` | The path has state from an unsupported version |

The package exports the `SandboxS3MountErrorCode` and `S3MountOperation` types, which list these codes and methods.

`SandboxS3MountError` is not a class. Use `SandboxS3MountError.is(error)` instead of `instanceof`. It recognizes errors thrown in the same Worker and errors returned through Durable Object RPC.

### `SandboxProtocolError`

`S3Mount` could not complete its exchange with the helper binary. Refer to [`SandboxProtocolError`](https://developers.cloudflare.com/sandbox/reference/files/#sandboxprotocolerror).

### Other errors

`S3Mount` does not wrap errors from the runtime or from its inputs.

| Condition | Error |
| --- | --- |
| Invalid request or path | `TypeError` |
| The container is not running | `Error` from `exec()` |
| `signal` is aborted | The abort reason |
| An intercept cannot be added | `Error` from `interceptOutboundHttp()` |

## Related resources

- [Mount an R2 bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/)
- [Durable Object Container](https://developers.cloudflare.com/containers/api/durable-object-container/)
- [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/reference/s3-mounts/#page","headline":"S3Mount API","description":"Reference for the S3Mount class in @cloudflare/sandbox, which mounts an S3-compatible bucket or prefix in a running container.","url":"https://developers.cloudflare.com/sandbox/reference/s3-mounts/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/reference/s3-mounts/og.png?v=fedc54e102484047","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
