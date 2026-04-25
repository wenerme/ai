---
title: Plans
description: Compare API Shield feature availability and endpoint limits across Cloudflare plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Plans

Free, Pro, Business, and Enterprise customers without an API Shield subscription can access [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/) and [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), but no other [API Shield](https://developers.cloudflare.com/api-shield/) features.

To subscribe to API Shield, upgrade to an Enterprise plan and contact your account team.

Limits to endpoints apply to Endpoint Management and Schema validation. Refer to the table below for limits based on your zone plan.

| Plan type                         | Saved endpoints | Uploaded schemas | Total uploaded schema size | Rule action  |
| --------------------------------- | --------------- | ---------------- | -------------------------- | ------------ |
| **Free**                          | 100             | 5                | 200 kB                     | Block only   |
| **Pro**                           | 250             | 5                | 500 kB                     | Block only   |
| **Business**                      | 500             | 10               | 2 MB                       | Block only   |
| **Enterprise without API Shield** | 500             | 10               | 5 MB                       | Log or Block |
| **Enterprise with API Shield**    | 10,000          | 10+              | 10+ MB                     | Log or Block |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/plans/","name":"Plans"}}]}
```
