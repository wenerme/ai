---
title: Placement
description: Control where your containers run with regional and jurisdictional constraints.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/platform-details/placement.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Placement

By default, containers run in the location nearest to the incoming request with a pre-fetched image. Use placement constraints to restrict where your containers run for data residency, compliance, or latency requirements.

## Regional constraints

Use the `regions` constraint to limit container placement to specific geographic areas:

| Region | Description           | Notes            |
| ------ | --------------------- | ---------------- |
| ENAM   | Eastern North America |                  |
| WNAM   | Western North America |                  |
| EEUR   | Eastern Europe        |                  |
| WEUR   | Western Europe        |                  |
| APAC   | Asia Pacific          |                  |
| SAM    | South America         |                  |
| ME     | Middle East           | Limited capacity |
| OC     | Oceania               | Limited capacity |
| AFR    | Africa                | Limited capacity |

Limited capacity regions (ME, OC, AFR) cannot be used exclusively. Include at least one other region, or contact support for dedicated access.

## Jurisdictional constraints

Use the `jurisdiction` constraint to restrict containers to compliance boundaries:

| Jurisdiction | Regions    | Use case          |
| ------------ | ---------- | ----------------- |
| eu           | EEUR, WEUR | EU data residency |
| fedramp      | ENAM, WNAM | FedRAMP regions   |

When you specify both `jurisdiction` and `regions`, the regions must be valid for that jurisdiction. For example, specifying `jurisdiction: "eu"` with `regions: ["ENAM"]` is invalid.

## Configure placement

Set placement constraints in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-6276)
* [  wrangler.toml ](#tab-panel-6277)

JSONC

```

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

Explain Code

TOML

```

[[containers]]

name = "my-container"

image = "docker.io/my-org/my-image:latest"


[containers.constraints]

regions = ["ENAM", "WNAM"]

jurisdiction = "fedramp"


```

Refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/platform-details/architecture/) for more details on how placement affects container startup and routing.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/placement/","name":"Placement"}}]}
```
