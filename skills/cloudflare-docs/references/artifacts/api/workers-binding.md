---
title: Workers binding
description: Call Artifacts from a Worker binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Workers binding

Use the Artifacts Workers binding to create, import, inspect, fork, and delete repos directly from your Worker. The Artifacts binding returns repo handles that allow repo-scoped operations such as token management and forking.

Review [Namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/) first, then choose the namespace name you will bind here.

## Configure the binding

Add the Artifacts binding to your Wrangler config file:

* [  wrangler.jsonc ](#tab-panel-5463)
* [  wrangler.toml ](#tab-panel-5464)

JSONC

```

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

TOML

```

[[artifacts]]

binding = "ARTIFACTS"

namespace = "default" # replace with your Artifacts namespace

# remote = true # optional: use the remote Artifacts service in local dev


```

After you run `npx wrangler types`, your Worker environment looks like this:

TypeScript

```

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

* `name` ` RepoName ` required
* `opts.readOnly` ` boolean ` optional
* `opts.description` ` string ` optional
* `opts.setDefaultBranch` ` string ` optional
* Returns ` Promise<ArtifactsCreateRepoResult> `

* [  JavaScript ](#tab-panel-5469)
* [  TypeScript ](#tab-panel-5470)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

The returned token encodes its expiry directly in the `?expires=` suffix.

### `get(name)`

* `name` ` RepoName ` required
* Returns ` Promise<ArtifactsRepo> `
* Throws if the repo does not exist or is not ready yet.

* [  JavaScript ](#tab-panel-5465)
* [  TypeScript ](#tab-panel-5466)

JavaScript

```

async function getRepoHandle(artifacts) {

  const repo = await artifacts.get("starter-repo");

  return repo;

}


```

TypeScript

```

async function getRepoHandle(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");

  return repo;

}


```

### `list(opts?)`

* `opts.limit` ` number ` optional
* `opts.cursor` ` Cursor ` optional
* Returns ` Promise<ArtifactsRepoListResult> `

* [  JavaScript ](#tab-panel-5473)
* [  TypeScript ](#tab-panel-5474)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

Each listed repo includes a `status` value of `ready`, `importing`, or `forking`.

### `import(params)`

Import a repository from an external git remote.

* `params.source.url` ` string ` required — HTTPS URL of the source repository.
* `params.source.branch` ` string ` optional — Branch to import (defaults to the remote's default branch).
* `params.source.depth` ` number ` optional — Shallow clone depth.
* `params.target.name` ` RepoName ` required — Name for the imported repo.
* `params.target.opts.description` ` string ` optional
* `params.target.opts.readOnly` ` boolean ` optional
* Returns ` Promise<ArtifactsCreateRepoResult> `

* [  JavaScript ](#tab-panel-5481)
* [  TypeScript ](#tab-panel-5482)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

Imported repos return the same create-style token format. The token encodes its expiry directly in the `?expires=` suffix.

### `delete(name)`

* `name` ` RepoName ` required
* Returns ` Promise<boolean> `

* [  JavaScript ](#tab-panel-5467)
* [  TypeScript ](#tab-panel-5468)

JavaScript

```

async function deleteRepo(artifacts) {

  return artifacts.delete("starter-repo");

}


```

TypeScript

```

async function deleteRepo(artifacts: Artifacts) {

  return artifacts.delete("starter-repo");

}


```

## Repo handle methods

Call `await artifacts.get(name)` to get a repo handle. The handle extends `ArtifactsRepoInfo`, so repo metadata (`id`, `name`, `remote`, `defaultBranch`, etc.) is available directly as properties.

* [  JavaScript ](#tab-panel-5471)
* [  TypeScript ](#tab-panel-5472)

JavaScript

```

async function getRemoteUrl(artifacts) {

  const repo = await artifacts.get("starter-repo");

  return repo.remote;

}


```

TypeScript

```

async function getRemoteUrl(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");

  return repo.remote;

}


```

### `createToken(scope?, ttl?)`

* `scope` ` "read" | "write" ` optional (default: "write")
* `ttl` ` number ` optional (seconds)
* Returns ` Promise<ArtifactsCreateTokenResult> `

* [  JavaScript ](#tab-panel-5475)
* [  TypeScript ](#tab-panel-5476)

JavaScript

```

async function mintReadToken(artifacts) {

  const repo = await artifacts.get("starter-repo");

  return repo.createToken("read", 3600);

}


```

TypeScript

```

async function mintReadToken(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");

  return repo.createToken("read", 3600);

}


```

Unlike `create()` and `import()`, `repo.createToken()` returns a structured result with `plaintext` and `expiresAt`. The `plaintext` value is the Git token string.

### `listTokens()`

* Returns ` Promise<ArtifactsTokenListResult> `

* [  JavaScript ](#tab-panel-5479)
* [  TypeScript ](#tab-panel-5480)

JavaScript

```

async function listRepoTokens(artifacts) {

  const repo = await artifacts.get("starter-repo");

  const result = await repo.listTokens();

  return {

    total: result.total,

    tokens: result.tokens,

  };

}


```

TypeScript

```

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

* `tokenOrId` ` string ` required
* Returns ` Promise<boolean> `

* [  JavaScript ](#tab-panel-5477)
* [  TypeScript ](#tab-panel-5478)

JavaScript

```

async function revokeToken(artifacts, tokenOrId) {

  const repo = await artifacts.get("starter-repo");

  return repo.revokeToken(tokenOrId);

}


```

TypeScript

```

async function revokeToken(artifacts: Artifacts, tokenOrId: string) {

  const repo = await artifacts.get("starter-repo");

  return repo.revokeToken(tokenOrId);

}


```

### `fork(name, opts?)`

* `name` ` RepoName ` required
* `opts.description` ` string ` optional
* `opts.readOnly` ` boolean ` optional
* `opts.defaultBranchOnly` ` boolean ` optional
* Returns ` Promise<ArtifactsCreateRepoResult> `

* [  JavaScript ](#tab-panel-5483)
* [  TypeScript ](#tab-panel-5484)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Worker example

This example combines the binding methods in one Worker route.

* [  JavaScript ](#tab-panel-5485)
* [  TypeScript ](#tab-panel-5486)

src/index.js

```

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


    if (request.method === "GET" && url.pathname === "/repos/starter-repo") {

      const repo = await env.ARTIFACTS.get("starter-repo");

      return Response.json({

        id: repo.id,

        name: repo.name,

        remote: repo.remote,

        defaultBranch: repo.defaultBranch,

      });

    }


    if (request.method === "POST" && url.pathname === "/tokens") {

      const repo = await env.ARTIFACTS.get("starter-repo");

      const token = await repo.createToken("read", 3600);

      return Response.json(token);

    }


    return Response.json(

      { message: "Use POST /repos, GET /repos/starter-repo, or POST /tokens." },

      { status: 404 },

    );

  },

};


```

Explain Code

src/index.ts

```

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


    if (request.method === "GET" && url.pathname === "/repos/starter-repo") {

      const repo = await env.ARTIFACTS.get("starter-repo");

      return Response.json({

        id: repo.id,

        name: repo.name,

        remote: repo.remote,

        defaultBranch: repo.defaultBranch,

      });

    }


    if (request.method === "POST" && url.pathname === "/tokens") {

      const repo = await env.ARTIFACTS.get("starter-repo");

      const token = await repo.createToken("read", 3600);

      return Response.json(token);

    }


    return Response.json(

      { message: "Use POST /repos, GET /repos/starter-repo, or POST /tokens." },

      { status: 404 },

    );

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Protect token routes

This example omits authentication so it can focus on the binding surface. In production, authorize the caller before creating repos or returning tokens.

## Generated types

Run `npx wrangler types` in your own project and treat the generated `worker-configuration.d.ts` file as the source of truth for the Artifacts binding types in that environment.

## Next steps

[ REST API ](https://developers.cloudflare.com/artifacts/api/rest-api/) Compare the binding methods with the underlying HTTP routes. 

[ Get started with Workers ](https://developers.cloudflare.com/artifacts/get-started/workers/) Use the binding in a full Worker project from local development through deploy. 

[ Git protocol ](https://developers.cloudflare.com/artifacts/api/git-protocol/) Use repo remotes and tokens with standard git-over-HTTPS clients. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/api/workers-binding/","name":"Workers binding"}}]}
```
