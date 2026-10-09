---
description: Run Python code in a Linux sandbox with the Python version and packages you choose, and return its output.
title: Run Python code
image: https://developers.cloudflare.com/sandbox/commands/run-python-code/og.png?v=bfa2c3a9669d3792
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Python code

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/commands/run-python-code/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run Python code in a sandbox and return its output. The image sets the Python version and the packages the code can import. Files that one run writes stay in the sandbox for the next run.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Run Python code

1. Create a file named `sales.py` with the Python code to run. In this example, the code uses `pandas`:

   *sales.pypython*



   ```python
   import pandas as pd

   sales = pd.DataFrame({"city": ["Lisbon", "Austin", "Lisbon"], "units": [3, 5, 4]})
   print(sales.groupby("city")["units"].sum())
   ```

2. Create a `Dockerfile` in your project root with Python and the packages the code can import:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM python:3.13-slim

   RUN pip install --no-cache-dir numpy pandas matplotlib

   WORKDIR /workspace

   CMD ["sleep", "infinity"]
   ```

   Installing packages in the image makes them available as soon as the sandbox starts, without Internet access in the sandbox.
3. In `wrangler.jsonc`, build the `Dockerfile` as a named image in your `containers` entry, then generate types:

   ```jsonc
   {
   	"containers": [
   		{
   			"class_name": "MyContainer",
   			"scheduling_policy": "durable_object",
   			"images": {
   				"python": {
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

   [containers.images.python]
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

4. Add an inactivity timeout to your Durable Object. The constructor sets the timeout again when a restarted Durable Object finds the container running:

   *src/index.tsts*



   ```ts
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   export class MyContainer extends DurableObject<Env> {
   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;
   		if (container?.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}
   }
   ```

   Then add a method that runs Python code:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async runPython(code: string) {
   		const container = this.ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		if (!container.running) {
   			container.start({
   				image: container.images.python,
   				// Block the code from reaching the Internet
   				enableInternet: false,
   			});
   			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}

   		// Each run is a new Python process, so variables do not carry over
   		const process = await container.exec(
   			[
   				// GNU coreutils `timeout` stops code that runs longer than 60 seconds,
   				// together with every process the code starts
   				"timeout", "--kill-after=5", "60",
   				// `python3 -` reads the code from standard input
   				"python3", "-",
   			],
   			{
   				stdin: new Response(code).body!,
   				// Files that the code writes here stay until the instance stops
   				cwd: "/workspace",
   			},
   		);
   		const output = await process.output();
   		const decoder = new TextDecoder();

   		return {
   			stdout: decoder.decode(output.stdout),
   			// A Python exception prints its traceback here
   			stderr: decoder.decode(output.stderr),
   			// `124` if the code timed out, `1` if it raised an exception
   			exitCode: output.exitCode,
   		};
   	}
   }
   ```

   For how `timeout` stops the processes that the code starts, refer to [Stop the processes a command starts](https://developers.cloudflare.com/containers/guides/execute-commands/#stop-the-processes-a-command-starts).

   `output()` holds everything the code prints in the memory of the Durable Object. For code that prints a lot, [stream the output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/) instead.
5. Add a route to your Worker that runs the request body as Python code:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match =
   			/^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/python$/.exec(
   				url.pathname,
   			);

   		if (!match || request.method !== "POST") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(match[1]);
   		return Response.json(await sandbox.runPython(await request.text()));
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/python$/.exec(url.pathname);

   		if (!match || request.method !== "POST") {
   			return new Response("Not found", { status: 404 });
   		}

   		const sandbox = env.MY_CONTAINER.getByName(match[1]);
   		return Response.json(await sandbox.runPython(await request.text()));
   	},
   } satisfies ExportedHandler<Env>;
   ```

   The code can read every file in its sandbox, so give each user their own sandbox name, and authenticate callers first. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#the-sandbox-name-decides-what-a-request-reaches).
6. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

7. Run `sales.py` in a sandbox named `ada`. Replace the example hostname with the `workers.dev` URL that Wrangler prints:

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/python --data-binary @sales.py
   ```

   ```json
   {
   	"stdout": "city\nAustin    5\nLisbon    7\nName: units, dtype: int64\n",
   	"stderr": "",
   	"exitCode": 0
   }
   ```

## Return a chart

To return an image, such as a `matplotlib` chart, have the code save it in `/workspace`, then read the file in another request:

1. Add a method to your Durable Object that reads a file from `/workspace`:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async readFile(name: string) {
   		const container = this.ctx.container;

   		if (!container?.running) {
   			return null;
   		}

   		const process = await container.exec(["cat", "--", name], {
   			cwd: "/workspace",
   			stderr: "ignore",
   		});
   		const output = await process.output();
   		return output.exitCode === 0 ? output.stdout : null;
   	}
   }
   ```

2. In the `fetch()` handler of your Worker, after the line that parses `url`, add a route that returns the chart:

   *src/index.tsts*



   ```ts
   const chart = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/chart\.png$/.exec(url.pathname);

   if (chart) {
   	const png = await env.MY_CONTAINER.getByName(chart[1]).readFile("chart.png");
   	return png
   		? new Response(png, { headers: { "Content-Type": "image/png" } })
   		: new Response("Not found", { status: 404 });
   }
   ```

3. Run code that saves a chart, then open `/sandboxes/ada/chart.png` in your browser:

   *chart.pypython*



   ```python
   import matplotlib

   matplotlib.use("Agg")
   import matplotlib.pyplot as plt

   plt.bar(["Austin", "Lisbon"], [5, 7])
   plt.savefig("chart.png")
   ```

   ```sh
   curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/python --data-binary @chart.py
   ```

   `matplotlib.use("Agg")` draws without a display. For larger files and uploads, refer to [Move files in and out of a sandbox](https://developers.cloudflare.com/sandbox/files/manage-files/).

## Run another language

To run another language, change the base image and the command that reads standard input. For example, use `FROM ruby:3.4-slim` and `["ruby", "-"]`, or `FROM node:24-slim` and `["node", "-"]`.

## Related resources

- [Build an AI code interpreter](https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/): run code that a model writes in a Dynamic Worker.
- [Stream command output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/): show output while long code runs.
- [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/): keep files in `/workspace` after the instance stops.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/commands/run-python-code/#page","headline":"Run Python code","description":"Run Python code in a Linux sandbox with the Python version and packages you choose, and return its output.","url":"https://developers.cloudflare.com/sandbox/commands/run-python-code/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/commands/run-python-code/og.png?v=bfa2c3a9669d3792","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
