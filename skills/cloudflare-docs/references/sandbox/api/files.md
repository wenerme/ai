---
title: Files
description: Read, write, and manage files in the sandbox filesystem. All paths are absolute (e.g., /workspace/app.js).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/api/files.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Files

Read, write, and manage files in the sandbox filesystem. All paths are absolute (e.g., `/workspace/app.js`).

## Methods

### `writeFile()`

Write content to a file.

TypeScript

```

await sandbox.writeFile(path: string, content: string, options?: WriteFileOptions): Promise<void>


```

**Parameters**:

* `path` \- Absolute path to the file
* `content` \- Content to write
* `options` (optional):  
   * `encoding` \- File encoding (`"utf-8"` or `"base64"`, default: `"utf-8"`)

* [  JavaScript ](#tab-panel-6135)
* [  TypeScript ](#tab-panel-6136)

JavaScript

```

await sandbox.writeFile("/workspace/app.js", `console.log('Hello!');`);


// Binary data

await sandbox.writeFile("/tmp/image.png", base64Data, { encoding: "base64" });


```

TypeScript

```

await sandbox.writeFile('/workspace/app.js', `console.log('Hello!');`);


// Binary data

await sandbox.writeFile('/tmp/image.png', base64Data, { encoding: 'base64' });


```

Base64 validation

When using `encoding: 'base64'`, content must contain only valid base64 characters (A-Z, a-z, 0-9, +, /, =). Invalid base64 content returns a validation error.

### `readFile()`

Read a file from the sandbox.

TypeScript

```

const file = await sandbox.readFile(path: string, options?: ReadFileOptions): Promise<FileInfo>


```

**Parameters**:

* `path` \- Absolute path to the file
* `options` (optional):  
   * `encoding` \- File encoding (`"utf-8"` or `"base64"`, default: auto-detected from MIME type)

**Returns**: `Promise<FileInfo>` with `content` and `encoding`

* [  JavaScript ](#tab-panel-6143)
* [  TypeScript ](#tab-panel-6144)

JavaScript

```

const file = await sandbox.readFile("/workspace/package.json");

const pkg = JSON.parse(file.content);


// Binary data (auto-detected or forced)

const image = await sandbox.readFile("/tmp/image.png", { encoding: "base64" });


// Force encoding (override MIME detection)

const textAsBase64 = await sandbox.readFile("/workspace/data.txt", {

  encoding: "base64",

});


```

TypeScript

```

const file = await sandbox.readFile('/workspace/package.json');

const pkg = JSON.parse(file.content);


// Binary data (auto-detected or forced)

const image = await sandbox.readFile('/tmp/image.png', { encoding: 'base64' });


// Force encoding (override MIME detection)

const textAsBase64 = await sandbox.readFile('/workspace/data.txt', { encoding: 'base64' });


```

Encoding behavior

When `encoding` is specified, it overrides MIME-based auto-detection. Without `encoding`, the SDK detects the appropriate encoding from the file's MIME type.

### `exists()`

Check if a file or directory exists.

TypeScript

```

const result = await sandbox.exists(path: string): Promise<FileExistsResult>


```

**Parameters**:

* `path` \- Absolute path to check

**Returns**: `Promise<FileExistsResult>` with `exists` boolean

* [  JavaScript ](#tab-panel-6147)
* [  TypeScript ](#tab-panel-6148)

JavaScript

```

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

TypeScript

```

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

TypeScript

```

await sandbox.mkdir(path: string, options?: MkdirOptions): Promise<void>


```

**Parameters**:

* `path` \- Absolute path to the directory
* `options` (optional):  
   * `recursive` \- Create parent directories if needed (default: `false`)

* [  JavaScript ](#tab-panel-6139)
* [  TypeScript ](#tab-panel-6140)

JavaScript

```

await sandbox.mkdir("/workspace/src");


// Nested directories

await sandbox.mkdir("/workspace/src/components/ui", { recursive: true });


```

TypeScript

```

await sandbox.mkdir('/workspace/src');


// Nested directories

await sandbox.mkdir('/workspace/src/components/ui', { recursive: true });


```

### `deleteFile()`

Delete a file.

TypeScript

```

await sandbox.deleteFile(path: string): Promise<void>


```

**Parameters**:

* `path` \- Absolute path to the file

* [  JavaScript ](#tab-panel-6137)
* [  TypeScript ](#tab-panel-6138)

JavaScript

```

await sandbox.deleteFile("/workspace/temp.txt");


```

TypeScript

```

await sandbox.deleteFile('/workspace/temp.txt');


```

### `renameFile()`

Rename a file.

TypeScript

```

await sandbox.renameFile(oldPath: string, newPath: string): Promise<void>


```

**Parameters**:

* `oldPath` \- Current file path
* `newPath` \- New file path

* [  JavaScript ](#tab-panel-6141)
* [  TypeScript ](#tab-panel-6142)

JavaScript

```

await sandbox.renameFile("/workspace/draft.txt", "/workspace/final.txt");


```

TypeScript

```

await sandbox.renameFile('/workspace/draft.txt', '/workspace/final.txt');


```

### `moveFile()`

Move a file to a different directory.

TypeScript

```

await sandbox.moveFile(sourcePath: string, destinationPath: string): Promise<void>


```

**Parameters**:

* `sourcePath` \- Current file path
* `destinationPath` \- Destination path

* [  JavaScript ](#tab-panel-6145)
* [  TypeScript ](#tab-panel-6146)

JavaScript

```

await sandbox.moveFile("/tmp/download.txt", "/workspace/data.txt");


```

TypeScript

```

await sandbox.moveFile('/tmp/download.txt', '/workspace/data.txt');


```

### `gitCheckout()`

Clone a git repository.

TypeScript

```

await sandbox.gitCheckout(repoUrl: string, options?: GitCheckoutOptions): Promise<void>


```

**Parameters**:

* `repoUrl` \- Git repository URL
* `options` (optional):  
   * `branch` \- Branch to checkout (default: repository default branch)  
   * `targetDir` \- Directory to clone into (default: `/workspace/{repoName}`)  
   * `depth` \- Clone depth for shallow clones (e.g., `1` for latest commit only)

* [  JavaScript ](#tab-panel-6149)
* [  TypeScript ](#tab-panel-6150)

JavaScript

```

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

TypeScript

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/files/","name":"Files"}}]}
```
