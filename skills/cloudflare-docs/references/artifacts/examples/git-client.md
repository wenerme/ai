---
title: Git client
description: Example Artifacts integration with a Git client.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/artifacts/examples/git-client.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Git client

Use this pattern when you want to discover a repo over the REST API and then hand the returned HTTPS remote to a standard Git client.

This example assumes the repo already exists and that you have a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Artifacts** \> **Edit**.

## Fetch the remote and clone the repo

First, fetch the repo metadata from the REST API. Then mint a read token for that repo and use the returned remote with `git clone`.

The example below uses `jq` to extract fields from the JSON responses.

Terminal window

```

export ARTIFACTS_NAMESPACE="default"

export ARTIFACTS_REPO="starter-repo"

export CLOUDFLARE_API_TOKEN="<YOUR_API_TOKEN>"

export ARTIFACTS_BASE_URL="https://artifacts.cloudflare.net/v1/api/namespaces/$ARTIFACTS_NAMESPACE"


REPO_JSON=$(curl --silent "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN")


ARTIFACTS_REMOTE=$(printf '%s' "$REPO_JSON" | jq -r '.result.remote')


TOKEN_JSON=$(curl --silent "$ARTIFACTS_BASE_URL/tokens" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data "{\"repo\":\"$ARTIFACTS_REPO\",\"scope\":\"read\",\"ttl\":3600}")


ARTIFACTS_TOKEN=$(printf '%s' "$TOKEN_JSON" | jq -r '.result.plaintext')


git -c http.extraHeader="Authorization: Bearer $ARTIFACTS_TOKEN" clone "$ARTIFACTS_REMOTE" artifacts-clone


```

Explain Code

This flow is useful when another system owns repo discovery or access control, but your local tooling still expects a normal git remote.

Treat `ARTIFACTS_TOKEN` as a secret. Keep it out of logs, and prefer `http.extraHeader` over saving credentials in a remote URL.

If you need a self-contained remote URL for a short-lived workflow, extract the token secret and build the authenticated remote only for that command:

Terminal window

```

ARTIFACTS_TOKEN_SECRET="${ARTIFACTS_TOKEN%%\?expires=*}"

ARTIFACTS_AUTH_REMOTE="https://x:${ARTIFACTS_TOKEN_SECRET}@${ARTIFACTS_REMOTE#https://}"


git clone "$ARTIFACTS_AUTH_REMOTE" artifacts-clone


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/examples/git-client/","name":"Git client"}}]}
```
