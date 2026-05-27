---
title: Tunnels
description: Expose sandbox services on zero-config *.trycloudflare.com URLs using the Sandbox SDK tunnels API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnels

The `sandbox.tunnels` namespace exposes a service running inside a sandbox on a `*.trycloudflare.com` URL. The SDK runs `cloudflared` inside the container and opens a persistent QUIC connection to Cloudflare's edge; no Cloudflare account, DNS record, or custom domain is required.

When to use tunnels vs. `exposePort()`

Use `sandbox.tunnels` for **quick development** and **deployments on `.workers.dev`**, where wildcard DNS is not available. For **production**, use [exposePort()](https://developers.cloudflare.com/sandbox/api/ports/) with a custom domain — quick tunnels are positioned by Cloudflare as a debug aid and do not carry an uptime guarantee. Production-grade named tunnels are planned for a future release.

## Requirements

* **RPC transport.** Calling `sandbox.tunnels` on HTTP/Websocket transports will throw `"RPC transport required"`. See [Transport configuration](https://developers.cloudflare.com/sandbox/configuration/transport/).
* **glibc image variant.** The default, `python`, `opencode`, and `desktop` images ship `cloudflared`. The `musl`/Alpine variant does not — there is no upstream `cloudflared` build for musl at this time.

## Methods

### `tunnels.get()`

Return a tunnel record for `port`. The SDK spawns a fresh `cloudflared` process inside the container if not already running. The method is idempotent so repeated calls for the same port return the same record.

TypeScript

```

const tunnel = await sandbox.tunnels.get(port: number): Promise<TunnelInfo>


```

**Parameters**:

* `port` — Port number inside the sandbox to expose (1024-65535, excluding reserved ports). The service to tunnel to must already be listening on `0.0.0.0:<port>` inside the container.

**Returns**: `Promise<TunnelInfo>` — the tunnel record. See [TunnelInfo](#tunnelinfo).

* [  JavaScript ](#tab-panel-8092)
* [  TypeScript ](#tab-panel-8093)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


export default {

  async fetch(request, env) {

    const sandbox = getSandbox(env.Sandbox, "my-sandbox");


    await sandbox.startProcess("python -m http.server 8080");


    const tunnel = await sandbox.tunnels.get(8080);

    console.log(tunnel.url);

    // → https://random-words-here.trycloudflare.com


    // Repeated calls for the same port return the same record.

    const same = await sandbox.tunnels.get(8080);

    console.log(same.url === tunnel.url); // true


    return Response.json({ url: tunnel.url });

  },

};


```

TypeScript

```

import { getSandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, "my-sandbox");


    await sandbox.startProcess("python -m http.server 8080");


    const tunnel = await sandbox.tunnels.get(8080);

    console.log(tunnel.url);

    // → https://random-words-here.trycloudflare.com


    // Repeated calls for the same port return the same record.

    const same = await sandbox.tunnels.get(8080);

    console.log(same.url === tunnel.url); // true


    return Response.json({ url: tunnel.url });


},

};


```

### `tunnels.list()`

Return every tunnel currently tracked for this sandbox.

TypeScript

```

const tunnels = await sandbox.tunnels.list(): Promise<TunnelInfo[]>


```

**Returns**: `Promise<TunnelInfo[]>` — an array of [TunnelInfo](#tunnelinfo) records. Empty when no tunnels are active.

* [  JavaScript ](#tab-panel-8088)
* [  TypeScript ](#tab-panel-8089)

JavaScript

```

const tunnels = await sandbox.tunnels.list();


for (const tunnel of tunnels) {

  console.log(`port ${tunnel.port} → ${tunnel.url}`);

}


```

TypeScript

```

const tunnels = await sandbox.tunnels.list();


for (const tunnel of tunnels) {

console.log(`port ${tunnel.port} → ${tunnel.url}`);

}


```

### `tunnels.destroy()`

Tear down a tunnel. Accepts either the port number or the `TunnelInfo` record returned by `get()`. Idempotent — destroying an unknown port resolves successfully.

TypeScript

```

await sandbox.tunnels.destroy(portOrInfo: number | TunnelInfo): Promise<void>


```

**Parameters**:

* `portOrInfo` — Either the port number or the `TunnelInfo` record returned by [get()](#tunnelsget).

* [  JavaScript ](#tab-panel-8090)
* [  TypeScript ](#tab-panel-8091)

JavaScript

```

const tunnel = await sandbox.tunnels.get(8080);


// Tear down by port number...

await sandbox.tunnels.destroy(8080);


// ...or by the record.

await sandbox.tunnels.destroy(tunnel);


```

TypeScript

```

const tunnel = await sandbox.tunnels.get(8080);


// Tear down by port number...

await sandbox.tunnels.destroy(8080);


// ...or by the record.

await sandbox.tunnels.destroy(tunnel);


```

## Types

### `TunnelInfo`

| Field     | Type   | Description                                                           |
| --------- | ------ | --------------------------------------------------------------------- |
| id        | string | SDK-assigned identifier for the tunnel (for example, quick-9f2c8a1d). |
| port      | number | Port number inside the sandbox that the tunnel proxies to.            |
| url       | string | Public URL — https://<random-words>.trycloudflare.com.                |
| hostname  | string | Hostname component of url (<random-words>.trycloudflare.com).         |
| createdAt | string | ISO-8601 timestamp of when the tunnel was created.                    |

TypeScript

```

interface TunnelInfo {

  id: string;

  port: number;

  url: string;

  hostname: string;

  createdAt: string;

}


```

## Limitations

* **URLs do not survive container restart.** Cloudflare assigns the hostname during `cloudflared`'s startup handshake, so every restart yields a new URL. The SDK clears its tunnel cache when the container starts, so the next `tunnels.get(port)` returns a fresh record.
* **No uptime guarantee.** Cloudflare positions `trycloudflare.com` as a debug aid, not a production target. Use [exposePort()](https://developers.cloudflare.com/sandbox/api/ports/) with a custom domain for production.
* **No Server-Sent Events.** The `trycloudflare.com` edge buffers `text/event-stream` responses, so SSE does not reach the client. WebSockets work normally.
* **No persistent hostname.** Every restart picks a new `<random-words>.trycloudflare.com`. If you need a stable URL, use [exposePort()](https://developers.cloudflare.com/sandbox/api/ports/#exposeport) with a custom token.
* **Brief DNS warm-up.** The first request through a brand-new URL can take a couple of seconds while DNS propagates, even after `get()` resolves.
* **WARP / Zero Trust egress.** If your local machine runs Cloudflare WARP or another Zero Trust egress policy, outbound traffic to `api.trycloudflare.com` and the cloudflared edge can be blocked. When that happens, `tunnels.get()` hangs on the edge handshake and eventually times out. Disable WARP or add an egress exception for these destinations.
* **No musl/Alpine support.** The musl image variant does not include `cloudflared`. Use one of the glibc-based image variants (`default`, `python`, `opencode`, `desktop`).

## Related resources

* [Preview URLs concept](https://developers.cloudflare.com/sandbox/concepts/preview-urls/) — Worker-fronted preview URLs and how they differ from quick tunnels.
* [Ports API](https://developers.cloudflare.com/sandbox/api/ports/) — `exposePort()` and the Worker-fronted preview URL flow.
* [Expose services guide](https://developers.cloudflare.com/sandbox/guides/expose-services/) — End-to-end walkthrough for exposing services in production.
* [Transport configuration](https://developers.cloudflare.com/sandbox/configuration/transport/) — RPC vs. route-based transport.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/tunnels/","name":"Tunnels"}}]}
```
