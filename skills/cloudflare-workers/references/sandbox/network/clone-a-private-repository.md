---
description: Clone a private GitHub repository into a Linux sandbox without giving the sandbox the access token.
title: Clone a private repository
image: https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/og.png?v=7057e6542fb559ab
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Clone a private repository

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Clone a private repository into a sandbox while the access token stays in your Worker. If the clone URL contains the token, every command in the sandbox can read it. Instead, the Durable Object intercepts HTTPS requests from Git to `github.com`. An entrypoint in your Worker receives each request, checks it, and adds the token.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).
- A GitHub access token with read access to the contents of the repository.

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Clone the repository

1. Create a `Dockerfile` in your project root that installs Git:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install --yes --no-install-recommends ca-certificates git \
   	&& rm -rf /var/lib/apt/lists/*

   CMD ["sleep", "infinity"]
   ```

2. In `wrangler.jsonc`, name the repository, declare the token as a secret, and build the `Dockerfile` as a named image. Replace `<OWNER>/<REPOSITORY>` with your repository:

   ```jsonc
   {
   	"vars": {
   		"REPOSITORY": "<OWNER>/<REPOSITORY>",
   	},
   	"secrets": {
   		"required": ["GITHUB_TOKEN"],
   	},
   	"containers": [
   		{
   			"class_name": "MyContainer",
   			"scheduling_policy": "durable_object",
   			"images": {
   				"git": {
   					"dockerfile": "./Dockerfile",
   				},
   			},
   		},
   	],
   }
   ```

   ```toml
   [vars]
   REPOSITORY = "<OWNER>/<REPOSITORY>"

   [secrets]
   required = [ "GITHUB_TOKEN" ]

   [[containers]]
   class_name = "MyContainer"
   scheduling_policy = "durable_object"

   [containers.images.git]
   dockerfile = "./Dockerfile"
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

3. Store the token when Wrangler prompts for it:npmyarnpnpm

   ```
   npx wrangler secret put GITHUB_TOKEN
   ```

   ```
   yarn wrangler secret put GITHUB_TOKEN
   ```

   ```
   pnpm wrangler secret put GITHUB_TOKEN
   ```

4. Add an entrypoint to your Worker that accepts only the requests that fetch the repository, and adds the token:

   *src/index.jsjs*



   ```js
   import { WorkerEntrypoint } from "cloudflare:workers";

   export class GitGateway extends WorkerEntrypoint {
   	async fetch(request) {
   		const url = new URL(request.url);
   		const repository = `/${this.env.REPOSITORY}.git`;
   		const fetchesRepository =
   			(request.method === "GET" &&
   				url.pathname === `${repository}/info/refs` &&
   				url.search === "?service=git-upload-pack") ||
   			(request.method === "POST" &&
   				url.pathname === `${repository}/git-upload-pack`);

   		if (url.hostname !== "github.com" || !fetchesRepository) {
   			return new Response("Forbidden", { status: 403 });
   		}

   		const headers = new Headers(request.headers);
   		const credentials = btoa(`x-access-token:${this.env.GITHUB_TOKEN}`);
   		headers.set("Authorization", `Basic ${credentials}`);

   		return fetch(new Request(request, { headers }));
   	}
   }
   ```

   *src/index.tsts*



   ```ts
   import { WorkerEntrypoint } from "cloudflare:workers";

   export class GitGateway extends WorkerEntrypoint<Env> {
   	async fetch(request: Request): Promise<Response> {
   		const url = new URL(request.url);
   		const repository = `/${this.env.REPOSITORY}.git`;
   		const fetchesRepository =
   			(request.method === "GET" &&
   				url.pathname === `${repository}/info/refs` &&
   				url.search === "?service=git-upload-pack") ||
   			(request.method === "POST" &&
   				url.pathname === `${repository}/git-upload-pack`);

   		if (url.hostname !== "github.com" || !fetchesRepository) {
   			return new Response("Forbidden", { status: 403 });
   		}

   		const headers = new Headers(request.headers);
   		const credentials = btoa(`x-access-token:${this.env.GITHUB_TOKEN}`);
   		headers.set("Authorization", `Basic ${credentials}`);

   		return fetch(new Request(request, { headers }));
   	}
   }
   ```

   `git-upload-pack` serves clones and fetches. The entrypoint allows it for one repository and rejects every other request. Code in the sandbox cannot push through `git-receive-pack` or read other repositories, even when the token allows it.
5. Add a method to your Durable Object that intercepts `github.com` and clones the repository:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async clone(): Promise<{ exitCode: number; stderr: string }> {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		await container.interceptOutboundHttps(
   			"github.com",
   			this.ctx.exports.GitGateway,
   		);

   		if (!container.running) {
   			container.start({
   				image: container.images.git,
   				// The container can reach only the hostnames you intercept
   				enableInternet: false,
   			});
   		}

   		const process = await container.exec(
   			[
   				"git",
   				"clone",
   				"--depth=1",
   				`https://github.com/${this.env.REPOSITORY}.git`,
   				"/workspace",
   			],
   			{
   				env: {
   					// The intercept terminates TLS with a certificate that the container
   					// CA certificate signs. Git reads the CA certificate from this path
   					GIT_SSL_CAINFO: "/etc/cloudflare/certs/cloudflare-containers-ca.crt",
   				},
   			},
   		);
   		const output = await process.output();

   		return {
   			exitCode: output.exitCode,
   			// Git prints its progress to standard error
   			stderr: new TextDecoder().decode(output.stderr),
   		};
   	}
   }
   ```

6. Add a route to your Worker that clones the repository:

   *src/index.tsts*



   ```ts
   if (url.pathname === "/clone" && request.method === "POST") {
   	const sandbox = env.MY_CONTAINER.getByName("sandbox");
   	const { exitCode, stderr } = await sandbox.clone();
   	return new Response(stderr, { status: exitCode === 0 ? 200 : 500 });
   }
   ```

   When Git fails, the route responds with `500` and the error from Git. While the sandbox keeps running, a second request fails this way, because `/workspace` already holds the clone.

   Authenticate callers first, so other people cannot read the repository through the sandbox. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#every-opening-is-also-a-way-out).
7. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

8. Send a `POST` request to `/clone` on the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/clone --request POST
   ```

   ```txt
   Cloning into '/workspace'...
   ```

   The repository is in `/workspace`, and `git remote get-url origin` prints the URL without a token. A `git push` from the sandbox fails with `403`.

## Related resources

- [Run tests from a Git repository](https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/): install and test a cloned repository.
- [Call an authenticated API from a sandbox](https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/): the same pattern for an API.
- [`interceptOutboundHttps`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttps)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/#page","headline":"Clone a private repository","description":"Clone a private GitHub repository into a Linux sandbox without giving the sandbox the access token.","url":"https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/og.png?v=7057e6542fb559ab","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
