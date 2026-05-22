---
title: Workers
description: Create an Artifacts repo from a Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers

Create an Artifacts repo from a Worker and use a standard Git client to push and pull content.

By the end of this guide, you will create a Worker, bind it to Artifacts, create a repo through the Workers binding, push a commit, and clone the same repo back with a standard Git client.

Start by reading [Namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/), then choose the namespace name you will use. This guide uses `default` in the examples.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You also need:

* Wrangler installed. If you use local Wrangler commands in this guide, authenticate Wrangler first. For local OAuth authentication or CI setup, refer to [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) and [Running Wrangler in CI/CD](https://developers.cloudflare.com/workers/ci-cd/).
* Access to Artifacts in your Cloudflare account.
* A namespace name, for example `default`.
* A local `git` client.
* `jq`, if you want to extract response fields automatically.

## 1\. Create a Worker project

1. Create a new Worker project with C3:  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- artifacts-worker  
```  
```  
yarn create cloudflare artifacts-worker  
```  
```  
pnpm create cloudflare@latest artifacts-worker  
```  
For setup, select the following options:  
   * For _What would you like to start with?_, choose `Hello World example`.  
   * For _Which template would you like to use?_, choose `Worker only`.  
   * For _Which language do you want to use?_, choose `TypeScript`.  
   * For _Do you want to use git for version control?_, choose `Yes`.  
   * For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).
2. Move into the project directory:  
Terminal window  
```  
cd artifacts-worker  
```

## 2\. Add the Artifacts binding

Open your Wrangler config file and add the Artifacts binding:

* [  wrangler.jsonc ](#tab-panel-4799)
* [  wrangler.toml ](#tab-panel-4800)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "artifacts-worker",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-05-21",

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

name = "artifacts-worker"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-05-21"


[[artifacts]]

binding = "ARTIFACTS"

namespace = "default"

# Set remote = true if you want Wrangler to use the remote Artifacts service in local dev.


```

This exposes Artifacts as `env.ARTIFACTS` inside your Worker.

If you are using TypeScript, regenerate your local binding types:

 npm  yarn  pnpm 

```
npx wrangler types
```

```
yarn wrangler types
```

```
pnpm wrangler types
```

Wrangler adds an `Artifacts` type to your generated `worker-configuration.d.ts` file.

## 3\. Write your Worker

Replace `src/index.ts` with the following code:

* [  JavaScript ](#tab-panel-4801)
* [  TypeScript ](#tab-panel-4802)

src/index.js

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    if (request.method === "POST" && url.pathname === "/repos") {

      // Read the repo name from the request body so the route is reusable.

      const body = await request.json().catch(() => ({}));


      const repoName = body.name ?? "starter-repo";


      // Create the repo and return the remote URL plus initial write token.

      const created = await env.ARTIFACTS.create(repoName);


      return Response.json({

        name: created.name,

        remote: created.remote,

        token: created.token,

      });

    }


    return new Response("Use POST /repos to create an Artifacts repo.", {

      status: 405,

      headers: { Allow: "POST" },

    });

  },

};


```

src/index.ts

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    if (request.method === "POST" && url.pathname === "/repos") {

      // Read the repo name from the request body so the route is reusable.

      const body = await request.json().catch(() => ({}));


      const repoName = body.name ?? "starter-repo";


      // Create the repo and return the remote URL plus initial write token.

      const created = await env.ARTIFACTS.create(repoName);


      return Response.json({

        name: created.name,

        remote: created.remote,

        token: created.token,

      });

    }


    return new Response("Use POST /repos to create an Artifacts repo.", {

      status: 405,

      headers: { Allow: "POST" },

    });

  },

};


```

This Worker creates an Artifacts repo and returns the remote URL and token your Git client needs to push and pull.

Protect token-issuing routes

This example omits authentication so it can focus on the Artifacts flow. In production, authorize the caller before creating repos or returning write tokens.

For the demo, the Worker returns the initial write token. In production, mint short-lived read tokens for clone and pull flows, and mint write tokens only for operations that need push access.

## 4\. Invoke your Worker to create a repo

Start local development:

 npm  yarn  pnpm 

```
npx wrangler dev
```

```
yarn wrangler dev
```

```
pnpm wrangler dev
```

Then, open a second terminal and send a request to your Worker to create a new Artifacts repo:

* [ Manual ](#tab-panel-4797)
* [ jq ](#tab-panel-4798)

Terminal window

```

curl http://localhost:8787/repos \

  --header "Content-Type: application/json" \

  --data '{

    "name": "starter-repo"

  }'


```

Your Worker will call `env.ARTIFACTS.create()` and return three values you will need for Git operations:

```

{

  "name": "starter-repo",

  "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git",

  "token": "art_v1_0123456789abcdef0123456789abcdef01234567?expires=1760000000"

}


```

* `name`: the repo name. Must be unique within the namespace.
* `remote`: the Git remote URL for this repo. `<ACCOUNT_ID>` will be your actual Cloudflare account ID.
* `token`: a short-lived credential for Git operations. The token encodes its expiry directly in the `?expires=` suffix as a Unix timestamp.

Copy the `remote` and `token` values into local shell variables:

Terminal window

```

export ARTIFACTS_REMOTE="<PASTE_REMOTE_FROM_RESPONSE>"

export ARTIFACTS_TOKEN="<PASTE_TOKEN_FROM_RESPONSE>"


```

Terminal window

```

RESPONSE=$(curl --silent http://localhost:8787/repos \

  --header "Content-Type: application/json" \

  --data '{"name":"starter-repo"}')


export ARTIFACTS_REMOTE=$(printf '%s' "$RESPONSE" | jq -r '.remote')

export ARTIFACTS_TOKEN=$(printf '%s' "$RESPONSE" | jq -r '.token')


```

## 5\. Push your first commit with git

In the previous step, your Worker created an empty Artifacts repo. Now you will create a local Git repo, add a file, and push it to Artifacts — the same way you would push to any Git remote.

Terminal window

```

mkdir artifacts-demo

cd artifacts-demo

git init -b main

printf '# Artifacts demo\n' > README.md

git add README.md

git commit -m "Initial commit"

git remote add origin "$ARTIFACTS_REMOTE"

git -c http.extraHeader="Authorization: Bearer $ARTIFACTS_TOKEN" push -u origin main


```

The `-c http.extraHeader` flag passes the token as a request header, which keeps it out of your Git config and shell history.

If you need a self-contained remote URL for a short-lived command, build one from the token secret instead:

Terminal window

```

export ARTIFACTS_TOKEN_SECRET="${ARTIFACTS_TOKEN%%\?expires=*}"

export ARTIFACTS_AUTH_REMOTE="https://x:${ARTIFACTS_TOKEN_SECRET}@${ARTIFACTS_REMOTE#https://}"

git push "$ARTIFACTS_AUTH_REMOTE" HEAD:main


```

## 6\. Pull the repo with a regular Git client

Clone the same repo into a second directory:

Terminal window

```

cd ..

git -c http.extraHeader="Authorization: Bearer $ARTIFACTS_TOKEN" clone "$ARTIFACTS_REMOTE" artifacts-clone

git -C artifacts-clone log --oneline -1


```

You should see the commit you pushed in the previous step.

You can also clone with a self-contained remote URL for a short-lived command:

Terminal window

```

git clone "$ARTIFACTS_AUTH_REMOTE" artifacts-clone


```

## 7\. Deploy your Worker

Switch back to your Worker project directory:

Terminal window

```

cd artifacts-worker


```

Deploy the Worker so you can create repos without running `wrangler dev`:

 npm  yarn  pnpm 

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

Wrangler prints your `workers.dev` URL. Use the same `curl` request against that URL to create additional repos from production.

## Next steps

[ Workers binding reference ](https://developers.cloudflare.com/artifacts/api/workers-binding/) Review the binding surface, return types, and method-by-method examples. 

[ Best practices ](https://developers.cloudflare.com/artifacts/concepts/best-practices/) Use repo isolation, least-privilege tokens, and namespace separation effectively. 

[ Git protocol ](https://developers.cloudflare.com/artifacts/api/git-protocol/) Use standard git-over-HTTPS remotes with either URL-based auth or \`http.extraHeader\`. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/get-started/workers/","name":"Workers"}}]}
```
