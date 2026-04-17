---
title: Pricing
description: Review Artifacts pricing information.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/artifacts/platform/pricing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Pricing

Artifacts pricing is billed on two dimensions:

* **Operations**: the number of repo operations, such as `create`, `push`, `pull`, and `clone`.
* **Storage**: the total amount of stored data, measured in gigabyte-months (`GB-mo`).

## Artifacts pricing

| Unit                          | Workers Free | Workers Paid                                                   |
| ----------------------------- | ------------ | -------------------------------------------------------------- |
| Operations (1,000 operations) | Unavailable  | First 10,000 per month + $0.15 per additional 1,000 operations |
| Storage (GB-mo)               | Unavailable  | First 1 GB per month + $0.50 per additional GB-mo              |

## Storage usage

Storage is billed using gigabyte-month (`GB-mo`) as the billing metric, identical to [Durable Objects SQL storage](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend). A `GB-mo` is calculated by averaging peak storage per day over a 30-day billing period.

* Storage is calculated across all repositories.
* Replicas do not add storage charges. Storage is replicated by default, and you do not need to manage repository availability or uptime.
* Repos remain stored until you explicitly delete them.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/platform/pricing/","name":"Pricing"}}]}
```
