---
description: Call Artifacts from a Worker binding.
title: Workers binding
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers binding

Last updated Jun 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/api/workers-binding/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the Artifacts Workers binding to create, import, inspect, fork, and delete repos directly from your Worker. The Artifacts binding returns repo handles that allow repo-scoped operations such as token management and forking.

Review [Namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/) first, then choose the namespace name you will bind here.

## Configure the binding

Add the Artifacts binding to your Wrangler config file:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "artifacts": [
    {
      "binding": "ARTIFACTS",
      "namespace": "default"
    }
  ]
}
```

```toml
[[artifacts]]
binding = "ARTIFACTS"
namespace = "default" # replace with your Artifacts namespace
# remote = true # optional: use the remote Artifacts service in local dev
```

After you run `npx wrangler types`, your Worker environment looks like this:

```ts
export interface Env {
	ARTIFACTS: Artifacts;
}
```

Wrangler generates the `Artifacts` type for consumers and binds it directly in your environment.

In named Wrangler environments, `artifacts` is non-inheritable. Repeat the binding in each environment where you need it.

At runtime, deployed Workers use the configured binding directly. For local Wrangler commands such as `wrangler dev`, `wrangler deploy`, or `wrangler types`, authenticate Wrangler first. For local OAuth authentication, refer to [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login). For CI or headless environments, refer to [Running Wrangler in CI/CD](https://developers.cloudflare.com/workers/ci-cd/).

## Namespace methods

Use namespace methods on `env.ARTIFACTS` to create, list, inspect, import, or delete repos.

### `create(name, opts?)`

* `name` `RepoName`required
* `opts.readOnly` `boolean`optional
* `opts.description` `string`optional
* `opts.setDefaultBranch` `string`optional
* Returns `Promise<ArtifactsCreateRepoResult>`

`create()` returns repo metadata including `name`, `remote`, `defaultBranch`, and an initial token. Save these values if you need them later.

```js
async function createRepo(artifacts) {
	const created = await artifacts.create("starter-repo", {
		description: "Repository for automation experiments",
		readOnly: false,
		setDefaultBranch: "main",
	});

	return {
		defaultBranch: created.defaultBranch,
		name: created.name,
		remote: created.remote,
		initialToken: created.token,
	};
}
```

```ts
async function createRepo(artifacts: Artifacts) {
	const created = await artifacts.create("starter-repo", {
		description: "Repository for automation experiments",
		readOnly: false,
		setDefaultBranch: "main",
	});

	return {
		defaultBranch: created.defaultBranch,
		name: created.name,
		remote: created.remote,
		initialToken: created.token,
	};
}
```

### `get(name)`

* `name` `RepoName`required
* Returns `Promise<ArtifactsRepo>`
* Throws if the repo does not exist or is not ready yet.

`get()` returns a handle to an existing repo. Use the handle to call async methods on the repo, such as `createToken()`, `listTokens()`, `revokeToken()`, and `fork()`.

```js
async function getRepoHandle(artifacts) {
	const repo = await artifacts.get("starter-repo");
	const token = await repo.createToken("read", 3600);
	return token;
}
```

```ts
async function getRepoHandle(artifacts: Artifacts) {
	const repo = await artifacts.get("starter-repo");
	const token = await repo.createToken("read", 3600);
	return token;
}
```

### `list(opts?)`

* `opts.limit` `number`optional
* `opts.cursor` `Cursor`optional
* Returns `Promise<ArtifactsRepoListResult>`

```js
async function listRepos(artifacts) {
	const page = await artifacts.list({ limit: 10 });

	return {
		repos: page.repos.map((repo) => ({
			name: repo.name,
			status: repo.status,
		})),
		nextCursor: page.cursor ?? null,
	};
}
```

```ts
async function listRepos(artifacts: Artifacts) {
	const page = await artifacts.list({ limit: 10 });

	return {
		repos: page.repos.map((repo) => ({
			name: repo.name,
			status: repo.status,
		})),
		nextCursor: page.cursor ?? null,
	};
}
```

Each listed repo includes a `status` value of `ready`, `importing`, or `forking`.

### `import(params)`

Import a repository from an external git remote.

* `params.source.url` `string`required — HTTPS URL of the source repository.
* `params.source.branch` `string`optional — Branch to import (defaults to the remote's default branch).
* `params.source.depth` `number`optional — Shallow clone depth.
* `params.target.name` `RepoName`required — Name for the imported repo.
* `params.target.opts.description` `string`optional
* `params.target.opts.readOnly` `boolean`optional
* Returns `Promise<ArtifactsCreateRepoResult>`

`import()` returns repo metadata including `name`, `remote`, `defaultBranch`, and an initial token. Save the `remote` and `name` values if you need them later.

```js
async function importFromGitHub(artifacts) {
	const imported = await artifacts.import({
		source: {
			url: "https://github.com/cloudflare/workers-sdk",
			branch: "main",
		},
		target: {
			name: "workers-sdk",
		},
	});

	return {
		name: imported.name,
		remote: imported.remote,
		token: imported.token,
	};
}
```

```ts
async function importFromGitHub(artifacts: Artifacts) {
	const imported = await artifacts.import({
		source: {
			url: "https://github.com/cloudflare/workers-sdk",
			branch: "main",
		},
		target: {
			name: "workers-sdk",
		},
	});

	return {
		name: imported.name,
		remote: imported.remote,
		token: imported.token,
	};
}
```

### `delete(name)`

* `name` `RepoName`required
* Returns `Promise<boolean>`

```js
async function deleteRepo(artifacts) {
	return artifacts.delete("starter-repo");
}
```

```ts
async function deleteRepo(artifacts: Artifacts) {
	return artifacts.delete("starter-repo");
}
```

## Repo handle methods

Call `await artifacts.get(name)` to get a repo handle. Use the handle to call async methods on the repo.

### `createToken(scope?, ttl?)`

* `scope` `"read" | "write"`optional (default: "write")
* `ttl` `number`optional (seconds)
* Returns `Promise<ArtifactsCreateTokenResult>`

```js
async function mintReadToken(artifacts) {
	const repo = await artifacts.get("starter-repo");
	return repo.createToken("read", 3600);
}
```

```ts
async function mintReadToken(artifacts: Artifacts) {
	const repo = await artifacts.get("starter-repo");
	return repo.createToken("read", 3600);
}
```

Unlike `create()` and `import()`, `repo.createToken()` returns a structured result with `plaintext` and `expiresAt`. The `plaintext` value is the Git token string.

### `listTokens()`

* Returns `Promise<ArtifactsTokenListResult>`

```js
async function listRepoTokens(artifacts) {
	const repo = await artifacts.get("starter-repo");
	const result = await repo.listTokens();
	return {
		total: result.total,
		tokens: result.tokens,
	};
}
```

```ts
async function listRepoTokens(artifacts: Artifacts) {
	const repo = await artifacts.get("starter-repo");
	const result = await repo.listTokens();
	return {
		total: result.total,
		tokens: result.tokens,
	};
}
```

### `revokeToken(tokenOrId)`

* `tokenOrId` `string`required
* Returns `Promise<boolean>`

```js
async function revokeToken(artifacts, tokenOrId) {
	const repo = await artifacts.get("starter-repo");
	return repo.revokeToken(tokenOrId);
}
```

```ts
async function revokeToken(artifacts: Artifacts, tokenOrId: string) {
	const repo = await artifacts.get("starter-repo");
	return repo.revokeToken(tokenOrId);
}
```

### `fork(name, opts?)`

* `name` `RepoName`required
* `opts.description` `string`optional
* `opts.readOnly` `boolean`optional
* `opts.defaultBranchOnly` `boolean`optional
* Returns `Promise<ArtifactsCreateRepoResult>`

`fork()` returns metadata for the new repo. Save the `remote` and `name` values if you need them later.

```js
async function forkRepo(artifacts) {
	const repo = await artifacts.get("starter-repo");
	const forked = await repo.fork("starter-repo-copy", {
		description: "Fork for testing",
		defaultBranchOnly: true,
		readOnly: false,
	});

	return forked.remote;
}
```

```ts
async function forkRepo(artifacts: Artifacts) {
	const repo = await artifacts.get("starter-repo");
	const forked = await repo.fork("starter-repo-copy", {
		description: "Fork for testing",
		defaultBranchOnly: true,
		readOnly: false,
	});

	return forked.remote;
}
```

### `log(opts?)`

* `opts.ref` `string`optional — Branch, tag, or commit hash.
* `opts.limit` `number`optional
* `opts.offset` `number`optional
* Returns `Promise<ArtifactsLogResult>`

```js
async function readCommitHistory(artifacts) {
	const repo = await artifacts.get("starter-repo");
	const history = await repo.log({ ref: "main", limit: 10 });
	return history;
}
```

```ts
async function readCommitHistory(artifacts: Artifacts) {
	const repo = await artifacts.get("starter-repo");
	const history = await repo.log({ ref: "main", limit: 10 });
	return history;
}
```

### `readCommit(hash)`

* `hash` `string`required — Commit SHA-1 hash.
* Returns `Promise<ArtifactsCommit>`

```js
async function readCommit(artifacts, hash) {
	const repo = await artifacts.get("starter-repo");
	return repo.readCommit(hash);
}
```

```ts
async function readCommit(artifacts: Artifacts, hash: string) {
	const repo = await artifacts.get("starter-repo");
	return repo.readCommit(hash);
}
```

### `readTree(hash)`

* `hash` `string`required — Tree SHA-1 hash.
* Returns `Promise<ArtifactsTree>`

```js
async function readTree(artifacts, hash) {
	const repo = await artifacts.get("starter-repo");
	return repo.readTree(hash);
}
```

```ts
async function readTree(artifacts: Artifacts, hash: string) {
	const repo = await artifacts.get("starter-repo");
	return repo.readTree(hash);
}
```

## Worker example

This example combines the binding methods in one Worker route.

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (request.method === "POST" && url.pathname === "/repos") {
			const created = await env.ARTIFACTS.create("starter-repo");
			return Response.json({
				name: created.name,
				remote: created.remote,
			});
		}

		if (request.method === "POST" && url.pathname === "/tokens") {
			const repo = await env.ARTIFACTS.get("starter-repo");
			const token = await repo.createToken("read", 3600);
			return Response.json(token);
		}

		return Response.json(
			{ message: "Use POST /repos or POST /tokens." },
			{ status: 404 },
		);
	},
};
```

```ts
interface Env {
	ARTIFACTS: Artifacts;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "POST" && url.pathname === "/repos") {
			const created = await env.ARTIFACTS.create("starter-repo");
			return Response.json({
				name: created.name,
				remote: created.remote,
			});
		}

		if (request.method === "POST" && url.pathname === "/tokens") {
			const repo = await env.ARTIFACTS.get("starter-repo");
			const token = await repo.createToken("read", 3600);
			return Response.json(token);
		}

		return Response.json(
			{ message: "Use POST /repos or POST /tokens." },
			{ status: 404 },
		);
	},
} satisfies ExportedHandler<Env>;
```

Protect token routes

This example omits authentication so it can focus on the binding surface. In production, authorize the caller before creating repos or returning tokens.

## Generated types

Run `npx wrangler types` in your own project and treat the generated `worker-configuration.d.ts` file as the source of truth for the Artifacts binding types in that environment.

## Next steps

### [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/)

Compare the binding methods with the underlying HTTP routes.

### [Get started with Workers](https://developers.cloudflare.com/artifacts/get-started/workers/)

Use the binding in a full Worker project from local development through deploy.

### [Git protocol](https://developers.cloudflare.com/artifacts/api/git-protocol/)

Use repo remotes and tokens with standard git-over-HTTPS clients.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/api/workers-binding/#page","headline":"Workers binding · Artifacts · Cloudflare Artifacts docs","description":"Call Artifacts from a Worker binding.","url":"https://developers.cloudflare.com/artifacts/api/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
