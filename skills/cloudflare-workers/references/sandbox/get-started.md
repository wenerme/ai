---
description: Create your first Sandbox SDK Worker to execute Python code in isolated containers.
title: Getting started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting started

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Build your first application with Sandbox SDK - a secure code execution environment. In this guide, you'll create a Worker that can execute Python code and work with files in isolated containers.

Coming soon: Sandbox SDK 1.0

This guide uses today's stable `@cloudflare/sandbox` package.

For **new projects**, we recommend the [1.0 preview](https://developers.cloudflare.com/sandbox/1-0-preview/) on `@cloudflare/sandbox@next` so you start on the APIs that become Sandbox SDK 1.0\. Refer to [Get started with the 1.0 preview](https://developers.cloudflare.com/sandbox/1-0-preview/get-started/).

Coding agents: install [Cloudflare Skills ↗](https://github.com/cloudflare/skills) ([Agent setup](https://developers.cloudflare.com/agent-setup/)). Use **`sandbox-stable`** with this guide; use **`sandbox-next`** for `@next`; use **`sandbox-migrate-to-next`** when porting.

What you're building

A simple API that can safely execute Python code and perform file operations in isolated sandbox environments.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

### Ensure Docker is running locally

Sandbox SDK uses [Docker ↗](https://www.docker.com/) to build container images alongside your Worker.

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗](https://docs.docker.com/desktop/). Other tools like [Colima ↗](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## 1\. Create a new project

Create a new Sandbox SDK project:

npmyarnpnpm

```
npm create cloudflare@latest -- my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
```

```
yarn create cloudflare my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
```

```
pnpm create cloudflare@latest my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
```

This creates a `my-sandbox` directory with everything you need:

* `src/index.ts` \- Worker with sandbox integration
* `wrangler.jsonc` \- Configuration for Workers and Containers
* `Dockerfile` \- Container environment definition

```sh
cd my-sandbox
```

## 2\. Explore the template

The template provides a minimal Worker that demonstrates core sandbox capabilities:

```typescript
import { getSandbox, proxyToSandbox, type Sandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

type Env = {
	Sandbox: DurableObjectNamespace<Sandbox>;
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Get or create a sandbox instance. For user-facing apps,
		// derive this ID from the authenticated user.
		const sandbox = getSandbox(env.Sandbox, "my-sandbox");

		// Execute Python code
		if (url.pathname === "/run") {
			const result = await sandbox.exec('python3 -c "print(2 + 2)"');
			return Response.json({
				output: result.stdout,
				error: result.stderr,
				exitCode: result.exitCode,
				success: result.success,
			});
		}

		// Work with files
		if (url.pathname === "/file") {
			await sandbox.writeFile("/workspace/hello.txt", "Hello, Sandbox!");
			const file = await sandbox.readFile("/workspace/hello.txt");
			return Response.json({
				content: file.content,
			});
		}

		return new Response("Try /run or /file");
	},
};
```

**Key concepts**:

* `getSandbox()` \- Gets or creates a sandbox instance by ID. Use a stable ID to reconnect to the same sandbox. In user-facing apps, scope IDs to a single user.
* `sandbox.exec()` \- Execute shell commands in the sandbox and capture stdout, stderr, and exit codes.
* `sandbox.writeFile()` / `readFile()` \- Write and read files in the sandbox filesystem.

## 3\. Test locally

Start the development server:

```sh
npm run dev
# If you expect to have multiple sandbox instances, you can increase `max_instances`.
```

Note

First run builds the Docker container (2-3 minutes). Subsequent runs are much faster due to caching.

Test the endpoints:

```sh
# Execute Python code
curl http://localhost:8787/run

# File operations
curl http://localhost:8787/file
```

You should see JSON responses with the command output and file contents.

## 4\. Deploy to production

Deploy your Worker and container:

```sh
npx wrangler deploy
```

This will:

1. Build your container image using Docker
2. Push it to Cloudflare's Container Registry
3. Deploy your Worker globally

Wait for provisioning

After the first deployment, wait several minutes before you expect sandbox requests to succeed. The Worker deploys immediately, but the container image still has to provision.

Check deployment status:

```sh
npx wrangler containers list
```

## 5\. Test your deployment

Visit your Worker URL (shown in deploy output):

```sh
# Replace with your actual URL
curl https://my-sandbox.YOUR_SUBDOMAIN.workers.dev/run
```

Your sandbox is now deployed and can execute code in isolated containers.

## Understanding the configuration

Your `wrangler.jsonc` connects three pieces together:

```jsonc
{
	"containers": [
		{
			"class_name": "Sandbox",
			"image": "./Dockerfile",
			"instance_type": "lite",
			"max_instances": 1,
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "Sandbox",
				"name": "Sandbox",
			},
		],
	},
	"migrations": [
		{
			"new_sqlite_classes": ["Sandbox"],
			"tag": "v1",
		},
	],
}
```

```toml
[[containers]]
class_name = "Sandbox"
image = "./Dockerfile"
instance_type = "lite"
max_instances = 1

[[durable_objects.bindings]]
class_name = "Sandbox"
name = "Sandbox"

[[migrations]]
new_sqlite_classes = [ "Sandbox" ]
tag = "v1"
```

* **containers** \- Defines the [container image, instance type, and resource limits](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) for your sandbox environment. If you expect to have multiple sandbox instances, you can increase `max_instances`.
* **durable\_objects** \- You need not be familiar with [Durable Objects](https://developers.cloudflare.com/durable-objects) to use Sandbox SDK, but if you'd like, you can [learn more about Cloudflare Containers and Durable Objects](https://developers.cloudflare.com/containers/get-started/#each-container-is-backed-by-its-own-durable-object). This configuration creates a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings#what-is-a-binding) that makes the `Sandbox` Durable Object accessible in your Worker code.
* **migrations** \- Registers the `Sandbox` class, implemented by the Sandbox SDK, with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage) (required once)

For detailed configuration options including environment variables, secrets, and custom images, see the [Wrangler configuration reference](https://developers.cloudflare.com/sandbox/configuration/wrangler/).

## Next steps

Now that you have a working sandbox, explore more capabilities:

* [Code interpreter with Workers AI](https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/) \- Build an AI-powered code execution system
* [Execute commands](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Run shell commands and stream output
* [Manage files](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Work with files and directories
* [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/) \- Deploy and keep package and image aligned
* [Expose services](https://developers.cloudflare.com/sandbox/guides/expose-services/) \- Get public URLs for services running in your sandbox
* [Quick tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) \- Zero-config `*.trycloudflare.com` URLs for development and `.workers.dev` deployments
* [Configure preview URLs on a custom domain](https://developers.cloudflare.com/sandbox/guides/preview-urls-custom-domain/) \- Wildcard DNS and TLS for `exposePort()`
* [API reference](https://developers.cloudflare.com/sandbox/api/) \- Complete API documentation

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/get-started/#page","headline":"Getting started · Cloudflare Sandbox SDK docs","description":"Create your first Sandbox SDK Worker to execute Python code in isolated containers.","url":"https://developers.cloudflare.com/sandbox/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
