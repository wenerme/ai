---
description: Let code in a Container or Dynamic Worker call an authenticated API without giving it the access token.
title: Call an authenticated API from a sandbox
image: https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/og.png?v=2fc5c18d991062dc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Call an authenticated API from a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Let code in a sandbox call an API that needs a token, while the token stays in your Worker. Requests from the sandbox reach an entrypoint in your Worker, which allows only the requests you choose and adds the token. In this example, the code reads your profile from the GitHub API.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), or a Worker that loads Dynamic Workers with a Worker Loader binding named `LOADER`. To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/) or [Run JavaScript](https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/).
- A GitHub access token that can read your profile.

## Store the token

1. In `wrangler.jsonc`, declare the token as a secret, then generate types:

   ```jsonc
   {
   	"secrets": {
   		"required": ["GITHUB_TOKEN"],
   	},
   }
   ```

   ```toml
   [secrets]
   required = [ "GITHUB_TOKEN" ]
   ```

   npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```

2. Store the token when Wrangler prompts for it:npmyarnpnpm

   ```
   npx wrangler secret put GITHUB_TOKEN
   ```

   ```
   yarn wrangler secret put GITHUB_TOKEN
   ```

   ```
   pnpm wrangler secret put GITHUB_TOKEN
   ```

## Call the API from a Container

The container sends its request to `api.github.com` as usual. The Durable Object intercepts HTTPS requests to that hostname and delivers them to an entrypoint in your Worker, which adds the token.

1. Add an entrypoint to your Worker that accepts one GitHub API request and adds the token:

   *src/index.jsjs*



   ```js
   import { WorkerEntrypoint } from "cloudflare:workers";

   export class GitHubGateway extends WorkerEntrypoint {
   	async fetch(request) {
   		const url = new URL(request.url);

   		if (
   			request.method !== "GET" ||
   			url.hostname !== "api.github.com" ||
   			url.pathname !== "/user" ||
   			url.search !== ""
   		) {
   			return new Response("Forbidden", { status: 403 });
   		}

   		return fetch("https://api.github.com/user", {
   			headers: {
   				Accept: "application/vnd.github+json",
   				Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
   				"User-Agent": "cloudflare-sandbox",
   				"X-GitHub-Api-Version": "2022-11-28",
   			},
   		});
   	}
   }
   ```

   *src/index.tsts*



   ```ts
   import { WorkerEntrypoint } from "cloudflare:workers";

   export class GitHubGateway extends WorkerEntrypoint<Env> {
   	async fetch(request: Request): Promise<Response> {
   		const url = new URL(request.url);

   		if (
   			request.method !== "GET" ||
   			url.hostname !== "api.github.com" ||
   			url.pathname !== "/user" ||
   			url.search !== ""
   		) {
   			return new Response("Forbidden", { status: 403 });
   		}

   		return fetch("https://api.github.com/user", {
   			headers: {
   				Accept: "application/vnd.github+json",
   				Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
   				"User-Agent": "cloudflare-sandbox",
   				"X-GitHub-Api-Version": "2022-11-28",
   			},
   		});
   	}
   }
   ```

   The entrypoint allows only `GET /user`, so code in the sandbox cannot use the token for anything else. Allow each request your code needs, and nothing more.
2. Add a method to your Durable Object that intercepts `api.github.com` and runs code that calls it:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async getUsername(): Promise<string> {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		await container.interceptOutboundHttps(
   			"api.github.com",
   			this.ctx.exports.GitHubGateway,
   		);

   		if (!container.running) {
   			container.start({
   				image: "cloudflare/debian-trixie",
   				entrypoint: ["sleep", "infinity"],
   				// The container can reach only the hostnames you intercept
   				enableInternet: false,
   			});
   		}

   		const process = await container.exec(
   			[
   				"node",
   				"--input-type=module",
   				"--eval",
   				`const response = await fetch("https://api.github.com/user");
   if (!response.ok) throw new Error("GitHub request failed");
   console.log((await response.json()).login);`,
   			],
   			{
   				env: {
   					// The intercept terminates TLS with a certificate that the container
   					// CA certificate signs. Node.js reads the CA certificate from this path
   					NODE_EXTRA_CA_CERTS: "/etc/cloudflare/certs/cloudflare-containers-ca.crt",
   				},
   			},
   		);
   		const output = await process.output();

   		if (output.exitCode !== 0) {
   			throw new Error(new TextDecoder().decode(output.stderr));
   		}

   		return new TextDecoder().decode(output.stdout).trim();
   	}
   }
   ```

3. Add a route to your Worker that returns the username:

   *src/index.tsts*



   ```ts
   if (url.pathname === "/username") {
   	const sandbox = env.MY_CONTAINER.getByName("sandbox");
   	return Response.json({ username: await sandbox.getUsername() });
   }
   ```

4. Deploy your Worker, then send a request to `/username` on the `workers.dev` URL that Wrangler prints:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/username
   ```

   ```json
   { "username": "octocat" }
   ```

## Call the API from a Dynamic Worker

A Dynamic Worker gets a method that calls one fixed GitHub endpoint, instead of the token.

1. Add an entrypoint to your Worker with a method that calls GitHub with the token:

   *src/index.jsjs*



   ```js
   import { WorkerEntrypoint } from "cloudflare:workers";

   export class GitHub extends WorkerEntrypoint {
   	async getUsername() {
   		const response = await fetch("https://api.github.com/user", {
   			headers: {
   				Accept: "application/vnd.github+json",
   				Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
   				"User-Agent": "cloudflare-sandbox",
   				"X-GitHub-Api-Version": "2022-11-28",
   			},
   		});

   		if (!response.ok) {
   			throw new Error(`GitHub returned ${response.status}`);
   		}

   		const user = await response.json();
   		return user.login;
   	}
   }
   ```

   *src/index.tsts*



   ```ts
   import { WorkerEntrypoint } from "cloudflare:workers";

   export class GitHub extends WorkerEntrypoint<Env> {
   	async getUsername(): Promise<string> {
   		const response = await fetch("https://api.github.com/user", {
   			headers: {
   				Accept: "application/vnd.github+json",
   				Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
   				"User-Agent": "cloudflare-sandbox",
   				"X-GitHub-Api-Version": "2022-11-28",
   			},
   		});

   		if (!response.ok) {
   			throw new Error(`GitHub returned ${response.status}`);
   		}

   		const user = await response.json<{ login: string }>();
   		return user.login;
   	}
   }
   ```

2. In the `fetch()` handler of your Worker, pass the entrypoint to the Dynamic Worker as a binding. The handler needs its `ctx` argument for `ctx.exports`:

   *src/index.tsts*



   ```ts
   const sandbox = env.LOADER.load({
   	compatibilityDate: "$today",
   	mainModule: "code.js",
   	modules: {
   		"code.js": `
   			import { WorkerEntrypoint } from "cloudflare:workers";

   			export class Code extends WorkerEntrypoint {
   				async run() {
   					return this.env.GITHUB.getUsername();
   				}
   			}
   		`,
   	},
   	env: {
   		// Create a stub that the Dynamic Worker can receive
   		GITHUB: ctx.exports.GitHub({ props: {} }),
   	},
   	// Block every other `fetch()` and `connect()` call from the Dynamic Worker
   	globalOutbound: null,
   });

   const username = await sandbox
   	.getEntrypoint<WorkerEntrypoint & { run(): Promise<string> }>("Code")
   	.run();
   return Response.json({ username });
   ```

   The code calls `this.env.GITHUB.getUsername()`, and the method reads the token in your Worker.
3. Deploy your Worker, then send a request to the `workers.dev` URL that Wrangler prints:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev
   ```

   ```json
   { "username": "octocat" }
   ```

Authenticate callers to your Worker first, so other people cannot use the quota of your token. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#every-opening-is-also-a-way-out).

## Related resources

- [Clone a private repository](https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/): the same pattern for Git.
- [`interceptOutboundHttps`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttps): intercept other Container destinations.
- [Bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/): pass other methods to a Dynamic Worker.
- [Egress control](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/): restrict or audit requests from a Dynamic Worker.
- [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/): rotate or manage the token.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/#page","headline":"Call an authenticated API from a sandbox","description":"Let code in a Container or Dynamic Worker call an authenticated API without giving it the access token.","url":"https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/og.png?v=2fc5c18d991062dc","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
