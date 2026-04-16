---
title: Error codes
description: Error codes you may encounter when validating custom hostnames.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Error codes

When you [validate a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/), you might encounter the following error codes.

| Error                                                                                                                   | Cause                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone does not have a fallback origin set.                                                                               | Fallback is not active.                                                                                                                                                                                                                  |
| Fallback origin is in a status of initializing, pending\_deployment, pending\_deletion, or deleted.                     | Fallback is not active.                                                                                                                                                                                                                  |
| Custom hostname does not CNAME to this zone.                                                                            | Zone does not have [apex proxying entitlement](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/) and custom hostname does not CNAME to zone.                        |
| None of the A or AAAA records are owned by this account and the pre-generated ownership validation token was not found. | Account has [apex proxying enabled](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/) but the custom hostname failed the hostname validation check on the A record. |
| This account and the pre-generated ownership validation token was not found.                                            | Hostname does not CNAME to zone or none of the A/AAAA records match reserved IPs for zone.                                                                                                                                               |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/","name":"Hostname validation"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes/","name":"Error codes"}}]}
```
