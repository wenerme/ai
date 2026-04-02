---
title: Reduce data transfer (egress costs) between Azure and Cloudflare
description: Cloudflare launched Bandwidth Alliance in 2018 – a group of forward-looking cloud and storage providers who have agreed to waive or steeply discount egress costs for mutual customers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Reduce data transfer (egress costs) between Azure and Cloudflare

## Overview

Cloudflare launched Bandwidth Alliance in 2018 – a group of forward-looking cloud and storage providers who have agreed to waive or steeply discount egress costs for mutual customers. 

Cloudflare customers using Azure can lower their egress bills between Cloudflare and Azure via [Microsoft Routing Preference ↗](https://docs.microsoft.com/en-us/azure/virtual-network/routing-preference-overview).

---

## How to

To lower your data transfer costs from Azure and Cloudflare: 

1. In the Azure portal, go to your storage account.
2. Navigate to **Network Routing > Firewalls and virtual networks**.
3. For **Routing preference**, choose **Internet routing**.
4. Publish route-specific endpoint to **Internet routing**.
5. Navigate to **Properties**.
6. Locate the endpoint values for **Internet Routing**.
7. Enter these endpoint values in your Cloudflare Dashboard.
![Example of where to enter endpoint URLs from Microsoft Azure into your Cloudflare dashboard.](https://developers.cloudflare.com/_astro/bandwidth-alliance.BYbPK3YS_Z1hQW7.webp) 

For additional details, refer to [Configure network routing preference for Azure Storage ↗](https://docs.microsoft.com/en-us/azure/storage/common/configure-network-routing-preference?tabs=azure-portal) and [Microsoft Routing Preference ↗](https://docs.microsoft.com/en-us/azure/storage/common/network-routing-preference).

---

## Related resources

* [Microsoft Azure data transfer announcement ↗](https://blog.cloudflare.com/discounted-egress-for-cloudflare-customers-from-microsoft-azure-is-now-available/) (blog)
* [Bandwidth Alliance ↗](https://www.cloudflare.com/bandwidth-alliance/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/others/","name":"Others"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/others/reduce-data-transfer-egress-costs-between-azure-and-cloudflare/","name":"Reduce data transfer (egress costs) between Azure and Cloudflare"}}]}
```
