---
description: Control where your containers run with regional and jurisdictional constraints.
title: Placement
image: https://developers.cloudflare.com/containers/concepts/placement/og.png?v=4dec4faf359f60ac
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Placement

By default, containers run in the location nearest to the incoming request with a pre-fetched image. Use placement constraints to restrict where your containers run for data residency, compliance, or latency requirements.

## Regional constraints

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

## Jurisdictional constraints

Use the `jurisdiction` constraint to restrict containers to compliance boundaries:

| Jurisdiction | Regions | Use case |
| --- | --- | --- |
| `eu` | EEUR, WEUR | EU data residency |
| `us` | ENAM, WNAM | US data residency |
| `fedramp` | ENAM, WNAM | FedRAMP regions |

When you specify both `jurisdiction` and `regions`, the regions must be valid for that jurisdiction. For example, specifying `jurisdiction: "eu"` with `regions: ["ENAM"]` is invalid.

Jurisdiction controls where containers run, not where images are stored

The `jurisdiction` constraint controls where Container instances run. It does not determine where Container images or [snapshots](https://developers.cloudflare.com/containers/guides/snapshots/) are stored. If storage location is part of your requirement, confirm the supported image workflow with your account team before you deploy.

The `jurisdiction` constraint in Wrangler configuration applies to applications that use the [`default` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/). With the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), a Container runs where its Durable Object runs. To restrict that location, create the Durable Object in a [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction).

For Data Localization Suite support, refer to [Product compatibility](https://developers.cloudflare.com/data-localization/compatibility/#developer-platform).

## Configure placement

Set placement constraints in your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "containers": [
    {
      "name": "my-container",
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
name = "my-container"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/concepts/placement/#page","headline":"Placement","description":"Control where your containers run with regional and jurisdictional constraints.","url":"https://developers.cloudflare.com/containers/concepts/placement/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/concepts/placement/og.png?v=4dec4faf359f60ac","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
