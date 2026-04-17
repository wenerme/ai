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

Use the Artifacts Workers binding to create, inspect, fork, and delete repos directly from your Worker. The Artifacts binding returns repo handles that allow repo-scoped operations such as token management and forking.

Use the [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/) when you need to import a repo from another remote.

## Configure the binding

Add the Artifacts binding to your Wrangler config file:

* [  wrangler.jsonc ](#tab-panel-5236)
* [  wrangler.toml ](#tab-panel-5237)

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

namespace = "default"


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

Use namespace methods on `env.ARTIFACTS` to create, list, inspect, or delete repos.

### `create(name, opts?)`

* `name` ` RepoName ` required
* `opts.readOnly` ` boolean ` optional
* `opts.description` ` string ` optional
* `opts.setDefaultBranch` ` string ` optional
* Returns ` Promise<ArtifactsCreateRepoResult & { repo: ArtifactsRepo } > `

* [  JavaScript ](#tab-panel-5244)
* [  TypeScript ](#tab-panel-5245)

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
* Returns ` Promise<ArtifactsRepo | null> `

* [  JavaScript ](#tab-panel-5240)
* [  TypeScript ](#tab-panel-5241)

JavaScript

```

async function getRepoHandle(artifacts) {

  const repo = await artifacts.get("starter-repo");


  if (!repo) {

    return null;

  }


  return repo;

}


```

TypeScript

```

async function getRepoHandle(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");


  if (!repo) {

    return null;

  }


  return repo;

}


```

### `list(opts?)`

* `opts.limit` ` number ` optional
* `opts.cursor` ` Cursor ` optional
* Returns ` Promise<ArtifactsRepoListResult> `

* [  JavaScript ](#tab-panel-5242)
* [  TypeScript ](#tab-panel-5243)

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

### `delete(name)`

* `name` ` RepoName ` required
* Returns ` Promise<boolean> `

* [  JavaScript ](#tab-panel-5238)
* [  TypeScript ](#tab-panel-5239)

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

Use the `repo` returned by `create()`, or first check that `await artifacts.get(name)` returned a repo handle.

These examples match the current runtime binding surface. If your generated types show `import()` or a discriminated union for `get()`, those types are ahead of the current runtime.

### `info()`

* Returns ` Promise<ArtifactsRepoInfo | null> `

Use `info()` when you need repo metadata, including the remote URL.

* [  JavaScript ](#tab-panel-5246)
* [  TypeScript ](#tab-panel-5247)

JavaScript

```

async function getRemoteUrl(artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    return null;

  }


  const info = await repo.info();

  return info?.remote ?? null;

}


```

TypeScript

```

async function getRemoteUrl(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    return null;

  }


  const info = await repo.info();

  return info?.remote ?? null;

}


```

### `createToken(scope?, ttl?)`

* `scope` ` "read" | "write" ` optional (default: "write")
* `ttl` ` number ` optional (seconds)
* Returns ` Promise<ArtifactsCreateTokenResult> `

* [  JavaScript ](#tab-panel-5248)
* [  TypeScript ](#tab-panel-5249)

JavaScript

```

async function mintReadToken(artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  return repo.createToken("read", 3600);

}


```

TypeScript

```

async function mintReadToken(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  return repo.createToken("read", 3600);

}


```

### `validateToken(token)`

* `token` ` ArtifactToken ` required
* Returns ` Promise<ArtifactsTokenValidation> `

* [  JavaScript ](#tab-panel-5250)
* [  TypeScript ](#tab-panel-5251)

JavaScript

```

async function validateToken(artifacts, token) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  return repo.validateToken(token);

}


```

TypeScript

```

async function validateToken(artifacts: Artifacts, token: string) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  return repo.validateToken(token);

}


```

### `listTokens()`

* Returns ` Promise<ArtifactsTokenListResult> `

* [  JavaScript ](#tab-panel-5254)
* [  TypeScript ](#tab-panel-5255)

JavaScript

```

async function listRepoTokens(artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  const result = await repo.listTokens();

  return {

    total: result.total,

    tokens: result.tokens,

  };

}


```

Explain Code

TypeScript

```

async function listRepoTokens(artifacts: Artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  const result = await repo.listTokens();

  return {

    total: result.total,

    tokens: result.tokens,

  };

}


```

Explain Code

### `revokeToken(tokenOrId)`

* `tokenOrId` ` string ` required
* Returns ` Promise<boolean> `

* [  JavaScript ](#tab-panel-5252)
* [  TypeScript ](#tab-panel-5253)

JavaScript

```

async function revokeToken(artifacts, tokenOrId) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  return repo.revokeToken(tokenOrId);

}


```

TypeScript

```

async function revokeToken(artifacts: Artifacts, tokenOrId: string) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


  return repo.revokeToken(tokenOrId);

}


```

### `fork(name, opts?)`

* `name` ` RepoName ` required
* `opts.description` ` string ` optional
* `opts.readOnly` ` boolean ` optional
* `opts.defaultBranchOnly` ` boolean ` optional
* Returns ` Promise<ArtifactsCreateRepoResult> `

* [  JavaScript ](#tab-panel-5256)
* [  TypeScript ](#tab-panel-5257)

JavaScript

```

async function forkRepo(artifacts) {

  const repo = await artifacts.get("starter-repo");

  if (!repo) {

    throw new Error("Repo not found");

  }


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

  if (!repo) {

    throw new Error("Repo not found");

  }


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

* [  JavaScript ](#tab-panel-5258)
* [  TypeScript ](#tab-panel-5259)

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

      if (!repo) {

        return Response.json({ error: "Repo not found" }, { status: 404 });

      }

      const info = await repo.info();

      return Response.json(info);

    }


    if (request.method === "POST" && url.pathname === "/tokens") {

      const repo = await env.ARTIFACTS.get("starter-repo");

      if (!repo) {

        return Response.json({ error: "Repo not found" }, { status: 404 });

      }


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

      if (!repo) {

        return Response.json({ error: "Repo not found" }, { status: 404 });

      }

      const info = await repo.info();

      return Response.json(info);

    }


    if (request.method === "POST" && url.pathname === "/tokens") {

      const repo = await env.ARTIFACTS.get("starter-repo");

      if (!repo) {

        return Response.json({ error: "Repo not found" }, { status: 404 });

      }


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
