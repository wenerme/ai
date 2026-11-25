---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Understand how Cloudflare places Container instances and how Durable Object jurisdiction affects placement.
title: Placement
image: https://developers.cloudflare.com/containers/concepts/placement/og.png?v=4dec4faf359f60ac
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Placement

With the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), your Durable Object starts a Container instance on demand through `ctx.container.start()`. Cloudflare selects a suitable location based on request routing, available capacity, and image availability.

## Placement and routing

A Container and its associated Durable Object are not guaranteed to run in the same location. Placement balances request routing with startup speed, so the Container may start in another eligible location.

Requests to a running Container continue to reach that instance, regardless of where the requests originate. After the Container stops, its next start may use a different location.

## Jurisdiction

Container placement uses the jurisdiction of its associated Durable Object to determine eligible locations. Configure the Durable Object namespace's jurisdiction using the [Durable Objects data location API](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction).

The `durable_object` policy does not support application-level regional constraints or application-level EU and US jurisdiction settings. Set jurisdiction through the Durable Object namespace.

Image and snapshot storage

Jurisdiction controls where Container instances run. It does not determine where Container images or [snapshots](https://developers.cloudflare.com/containers/guides/snapshots/) are stored. If storage location is part of your requirement, confirm the supported image workflow with your account team before you deploy.

For Data Localization Suite support, refer to [Product compatibility](https://developers.cloudflare.com/data-localization/compatibility/#developer-platform).

## Placement constraints for the default policy

Applications that use the [`default` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-default-scheduling-policy) can set application-level placement constraints in their Wrangler configuration.

### Regional constraints

Use the `regions` constraint to limit container placement to specific geographic areas:

| Region | Description | Notes |
| --- | --- | --- |
| `ENAM` | Eastern North America | |
| `WNAM` | Western North America | |
| `EEUR` | Eastern Europe | |
| `WEUR` | Western Europe | |
| `APAC` | Asia Pacific | |
| `SAM` | South America | |
| `ME` | Middle East | Limited capacity |
| `OC` | Oceania | Limited capacity |
| `AFR` | Africa | Limited capacity |

Limited capacity regions (ME, OC, AFR) cannot be used exclusively. Include at least one other region, or contact support for dedicated access.

### Jurisdictional constraints

Use the `jurisdiction` constraint to restrict containers to compliance boundaries:

| Jurisdiction | Regions | Use case |
| --- | --- | --- |
| `eu` | EEUR, WEUR | EU data residency |
| `us` | ENAM, WNAM | US data residency |
| `fedramp` | ENAM, WNAM | FedRAMP regions |

When you specify both `jurisdiction` and `regions`, the regions must be valid for that jurisdiction. For example, specifying `jurisdiction: "eu"` with `regions: ["ENAM"]` is invalid.

### Configure placement

Set placement constraints in your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "containers": [
    {
      "class_name": "MyContainer",
      "image": "docker.io/my-org/my-image:latest",
      "constraints": {
        "regions": [
          "ENAM",
          "WNAM"
        ],
        "jurisdiction": "fedramp"
      }
    }
  ]
}
```

```toml
[[containers]]
class_name = "MyContainer"
image = "docker.io/my-org/my-image:latest"

[containers.constraints]
regions = ["ENAM", "WNAM"]
jurisdiction = "fedramp"
```

Refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/) for more details on how placement affects container startup and routing.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/concepts/placement/#page","headline":"Placement","description":"Understand how Cloudflare places Container instances and how Durable Object jurisdiction affects placement.","url":"https://developers.cloudflare.com/containers/concepts/placement/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/concepts/placement/og.png?v=4dec4faf359f60ac","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
