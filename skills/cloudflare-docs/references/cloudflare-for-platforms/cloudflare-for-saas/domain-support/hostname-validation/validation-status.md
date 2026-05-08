---
title: Validation status
description: Possible statuses for custom hostname validation and their meanings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Validation status

When you [validate a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/), that hostname can be in several different statuses.

| Status              | Description                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pending             | Custom hostname is pending hostname validation.                                                                                                                                                                                                                                                                                                                                  |
| Active              | Custom hostname has completed hostname validation and is active.                                                                                                                                                                                                                                                                                                                 |
| Active re-deploying | Customer hostname is active and the changes have been processed.                                                                                                                                                                                                                                                                                                                 |
| Blocked             | Custom hostname cannot be added to Cloudflare at this time. Custom hostname was likely associated with Cloudflare previously and flagged for abuse.If you are an Enterprise customer, contact your Customer Success Manager. Otherwise, email abusereply@cloudflare.com with the name of the web property and a detailed explanation of your association with this web property. |
| Moved               | Custom hostname is not active after **Pending** for the entirety of the [Validation Backoff Schedule](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/backoff-schedule/) or it no longer points to the fallback origin.                                                                                        |
| Deleted             | Custom hostname was deleted from the zone. Occurs when status is **Moved** for more than seven days.                                                                                                                                                                                                                                                                             |

The custom hostname validation status is separate from the certificate status. In the [Custom hostname details endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/) response, `result.status` tracks hostname activation and `result.ssl.status` tracks certificate issuance and deployment.

A custom hostname is ready for production traffic when `result.status` is `active`, `result.ssl.status` is `active`, and DNS points to your SaaS target. If `result.status` is `active` but `result.ssl.status` is not `active`, Cloudflare has validated the hostname, but the certificate has not completed issuance and deployment.

## Refresh validation

To run the custom hostname validation check again, select **Refresh** on the dashboard or send a `PATCH` request to the [Edit custom hostname endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/). If using the API, make sure that the `--data` field contains an `ssl` object with the same `method` and `type` as the original request.

If the hostname is in a **Moved** or **Deleted** state, the refresh will set the custom hostname back to **Pending validation**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/","name":"Hostname validation"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/validation-status/","name":"Validation status"}}]}
```
