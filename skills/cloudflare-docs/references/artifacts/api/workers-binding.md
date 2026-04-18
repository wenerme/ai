---
title: Workers binding
description: Call Artifacts from a Worker binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/artifacts/api/workers-binding.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Workers binding

Use the Artifacts Workers binding to create, import, inspect, fork, and delete repos directly from your Worker. The Artifacts binding returns repo handles that allow repo-scoped operations such as token management and forking.

## Configure the binding

Add the Artifacts binding to your Wrangler config file:

* [  wrangler.jsonc ](#tab-panel-5245)
* [  wrangler.toml ](#tab-panel-5246)

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

namespace = "default" # any name works — use namespaces to organise repos


```

After you run `npx wrangler types`, your Worker environment looks like this:

TypeScript

```

export interface Env {

  ARTIFACTS: Artifacts;

}


```

Wrangler generates the `Artifacts` type for consumers and binds it directly in your environment.

If you authenticate with `wrangler login`, Wrangler requests `artifacts:write` by default.

## Namespace methods

Use namespace methods on `env.ARTIFACTS` to create, list, inspect, import, or delete repos.

### `create(name, opts?)`

* `name` ` RepoName ` required
* `opts.readOnly` ` boolean ` optional
* `opts.description` ` string ` optional
* `opts.setDefaultBranch` ` string ` optional
* Returns ` Promise<ArtifactsCreateRepoResult> `

* [  JavaScript ](#tab-panel-5253)
* [  TypeScript ](#tab-panel-5254)

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

### `get(name)`

* `name` ` RepoName ` required
* Returns ` Promise<ArtifactsRepo> `
* Throws if the repo does not exist.

* [  JavaScript ](#tab-panel-5247)
* [  TypeScript ](#tab-panel-5248)

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

* [  JavaScript ](#tab-panel-5251)
* [  TypeScript ](#tab-panel-5252)

JavaScript

```

async function listRepos(artifacts) {

  const page = await artifacts.list({ limit: 10 });


  return {

    names: page.repos.map((repo) => repo.name),

    nextCursor: page.cursor ?? null,

  };

}


```

TypeScript

```

async function listRepos(artifacts: Artifacts) {

  const page = await artifacts.list({ limit: 10 });


  return {

    names: page.repos.map((repo) => repo.name),

    nextCursor: page.cursor ?? null,

  };

}


```

### `import(params)`

Import a repository from an external git remote.

* `params.source.url` ` string ` required — HTTPS URL of the source repository.
* `params.source.branch` ` string ` optional — Branch to import (defaults to the remote's default branch).
* `params.source.depth` ` number ` optional — Shallow clone depth.
* `params.target.name` ` RepoName ` required — Name for the imported repo.
* `params.target.opts.description` ` string ` optional
* `params.target.opts.readOnly` ` boolean ` optional
* Returns ` Promise<ArtifactsCreateRepoResult> `

* [  JavaScript ](#tab-panel-5263)
* [  TypeScript ](#tab-panel-5264)

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

### `delete(name)`

* `name` ` RepoName ` required
* Returns ` Promise<boolean> `

* [  JavaScript ](#tab-panel-5249)
* [  TypeScript ](#tab-panel-5250)

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

* [  JavaScript ](#tab-panel-5255)
* [  TypeScript ](#tab-panel-5256)

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

* [  JavaScript ](#tab-panel-5257)
* [  TypeScript ](#tab-panel-5258)

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

### `listTokens()`

* Returns ` Promise<ArtifactsTokenListResult> `

* [  JavaScript ](#tab-panel-5261)
* [  TypeScript ](#tab-panel-5262)

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

* [  JavaScript ](#tab-panel-5259)
* [  TypeScript ](#tab-panel-5260)

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

* [  JavaScript ](#tab-panel-5265)
* [  TypeScript ](#tab-panel-5266)

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

* [  JavaScript ](#tab-panel-5267)
* [  TypeScript ](#tab-panel-5268)

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
