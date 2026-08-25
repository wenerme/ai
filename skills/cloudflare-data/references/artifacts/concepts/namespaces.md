---
description: Organize repositories by environment or tenant.
title: Namespaces
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Namespaces

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/concepts/namespaces/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Artifacts uses namespaces as top-level containers for repositories. Use them to separate repositories by environment, such as `prod`, `staging`, and `dev`, by tenant, or shard.

You can create a namespace explicitly or let Artifacts create one automatically. If you create a repo under a namespace name that does not exist, Artifacts creates the namespace automatically.

## Use namespaces as containers

Start with one namespace per environment or tenant boundary.

* Use environment namespaces such as `prod`, `staging`, or `dev`.
* Use tenant or shard namespaces when one shared namespace would become too hot or too large.
* Keep repository names unique within each namespace.

## Choose a namespace name

Start with a stable name such as `default`, `staging`, or `agents-realtime`.

Namespace names follow the same public naming rules as repo names:

* start with a letter or digit
* use letters, digits, `.`, `_`, or `-` after the first character
* keep the name stable across your Workers, API clients, and Git workflows

If you have not chosen a namespace strategy yet, use `default` in the examples throughout this docset.

## Choose a data location

Select a jurisdiction when you create a namespace to restrict where Artifacts stores and processes repo data. Every repo in that namespace uses the selected jurisdiction.

You cannot change a namespace jurisdiction after creation. For supported jurisdictions and creation instructions, refer to [Data localization](https://developers.cloudflare.com/artifacts/guides/data-localization/).

## Use the same namespace everywhere

Use the same namespace name in your Wrangler binding:

```jsonc
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

```toml
[[artifacts]]
binding = "ARTIFACTS"
namespace = "default"
```

Use that same namespace in your REST base URL:

```sh
export ACCOUNT_ID="<YOUR_ACCOUNT_ID>"
export ARTIFACTS_NAMESPACE="default"
export ARTIFACTS_BASE_URL="https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/artifacts/namespaces/$ARTIFACTS_NAMESPACE"
```

## Split namespaces when needed

Start with one namespace when you are learning the product. Add more namespaces when you need clearer boundaries between environments, teams, or high-rate workloads.

For more information, refer to [Best practices for Artifacts](https://developers.cloudflare.com/artifacts/concepts/best-practices/#partition-namespaces-deliberately).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/concepts/namespaces/#page","headline":"Namespaces · Cloudflare Artifacts docs","description":"Organize repositories by environment or tenant.","url":"https://developers.cloudflare.com/artifacts/concepts/namespaces/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
