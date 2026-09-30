---
description: Replace @cloudflare/sandbox 0.12 outbound rules with a WorkerEntrypoint that your Durable Object registers, and replace gitCheckout() with git clone.
title: Move outbound rules
image: https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/og.png?v=a5df19060d257d2f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Move outbound rules

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In Sandbox SDK 0.12, `ContainerProxy` applies the outbound fields of your `Sandbox` class to each request that the container sends. In 1.0, your Durable Object registers your own `WorkerEntrypoint` for HTTP and HTTPS requests from the container, and the entrypoint applies the same rules in the same order.

## Before you start

Your 1.0 class replaces the 0.12 `Sandbox` class, and has the `container` getter, the `ensureRunning()` and `startContainer()` methods, and the `ENV` and `INACTIVITY_TIMEOUT_MS` constants from [Replace the Sandbox class](https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/). The entrypoint uses `this.ctx.exports`, which needs compatibility date `2025-11-17` or later, or the `enable_ctx_exports` flag. 0.12 outbound rules needed it too.

This page replaces `enableInternet`, `interceptHttps`, `allowedHosts`, `deniedHosts`, `outbound`, `outboundByHost`, `outboundHandlers`, their aliases `outboundProxy` and `outboundProxies`, the runtime setters such as `allowHost()` and `setOutboundByHost()`, and `gitCheckout()`. Remove `ContainerProxy` from your imports and from the exports of your Worker. For the handlers that 0.12 added for bucket mounts, refer to [Move bucket mounts](https://developers.cloudflare.com/sandbox/sdk/migrate/bucket-mounts/).

## Apply the rules in an entrypoint

1. Copy the outbound fields of your 0.12 class into constants, and give each handler a name:

   *src/index.tsts*



   ```ts
   type Handler = { method: string; params?: unknown };

   type OutboundHandler = (
   	request: Request,
   	env: Env,
   	params: unknown,
   ) => Response | Promise<Response>;

   // The outbound fields of your 0.12 class.
   const ENABLE_INTERNET = false;
   const ALLOWED_HOSTS: string[] | undefined = [
   	"github.com",
   	"registry.npmjs.org",
   	"api.example.com",
   ];
   const DENIED_HOSTS: string[] | undefined = undefined;
   const OUTBOUND_BY_HOST: Record<string, Handler> = {
   	"api.example.com": { method: "withToken" },
   };
   const OUTBOUND: Handler | undefined = undefined;

   // Your 0.12 handlers, by name.
   const HANDLERS: Record<string, OutboundHandler> = {
   	withToken: (request, env) => {
   		const headers = new Headers(request.headers);
   		headers.set("Authorization", `Bearer ${env.API_TOKEN}`);
   		return fetch(new Request(request, { headers }));
   	},
   };
   ```

   If your 0.12 class did not set `enableInternet`, set `ENABLE_INTERNET` to `true`, the 0.12 default. For a field that your class did not set, use `{}` for `OUTBOUND_BY_HOST` and `undefined` for the other constants.

   Put every function from `outboundHandlers`, `outboundByHost`, and `outbound` in `HANDLERS`, and refer to them by name in `OUTBOUND_BY_HOST` and `OUTBOUND`. A 0.12 handler takes `(request, env, ctx)`. Change it to take `(request, env, params)`, and read `params` where it read `ctx.params`.
2. Add `WorkerEntrypoint` to your `cloudflare:workers` import, and add the entrypoint, which checks each request in the order that 0.12 used:

   *src/index.tsts*



   ```ts
   import { WorkerEntrypoint } from "cloudflare:workers";

   // The shape that 0.12 stored under OUTBOUND_CONFIGURATION.
   type StoredRules = {
   	outboundByHostOverrides?: Record<string, Handler>;
   	outboundHandlerOverride?: Handler;
   	allowedHosts?: string[];
   	deniedHosts?: string[];
   };

   // "*" matches any run of characters, as in 0.12.
   function matches(pattern: string, hostname: string): boolean {
   	const escaped = pattern
   		.split("*")
   		.map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"));
   	return new RegExp(`^${escaped.join(".*")}$`).test(hostname);
   }

   function lookup(
   	handlers: Record<string, Handler> | undefined,
   	hostname: string,
   ): Handler | undefined {
   	return (
   		handlers?.[hostname] ??
   		Object.entries(handlers ?? {}).find(([pattern]) =>
   			matches(pattern, hostname),
   		)?.[1]
   	);
   }

   export class Outbound extends WorkerEntrypoint<Env, StoredRules> {
   	async fetch(request: Request): Promise<Response> {
   		const rules = this.ctx.props;
   		const allowed = rules.allowedHosts ?? ALLOWED_HOSTS;
   		const denied = rules.deniedHosts ?? DENIED_HOSTS;
   		const url = new URL(request.url);
   		const hostname = url.hostname.replace(/\.+$/, "");
   		const listed = (patterns: string[]) =>
   			patterns.some((pattern) => matches(pattern, hostname));
   		const blocked = new Response("Origin is disallowed", {
   			status: 520,
   		});

   		if (denied && listed(denied)) {
   			return blocked;
   		}

   		if (allowed && !listed(allowed)) {
   			return blocked;
   		}

   		const handler = [
   			lookup(rules.outboundByHostOverrides, hostname),
   			lookup(OUTBOUND_BY_HOST, hostname),
   			rules.outboundHandlerOverride,
   			OUTBOUND,
   		].find((handler) => handler && HANDLERS[handler.method]);

   		if (handler) {
   			const run = HANDLERS[handler.method];
   			return run(request, this.env, handler.params);
   		}

   		if (allowed || ENABLE_INTERNET) {
   			return fetch(request);
   		}

   		return blocked;
   	}
   }
   ```

   The entrypoint blocks denied hostnames, then hostnames outside the allowed list. Next, it runs the first handler that matches, in this order: a hostname handler that the sandbox set at runtime, a hostname handler from your class, the catch-all handler set at runtime, and the catch-all handler of your class. With no handler, it sends the request to the Internet if you set an allowed list or allow the Internet. A blocked request gets status `520` with the body `Origin is disallowed`, as in 0.12.

   The props carry the rules that the sandbox set at runtime, in the shape 0.12 stored them. Like 0.12, the entrypoint skips a handler whose name is not in `HANDLERS`, such as the handlers that 0.12 stored for bucket mounts.
3. Add the certificate variables to `ENV`, and register the entrypoint in `startContainer()`:

   *src/index.tsts*



   ```ts
   const RULES = "OUTBOUND_CONFIGURATION";
   const CA = "/etc/cloudflare/certs/cloudflare-containers-ca.crt";
   const BUNDLE = "/etc/ssl/certs/ca-certificates.crt";
   const ENV = {
   	NODE_ENV: "test",
   	NODE_EXTRA_CA_CERTS: CA,
   	REQUESTS_CA_BUNDLE: BUNDLE,
   };
   // Keep a copy of the system bundle, wait up to 10 seconds for the
   // certificate, then write the bundle from the copy and the certificate.
   const SYSTEM = "/etc/ssl/certs/ca-certificates.system.crt";
   const CA_WAIT = `until [ -s ${CA} ]; do sleep 0.1; done`;
   const CA_READY = `timeout 10 sh -c '${CA_WAIT}'`;
   const TRUST = [
   	"sh",
   	"-c",
   	`[ -e ${SYSTEM} ] || { cp ${BUNDLE} ${SYSTEM}.tmp && mv ${SYSTEM}.tmp ${SYSTEM}; }
   	${CA_READY} && cat ${SYSTEM} ${CA} >${BUNDLE}.tmp && mv ${BUNDLE}.tmp ${BUNDLE}`,
   ];

   export class MySandbox extends DurableObject<Env> {
   	// ...

   	private rules(): StoredRules {
   		return this.ctx.storage.kv.get<StoredRules>(RULES) ?? {};
   	}

   	private async intercept(): Promise<void> {
   		const props = this.rules();
   		const outbound = this.ctx.exports.Outbound({ props });
   		await this.container.interceptAllOutboundHttp(outbound);
   		await this.container.interceptOutboundHttps("*", outbound);
   	}

   	private async trust(): Promise<void> {
   		const trust = await this.container.exec(TRUST);

   		if ((await trust.exitCode) !== 0) {
   			throw new Error("The container did not trust the intercept CA");
   		}
   	}

   	private async startContainer(): Promise<void> {
   		const newContainer = !this.container.running;

   		if (newContainer) {
   			this.container.start({
   				image: this.container.images.sandbox,
   				instance: "standard-1",
   				env: ENV,
   				enableInternet: ENABLE_INTERNET,
   			});
   		}

   		try {
   			if (newContainer) {
   				// Replaces onStart().
   				await this.ctx.storage.put("startedAt", Date.now());
   			}
   			await this.intercept();
   			await this.trust();
   			await this.container.setInactivityTimeout(
   				INACTIVITY_TIMEOUT_MS,
   			);
   		} catch (error) {
   			// The next request starts a new container.
   			await this.container.destroy();
   			throw error;
   		}
   	}
   }
   ```

   `// ...` stands for the constructor, the `container` getter, and your other methods. `rules()` reads the key where 0.12 stored the rules that each sandbox set at runtime, so those rules keep applying after the switch. If you [move sandboxes side by side](https://developers.cloudflare.com/sandbox/sdk/migrate/move-side-by-side/), `copyFrom0x()` copies the key into the 1.0 class.

   The intercepts send every request on port `80`, and every HTTPS request on port `443`, to the entrypoint. `enableInternet` keeps the 0.12 value and still decides connections on other ports. An intercept lasts until the container stops. `startContainer()` registers it for each new container, and again when a restarted Durable Object finds the container running. Registering it again replaces the earlier registration, so a container whose setup a deploy interrupted still gets its intercepts before the next command.

   Register other intercepts, such as bucket mounts, before `intercept()`. A hostname intercept that you register after `intercept()` never receives requests, because the `Outbound` entrypoint receives them. For more information, refer to [If you moved outbound rules](https://developers.cloudflare.com/sandbox/sdk/migrate/bucket-mounts/#if-you-moved-outbound-rules).

   If your class uses `DirectoryBackup` from [Move backups](https://developers.cloudflare.com/sandbox/sdk/migrate/backups/), call [`this.backups.intercept()`](https://developers.cloudflare.com/sandbox/reference/directory-backups/#intercept) in the `try` block, before your `intercept()`. Otherwise every backup and restore fails with `BACKUP_TRANSFER`, because your `Outbound` entrypoint receives backup requests from the container. Call it only in `startContainer()`, not on every request.

   The HTTPS intercept signs responses with a certificate that the container does not trust by default. As in 0.12, the `TRUST` command adds the certificate to the system bundle, which curl and Git read. `ENV` sets `NODE_EXTRA_CA_CERTS` and `REQUESTS_CA_BUNDLE` for Node.js and Python `requests`, which do not read the bundle by default. Keep your other `ENV` values, and pass `ENV` to each `exec()` call. The image needs the `ca-certificates` package, which provides the bundle.

   The certificate appears once the HTTPS intercept is registered. `TRUST` waits up to 10 seconds for it. 0.12 waited up to 5 seconds. If the certificate does not appear, or the append fails, `trust()` throws, and `startContainer()` stops the container. Each container gets a new certificate. A [snapshot](https://developers.cloudflare.com/containers/api/durable-object-container/#snapshotcontainer) saves the bundle with the certificate of the container it came from, so appending to the bundle would keep certificates from earlier containers. `TRUST` therefore keeps a copy of the system bundle as it was before any certificate was added, and writes the bundle again from that copy and the current certificate. Running it again for the same container writes the same bundle.

## Replace the runtime setters

Add methods that update the stored rules, and register the entrypoint again with them:

*src/index.tsts*

```ts
export class MySandbox extends DurableObject<Env> {
	// ...

	private async updateRules(change: StoredRules): Promise<void> {
		this.ctx.storage.kv.put(RULES, { ...this.rules(), ...change });

		if (this.container.running) {
			await this.intercept();
		}
	}

	async allowHost(hostname: string): Promise<void> {
		const hosts = this.rules().allowedHosts ?? ALLOWED_HOSTS ?? [];
		await this.updateRules({ allowedHosts: [...hosts, hostname] });
	}

	async setOutboundByHost(
		hostname: string,
		method: string,
		params?: unknown,
	): Promise<void> {
		const hosts = { ...this.rules().outboundByHostOverrides };
		hosts[hostname] = { method, params };
		await this.updateRules({ outboundByHostOverrides: hosts });
	}
}
```

Registering the entrypoint again replaces the rules of a running container, and open connections pick up the new rules without being dropped. Write the other setters the same way. Each one passes a new value to `updateRules()`:

| 0.12 | Value to pass |
| --- | --- |
| `setAllowedHosts(hosts)`, `setDeniedHosts(hosts)` | `allowedHosts` or `deniedHosts`, set to `hosts` |
| `denyHost()`, `removeAllowedHost()`, `removeDeniedHost()` | `deniedHosts` or `allowedHosts`, with the hostname added or removed |
| `setOutboundByHosts()`, `removeOutboundByHost()` | `outboundByHostOverrides`, with the hostnames added or removed |
| `setOutboundHandler(method, params)` | `outboundHandlerOverride`, set to `{ method, params }` |

Like 0.12, each list that a sandbox sets replaces the class list for that sandbox.

## What changes for requests

0.12 checked HTTPS requests only when your class set `interceptHttps = true`. Without it, HTTPS requests to allowed hostnames failed when `enableInternet` was `false`, and HTTPS requests to denied hostnames succeeded when it was `true`. The entrypoint checks every HTTPS request, so commands that relied on either behavior now follow your rules.

In 0.12, handlers that your class declared as static fields, such as `static outboundByHost = { … }`, never ran when TypeScript compiled class fields as definitions. That is the default for target ES2022 and later. The field skipped the setter that registers the handlers, so requests to those hostnames went to the Internet or got `520`. In 1.0, the handlers run.

HTTPS requests to an IP address, such as `https://203.0.113.10/`, fail while `*` is intercepted and `enableInternet` is `false`. Use a hostname.

## Replace gitCheckout()

In 0.12, `gitCheckout()` clones a repository into `/workspace`:

*src/index.ts (0.12)ts*

```ts
const repo = "https://github.com/octocat/Hello-World";
await sandbox.gitCheckout(repo, { depth: 1 });
```

In 1.0, run `git clone` in a Durable Object method:

*src/index.ts (1.0)ts*

```ts
export class MySandbox extends DurableObject<Env> {
	// ...

	async clone(url: string, dir: string): Promise<void> {
		await this.ensureRunning();

		const git = ["git", "clone", "--filter=blob:none", "--depth", "1"];
		const clone = await this.container.exec(
			["timeout", "-k", "5", "600", ...git, "--", url, dir],
			{ cwd: "/workspace", env: ENV },
		);
		const output = await clone.output();

		if (output.exitCode !== 0) {
			throw new Error(new TextDecoder().decode(output.stderr));
		}
	}
}
```

0.12 cloned with `--filter=blob:none` into `/workspace/<repository name>`, and stopped the clone after 600 seconds. Pass `--branch` for the `branch` option. To read the branch that 0.12 returned, run `git branch --show-current` with `cwd` set to the clone. The image needs Git, and your rules must allow the hostname of the Git server, such as `github.com`. To clone a private repository without giving the sandbox a token, refer to [Clone a private repository](https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/).

## Check the rules

After you deploy the switch, run these commands in a sandbox whose image has `curl` and Git. A hostname that your rules block returns the 0.12 response:

```sh
curl -s -w ' %{http_code}\n' https://example.com/
```

```txt
Origin is disallowed 520
```

An allowed hostname works over HTTPS without a certificate option on the command:

```sh
git ls-remote https://github.com/octocat/Hello-World HEAD
```

```txt
7fd1a60b01f91b314f59955a4e4d4e80d8edf11d	HEAD
```

In a sandbox that called `allowHost()` in 0.12, requests to that hostname still succeed after the switch.

## Related resources

- [Durable Object container API](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttp)
- [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/)
- [Call an authenticated API from a sandbox](https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/)
- [Clone a private repository](https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/)
- [Move bucket mounts](https://developers.cloudflare.com/sandbox/sdk/migrate/bucket-mounts/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/#page","headline":"Move outbound rules","description":"Replace @cloudflare/sandbox 0.12 outbound rules with a WorkerEntrypoint that your Durable Object registers, and replace gitCheckout() with git clone.","url":"https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/og.png?v=a5df19060d257d2f","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
