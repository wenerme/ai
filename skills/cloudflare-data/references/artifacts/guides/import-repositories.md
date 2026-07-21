---
description: Import existing Git repos into Artifacts.
title: Import repositories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

#  Import repositories

Last updated Apr 25, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/artifacts/guides/import-repositories/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Import an existing repository when you already have a baseline outside Artifacts and want to start using it as an Artifacts repo.

This works well for:

* a baseline repo that agents fork from
* a template repo for new sessions or users
* a shared prompts or configuration repo used across workflows

Artifacts imports public HTTPS remotes through the [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/#import-a-public-https-remote) or the [Workers binding](https://developers.cloudflare.com/artifacts/api/workers-binding/#importparams). After import, the repo has a normal Artifacts remote URL and can be cloned, forked, or issued repo-scoped tokens like any other repo.

Review [Namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/) first, then use one namespace name consistently across your import workflow.

## Import a public HTTPS repo

This example imports a public GitHub repo into the `default` namespace. You can use the same flow with other public HTTPS Git remotes.

Use a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Artifacts** \> **Edit**.

This example uses `jq` to extract the returned fields.

```sh
export ACCOUNT_ID="<YOUR_ACCOUNT_ID>"
export ARTIFACTS_NAMESPACE="default"
export ARTIFACTS_REPO="workers-sdk-baseline"
export CLOUDFLARE_API_TOKEN="<YOUR_API_TOKEN>"
export ARTIFACTS_BASE_URL="https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/artifacts/namespaces/$ARTIFACTS_NAMESPACE"
```

```bash
IMPORT_RESPONSE=$(curl --silent --request POST "$ARTIFACTS_BASE_URL/repos/$ARTIFACTS_REPO/import" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
     "url": "https://github.com/cloudflare/workers-sdk",
     "branch": "main",
     "depth": 100
   }')

if ! printf '%s' "$IMPORT_RESPONSE" | jq -e '.success == true' > /dev/null; then
  printf '%s\n' "$IMPORT_RESPONSE" | jq .
  exit 1
fi

export ARTIFACTS_REMOTE=$(printf '%s' "$IMPORT_RESPONSE" | jq -r '.result.remote')
export ARTIFACTS_TOKEN=$(printf '%s' "$IMPORT_RESPONSE" | jq -r '.result.token')
```

The response includes the new Artifacts repo metadata, including `result.remote` and `result.token`.

If the request fails, this check prints the API response and exits before it exports empty values.

The token encodes its expiry directly in the `?expires=` suffix.

Treat `result.token` as a secret. Do not log it or store it in a long-lived remote URL unless your workflow requires it.

An import can still be in progress after this request returns. If follow-up REST calls return `409 Conflict`, retry after a short delay.

## Use the imported repo

After the import finishes, use the repo like any other Artifacts repo.

* Keep it as a stable baseline and fork from it for agent work
* clone it with a repo-scoped token for direct Git access
* mark it read-only if you want a fixed template repo

For the endpoint details, refer to [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/#import-a-public-https-remote). For auth details, refer to [Authentication](https://developers.cloudflare.com/artifacts/guides/authentication/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/guides/import-repositories/#page","headline":"Import repositories · Cloudflare Artifacts docs","description":"Import existing Git repos into Artifacts.","url":"https://developers.cloudflare.com/artifacts/guides/import-repositories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
