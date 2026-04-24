---
title: Workers
description: Create an Artifacts repo from a Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/artifacts/get-started/workers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Workers

Create an Artifacts repo from a Worker and use a standard Git client to push and pull content.

By the end of this guide, you will create a Worker, bind it to Artifacts, create a repo through the Workers binding, push a commit, and clone the same repo back with a standard Git client.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You also need:

* Wrangler authenticated with `wrangler login`.
* Access to Artifacts in your Cloudflare account.
* An existing Artifacts namespace, for example `default`.
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

* [  wrangler.jsonc ](#tab-panel-5497)
* [  wrangler.toml ](#tab-panel-5498)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "artifacts-worker",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-04-24",

  "artifacts": [

    {

      "binding": "ARTIFACTS",

      "namespace": "default"

    }

  ]

}


```

Explain Code

TOML

```

name = "artifacts-worker"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-04-24"


[[artifacts]]

binding = "ARTIFACTS"

namespace = "default"


```

This exposes Artifacts as `env.ARTIFACTS` inside your Worker.

If you authenticate with `wrangler login`, Wrangler requests `artifacts:write` by default.

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

* [  JavaScript ](#tab-panel-5499)
* [  TypeScript ](#tab-panel-5500)

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

      // Read the repo name from the request body so the route is reusable.

      const body = (await request.json().catch(() => ({}))) as {

        name?: string;

      };

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

} satisfies ExportedHandler<Env>;


```

Explain Code

This Worker does one job: create an Artifacts repo and return the values your Git client needs next.

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

In a second terminal, choose one of the following ways to create a repo through your Worker.

If you rerun this guide, use a different repo name in the request body.

* [ Manual ](#tab-panel-5495)
* [ jq ](#tab-panel-5496)

Terminal window

```

curl http://localhost:8787/repos \

  --header "Content-Type: application/json" \

  --data '{

    "name": "starter-repo"

  }'


```

The response resembles the following:

```

{

  "name": "starter-repo",

  "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git",

  "token": "art_v1_0123456789abcdef0123456789abcdef01234567?expires=1760000000"

}


```

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


printf '%s\n' "$RESPONSE"


export ARTIFACTS_REMOTE=$(printf '%s' "$RESPONSE" | jq -r '.remote')

export ARTIFACTS_TOKEN=$(printf '%s' "$RESPONSE" | jq -r '.token')


```

## 5\. Push your first commit with git

Create a local repository and push it to Artifacts:

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

This uses the recommended header-based form and keeps the token out of the remote URL.

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
