---
title: Move hostnames
description: Learn how to move hostnames between different zones.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Migration ](https://developers.cloudflare.com/search/?tags=Migration) 

# Move hostnames

As a SaaS provider, you may want, or have, multiple zones to manage hostnames. Each zone can have different configurations or origins, as well as correlate to varying products. You might shift custom hostnames between zones to enable or disable certain features. Cloudflare allows migration within the same account through the steps below:

---

## CNAME

If your custom hostname uses a CNAME record, add the custom hostname to the new zone and [update your DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) to point to the new zone.

Note

If you would like to migrate the custom hostname without end customers changing the DNS target, use [apex proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/).

1. [Add custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) to your new zone.
2. Direct your customer to [change the DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) so that it points to the new zone.
3. Confirm that the custom hostname has validated in the new zone.
4. Wait for the certificate to validate automatically through Cloudflare or [validate it using Domain Control Validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/#perform-dcv).
5. Remove custom hostname from the old zone.

Once these steps are complete, the custom hostname's traffic will route to the second SaaS zone and will use its configuration.

## A record

Through [Apex Proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/) or [BYOIP](https://developers.cloudflare.com/byoip/), you can migrate the custom hostname without action from your end customer.

1. Verify with the account team that your apex proxying IPs have been assigned to both SaaS zones.
2. [Add custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) to the new zone.
3. Confirm that the custom hostname has validated in the new zone.
4. Wait for the certificate to validate automatically through Cloudflare or [validate it using DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/#perform-dcv).
5. Remove custom hostname from the old zone.

Note

The most recently edited custom hostname will be active. For instance, `example.com` exists on `SaaS Zone 1`. It is added to `SaaS Zone 2`. Because it was activated more recently on `SaaS Zone 2`, that is where it will be active. However, if edits are made to example.com on `SaaS Zone 1`, it will reactivate on that zone instead of `SaaS Zone 2`.

## Wildcard certificate

If you are migrating custom hostnames that rely on a Wildcard certificate, Cloudflare cannot automatically complete Domain Control Validation (DCV).

1. [Add custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) to the new zone.
2. Direct your customer to [change the DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) so that it points to the new zone.
3. [Validate the certificate](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/#perform-dcv) on the new zone through DCV.

The custom hostname can activate on the new zone even if the certificate is still active on the old zone. This ensures a valid certificate exists during migration. However, it is important to validate the certificate on the new zone as soon as possible.

Note

Verify that the custom hostname successfully activated after the migration on the [**Custom Hostnames** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames) page.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/migrating-custom-hostnames/","name":"Move hostnames"}}]}
```
