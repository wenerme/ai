---
title: Lifecycle
description: Create, configure, and manage Sandbox SDK container instances and their resources.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/api/lifecycle.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Lifecycle

Create and manage sandbox containers. Get sandbox instances, configure options, and clean up resources.

## Methods

### `getSandbox()`

Get or create a sandbox instance by ID.

TypeScript

```

const sandbox = getSandbox(

  binding: DurableObjectNamespace<Sandbox>,

  sandboxId: string,

  options?: SandboxOptions

): Sandbox


```

**Parameters**:

* `binding` \- The Durable Object namespace binding from your Worker environment
* `sandboxId` \- Unique identifier for this sandbox. The same ID always returns the same sandbox instance
* `options` (optional) - See [SandboxOptions](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) for all available options:  
   * `sleepAfter` \- Duration of inactivity before automatic sleep (default: `"10m"`)  
   * `keepAlive` \- Prevent automatic sleep entirely. Persists across hibernation (default: `false`)  
   * `containerTimeouts` \- Configure container startup timeouts  
   * `normalizeId` \- Lowercase sandbox IDs for preview URL compatibility (default: `false`)

**Returns**: `Sandbox` instance

Note

The container starts lazily on first operation. Calling `getSandbox()` returns immediately—the container only spins up when you execute a command, write a file, or perform other operations. See [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/concepts/sandboxes/) for details.

* [  JavaScript ](#tab-panel-8446)
* [  TypeScript ](#tab-panel-8447)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


export default {

  async fetch(request, env) {

    const sandbox = getSandbox(env.Sandbox, "user-123");

    const result = await sandbox.exec("python script.py");

    return Response.json(result);

  },

};


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, 'user-123');

    const result = await sandbox.exec('python script.py');

    return Response.json(result);

  }

};


```

Warning

When using `keepAlive: true`, you **must** call `destroy()` when finished to prevent containers running indefinitely.

---

### `setKeepAlive()`

Enable or disable keepAlive mode dynamically after sandbox creation.

TypeScript

```

await sandbox.setKeepAlive(keepAlive: boolean): Promise<void>


```

**Parameters**:

* `keepAlive` \- `true` to prevent automatic sleep, `false` to allow normal sleep behavior

When enabled, the sandbox automatically sends heartbeat pings every 30 seconds to prevent container eviction. When disabled, the sandbox returns to normal sleep behavior based on the `sleepAfter` configuration.

* [  JavaScript ](#tab-panel-8448)
* [  TypeScript ](#tab-panel-8449)

JavaScript

```

const sandbox = getSandbox(env.Sandbox, "user-123");


// Enable keepAlive for a long-running process

await sandbox.setKeepAlive(true);

await sandbox.startProcess("python long_running_analysis.py");


// Later, disable keepAlive when done

await sandbox.setKeepAlive(false);


```

TypeScript

```

const sandbox = getSandbox(env.Sandbox, 'user-123');


// Enable keepAlive for a long-running process

await sandbox.setKeepAlive(true);

await sandbox.startProcess('python long_running_analysis.py');


// Later, disable keepAlive when done

await sandbox.setKeepAlive(false);


```

Heartbeat mechanism

When keepAlive is enabled, the sandbox automatically sends lightweight ping requests to the container every 30 seconds to prevent eviction. This happens transparently without affecting your application code.

Resource management

Containers with `keepAlive: true` will not automatically timeout. Always disable keepAlive or call `destroy()` when done to prevent containers running indefinitely.

---

### `destroy()`

Destroy the sandbox container and free up resources.

TypeScript

```

await sandbox.destroy(): Promise<void>


```

Immediately terminates the container and permanently deletes all state:

* All files in `/workspace`, `/tmp`, and `/home`
* All running processes
* All sessions (including the default session)
* Network connections and exposed ports

* [  JavaScript ](#tab-panel-8450)
* [  TypeScript ](#tab-panel-8451)

JavaScript

```

async function executeCode(code) {

  const sandbox = getSandbox(env.Sandbox, `temp-${Date.now()}`);


  try {

    await sandbox.writeFile("/tmp/code.py", code);

    const result = await sandbox.exec("python /tmp/code.py");

    return result.stdout;

  } finally {

    await sandbox.destroy();

  }

}


```

Explain Code

TypeScript

```

async function executeCode(code: string): Promise<string> {

  const sandbox = getSandbox(env.Sandbox, `temp-${Date.now()}`);


  try {

    await sandbox.writeFile('/tmp/code.py', code);

    const result = await sandbox.exec('python /tmp/code.py');

    return result.stdout;

  } finally {

    await sandbox.destroy();

  }

}


```

Explain Code

Note

Containers automatically sleep after 10 minutes of inactivity but still count toward account limits. Use `destroy()` to immediately free up resources.

---

## Related resources

* [Sandbox lifecycle concept](https://developers.cloudflare.com/sandbox/concepts/sandboxes/) \- Understanding container lifecycle and state
* [Sandbox options configuration](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) \- Configure `keepAlive` and other options
* [Sessions API](https://developers.cloudflare.com/sandbox/api/sessions/) \- Create isolated execution contexts within a sandbox

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/lifecycle/","name":"Lifecycle"}}]}
```
