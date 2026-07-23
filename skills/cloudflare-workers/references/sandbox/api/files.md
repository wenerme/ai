---
description: Read, write, and manage files in the Sandbox SDK filesystem.
title: Files
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Files

Last updated May 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/api/files/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Read, write, and manage files in the sandbox filesystem. All paths are absolute (e.g., `/workspace/app.js`).

## Methods

### `writeFile()`

Write content to a file.

```ts
await sandbox.writeFile(path: string, content: string, options?: WriteFileOptions): Promise<void>
```

**Parameters**:

* `path` \- Absolute path to the file
* `content` \- Content to write
* `options` (optional):
  * `encoding` \- File encoding (`"utf-8"` or `"base64"`, default: `"utf-8"`)

```js
await sandbox.writeFile("/workspace/app.js", `console.log('Hello!');`);

// Binary data
await sandbox.writeFile("/tmp/image.png", base64Data, { encoding: "base64" });
```

```plaintext
await sandbox.writeFile('/workspace/app.js', `console.log('Hello!');`);

// Binary data
await sandbox.writeFile('/tmp/image.png', base64Data, { encoding: 'base64' });
```

Base64 validation

When using `encoding: 'base64'`, content must contain only valid base64 characters (A-Z, a-z, 0-9, +, /, =). Invalid base64 content returns a validation error.

#### Large files and binary data

When using the [rpc transport](https://developers.cloudflare.com/sandbox/configuration/transport/) the `writeFile()` method supports passing a `ReadableStream` as the `content` parameter. This allows binary data and files greater than [32 MiB](https://developers.cloudflare.com/workers/runtime-apis/rpc/#limitations) to be written to the sandbox. It replaces the `"base64"` encoding option.

```js
// Requires SANDBOX_TRANSPORT to be "rpc" in wrangler.jsonc
const req = await fetch("https://example.com/archive.tar.gz");
await sandbox.writeFile('/workspace/archive.tar.gz', req.body);
```

### `readFile()`

Read a file from the sandbox. By default returns the content as a string. This is useful for small text files. For larger files and binary data use `encoding: "none"` to get back a `ReadableStream` with the file data.

```ts
const file = await sandbox.readFile(path: string, options?: ReadFileOptions): Promise<ReadFileResult | ReadFileStreamResult>
```

**Parameters**:

* `path` \- Absolute path to the file
* `options` (optional):
  * `encoding` \- File encoding (`"utf-8"`, `"base64"` or `"none"`, default: auto-detected from MIME type)

**Returns**: `Promise<ReadFileResult | ReadFileStreamResult>`.

Encoding

The `"none"` encoding property was added in 0.10.1 and aims to improve support for streaming binary data. When `encoding: "none"` is provided the `content` field will be a `ReadableStream<Uint8Array>`. It is only supported with the [RPC transport](https://developers.cloudflare.com/sandbox/configuration/transport/).

```js
const file = await sandbox.readFile("/workspace/package.json");
const pkg = JSON.parse(file.content);

// Binary data (since 0.10.1 using `rpc` transport)
const { content, size, mimeType } = await sandbox.readFile(
	"/workspace/archive.tar.gz",
	{
		encoding: "none",
	},
);

// Example 1: Store on R2:
const stream = request.body.pipeThrough(new FixedLengthStream(size));
await env.MY_BUCKET.put("/bucket/archive.tar.gz", stream, {
	httpMetadata: { contentType: mimeType },
});

// Example 2: Stream an HTTP response:
return new Response(content, { headers: { "Content-Type": mimeType } });

// Older versions/transports used the base64 encoding for binary data:
const archive = await sandbox.readFile("/workspace/archive.tar.gz", {
	encoding: "base64",
});
console.log(archive.content); // => "<base64 encoded string>";
```

```plaintext
const file = await sandbox.readFile('/workspace/package.json');
const pkg = JSON.parse(file.content);

// Binary data (since 0.10.1 using `rpc` transport)
const { content, size, mimeType } = await sandbox.readFile("/workspace/archive.tar.gz", {
  encoding: "none"
});

// Example 1: Store on R2:
const stream = request.body.pipeThrough(new FixedLengthStream(size));
await env.MY_BUCKET.put('/bucket/archive.tar.gz', stream, {
  httpMetadata: { contentType: mimeType }
});

// Example 2: Stream an HTTP response:
return new Response(content, { headers: { "Content-Type": mimeType } });

// Older versions/transports used the base64 encoding for binary data:
const archive = await sandbox.readFile("/workspace/archive.tar.gz", {
  encoding: "base64"
});
console.log(archive.content); // => "<base64 encoded string>";
```

Encoding behavior

When `encoding` is specified, it overrides MIME-based auto-detection. Without `encoding`, the SDK detects the appropriate encoding from the file's MIME type.

### `exists()`

Check if a file or directory exists.

```ts
const result = await sandbox.exists(path: string): Promise<FileExistsResult>
```

**Parameters**:

* `path` \- Absolute path to check

**Returns**: `Promise<FileExistsResult>` with `exists` boolean

```js
const result = await sandbox.exists("/workspace/package.json");
if (result.exists) {
	const file = await sandbox.readFile("/workspace/package.json");
	// process file
}

// Check directory
const dirResult = await sandbox.exists("/workspace/src");
if (!dirResult.exists) {
	await sandbox.mkdir("/workspace/src");
}
```

```plaintext
const result = await sandbox.exists('/workspace/package.json');
if (result.exists) {
  const file = await sandbox.readFile('/workspace/package.json');
  // process file
}

// Check directory
const dirResult = await sandbox.exists('/workspace/src');
if (!dirResult.exists) {
  await sandbox.mkdir('/workspace/src');
}
```

Available on sessions

Both `sandbox.exists()` and `session.exists()` are supported.

### `mkdir()`

Create a directory.

```ts
await sandbox.mkdir(path: string, options?: MkdirOptions): Promise<void>
```

**Parameters**:

* `path` \- Absolute path to the directory
* `options` (optional):
  * `recursive` \- Create parent directories if needed (default: `false`)

```js
await sandbox.mkdir("/workspace/src");

// Nested directories
await sandbox.mkdir("/workspace/src/components/ui", { recursive: true });
```

```plaintext
await sandbox.mkdir('/workspace/src');

// Nested directories
await sandbox.mkdir('/workspace/src/components/ui', { recursive: true });
```

### `deleteFile()`

Delete a file.

```ts
await sandbox.deleteFile(path: string): Promise<void>
```

**Parameters**:

* `path` \- Absolute path to the file

```js
await sandbox.deleteFile("/workspace/temp.txt");
```

```plaintext
await sandbox.deleteFile('/workspace/temp.txt');
```

### `renameFile()`

Rename a file.

```ts
await sandbox.renameFile(oldPath: string, newPath: string): Promise<void>
```

**Parameters**:

* `oldPath` \- Current file path
* `newPath` \- New file path

```js
await sandbox.renameFile("/workspace/draft.txt", "/workspace/final.txt");
```

```plaintext
await sandbox.renameFile('/workspace/draft.txt', '/workspace/final.txt');
```

### `moveFile()`

Move a file to a different directory.

```ts
await sandbox.moveFile(sourcePath: string, destinationPath: string): Promise<void>
```

**Parameters**:

* `sourcePath` \- Current file path
* `destinationPath` \- Destination path

```js
await sandbox.moveFile("/tmp/download.txt", "/workspace/data.txt");
```

```plaintext
await sandbox.moveFile('/tmp/download.txt', '/workspace/data.txt');
```

### `gitCheckout()`

Clone a git repository.

```ts
await sandbox.gitCheckout(repoUrl: string, options?: GitCheckoutOptions): Promise<void>
```

**Parameters**:

* `repoUrl` \- Git repository URL
* `options` (optional):
  * `branch` \- Branch to checkout (default: repository default branch)
  * `targetDir` \- Directory to clone into (default: `/workspace/{repoName}`)
  * `depth` \- Clone depth for shallow clones (e.g., `1` for latest commit only)

```js
await sandbox.gitCheckout("https://github.com/user/repo");

// Specific branch
await sandbox.gitCheckout("https://github.com/user/repo", {
	branch: "develop",
	targetDir: "/workspace/my-project",
});

// Shallow clone (faster for large repositories)
await sandbox.gitCheckout("https://github.com/facebook/react", {
	depth: 1,
});
```

```plaintext
await sandbox.gitCheckout('https://github.com/user/repo');

// Specific branch
await sandbox.gitCheckout('https://github.com/user/repo', {
  branch: 'develop',
  targetDir: '/workspace/my-project'
});

// Shallow clone (faster for large repositories)
await sandbox.gitCheckout('https://github.com/facebook/react', {
  depth: 1
});
```

## Related resources

* [Manage files guide](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Detailed guide with best practices
* [Commands API](https://developers.cloudflare.com/sandbox/api/commands/) \- Execute commands

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/files/#page","headline":"Files · Cloudflare Sandbox SDK docs","description":"Read, write, and manage files in the Sandbox SDK filesystem.","url":"https://developers.cloudflare.com/sandbox/api/files/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
