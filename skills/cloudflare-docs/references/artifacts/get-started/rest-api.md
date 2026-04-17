---
title: REST API
description: Create an Artifacts repo over HTTP.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/artifacts/get-started/rest-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# REST API

Create an Artifacts repo with the REST API, then use a regular Git client to push and pull content.

By the end of this guide, you will create a repo inside an existing namespace, read back the repo remote URL, push a commit, and clone the same repo with a standard Git client.

## Prerequisites

You need:

* A Cloudflare account with access to Artifacts.
* A [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Artifacts** \> **Edit**.
* An existing Artifacts namespace, for example `default`.
* A local `git` client.
* `jq`, if you want to extract response fields automatically.

For Workers-based access instead of direct HTTP calls, use the [Workers get started guide](https://developers.cloudflare.com/artifacts/get-started/workers/).

## 1\. Export your environment variables

Set the variables used in the examples:

Terminal window

```

export ARTIFACTS_NAMESPACE="default"

export ARTIFACTS_REPO="starter-repo"

export CLOUDFLARE_API_TOKEN="<YOUR_API_TOKEN>"

export ARTIFACTS_BASE_URL="https://artifacts.cloudflare.net/v1/api/namespaces/$ARTIFACTS_NAMESPACE"


```

Use a unique repo name each time you run this guide.

Artifacts uses Bearer authentication for control-plane requests:

```

Authorization: Bearer $CLOUDFLARE_API_TOKEN


```

## 2\. Create a repo

Choose one of the following ways to create a repo inside that namespace:

* [ Manual ](#tab-panel-5276)
* [ jq ](#tab-panel-5277)

Terminal window

```

curl --request POST "$ARTIFACTS_BASE_URL/repos" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data "{\"name\":\"$ARTIFACTS_REPO\"}"


```

The response resembles the following:

```

{

  "result": {

    "id": "repo_123",

    "name": "starter-repo",

    "description": null,

    "default_branch": "main",

    "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git",

    "token": "art_v1_0123456789abcdef0123456789abcdef01234567?expires=1760000000",

    "expires_at": "<ISO_TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

The REST control-plane base URL and the returned Git remote use different hosts. Use `result.remote` for Git operations.

Copy the `remote` and `token` values from `result` into local shell variables:

Terminal window

```

export ARTIFACTS_REMOTE="<PASTE_RESULT_REMOTE_FROM_RESPONSE>"

export ARTIFACTS_TOKEN="<PASTE_RESULT_TOKEN_FROM_RESPONSE>"


```

Capture the create response once and extract the fields with `jq`:

Terminal window

```

CREATE_RESPONSE=$(curl --silent --request POST "$ARTIFACTS_BASE_URL/repos" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data "{\"name\":\"$ARTIFACTS_REPO\"}")


export ARTIFACTS_REMOTE=$(printf '%s' "$CREATE_RESPONSE" | jq -r '.result.remote')

export ARTIFACTS_TOKEN=$(printf '%s' "$CREATE_RESPONSE" | jq -r '.result.token')


```

## 3\. Get the repo URL again

Fetch the repo metadata when you need to recover the remote URL later:

Terminal window

```

curl "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "id": "repo_123",

    "name": "starter-repo",

    "description": null,

    "default_branch": "main",

    "created_at": "<ISO_TIMESTAMP>",

    "updated_at": "<ISO_TIMESTAMP>",

    "last_push_at": null,

    "source": null,

    "read_only": false,

    "remote": "https://<ACCOUNT_ID>.artifacts.cloudflare.net/git/default/starter-repo.git"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

This endpoint returns repo metadata only. If you need a new repo token, mint one with `POST /tokens`.

## 4\. Push your first commit with git

Create a local repository and push it to the Artifacts remote:

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

## 5\. Pull the repo with a regular git client

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

## Next steps

[ REST API reference ](https://developers.cloudflare.com/artifacts/api/rest-api/) Review every repo and token endpoint with request and response examples. 

[ Git client example ](https://developers.cloudflare.com/artifacts/examples/git-client/) Use repo discovery and token minting with a standard Git client flow. 

[ Best practices ](https://developers.cloudflare.com/artifacts/concepts/best-practices/) Use repo isolation, least-privilege tokens, and namespace separation effectively. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/get-started/rest-api/","name":"REST API"}}]}
```
