---
title: Durable Object Container
description: Access and manage containers associated with a Durable Object, including start, stop, and interaction methods.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Durable Object Container

## Description

Each [container](https://developers.cloudflare.com/containers/) is managed by a Durable Object. The [Container class](https://developers.cloudflare.com/containers/container-class/) from `@cloudflare/containers` extends `DurableObject` and handles lifecycle management, port readiness, and sleep timeouts for you. The Durable Object manages routing, persistent state, and lifecycle hooks, while the container process runs your image inside a Linux VM.

The low-level API documented on this page is available on `this.ctx.container` inside any Durable Object class that has a container binding. Use it when you need direct control over the container process or cannot use the `Container` class.

Because the `Container` class extends `DurableObject`, you also have access to [SQLite storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) via `this.ctx.storage`, [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/), and all other Durable Object APIs.

* [  JavaScript ](#tab-panel-8546)
* [  TypeScript ](#tab-panel-8547)

**index.js**

```js
export class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);


    // boot the container when starting the DO
    this.ctx.blockConcurrencyWhile(async () => {
      this.ctx.container.start();
    });
  }
}
```

**index.ts**

```ts
export class MyDurableObject extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);


      // boot the container when starting the DO
      this.ctx.blockConcurrencyWhile(async () => {
        this.ctx.container.start();
    });
    }


}
```

## Attributes

### `running`

`running` returns `true` if the container is currently running. It does not ensure that the container has fully started and ready to accept requests.

**JavaScript**

```js
  this.ctx.container.running;
```

## Methods

### `start`

`start` boots a container. This method does not block until the container is fully started. You may want to confirm the container is ready to accept requests before using it.

**JavaScript**

```js
this.ctx.container.start({
  env: {
    FOO: "bar",
  },
  enableInternet: false,
  entrypoint: ["node", "server.js"],
});
```

#### Parameters

* `options` (optional): An object with the following properties:
  * `env`: An object containing environment variables to pass to the container. This is useful for passing configuration values or secrets to the container.
  * `entrypoint`: An array of strings representing the command to run in the container.
  * `enableInternet`: A boolean indicating whether to enable internet access for the container.

#### Return values

* None.

### `exec`

`exec` starts another process inside an already-running Container. It does not start a stopped Container.

The following example calls `this.ctx.container.exec()` inside a class extending `Container` from `@cloudflare/containers`. In RPC methods, check `this.ctx.container.running` and call `await this.start()` when needed. You can also use the `onStart()` hook to run any series of commands whenever the Container starts.

**TypeScript**

```ts
exec(
  cmd: string[],
  options?: ContainerExecOptions,
): Promise<ExecProcess>
```

The `exec` operation starts the executable directly with the provided arguments. It does not start a shell or interpret pipes, redirects, expansion, or other shell syntax. Invoke Bash explicitly with `["bash", "-lc", "<COMMAND>"]` when Bash exists in the image. Use `["sh", "-c", "<COMMAND>"]` for images with only a Portable Operating System Interface (POSIX) shell.

The following RPC method starts the Container before executing a command:

* [  JavaScript ](#tab-panel-8548)
* [  TypeScript ](#tab-panel-8549)

**JavaScript**

```js
import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {
  async runCommand() {
    if (!this.ctx.container.running) {
      await this.start();
    }


    const process = await this.ctx.container.exec(["node", "--version"]);
    const output = await process.output();


    return {
      pid: process.pid,
      exitCode: output.exitCode,
      stdout: new TextDecoder().decode(output.stdout),
    };
  }
}
```

**TypeScript**

```ts
import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {
  async runCommand() {
    if (!this.ctx.container.running) {
      await this.start();
    }


    const process = await this.ctx.container.exec(["node", "--version"]);
    const output = await process.output();


    return {
      pid: process.pid,
      exitCode: output.exitCode,
      stdout: new TextDecoder().decode(output.stdout),
    };
  }
}
```

#### Parameters

* `cmd` (`string[]`) — executable followed by its arguments.
* `options` (`ContainerExecOptions`, optional) — process configuration:
  * `stdin` (`ReadableStream | "pipe"`) — source for standard input. Use `"pipe"` to write through the returned `stdin` stream. When omitted, standard input closes and sends end-of-file (EOF).
  * `stdout` (`"pipe" | "ignore"`, default `"pipe"`) — captures or discards standard output.
  * `stderr` (`"pipe" | "ignore" | "combined"`, default `"pipe"`) — captures, discards, or merges standard error into standard output. The `"combined"` value requires `stdout: "pipe"`. Combined output does not guarantee ordering between its source streams.
  * `cwd` (`string`) — working directory for the process.
  * `env` (`Record<string, string>`) — environment additions and overrides. The process inherits existing Container variables. Matching keys use the per-execution value.
  * `user` (`string`) — image user for the process.

#### Return values

Returns `Promise<ExecProcess>`.

An `ExecProcess` has these fields and methods:

* `stdin` (`WritableStream | null`) — writable standard input when `stdin` is `"pipe"`.
* `stdout` (`ReadableStream | null`) — readable standard output when piped.
* `stderr` (`ReadableStream | null`) — readable standard error when piped separately.
* `pid` (`number`) — process identifier.
* `exitCode` (`Promise<number>`) — resolves when the process exits. Nonzero codes resolve normally instead of rejecting.
* `output()` (`Promise<ExecOutput>`) — reads buffered output once. `ExecOutput` contains `stdout` (`ArrayBuffer`), `stderr` (`ArrayBuffer`), and `exitCode` (`number`). Ignored streams produce empty buffers. Use `TextDecoder` to decode text.
* `kill(signal?: number)` (`void`) — queues a signal for the process. The default is `SIGTERM`, signal `15`. The signal must be from `1` through `64`.

With `stderr: "combined"`, `stderr` is `null` on `ExecProcess` and an empty `ArrayBuffer` on `ExecOutput`. Read both output channels from `stdout`.

`output()` throws a `TypeError` when called more than once or after either readable stream starts being consumed. For large output, consume both readable streams concurrently instead of buffering them with `output()`.

`exec` has no built-in timeout. Use `kill()` to request termination, then observe completion through `exitCode`. A process can handle or ignore a signal, so this does not enforce a hard deadline. Do not infer a specific exit code from the signal.

#### Exceptions

* `exec()` throws when the Container is not running.
* `exec()` throws a `TypeError` when `cmd` is empty, an option mode is invalid, or `stderr: "combined"` is used with `stdout: "ignore"`.
* `exec()` rejects if the runtime cannot create or start the process.
* Environment variable names cannot contain `=` or null characters. Environment values, `cwd`, and `user` cannot contain null characters.
* `kill()` throws a `RangeError` when the signal is outside the supported range.

For task-oriented examples, refer to [Execute commands](https://developers.cloudflare.com/containers/execute-commands/).

### `destroy`

`destroy` stops the container and optionally returns a custom error message to the `monitor()` error callback.

**JavaScript**

```js
this.ctx.container.destroy("Manually Destroyed");
```

#### Parameters

* `error` (optional): A string that will be sent to the error handler of the `monitor` method. This is useful for logging or debugging purposes.

#### Return values

* A promise that returns once the container is destroyed.

### `signal`

`signal` sends an IPC signal to the container, such as SIGKILL or SIGTERM. This is useful for stopping the container gracefully or forcefully.

**JavaScript**

```js
const SIGTERM = 15;
this.ctx.container.signal(SIGTERM);
```

#### Parameters

* `signal`: a number representing the signal to send to the container. This is typically a POSIX signal number, such as SIGTERM (15) or SIGKILL (9).

#### Return values

* None.

### `getTcpPort`

`getTcpPort` returns a TCP port from the container. This can be used to communicate with the container over TCP and HTTP.

**JavaScript**

```js
const port = this.ctx.container.getTcpPort(8080);
const res = await port.fetch("http://container/set-state", {
  body: initialState,
  method: "POST",
});
```

**JavaScript**

```js
const conn = this.ctx.container.getTcpPort(8080).connect("10.0.0.1:8080");
await conn.opened;


try {
  if (request.body) {
    await request.body.pipeTo(conn.writable);
  }
  return new Response(conn.readable);
} catch (err) {
  console.error("Request body piping failed:", err);
  return new Response("Failed to proxy request body", { status: 502 });
}
```

#### Parameters

* `port` (number): a TCP port number to use for communication with the container.

#### Return values

* `TcpPort`: a `TcpPort` object representing the TCP port. This object can be used to send requests to the container over TCP and HTTP.

### `monitor`

`monitor` returns a promise that resolves when a container exits and errors if a container errors. This is useful for setting up callbacks to handle container status changes in your Workers code.

**JavaScript**

```js
class MyContainer extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    function onContainerExit() {
      console.log("Container exited");
    }


    // the "err" value can be customized by the destroy() method
    async function onContainerError(err) {
      console.log("Container errored", err);
    }


    this.ctx.container.start();
    this.ctx.container.monitor().then(onContainerExit).catch(onContainerError);
  }
}
```

#### Parameters

* None

#### Return values

* A promise that resolves when the container exits.

### `interceptOutboundHttp`

`interceptOutboundHttp` routes outbound HTTP requests matching a hostname, hostname glob, IP address, IP:port, or CIDR range through a `WorkerEntrypoint`. Can be called before or after starting the container. Open connections pick up the new handler without being dropped.

**JavaScript**

```js
const worker = this.ctx.exports.MyWorker({ props: { message: "hello" } });


// Match a specific hostname
this.ctx.container.interceptOutboundHttp("api.example.com", worker);


// Match a hostname glob pattern
this.ctx.container.interceptOutboundHttp("*.example.com", worker);


// Match an IP:port
await this.ctx.container.interceptOutboundHttp("15.0.0.1:80", worker);


// Match a CIDR range (IPv4 and IPv6)
await this.ctx.container.interceptOutboundHttp("123.123.123.123/23", worker);
```

#### Parameters

* `target` (string): A hostname, hostname glob (for example, `*.example.com`), IP address, IP:port, or CIDR range to match.
* `worker` (WorkerEntrypoint): A `WorkerEntrypoint` instance to handle matching requests.

#### Return values

* None.

### `interceptAllOutboundHttp`

`interceptAllOutboundHttp` routes all outbound HTTP requests from the container through a `WorkerEntrypoint`, regardless of destination.

**JavaScript**

```js
await this.ctx.container.interceptAllOutboundHttp(worker);
```

#### Parameters

* `worker` (WorkerEntrypoint): A `WorkerEntrypoint` instance to handle all outbound HTTP requests.

#### Return values

* A promise that resolves once the intercept rule is installed.

### `interceptOutboundHttps`

`interceptOutboundHttps` routes outbound HTTPS requests matching a hostname or hostname glob through a `WorkerEntrypoint`. Works the same way as `interceptOutboundHttp` but for HTTPS traffic. The container must trust the CA certificate at `/etc/cloudflare/certs/cloudflare-containers-ca.crt` for HTTPS interception to work.

Supports glob patterns where `*` matches any sequence of characters.

**JavaScript**

```js
const worker = this.ctx.exports.MyWorker({ props: {} });


// Match a specific hostname
this.ctx.container.interceptOutboundHttps("api.example.com", worker);


// Match a hostname glob pattern
this.ctx.container.interceptOutboundHttps("*.example.com", worker);


// Intercept all HTTPS traffic
this.ctx.container.interceptOutboundHttps("*", worker);
```

#### Parameters

* `target` (string): A hostname or hostname glob pattern to match. Use `*` to intercept all HTTPS traffic.
* `worker` (WorkerEntrypoint): A `WorkerEntrypoint` instance to handle matching requests.

#### Return values

* None.

## Related resources

* [Container class reference](https://developers.cloudflare.com/containers/container-class/) — the recommended high-level API built on top of this interface
* [Containers overview](https://developers.cloudflare.com/containers/)
* [Get started with Containers](https://developers.cloudflare.com/containers/get-started/)
* [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) — persist state across container restarts
* [Durable Objects](https://developers.cloudflare.com/durable-objects/) — the underlying platform that powers Containers

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/container/#page","headline":"Durable Object Container · Cloudflare Durable Objects docs","description":"Access and manage containers associated with a Durable Object, including start, stop, and interaction methods.","url":"https://developers.cloudflare.com/durable-objects/api/container/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/container/","name":"Durable Object Container"}}]}
```
