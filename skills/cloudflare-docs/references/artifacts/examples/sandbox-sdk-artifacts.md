---
title: Sandbox SDK + Artifacts
description: Connect a sandbox to an Artifacts repo.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/artifacts/examples/sandbox-sdk-artifacts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Sandbox SDK + Artifacts

This example uses the `git-repo-per-sandbox` Sandbox SDK template and highlights the Artifacts-specific pieces.

Start from the template with `create cloudflare`, as shown in [Run Claude Code on a Sandbox](https://developers.cloudflare.com/sandbox/tutorials/claude-code/#1-create-your-project). Then adapt the Artifacts flow with the focused snippets below.

* Creates or reuses a sandbox by ID.
* Creates or reuses an Artifacts repo with the same ID.
* Passes an authenticated Git remote into the sandbox as `ARTIFACTS_GIT_REMOTE`.

## Create your project

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- repo-per-sandbox --template=cloudflare/sandbox-sdk/examples/git-repo-per-sandbox
```

```
yarn create cloudflare repo-per-sandbox --template=cloudflare/sandbox-sdk/examples/git-repo-per-sandbox
```

```
pnpm create cloudflare@latest repo-per-sandbox --template=cloudflare/sandbox-sdk/examples/git-repo-per-sandbox
```

Terminal window

```

cd repo-per-sandbox


```

## 1\. Create or reuse the repo

The template keeps one Artifacts repo per sandbox ID:

* [  JavaScript ](#tab-panel-5274)
* [  TypeScript ](#tab-panel-5275)

src/index.js

```

const repo = await env.ARTIFACTS.get(sandboxId);


let defaultBranch;

let remote;

let token;


if (repo) {

  const info = await repo.info();

  if (!info) {

    throw new Error("Repo metadata not found");

  }


  defaultBranch = info.defaultBranch;

  remote = info.remote;

  token = (await repo.createToken("write", 3600)).plaintext;

} else {

  const created = await env.ARTIFACTS.create(sandboxId);


  defaultBranch = created.defaultBranch;

  remote = created.remote;

  token = created.token;

}


```

Explain Code

src/index.ts

```

const repo = await env.ARTIFACTS.get(sandboxId);


let defaultBranch: string;

let remote: string;

let token: string;


if (repo) {

  const info = await repo.info();

  if (!info) {

    throw new Error("Repo metadata not found");

  }


  defaultBranch = info.defaultBranch;

  remote = info.remote;

  token = (await repo.createToken("write", 3600)).plaintext;

} else {

  const created = await env.ARTIFACTS.create(sandboxId);


  defaultBranch = created.defaultBranch;

  remote = created.remote;

  token = created.token;

}


```

Explain Code

## 2\. Create or reuse the sandbox

Use the same ID for the sandbox:

* [  JavaScript ](#tab-panel-5270)
* [  TypeScript ](#tab-panel-5271)

src/index.js

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, sandboxId);


```

src/index.ts

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, sandboxId);


```

## 3\. Pass the repo into the sandbox

Convert the write token into an authenticated Git remote, then store it as an environment variable inside the sandbox.

Use a short-lived token and pass it into the sandbox only after the sandbox session is authorized to push changes.

* [  JavaScript ](#tab-panel-5272)
* [  TypeScript ](#tab-panel-5273)

src/index.js

```

function toAuthenticatedRemote(remote, token) {

  const tokenSecret = token.split("?expires=")[0];

  return `https://x:${tokenSecret}@${remote.slice("https://".length)}`;

}


await sandbox.setEnvVars({

  ARTIFACTS_GIT_REMOTE: toAuthenticatedRemote(remote, token),

});


```

src/index.ts

```

function toAuthenticatedRemote(remote: string, token: string) {

  const tokenSecret = token.split("?expires=")[0];

  return `https://x:${tokenSecret}@${remote.slice("https://".length)}`;

}


await sandbox.setEnvVars({

  ARTIFACTS_GIT_REMOTE: toAuthenticatedRemote(remote, token),

});


```

Code running inside the sandbox can then use `ARTIFACTS_GIT_REMOTE` with `git clone`, `git fetch`, `git pull`, or `git push`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/examples/sandbox-sdk-artifacts/","name":"Sandbox SDK + Artifacts"}}]}
```
