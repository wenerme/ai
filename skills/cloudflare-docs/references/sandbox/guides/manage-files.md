---
title: Manage files
description: Read, write, organize, and synchronize files in the sandbox.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Manage files

This guide shows you how to read, write, organize, and synchronize files in the sandbox filesystem.

## Path conventions

File operations support both absolute and relative paths:

* `/workspace` \- Default working directory for application files
* `/tmp` \- Temporary files (may be cleared)
* `/home` \- User home directory

* [  JavaScript ](#tab-panel-10485)
* [  TypeScript ](#tab-panel-10486)

JavaScript

```
// Absolute pathsawait sandbox.writeFile("/workspace/app.js", code);
// Relative paths (session-aware)const session = await sandbox.createSession();await session.exec("cd /workspace/my-project");await session.writeFile("app.js", code); // Writes to /workspace/my-project/app.jsawait session.writeFile("src/index.js", code); // Writes to /workspace/my-project/src/index.js
```

TypeScript

```
// Absolute pathsawait sandbox.writeFile('/workspace/app.js', code);
// Relative paths (session-aware)const session = await sandbox.createSession();await session.exec('cd /workspace/my-project');await session.writeFile('app.js', code);  // Writes to /workspace/my-project/app.jsawait session.writeFile('src/index.js', code);  // Writes to /workspace/my-project/src/index.js
```

## Write files

* [  JavaScript ](#tab-panel-10497)
* [  TypeScript ](#tab-panel-10498)

JavaScript

```
import { getSandbox } from "@cloudflare/sandbox";
const sandbox = getSandbox(env.Sandbox, "my-sandbox");
// Write text fileawait sandbox.writeFile(  "/workspace/app.js",  `console.log('Hello from sandbox!');`,);
// Write JSONconst config = { name: "my-app", version: "1.0.0" };await sandbox.writeFile(  "/workspace/config.json",  JSON.stringify(config, null, 2),);
// Write binary file (base64)const buffer = await fetch(imageUrl).then((r) => r.arrayBuffer());const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));await sandbox.writeFile("/workspace/image.png", base64, { encoding: "base64" });
```

TypeScript

```
import { getSandbox } from '@cloudflare/sandbox';
const sandbox = getSandbox(env.Sandbox, 'my-sandbox');
// Write text fileawait sandbox.writeFile('/workspace/app.js', `console.log('Hello from sandbox!');`);
// Write JSONconst config = { name: 'my-app', version: '1.0.0' };await sandbox.writeFile('/workspace/config.json', JSON.stringify(config, null, 2));
// Write binary file (base64)const buffer = await fetch(imageUrl).then(r => r.arrayBuffer());const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));await sandbox.writeFile('/workspace/image.png', base64, { encoding: 'base64' });
```

## Read files

* [  JavaScript ](#tab-panel-10491)
* [  TypeScript ](#tab-panel-10492)

JavaScript

```
// Read text fileconst file = await sandbox.readFile("/workspace/app.js");console.log(file.content);
// Read and parse JSONconst configFile = await sandbox.readFile("/workspace/config.json");const config = JSON.parse(configFile.content);
// Read binary file (v0.10.1 with `rpc` transport)const imageFile = await sandbox.readFile("/workspace/image.png", {  encoding: "none",});return new Response(imageFile.content, {  headers: { "Content-Type": imageFile.mimeType },});
```

TypeScript

```
// Read text fileconst file = await sandbox.readFile('/workspace/app.js');console.log(file.content);
// Read and parse JSONconst configFile = await sandbox.readFile('/workspace/config.json');const config = JSON.parse(configFile.content);
// Read binary file (v0.10.1 with `rpc` transport)const imageFile = await sandbox.readFile('/workspace/image.png', { encoding: 'none' });return new Response(imageFile.content, {  headers: { 'Content-Type': imageFile.mimeType }});
```

Note

For more details on the `rpc` transport please see the [Transport](https://developers.cloudflare.com/sandbox/configuration/transport/) docs.

## Organize files

* [  JavaScript ](#tab-panel-10489)
* [  TypeScript ](#tab-panel-10490)

JavaScript

```
// Create directoriesawait sandbox.mkdir("/workspace/src", { recursive: true });await sandbox.mkdir("/workspace/tests", { recursive: true });
// Rename fileawait sandbox.renameFile("/workspace/draft.txt", "/workspace/final.txt");
// Move fileawait sandbox.moveFile("/tmp/download.txt", "/workspace/data.txt");
// Delete fileawait sandbox.deleteFile("/workspace/temp.txt");
```

TypeScript

```
// Create directoriesawait sandbox.mkdir('/workspace/src', { recursive: true });await sandbox.mkdir('/workspace/tests', { recursive: true });
// Rename fileawait sandbox.renameFile('/workspace/draft.txt', '/workspace/final.txt');
// Move fileawait sandbox.moveFile('/tmp/download.txt', '/workspace/data.txt');
// Delete fileawait sandbox.deleteFile('/workspace/temp.txt');
```

## Batch operations

Write multiple files in parallel:

* [  JavaScript ](#tab-panel-10493)
* [  TypeScript ](#tab-panel-10494)

JavaScript

```
const files = {  "/workspace/src/app.js": 'console.log("app");',  "/workspace/src/utils.js": 'console.log("utils");',  "/workspace/README.md": "# My Project",};
await Promise.all(  Object.entries(files).map(([path, content]) =>    sandbox.writeFile(path, content),  ),);
```

TypeScript

```
const files = {  '/workspace/src/app.js': 'console.log("app");',  '/workspace/src/utils.js': 'console.log("utils");',  '/workspace/README.md': '# My Project'};
await Promise.all(  Object.entries(files).map(([path, content]) =>    sandbox.writeFile(path, content)  ));
```

## Check if file exists

* [  JavaScript ](#tab-panel-10499)
* [  TypeScript ](#tab-panel-10500)

JavaScript

```
const result = await sandbox.exists("/workspace/config.json");if (!result.exists) {  // Create default config  await sandbox.writeFile("/workspace/config.json", "{}");}
// Check directoryconst dirResult = await sandbox.exists("/workspace/data");if (!dirResult.exists) {  await sandbox.mkdir("/workspace/data");}
// Also available on sessionsconst sessionResult = await session.exists("/workspace/temp.txt");
```

TypeScript

```
const result = await sandbox.exists('/workspace/config.json');if (!result.exists) {  // Create default config  await sandbox.writeFile('/workspace/config.json', '{}');}
// Check directoryconst dirResult = await sandbox.exists('/workspace/data');if (!dirResult.exists) {  await sandbox.mkdir('/workspace/data');}
// Also available on sessionsconst sessionResult = await session.exists('/workspace/temp.txt');
```

## Best practices

* **Use `/workspace`** \- Default working directory for app files
* **Use absolute paths** \- Always use full paths like `/workspace/file.txt`
* **Batch operations** \- Use `Promise.all()` for multiple independent file writes
* **Create parent directories** \- Use `recursive: true` when creating nested paths
* **Handle errors** \- Check for `FILE_NOT_FOUND` errors gracefully

## Troubleshooting

### Directory doesn't exist

Create parent directories first:

* [  JavaScript ](#tab-panel-10487)
* [  TypeScript ](#tab-panel-10488)

JavaScript

```
// Create directory, then write fileawait sandbox.mkdir("/workspace/data", { recursive: true });await sandbox.writeFile("/workspace/data/file.txt", content);
```

TypeScript

```
// Create directory, then write fileawait sandbox.mkdir('/workspace/data', { recursive: true });await sandbox.writeFile('/workspace/data/file.txt', content);
```

### Binary file encoding

Use `encoding: "none"` (with `rpc` transport) for binary files:

* [  JavaScript ](#tab-panel-10495)
* [  TypeScript ](#tab-panel-10496)

JavaScript

```
// Write binaryawait sandbox.writeFile("/workspace/image.png", readableStream);
// Read binaryconst file = await sandbox.readFile("/workspace/image.png", {  encoding: "none",});
```

TypeScript

```
// Write binaryawait sandbox.writeFile('/workspace/image.png', readableStream);
// Read binaryconst file = await sandbox.readFile('/workspace/image.png', {  encoding: 'none'});
```

For older SDK versions or `http` transport:

* [  JavaScript ](#tab-panel-10501)
* [  TypeScript ](#tab-panel-10502)

JavaScript

```
// Write binaryawait sandbox.writeFile("/workspace/image.png", base64data, {  encoding: "base64",});
// Read binaryconst file = await sandbox.readFile("/workspace/image.png", {  encoding: "base64",});
```

TypeScript

```
// Write binaryawait sandbox.writeFile('/workspace/image.png', base64data, { encoding: "base64" });
// Read binaryconst file = await sandbox.readFile('/workspace/image.png', {  encoding: 'base64'});
```

### Base64 validation errors

When writing with `encoding: 'base64'`, content must contain only valid base64 characters:

* [  JavaScript ](#tab-panel-10503)
* [  TypeScript ](#tab-panel-10504)

JavaScript

```
try {  // Invalid: contains invalid base64 characters  await sandbox.writeFile("/workspace/data.bin", "invalid!@#$", {    encoding: "base64",  });} catch (error) {  if (error.code === "VALIDATION_FAILED") {    // Content contains invalid base64 characters    console.error("Invalid base64 content");  }}
```

TypeScript

```
try {  // Invalid: contains invalid base64 characters  await sandbox.writeFile('/workspace/data.bin', 'invalid!@#$', {    encoding: 'base64'  });} catch (error) {  if (error.code === 'VALIDATION_FAILED') {    // Content contains invalid base64 characters    console.error('Invalid base64 content');  }}
```

## Related resources

* [Files API reference](https://developers.cloudflare.com/sandbox/api/files/) \- Complete method documentation
* [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Run file operations with commands
* [Git workflows guide](https://developers.cloudflare.com/sandbox/guides/git-workflows/) \- Clone and manage repositories
* [Code Interpreter guide](https://developers.cloudflare.com/sandbox/guides/code-execution/) \- Generate and execute code files

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/manage-files/#page","headline":"Manage files · Cloudflare Sandbox SDK docs","description":"Read, write, organize, and synchronize files in the sandbox.","url":"https://developers.cloudflare.com/sandbox/guides/manage-files/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/manage-files/","name":"Manage files"}}]}
```
