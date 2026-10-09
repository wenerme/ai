---
description: Clone a public Git repository into a fresh Linux sandbox, install its dependencies, and return the test results from your Worker.
title: Run tests from a Git repository
image: https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/og.png?v=c2631c87a50f61b3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run tests from a Git repository

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run the tests of a repository in a fresh sandbox. In this example, the Durable Object clones the repository, installs its dependencies, runs its test script, returns the result, and stops the instance.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Run the test suite

1. Create a `Dockerfile` in the project root with Git and the runtime your tests need. This one adds Git to Debian Trixie with Node.js 24:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install --yes --no-install-recommends ca-certificates git \
   	&& rm -rf /var/lib/apt/lists/*

   CMD ["sleep", "infinity"]
   ```

   `sleep infinity` keeps the container running so that it can accept more `exec()` calls.
2. In `wrangler.jsonc`, build the `Dockerfile` as a named image in your `containers` entry:

   ```jsonc
   {
   	"containers": [
   		{
   			"class_name": "MyContainer",
   			"scheduling_policy": "durable_object",
   			"images": {
   				"tests": {
   					"dockerfile": "./Dockerfile",
   				},
   			},
   		},
   	],
   }
   ```

   ```toml
   [[containers]]
   class_name = "MyContainer"
   scheduling_policy = "durable_object"

   [containers.images.tests]
   dockerfile = "./Dockerfile"
   ```

3. Add a method to your Durable Object that clones a repository, installs its dependencies, and runs its tests:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async runTests(repository: string, revision: string) {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		container.start({
   			image: container.images.tests,
   			// `git` and `npm` need the Internet. Do not pass credentials into this sandbox
   			enableInternet: true,
   		});

   		const decoder = new TextDecoder();
   		const run = async (step: string, argv: string[], cwd?: string) => {
   			// `timeout` stops the command and every process it started.
   			const process = await container.exec(
   				["timeout", "--kill-after=5", "600", ...argv],
   				{ cwd },
   			);
   			const output = await process.output();

   			return {
   				step,
   				stdout: decoder.decode(output.stdout),
   				stderr: decoder.decode(output.stderr),
   				exitCode: output.exitCode,
   			};
   		};

   		try {
   			const clone = await run("clone", [
   				"git",
   				"clone",
   				"--depth=1",
   				`--branch=${revision}`,
   				"--",
   				repository,
   				"/workspace",
   			]);

   			if (clone.exitCode !== 0) {
   				return clone;
   			}

   			const install = await run(
   				"install",
   				["npm", "ci", "--no-audit", "--no-fund"],
   				"/workspace",
   			);

   			if (install.exitCode !== 0) {
   				return install;
   			}

   			return await run("test", ["npm", "test", "--", "--silent"], "/workspace");
   		} finally {
   			if (container.running) {
   				await container.destroy();
   			}
   		}
   	}
   }
   ```

   `--` stops `git` from reading a repository value that starts with `-` as an option.

   A step that runs longer than 10 minutes returns exit code `124`. `timeout` stops the step [together with every process the step started](https://developers.cloudflare.com/containers/guides/execute-commands/#stop-the-processes-a-command-starts). The `finally` block stops the instance after the run.

   `output()` holds the whole output of a step in the memory of the Durable Object. For test suites that print a lot, [stream the output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/) instead.

   `enableInternet: true` lets `git` and `npm` download the repository and its packages. It also lets the install and test scripts of the repository reach the Internet, so do not pass credentials into this sandbox. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#every-opening-is-also-a-way-out).
4. Add a route to your Worker that runs the tests in a new sandbox:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		if (request.method !== "POST") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(crypto.randomUUID());
   		const result = await sandbox.runTests(
   			"https://github.com/cloudflare/workers-oauth-provider.git",
   			"v0.0.6",
   		);

   		return Response.json(result, {
   			status: result.exitCode === 0 ? 200 : 500,
   		});
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		if (request.method !== "POST") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(crypto.randomUUID());
   		const result = await sandbox.runTests(
   			"https://github.com/cloudflare/workers-oauth-provider.git",
   			"v0.0.6",
   		);

   		return Response.json(result, {
   			status: result.exitCode === 0 ? 200 : 500,
   		});
   	},
   } satisfies ExportedHandler<Env>;
   ```

   A random sandbox name gives each run a new instance, so one run cannot see files from another.

   In this example, the Worker runs the tests of version `v0.0.6` of the public [`workers-oauth-provider` ↗︎](https://github.com/cloudflare/workers-oauth-provider) repository. Replace the repository, revision, and `npm` commands with your own. `exec()` does not start a shell, so keep each argument in its own array entry.
5. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

6. Send a `POST` request to the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev --request POST
   ```

   The response includes the test output and exit code:

   ```json
   {
   	"step": "test",
   	"stdout": "...\n Test Files  1 passed (1)\n      Tests  37 passed (37)\n...",
   	"stderr": "",
   	"exitCode": 0
   }
   ```

   When a step fails, the Worker responds with `500`, and `step` names the step that failed.

## Related resources

- [Stream command output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/): show test output while the tests run.
- [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/): keep installed dependencies between runs.
- [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/): allow only the Git server and package registry instead of the whole Internet.
- [Clone a private repository](https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/): clone with a token that stays in your Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/#page","headline":"Run tests from a Git repository","description":"Clone a public Git repository into a fresh Linux sandbox, install its dependencies, and return the test results from your Worker.","url":"https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/og.png?v=c2631c87a50f61b3","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
