---
description: Call Artifacts from a Worker binding.
title: Workers binding
image: https://developers.cloudflare.com/artifacts/api/workers-binding/og.png?v=8f6f94f63f1b3c24
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers binding

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/artifacts/api/workers-binding/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the Artifacts Workers binding to create, import, inspect, fork, and delete repos directly from your Worker. The Artifacts binding returns disposable repository capabilities that support metadata lookup, token management, Git object inspection, path-based file reads, commit history, and forking.

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

Note

Make sure to update to Wrangler 4.145.0 or later before generating Artifacts binding types or using Blob-returning methods with a remote binding in local development.

```sh
npm install --save-dev wrangler@latest
npx wrangler types
```

## Namespace methods

Use namespace methods on `env.ARTIFACTS` to create, list, inspect, import, or delete repos.

### `create(name, opts?)`

- `name` `RepoName` required
- `opts.readOnly` `boolean` optional
- `opts.description` `string` optional
- `opts.setDefaultBranch` `string` optional
- Returns `Promise<ArtifactsCreateRepoResult>`

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

- `name` `RepoName` required
- Returns `Promise<ArtifactsRepo>`
- Throws if the repo does not exist or is not ready yet.

`get()` returns an `ArtifactsRepo` RPC capability that implements `Disposable`. Use the disposable handle to retrieve metadata, manage tokens, inspect Git objects, read files, list commit history, and fork the repository. Declare the handle with `using` so it is released before the request ends.

Note

`get()` returns a disposable repository capability, not repository metadata. Call `repo.info()` to retrieve current metadata.

```js
async function getRepoHandle(artifacts) {
	using repo = await artifacts.get("starter-repo");
	const token = await repo.createToken("read", 3600);
	return token;
}
```

```ts
async function getRepoHandle(artifacts: Artifacts) {
	using repo = await artifacts.get("starter-repo");
	const token = await repo.createToken("read", 3600);
	return token;
}
```

### `list(opts?)`

- `opts.limit` `number` optional
- `opts.cursor` `Cursor` optional
- Returns `Promise<ArtifactsRepoListResult>`

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

- `params.source.url` `string` required — HTTPS URL of the source repository.
- `params.source.branch` `string` optional — Branch to import (defaults to the remote's default branch).
- `params.source.depth` `number` optional — Shallow clone depth.
- `params.target.name` `RepoName` required — Name for the imported repo.
- `params.target.opts.description` `string` optional
- `params.target.opts.readOnly` `boolean` optional
- Returns `Promise<ArtifactsCreateRepoResult>`

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

- `name` `RepoName` required
- Returns `Promise<boolean>`

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

## Repository capability methods

Call `await artifacts.get(name)` to get a disposable repo handle. Declare the handle with `using` so it is released before the request ends.

### `info()`

- Returns `Promise<ArtifactsRepoInfo>`
- Throws `NOT_FOUND` if the repo was deleted.

Repository metadata is not exposed as properties on `ArtifactsRepo`. `info()` performs a fresh metadata lookup for the repo.

```js
async function getRepoInfo(artifacts) {
	using repo = await artifacts.get("starter-repo");
	return await repo.info();
}
```

```ts
async function getRepoInfo(artifacts: Artifacts) {
	using repo = await artifacts.get("starter-repo");
	return await repo.info();
}
```

### `createToken(scope?, ttl?)`

- `scope` `"read" | "write"` optional (default: "write")
- `ttl` `number` optional (seconds)
- Returns `Promise<ArtifactsCreateTokenResult>`

```js
async function mintReadToken(artifacts) {
	using repo = await artifacts.get("starter-repo");
	return await repo.createToken("read", 3600);
}
```

```ts
async function mintReadToken(artifacts: Artifacts) {
	using repo = await artifacts.get("starter-repo");
	return await repo.createToken("read", 3600);
}
```

Unlike `create()` and `import()`, `repo.createToken()` returns a structured result with `plaintext` and `expiresAt`. The `plaintext` value is the Git token string.

### `listTokens()`

- Returns `Promise<ArtifactsTokenListResult>`

```js
async function listRepoTokens(artifacts) {
	using repo = await artifacts.get("starter-repo");
	const result = await repo.listTokens();
	return {
		total: result.total,
		tokens: result.tokens,
	};
}
```

```ts
async function listRepoTokens(artifacts: Artifacts) {
	using repo = await artifacts.get("starter-repo");
	const result = await repo.listTokens();
	return {
		total: result.total,
		tokens: result.tokens,
	};
}
```

### `revokeToken(tokenOrId)`

- `tokenOrId` `string` required
- Returns `Promise<boolean>`

```js
async function revokeToken(artifacts, tokenOrId) {
	using repo = await artifacts.get("starter-repo");
	return await repo.revokeToken(tokenOrId);
}
```

```ts
async function revokeToken(artifacts: Artifacts, tokenOrId: string) {
	using repo = await artifacts.get("starter-repo");
	return await repo.revokeToken(tokenOrId);
}
```

### `fork(name, opts?)`

- `name` `RepoName` required
- `opts.description` `string` optional
- `opts.readOnly` `boolean` optional
- `opts.defaultBranchOnly` `boolean` optional
- Returns `Promise<ArtifactsCreateRepoResult>`

`fork()` returns metadata for the new repo. Save the `remote` and `name` values if you need them later.

```js
async function forkRepo(artifacts) {
	using repo = await artifacts.get("starter-repo");
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
	using repo = await artifacts.get("starter-repo");
	const forked = await repo.fork("starter-repo-copy", {
		description: "Fork for testing",
		defaultBranchOnly: true,
		readOnly: false,
	});

	return forked.remote;
}
```

### `log(opts?)`

- `opts.ref` `string` optional (default: "HEAD") — Branch, tag, or commit hash.
- `opts.limit` `number` optional (default: 50, maximum: 1000)
- `opts.offset` `number` optional (default: 0)
- Returns `Promise<ArtifactsCommitMetadata[]>`

`log()` follows the first-parent chain and returns commits newest first. If the ref cannot be resolved, `log()` returns an empty array.

```js
async function readCommitHistory(artifacts) {
	using repo = await artifacts.get("starter-repo");
	const history = await repo.log({ ref: "main", limit: 10 });
	return history;
}
```

```ts
async function readCommitHistory(artifacts: Artifacts) {
	using repo = await artifacts.get("starter-repo");
	const history = await repo.log({ ref: "main", limit: 10 });
	return history;
}
```

### `readCommit(hash)`

- `hash` `string` required — Commit SHA-1 hash.
- Returns `Promise<ArtifactsCommitMetadata | null>`

`readCommit()` returns `null` if the commit does not exist.

```js
async function readCommit(artifacts, hash) {
	using repo = await artifacts.get("starter-repo");
	return await repo.readCommit(hash);
}
```

```ts
async function readCommit(artifacts: Artifacts, hash: string) {
	using repo = await artifacts.get("starter-repo");
	return await repo.readCommit(hash);
}
```

### `readTree(hash)`

- `hash` `string` required — Tree SHA-1 hash.
- Returns `Promise<ArtifactsTreeEntry[] | null>`

`readTree()` returns only the tree's immediate children. It returns `null` if the tree does not exist.

```js
async function readTree(artifacts, hash) {
	using repo = await artifacts.get("starter-repo");
	return await repo.readTree(hash);
}
```

```ts
async function readTree(artifacts: Artifacts, hash: string) {
	using repo = await artifacts.get("starter-repo");
	return await repo.readTree(hash);
}
```

### `readBlob(hash)`

- `hash` `string` required — Lowercase, 40-character Git SHA-1 object ID.
- Returns `Promise<Blob | null>`

`readBlob()` returns an untyped `Blob`, so `blob.type` is empty. It returns `null` if the object is missing or is not a blob. Use `readFile()` when you need path resolution or a content type.

```js
async function readBlob(artifacts, hash) {
	using repo = await artifacts.get("starter-repo");
	return await repo.readBlob(hash);
}
```

```ts
async function readBlob(artifacts: Artifacts, hash: string) {
	using repo = await artifacts.get("starter-repo");
	return await repo.readBlob(hash);
}
```

### `readFile(args)`

- `args.ref` `string` required — Branch, tag, or commit ID.
- `args.path` `string` required — Non-empty repository-relative path.
- Returns `Promise<Blob | null>`
- Throws `INVALID_INPUT` if `ref` or `path` is empty.

`readFile()` returns a MIME-typed `Blob`. It returns `null` if the path does not exist or points to a directory.

```js
async function readReadme(artifacts) {
	using repo = await artifacts.get("starter-repo");
	const file = await repo.readFile({
		ref: "main",
		path: "README.md",
	});

	if (file === null) {
		return null;
	}

	return {
		content: await file.text(),
		contentType: file.type,
	};
}
```

```ts
async function readReadme(artifacts: Artifacts) {
	using repo = await artifacts.get("starter-repo");
	const file = await repo.readFile({
		ref: "main",
		path: "README.md",
	});

	if (file === null) {
		return null;
	}

	return {
		content: await file.text(),
		contentType: file.type,
	};
}
```

Tested MIME types include:

- Text: `text/plain;charset=utf-8`
- Unknown binary data: `application/octet-stream`

## Worker example

This example combines the binding methods in one Worker route.

*src/index.jsjs*

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
			using repo = await env.ARTIFACTS.get("starter-repo");
			const token = await repo.createToken("read", 3600);
			return Response.json(token);
		}

		if (request.method === "GET" && url.pathname === "/readme") {
			using repo = await env.ARTIFACTS.get("starter-repo");
			const file = await repo.readFile({
				ref: "main",
				path: "README.md",
			});

			if (file === null) {
				return new Response("Not found", { status: 404 });
			}

			return new Response(file, {
				headers: {
					"content-type": file.type,
				},
			});
		}

		return Response.json(
			{ message: "Use POST /repos, POST /tokens, or GET /readme." },
			{ status: 404 },
		);
	},
};
```

*src/index.tsts*

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
			using repo = await env.ARTIFACTS.get("starter-repo");
			const token = await repo.createToken("read", 3600);
			return Response.json(token);
		}

		if (request.method === "GET" && url.pathname === "/readme") {
			using repo = await env.ARTIFACTS.get("starter-repo");
			const file = await repo.readFile({
				ref: "main",
				path: "README.md",
			});

			if (file === null) {
				return new Response("Not found", { status: 404 });
			}

			return new Response(file, {
				headers: {
					"content-type": file.type,
				},
			});
		}

		return Response.json(
			{ message: "Use POST /repos, POST /tokens, or GET /readme." },
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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/api/workers-binding/#page","headline":"Workers binding","description":"Call Artifacts from a Worker binding.","url":"https://developers.cloudflare.com/artifacts/api/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/artifacts/api/workers-binding/og.png?v=8f6f94f63f1b3c24","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
