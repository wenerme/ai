---
title: Sandbox SDK + Artifacts
description: Connect a sandbox to an Artifacts repo.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

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

The template keeps one Artifacts repo per sandbox ID. Use your own source of truth to decide whether this request should create a new repo or load an existing one.

* [  JavaScript ](#tab-panel-4337)
* [  TypeScript ](#tab-panel-4338)

src/index.js

```

let defaultBranch;

let remote;

let token;

const sandboxWasJustCreated = true; // for example, set this when you create a new sandbox record


if (sandboxWasJustCreated) {

  const created = await env.ARTIFACTS.create(sandboxId);


  defaultBranch = created.defaultBranch;

  remote = created.remote;

  token = created.token;

} else {

  const repo = await env.ARTIFACTS.get(sandboxId);


  defaultBranch = repo.defaultBranch;

  remote = repo.remote;

  token = (await repo.createToken("write", 3600)).plaintext;

}


```

src/index.ts

```

let defaultBranch: string;

let remote: string;

let token: string;

const sandboxWasJustCreated = true; // for example, set this when you create a new sandbox record


if (sandboxWasJustCreated) {

  const created = await env.ARTIFACTS.create(sandboxId);


  defaultBranch = created.defaultBranch;

  remote = created.remote;

  token = created.token;

} else {

  const repo = await env.ARTIFACTS.get(sandboxId);


  defaultBranch = repo.defaultBranch;

  remote = repo.remote;

  token = (await repo.createToken("write", 3600)).plaintext;

}


```

The template already knows the repo name, so start with direct lookup instead of scanning `list()` pages. Avoid broad `catch` blocks here. They can hide missing-repo, auth, and validation failures behind the same retry message.

If your flow can race with repo creation, handle that retry at the application level after you inspect the thrown error.

## 2\. Create or reuse the sandbox

Use the same ID for the sandbox:

* [  JavaScript ](#tab-panel-4333)
* [  TypeScript ](#tab-panel-4334)

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

* [  JavaScript ](#tab-panel-4335)
* [  TypeScript ](#tab-panel-4336)

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
