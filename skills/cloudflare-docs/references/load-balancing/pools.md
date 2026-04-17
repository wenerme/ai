---
title: Pools
description: Pools of origin servers for load balancing traffic distribution.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/pools/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Pools

Within Cloudflare, pools represent your endpoints and how they are organized. As such, a pool can be a group of several endpoints, or you could also have only one endpoint (an origin server, for example) per pool.

If you are familiar with DNS terminology, think of a pool as a “record set,” except Cloudflare only returns addresses that are considered healthy. You can attach health monitors to individual pools for customized monitoring. A pool can have either a single monitor or a monitor group attached — but not both.

For more details about how endpoints and pools become unhealthy, refer to [Endpoint and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/).

Warning

Since load balancing targets are not limited to origin web servers, the term `endpoints` has been introduced. Refer to [Service-Specific Terms ↗](https://www.cloudflare.com/service-specific-terms-other-terms/) for its use in the context of Cloudflare offerings, and to [load balancing concepts](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/) or [Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/load-balancing/) for use case examples.

On the [Load Balancing API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/get/), `origin` has been maintained.

---

## Properties

For an up-to-date list of pool properties, refer to [Pool properties](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/list/) in our API documentation.

---

## Create pools

For step-by-step guidance, refer to [Create pools](https://developers.cloudflare.com/load-balancing/pools/create-pool/).

---

## Per-endpoint Host header override

When your application needs specialized routing (`CNAME` setup or custom hosts like Heroku), change the `Host` header used in health monitor requests. For more details, refer to [Override HTTP Host headers](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/).

---

## API commands

The Cloudflare API supports the following commands for pools. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

| Command                                                                                                                                          | Method | Endpoint                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------- |
| [Create Pool](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/create/)                               | POST   | accounts/:account\_id/load\_balancers/pools                |
| [Delete Pool](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/delete/)                               | DELETE | accounts/:account\_id/load\_balancers/pools/:id            |
| [List Pools](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/list/)                                  | GET    | accounts/:account\_id/load\_balancers/pools                |
| [Pool Details](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/get/)                                 | GET    | accounts/:account\_id/load\_balancers/pools/:id            |
| [Pool Health Details](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/subresources/health/methods/get/)      | GET    | account/:account\_id/load\_balancers/pools/:id/health      |
| [Overwrite specific properties](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/edit/)               | PATCH  | accounts/:account\_id/load\_balancers/pools/:id            |
| [Overwrite existing pool](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/update/)                   | PUT    | accounts/:account\_id/load\_balancers/pools/:id            |
| [Preview Pool](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/subresources/health/methods/create/)          | POST   | account/:account\_id/load\_balancers/pools/:id/preview     |
| [List Pool References](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/subresources/references/methods/get/) | GET    | accounts/:account\_id/load\_balancers/pools/:id/references |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/pools/","name":"Pools"}}]}
```
