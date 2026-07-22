---
description: Build a testing pipeline that clones Git repositories, installs dependencies, runs tests, and reports results.
title: Automated testing pipeline
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

#  Automated testing pipeline

Last updated Jul 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/sandbox/tutorials/automated-testing-pipeline/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Build a testing pipeline that clones Git repositories, installs dependencies, runs tests, and reports results.

**Time to complete**: 25 minutes

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You'll also need a GitHub repository with tests (public or private with access token).

## 1\. Create your project

 npm  yarn  pnpm

```
npm create cloudflare@latest -- test-pipeline --template=cloudflare/sandbox-sdk/examples/minimal
```

```
yarn create cloudflare test-pipeline --template=cloudflare/sandbox-sdk/examples/minimal
```

```
pnpm create cloudflare@latest test-pipeline --template=cloudflare/sandbox-sdk/examples/minimal
```

```sh
cd test-pipeline
```

## 2\. Build the pipeline

Replace `src/index.ts`:

```typescript
import { getSandbox, proxyToSandbox, parseSSEStream, type Sandbox, type ExecEvent } from '@cloudflare/sandbox';

export { Sandbox } from '@cloudflare/sandbox';

interface Env {
	Sandbox: DurableObjectNamespace<Sandbox>;
	GITHUB_TOKEN?: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const proxyResponse = await proxyToSandbox(request, env);
		if (proxyResponse) return proxyResponse;

		if (request.method !== 'POST') {
			return new Response('POST { "repoUrl": "https://github.com/owner/repo", "branch": "main" }');
		}

		try {
			const { repoUrl, branch } = await request.json();

			if (!repoUrl) {
				return Response.json({ error: 'repoUrl required' }, { status: 400 });
			}

			const sandbox = getSandbox(env.Sandbox, `test-${Date.now()}`);

			try {
				// Clone repository
				console.log('Cloning repository...');
				let cloneUrl = repoUrl;

				if (env.GITHUB_TOKEN && cloneUrl.includes('github.com')) {
					cloneUrl = cloneUrl.replace('https://', `https://${env.GITHUB_TOKEN}@`);
				}

				await sandbox.gitCheckout(cloneUrl, {
					...(branch && { branch }),
					depth: 1,
					targetDir: 'repo'
				});
				console.log('Repository cloned');

				// Detect project type
				const projectType = await detectProjectType(sandbox);
				console.log(`Detected ${projectType} project`);

				// Install dependencies
				const installCmd = getInstallCommand(projectType);
				if (installCmd) {
					console.log('Installing dependencies...');
					const installStream = await sandbox.execStream(`cd /workspace/repo && ${installCmd}`);

					let installExitCode = 0;
					for await (const event of parseSSEStream<ExecEvent>(installStream)) {
						if (event.type === 'stdout' || event.type === 'stderr') {
							console.log(event.data);
						} else if (event.type === 'complete') {
							installExitCode = event.exitCode;
						}
					}

					if (installExitCode !== 0) {
						return Response.json({
							success: false,
							error: 'Install failed',
							exitCode: installExitCode
						});
					}
					console.log('Dependencies installed');
				}

				// Run tests
				console.log('Running tests...');
				const testCmd = getTestCommand(projectType);
				const testStream = await sandbox.execStream(`cd /workspace/repo && ${testCmd}`);

				let testExitCode = 0;
				for await (const event of parseSSEStream<ExecEvent>(testStream)) {
					if (event.type === 'stdout' || event.type === 'stderr') {
						console.log(event.data);
					} else if (event.type === 'complete') {
						testExitCode = event.exitCode;
					}
				}
				console.log(`Tests completed with exit code ${testExitCode}`);

				return Response.json({
					success: testExitCode === 0,
					exitCode: testExitCode,
					projectType,
					message: testExitCode === 0 ? 'All tests passed' : 'Tests failed'
				});

			} finally {
				await sandbox.destroy();
			}

		} catch (error: any) {
			return Response.json({ error: error.message }, { status: 500 });
		}
	},
};

async function detectProjectType(sandbox: any): Promise<string> {
	try {
		await sandbox.readFile('/workspace/repo/package.json');
		return 'nodejs';
	} catch {}

	try {
		await sandbox.readFile('/workspace/repo/requirements.txt');
		return 'python';
	} catch {}

	try {
		await sandbox.readFile('/workspace/repo/go.mod');
		return 'go';
	} catch {}

	return 'unknown';
}

function getInstallCommand(projectType: string): string {
	switch (projectType) {
		case 'nodejs': return 'npm install';
		case 'python': return 'pip install -r requirements.txt || pip install -e .';
		case 'go': return 'go mod download';
		default: return '';
	}
}

function getTestCommand(projectType: string): string {
	switch (projectType) {
		case 'nodejs': return 'npm test';
		case 'python': return 'python -m pytest || python -m unittest discover';
		case 'go': return 'go test ./...';
		default: return 'echo "Unknown project type"';
	}
}
```

## 3\. Test locally

Start the dev server:

```sh
npm run dev
```

Test with a repository:

```sh
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/cloudflare/sandbox-sdk"
  }'
```

You will see progress logs in the wrangler console, and receive a JSON response:

```json
{
  "success": true,
  "exitCode": 0,
  "projectType": "nodejs",
  "message": "All tests passed"
}
```

## 4\. Deploy

```sh
npx wrangler deploy
```

For private repositories, set your GitHub token:

```sh
npx wrangler secret put GITHUB_TOKEN
```

## What you built

An automated testing pipeline that:

* Clones Git repositories
* Detects project type (Node.js, Python, Go)
* Installs dependencies automatically
* Runs tests and reports results

## Next steps

* [Streaming output](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Add real-time test output
* [Background processes](https://developers.cloudflare.com/sandbox/guides/background-processes/) \- Handle long-running tests
* [Sessions API](https://developers.cloudflare.com/sandbox/api/sessions/) \- Cache dependencies between runs

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/automated-testing-pipeline/#page","headline":"Automated testing pipeline · Cloudflare Sandbox SDK docs","description":"Build a testing pipeline that clones Git repositories, installs dependencies, runs tests, and reports results.","url":"https://developers.cloudflare.com/sandbox/tutorials/automated-testing-pipeline/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
